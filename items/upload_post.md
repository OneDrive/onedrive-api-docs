# Multipart upload to OneDrive using POST

The multipart upload method allows you to provide metadata about an item and the
contents of the item in a single API call. This method only supports requests up to
100MB in size.

See [Uploading item contents](upload.md) for details about how to upload
the contents of an item.

**Note:** Multipart upload is only available on OneDrive Personal.

## Prerequisites

To use this method, the user must have granted the application write access
to the folder that the file will be uploaded to.

## HTTP request

<!-- {"blockType": "ignored" } -->
```
POST /drive/items/{item-id}/children
POST /drive/root:/{item-path}/:children
```

### Request body (multipart content + metadata upload)

The multipart body sets metadata for the file along
with the contents of the file at the same time. OneDrive detects this scenario
when the `Content-Type: multipart/related` header is included in the request.

For more information about multipart/related encoding, see
[RFC 2387](https://www.ietf.org/rfc/rfc2387.txt) multipart/related documents.

The uploaded document must contain exactly two parts:

| Part name    | Type             | Description                                        |
|:-------------|:-----------------|:---------------------------------------------------|
| **metadata** | application/json | The metadata values to use when creating the item. |
| **content**  | various          | The binary content of the item being created.      |

The request will be rejected if more than two parts are included. Each part must
specify a **name** value in the `Content-Disposition` header that indicates which
part it is. Parts can be in either order, but should specify the metadata part
first.

<!-- { "blockType": "request", "name": "upload-multipart", "scopes": "files.readwrite service.onedrive" } -->
```
POST /drive/items/{folder-id}/children
Content-Type: multipart/related; boundary="A100x"

--A100x
Content-ID: <metadata>
Content-Type: application/json

{
  "name": "newfile.txt",
  "file": {},
  "@content.sourceUrl": "cid:content",
  "@name.conflictBehavior": "rename"
}

--A100x
Content-ID: <content>
Content-Type: text/plain

Contents of the file to be uploaded.

--A100x--
```

**Note:** You can use an [Instance Attribute](../resources/item.md#instance-attributes)
on the Item metadata to control what happens if you are uploading a file that
matches an existing file's name. By default, the upload fails if an existing
item has the same name.

### Response

If successful, this method returns a [Item resource](../resources/item.md) in
the response body for the newly created file.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "0123456789abc",
  "name": "newfile.txt",
  "file": { }
}
```

**Note:** The Response object is truncated for clarity. All default properties will
be returned from the actual call.



### Error responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.

## Remarks

The multipart upload method is not supported in OneDrive for Business or SharePoint.


[error-response]: ../misc/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "Create a new item with custom metadata and content upload.",
  "keywords": "create,upload,post,custom metadata",
  "section": "documentation"
} -->
