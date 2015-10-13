# Reading permissions on an Item
List the effective permissions of an item.

## Access to Permissions

The permissions collection includes potentially sensitive information and may not
be available for every caller.

* For the owner of the item all permissions will be returned. This includes
  co-owners.
* For a non-owner caller only the permissions that apply to the caller are
  returned.
* Permission properties containing secrets (e.g. `link.token` and `link.webUrl`)
  are only returned for callers that are able to create the Permission:
    * For application permissions, that is only the app that matches the
      `link.identity` of the Permission
    * For other permissions, only first party applications will have access.


##### HTTP Request

```
GET /drive/items/{item-id}/permissions
GET /drive/root:/{path}:/permissions
```

##### Optional Query Parameters
| Name     | Value    | Description                                                                   |
|:---------|:---------|:------------------------------------------------------------------------------|
| `select` | `string` | List of the properties that should be included for each item in the response. |

##### Optional Request Headers
| Header Name     | Value  | Description                                                                                                                                    |
|:----------------|:-------|:-----------------------------------------------------------------------------------------------------------------------------------------------|
| `if-none-match` | `etag` | If this request header is included and the etag provided matches the current etag on the item, an `HTTP 304` Not Modified response is returned |


##### Request Body
Do not supply a request body with this method.

#### Example

<!-- { "blockType": "request", "name": "get-item-permissions" } -->
```
GET /drive/items/{item-id}/permissions
```

##### Response

If successful, this method returns a collection of
[Permission](../facets/permission_facet.md) resources for the item. Each Permission
resource represents an effective permission on the item.

Effective permissions of an item can come from two sources: either permissions
set directly on the item itself or that are inherited from the item's ancestors.

Callers can differentiate if the permission is inherited or not by checking the
`inheritedFrom` property. This property is an
[ItemReference](../resources/itemReference.md) resource referencing the ancestor that
the permission is inherited from.

<!-- {"blockType": "response", "@odata.type": "oneDrive.permission", "isCollection": true} -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "value": [
    {
      "id": "1",
      "roles": ["write"],
      "link": {
        "webUrl": "https://onedrive.live.com/redir?resid=5D33DD65C6932946!70859&authkey=!AL7N1QAfSWcjNU8&ithint=folder%2cgif",
        "type": "oneDriveLink"
      }
    },
    {
      "id": "2",
      "roles": ["write"],
      "grantedTo": {
        "user": {
          "id": "5D33DD65C6932946",
          "displayName": "John Doe"
        }
      },
      "invitation": {
        "email": "jd@outlook.com",
        "signInRequired": true,
        "redeemedBy": "same"
      },
      "inheritedFrom": {
        "driveId": "1234567890ABD",
        "id": "1234567890ABC!123",
        "path": "/drive/root:/Documents" }
    },
    {
      "id": "3",
      "roles": ["write"],
      "link": {
        "webUrl": "https://onedrive.live.com/redir?resid=5D33DD65C6932946!70859&authkey=!AL7N1QAfSWcjNU8&ithint=folder%2cgif",
        "type": "application",
        "application": {
          "id": "12345",
          "displayName": "TimeTravelPlus"
        }
      }
    }
  ]
}
```

**Note:** Response objects are truncated for clarity. All default properties
will be returned from the actual call.


##### Error Responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.

[error-response]: ../misc/errors.md
