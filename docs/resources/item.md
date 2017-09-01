# DriveItem resource type

The **driveItem** resource represents a file, folder, or other item stored in a drive.
All file system objects in OneDrive and SharePoint are returned as **driveItem** resources.

There are two primary ways of addressing a **driveItem** resource:

* By the **driveItem** unique identifier using `drive/items/{item-id}`
* By file system path using `/drive/root:/path/to/file`

**DriveItem** resources have [facets](../facets/facets.md) modeled as properties that provide data about the driveItem's identities and capabilities.
For example:

* Folders have a [folder facet](../facets/folder_facet.md)
* Files have a [file facet](../facets/file_facet.md).
* Images have an [image facet](../facets/image_facet.md) in addition to their file facet.
* Images taken with a camera (photos) have a [**photo facet**](../facets/photo_facet.md) that identifies the item as a photo and provides the properties of when the photo was taken and with what device.

Items with the **folder** facet act as containers of items and therefore have a `children` reference pointing to a collection of **driveItems** under the folder.

## JSON representation

Here is a JSON representation of a **driveItem** resource.

The **driveItem** resource is derived from [**baseItem**](baseitem.md) and inherits properties from that resource.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.item",
       "optionalProperties": ["cTag", "children", "folder", "file", "image", "audio", "video",
       "location", "deleted", "specialFolder", "photo", "thumbnails", "searchResult", "remoteItem",
       "shared", "content", "@microsoft.graph.conflictBehavior", "@microsoft.graph.downloadUrl", "@content.sourceUrl",
       "sharepointIds"],
       "keyProperty": "id", "openType": true } -->

```json
{
  "audio": { "@odata.type": "oneDrive.audio" },
  "cTag": "string (etag)",
  "deleted": { "@odata.type": "oneDrive.deleted"},
  "description": "string",
  "file": { "@odata.type": "oneDrive.file" },
  "fileSystemInfo": {"@odata.type": "oneDrive.fileSystemInfo"},
  "folder": { "@odata.type": "oneDrive.folder" },
  "image": { "@odata.type": "oneDrive.image" },
  "location": { "@odata.type": "oneDrive.location" },
  "package": { "@odata.type": "oneDrive.package" },
  "photo": { "@odata.type": "oneDrive.photo" },
  "remoteItem": { "@odata.type": "oneDrive.remoteItem"},
  "root": { "@odata.type": "oneDrive.root" },
  "searchResult": { "@odata.type": "oneDrive.searchResult"},
  "shared": {"@odata.type": "oneDrive.shared" },
  "sharepointIds": {"@odata.type": "oneDrive.sharepointIds" },
  "size": 1024,
  "specialFolder": { "@odata.type": "oneDrive.specialFolder" },
  "video": { "@odata.type": "oneDrive.video" },
  "webDavUrl": "url",

  /* relationships */
  "content": { "@odata.type": "Edm.Stream" },
  "children": [ { "@odata.type": "oneDrive.item" } ],
  "thumbnails": [ {"@odata.type": "oneDrive.thumbnailSet"} ],
  "permissions": [ {"@odata.type": "oneDrive.permission"} ],

  /* inherited from baseItem */
  "id": "string (identifier)",
  "createdBy": { "@odata.type": "oneDrive.identitySet" },
  "createdDateTime": "String (timestamp)",
  "eTag": "string",
  "lastModifiedBy": { "@odata.type": "oneDrive.identitySet" },
  "lastModifiedDateTime": "String (timestamp)",
  "name": "string",
  "parentReference": { "@odata.type": "oneDrive.itemReference"},
  "webUrl": "url",

  /* instance annotations */
  "@microsoft.graph.conflictBehavior": "string",
  "@microsoft.graph.downloadUrl": "url",
  "@microsoft.graph.sourceUrl": "url"
}

```

## Properties

| Property name            | Type                                                     | Description                                                                                                                                                               |
|:-------------------------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **audio**                | [AudioFacet](../facets/audio_facet.md)                   | Audio metadata, if the item is an audio file. Read-only.                                                                                                                  |
| **createdBy**            | [IdentitySet](identitySet.md)                            | Identity of the user, device, and application which created the item. Read-only.                                                                                          |
| **createdDateTime**      | [DateTimeOffset](../facets/timestamp.md)                 | Date and time of item creation. Read-only.                                                                                                                                |
| **cTag**                 | String                                                   | An eTag for the content of the item. This eTag is not changed if only the metadata is changed. **Note** This property is not returned if the Item is a folder. Read-only. |
| **deleted**              | [DeletedFacet](../facets/deleted_facet.md)               | Information about the deleted state of the item. Read-only.                                                                                                               |
| **description**          | String                                                   | Provides a user-visible description of the item. Read-write.                                                                                                              |
| **eTag**                 | String                                                   | eTag for the entire item (metadata + content). Read-only.                                                                                                                 |
| **file**                 | [FileFacet](../facets/file_facet.md)                     | File metadata, if the item is a file. Read-only.                                                                                                                          |
| **fileSystemInfo**       | [FileSystemInfoFacet](../facets/filesysteminfo_facet.md) | File system information on client. Read-write.                                                                                                                            |
| **folder**               | [FolderFacet](../facets/folder_facet.md)                 | Folder metadata, if the item is a folder. Read-only.                                                                                                                      |
| **id**                   | String                                                   | The unique identifier of the item within the Drive. Read-only.                                                                                                            |
| **image**                | [ImageFacet](../facets/image_facet.md)                   | Image metadata, if the item is an image. Read-only.                                                                                                                       |
| **lastModifiedBy**       | [IdentitySet](identitySet.md)                            | Identity of the user, device, and application which last modified the item. Read-only.                                                                                    |
| **lastModifiedDateTime** | [DateTimeOffset](../facets/timestamp.md)                 | Date and time the item was last modified. Read-only.                                                                                                                      |
| **location**             | [LocationFacet](../facets/location_facet.md)             | Location metadata, if the item has location data. Read-only.                                                                                                              |
| **name**                 | String                                                   | The name of the item (filename and extension). Read-write.                                                                                                                |
| **package**              | [PackageFacet](../facets/package_facet.md)               | If present, indicates that this item is a package instead of a folder or file. Packages are treated like files in some contexts and folders in others. Read-only.         |
| **parentReference**      | [ItemReference](itemReference.md)                        | Parent information, if the item has a parent. Read-write.                                                                                                                 |
| **photo**                | [PhotoFacet](../facets/photo_facet.md)                   | Photo metadata, if the item is a photo. Read-only.                                                                                                                        |
| **remoteItem**           | [remoteItemFacet](../facets/remoteitem_facet.md)         | Remote item data, if the item is shared from a drive other than the one being accessed. Read-only.                                                                        |
| **root**                 | [rootFacet](../facets/root_facet.md)                     | If this property is non-null, it indicates that the driveItem is the top-most driveItem in the drive.                                                                     |
| **searchResult**         | [SearchResultFacet](../facets/searchresult_facet.md)     | Search metadata, if the item is from a search result.                                                                                                                     |
| **shared**               | [SharedFacet](../facets/shared_facet.md)                 | Indicates that the item has been shared with others and provides information about the shared state of the item. Read-only.                                               |
| **sharepointIds**        | [SharepointIdsFacet](../facets/sharepointIds_facet.md)   | Returns identifiers useful for SharePoint REST compatibility. Read-only.                                                                                                  |
| **size**                 | Int64                                                    | Size of the item in bytes. Read-only.                                                                                                                                     |
| **specialFolder**        | [SpecialFolderFacet](../facets/jumpinfo_facet.md)        | If the current item is also available as a special folder, this facet is returned. Read-only.                                                                             |
| **video**                | [VideoFacet](../facets/video_facet.md)                   | Video metadata, if the item is a video. Read-only.                                                                                                                        |
| **webDavUrl**            | String                                                   | WebDAV compatible URL for the item.                                                                                                                                       |
| **webUrl**               | String                                                   | URL that displays the resource in the browser. Read-only.                                                                                                                 |

**Note:** The eTag and cTag properties work differently on containers (folders).
The cTag value is modified when content or metadata of any descendant of the folder is changed.
The eTag value is only modified when the folder's properties are changed, except for properties that are derived from descendants (like **childCount** or **lastModifiedDateTime**).

## Relationships

| Relationship       | Type                                       | Description                                                                                                                                                                       |
| :----------------- | :----------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content            | Stream                                     | The content stream, if the item represents a file.                                                                                                                                |
| children           | [driveitem](item.md)      collection       | Collection containing Item objects for the immediate children of Item. Only items representing folders have children. Read-only. Nullable.                                        |
| permissions        | [permission](permission.md) collection     | The set of permissions for the item. Read-only. Nullable.                                                                                                                         |
| thumbnails         | [thumbnailSet](thumbnailSet.md) collection | Collection containing [ThumbnailSet](thumbnailSet.md) objects associated with the item. For more info, see [getting thumbnails](../items/thumbnails.md). Read-only. Nullable. |


## Instance Attributes

Instance attributes are properties with special behaviors.
These properties are temporary and either a) define behavior the service should perform or b) provide short-term property values, like a download URL for an item that expires.

| Property name                     | Type   | Description                                                                                                                                                         |
|:----------------------------------|:-------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| @microsoft.graph.conflictBehavior | string | The conflict resolution behavior for actions that create a new item. You can use the values *fail*, *replace*, or *rename*. The default for PUT is *replace*. An item will never be returned with this annotation. Write-only. |
| @microsoft.graph.downloadUrl      | string | A URL that can be used to download this file's content. Authentication is not required with this URL. Read-only.                                                    |
| @microsoft.graph.sourceUrl        | string | When issuing a PUT request, this instance annotation can be used to instruct the service to download the contents of the URL, and store it as the file. Write-only. |

**Note:** The @microsoft.graph.downloadUrl value is a short-lived URL and can't be cached.
The URL will only be available for a short period of time (1 hour) before it is invalidated.


## Methods

| Method                                                 | REST Path
|:-------------------------------------------------------|:--------------------
| [Get item](../items/get.md)                            | `GET /drive/items/{item-id}`
| [List children](../items/list.md)                      | `GET /drive/items/{item-id}/children`
| [Create item](../items/create.md)                      | `POST /drive/items/{item-id}/children`
| [Update item](../items/update.md)                      | `PATCH /drive/items/{item-id}`
| [Upload content](../items/upload.md)                   | `PUT /drive/items/{item-id}/content`
| [Download content](../items/download.md)               | `GET /drive/items/{item-id}/content`
| [Download specific file format][download-format]       | `GET /drive/items/{item-id}/content?format={format}`
| [Delete item](../items/delete.md)                      | `DELETE /drive/items/{item-id}`
| [Move item](../items/move.md)                          | `PATCH /drive/items/{item-id}`
| [Copy item](../items/copy.md)                          | `POST /drive/items/{item-id}/copy`
| [Search items](../items/search.md)                     | `GET /drive/items/{item-id}/search(q='text')`
| [List changes in a drive](../items/view_delta.md)      | `GET /drive/items/{item-id}/delta`
| [List thumbnails](../items/thumbnails.md)              | `GET /drive/items/{item-id}/thumbnails`
| [Create sharing link](../items/sharing_createLink.md)  | `POST /drive/items/{id}/createLink`
| [Add permissions](../items/invite.md)                  | `POST /drive/items/{item-id}/invite`
| [List permissions](../items/permissions.md)            | `GET /drive/items/{item-id}/permissions`
| [Delete permission](../items/permission_delete.md)     | `DELETE /drive/items/{item-id}/permissions/{perm-id}`

[download-format]: ../items/download-format.md

## Remarks

In OneDrive for Business or SharePoint document libraries, the **cTag** property is not returned, if the **driveItem** has a [folder](../facets/folder_facet.md) facet.

<!-- uuid: 8fcb5dbc-d5aa-4681-8e31-b001d5168d79
2015-10-25 14:57:30 UTC -->
<!-- {
  "type": "#page.annotation",
  "description": "Item is the main data model in the OneDrive API. Everything is an item.",
  "keywords": "item,facet,resource",
  "section": "documentation",
  "tocPath": "Items",
  "tocBookmarks": { "Resources/Item": "#" }
} -->
