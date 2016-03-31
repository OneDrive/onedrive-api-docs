# Update a Permission

Update an existing permission on an item. Only the **roles** property can be
modified by patching the permission resource.

For other changes, [delete the existing permission](permission_delete.md) and use
[invite to add new permissions](invite.md) to the item.

## HTTP request
````
PATCH /drive/items/{item-id}/permissions/{permission-id}
PATCH /drive/root/:{item-path}:/permissions/{permission-id}
````

#### Optional query parameters
None.  

### Request body
In the request body, supply the values for the new `roles`.

### Example
The following example updates the Permission resource to a read-only permission.

<!-- {"blockType": "request", "name": "update-permission", "@odata.type": "oneDrive.permission", "scopes": "files.readwrite"} -->
```http
PATCH /drive/items/{item-id}/permissions/{permission-id}
Content-Type: application/json

{
  "roles": ["read"]
}
```

### Response

If successful, this method returns a [Permission](../resources/permission.md)
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
  }
}
```

**Note:** Response object is truncated for clarity. All default properties will
be returned from the actual call.

### Error responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.

[error-response]: ../misc/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "Update an item's permissions",
  "keywords": "permission, permissions, sharing, change permissions, update permission",
  "section": "documentation",
  "tocPath": "Sharing/Update Permissions"
} -->
