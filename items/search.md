# Search for Items

Search the hierarchy of items for items matching a query. Filenames and content
of items may be searched depending on the query.

##### HTTP Request

````
GET /drive/root/view.search?q=vacation
GET /drive/items/{item-id}/view.search?q=vacation
GET /drive/root:/{item-path}/view.search?q=vacation
````

This method supports [optional query string parameters][odata-query-parameters]
to shape the response.

**Note** Make sure to properly query string encode any characters in the query
parameter

##### Query String Parameters
Name | Value  | Description
---- | ------ | -----------
`q`  | string | The query text used to search the item's index.


##### Example

<!-- { "blockType": "request", "name": "search" } -->
```
GET /drive/root/view.search?q={search-text}
```

##### Response

The function returns an object with an array of [Items][item-resource] that
match the search criteria. If no items were found that meet the criteria, an
empty array is returned.

If there are too many matches the response will be paged and an
`@odata.nextLink` property will contain URL to the next page of results.

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
    "@odata.nextLink": "https://api.onedrive.com/drive/root/view.search?query=vacation&$skipToken=1asdlnjnkj1nalkm!asd"
}
```

**Note:** Response object is truncated for clarity. All default properties will be returned from the actual call.


##### Error Responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.
[error-response]: ../misc/errors.md

HTTP Code | HTTP Error Message| Error Code               | Error Message
--------- | ----------------- | ------------------------ | --------------
400       | Bad Request       | MissingBody              | Request Body is required
400       | Bad Request       | InvalidBody              | Supplied request body is invalid or incomplete
400       | Bad Request       | TotalAffectCountTooLarge | Operation is not allowed because the number of affected items exceeds threshold.
403       | Forbidden         | AccessRestricted         | Resource has been restricted in use
404       | Not Found         | SourceDoesNotExist       | Source resource specified in the request does not exist
404       | Not Found         | DestinationDoesNotExist  | Destination folder specified in the request does not exist

[item-resource]: ../resources/item.md
[odata-query-parameters]: ../odata/optional-query-parameters.md
