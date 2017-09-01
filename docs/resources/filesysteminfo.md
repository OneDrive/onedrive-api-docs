# FileSystemInfo facet

The **FileSystemInfo** facet contains properties that are reported by the
device's local file system for the local version of an item. This facet can be
used to specify the last modified date or created date of the item as it was on
the local device.

It is available on the fileSystemInfo property of [driveItem][item-resource]
resources.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.fileSystemInfo" } -->
```json
{
  "createdDateTime" : "datetime",
  "lastAccessedDateTime": "datetime",
  "lastModifiedDateTime" : "datetime"
}
```

## Properties

| Property name            | Type                      | Description                                                   |
|:-------------------------|:--------------------------|:--------------------------------------------------------------|
| **createdDateTime**      | [timestamp](timestamp.md) | The UTC date and time the file was created on a client.       |
| **lastAccessedDateTime** | [timestamp](timestamp.md) | The UTC date and time the file was last accessed on a client. |
| **lastModifiedDateTime** | [timestamp](timestamp.md) | The UTC date and time the file was last modified on a client. |

Values for these properties vary from the same properties on the [driveItem][item-resource] resource. 
The properties on the **driveItem** resource are the created and modified date and time from the perspective of when the service saw the file.
The values stored in the **FileSystemInfo** facet are provided by the client are are the values displayed to the user if they exist.

For example, if a file was created on the device on on Monday, but not uploaded to the service until Tuesday, the client that uploads the file should write the **FileSystemInfo** facet to include the created date on Monday.
When the item metadata is retrieved, the created date for the item will reflect Tuesday, but the **FileSystemInfo** facet will show the orignal created date on Monday.

These properties are read/write.
If you are uploading a file and know the local client values for these fields, you should include them in the request.

## Remarks

* The **FileSystemInfo** property is not available for items in SharePoint Server 2016.
* **lastAccessedDateTime** is not available for items in SharePoint online, OneDrive for Business, or SharePoint Server 2016.

[item-resource]: ../resources/driveitem.md

<!-- {
  "type": "#page.annotation",
  "description": "The fileSystemInfo facet provides information about date created and modified by clients.",
  "keywords": "fileSystemInfo,client,system info,onedrive",
  "section": "documentation",
  "tocPath": "Facets/FileSystemInfo"
} -->
