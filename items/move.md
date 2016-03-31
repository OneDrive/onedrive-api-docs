# Move an item on OneDrive

Move an item from one parent to another.

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

<!-- { "blockType": "request", "name": "move-item", "scopes": "files.readwrite" } -->
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
**parentReference.id** or **parentReference.path** property to the ID of the target parent.

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

**Note:** When moving items to the root of a OneDrive you cannot use the
`"id:" "root"` syntax. You either need to use the real ID of the root folder, or
use `{"path": "/drive/root"}` for the parent reference.


### Error responses

See [Error Responses][error-response] for more info about
how errors are returned.

[error-response]: ../misc/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "Move an item to another location or rename the item.",
  "keywords": "move,rename,mv,change location",
  "section": "documentation",
  "tocPath": "Items/Move"
} -->
