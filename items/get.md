# Get Item Metadata

Retrieve the metadata for an Item by path or ID.

##### Pre-requisites
To call the get item metadata API, the user must have granted the application
read access to the specified folder.

##### HTTP Request
```
GET /drive/items/{item-id}
GET /drive/root:/{item-path}
```

##### Optional Query Parameters

You can use the [OData query parameters][odata-parameters] to restrict
the shape of the objects returned from this call.


##### Optional Request Headers

Name            | Value  | Description
--------------- | ------ | -----------
`if-none-match` | `etag` | If this request header is included and the etag provided matches the current etag on the file, an `HTTP 304` Not Modified response is returned.

##### Request Body
Do not supply a request body with this method.

#### Example
```
GET /drive/items/123456789ABC
```

##### Response

If successful, this method returns an [Item][item-resource] resource in
the response body.

```http
HTTP/1.1 200 OK
Content-type: application/json
Content-length: length

{
	"id": "0123456789abc",
	"name": "example.xlsx",
    "folder": { "childrenCount" : 4 }
}
```

**Note:** Response object is truncated for clarity. All default properties will be returned from the actual call.

##### Error Response

Read the [Error Responses][error-response] topic for more information about
how errors are returned.
[error-response]: ../misc/errors.md

HTTP Code|HTTP Error Message|Error Code|Error Message|Notes
---|---|---|---|---|---|
400|Bad Request|InvalidParameter|Supplied parameter is invalid or has incorrect format|
403|Forbidden|AccessRestricted|The app does not have authorization to delete this file.|
404|Not Found|ResourceDoesNotExist|Resource specified in the request does not exist|
405|Method Not Allowed|NotAllowed|Method not allowed for the specified resource|Expand request should be performed on children collection in order to get Folder listing
501|Not Implemented|NotImplemented|Requested feature is not implemented|

[odata-parameters]: ../odata/optional-query-parameters.md
[item-resource]: README.md
