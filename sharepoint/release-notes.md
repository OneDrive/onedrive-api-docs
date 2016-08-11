# Release notes for using OneDrive API with OneDrive for Business and SharePoint

The OneDrive API now works with OneDrive for Business and SharePoint document libraries!

While we're still working on complete parity between the services, OneDrive API
now provides a common set of API calls that can be used with OneDrive, OneDrive
for Business, and SharePoint document libraries.

We'll continue to release updates to align the implementation of the
OneDrive API between OneDrive and OneDrive for Business. To ensure that your
application maintains functionality you must develop your OneDrive API
integration based on this documentation. Do not assume that undocumented
behavior will remain functional as we make these updates.

## API differences between OneDrive Personal, OneDrive for Business, and SharePoint

While our end goal is that the OneDrive API works uniformly across OneDrive Personal,
OneDrive for Business, and SharePoint document libraries, we're not there yet.
There are several important differences you'll need to be aware right now.

Differences in the OneDrive API between OneDrive, OneDrive for Business, and SharePoint
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
* [Uploading items](#uploading-items)
* [File facet is empty](#file-facet-is-empty)
* [Extra OData metadata is returned](#extra-odata-metadata-is-returned)
* [Image and photo facets](#image-and-photo-facets)
* [Sharing links](#sharing-links-and-permissions)
* [Shared By Me](#shared-by-me)

### Authentication

To connect to OneDrive for Business or SharePoint, you'll need to use the Azure Active Directory
common consent authentication. While still using OAuth 2.0, it uses different
authentication and token endpoints than Microsoft account.

For more information on authentication, see [Authentication for OneDrive API](../auth/readme.md).

### API End Point

To use the OneDrive API with OneDrive for Business or SharePoint, your app needs
to discover the tenant specific root URL to use. You can use the [Office discovery service API][discover-api]
to find the correct root URL for the signed-in user's OneDrive for Business.

To use OneDrive API with SharePoint document libraries, you need to know
the SharePoint site's URL.

[discover-api]: https://msdn.microsoft.com/en-us/office/office365/api/discovery-service-rest-operations

### CTag implementation

The **cTag** property of an [item](../resources/item.md) returns only files. This property is not available on folders.

### Custom thumbnails

Setting a [custom thumbnail](../items/thumbnails.md) on an item is not available.

### Thumbnails collection

Certain calls that expand the thumbnails collection or refer to it directly, including
custom uploaded thumbnails will fail:

`GET /drive/root:/{item-path}?expand=children(expand=thumbnails)`

`GET /drive/items:/{item-id}/children?expand=thumbnails`

However, you can access the thumbnails directly for a single item at a time:
`GET /drive/items/{item-id}/thumbnails`

### Item searching

Search will not return the following properties:

* **createdBy**
* **modifiedBy**
* **parentReference**

### Filtering

Filtering an item collection can only be done by the **name** and **url** properties only.

### Sorting

The **orderby** query string only works with **name** and **url** properties.

### View deltas

The **view.delta** action is only available on the `root` folder:

```http
GET /drive/root/view.delta
```

Also, the **view.delta** action does not return the following properties:

* **createdBy**
* **cTag**
* **fileSystemInfo**
* **lastModifiedBy**

### Special folders

Not all of the [defined special folders](../items/special_folders.md) are
available in OneDrive for Business. The following special folders are available:

* **approot**
* **documents**
* **photos**

### Uploading items

The [upload from URL](../items/upload_url.md) and [multipart upload](../items/upload_post.md)
features are not available.

### File facet is empty

The file facet is returned without any properties. The SHA1, CRC32 hash values, and mime type are not available.

### Extra OData metadata is returned

The OneDrive API returns all available OData v4.0 metadata on a request to
OneDrive for Business or SharePoint. You can reduce the metadata returned, if
it is not useful for your app, by using the **Accept** header and setting
`odata.metadata=none`:

```
Accept: application/json; odata.metadata=none
```

### Image and photo facets

OneDrive for Business and SharePoint have a subset of information about images
and photos available. The `photo` facet only provides the `takenDateTime` property.

The `image` facet is returned on items that appear to be images, but has no properties.

### Sharing links and permissions

OneDrive for Business does not support sharing links for folders.

### Shared by me

OneDrive for Business does not support [Shared by Me](../drives/shared_by_me.md).

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
