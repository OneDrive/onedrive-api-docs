---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
---
# Remote item facet

The **Remote item** facet contains data and references items that exist in another drive.
It is available on the `remoteItem` property of [driveItem][item-resource] resources that have been shared and added to a drive, for example, by using the "Add to OneDrive" feature.

**Note:** Unlike with folders in the user's drive, an item moved into a
remote item might have its `id` changed.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.remoteItem", optionalProperties: ["name"] } -->

```json
{
  "createdBy": { "@odata.type": "oneDrive.identitySet" },
  "file": { "@odata.type": "oneDrive.file" },
  "fileSystemInfo": { "@odata.type": "oneDrive.fileSystemInfo" },
  "folder": { "@odata.type": "oneDrive.folder" },
  "id": "string",
  "lastModifiedBy": { "@odata.type": "oneDrive.identitySet" },
  "lastModifiedDateTime": "string (timestamp)",
  "name": "string",
  "parentReference": { "@odata.type": "oneDrive.itemReference" },
  "shared": {"@odata.type": "oneDrive.shared" },
  "size": 1024,
  "webUrl": "https://1drv.ms/voo/bar"
}
```

## Properties

| Property name            | Type                                             | Description                                                                                                                 |
| ------------------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **createdBy**            | [identitySet](../resources/identitySet.md)                    | Identity of the user, device, and application which created the item. Read-only.                                            |
| **file**                 | [file](file.md)                            | Indicates that the remote item is a file.                                                                                   |
| **fileSystemInfo**       | [fileSystemInfo](filesysteminfo.md)        | Information about the remote item from the local file system.                                                               |
| **folder**               | [folder](folder.md)                        | Indicates that the remote item is a folder.                                                                                 |
| **id**                   | string                                           | Unique identifier for the remote item in its drive.                                                                         |
| **lastModifiedBy**       | [identitySet](../resources/identitySet.md)                    | Identity of the user, device, and application which last modified the item. Read-only.                                      |
| **lastModifiedDateTime** | [dateTimeOffset](../resources/timestamp.md)         | Date and time the item was last modified. Read-only.                                                                        |
| **name**                 | string                                           | Optional. Filename of the remote item.                                                                                      |
| **parentReference**      | [itemReference](../resources/itemReference.md)   | Properties of the parent of the remote item.                                                                                |
| **shared**               | [sharedFacet](../resources/shared.md)         | Indicates that the item has been shared with others and provides information about the shared state of the item. Read-only. |
| **size**                 | Int64                                            | Size of the remote item.                                                                                                    |

[item-resource]: ../resources/driveitem.md

<!-- {
  "type": "#page.annotation",
  "description": "The quota facet provides information about how much space the OneDrive has available.",
  "keywords": "quota,available,remaining,used",
  "section": "documentation",
  "tocPath": "Facets/RemoteItem"
} -->
