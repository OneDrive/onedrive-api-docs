# Item resource type
The metadata for an Item.
All of the top-level filesystem objects in OneDrive are Items.
Folders and Files are identified by the presence of [folder facets](folder_facet.md) and [file facets](file.md).

For a list of [methods](#methods) for this resource, see the end of this page.

### JSON representation

```json
{
	"id": {string},
	"name": {string},
	"eTag": {string},
	"cTag": {string},
	"createdBy": {IdentitySet},
	"dateTimeCreated": {timestamp},
	"lastModifiedBy": {IdentitySet},
	"dateTimeLastModified": {timestamp},
	"size": {int64},
	"parentReference": {ItemReference},
	"children": {Item Collection}
}
```
## Properties
Property Name | Type | Description | Notes
--- | --- | --- | ---
id | string | The unique identifier of the item within the Drive. |
name | string | The name of the item (filename and extension). | writeable
eTag | string | ETag for the entire item (metadata + content) |
cTag | string | An ETag for the content of the item. This ETag is not changed if only the metadata is changed. More details in [Folder](folder.md) and [File](file.md) sections |(ODB-Support: coming soon)
createdBy | [IdentitySet](identity_coll.md) | Identity of the user, device, and application which created the item. |
lastModifiedBy | [IdentitySet](identity_coll.md) | Identity of the user, device, and application which last modified the item. |
dateTimeCreated | [timestamp](timestamp.md) | Date and time of item creation. |
dateTimeLastModified | [timestamp](timestamp.md) | Date and time the item was last modified. |
size | 64-bit integer | Size of the item in bytes. |
parentReference | [ItemReference](iteminfo.md) | Parent information, if the item has a parent | writable
webUrl | String | URL that displays the resource in the browser |
file | [FileFacet](file_facet.md) | File metadata, if the item is a file |
folder | [FolderFacet](folder_facet.md) | Folder metadata, if the item is a folder |
image | [ImageFacet](photo_facet.md) | Image metadata, if the item is an image. |(ODB-Support: coming soon)
audio | [AudioFacet](audio_facet.md) | Audio metadata, if the item is an audio file. |(ODB-Support: coming soon)
video | [VideoFacet](video_facet.md) | Video metadata, if the item is a video. |(ODB-Support: coming soon)
location | [LocationFacet](location_facet.md) | Location metadata, if the item has location data. |(ODB-Support: coming soon)
tombstone | [TombstoneInfo](tombstone_info.md) | Information about the deleted state of the item. |(ODB-Support: coming soon)

## Relationships

The Item resource has the following relationships defined:

Relationship name | Type | Description
--- | --- | ---
`content` | `octet-stream` | The content stream, if the Item represents a file.
`children` | [Item](item.md) collection | Collection containing Item objects for the immediate children of Item. Only Items representing folders have children.
`coverImages` | [ItemReference](iteminfo.md) collection | Collection containing item references to cover images for the Item. Only Items representing folders have cover images. See (getting cover images)[../folder/get_coverimage.md] for more information.
`copy` | `action` | Action that creates a copy of the item.
`thumbnails` | [ThumbnailSet](thumbnail_set.md) collection | Collection containing [ThumbnailSet](thumbnail_set.md) objects associated with the Item. See [getting thumbnails](../items/get_thumbnails.md) for more information. (ODB-Support: coming soon)
`findChanges` | `function` | Get the all items under this item, including the item, that have changed .
[`search`](folders/search.md) | `function` | Search for files and folders under the item

## Methods

The complete list of methods for this resource is available in the [API](../API.md) topic.
