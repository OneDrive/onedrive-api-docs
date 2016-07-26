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
  are only returned for callers that are able to create the Permission.


## HTTP request

<!-- {"blockType": "ignored" } -->
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

<!-- { "blockType": "request", "name": "get-item-permissions", "scopes": "files.read" } -->
```
GET /drive/items/{item-id}/permissions
```

### Response

If successful, this method returns a collection of
[Permission](../resources/permission.md) resources for the item. Each Permission
resource represents an effective permission on the item.

Effective permissions of an item can come from two sources: permissions
set directly on the item itself or permissions that are inherited from the item's ancestors.

Callers can differentiate if the permission is inherited or not by checking the
`inheritedFrom` property. This property is an
[ItemReference](../resources/itemReference.md) resource referencing the ancestor that
the permission is inherited from.

SharePoint permission levels set on an item are returned with an 'SP' prefix. For example, SP.View Only, SP.Limited Access, SP.View Web Analytics Data. See [Full list of SharePoint roles](https://technet.microsoft.com/en-us/library/cc721640.aspx#section1).

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
        "type": "edit",
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

## Retrieve individual permissions

In addition to enumerating all permissions on an item, if you know the
permission-id for a particular set of permissions, you can retrieve the details
by performing a GET on the permissions collection.

### Example

<!-- { "blockType": "request", "name": "get-single-permission", "scopes": "files.read service.onedrive" } -->
```http
GET /drive/items/{item-id}/permissions/{permission-id}
```

##### HTTP Response

If the permission exists, the response is a [Permission resource](../resources/permission.md)
with the details for the particular permission requested.

<!-- { "blockType": "response", "@odata.type": "oneDrive.permission", "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "3",
  "roles": ["write"],
  "link": {
    "webUrl": "https://onedrive.live.com/redir?resid=5D33DD65C6932946!70859&authkey=!AL7N1QAfSWcjNU8&ithint=folder%2cgif",
    "type": "edit",
    "application": {
      "id": "12345",
      "displayName": "TimeTravelPlus"
    }
  }
}
```

##### Error responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.

[error-response]: ../misc/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "List an item's permissions",
  "keywords": "permission, permissions, sharing",
  "section": "documentation",
  "tocPath": "Sharing/Permissions"
} -->
