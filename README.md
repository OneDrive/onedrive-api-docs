# Develop with the OneDrive API
The OneDrive API provides access to data stored within a user's OneDrive. Most
interactions with OneDrive API resources follow RESTful patterns, but some
function calls are also available for simplicity.

This API supports OData V4 at the [minimum conformance level](http://docs.oasis-open.org/odata/odata/v4.0/os/part1-protocol/odata-v4.0-os-part1-protocol.html#_Toc372793759).
Some of the features of the OneDrive API might not
be available via the OData metadata or generated content. For more information, see
[OData Support](odata/odata-support.md).

### Prerequisites
To use the OneDrive API, we assume that:

* You have an app to which you want to provide OneDrive support. Your app can be a [Windows Universal app](https://dev.windows.com/en-us/develop), [iOS](https://developer.apple.com/devcenter/ios/index.action), [Android](http://developer.android.com/index.html), or [Web app](http://www.microsoft.com/web/).
* You have a development environment, like [Visual Studio](https://msdn.microsoft.com/en-us/vstudio/aa718325.aspx) or [Android Studio](http://developer.android.com/tools/studio/index.html), that is set up and ready for you to write code.
* You are familiar with [REST](http://en.wikipedia.org/wiki/Representational_state_transfer) and [OAuth 2.0](http://oauth.net/2/).

## Getting started with OneDrive API
To get started, follow these steps.

### 1. Authenticate your app
OneDrive uses [OAuth 2.0](http://oauth.net/2/) for [authentication](auth/msa_oauth.md). You get an access token that authenticates your app
with a particular set of permissions for a user. You can
provide an authentication token for each API call in two different ways:

* An HTTP header: `Authorization: bearer {token}`
* A query parameter: `?access_token={token}`

See [authentication](auth/msa_oauth.md) to obtain an authentication token and sign the user in.

### 2. URL root
Now that you've authenticated your app, you can call the OneDrive API with your access token against the URL root below, combined with one of the [root resources](#root-resources). See [Drive resource](#drive-resource) and [Item resource](#item-resource) for examples on how to make calls to the OneDrive API. OneDrive API URLs are relative to the following root unless otherwise noted.

| Service  | URL Root                        |
|:---------|:--------------------------------|
| OneDrive | `https://api.onedrive.com/v1.0` |

#### API versions
OneDrive uses a version number in the URL. Be sure to include the version
immediately after the host name, or the URL won't work.

```
https://api.onedrive.com/v1.0/
```

**Note:** Throughout this documentation, only partial syntax such as: `GET /drive/items/{item-id}`
is used for the sake of brevity. Prefix the path with the correct root
URL and version in order to obtain the full resource path or URL.

## Resource model
The OneDrive API exposes two major resource types:

* [Drive](#drive-resource) _(top-level object)_
* [Item](#item-resource) _(files, folders, and so on.)_

The following is an example of a resource.
<!-- {"blockType": "ignored", "@odata.type": "oneDrive.item"} -->
```json
{
  "@content.downloadUrl":"http://public-sn3302.files.1drv.com/y2pcT7OaUEExF7EHOlpTjCE55mIUoiX7H3sx1ff6I-nP35XUTBqZlnkh9FJhWb_pf9sZ7LEpEchvDznIbQig0hWBeidpwFkOqSKCwQylisarN6T0ecAeMvantizBUzM2PA1",
  "createdDateTime": "2014-10-31T03:37:04.72Z",
  "cTag": "aYzpENDY0OEYwNkM5MUQ5RDNEITU0OTI3LjI1Ng",
  "eTag": "aRDQ2NDhGMDZDOTFEOUQzRCE1NDkyNy4w",
  "id":"D4648F06C91D9D3D!54927",
  "lastModifiedBy": {
    "user": {
      "displayName": "daron spektor",
      "id": "d4648f06c91d9d3d"
    }
  },
  "name":"BritishShorthair.jpg",
  "size":35212,
  "image":{
    "height":398,
    "width":273
  },
  "file": {
    "hashes":{
      "crc32Hash":"omY5NA==",
      "sha1Hash":"wmgPQ6jrSeMX7JP1XmstQEGM2fc="
    },
    "mimeType":"image/jpeg"
  }
}
```

Resources expose data in three different ways:

* _Properties_ (like `id` and `name`) expose simple values.
* _Facets_ (like `file` and `photo`) expose complex values. The presence of
  `file` or `folder` facets indicates the type of an Item.
* _References_ (like `children`) point to collections of other resources.

You can expand references in your URL with the _expand_ query parameter, for example,
`?expand=children`. Request specific properties and facets with the
_select_ query parameter, for example, `?select=id,name`. By default, all properties
and facets are returned, and all references are hidden. For efficiency, we
recommend that you specify _select_ and _expand_ for the data you care about.

For details about resources, see [Resources](resources/resources.md).

### Root resources

Use these root resources to access an item or drive.

| Path                               | Resource                                                            |
|:-----------------------------------|:--------------------------------------------------------------------|
| `/drive`                           | User's default [Drive](#drive-resource).                            |
| `/drives`                          | List [Drives](#drive-resource) available to the authenticated user. |
| `/drives/{drive-id}`               | Access a specific [Drive](#drive-resource) by its ID.               |
| `/drives/{drive-id}/root/children` | List items in the root of a specific [Drive](#drive-resource).      |
| `/drive/items/{item-id}`           | Access an [Item](#item-resource) by its ID.                         |


Items can also be addressed by path, by putting a colon after any item
or drive URL, and following it with the relative path to the item. The next
table shows how to use a colon in the URL address. You might optionally
transition back to addressing the resource model by putting another
colon at the end. Ensure your request follows the
[path encoding](misc/path-encoding.md) requirements.  

| Path                                             | Resource                                                               |
|:-------------------------------------------------|:-----------------------------------------------------------------------|
| `/drive/root:/path/to/file`                      | Access an [Item](#item-resource) by path under the root.               |
| `/drive/items/{item-id}:/path/to/file`           | Access an [Item](#item-resource) by its path relative to another item. |
| `/drive/root:/path/to/file:/children`            | List children when accessing by path relative to the drive root.       |
| `/drive/items/{item-id}:/path/to/file:/children` | List children when accessing by path relative to another item.         |

### Drive resource
The [Drive][drive-resource] is the top level object within a user's OneDrive.
A user will always have at least one Drive available--the default Drive.

In the next table, the examples use `/drive`, but
`/drives/{drive-id}` is valid too.

| Common task                                             | HTTP method                    |
|:--------------------------------------------------------|:-------------------------------|
| [Get user's default Drive metadata][drive-default]      | `GET /drive`                   |
| [Get Drive metadata of another Drive][drive-get]        | `GET /drives/{drive-id}`       |
| [Get root folder for user's default Drive][item-get]    | `GET /drive/root`              |
| [List children under the Drive][item-children]          | `GET /drive/root/children`     |
| [List changes for all Items in the Drive][item-changes] | `GET /drive/root/view.changes` |
| [Search for Items in the Drive][item-search] (preview)  | `GET /drive/root/view.search`  |
| [Access special folder](#special-folders)               | `GET /drive/special/{name}`    |

For more info about Drives, see [Drive][drive-resource].

### Item resource
[Items][item-resource] are the objects inside the OneDrive file system. They
can be accessed by their `id` using the `/items/{item-id}` syntax, or by their
file system path using the `/drive/root:/path/to/file` syntax. Items have
[Facets](resources/resources.md) that expose data about their identities and
capabilities. Folders have a Folder facet and files have a File facet. Images
have an Image facet in addition to their File facet.

Folders act as containers of items, and have a `children` reference pointing to
a collection of items under the folder.

| Common task                                      | HTTP method (by ID)                                    | HTTP method (by path)                            |
|:-------------------------------------------------|:-------------------------------------------------------|:-------------------------------------------------|
| [Get metadata for an Item](items/get.md)         | `GET /drive/items/{id}`                                | `GET /drive/root:/{path}`                        |
| [List an Item's children](items/list.md)         | `GET /drive/items/{id}/children`                       | `GET /drive/root:/{path}:/children`              |
| [Create an Item](items/create.md)                | `PUT /drive/items/{parent-id}/children/{name}`         | `PUT /drive/root:/{parent-path}/{name}`          |
| [Upload an Item's contents](items/upload.md)     | `PUT /drive/items/{parent-id}/children/{name}/content` | `PUT /drive/root:/{parent-path}/{name}:/content` |
| [Update an Item's contents](items/update.md)     | `PATCH /drive/items/{id}`                              | `PATCH /drive/root:/{path}`                      |
| [Delete an Item](items/delete.md)                | `DELETE /drive/items/{id}`                             | `DELETE /drive/root:/{path}`                     |
| [Move an Item](items/move.md)                    | `PATCH /drive/items/{id}`                              | `PATCH /drive/root:/{path}`                      |
| [Copy an Item](items/copy.md)                    | `POST /drive/items/{id}/action.copy`                   | `POST /drive/root:/{path}:/action.copy`          |
| [Download an Item's contents](items/download.md) | `GET /drive/items/{id}/content`                        | `GET /drive/root:/{path}:/content`               |
| [Search for an Item](items/search.md)            | `GET /drive/items/{id}/view.search`                    | `GET /drive/root:/{path}:/view.search`           |
| [View changes on an Item][item-changes]          | `GET /drive/items/{id}/view.changes`                   | `GET /drive/root:/{path}:/view.changes`          |

[item-changes]: items/view_changes.md

## Special folders
Commonly used folders like Documents and Photos can be accessed with static
names regardless of the folder's actual name and location in a user's OneDrive.

To learn more about addressing a folder, see [special folders](items/special_folders.md).

## Sharing and permissions

[Items][item-resource] can be shared with other people through a
a unique link for the recipient to access the shared items.

* New permissions can only be created with the
  [createLink](items/sharing_createLink.md) action.

| Task                                                 | HTTP method (by ID)                        | HTTP method (by Path)                         |
|:-----------------------------------------------------|:-------------------------------------------|:----------------------------------------------|
| [Create a sharing link](items/sharing_createLink.md) | `POST /drive/items/{id}/action.createLink` | `POST /drive/root:/{path}:/action.createLink` |

## Programming notes

### Throttling
OneDrive has limits in place to make sure that individuals and apps do not
adversely affect the experience of other users. When an activity exceeds OneDrive's
limits, API requests will be rejected for a period of time. OneDrive may also
return a *Retry-After* header with the number of seconds your app should wait
before sending more requests.

```
HTTP/1.1 429 Too Many Requests  
Retry-After: 3600
```

# Related topics
The following topics contain high level overviews of other concepts that apply
to the OneDrive API.

* [Authentication and sign in](auth/msa_oauth.md)
* [Addressing resources](misc/addressing.md)
* [Case sensitivity](misc/case-sensitivity.md)
* [Error responses](misc/errors.md)
* [HTTP verb tunneling](misc/verb-tunneling.md)
* [Pretty printing](misc/pretty-printing.md)
* [Terms of use](terms-of-use.md)


### Documentation Validation Status
[![Build status](https://ci.appveyor.com/api/projects/status/jummmj5gb9q28lfr?svg=true)](https://ci.appveyor.com/project/rgregg/onedrive-api-docs)

Our documentation is tested against the service on every change.

[drive-default]: drives/default.md
[drive-resource]: resources/drive.md
[item-resource]: resources/item.md
[drive-get]: drives/get.md
[item-changes]: items/view_changes.md
[item-search]: items/search.md
[item-children]: items/list.md
[permission-resource]: facets/permission_facet.md
[item-get]: items/get.md
