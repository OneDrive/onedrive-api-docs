# Delete an Item in OneDrive

Deletes a OneDrive item by using its ID or path. Note that deleting items using this method
will move the items to the Recycle Bin, instead of permanently deleting them.


## Prerequisites
To delete an item, the user must have granted the application write access
to the item to be deleted.

## HTTP request

<!-- { "blockType": "ignored" } -->
```
DELETE /drive/items/{item-id}
DELETE /drive/root:/{item-path}
```

### Optional request headers

| Name       | Value | Description                                                                                                                                                                                       |
|:-----------|:------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| _if-match_ | etag  | If this request header is included and the eTag (or cTag) provided does not match the current tag on the item, a `412 Precondition Failed` response is returned and the item will not be deleted. |

### Request body
Do not supply a request body with this method.


### Example
<!-- { "blockType": "request", "name": "delete-item", "scopes": "files.readwrite" } -->
```
DELETE /drive/items/{item-id}
```

## Response

If successful, this call returns a `204 No Content` response to indicate that
resource was deleted and there was nothing to return.

<!-- { "blockType": "response" } -->
```http
HTTP/1.1 204 No Content
```

### Error responses

See [Error Responses][error-response] for more info about
how errors are returned.

[error-response]: ../misc/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "Delete an item from OneDrive",
  "keywords": "delete,existing item,onedrive",
  "section": "documentation",
  "tocPath": "Items/Delete"
} -->
