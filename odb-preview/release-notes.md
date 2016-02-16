# Release notes for using OneDrive API with OneDrive for Business

The OneDrive API now works with OneDrive for Business!

We're still working on fully converging the developer experience for
OneDrive and OneDrive for Business, but the OneDrive API now supports a common
set of API calls that can be used with OneDrive, OneDrive for Business, and
SharePoint document libraries.

We'll continue to release updates to align the implementation of the
OneDrive API between OneDrive and OneDrive for Business. To ensure that your
application maintains functionality you must develop your OneDrive API
integration based on this documentation. Do not assume that undocumented
behavior will remain functional as we make these updates.

## API differences between OneDrive and OneDrive for Business

While our end goal is that the OneDrive API works uniformly for OneDrive and
OneDrive for Business, we're not there yet. There are several important
differences you'll need to be aware right now.

Differences in the OneDrive API between OneDrive and OneDrive for Business
are listed below:

* [Authentication](#authentication)
* [API End Point](#api-end-point)
* [CTag implemention](#ctag-implementation)
* [Custom thumbnails](#custom-thumbnails)
* [Thumbnails collection](#thumbnails-collection)
* [Item searching](#item-searching)
* [Filtering](#filtering)
* [Sorting](#sorting)
* [View deltas](#view-deltas)
* [Downloading file content](#downloading-file-content)
* [Special folders](#special-folders)
* [Uploading items](#uploading-items)
* [Rename on upload is not supported](#rename-on-upload-is-not-supported)
* [Hashes are not returned for files](#hashes-are-not-returned-for-files)
* [Extra OData metadata is returned](#extra-odata-metadata-is-returned)
* [Blocked file extensions](#blocked-file-extensions)
* [Image and photo facets](#image-and-photo-facets)
* [Sharing links](#sharing-links-and-permissions)
* [File picker SDKs](#file-picker-sdks)
* [Enumerating drives](#enumerating-drives)

### Authentication

To connect to OneDrive for Business, you'll need to use the Azure Active Directory
common consent authentication. While this is still OAuth 2.0, it uses different
authentication and token end points other than Microsoft accounts.

Additionally, OneDrive for Business requires that the access_token is provided using
the **Authorization** header. The access_token can't be provided in the query
string.

For more information on authentication, see [Authentication for OneDrive API](../auth/readme.md).

### API End Point

To use the OneDrive API with OneDrive for Business, your app needs to discover the
tenant specific root URL to use. You can use the [Office discovery service API][discover-api]
to find the correct root URL for the signed-in user.

[discover-api]: https://msdn.microsoft.com/en-us/office/office365/api/discovery-service-rest-operations

### CTag implementation

The **cTag** property of an item in OneDrive for Business returns only files and not folders.

### Custom thumbnails

Setting a custom thumbnail for an item is not available in OneDrive for Business.

### Thumbnails collection

Certain calls that expand the thumbnails collection or refer to it directly, including
custom uploaded thumbnails will fail:

`GET /drive/root:/{item-path}?expand=children(expand=thumbnails)`

`GET /drive/items:/{item-id}/children?expand=thumbnails`

However, you can access the thumbnails directly for a single item at a time:
`GET /drive/items/{item-id}/thumbnails`

### Item searching

Search will not return the following properties in OneDrive for Business:

* **createdBy**
* **modifiedBy**
* **parentReference**

### Filtering

OneDrive for Business currently supports filtering by `name` and `url` only.

### Sorting

In OneDrive for Business, the _orderby_ query string only works with `name` and `url`. `size` and `lastModifiedDateTime` works only with OneDrive consumer.

### View deltas

The **view.delta** action is currently only supported on the `root` folder, not on other folders. Also, the **view.delta** action does not return the following properties:

* **createdBy**
* **lastModifiedBy**
* **cTag**
* **eTag**
* **parentReference**
* **size**
* **fileSystemInfo**

### Downloading file content

When requesting the `/content` property of an item to download the file, you
must provide the Authorization header, in order to be granted access to
download. The response will always return a `302` redirect to the URL where the
file can be downloaded from. This URL is pre-authenticated and does not require
the Authorization header. If you specify an authorization header to this
download URL when downloading an item's content from OneDrive for Business, you
will receive a `401` error.

### Special folders

The collection of special folders for a drive (`/special`) is not supported.

### Uploading items

OneDrive for Business does not yet support upload from URL or multipart upload
for item uploads.

### Rename on upload is not supported

The **@name.conflictBehavior** property does not support the rename value in
OneDrive for Business.

### Hashes are not returned for files

SHA1 and/or CRC32 hash values are not returned for files stored in OneDrive
for Business.

### Extra OData metadata is returned

The OneDrive API currently returns all available OData v4.0 metadata for an item
on OneDrive for Business. You can reduce the metadata returned, if it is not
useful, by using the **Accept** header:

```
Accept: application/json; odata.metadata=none
```

### Blocked file extensions

OneDrive for Business and SharePoint online block several file extensions from
being uploaded to the server.

* .ashx - ASP.NET Web handler file
* .asmx - ASP.NET Web Services source file
* .json - JavaScript Object Notation file
* .soap - Simple Object Access Protocol file
* .svc - Windows Communication Foundation (WCF) service file
* .xamlx - Visual Studio Workflow service file

See [Types of files that cannot be added to a list or library][blocked-extensions]
for more information on blocked file extensions.

[blocked-extensions]: https://support.office.com/en-us/article/Types-of-files-that-cannot-be-added-to-a-list-or-library-30be234d-e551-4c2a-8de8-f8546ffbf5b3?ui=en-US&rs=en-AU&ad=AU&fromAR=1#__toc355959797]

### Image and photo facets

OneDrive for Business has a subset of information about images and photos
available compared to OneDrive personal. The `photo` facet only provides the
`takenDateTime` property.

The `image` facet is returned on items that are expected to be images, but has
no properties.


### Sharing links and permissions

OneDrive for Business does not yet support sharing links for folders, or permissions on an item.

### File picker SDKs

The OneDrive file picker SDKs support OneDrive and OneDrive for Business
on these platforms:

* Android
* iOS
* Web (JavaScript)

Only OneDrive personal is available on these platforms:

* Windows Universal Apps

### Enumerating drives

In OneDrive for Business, using `/drives` to enumerate all drives available to the user is not supported.

## Send us feedback!

Please use the community links at the bottom of our website to send us feedback
either through UserVoice or by posting issues in GitHub. We want to hear more
from you about the OneDrive API for OneDrive for Business.

<!-- {
  "type": "#page.annotation",
  "description": "Read more about the differences in using OneDrive API with OneDrive for Business",
  "keywords": "release,notes,onedrive,onedrive for business,od4b,odb,files api,files api v2",
  "section": "documentation",
  "tocPath": "OneDrive for Business/Release Notes"
} -->
