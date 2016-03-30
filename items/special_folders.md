# Accessing special folders on OneDrive

Special folders provide simple aliases to access well-known folders in OneDrive
without the need to look up the folder by path (which would require localization),
or reference the folder with an ID. If a special folder is renamed or moved
to another location within the drive, this syntax will continue to find that
folder.

Special folders are automatically created the first time an application attempts
to write to one, if it doesn't already exist. If a user deletes one, it is
recreated when written to again.

**Note:**  If you have read-only permissions and request a special folder that doesn't exist, you'll receive a `403 Forbidden` error.

Here are the special folders available to all clients.

| Name        | Folder id    | Description                                                              |
|:------------|:-------------|:-------------------------------------------------------------------------|
| Documents   | `documents`  | The Documents folder.                                                    |
| Photos      | `photos`     | The Photos folder.                                                       |
| Camera Roll | `cameraroll` | The Camera Roll Backup folder.                                           |
| App Root    | `approot`    | The application's personal folder. Usually in `/Apps/{Application Name}` |
| Music       | `music`      | The Music folder.                                                        |

## Example

<!-- { "blockType": "request", "name": "get-special-folder", "scopes": "files.read" } -->
```http
GET /drive/special/{special-folder-name}
```

## Response
The response to a GET for the special folder will be the folder's **Item**
resource. You can use this method of addressing a special folder with any OneDrive API
call you would normally make to a folder, instead of addressing the folder
by id or path.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-type: application/json

{
  "id": "0123456789abc",
  "name": "Documents",
  "eTag": "012345819293.1",
  "specialFolder": {
    "name": "documents"
  }
}
```

**Note:** Special folders will return a `specialFolder` facet that
describes the identifier used for accessing the special folder.

To request the children of a special folder, you can request the `children`
collection or use the [expand](../odata/optional-query-parameters.md) option to expand the children collection.

<!-- { "blockType": "request", "name": "get-special-children", "scopes": "files.read" } -->
```http
GET /drive/special/{special-folder-name}/children
```

The next example will return the standard children collection as you would see from other
ways of addressing the folder.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "isCollection": true, "truncated": true} -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "value": [
    {"name": "myfile.jpg", "size": 2048 },
    {"name": "Documents", "folder": { "childCount": 4} },
    {"name": "Photos", "folder": { "childCount": 203} },
    {"name": "my sheet(1).xlsx", "size": 197 }
  ]
}
```

The last example uses [path addressing](../misc/addressing.md) for children of
the special folder by using the colon to separate the path from the special
folder URL:

To retrieve the contents of myfile.docx in the Documents folder:
```http
GET /drive/special/documents:/myfile.docx:/content
```

## HEAD requests for special folders

If you request a special folder that doesn't exist by using a GET request,
the special folder will be automatically created for you. You can test to see if the special folder
exists by using a HEAD request. If the folder doesn't exist, the
HEAD request will return a `404` response.

<!-- { "blockType": "request", "name": "head-does-not-create-special-folder", "scopes": "files.read service.onedrive" } -->
```
HEAD /drive/special/{special-folder-name}
```

<!-- {"blockType": "response"} -->
```
HTTP/1.1 404 Not Found
```

On the other hand, sending the same request when the folder already exists will
return a `200 OK` response.

<!-- { "blockType": "request", "name": "head-existing-special-folder", "scopes": "files.read" } -->
```
HEAD /drive/special/{special-folder-name}
```

<!-- {"blockType": "response", "isEmpty": true } -->
```
HTTP/1.1 200 OK
```

## Error responses

See [Error Responses][error-response] for details about
how errors are returned.

[error-response]: ../misc/errors.md

## Remarks

If your app has read-only permissions, the request to get a special folder or
the children of a special folder may fail with a `404 Not Found` or a `403 Forbidden`
error if the special folder does not already exist. It is recommended to use the
[HEAD request](#head-requests-for-special-folders) to check for the existence
of a special folder first in this scenario.

<!-- {
  "type": "#page.annotation",
  "description": "Access known folders in OneDrive through the special folder collection",
  "keywords": "known folders",
  "section": "documentation",
  "tocPath": "Concepts/Special Folders"
} -->
