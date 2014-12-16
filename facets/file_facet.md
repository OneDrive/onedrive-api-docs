# FileFacet type
FileFacet groups file related data into a single structure.
It is available on the file property of [Item](item.md) resources that represent files.

### JSON representation (GET)

```json
{
	"contentUrl": {string},
	"hashes":	{HashesType},
	"copyFromUrl": {string}
}
```

Property Name | Type | Description | Writable
--- | --- | --- | ---
`contentUrl` | `string` | Url that can be used to download this file's content | No
`hashes` | [HashesType](hashes_facet.md) | Hashes of the file's binary content, if available | No
`copyFromUrl` | `string` | Url where the service will download the content of the file from | WriteOnly
