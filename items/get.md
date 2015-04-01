# Get metadata for a OneDrive item

Retrieve the metadata for an Item on OneDrive by path or ID.

## Prerequisites
To call the get item metadata API, the user must have granted the application
read access to the specified item.

### HTTP request

```
GET /drive/items/{item-id}
GET /drive/root:/{item-path}
```

### Optional query parameters

You can use the [OData query parameters][odata-parameters] to restrict
the shape of the objects returned from this call.

### Optional request headers

| Name            | Value | Description                                                                                                                                     |
|:----------------|:------|:------------------------------------------------------------------------------------------------------------------------------------------------|
| _if-none-match_ | etag  | If this request header is included and the etag provided matches the current etag on the file, an `HTTP 304 Not Modified` response is returned. |

### Request body
Do not supply a request body with this method.

### Example

<!-- { "blockType": "request", "name": "get-item-metadata" } -->
```
GET /drive/items/{item-id}
```

## Response

If successful, this method returns an [Item][item-resource] resource in
the response body.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item" } -->
```http
HTTP/1.1 200 OK
Content-type: application/json

{
  "id": "0123456789abc",
  "name": "example.xlsx",
  "eTag": "etag",
  "cTag": "etag",
  "createdBy": { "user": { "id": "1234", "displayName": "Ryan Gregg" } },
  "createdDateTime": "datetime",
  "lastModifiedBy": { "user": { "id": "1234", "displayName": "Ryan Gregg" } },
  "lastModifiedDateTime": "datetime",
  "size": 1234,
  "webUrl": "http://onedrive.com/...",
  "parentReference": { "driveId": "12345", "id": "root", "path": "/drive/root:" },
  "folder": { "childCount": 4 }
}
```

**Note:** The response object is truncated for clarity. All default properties will be returned from the actual call.


## Get an Item and its children in a single call

You can use the [`expand`](../odata/optional-query-parameters.md) query string
parameter to include the children of an item in the same call as retrieving the
metadata of an item.

### HTTP request

<!-- { "blockType": "request", "name": "get-root-folder-children" } -->
```http
GET /drive/items/root?expand=children
```

### Response

This call will return the item metadata and a list of children of the
item. If the item has no children, it will return an empty collection.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "101230100alkc",
  "name": "OneDrive",
  "children": [
    { "id": "120100abo1", "name": "folder1", "folder": {} },
    { "id": "120100abab", "name": "file1.txt", "file": {} },
    { "id": "120100abo1", "name": "file2.txt", "folder": {} },
    { "id": "120100abo1", "name": "folder 2", "file": {} }
  ]
}
```

**Note:** Response objects are truncated for clarity. All default properties will
be returned from the actual call.

## Error responses

See [Error Responses][error-response] for more info about
how errors are returned.

[error-response]: ../misc/errors.md
[odata-parameters]: ../odata/optional-query-parameters.md
[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "Retrieve metadata about an item and its children in OneDrive",
  "keywords": "retrieve,item,metadata",
  "section": "documentation",
  "tocPath": "Items/Get Metadata"
} -->
