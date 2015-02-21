# Hashes facet

The **Hashes** facet groups different types of hashes into a single structure, for an item on OneDrive.

## JSON representation
A set of hash values for the file.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.hashes" } -->
```
{
	"crc32Hash": "string (hex)",
	"sha1Hash": "string (hex)"
}
```
## Properties

| Property name | Type          | Description                                           |
|:--------------|:--------------|:------------------------------------------------------|
| **sha1Hash**  | base64 string | SHA1 hash for the contents of the file (if available) |
| **crc32Hash** | base64 string | The CRC32 value of the file (if available)            |

**Note:** In some cases hash values may not be available. If this is the case,
the hash values on an item will be updated after the item is downloaded.
