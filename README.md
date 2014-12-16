# OneDrive APIs
The OneDrive API provides access to data stored within OneDrive. Most
interaction with resources follows RESTful patterns, but some function calls are
 also available for simplicity.


The API supports OData V4 at the [minimum conformance level](http://docs.oasis-open.org/odata/odata/v4.0/os/part1-protocol/odata-v4.0-os-part1-protocol.html#_Toc372793759).
Any deviations are documented. Some of the features of the OneDrive API may not
be available via the OData metadata or generated content. See the topic on
[OData Support](odata/readme.md) for more details.


## URL Roots
OneDrive API URLs are relative to the following roots unless otherwise noted:

Service               | URL Root
----------------------|----------------------------
OneDrive              | `https://api.onedrive.com/`
OneDrive for Business | `https://{tenant}-my.sharepoint.com/_api/` <br>Use the [Office 365 Discovery Service APIs][o365discoveryapi] to discover the URL root

[o365discoveryapi]: http://msdn.microsoft.com/en-us/library/office/dn776441(v=office.15).aspx

**Note:** Throughout the docs, only partial syntax such as: `GET /items/{item-id}`
is used for the sake of clarity. The path needs to be prefixed with correct root
 URL in order to obtain the full resource path or URL.

## Authentication
OneDrive uses OAuth 2.0 for authentication. An authentication token must be
provided on every API call via one of the following:
* An HTTP header: `Authorization: bearer {token}`
* A query parameter: `?access_token={token}`

See the [authentication](auth/readme.md) section for details on obtaining an
authentication token.

## Throttling
OneDrive has limits in place to make sure that individuals and applications do not
adversely affect the experience of other requests.  When an activity exceeds a
number of requests per second, these requests will hit a limit and be
rejected, there will also be a Retry-After header, with the date where the
next request will be accepted.

```
HTTP/1.1 429 Too Many Requests  
Retry-After: Sat, 1 Jan 2000 00:00:00 GMT
```

## Versioning
OneDrive uses a version element to allow breaking changes to the API in the
future. All API URLs must include a version immediately after the hostname:

```
https://api.onedrive.com/v1.0/drive/
https://{tenant}-my.sharepoint.com/v2.0/me/drive/
```

Although this syntax is omitted throughout this document, it is required to make
calls to the API.

## Resource Model
There are two major resource types exposed in the OneDrive API:
* [Drive](#drive) _(top-level object)_
* [Item](#item) _(files, folders, etc.)_

Example resource:
```json
{
  "id":"D4648F06C91D9D3D!54927",
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
    "contentUrl":"http://public-sn3302.files.1drv.com/y2pcT7OaUEExF7EHOlpTjCE55mIUoiX7H3sx1ff6I-nP35XUTBqZlnkh9FJhWb_pf9sZ7LEpEchvDznIbQig0hWBeidpwFkOqSKCwQylisarN6T0ecAeMvantizBUzM2PA1",
  }
}
```

Resources expose data through three ways:
* _Properties_ (like `id` and `name`) expose simple values.
* _Facets_ (like `file` and `photo`) expose complex values. The presence of
`file` or `folder` facets indicates the type of an Item.
* _References_ (like `children`) point to collections of other resources.

References can be expanded inline with the `$expand` query parameter (eg.
`?$expand=children`). Specific properties and facets can be asked for with the
`$select` query parameter (eg. `?$select=id,name`). By default, all Properties
and Facets are returned, and all References are unexpanded. For efficiency, we
recommend specifying `$select` and `$expand` for the data you care about.

See the topic on [Resources](facets/readme.md) for more details.

## Root Resources

Path                              | Resource
----------------------------------|---------------------
`/drive`                          | Caller's default [Drive](#drive)
`/drives`                         | List [Drives](#drive) available to the authenticated user
`/drives/{drive-id}`              | Access a specific [Drive](#drive) by its ID
`/drives/{drive-id}/root/children`| List items in the root of a specific [Drive](#drive)
`/drive/items/{item-id}`          | Access an [Item](#item) by its ID


**Note:** Items can also be addressed by path by putting a colon after any Item
or Drive URL, and following it with the relative path to the Item. You may
optionally transition back to addressing the resource model by putting another
colon at the end. Ensure your request follows
[path encoding](misc/path-encoding.md) requirements.  

Path                                             | Resource
-------------------------------------------------|----------------
`/drive/root:/path/to/file`                      | Access an [Item](#item) by path under the root
`/drive/items/{item-id}:/path/to/file`           | Access an [Item](#item) by its path relative to another Item
`/drive/root:/path/to/file:/children`            | List children when accessing by path relative to the drive root
`/drive/items/{item-id}:/path/to/file:/children` | List children when accessing by path relative to another item

## Drive
The [Drive][drive-resource] is the top level object within a user's OneDrive.
A user will always have at least one Drive available--the default Drive. A user
may have additional Drives if they have added other OneDrive or OneDrive for
Business accounts.

In the examples below, `/drive` is used as the root for brevity, but
`/drives/{drive-id}` is valid too.

Common task                                                      | HTTP Method
-----------------------------------------------------------------|------------
[Get metadata for user's default Drive][drive-get]               | `GET /drive`
[List children under the Drive][item-children]                   | `GET /drive/root/children`
[List changes for all Items in the Drive][item-changes]          | `GET /drive/root/view.changes`
[Search for Items in the Drive][item-search]                     | `GET /drive/root/view.search`
[Access Special Folder](#special-folders)                        | `GET /drive/special/{name}`
[Access Shared Items][drive-shares]                              | `GET /drive/shares`

See the [Drive][drive-resource] section for more details.

## Item
[Items](resource/item.md) are the objects inside the OneDrive file system. They
can be accessed by their `id` using the `/items/{item-id}` syntax, or by their
file system path using the `/drive:/path/to/file` syntax. Items have
[Facets](resource/readme.md) that expose data about their identities and
capabilities. Folders have a Folder facet and Files have a File facet. Photos
have a Photo facet in addition to their File facet.

Folders act as containers of Items, and have a `children` reference pointing to
a collection of Items under the Folder.

Common Task                        | HTTP Method (by ID)                                     | HTTP Method (by Path)
---------------------------------- | ------------------------------------------------------- | ------------------------------------------------
[Get metadata](items/get.md)       | `GET /drive/items/{id}`                                 | `GET /drive/root:/{path}`
[List children](items/list.md)     | `GET /drive/items/{id}/children`                        | `GET /drive/root:/{path}:/children`
[Create](items/create.md)          | `PUT /drive/items/{parent-id}/children/{name}`          | `PUT /drive/root:/{parent-path}/{name}`
[Upload](items/upload.md)          | `PUT /drive/items/{parent-id}/children/{name}/content`  | `PUT /drive/root:/{parent-path}/{name}:/content`
[Update](items/update.md)          | `PATCH /drive/items/{id}`                               | `PATCH /drive/root:/{path}`
[Delete](items/delete.md)          | `DELETE /drive/items/{id}`                              | `DELETE /drive/root:/{path}`
[Move](items/move.md)              | _same as update_                                        | _same as update_
[Copy](items/copy.md)              | `POST /drive/items/{id}/action.copy`                    | `POST /drive/root:/{path}:/action.copy`
[Download](items/download.md)      | `GET /drive/items/{id}/content`                         | `GET /drive/root:/{path}:/content`
[Search](items/search.md)          | `GET /drive/items/{id}/view.search`                     | `GET /drive/root:/{path}:/view.search`
[View Changes][item-changes]       | `GET /drive/items/{id}/view.changes`                    | `GET /drive/root:/{path}:/view.changes`

[item-changes]: items/view_changes.md

## Special Folders
Commonly-used folders like Documents and Photos can be accessed with static
names regardless of the folder's actual name and location in a user's OneDrive.
Special folders are automatically created the first time an application attempts
to write to one, if it doesn't already exist. If a user deletes one, it will
get recreated when written to again. If a special folder is renamed or moved
to another location within the Drive, this syntax will continue to find that
folder.


Folder      | HTTP Request              | Description
------------| ------------------------- | -------------------------------
Documents   | `GET /special/documents`  | The Documents folder
Photos      | `GET /special/photos`     | The Photos folder
Music       | `GET /special/music`      | The Music folder
Camera Roll | `GET /special/cameraroll` | The Camera Roll Backup folder.
Public      | `GET /special/public`     | The default Public folder
App Folder  | `GET /special/appfolder`  | The application's personal folder. Usually in `/Apps/{Application Name}`

# Related Topics
The following topics contain high level overviews of other concepts that apply
to the OneDrive API.

* [Addressing Resources](misc/addressing.md)
* [Case Sensitivity](misc/case-sensitivity.md)
* [Error Responses](misc/errors.md)
* [HTTP Verb Tunneling](misc/verb-tunneling.md)


[drive-resource]: drives/README.md
[drive-get]: drives/get.md
[item-changes]: items/view_changes.md
[item-search]: items/search.md
[item-children]: items/list.md
[drive-shares]: drives/shares.md
