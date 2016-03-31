# Searching and filtering Items in OneDrive

Search the hierarchy of items in OneDrive for items matching a query. You can
search and/or filter results to find the items your app is looking for.

Search returns matching results from the item specified in the URL and all
children of that item. Filtering works on the collection of items returned,
which can be either all children when using search, or just the immediate
children when using a collection.

## Search request

<!-- { "blockType": "ignored" } -->
```
GET /drive/root/view.search?q=vacation
GET /drive/items/{item-id}/view.search?q=vacation
```

This method supports [optional query string parameters][odata-query-parameters]
to shape the response. The search results collection can be filtered using
the [filter query string parameter](../odata/filtering.md).

**Note:** Make sure to properly query string encode any characters in the query
parameter.

#### Query string parameters

| Name | Value  | Description                                                                                                                          |
|:-----|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `q`  | string | The query text used to search for items. Values may be matched across several fields including filename, metadata, and file content. |

### Example

<!-- { "blockType": "request", "name": "search-at-root", "idempotent": true, "scopes": "files.read" } -->
```
GET /drive/root/view.search?q={search-text}
```

### Response

This method returns an object containing an array of [Items][item-resource] that
match the search criteria. If no items were found, an empty array is returned.

If there are too many matches the response will be paged and an
**@odata.nextLink** property will contain a URL to the next page of results. You
can use the `top` query parameter to specify the number of items in the page.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "isCollection": true, "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "value": [
      {
        "id": "0123456789abc!123",
        "name": "Vacation photos",
        "folder": {},
        "searchResult":
        {
          "onClickTelemetryUrl": "https://bing.com/0123456789abc!123"
        }
      },
      {
        "id": "0123456789abc!456",
        "name": "Summer Vacation Rentals.docx",
        "file": {},
        "searchResult":
        {
          "onClickTelemetryUrl": "https://bing.com/0123456789abc!456"
        }
      }
    ],
    "@search.approximateCount": 12,
    "@odata.nextLink": "https://api.onedrive.com/drive/root/view.search?query=vacation&skipToken=1asdlnjnkj1nalkm!asd"
}
```

**Note:** The response object is truncated for clarity. All default properties
are returned from the actual call.

### Response properties

| Name                         | Value                                  | Description                                                               |
|:-----------------------------|:---------------------------------------|:--------------------------------------------------------------------------|
| **value**                    | Array of [Items](../resources/item.md) | A collection of results matching the query.                               |
| **@search.approximateCount** | Integer                                | An approximate count of the total number of items that matched the query. |
| **@odata.nextLink**          | URL                                    | A URL that can be used to retrieve the next page of the results           |

### Error responses

See [Error Responses][error-response] for more information about
how errors are returned.

[error-response]: ../misc/errors.md
[item-resource]: ../resources/item.md
[odata-query-parameters]: ../odata/optional-query-parameters.md

## Remarks

In OneDrive for Business, `view.search` will not return the following Item properties:

* `createdBy`
* `modifiedBy`
* `parentReference`

<!-- {
  "type": "#page.annotation",
  "description": "Search for a file across a OneDrive.",
  "keywords": "search,query,bing,filename,content",
  "section": "documentation",
  "tocPath": "Items/Search"
} -->
