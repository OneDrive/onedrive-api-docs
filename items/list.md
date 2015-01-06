# List Item Children

Items with the `Folder` facet may contain one or more child items. This API
lists the contents of the item's `Children` collection using either the Item ID
or path to the Item.


##### Pre-requisites
To call the List Folder API, the user must have granted the application read
access to the folder.

##### HTTP Request
```
GET /drive/items/{item-id}/children
GET /drive/root:/{item-path}:/children
```

##### Optional Query Parameters
This method supports the
[OData Query Parameters](../odata/optional-query-parameters.md) to filter and
shape the response.


##### Optional Request Headers
Header Name     | Value  | Description
--------------- | ------ | ------------
`if-none-match` | `etag` | If this request header is included and the etag provided matches the current etag on the file, an `HTTP 304` Not Modified response is returned


##### Request Body
Do not supply a request body with this method.

#### Example

<!-- { "blockType": "request", "name": "list-children-root" } -->
```
GET /drive/root/children
```

##### Response

If successful, this method returns the Items in the Children collection of the
target Item. The children collection will be composed of
[Item][item-resource] resources.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "isCollection": true, "truncated": true} -->
```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-length: length

{
  "value": [
    {"name": "myfile.jpg", "size": 2048 },
    {"name": "Documents", "folder": { "childCount": 4} },
    {"name": "Photos", "folder": { "childCount": 203} },
    {"name": "my sheet(1).xlsx", "size": 197 }
  ]
}
```

**Note:** Response objects are truncated for clarity. All default properties
will be returned from the actual call.

##### Error Response

Read the [Error Responses][error-response] topic for more information about
how errors are returned.
[error-response]: ../misc/errors.md

HTTP Code|HTTP Error Message|Error Code|Error Message|Notes
---|---|---|---|---|---|
400|Bad Request|InvalidParameter|Supplied parameter is invalid or has incorrect format|
403|Forbidden|AccessRestricted|The app does not have authorization to delete this file.|
404|Not Found|ResourceDoesNotExist|Resource specified in the request does not exist|
405|Method Not Allowed|NotAllowed|Method not allowed for the specified resource|
501|Not Implemented|NotImplemented|Requested feature is not implemented|


[item-resource]: ../resources/item.md
