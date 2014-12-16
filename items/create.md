# Create Item

Add a new item under an existing parent item.

**Note** OneDrive does not allow the creation of empty files. See
[Uploading Item Contents](upload.md) for how to create a file with metadata and
contents in an API call.

##### Pre-requisites

To call the Create Item API, the user must have granted the application write
access to the parent folder of the new folder.

#### HTTP Request

```
POST /drive/items/{parent-id}/children
POST /drive/root:/{parent-path}:/children
```

##### Optional Query String Parameters
Parameter Name | Value    | Description
-------------- | -------- | -----------
`nameConflict` | `string` | Determines what to do if a file with a matching filename already exists in this folder. Accepted values are: `rename`, `overwrite`, and `abort` (the default).


If `nameConflict` is set to `rename` and a file with the same name already
exists in the destination, the filename will be updated to be unique. OneDrive
will append a number in parenthesis to the end of the filename (before the
file extension).

For example, `Service Report.docx` would be renamed `Service Report (1).docx`.
If `Service Report (1).docx` was taken, then the number would be incremented
again until a unique filename was discovered.

##### Request Body
In the request body, supply folder JSON representation of the Item as shown
below.


###### Folder Example
```
POST /me/items/123456789ABC/children
Content-Type: application/json

{
  "name": "FolderA"
  "folder": {}
}
```

Name     | Value         | Description
-------- | ------------- | ---
`name`   |`string`       | _required._ Name of the folder to be created.
`folder` |`FolderFacet`  | _required._ Empty FolderFacet object to indicate that folder is the type of resource to be created.

###### File Example

See [Multipart Upload](upload_post.md) for details on how to create an item and
provide metadata and file contents at the same time.


##### Response

If successful, this method returns returns an [Item][item-resource] in
the response body.

```http
HTTP/1.1 201 Created
Content-type: application/json; charset=utf-8
Content-length: length

{
  "id": "0123456789abc",
  "name": "FolderA",
  "folder": { }
}
```

**Note:** Response object is truncated for clarity. All default properties will
be returned from the actual call.

##### Error Response

Read the [Error Responses][error-response] topic for more information about
how errors are returned.
[error-response]: ../misc/errors.md

HTTP Code|HTTP Error Message  | Error Code          |Error Message
-------- | ------------------ | ------------------- |---------------
400      | Bad Request        | MissingBody         | Request Body is required
400      | Bad Request        | InvalidFolderBody   | Valid JSON Folder Representation in Body is expected
400      | Bad Request        | PathTooDeep         | Folder hierarchy depth limit reached
400      | Bad Request        | InvalidResourceName | Resource name is invalid or has incorrect format
403      | Forbidden          | AccessRestricted    | The app does not have authorization to delete this file.
403      | Forbidden          | AccessRestricted    | Resource has been restricted in use
404      | Not Found          | ParentDoesNotExist  | Target parent for current operation does not exist
405      | Method Not Allowed | NotAllowed          | Method not allowed for the specified resource
409      | Conflict           | ItemAlreadyExists   | Resource already exists
