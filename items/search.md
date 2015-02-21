# Search for items in OneDrive (Preview)

Search the hierarchy of items in OneDrive for items matching a query. You can search for filenames and item content
by using a query.

## HTTP request

````
GET /drive/root/view.search?q=vacation
GET /drive/items/{item-id}/view.search?q=vacation
GET /drive/root:/{item-path}/view.search?q=vacation
````

This method supports [optional query string parameters][odata-query-parameters]
to shape the response.

**Note:** Make sure to properly query string encode any characters in the query
parameter.

### Query string parameters

| Name | Value  | Description                                     |
|:-----|:-------|:------------------------------------------------|
| `q`  | string | The query text used to search the item's index. |


### Example

<!-- { "blockType": "request", "name": "search" } -->
```
GET /drive/root/view.search?q={search-text}
```

### Response

This method returns an object with an array of [Items][item-resource] that
match the search criteria. If no items were found, an
empty array is returned.

If there are too many matches, the response will be paged and an
**@odata.nextLink** property will contain a URL to the next page of results.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "isCollection": true, "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-type: application/json
Content-length: length

{
    "value": [
      {
        id: "0123456789abc!123",
        name: "Vacation photos",
        folder: {}
      },
      {
        id: "0123456789abc!456",
        name: "Summer Vacation Rentals.docx",
        file: {}
      }
    ],
    "@odata.nextLink": "https://api.onedrive.com/drive/root/view.search?query=vacation&skipToken=1asdlnjnkj1nalkm!asd"
}
```

**Note:** The response object is truncated for clarity. All default properties are returned from the actual call.


### Error responses

See [Error Responses][error-response] for more information about
how errors are returned.

[error-response]: ../misc/errors.md
[item-resource]: ../resources/item.md
[odata-query-parameters]: ../odata/optional-query-parameters.md
