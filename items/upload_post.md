# Multipart Upload Method (POST)

The multipart upload API allows you to provide metadata about an item and the
contents of the item in a single API call. This method only supports files up to
100MB in size.

See [Uploading Item Contents](upload.md) for more information about how to upload
the contents of an item.

##### Pre-requisites

To use the Upload APIs, the user must have granted the application write access
to the folder that the file will be uploaded to.

##### HTTP Request
```
POST /drive/items/{item-id}/children
POST /drive/root:/{item-path}/:children
```

#### Request Body

##### Multipart Content + Metadata Upload
The multi-part body sets metadata for the file along
with the contents of the file at the same time. OneDrive detects this scenario
when the `Content-Type: multipart/form-data` header is included in the request.

For more information about multipart/related encoding, see
[RFC 2388](https://www.ietf.org/rfc/rfc2388.txt) multipart/form-data documents.

The uploaded document must contain exactly two parts:

 Part Name  | Type               | Description
:-----------|:-------------------|:---------------------------------------------------
 `metadata` | `application/json` | The metadata values to use when creating the item.
 `content`  | various            | The binary content of the item being created.

The request will be rejected if more than two parts are included. Each part must
specify a `name` value in the `Content-Dispostion` header that indicates which
part it is. Parts can be in either order, but SHOUlD specify the metadata part
first.

<!-- { "blockType": "request", "name": "upload-multipart" } -->
```
POST /drive/items/{folder-id}/children
Content-Type: multipart/form-data; boundary="A100x"

--A100x
Content-Dispostion: form-data; name="metadata"
Content-Type: application/json

{
  "name": "newfile.txt",
  "@name.conflictBehavior": "rename"
}

--A100x
Content-Disposition: form-data; name="content"
Content-Type: text/plain

Contents of the file to be uploaded.

--A100x--
```

##### Response

If successful, this method returns a [item resource](../resources/item.md) in
the response body for the newly created file.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 201 Created
Content-Type: application/json
Content-Length: length

{
  "id": "0123456789abc",
  "name": "newfile.txt",
  "file": { }
}
```

**Note:** Response object is truncated for clarity. All default properties will
be returned from the actual call.

##### Error Response

Read the [Error Responses][error-response] topic for more information about
how errors are returned.
[error-response]: ../misc/errors.md

 HTTP Code | HTTP Error Message       | Error Code                   | Error Message                                                        | Notes                                                                                |  
:----------|:-------------------------|:-----------------------------|:---------------------------------------------------------------------|:-------------------------------------------------------------------------------------|:-
 400       | Bad Request              | MissingBody                  | Request Body is required                                             |                                                                                      |  
 400       | Bad Request              | InvalidParameter             | Supplied parameter is invalid or has incorrect format                |                                                                                      |  
 400       | Bad Request              | InvalidFileBody              | Valid JSON File Body is expected                                     |                                                                                      |  
 400       | Bad Request              | MaxFormPostPartCountExceeded | Exceeded the maximum number of form post parts for this operation    |                                                                                      |  
 400       | Bad Request              | InvalidResourceName          | Resource name is invalid or has incorrect format                     |                                                                                      |  
 403       | Forbidden                | AccessRestricted             | The app does not have authorization to delete this file.             |                                                                                      |  
 403       | Forbidden                | QuotaLimitReached            | The maximum storage quota has been reached                           |                                                                                      |  
 403       | Forbidden                | InsufficientSpaceAvailable   | The intended operation would exceed the quota                        |                                                                                      |  
 404       | Not Found                | ParentDoesNotExist           | Target parent for current operation does not exist                   |                                                                                      |  
 405       | Method Not Allowed       | NotAllowed                   | Method not allowed for the specified resource                        | Post to the children collection is required in order to create a resource a resource |  
 409       | Conflict                 | ItemAlreadyExists            | Folder Already Exists                                                |                                                                                      |  
 413       | Request Entity Too Large | SizeTooLarge                 | File size is larger than the maximum size allowed for this operation |                                                                                      |  
