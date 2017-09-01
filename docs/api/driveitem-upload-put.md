# Simple item upload to OneDrive using PUT

The simple upload API allows you to provide the contents of a new file or update
the contents of an existing file in a single API call. This method only supports
files up to **4MB** in size. For larger files use [resumable upload](driveitem-upload-large-files.md).

See [Upload item contents](../concepts/upload.md) for more information about how to upload
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
| **@microsoft.graph.conflictBehavior** | string | Specify the behavior to use if the file already exists. You can use the values *fail*, *replace*, or *rename*. The default for PUT is *replace*. |

### Example (path)

<!-- { "blockType": "request", "name": "upload-via-put", "scopes": "files.readwrite" } -->
```
PUT /drive/root:{item-path}:/content
Content-Type: text/plain

The contents of the file goes here.
```

### Response
If successful, this method returns an [driveItem][item-resource] resource in
the response body for the newly created file.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "0123456789abc",
  "name": "myfile.txt",
  "size": 10191,
  "file": { }
}
```

**Note:** The Response object is truncated for clarity. All default properties will
be returned from the actual call.


### Example (ID)

<!-- { "blockType": "request", "name": "upload-via-put-id", "scopes": "files.readwrite" } -->
```
PUT /drive/items/{parent-id}/children/{filename}/content
Content-Type: text/plain

The contents of the file goes here.
```

### Response
If successful, this method returns an [driveItem][item-resource] resource in
the response body for the newly created file.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "0123456789abc",
  "name": "myfile.txt",
  "size": 10191,
  "file": { }
}
```

**Note:** The Response object is truncated for clarity. All default properties will
be returned from the actual call.

### Error responses

See [Error Responses][error-response] for details about
how errors are returned.

[error-response]: ../concepts/errors.md
[item-resource]: ../resources/driveitem.md

### Remarks

SharePoint Server 2016 blocks several file extensions from
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

<!-- {
  "type": "#page.annotation",
  "description": "Create a new file with content or update a file's content.",
  "keywords": "insert,upsert,update,upload",
  "section": "documentation"
} -->
