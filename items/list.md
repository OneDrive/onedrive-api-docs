# List children for a OneDrive item

Items with the folder facet may contain one or more child items. This API
lists the contents of the item's `children` collection using either the item ID
or path to the item.


## Prerequisites
To call this API, the user must have granted the application read
access to the folder.

## HTTP request
```
GET /drive/items/{item-id}/children
GET /drive/root:/{item-path}:/children
```

### Optional query parameters
This method supports the
[OData Query Parameters](../odata/optional-query-parameters.md) to filter and
shape the response.


### Optional request headers

| Header name     | Value | Description                                                                                                                                     |
|:----------------|:------|:------------------------------------------------------------------------------------------------------------------------------------------------|
| _if-none-match_ | etag  | If this request header is included and the etag provided matches the current etag on the file, an `HTTP 304 Not Modified` response is returned. |


### Request body

Do not supply a request body with this method.

### Example

<!-- { "blockType": "request", "name": "list-children-root" } -->
```http
GET /drive/root/children
```

### Response

If successful, this method returns the list of items in the children collection of the
target item. The children collection will be composed of
[Item][item-resource] resources.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "isCollection": true, "truncated": true} -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "value": [
    {"name": "myfile.jpg", "size": 2048, "file": {} },
    {"name": "Documents", "folder": { "childCount": 4} },
    {"name": "Photos", "folder": { "childCount": 203} },
    {"name": "my sheet(1).xlsx", "size": 197 }
  ]
}
```

**Note:** Response objects are truncated for clarity. All default properties
will be returned from the actual call.

### Error responses

See [Error Responses][error-response] for more info about
how errors are returned.

[error-response]: ../misc/errors.md
[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "List the children of an item.",
  "keywords": "list,children,collection",
  "section": "documentation",
  "tocPath": "Items/List Children"
} -->
