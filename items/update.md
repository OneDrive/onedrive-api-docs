# Update an item on OneDrive

Update the metadata for an item in OneDrive by ID or path. You can also use update to move
an item to another parent by updating the item's **parentReference** facet.

## Prerequisites

To call this method to change an item's metadata, the user must have granted
the application write access to the item.


## HTTP request
```
PATCH /drive/items/{item-id}
PATCH /drive/root:/{folder-path}
```

### Optional request headers

| Name       | Value | Description                                                                                                                                               |
|:-----------|:------|:----------------------------------------------------------------------------------------------------------------------------------------------------------|
| *if-match* | etag  | If this request header is included and the etag provided does not match the current etag on the folder, a `412 Precondition Failed` response is returned. |



### Request body
In the request body, supply the values for relevant fields that should be
updated. Existing properties that are not included in the request body
will maintain their previous values or be recalculated based on changes to other
property values. For best performance you shouldn't include existing values
that haven't changed.


### Example

This example renames and moves a folder to a new parent path.

<!-- { "blockType": "request", "name": "update-item-move-folder" } -->
```
PATCH /drive/items/{item-id}
Content-Type: application/json

{
	"name": "NewFolderName",
	"parentReference" : {"path": "/drive/root:/Documents"}
}
```

### Response

If successful, this method returns an [Item][item-resource] resource in
the response body.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: length

{
	"id": "0123456789abc",
	"name": "BFolder",
	"folder": { "childCount": 3 }
}
```

**Note:** The response object is truncated for clarity. All default properties will be returned from the actual call.

### Error responses

See [Error Responses][error-response] for details about
how errors are returned.

[error-response]: ../misc/errors.md
[item-resource]: ../resources/item.md
