# View Changes For An Item And Children

Enumerate the changes under the folder since a given state, represented by a
change token. This enables your application to maintain a local representation
of the contents of a drive and update the local state efficiently.

##### HTTP Request

````
GET /drive/items/{item-id}/view.changes
GET /drive/root:/{item-path}:/view.changes
````

##### Optional query string parameters

| Name    | Value    | Description                                                                                                                                  |
|:--------|:---------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| `token` | `string` | The last token returned from the previous call to `view.changes`. If omitted, `view.changes` will return the current state of the hierarchy. |

##### Example

<!-- { "blockType": "request", "name": "get-changes" } -->
```
GET /drive/items/{item-id}/view.changes?token={token}
Accept: application/json
```

##### Response

If successful, this call returns a collection of Item resources representing
the current state of each item. The collection also includes these additional
properties:

| Name              | Value     | Description                                                                                                                                                      |
|:------------------|:----------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `value`           | `array`   | An array of [Item][item-resource] objects which have been created, modified, or deleted.                                                                         |
| `@odata.nextLink` | `url`     | A URL that can be used to retrieve the next page of changes.                                                                                                     |
| `hasMoreChanges`  | `boolean` | A value that indicates if there are additional changes available.                                                                                                |
| `nextToken`       | `string`  | A token value that can be used on the next call to `view.changes` to retrieve the next set of changes. This matches the value in the `@odata.nextLink` property. |

Your application should continue to call `view.changes` until the
`hasMoreChanges` value is set to `false` or until you make a request that
returns with no changes.

Deleted items will be returned with a `tombstone` facet which includes
details about when and who deleted the file. Items with this facet should be
removed from your local state.


###### Example

<!-- { "blockType": "response", "@odata.type": "oneDrive.viewChanges", "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-type: application/json
Content-length: length

{
    "value": [
    {
        "id": "0123456789abc",
        "name": "folder2",
        "folder": { }
    },
    {
        "id": "123010204abac",
        "name": "file.txt",
        "file": { }
    }
    ],
    "@odata.nextLink": "https://api.onedrive.com/drive/root/view.changes?token=1230919asd190410jlka",
    "hasMoreChanges": true,
    "nextToken": "1230919asd190410jlka"
}
```

**Note:** Response object is truncated for clarity. All default properties will be returned from the actual call.

**Note** This API ensures that the parent item will always be returned before
any child items.

**Note** By default each response will include the next 200 changes available
on the service. You can modify the number of changes returned in a single call
using the `$top` query string parameter.


##### Error Responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.
[error-response]: ../misc/errors.md

| HTTP Code | HTTP Error Message | Error Code               | Error Message                                                                    | Notes |  |
|:----------|:-------------------|:-------------------------|:---------------------------------------------------------------------------------|:------|:-|
| 400       | Bad Request        | MissingBody              | Request Body is required                                                         |       |  |
| 400       | Bad Request        | InvalidBody              | Supplied request body is invalid or incomplete                                   |       |  |
| 400       | Bad Request        | TotalAffectCountTooLarge | Operation is not allowed because the number of affected items exceeds threshold. |       |  |
| 403       | Forbidden          | AccessRestricted         | Resource has been restricted in use                                              |       |  |
| 404       | Not Found          | SourceDoesNotExist       | Source resource specified in the request does not exist                          |       |  |
| 404       | Not Found          | DestinationDoesNotExist  | Destination folder specified in the request does not exist                       |       |  |

[item-resource]: ../resources/item.md
