# FileSystemInfo facet

The **FileSystemInfo** facet contains properties that are reported by the
device's local file system for the local version of an item. This facet can be
used to specify the last modified date or created date of the item as it was on
the local device.

It is available on the fileSystemInfo property of [Item][item-resource]
resources.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.fileSystemInfo" } -->
```json
{
  "createdDateTime" : "datetime",
  "lastModifiedDateTime" : "datetime"
}
```

## Properties

| Property name            | Type                      | Description                                                   |
|:-------------------------|:--------------------------|:--------------------------------------------------------------|
| **createdDateTime**      | [timestamp](timestamp.md) | The UTC date and time the file was created on a client.       |
| **lastModifiedDateTime** | [timestamp](timestamp.md) | The UTC date and time the file was last modified on a client. |

Values for createdDateTime and lastModifiedDateTime vary from the same
properties on the [Item][item-resource] resource. The values on the Item
resource are the created and modified date and time as seen from the service.
The values stored in the **FileSystemInfo** facet are provided by the client.

For example, if a file was created on the device on on Monday, but not uploaded
to the service until Tuesday, the client that uploads the file should write the
`fileSystemInfo` facet to include the created date on Monday. When the item
metadata is retrieved, the created date for the item will reflect Tuesday, but
the `fileSystemInfo` facet will show the orignal created date on Monday.

These properties are read/write. If you are uploading a file and know the
local client values for these fields, you should include them in the request.

## Remarks

The **FileSystemInfo** property is not available for items in SharePoint or OneDrive for Business.

[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "The fileSystemInfo facet provides information about date created and modified by clients.",
  "keywords": "fileSystemInfo,client,system info,onedrive",
  "section": "documentation",
  "tocPath": "Facets/File system info"
} -->
