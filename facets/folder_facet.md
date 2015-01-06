# FolderFacet type
FolderFacet groups folder related data into a single structure.
It is available on the folder property of [Item][item-resource] resources that represent folders.

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.folder" } -->
```json
{
	"childCount": 0,
	"color": 0
}
```
## Properties

Property Name | Type | Description | Writable
--- | --- | --- | ---
`childCount` | `int64` | Number of children contained immediate within this container. | No
`color` | `int64` | The color associated with this folder. Defaults to OneDrive Blue (094AB2) | No

[item-resource]: ../resources/item.md
