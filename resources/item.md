# Item resource

The item resource represents an item in a drive. All top-level filesystem objects
in OneDrive are returned as item resources. They can be accessed by their **id**
using the `/items/{item-id}` syntax, or by their file system path using the
`/drive/root:/path/to/file` syntax.

Items have [Facets](../facets/facets.md) that provide data about the item's
identities and capabilities. Folders have a [**folder** facet](../facets/folder_facet.md)
and files have a [**file facet**](../facets/file_facet.md). Images have an
[**image facet**](../facets/image_facet.md) in addition to their file facet.

Items with the **folder** facet act as containers of items and therefore
have a `children` reference pointing to a collection of items under the folder.

## Tasks on item resources

The following tasks are available for item resources.

| Common task                                         | HTTP method (by ID)                                    | HTTP method (by path)                            |
|:----------------------------------------------------|:-------------------------------------------------------|:-------------------------------------------------|
| [Get metadata for an Item](../items/get.md)         | `GET /drive/items/{id}`                                | `GET /drive/root:/{path}`                        |
| [List an Item's children](../items/list.md)         | `GET /drive/items/{id}/children`                       | `GET /drive/root:/{path}:/children`              |
| [Create a Folder](../items/create.md)               | `POST /drive/items/{parent-id}/children`               | `POST /drive/root:/{parent-path}:/children`      |
| [Upload an Item's contents](../items/upload.md)     | `PUT /drive/items/{parent-id}/children/{name}/content` | `PUT /drive/root:/{parent-path}/{name}:/content` |
| [Update an Item's contents](../items/update.md)     | `PATCH /drive/items/{id}`                              | `PATCH /drive/root:/{path}`                      |
| [Delete an Item](../items/delete.md)                | `DELETE /drive/items/{id}`                             | `DELETE /drive/root:/{path}`                     |
| [Move an Item](../items/move.md)                    | `PATCH /drive/items/{id}`                              | `PATCH /drive/root:/{path}`                      |
| [Copy an Item](../items/copy.md)                    | `POST /drive/items/{id}/action.copy`                   | `POST /drive/root:/{path}:/action.copy`          |
| [Download an Item's contents](../items/download.md) | `GET /drive/items/{id}/content`                        | `GET /drive/root:/{path}:/content`               |
| [Search for an Item](../items/search.md)            | `GET /drive/items/{id}/view.search`                    | `GET /drive/root:/{path}:/view.search`           |
| [View changes on an Item][item-changes]             | `GET /drive/items/{id}/view.delta`                     | `GET /drive/root:/{path}:/view.delta`            |
| [Get thumbnails for an Item][get-thumbnails]        | `GET /drive/items/{id}/thumbnails`                     | `GET /drive/root:/{path}:/thumbnails`            |
| [Sharing by link](../items/sharing_createLink.md)   | `POST /drive/items/{id}/action.createLink`             | `POST /drive/root:/{path}:/action.createLink`    |

[item-changes]: ../items/view_delta.md
[get-thumbnails]: ../items/thumbnails.md

## JSON representation
Here is a JSON representation of an Item.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.item",
       "optionalProperties": ["cTag", "children", "folder", "file", "image", "audio", "video",
       "location", "deleted", "specialFolder", "photo", "thumbnails", "searchResult", "remoteItem",
       "shared", "content", "@name.conflictBehavior", "@content.downloadUrl", "@content.sourceUrl",
       "sharepointIds"],
       "keyProperty": "id", "openType": true } -->
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
  "webDavUrl": "url",
  "description": "string",
  "parentReference": { "@odata.type": "oneDrive.itemReference"},
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
  "shared": {"@odata.type": "oneDrive.shared" },
  "sharepointIds": {"@odata.type": "oneDrive.sharepointIds" },
  "children": [ { "@odata.type": "oneDrive.item" } ],
  "thumbnails": [ {"@odata.type": "oneDrive.thumbnailSet"} ],
  "@name.conflictBehavior": "string",
  "@content.downloadUrl": "url",
  "@content.sourceUrl": "url",
  "content": { "@odata.type": "Edm.Stream" }
}
```
## Properties
The Item object has these properties.

| Property name            | Type                                                     | Description                                                                                                                                                               |
|:-------------------------|:---------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **id**                   | String                                                   | The unique identifier of the item within the Drive. Read-only.                                                                                                            |
| **audio**                | [AudioFacet](../facets/audio_facet.md)                   | Audio metadata, if the item is an audio file. Read-only.                                                                                                                  |
| **createdBy**            | [IdentitySet](identitySet.md)                            | Identity of the user, device, and application which created the item. Read-only.                                                                                          |
| **createdDateTime**      | [DateTimeOffset](../facets/timestamp.md)                 | Date and time of item creation. Read-only.                                                                                                                                |
| **cTag**                 | String                                                   | An eTag for the content of the item. This eTag is not changed if only the metadata is changed. **Note** This property is not returned if the Item is a folder. Read-only. |
| **deleted**              | [DeletedFacet](../facets/deleted_facet.md)               | Information about the deleted state of the item. Read-only.                                                                                                               |
| **description**          | String                                                   | Provide a user-visible description of the item. Read-write.                                                                                                               |
| **eTag**                 | String                                                   | eTag for the entire item (metadata + content). Read-only.                                                                                                                 |
| **file**                 | [FileFacet](../facets/file_facet.md)                     | File metadata, if the item is a file. Read-only.                                                                                                                          |
| **fileSystemInfo**       | [FileSystemInfoFacet](../facets/filesysteminfo_facet.md) | File system information on client. Read-write.                                                                                                                            |
| **folder**               | [FolderFacet](../facets/folder_facet.md)                 | Folder metadata, if the item is a folder. Read-only.                                                                                                                      |
| **image**                | [ImageFacet](../facets/image_facet.md)                   | Image metadata, if the item is an image. Read-only.                                                                                                                       |
| **lastModifiedBy**       | [IdentitySet](identitySet.md)                            | Identity of the user, device, and application which last modified the item. Read-only.                                                                                    |
| **lastModifiedDateTime** | [DateTimeOffset](../facets/timestamp.md)                 | Date and time the item was last modified. Read-only.                                                                                                                      |
| **location**             | [LocationFacet](../facets/location_facet.md)             | Location metadata, if the item has location data. Read-only.                                                                                                              |
| **name**                 | String                                                   | The name of the item (filename and extension). Read-write.                                                                                                                |
| **package**              | [PackageFacet](../facets/package_facet.md)               | If present, indicates that this item is a package instead of a folder or file. Packages are treated like files in some contexts and folders in others. |
| **parentReference**      | [ItemReference](itemReference.md)                        | Parent information, if the item has a parent. Read-write.                                                                                                                 |
| **photo**                | [PhotoFacet](../facets/photo_facet.md)                   | Photo metadata, if the item is a photo. Read-only.                                                                                                                        |
| **remoteItem**           | [remoteItemFacet](../facets/remoteitem_facet.md)         | Remote item data, if the item is shared from a remote drive.                                                                                                           |
| **searchResult**         | [SearchResultFacet](../facets/searchresult_facet.md)     | Search metadata, if the item is from a search result.                                                                                                                     |
| **shared**               | [SharedFacet](../facets/shared_facet.md)                 | Indicates that the item has been shared with others and provides information about the shared state of the item. Read-only.                                              |
| **sharepointIds**        | [SharepointIdsFacet](../facets/sharepointIds_facet.md)   | Access to the unique identifiers for this item via SharePoint REST API. Read-only.                                                                                        |
| **size**                 | Int64                                                    | Size of the item in bytes. Read-only.                                                                                                                                     |
| **specialFolder**        | [SpecialFolderFacet](../facets/jumpinfo_facet.md)        | If the current item is also available as a special folder, this facet is returned. Read-only.                                                                             |
| **video**                | [VideoFacet](../facets/video_facet.md)                   | Video metadata, if the item is a video. Read-only.                                                                                                                        |
| **webDavUrl**            | String                                                   | DAV compatible URL for the item.                                                                                                                                          |
| **webUrl**               | String                                                   | URL that displays the resource in the browser. Read-only.                                                                                                                 |


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
| **content**       | Stream                                     | The content stream, if the Item represents a file.                                                                                                       |
| **children**      | [Item](item.md) collection                 | Collection containing Item objects for the immediate children of Item. Only items representing folders have children.                                    |
| **thumbnails**    | [ThumbnailSet](thumbnailSet.md) collection | Collection containing [ThumbnailSet](thumbnailSet.md) objects associated with the item. For more info, see [getting thumbnails](../items/thumbnails.md). |

## Remarks

In OneDrive for Business, the **cTag** property is not returned,
if the Item is a [folder](../facets/folder_facet.md).

In OneDrive Personal, the **sharepointIds** property is unavailable.

<!-- {
  "type": "#page.annotation",
  "description": "Item is the main data model in the OneDrive API. Everything is an item.",
  "keywords": "item,facet,resource",
  "section": "documentation",
  "tocPath": "Items",
  "tocBookmarks": { "Resources/Item": "#" }
} -->
