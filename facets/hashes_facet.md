# Hashes type
The Hashes type groups different types of hashes into a single structure.

### JSON representation
A set of hash values for the file.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.hashes" } -->
```
{
	"crc32Hash": "string (hex)",
	"sha1Hash": "string (hex)"
}
```
## Properties

| Property Name | Type            | Description                                                                                                                                                           |
|:--------------|:----------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sha1Hash`    | `base64 string` | SHA1 hash for the contents of the file.<br/>If not present, the server will calculate the hash when content download for the first time and then populate this field. |
| `crc32Hash    | `base64 string` | Optional if available: CRC 32 value of the file                                                                                                                       |
