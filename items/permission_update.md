# Update a Permission
Update an existing Permission on an Item. Only the `role` property can be
modified.

** This method is restricted to first party callers. **

##### HTTP Request
````
PATCH /drive/items/{item-id}/permissions/{permission-id}
PATCH /drive/root/:{item-path}:/permissions/{permission-id}
````

##### Optional Query Parameters
None  

##### Request Body
In the request body, supply the values for the new `role`.

##### Optional Request Headers
| Name       | Value  | Description                                                                                                                                                      |
|:-----------|:-------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `if-match` | `etag` | If this request header is included and the etag provided does not match the current etag on the file, an `412 Precondition Failed` response is returned. |



#### Example

The following example updates the permission resource with id `123` to be
a read-only permission.

<!-- {"blockType": "request", "name": "update-permissions"} -->
```http
PATCH /drive/root:/Documents/myfile.jpg:/permissions/123
Content-Type: application/json

{
  "role": "read"
}
```

##### Response

If successful, this method returns a [Permission](../facets/permission_facet.md)
resource in the response body that represents the updated state of the
permission.

<!-- { "blockType": "response", "@odata.type": "oneDrive.permission", "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "123",
  "roles": ["read"],
  "grantedTo": {
    "user": {
      "id": "5D33DD65C6932946",
      "displayName": "John Doe"
    }
  },
  "invitation": {
    "email": "jd@outlook.com",
    "signInRequired": true,
    "redeemedBy": "none"
  }
}
```

**Note:** Response object is truncated for clarity. All default properties will
be returned from the actual call.

##### Error Responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.

[error-response]: ../misc/errors.md
