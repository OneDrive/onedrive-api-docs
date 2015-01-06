# Item resource type
The metadata for an Item.
All of the top-level filesystem objects in OneDrive are Items.
Folders and Files are identified by the presence of
[folder facets](../facets/folder_facet.md) and
[file facets](../facets/file_facet.md).

For a list of [methods](#methods) for this resource, see the end of this page.

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.item",
       "optionalProperties": ["children", "folder", "file", "image", "audio",
       "video", "location", "tombstone", "jumpInfo", "thumbnails"] } -->
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
  "parentReference": { "@odata.type": "oneDrive.itemReference"},
  "children": { "@odata.type": "Collection(oneDrive.item)" },
  "folder": { "@odata.type": "oneDrive.folder" },
  "file": { "@odata.type": "oneDrive.file" },
  "image": { "@odata.type": "oneDrive.image" },
  "audio": { "@odata.type": "oneDrive.audio" },
  "video": { "@odata.type": "oneDrive.video" },
  "location": { "@odata.type": "oneDrive.location" },
  "tombstone": { "@odata.type": "oneDrive.tombstone"},
	"jumpInfo": { "@odata.type": "oneDrive.jumpinfo" },
  "thumbnails": [ {"@odata.type": "oneDrive.thumbnailSet"} ]
}
```
## Properties
| Property Name        | Type                               | Description                                                                                    | Notes                          |
|:---------------------|:-----------------------------------|:-----------------------------------------------------------------------------------------------|:-------------------------------|
| id                   | string                             | The unique identifier of the item within the Drive.                                            |                                |
| name                 | string                             | The name of the item (filename and extension).                                                 | writeable                      |
| eTag                 | string                             | ETag for the entire item (metadata + content)                                                  |                                |
| cTag                 | string                             | An ETag for the content of the item. This ETag is not changed if only the metadata is changed. |                                |
| createdBy            | [IdentitySet](identitySet.md)      | Identity of the user, device, and application which created the item.                          |                                |
| lastModifiedBy       | [IdentitySet](identitySet.md)      | Identity of the user, device, and application which last modified the item.                    |                                |
| dateTimeCreated      | [timestamp](../facets/timestamp.md)          | Date and time of item creation.                                                                |                                |
| dateTimeLastModified | [timestamp](../facets/timestamp.md)          | Date and time the item was last modified.                                                      |                                |
| size                 | 64-bit integer                     | Size of the item in bytes.                                                                     |                                |
| parentReference      | [ItemReference](iteminfo.md)       | Parent information, if the item has a parent                                                   | writable                       |
| webUrl               | String                             | URL that displays the resource in the browser                                                  |                                |
| file                 | [FileFacet](../facets/file_facet.md)         | File metadata, if the item is a file                                                           |                                |
| folder               | [FolderFacet](../facets/folder_facet.md)     | Folder metadata, if the item is a folder                                                       |                                |
| image                | [ImageFacet](../facets/photo_facet.md)       | Image metadata, if the item is an image.                                                       |                                |
| audio                | [AudioFacet](../facets/audio_facet.md)       | Audio metadata, if the item is an audio file.                                                  |                                |
| video                | [VideoFacet](../facets/video_facet.md)       | Video metadata, if the item is a video.                                                        |                                |
| location             | [LocationFacet](../facets/location_facet.md) | Location metadata, if the item has location data.                                              |                                |
| tombstone            | [TombstoneInfo](../facets/tombstone_facet.md) | Information about the deleted state of the item.                                               |                                |

## Relationships

The Item resource has the following relationships defined:

| Relationship name              | Type                                        | Description                                                                                                                                                                                          |
|:-------------------------------|:--------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `content`                      | `octet-stream`                              | The content stream, if the Item represents a file.                                                                                                                                                   |
| `children`                     | [Item](item.md) collection                  | Collection containing Item objects for the immediate children of Item. Only Items representing folders have children.                                                                                |
| `copy`                         | `action`                                    | Action that creates a copy of the item.                                                                                                                                                              |
| `thumbnails`                   | [ThumbnailSet](thumbnailSet.md) collection | Collection containing [ThumbnailSet](thumbnailSet.md) objects associated with the Item. See [getting thumbnails](../items/get_thumbnails.md) for more information. (ODB-Support: coming soon)       |
| `findChanges`                  | `function`                                  | Get the all items under this item, including the item, that have changed .                                                                                                                           |
| [`search`](../items/search.md) | `function`                                  | Search for files and folders under the item                                                                                                                                                          |

## Methods

The complete list of methods for this resource is available in
the [API](../README.md) topic.
