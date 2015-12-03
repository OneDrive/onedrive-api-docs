# Item resource type
The Item resource type represents metadata for an item in OneDrive.
All top-level filesystem objects in OneDrive are Item resources.
If an item is a [Folder](../facets/folder_facet.md) or [File](../facets/file_facet.md) facet, the Item resource will contain a value for either the **folder** or **file** property, respectively.

## JSON representation
Here is a JSON representation of an Item.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.item",
       "optionalProperties": ["children", "folder", "file", "image", "audio", "video",
       "location", "deleted", "specialFolder", "photo", "thumbnails", "searchResult",
       "@name.conflictBehavior", "@content.downloadUrl", "@content.sourceUrl"] } -->
```json
{
  "id": "string (identifier)",
  "name": "string",
  "eTag": "string (etag)",
  "cTag": "string (etag)",
  "createdBy": { "@odata.type": "oneDrive.identitySet" },
  "createdDateTime": "string (timestamp)",
  "lastModifiedBy": { "@odata.type": "oneDrive.identitySet" },
  "lastModifiedDateTime": "string (timestamp)",
  "size": 1024,
  "webUrl": "url",
  "description": "string",
  "parentReference": { "@odata.type": "oneDrive.itemReference"},
  "children": [ { "@odata.type": "oneDrive.item" } ],
  "folder": { "@odata.type": "oneDrive.folder" },
  "file": { "@odata.type": "oneDrive.file" },
  "fileSystemInfo": {"@odata.type": "oneDrive.fileSystemInfo"},
  "image": { "@odata.type": "oneDrive.image" },
  "photo": { "@odata.type": "oneDrive.photo" },
  "audio": { "@odata.type": "oneDrive.audio" },
  "video": { "@odata.type": "oneDrive.video" },
  "location": { "@odata.type": "oneDrive.location" },
  "remoteItem": { "@odata.type": "oneDrive.remoteItem"},
  "searchResult": { "@odata.type": "oneDrive.searchResult"},
  "deleted": { "@odata.type": "oneDrive.deleted"},
  "specialFolder": { "@odata.type": "oneDrive.specialFolder" },
  "thumbnails": [ {"@odata.type": "oneDrive.thumbnailSet"} ],
  "shared": {"@odata.type": "oneDrive.shared" },
  "@name.conflictBehavior": "string",
  "@content.downloadUrl": "url",
  "@content.sourceUrl": "url"
}
```
## Properties
The Item object has these properties.

| Property name            | Type                                                     | Description                                                                                               |
|:-------------------------|:---------------------------------------------------------|:----------------------------------------------------------------------------------------------------------|
| **id**                   | string                                                   | The unique identifier of the item within the Drive. Read-only.                                            |
| **name**                 | string                                                   | The name of the item (filename and extension). Read-write.                                                |
| **eTag**                 | string                                                   | eTag for the entire item (metadata + content). Read-only.                                                 |
| **cTag**                 | string                                                   | An eTag for the content of the item. This eTag is not changed if only the metadata is changed. **Note** This property is not returned if the Item is a folder. Read-only. |
| **createdBy**            | [IdentitySet](identitySet.md)                            | Identity of the user, device, and application which created the item. Read-only.                          |
| **lastModifiedBy**       | [IdentitySet](identitySet.md)                            | Identity of the user, device, and application which last modified the item. Read-only.                    |
| **createdDateTime**      | [timestamp](../facets/timestamp.md)                      | Date and time of item creation. Read-only.                                                                |
| **lastModifiedDateTime** | [timestamp](../facets/timestamp.md)                      | Date and time the item was last modified. Read-only.                                                      |
| **size**                 | 64-bit integer                                           | Size of the item in bytes. Read-only.                                                                     |
| **parentReference**      | [ItemReference](itemReference.md)                        | Parent information, if the item has a parent. Read-write.                                                 |
| **webUrl**               | string                                                   | URL that displays the resource in the browser. Read-only.                                                 |
| **description**          | string                                                   | Provide a user-visible description of the item. Read-write.                                               |
| **folder**               | [FolderFacet](../facets/folder_facet.md)                 | Folder metadata, if the item is a folder. Read-only.                                                      |
| **file**                 | [FileFacet](../facets/file_facet.md)                     | File metadata, if the item is a file. Read-only.                                                          |
| **fileSystemInfo**       | [FileSystemInfoFacet](../facets/filesysteminfo_facet.md) | File system information on client. Read-write.                                                            |
| **image**                | [ImageFacet](../facets/image_facet.md)                   | Image metadata, if the item is an image. Read-only.                                                       |
| **remoteItem**                 | [remoteItemFacet](../facets/remoteitem_facet.md)                     | Remote item data, if the item is shared from a remote OneDrive.                                           |
| **photo**                | [PhotoFacet](../facets/photo_facet.md)                   | Photo metadata, if the item is a photo. Read-only.                                                        |
| **audio**                | [AudioFacet](../facets/audio_facet.md)                   | Audio metadata, if the item is an audio file. Read-only.                                                  |
| **video**                | [VideoFacet](../facets/video_facet.md)                   | Video metadata, if the item is a video. Read-only.                                                        |
| **location**             | [LocationFacet](../facets/location_facet.md)             | Location metadata, if the item has location data. Read-only.                                              |
| **searchResult**         | [SearchResultFacet](../facets/searchresult_facet.md)     | Search metadata, if the item is from a search result.                                                |
| **deleted**              | [DeletedFacet](../facets/deleted_facet.md)               | Information about the deleted state of the item. Read-only.                                            |


**Note:** The `eTag` and `cTag` properties work differently on
containers (folders). The `cTag` value is modified when content or metadata of
any descendant of the folder is changed. The `eTag` value is only modified when
the folder's properties are changed, except for properties that are derived
from descendants (like `childCount` or `lastModifiedDateTime`).

## Instance Attributes

Instance attributes are properties with special behaviors. This properties
are temporary and either a) define behavior the service should perform or b)
provide short-term property values, like a download URL for an item that expires.

| Property name              | Type   | Description                                                                                                                                                         |
|:---------------------------|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **@name.conflictBehavior** | string | The conflict resolution behavior for actions that create a new item. An item will never be returned with this annotation. Write-only.                               |
| **@content.downloadUrl**   | string | A Url that can be used to download this file's content. Authentication is not required with this URL. Read-only.                                                    |
| **@content.sourceUrl**     | string | When issuing a PUT request, this instance annotation can be used to instruct the service to download the contents of the URL, and store it as the file. Write-only. |

**Note:** The `@content.downloadUrl` is a short-lived URL and can't be cached. The
URL will only be available for a short period of time before it is invalidated.

## Relationships

The following table defines the relationships that the Item resource has to other resources.

| Relationship name | Type                                       | Description                                                                                                                                              |
|:------------------|:-------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
| **content**       | octet-stream                               | The content stream, if the Item represents a file.                                                                                                       |
| **children**      | [Item](item.md) collection                 | Collection containing Item objects for the immediate children of Item. Only items representing folders have children.                                    |
| **thumbnails**    | [ThumbnailSet](thumbnailSet.md) collection | Collection containing [ThumbnailSet](thumbnailSet.md) objects associated with the item. For more info, see [getting thumbnails](../items/thumbnails.md). |

## Remarks

In OneDrive for Business, the **cTag** property is not returned, if the Item is a [folder](../facets/folder_facet.md).

<!-- {
  "type": "#page.annotation",
  "description": "Item is the main data model in the OneDrive API. Everything is an item.",
  "keywords": "item,facet,resource",
  "section": "documentation"
} -->
