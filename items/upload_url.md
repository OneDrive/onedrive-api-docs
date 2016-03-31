# Upload an item to OneDrive from a URL (Preview)

Your app can upload an item to OneDrive by providing a URL. OneDrive will
download the file directly from a remote server so your app doesn't have to
upload the file's bytes. This is especially useful for mobile clients or browser
add-ins, where the file contents aren't available, or are expensive to transfer.

See [Uploading item contents](upload.md) for other ways to upload an item.

**Note:** You can only upload items from a URL to OneDrive Personal.

## HTTP request

### Request headers

| Header name   | Value  | Description                                                                                    |
|:--------------|:-------|:-----------------------------------------------------------------------------------------------|
| **Prefer**    | string | Set to `respond-async` to enable asynchronous item transfer. Otherwise the request is aborted. |

### Request body
The contents of the request body should be the JSON representation of the item
to create from the remote URL. Note that when the OneDrive server downloads the file
from the remote URL, it will not authenticate as the user, so the URL must be
publicly accessible.

### Example

<!-- { "blockType": "request", "name": "upload-from-url", "scopes": "files.readwrite service.onedrive" } -->
```
POST /drive/items/{parent-item}/children
Content-Type: application/json
Prefer: respond-async

{
  "@content.sourceUrl": "http://wscont2.apps.microsoft.com/winstore/1x/e33e38d9-d138-42a1-b252-27da1924ca87/Screenshot.225037.100000.jpg",
  "name": "halo-screenshot.jpg",
  "file": { }
}
```

### Response

The service will return immediately upon accepting the request and provide
details about how to monitor the progress of the copy.

<!-- { "blockType": "response" } -->
```http
HTTP/1.1 202 Accepted
Location: https://onedrive.com/monitor/113jlkjlkjasd1212abcascaf
```

The value of the `Location` header provides a URL that can be used to get
the current state of the operation and let you know when the upload has finished.

### Upload session response
To retrieve the current status of the upload, issue a GET request to the URL
in the `Location` header. If the response returns an `HTTP 202` then the
body of the response is an [AsyncJobStatus](../resources/asyncJobStatus.md)
resource that defines the current status of the job.

If the upload has completed, the GET request will return an `HTTP 303 See Other`
response with a new `Location` header that will take you to the item resource for
the uploaded item.


### Error
If an error occurs and the transfer can't continue, the status URL will return:

```http
HTTP/1.1 500 Internal Server Error
```

## Remarks

Uploading an item to OneDrive for Business using a URL is not supported.

[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "Upload a file to OneDrive from a URL",
  "keywords": "upload, upload from url",
  "section": "documentation"
} -->
