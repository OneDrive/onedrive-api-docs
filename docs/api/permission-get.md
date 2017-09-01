# Retrieve a single permssion for a drive item.
List the effective permissions of an item.

Permissions cannot be expanded on lists of items or a single item. You must
access the permissions property directly.

## Access to Permissions

The permissions collection includes potentially sensitive information and may not
be available for every caller.

* For the owner of the item, all permissions will be returned. This includes co-owners.
* For a non-owner caller, only the permissions that apply to the caller are returned.
* Permission properties that contain secrets (e.g. `shareId` and `webUrl`)
  are only returned for callers that are able to create the Permission.


## HTTP request

<!-- {"blockType": "ignored" } -->
```
GET /drive/items/{item-id}/permissions/{permission-id}
GET /drive/root:/{path}:/permissions/{permission-id}
```

### Request body

Do not supply a request body with this method.

### Example

<!-- { "blockType": "request", "name": "get-item-permission", "scopes": "files.read" } -->
```
GET /drive/items/{item-id}/permissions/{permission-id}
```

### Response

If successful, this method returns a [Permission](../resources/permission.md) resource for the specified ID. 

Effective permissions of an item can come from two sources: permissions
set directly on the item itself or permissions that are inherited from the item's ancestors.

Callers can differentiate if the permission is inherited or not by checking the
`inheritedFrom` property. This property is an
[ItemReference](../resources/itemReference.md) resource referencing the ancestor that
the permission is inherited from.

SharePoint permission levels set on an item are returned with an 'SP' prefix. For example, SP.View Only, SP.Limited Access, SP.View Web Analytics Data. See [Full list of SharePoint roles](https://technet.microsoft.com/en-us/library/cc721640.aspx#section1).

<!-- {"blockType": "response", "@odata.type": "oneDrive.permission", "truncated": true} -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": "1",
    "roles": ["write"],
    "link": {
    "webUrl": "https://onedrive.live.com/redir?resid=5D33DD65C6932946!70859&authkey=!AL7N1QAfSWcjNU8&ithint=folder%2cgif",
    "type": "edit"
    }
}
```

**Note:** Response objects are truncated for clarity. All default properties
will be returned from the actual call.


##### Error responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.

[error-response]: ../concepts/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "List an item's permissions",
  "keywords": "permission, permissions, sharing",
  "section": "documentation",
  "tocPath": "Sharing/Permissions"
} -->
