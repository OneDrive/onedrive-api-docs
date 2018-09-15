---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: overview
title: Access OneDrive and SharePoint via the v2.0 REST API
---
# Work with files, lists, and sites in SharePoint

The OneDrive and SharePoint REST API allows your app to connect to content stored in OneDrive and SharePoint.
The REST API is shared between OneDrive, OneDrive for Business, SharePoint document libraries, and Office Groups, to allow your app the flexibility to read and store content in any of these locations with the same code.

## Getting started

The REST API provides a few top-level types that represent addressable resources in the API:

* [drive][drive-resource] _(top-level object containing files and folders)_
* [driveItem][item-resource] _(files and folders)_
* [list][list-resource] _(top-level object containing list items)_
* [listItem][listItem-resource] _(list items)_
* [site][site-resource] _(top-level object containing drives and lists)_

The following is an example of a **driveItem** resource.

<!-- {"blockType": "example", "@odata.type": "oneDrive.item", "truncated": true, "name": "item-example"} -->
```json
{
  "@content.downloadUrl":"http://public-sn3302.files.1drv.com/y2pcT7OaUEExF7EHOl",
  "createdDateTime": "2014-10-31T03:37:04.72Z",
  "eTag": "aRDQ2NDhGMDZDOTFEOUQzRCE1NDkyNy4w",
  "id":"D4648F06C91D9D3D!54927",
  "lastModifiedBy": {
    "user": {
      "displayName": "daron spektor",
      "id": "d4648f06c91d9d3d"
    }
  },
  "name":"BritishShorthair.docx",
  "size":35212,
  "file": {
    "hashes":{
      "quickXorHash":"cf23df2207d99a74fbe169e3eba035e633b65d94"
    }
  }
}
```

Data about a resource is provided in three ways:

* _Properties_ (like **id** and **name**) expose simple values.
* _Facets_ (like **file** and **image**) expose complex values. 
  The presence of facets on an item generally indicate behaviors or capabilities of an item and related properties.
* _References_ (like **children**) point to collections of other resources.

Many requests can be tailored to include additional data or remove unused properties from the responses.
OneDrive uses [optional query parameters](concepts/optional-query-parameters.md) to enable this functionality.
Throughout the documentation, each request provides more context about which parameters are supported.

By default, most properties and facets are returned while all references are hidden.
For efficiency, we recommend that you specify _select_ and _expand_ for the data you care about.

For details about resources and facets, see [Resources](resources/index.md) and [Facets](resources/index.md#facets).

### SharePoint root resources

Your app can address SharePoint resources using the following paths:

|                        Path                         | Resource
| --------------------------------------------------- | -----------------------
| [`/sites/{site-id}`][site-get]                      | Access a specific [site][site-resource] by its ID.
| [`/sites/{site-id}/sites`][subsites-list]           | List the [subsites][site-resource] under a specific site.
| [`/sites/{site-id}/drives`][drive-list]             | List [drive][drive-resource] resources under a specific site.
| [`/sites/{site-id}/lists`][list-list]              | List [list][list-resource] resources under a specific site.
| [`/drive`][drive-get]                               | Access the default [drive][drive-resource] under the current URL scope.
| [`/drives/{drive-id}`][drive-get]                   | Access a specific [drive][drive-resource] by its ID.
| [`/shares/{share-id}/driveItem`][shares-get]        | Access a [driveItem][item-resource] using its sharing URL.


### Path-based addressing within a drive

A **driveItem** can be addressed by either a unique identifier or where that item exists in the drive's hierarchy (i.e. user path).
Within an API request, a colon can be used to shift between *API path space* and *user path space*.
This syntax is valid for any [driveItem](resources/driveitem.md) addressed via the API space.

You can also transition back to *API path space* by using a colon at the end of the *file system path space*.
Ensure user data within the URL follows the [addressing and path encoding](concepts/addressing-driveitems.md) requirements.

| Path                                               | Resource                                                               |
| -------------------------------------------------- | ---------------------------------------------------------------------- |
| `/drive/root:/path/to/file`                        | Access a [driveItem][item-resource] by path under the root.               |
| `/drive/items/{item-id}:/path/to/file`             | Access a [driveItem][item-resource] by its path relative to another item. |
| `/drive/root:/path/to/folder:/children`            | List children when accessing by path relative to the drive root.       |
| `/drive/items/{item-id}:/path/to/folder:/children` | List children when accessing by path relative to another item.         |


### Shared folders and remote items

Scenarios where items are returned from outside the target drive will include a [remoteItem facet](resources/remoteitem.md).
These items may also be returned from [search](api/driveitem_search.md), [recent files](api/drive_recent.md), [shared with me](api/drive_sharedwithme.md).

For more information on working with shared folders and remote items, see [Remote items and shared folders](concepts/using-sharing-links.md).

### Sharing and permissions

One of the most common actions for OneDrive and SharePoint is sharing items with other people.
OneDrive and SharePoint allow your app to create [sharing links](api/driveitem_createlink.md), [add permissions, and send invitations](api/driveitem_invite.md) to items stored in a drive.

OneDrive and SharePoint also provide a way for your app to [access shared content](api/shares_get.md) directly from the sharing link.

For more details on how to share and consume shared content, see [Sharing items in OneDrive](concepts/sharing.md).

## Webhooks and notifications

[OneDrive and SharePoint support sending webhook-style push notifications](concepts/using-webhooks.md) when the contents of a drive have changed.
Your app can use these notifications to track changes in near real-time instead of polling the server for changes.

## Programming notes

### API Compatibility

OneDrive and SharePoint will continue to evolve and gain additional functionality.
The API path includes a version number to protect your app against breaking changes.
When a breaking change is required, the API version number will be incremented.
Existing apps calling the original version number will remain unaffected by the change.

A breaking change is a change in the format of a request or response that removes or alters an existing _documented_ behavior or removes an element of a resource's definition.
It is not a breaking change to add additional actions, properties, facets, or references to a resource.

It is possible that the API will expose additional undocumented features from time to time.
These features should not be utilized until they are documented.
Do not assume that current behavior that deviates from the documentation will persist.

We will continue to make non-breaking changes to the existing version of the API, including adding facets, properties, and resources to the API.
As such, any code calling the API needs to:

* Be resilient to additional properties being added to JSON responses.
  Ignoring them is OK.
* Have no dependency on the order of properties returned in JSON responses.
* Use documented API paths, resources, properties, and enumerated values only.
  Non-documented values are not guaranteed to remain consistent.
* All URLs returned by the OneDrive and SharePoint API should be treated as opaque URLs. 
  Your app should not make any assumptions about format or parameters in these URLs.
  They are subject to change without notice.

### Throttling

OneDrive and SharePoint have limits in place to make sure that individuals and apps do not adversely affect the experience of other users.
When an activity exceeds the server's limits, API requests will be rejected for a period of time.
The server may also return a *Retry-After* header with the number of seconds your app should wait before sending more requests.

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 3600
```

## Related topics

The following topics contain high level overviews of other concepts that apply to the OneDrive API.

* [Addressing resources](concepts/addressing-driveitems.md)
* [Authentication and sign in](getting-started/authentication.md)
* [Case sensitivity](concepts/case-sensitivity.md)
* [Error responses](concepts/errors.md)
* [HTTP verb tunneling](concepts/http-verb-tunneling.md)
* [Terms of use](../terms-of-use.md)

[drive-resource]: resources/drive.md
[drive-list]: api/drive_list.md
[item-resource]: resources/driveitem.md
[drive-get]: api/drive_get.md
[list-resource]: resources/list.md
[listItem-resource]: resources/listItem.md
[site-resource]: resources/site.md
[item-changes]: api/driveitem_delta.md
[item-search]: api/driveitem_search.md
[item-children]: api/driveitem_list_children.md
[list-list]: api/list_list.md
[subsites-list]: api/site_list_subsites.md
[permission-resource]: resources/permission.md
[item-get]: api/driveitem_get.md
[site-get]: api/site_get.md
[specialfolder-get]: api/drive_get_specialfolder.md
[specialfolder-resource]: api/drive_get_specialfolder.md
[shares-get]: api/shares_get.md


<!-- {
  "type": "#page.annotation",
  "description": "Getting started programming with the OneDrive REST API",
  "keywords": "getting started onedrive rest api programming C# ios android rest http",
  "section": "documentation",
  "tocPath": "Overview",
  "tocIndex": -100
} -->
