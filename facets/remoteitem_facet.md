# Remote item facet
The **Remote item** facet contains data and references items that exist in another drive.
It is available on the `remoteItem` property of [Item][item-resource] resources that have been shared and added to a drive, for example, by using the "Add to OneDrive" feature.

**Note:** Unlike with folders in the user's drive, an item moved into a
remote item might have its `id` changed.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.remoteItem" } -->
```json
{
  "id": "string",
  "parentReference": { "@odata.type": "oneDrive.itemReference" },
  "folder": { "@odata.type": "oneDrive.folder" },
  "file": { "@odata.type": "oneDrive.file" },
  "fileSystemInfo": { "@odata.type": "oneDrive.fileSystemInfo" },
  "size": 1024,
  "webUrl": "https://1drv.ms/voo/bar"
}
```
## Properties

| Property name       | Type                                           | Description                                                   |
|:--------------------|:-----------------------------------------------|:--------------------------------------------------------------|
| **id**              | String                                         | Unique identifier for the remote item in its drive.           |
| **parentReference** | [ItemReference](../resources/itemReference.md) | Properties of the parent of the remote item.                  |
| **folder**          | [Folder](folder_facet.md)                      | Indicates that the remote item is a folder.                   |
| **file**            | [File](file_facet.md)                          | Indicates that the remote item is a file.                     |
| **fileSystemInfo**  | [FileSystemInfo](filesysteminfo_facet.md)      | Information about the remote item from the local file system. |
| **size**            | Int64                                          | Size of the remote item.                                      |

[item-resource]: ../resources/item.md
