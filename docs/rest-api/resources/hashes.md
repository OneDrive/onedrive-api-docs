# Hashes facet

The **Hashes** facet groups different types of hashes into a single structure, for an item on OneDrive.

## JSON representation

A set of hash values for the file.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.hashes" } -->
```json
{
  "crc32Hash": "string (hex)",
  "sha1Hash": "string (hex)",
  "quickXorHash": "string (base64)"
}
```
## Properties

| Property name | Type          | Description                                           |
|:--------------|:--------------|:------------------------------------------------------|
| **sha1Hash**  | hex string | The bytes of the SHA1 hash of the file contents. |
| **crc32Hash** | hex string | The bytes of the CRC32 value of the file contents, in little endian order.           |
| **quickXorHash** | base64 string | A [proprietary hash](../code-snippets/quickxorhash.md) of the file contents.|

**Note:** In some cases hash values may not be available. Downloading the item
can cause the hash values to be populated, provided the hash is supported in the given context. See remarks for details.

## Remarks

In OneDrive for Business and SharePoint Server 2016, **sha1Hash** and **crc32Hash** are not available.

In OneDrive Personal, **quickXorHash** is not available.

To calculate **quickXorHash** for a file, refer to the [QuickXorHash snippet](../code-snippets/quickxorhash.md).

<!-- {
  "type": "#page.annotation",
  "description": "The hashes facet provides hash identifiers for a file in OneDrive",
  "keywords": "hash,sha1,crc32,item,facet",
  "section": "documentation",
  "tocPath": "Facets/Hashes"
} -->
