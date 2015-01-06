# Accessing Special Folders

Special folders provide simple aliases to access well known folders in OneDrive
without the need to look up the folder by path (which would require localization)
or referencing the folder with an ID. If a special folder is renamed or moved
to another location within the Drive, this syntax will continue to find that
folder.

Special folders are automatically created the first time an application attempts
to write to one, if it doesn't already exist. If a user deletes one, it is
recreated when written to again.

The following special folders are available to all clients:

| Name        | Folder Id    | Description                                                              |
|:------------|:-------------|:-------------------------------------------------------------------------|
| Documents   | `documents`  | The Documents folder                                                     |
| Photos      | `photos`     | The Photos folder                                                        |
| Music       | `music`      | The Music folder                                                         |
| Camera Roll | `cameraroll` | The Camera Roll Backup folder.                                           |
| Public      | `public`     | The default Public folder                                                |
| App Folder  | `appfolder`  | The application's personal folder. Usually in `/Apps/{Application Name}` |


##### Example

<!-- {"blockType": "request", "name": "get-special-folder"} -->
```http
GET /drive/special/{special-folder-id}
```

##### Response
The response to a GET for the special folder will be the folder's `Item`
resource. You can use this method of addressing a special folder with any API
call you would normally make to a folder, instead of addressing the folder
by id or path.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-type: application/json

{
  id: "0123456789abc",
  name: "Documents",
  "eTag": "012345819293.1",
  "jumpInfo": {
    "jumpId": "documents"
  }
}
```

**Note:** Folders that are special folders will return a `jumpInfo` facet that
describes the identifier used for accessing the special folder.

To request the children of a special folder, you can request the `children`
collection or use the OData `$expand` option to expand the children collection.

<!-- {"blockType": "request", "name": "get-special-children"} -->
```http
GET /drive/special/{special-folder-id}/children
```

This will return the standard children collection as you would see from other
ways of addressing the folder:

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "isCollection": true, "truncated": true} -->
```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-length: length

{
  "value": [
    {"name": "myfile.jpg", "size": 2048 },
    {"name": "Documents", "folder": { "childCount": 4} },
    {"name": "Photos", "folder": { "childCount": 203} },
    {"name": "my sheet(1).xlsx", "size": 197 }
  ]
}
```
