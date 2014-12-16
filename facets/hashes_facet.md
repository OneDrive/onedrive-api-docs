# Hashes type
The Hashes type groups different types of hashes
into a single structure.

### JSON representation
A set of hash values for the file.

```
{
	"sha1": {base64_string},
	"crc32": {base64_string}
}
```
## Properties

Property Name | Type | Description | Writable
--- | --- | --- | ---
`sha1` | `base64 string` | SHA1 hash for the contents of the file.<br/>If not present, the server will calculate the hash when content download for the first time and then populate this field. | No <br/> (ODB-Support: coming soon)
`crc32` | `base64 string` | Optional if available: CRC 32 value of the file | No<br/> (ODB-Support: coming soon)
