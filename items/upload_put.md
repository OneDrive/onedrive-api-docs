# Simple item upload to OneDrive using PUT

The simple upload API allows you to provide the contents of a new file or update
the contents of an existing file in a single API call. This method only supports
files up to 100MB in size. For larger files use [resumable upload](upload_large_files.md).

See [Upload item contents](upload.md) for more information about how to upload
the contents of an item.

## Prerequisites

To use this method, the user must have granted the application write access
to the folder that the file will be uploaded to.

## HTTP request

<!-- {"blockType": "ignored" } -->
```
PUT /drive/items/{parent-id}:/{filename}:/content
PUT /drive/root:/{parent-path}/{filename}:/content
PUT /drive/items/{parent-id}/children/{filename}/content
```

### Request body
The contents of the request body should be the binary stream of the file to be uploaded.

### Optional query string parameters

You can use these optional query string parameters to change the behavior of
the PUT request:

| Parameter Name             | Value  | Description                                                                                                                                      |
|:---------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------------------|
| **@name.conflictBehavior** | string | Specify the behavior to use if the file already exists. You can use the values *fail*, *replace*, or *rename*. The default for PUT is *replace*. |

### Example

<!-- { "blockType": "request", "name": "upload-via-put", "scopes": "files.readwrite" } -->
```
PUT /drive/root:{item-path}:/content
Content-Type: text/plain

The contents of the file goes here.
```

### Response
If successful, this method returns an [Item][item-resource] resource in
the response body for the newly created file.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "0123456789abc",
  "name": "myfile.jpg",
  "size": 10191,
  "file": { }
}
```

**Note:** The Response object is truncated for clarity. All default properties will
be returned from the actual call.

### Error responses

See [Error Responses][error-response] for details about
how errors are returned.

[error-response]: ../misc/errors.md
[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "Create a new file with content or update a file's content.",
  "keywords": "insert,upsert,update,upload",
  "section": "documentation"
} -->
