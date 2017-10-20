---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: sample
title: QuickXOR Hash Sample - OneDrive
---
# Code Snippets: QuickXorHash Algorithm

## Algorithm Explanation

A quick, simple non-cryptographic hash algorithm that works by XORing the bytes in a circular-shifting fashion.

A high level description of the algorithm without the introduction of the length is as follows:

Let's say a "block" is a 20-byte array.

```
   method block zero():
     returns a block with all zero bits.

   method block reverse(block b)
     returns a block with all of the bytes reversed (00010203... => ...03020100)

   method block extend8(byte b):
     returns a block with all zero bits except for the lower 8 bits which come from b.

   method block extend64(int64 i):
     returns a block of all zero bits except for the lower 64 bits which come from i
     and are in little-endian byte order.

   method block rotate(block bl, int n):
     returns bl rotated left by n bits.

   method block xor(block bl1, block bl2):
     returns a bitwise xor of bl1 with bl2

   method block XorHash0(byte[] rgb):
     block ret = zero()
     for (int i = 0; i < rgb.Length; i ++)
       ret = xor(ret, rotate(extend8(rgb[i]), i * 11))
     returns reverse(ret)

   entrypoint block XorHash(byte[] rgb):
     returns xor(extend64(rgb.Length), XorHash0(rgb))
```

The final hash should xor the length of the data with the least significant
bits of the resulting block.

## Sample Code: C-Sharp

The following example implementation can also be [downloaded](https://gist.github.com/rgregg/c07a91964300315c6c3e77f7b5b861e4).

```cs
public class QuickXorHash : System.Security.Cryptography.HashAlgorithm
{
    private const int BitsInLastCell = 32;
    private const byte Shift = 11;
    private const int Threshold = 600;
    private const byte WidthInBits = 160;

    private UInt64[] _data;
    private Int64 _lengthSoFar;
    private int _shiftSoFar;

    public QuickXorHash()
    {
        this.Initialize();
    }

    protected override void HashCore(byte[] array, int ibStart, int cbSize)
    {
        unchecked
        {
            int currentShift = this._shiftSoFar;

            // The bitvector where we'll start xoring
            int vectorArrayIndex = currentShift / 64;

            // The position within the bit vector at which we begin xoring
            int vectorOffset = currentShift % 64;
            int iterations = Math.Min(cbSize, QuickXorHash.WidthInBits);

            for (int i = 0; i < iterations; i++)
            {
                bool isLastCell = vectorArrayIndex == this._data.Length - 1;
                int bitsInVectorCell = isLastCell ? QuickXorHash.BitsInLastCell : 64;

                // There's at least 2 bitvectors before we reach the end of the array
                if (vectorOffset <= bitsInVectorCell - 8)
                {
                    for (int j = ibStart + i; j < cbSize + ibStart; j += QuickXorHash.WidthInBits)
                    {
                        this._data[vectorArrayIndex] ^= (ulong)array[j] << vectorOffset;
                    }
                }
                else
                {
                    int index1 = vectorArrayIndex;
                    int index2 = isLastCell ? 0 : (vectorArrayIndex + 1);
                    byte low = (byte)(bitsInVectorCell - vectorOffset);

                    byte xoredByte = 0;
                    for (int j = ibStart + i; j < cbSize + ibStart; j += QuickXorHash.WidthInBits)
                    {
                        xoredByte ^= array[j];
                    }
                    this._data[index1] ^= (ulong)xoredByte << vectorOffset;
                    this._data[index2] ^= (ulong)xoredByte >> low;
                }
                vectorOffset += QuickXorHash.Shift;
                while (vectorOffset >= bitsInVectorCell)
                {
                    vectorArrayIndex = isLastCell ? 0 : vectorArrayIndex + 1;
                    vectorOffset -= bitsInVectorCell;
                }
            }

            // Update the starting position in a circular shift pattern
            this._shiftSoFar = (this._shiftSoFar + QuickXorHash.Shift * (cbSize % QuickXorHash.WidthInBits)) % QuickXorHash.WidthInBits;
        }

        this._lengthSoFar += cbSize;
    }

    protected override byte[] HashFinal()
    {
        // Create a byte array big enough to hold all our data
        byte[] rgb = new byte[(QuickXorHash.WidthInBits - 1) / 8 + 1];

        // Block copy all our bitvectors to this byte array
        for (Int32 i = 0; i < this._data.Length - 1; i++)
        {
            Buffer.BlockCopy(
                BitConverter.GetBytes(this._data[i]), 0,
                rgb, i * 8,
                8);
        }

        Buffer.BlockCopy(
            BitConverter.GetBytes(this._data[this._data.Length - 1]), 0,
            rgb, (this._data.Length - 1) * 8,
            rgb.Length - (this._data.Length - 1) * 8);

        // XOR the file length with the least significant bits
        // Note that GetBytes is architecture-dependent, so care should
        // be taken with porting. The expected value is 8-bytes in length in little-endian format
        var lengthBytes = BitConverter.GetBytes(this._lengthSoFar);
        System.Diagnostics.Debug.Assert(lengthBytes.Length == 8);
        for (int i = 0; i < lengthBytes.Length; i++)
        {
            rgb[(QuickXorHash.WidthInBits / 8) - lengthBytes.Length + i] ^= lengthBytes[i];
        }

        return rgb;
    }

    public override sealed void Initialize()
    {
        this._data = new ulong[(QuickXorHash.WidthInBits - 1) / 64 + 1];
        this._shiftSoFar = 0;
        this._lengthSoFar = 0;
    }

    public override int HashSize
    {
        get
        {
            return QuickXorHash.WidthInBits;
        }
    }
}
```
