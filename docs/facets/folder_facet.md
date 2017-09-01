# Folder facet

The **folder** facet groups folder-related data on OneDrive into a single structure.
It is available on the folder property of [driveItem][item-resource] resources that represent folders.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.folder" } -->
```json
{
  "childCount": 0,
  "view": { "@odata.type": "oneDrive.folderView" }
}
```

## Properties

| Property name  | Type                                              | Description                                                              |
| -------------- | ------------------------------------------------- | ------------------------------------------------------------------------ |
| **childCount** | int64                                             | Number of children contained immediately within this container.          |
| **view**       | [folderView facet](../facets/folderView_facet.md) | A collection of properties defining the recommended view for the folder. |

[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "The Folder facet describes properties of a folder",
  "keywords": "folder,item,facet",
  "section": "documentation",
  "tocPath": "Facets/Folder"
} -->
