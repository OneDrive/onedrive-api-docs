# Folder facet

The **Folder** facet groups folder-related data on OneDrive into a single structure.
It is available on the folder property of [Item][item-resource] resources that represent folders.

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.folder" } -->
```json
{
  "childCount": 0
}
```
## Properties

| Property name  | Type  | Description                                                     |
|:---------------|:------|:----------------------------------------------------------------|
| **childCount** | int64 | Number of children contained immediately within this container. |

[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "The Folder facet describes properties of a folder",
  "keywords": "folder,item,facet",
  "section": "documentation",
  "tocPath": "Facets/Folder"
} -->
