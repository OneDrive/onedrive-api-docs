# OData Optional Query Parameters

The OData v4 protocol specifies a number of query parameters that can be used
to control the shape of the data returned in a response. The OneDrive API
provides support for several of these optional query string parameters:


## Selecting Properties
You can use the `$select` query string parameter to provide a comma-separated
list of properties to return on [Items][item-resource].

#### Example

When retrieving the children of an Item, you can ask for only certain properties
to be returned:

```http
GET /drive/root/children?$select=name,size
```

By submitting the request with the `$select=name,size` query string, the objects
in the response will only have these property values included. The `id` value
is always returned even if not specified.

```json
{
  "value": [
    {
      "id": "13140a9sd9aba",
      "name": "Documents",
      "size": 1024
    },
    {
      "id": "123901909124a",
      "name": "Pictures",
      "size": 1012010210
    }
  ]
}
```

##### Optional OData Query Parameters

 Name         | Value    | Status        | Description
:-------------|:---------|:--------------|:------------------------------------------------------------------------------------------------------------------------------------------------
 `$expand`    | `string` | available     | Comma-separated list of relationships to expand and include in the response. For Folders, you could expland on its children collection.
 `$select`    | `string` | available     | Comma-separated list of properties to include in the response.
 `$skipToken` | `string` | available     | Paging token that can be used to get the next set of results
 `$top`       | `int`    | available     | Specify the number of items to return in a result set. The API may have a hard limit that prevents you from asking for more items per response.
 `$orderby`   | `string` | available     | Comma-separated list of properties that are used to sort the order of items in the response collection. Works for `name`, `size`, and `dateLastModified` fields.
 `$filter`    | `string` | not available | Filter string that lets you filter the response based on a set of criteria
