# Release notes for using OneDrive API with OneDrive for Business (preview)

The OneDrive API with OneDrive for Business is still a work in progress. We've
released this preview to give developers an early look at the direction
we're heading with the OneDrive developer platform.

For production applications that need to work flawlessly, you should
continue to use the [Office 365 Files API v1.0](https://msdn.microsoft.com/en-us/office/office365/api/files-rest-operations) for now.

## API Differences

While our end goal is that the OneDrive API works uniformly for OneDrive and
OneDrive for Business, we're not there yet. There are several important
differences you'll need to be aware of until the API is fully released.

Aspects of OneDrive API that are not available for OneDrive for Business
are called out below:

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

**Note**: The discovery API does not yet include the v2.0 API URL. You will need
to discover the v1.0 URL and then modify the version number in the URL until
the v2.0 service is included.

[discover-api]: https://msdn.microsoft.com/en-us/office/office365/api/discovery-service-rest-operations

### Cannot combine ID-based and Path-based addressing in a single HTTP call

URL path expressions that are a combination of ID-based and path-based
addressing are not supported, such as:

`GET /drive/items/{parent-item-id}:/my_file.docx:/content`

### Cannot use filename as key

URL path expressions that use the filename (instead of ID) as the key in the
children collection are not supported:

`GET /drive/root/children/my_file.docx/content`

### Delete requires an If-Match header

When using the delete action with OneDrive for Business you must specify an
`If-Match` header in the request. The `If-Match` header must match the etag of the Item. If the header is missing the delete call will fail.

You can work around this by including: `If-Match: *` in your delete request.

### Cannot reference a drive by drive-id

The `/drives/{drive-id}` syntax is not supported for OneDrive for Business. You
should always use the default drive syntax: `/drive/`.

### No thumbnails collection

The thumbnails collection does not exist for OneDrive for Business currently.
Calls that expand the thumbnails collection or refer to it directly will fail:

`GET /drive/root?expand=thumbnails`
`GET /drive/root:/my_photo.jpg:/thumbnails`

### No support for item searching

The **view.search** action is not yet implemented for OneDrive for Business.

### No support for deltas

The **view.changes** action is not yet implemented for OneDrive for Business.

### Downloading file content

When downloading an item's content from OneDrive for Business, instead of
receiving a `302` redirect to the download URL, the content will be returned
directly as the response of the API call.

### No special folders

The collection of special folders for a drive `/special` is not implemented.

### Uploading items

The only available way to upload items with OneDrive for Business is to use the
[Simple item upload](../items/upload_put.md) method.

OneDrive for Business does not yet support upload from URL, multipart upload, or
resumable item upload.

### Creating sharing links

The **action.createLink** action is not yet implemented for OneDrive for Business.

### Copy is not supported

The **action.copy** action is not yet implemented for OneDrive for Business.

### Rename on upload is not supported

The **@name.conflictBehavior** property does not support the rename value in
OneDrive for Business.

### Hashes are not returned for files

SHA1 and/or CRC32 hash values are not returned for files stored in OneDrive
for Business.

### Extra OData metadata is returned

The OneDrive API currently returns all available OData v4.0 metadata for an item on OneDrive for Business. You can reduce the metadata returned, if it is not useful, by using the **Accept** header: 
```
Accept: application/json; odata.metadata=none
```

## Pickers and savers

The OneDrive pickers and savers support OneDrive and OneDrive for Business
on these platforms:

* Android

Picking and saving files to OneDrive only, is supported on these platforms:

* Apple iOS
* Windows Universal Apps
* Web (JavaScript)


## Send us feedback!

Please use the community links at the bottom of our website to send us feedback
either through UserVoice or by posting issues in GitHub. We want to hear more
from you about the OneDrive API for OneDrive for Business.

<!-- {
  "type": "#page.annotation",
  "description": "Read more about the differences in using OneDrive API with OneDrive for Business",
  "keywords": "release,notes,onedrive,onedrive for business,od4b,odb,files api,files api v2",
  "section": "documentation",
  "tocPath": "OneDrive for Business (preview)/Release Notes"
} -->
