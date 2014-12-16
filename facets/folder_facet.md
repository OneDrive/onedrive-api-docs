# FolderFacet type
FolderFacet groups folder related data into a single structure.
It is available on the folder property of [Item](item.md) resources that represent folders.

### JSON representation

```json
{
	"childCount": {int64},
	"color": {int64}
}
```
## Properties

Property Name | Type | Description | Writable
--- | --- | --- | ---
`childCount` | `int64` | Number of children contained immediate within this container. | No
`color` | `int64` | The color associated with this folder. Defaults to OneDrive Blue (094AB2) | No
