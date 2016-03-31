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

| Name            | Value | Description                                                                                                                                              |
|:----------------|:------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
| _if-none-match_ | etag  | If this request header is included and the eTag (or cTag) provided matches the current tag on the file, an `HTTP 304 Not Modified` response is returned. |

### Request body
Do not supply a request body with this method.

### Example

<!-- { "blockType": "request", "name": "get-item-metadata", "scopes": "files.read" } -->
```
GET /drive/items/{item-id}
```

## Response

If successful, this method returns an [Item][item-resource] resource in
the response body.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-type: application/json

{
  "id": "0123456789abc",
  "name": "example.xlsx",
  "eTag": "123918093j1lk2jlkda",
  "cTag": "k1ml4klkasljasidj1l2j34lkaslz",
  "createdBy": { "user": { "id": "1234", "displayName": "Ryan Gregg" } },
  "createdDateTime": "string (timestamp)",
  "lastModifiedBy": { "user": { "id": "1234", "displayName": "Ryan Gregg" } },
  "lastModifiedDateTime": "string (timestamp)",
  "size": 1234,
  "webUrl": "http://onedrive.com/...",
  "parentReference": { "driveId": "12345", "id": "root", "path": "/drive/root:" },
  "folder": { "childCount": 4 }
}
```

**Note:** The response object is truncated for clarity. All default properties
will be returned from the actual call.


## Get an Item and its children in a single call

You can use the [`expand`](../odata/optional-query-parameters.md) query string
parameter to include the children of an item in the same call as retrieving the
metadata of an item.

### HTTP request

<!-- { "blockType": "request", "name": "get-root-folder-children", "scopes": "files.read" } -->
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

## HEAD requests

In most cases, a HEAD request will behave the same way as a GET request. There are a
couple differences:

1. HEAD requests will only return the corresponding GET request's headers. This is
standard practice for a HEAD response.
2. HEAD requests will not automatically provision a
[special folder][special-folder]. Instead, if a special folder is not present,
a `404` error will be returned.

In this example, you can see that requesting the root of your OneDrive will respond with
simply `200 OK`.

### HTTP request

<!-- {"blockType": "request", "name": "head-root", "scopes": "files.read"} -->
```
HEAD /drive/root
Accept: application/json
```

### Response

<!-- {"blockType": "response", "isEmpty": true } -->
```
HTTP/1.1 200 OK
```


## Error responses

See [Error Responses][error-response] for more info about
how errors are returned.

[error-response]: ../misc/errors.md
[odata-parameters]: ../odata/optional-query-parameters.md
[item-resource]: ../resources/item.md
[special-folder]: ../items/special_folders.md

<!-- {
  "type": "#page.annotation",
  "description": "Retrieve metadata about an item and its children in OneDrive",
  "keywords": "retrieve,item,metadata",
  "section": "documentation",
  "tocPath": "Items/Get Metadata"
} -->
