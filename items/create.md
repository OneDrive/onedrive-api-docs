# Create an Item in OneDrive

Add a new item under an existing parent item in OneDrive.

**Note** You can't create empty files in OneDrive. See
[Upload item contents](upload.md) for more info about creating a file with metadata and
contents in an API call.

## Prerequisites

To create an item in OneDrive, the user must have granted the app write
access to the parent folder of the new item.

## HTTP request

<!-- { "blockType": "ignored" } -->
```
POST /drive/items/{parent-id}/children
POST /drive/root:/{parent-path}:/children
```

### Optional query string parameters
| Parameter name           | Value  | Description                                                                                                                                                 |
|:-------------------------|:-------|:------------------------------------------------------------------------------------------------------------------------------------------------------------|
| _@name.conflictBehavior_ | string | Determines what to do if a file with a matching filename already exists in this folder. Accepted values are: **rename**, **replace**, and **fail** (the default). |


If _@name.conflictBehavior_ is set to **rename** and a file with the same name already
exists in the destination, the new filename will be updated to be unique. OneDrive
will append a number to the end of the filename (before the file extension).

For example, `Service Report.docx` would be renamed `Service Report 1.docx`.
If `Service Report 1.docx` is taken, then the number would be incremented
again until a unique filename is discovered.

### Request body
In the request body, supply a JSON representation of a [Folder][folder-facet] Item, as shown
below.


### Folder example

Here is an example of how to create a new folder.

<!-- { "blockType": "request", "name": "create-folder" } -->
```
POST /drive/root/children
Content-Type: application/json

{
  "name": "FolderA",
  "folder": { }
}
```

| Name     | Value                       | Description                                                                         |
|:---------|:----------------------------|:------------------------------------------------------------------------------------|
| _name_   | string                      | Name of the folder to be created.                                                   |
| _folder_ | [FolderFacet][folder-facet] | Empty *Folder* facet to indicate that folder is the type of resource to be created. |

### File example

See [Multipart Upload](upload_post.md) for details on how to create an item and
provide metadata and file contents at the same time.


## Response

If successful, this method returns an [Item][item-resource] in
the response body.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 201 Created
Content-type: application/json
Content-length: length

{
  "id": "0123456789abc",
  "name": "FolderA",
  "folder": { "childCount": 0 }
}
```

**Note:** The response object is truncated for clarity. All default properties will
be returned from the actual call.

### Error response

Read the [Error Responses][error-response] topic for more info about
how errors are returned.
[error-response]: ../misc/errors.md
[item-resource]: ../resources/item.md
[folder-facet]: ../facets/folder_facet.md
