# Move an Item on OneDrive
Changes the parent folder for a OneDrive Item resource.

This is a special case of the [update](update.md) method. You can combine
moving the folder with other metadata updates.

## Prerequisites

To move a folder, the user must have granted the application read
access to the original folder and write access to the parent folder of the
specified destination.

## HTTP request
<!-- { "blockType": "ignored" } -->
```
PATCH /drive/items/{item-id}
PATCH /drive/root:/{item-path}
```

### Request body
You can use the update API to move an item into another folder by updating the
**parentReference** facet to point to the new parent.

### Example

This example moves an item to the `Documents` folder.

<!-- { "blockType": "request", "name": "move-item" } -->
```
PATCH /drive/items/{item-id}
Content-Type: application/json

{
  "parentReference": {
    "path": "/drive/root:/Documents"
  }
}
```

You can also use the update API to move an item into another folder by updating the
**parentInfo.id** or **parentInfo.path** property to the ID of the target parent.

As with other `PATCH` actions, the entire item object will be included in the response.
<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```
HTTP/1.1 200 OK
Content-Type: application/json

{
	"id": "0123456789abc",
	"name": "test-file.txt",
  "parentReference":
  {
    "driveId": "11231001",
    "path": "/drive/root:/Documents",
    "id": "1231203102!1011"
  }
}
```

For more details, including example responses and error codes,
see the [update](update.md) topic.


### Error responses

See [Error Responses][error-response] for more info about
how errors are returned.

[error-response]: ../misc/errors.md
