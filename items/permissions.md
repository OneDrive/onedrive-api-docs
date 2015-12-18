# Reading permissions on an Item
List the effective permissions of an item.

Permissions cannot be expanded on lists of items or a single item. You must
access the permissions property directly.

## Access to Permissions

The permissions collection includes potentially sensitive information and may not
be available for every caller.

* For the owner of the item, all permissions will be returned. This includes
  co-owners.
* For a non-owner caller, only the permissions that apply to the caller are
  returned.
* Permission properties that contain secrets (e.g. `shareId` and `webUrl`)
  are only returned for callers that are able to create the Permission:

## HTTP request

```
GET /drive/items/{item-id}/permissions
GET /drive/root:/{path}:/permissions
```

#### Optional query parameters
| Name     | Value    | Description                                                                   |
|:---------|:---------|:------------------------------------------------------------------------------|
| `select` | `string` | List of properties to be included for each item in the response. |

#### Optional request headers
| Name     | Value  | Description                 |
|:----------------|:-------|:----------|
| `if-none-match` | `etag` | If this request header is included and the etag provided matches the current etag on the item, an `HTTP 304` Not Modified response is returned |


### Request body
Do not supply a request body with this method.

### Example

<!-- { "blockType": "request", "name": "get-item-permissions" } -->
```
GET /drive/items/{item-id}/permissions
```

### Response

If successful, this method returns a collection of
[Permission](../facets/permission_facet.md) resources for the item. Each Permission
resource represents an effective permission on the item.

Effective permissions of an item can come from two sources: permissions
set directly on the item itself or permissions that are inherited from the item's ancestors.

Callers can differentiate if the permission is inherited or not by checking the
`inheritedFrom` property. This property is an
[ItemReference](../resources/itemReference.md) resource referencing the ancestor that
the permission is inherited from.

<!-- {"blockType": "response", "@odata.type": "oneDrive.permission", "isCollection": true, "truncated": true} -->
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
        "type": "edit"
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


##### Error responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.

[error-response]: ../misc/errors.md
