# Create a sharing link for an item in OneDrive

You can use **createLink** action to share an existing item via a link. This is
a friendly shortcut for creating common sharing links.

The **action.createLink** method will create a new sharing link if the specified
link type doesn't already exist. If a sharing link of the specified type already
exists, the existing sharing link will be returned.

**Note:** Your application must be granted read-write permissions to the item
to be able to create a sharing link. This maps to the `onedrive.readwrite` scope
when requesting user consent.

## HTTP request

````
POST /drive/items/{item-id}/action.createLink
POST /drive/root:/{item-path}:/action.createLink
````

### Request body
The body of the request defines the type of sharing link your application is
looking for. The request should be a JSON object with this property.

| Name   | Type   | Description                                                          |
|:-------|:-------|:---------------------------------------------------------------------|
| _type_ | string | The type of link to create. Possible values are in the next section. |


### Link types
The following values are allowed for the _type_ parameter.

| Type value | Description                           |
|:-----------|:--------------------------------------|
| `view`     | Creates a read-only link to the item  |
| `edit`     | Creates a read-write link to the item |

### HTTP request

<!-- { "blockType": "request", "name": "create-link" } -->
```
POST /drive/items/{item-id}/action.createLink
Content-Type: application/json

{
  "type": "view"
}
```

### HTTP response

If successful, this method returns a single [Permission](../facets/permission_facet.md)
resource in the response body that represents the requested sharing link permission.

The service will first look at the current permissions and check
if one already exists that has the same _type_ for the
calling application.

The response will be `201 Created` if a new sharing link is created for the
item or  `200 OK` if an existing link is returned.

<!-- { "blockType": "response", "@odata.type": "oneDrive.permission" } -->
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "123ABC",
  "roles": ["write"],
  "link": {
    "type": "view",
    "webUrl": "https://onedrive.live.com/redir?resid=5D33DD65C6932946!70859&authkey=!AL7N1QAfSWcjNU8&ithint=folder%2cgif",
    "application": {
      "id": "1234",
      "displayName": "Sample Application"
    }
  }
}

```

### Error responses

See [Error Responses][error-response] for details about
how errors are returned.

[error-response]: ../misc/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "Create a new sharing link for an item.",
  "keywords": "create,sharing,sharing link",
  "section": "documentation",
  "tocPath": "Sharing/Create Link"
} -->
