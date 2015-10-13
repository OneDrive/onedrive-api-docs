# Delete a Permission
Remove a Permission from an Item.

Only Permissions that are not inherited can be deleted - the `inheritedFrom`
property must be `null`.

**Applications can only delete link permissions they have created.**

##### HTTP Request
```
DELETE /drive/items/{item-id}/permissions/{permission-id}
DELETE /drive/root:/{item-path}:/permissions/{permission-id}
````

##### Optional Query Parameters
None defined

##### Request Body
Do not supply a request body with this method.

##### Optional Request Headers

| Name       | Value  | Description                                                                                                                                                      |
|:-----------|:-------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `if-match` | `etag` | If this request header is included and the etag provided does not match the current etag on the file, an `412 Precondition Failed` response is returned. |


#### Example

```
DELETE /drive/items/12343212AEF/permissions/123
```

##### Response
```http
HTTP/1.1 204 No Content
```

##### Error Responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.

[error-response]: ../misc/errors.md
