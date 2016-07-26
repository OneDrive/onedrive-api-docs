# Develop with the OneDrive API

[![Documentation validation and build status](https://ci.appveyor.com/api/projects/status/jummmj5gb9q28lfr?svg=true)](#continuous-documentation-validation)

The OneDrive API provides a set of HTTP services to connect your application to
files and folders in **OneDrive Personal**, **OneDrive for Business**, and document
libraries in **SharePoint Online**. OneDrive API makes it easy to connect your app
to your user's files across **Office 365** and access the advanced functionality of
files in OneDrive and SharePoint.

Whenever possible, we recommend using a supported [OneDrive SDK](sdks.md) in
your application. However, you can code your application directly to the HTTP
endpoints if your preferred language/platform is unavailable.

OneDrive API is also a part of the [Microsoft Graph](http://graph.microsoft.io).
Microsoft Graph makes it easy to connect with data from many Office 365 services
using a single API end point.

## Getting started

To quickly get started connecting your app to OneDrive or SharePoint document
libraries, check out the SDK or getting started guide for your platform:

<center>
[**Windows / .NET**][sdk-csharp] |
[**Apple iOS**][sdk-ios] |
[**Android**][sdk-android] |
[**Python**][sdk-python] |
[**HTTP**](getting-started.md)
</center>

## Overview

The OneDrive API exposes two major resource types:

* [Drive](#drive-resource) _(top-level object)_
* [Item](#item-resource) _(files, folders, and so on.)_

The following is an example of an item resource.

<!-- {"blockType": "example", "@odata.type": "oneDrive.item", "truncated": true, "name": "item-example"} -->
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

* _Properties_ (like **id** and **name**) expose simple values.
* _Facets_ (like **file** and **photo**) expose complex values. The presence of
  **file** or **folder** facets indicates behaviors and properties of an item.
* _References_ (like **children**) point to collections of other resources.

You can expand references in your URL with the _expand_ query parameter, for example,
`?expand=children`. Request specific properties and facets with the
_select_ query parameter, for example, `?select=id,name`. By default, most properties
and facets are returned while all references are hidden. For efficiency, we
recommend that you specify _select_ and _expand_ for the data you care about.

For details about resources and facets, see [Resources](resources/resources.md)
and [Facets](facets/facets.md).

### OneDrive API root resources

Use these root API resources to access an item or drive.

| Path                                                | Resource                                                              |
|:----------------------------------------------------|:----------------------------------------------------------------------|
| [`/drive`](drives/default.md)                       | User's default [Drive](#drive-resource).                              |
| [`/drives`](drives/list-drives.md)                  | List [Drives](#drive-resource) available to the authenticated user.   |
| [`/drives/{drive-id}`](drives/get.md)               | Access a specific [Drive](#drive-resource) by its ID.                 |
| [`/drives/{drive-id}/root/children`](items/list.md) | List items in the root of a specific [Drive](#drive-resource).        |
| [`/drive/items/{item-id}`](items/get.md)            | Access an [Item](#item-resource) by its ID.                           |
| [`/drive/special/{special-id}`](items/special_folders.md) | Access a [special (named) folder](items/special_folders.md) by its known name.  |
| [`/shares/{share-id}`](shares/shares.md)            | Access an [Item](#item-resource) by its **shareId** or a sharing URL. |


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

The [Drive resource][drive-resource] is the top level object within a user's
OneDrive or a SharePoint document library. Nearly all API accesses will
start by addressing a drive resource.

### Item resource

[Items][item-resource] are the objects inside the OneDrive file system. They
can be accessed by their `id` using the `/items/{item-id}` syntax, or by their
file system path using the `/drive/root:/path/to/file` syntax.

Items have [Facets](facets/facets.md) that provide data about their identities and
capabilities.

Folders act as containers of items, and have a `children` reference pointing to
a collection of items under the folder.

### Shared folders and remote items

On OneDrive Personal users can add one or more shared items from another drive
to their OneDrive. These shared items appear as an item in the `children` collection
with a [remoteItem facet](facets/remoteitem_facet.md).

For more information on working with shared folders and remote items, see
[Remote items and shared folders](misc/working-with-links.md).

### Sharing and permissions

One of the most common actions for OneDrive and SharePoint is sharing content
with other people. OneDrive API allows your app to create
[sharing links](items/sharing_createLink.md), [add permissions, and send invitations](items/invite.md)
to items stored in a drive.

OneDrive API also provides a way for your app to [access shared content](shares/shares.md)
directly from the sharing link.

For more details on how to share and consume shared content, see
[Sharing items in OneDrive API](items/sharing.md).

## Webhooks and notifications

[OneDrive supports sending webhook-style push notifications](webhooks/webhooks.md)
when the contents of a OneDrive is changed. Your app can use these notifications to track changes
in near real-time instead of polling the server for changes.

## Programming notes

### API Compatibility
The OneDrive API will continue to evolve and gain additional functionality. The API
includes a version number as part of the URL path, to ensure that we can make
breaking changes to the API without impacting existing implementations. Breaking
changes will be made by incrementing
the version number in the URL, for calls that work differently than before.

We define a breaking change as a change in the format of a request or response
that removes an existing documented behavior, or alters an existing documented behavior.

It is possible that the API will expose additional undocumented features from
time to time. These features should not be depended on until they are documented.
Do not assume that current behavior that deviates from the documentation will persist.

We will continue to make non-breaking changes to the existing version of the API,
including adding facets, properties, and resources to the API. As such, any code
calling the OneDrive API needs to:

* Be resilient to additional properties being added to JSON responses. Ignoring them is OK.
* Have no dependency on the order of properties returned in JSON responses.
* Use documented API paths, resources, properties, and enumerated values only.
  Non-documented values are not guaranteed to remain consistent.
* All URLs returned by OneDrive API should be treated as opaque URLs. Your app should not
  make any assumptions about format or parameters in these URLs. They are subject
  to change without notice.

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

### Working with OneNote Notebooks

**Note:** Although OneDrive stores OneNote notebooks, you shouldn't use the
OneDrive API to work with OneNote notebooks. Instead, use the
[OneNote API](http://dev.onenote.com).

### OData v4 compatibility
This API supports OData V4 at the [minimum conformance level](http://docs.oasis-open.org/odata/odata/v4.0/os/part1-protocol/odata-v4.0-os-part1-protocol.html#_Toc372793759).
Some of the features of the OneDrive API might not
be available via the OData metadata or generated content. For more information, see
[OData Support](odata/odata-support.md).

## Continuous documentation validation

As part of our commitment to high quality documentation, we've developed a process
through which the samples and examples in our documentation are tested for validity
as part of every check-in. We call this continuous documentation validation.

Each time a change to our documentation is made, we validate that everything works
as documented in the service. When we create a new build of the service, we validate
that the examples in our documentation also continue to work. This helps us ensure
that everything we document works and works as expected even as new updates
are made available.

For the latest build details, check out the [AppVeyor build status page for our documentation repository](https://ci.appveyor.com/project/OneDrive/onedrive-api-docs).

## Related topics

The following topics contain high level overviews of other concepts that apply
to the OneDrive API.

* [Authentication and sign in](auth/readme.md)
* [Addressing resources](misc/addressing.md)
* [Case sensitivity](misc/case-sensitivity.md)
* [Error responses](misc/errors.md)
* [HTTP verb tunneling](misc/verb-tunneling.md)
* [Terms of use](terms-of-use.md)

[drive-default]: drives/default.md
[drive-resource]: resources/drive.md
[item-resource]: resources/item.md
[drive-get]: drives/get.md
[item-changes]: items/view_delta.md
[item-search]: items/search.md
[item-children]: items/list.md
[permission-resource]: resources/permission.md
[item-get]: items/get.md
[sdk-csharp]: http://github.com/onedrive/onedrive-sdk-csharp
[sdk-ios]: https://github.com/onedrive/onedrive-sdk-ios
[sdk-android]: https://github.com/onedrive/onedrive-sdk-android
[sdk-python]: https://github.com/onedrive/onedrive-sdk-python

<!-- {
  "type": "#page.annotation",
  "description": "Getting started programming with the OneDrive REST API",
  "keywords": "getting started onedrive rest api programming C# ios android rest http",
  "section": "documentation",
  "tocPath": "Getting Started",
  "tocIndex": -100
} -->
