# Delete a Permission

Remove a Permission from an Item.

Only Permissions that are not inherited can be deleted. This means that the `inheritedFrom`
property must be `null`.

**Note:** Applications can only delete link permissions they have created.

## HTTP Request
```
DELETE /drive/items/{item-id}/permissions/{permission-id}
DELETE /drive/root:/{item-path}:/permissions/{permission-id}
```

#### Optional query parameters
None.

### Request body
Do not supply a request body with this method.

#### Optional request headers

| Name       | Value  | Description                                                                                                                                                      |
|:-----------|:-------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `if-match` | `etag` | If this request header is included and the etag provided does not match the current etag on the file, a `412 Precondition Failed` response is returned. |


### Example

<!-- {"blockType": "request", "name": "delete-permission" } -->
```
DELETE /drive/items/{item-id}/permissions/{permission-id}
```

### Response
<!-- {"blockType": "response"} -->
```http
HTTP/1.1 204 No Content
```

### Error responses

Read the [Error responses][error-response] topic for more information about
how errors are returned.

[error-response]: ../misc/errors.md
