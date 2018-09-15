---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: DriveItem - OneDrive API
---
# DriveItem resource type

The **driveItem** resource represents a file, folder, or other item stored in a drive.
All file system objects in OneDrive and SharePoint are returned as **driveItem** resources.

There are two primary ways of addressing a **driveItem** resource:

* By the **driveItem** unique identifier using `drive/items/{item-id}`
* By file system path using `/drive/root:/path/to/file`

**DriveItem** resources have facets modeled as properties that provide data about the driveItem's identities and capabilities.
For example:

* Folders have a [**folder facet**][folder]
* Files have a [**file facet**][file].
* Images have an [**image facet**][image] in addition to their file facet.

Items with the **folder** facet act as containers of items and therefore have a `children` reference pointing to a collection of **driveItems** under the folder.

## JSON representation

Here is a JSON representation of a **driveItem** resource.

The **driveItem** resource is derived from [**baseItem**][baseItem] and inherits properties from that resource.

<!-- { "blockType": "resource", "@type": "oneDrive.item",
       "baseType": "oneDrive.baseItem",
       "optionalProperties": ["cTag", "children", "folder", "file", "image", "video",
       "location", "deleted", "specialFolder", "photo", "searchResult", "remoteItem",
       "shared", "content", "@name.conflictBehavior", "@content.downloadUrl", "@content.sourceUrl",
       "sharepointIds"],
       "keyProperty": "id", "openType": true } -->

```json
{
  "content": { "@odata.type": "Edm.Stream" },
  "cTag": "string (etag)",
  "deleted": { "@odata.type": "oneDrive.deleted"},
  "file": { "@odata.type": "oneDrive.file" },
  "fileSystemInfo": { "@odata.type": "oneDrive.fileSystemInfo" },
  "folder": { "@odata.type": "oneDrive.folder" },
  "image": { "@odata.type": "oneDrive.image" },
  "malware": { "@odata.type": "oneDrive.malware" },
  "package": { "@odata.type": "oneDrive.package" },
  "publication": {"@odata.type": "oneDrive.publicationFacet"},
  "remoteItem": { "@odata.type": "oneDrive.remoteItem" },
  "root": { "@odata.type": "oneDrive.root" },
  "searchResult": { "@odata.type": "oneDrive.searchResult" },
  "shared": { "@odata.type": "oneDrive.shared" },
  "sharepointIds": { "@odata.type": "oneDrive.sharepointIds" },
  "size": 1024,
  "specialFolder": { "@odata.type": "oneDrive.specialFolder" },
  "video": { "@odata.type": "oneDrive.video" },
  "webDavUrl": "string",

  /* relationships */
  "children": [{ "@odata.type": "oneDrive.item" }],
  "permissions": [ {"@odata.type": "oneDrive.permission"} ],
  "subscriptions": [ {"@odata.type": "oneDrive.subscription"} ],
  "versions": [ {"@odata.type": "oneDrive.driveItemVersion"}],

  /* inherited from baseItem */
  "id": "string (identifier)",
  "createdBy": {"@odata.type": "oneDrive.identitySet"},
  "createdDateTime": "String (timestamp)",
  "eTag": "string",
  "lastModifiedBy": {"@odata.type": "oneDrive.identitySet"},
  "lastModifiedDateTime": "String (timestamp)",
  "name": "string",
  "parentReference": {"@odata.type": "oneDrive.itemReference"},
  "webUrl": "string",

  /* instance annotations */
  "@name.conflictBehavior": "string",
  "@content.downloadUrl": "url",
  "@content.sourceUrl": "url"
}
```

## Properties

| Property             | Type               | Description
|:---------------------|:-------------------|:---------------------------------
| content              | Stream             | The content stream, if the item represents a file.
| createdBy            | [identitySet][]    | Identity of the user, device, and application which created the item. Read-only.
| createdDateTime      | DateTimeOffset     | Date and time of item creation. Read-only.
| cTag                 | String             | An eTag for the content of the item. This eTag is not changed if only the metadata is changed. **Note** This property is not returned if the item is a folder. Read-only.
| deleted              | [deleted][]        | Information about the deleted state of the item. Read-only.
| eTag                 | String             | eTag for the entire item (metadata + content). Read-only.
| file                 | [file][]           | File metadata, if the item is a file. Read-only.
| fileSystemInfo       | [fileSystemInfo][] | File system information on client. Read-write.
| folder               | [folder][]         | Folder metadata, if the item is a folder. Read-only.
| id                   | String             | The unique identifier of the item within the Drive. Read-only.
| image                | [image][]          | Image metadata, if the item is an image. Read-only.
| lastModifiedBy       | [identitySet][]    | Identity of the user, device, and application which last modified the item. Read-only.
| lastModifiedDateTime | DateTimeOffset     | Date and time the item was last modified. Read-only.
| malware              | [malware][]        | Malware metadata, if the item was detected to contain malware. Read-only.
| name                 | String             | The name of the item (filename and extension). Read-write.
| package              | [package][]        | If present, indicates that this item is a package instead of a folder or file. Packages are treated like files in some contexts and folders in others. Read-only.
| parentReference      | [itemReference][]  | Parent information, if the item has a parent. Read-write.
| publication          | [publicationFacet][] | Provides information about the published or checked-out state of an item, in locations that support such actions. This property is not returned by default. Read-only. |
| remoteItem           | [remoteItem][]     | Remote item data, if the item is shared from a drive other than the one being accessed. Read-only.
| root                 | [root][]           | If this property is non-null, it indicates that the driveItem is the top-most driveItem in the drive.
| searchResult         | [searchResult][]   | Search metadata, if the item is from a search result. Read-only.
| shared               | [shared][]         | Indicates that the item has been shared with others and provides information about the shared state of the item. Read-only.
| sharepointIds        | [sharepointIds][]  | Returns identifiers useful for SharePoint REST compatibility. Read-only.
| size                 | Int64              | Size of the item in bytes. Read-only.
| specialFolder        | [specialFolder][]  | If the current item is also available as a special folder, this facet is returned. Read-only.
| video                | [video][]          | Video metadata, if the item is a video. Read-only.
| webDavUrl            | String             | WebDAV compatible URL for the item.
| webUrl               | String             | URL that displays the resource in the browser. Read-only.

**Note:** The eTag and cTag properties work differently on containers (folders).
The cTag value is modified when content or metadata of any descendant of the folder is changed.
The eTag value is only modified when the folder's properties are changed, except for properties that are derived from descendants (like **childCount** or **lastModifiedDateTime**).

## Relationships

| Relationship       | Type                        | Description
|:-------------------|:----------------------------|:--------------------------
| children           | item collection        | Collection containing Item objects for the immediate children of Item. Only items representing folders have children. Read-only. Nullable.
| listItem           | [listItem][]                | For drives in SharePoint, the associated document library list item. Read-only. Nullable.
| permissions        | [permission][] collection   | The set of permissions for the item. Read-only. Nullable.
| subscriptions      | [subscription][] collection   | The set of webhook subscriptions for the item.Only available on the root folder of a drive. Read-only. Nullable.
| versions           | [driveItemVersion][] collection | The list of previous versions of the item. For more info, see [getting previous versions][]. Read-only. Nullable.

## Instance Attributes

Instance attributes are properties with special behaviors.
These properties are temporary and either a) define behavior the service should perform or b) provide short-term property values, like a download URL for an item that expires.

| Property name                     | Type   | Description
|:----------------------------------|:-------|:--------------------------------
| @name.conflictBehavior | string | The conflict resolution behavior for actions that create a new item. You can use the values *fail*, *replace*, or *rename*. The default for PUT is *replace*. An item will never be returned with this annotation. Write-only.
| @content.downloadUrl      | string | A URL that can be used to download this file's content. Authentication is not required with this URL. Read-only.
| @content.sourceUrl        | string | When issuing a PUT request, this instance annotation can be used to instruct the service to download the contents of the URL, and store it as the file. Write-only.

**Note:** The @content.downloadUrl value is a short-lived URL and can't be cached.
The URL will only be available for a short period of time (1 hour) before it is invalidated.

## Methods

| Method                                                   | REST Path
|:---------------------------------------------------------|:------------------
| [Get item](../api/driveitem_get.md)                      | `GET /drive/items/{item-id}`
| [List children](../api/driveitem_list_children.md)       | `GET /drive/items/{item-id}/children`
| [List versions](../api/driveitem_list_versions.md)       | `GET /drive/items/{item-id}/versions`
| [Create item](../api/driveitem_post_children.md)         | `POST /drive/items/{item-id}/children`
| [Update item](../api/driveitem_update.md)                | `PATCH /drive/items/{item-id}`
| [Upload content](../api/driveitem_put_content.md)        | `PUT /drive/items/{item-id}/content`
| [Download content](../api/driveitem_get_content.md)      | `GET /drive/items/{item-id}/content`
| [Delete item](../api/driveitem_delete.md)                | `DELETE /drive/items/{item-id}`
| [Move item](../api/driveitem_move.md)                    | `PATCH /drive/items/{item-id}`
| [Copy item](../api/driveitem_copy.md)                    | `POST /drive/items/{item-id}/oneDrive.copy`
| [Search items](../api/driveitem_search.md)               | `GET /drive/items/{item-id}/oneDrive.search(q='text')`
| [List changes in a drive](../api/driveitem_delta.md)     | `GET /drive/root/oneDrive.delta`
| [Create sharing link](../api/driveitem_createlink.md)    | `POST /drive/items/{item-id}oneDrive.`
| [Add permissions](../api/driveitem_invite.md)            | `POST /drive/items/{item-id}/oneDrive.invite`
| [List permissions](../api/driveitem_list_permissions.md) | `GET /drive/items/{item-id}/permissions`
| [Delete permission](../api/permission_delete.md)         | `DELETE /drive/items/{item-id}/permissions/{perm-id}`
| [Create subscription][]                                  | `POST /drive/root/subscriptions`
| [Update subscription][]                                  | `PATCH /drive/root/subscriptions/{subscription-id}`
| [Delete subscription][]                                  | `DELETE /drive/root/subscriptions/{subscription-id`

## Remarks

In OneDrive for Business or SharePoint document libraries, the **cTag** property is not returned, if the **driveItem** has a [folder][] facet.

[baseItem]: baseItem.md
[deleted]: deleted.md
[driveItemVersion]: driveItemVersion.md
[file]: file.md
[fileSystemInfo]: fileSystemInfo.md
[folder]: folder.md
[getting previous versions]: ../api/driveitem_list_versions.md
[identitySet]: identitySet.md
[image]: image.md
[itemReference]: itemReference.md
[listItem]: listItem.md
[malware]: malware.md
[package]: package.md
[permission]: permission.md
[remoteItem]: remoteItem.md
[root]: root.md
[searchResult]: searchResult.md
[shared]: shared.md
[sharepointIds]: sharepointIds.md
[specialFolder]: specialFolder.md
[subscription]: subscription.md
[video]: video.md
[publicationFacet]: publicationfacet.md
[Create subscription]: ../api/subscription_post_subscriptions.md
[Update subscription]: ../api/subscription_update.md
[Delete subscription]: ../api/subscription_delete.md

<!-- {
  "type": "#page.annotation",
  "description": "Item is the main data model in the OneDrive API. Everything is an item.",
  "keywords": "item,facet,resource",
  "section": "documentation",
  "tocPath": "Items",
  "tocBookmarks": { "Resources/Item": "#" }
} -->
