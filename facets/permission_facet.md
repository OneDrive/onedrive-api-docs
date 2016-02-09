# Permission object
Represents a permission on a OneDrive item.

Permissions in OneDrive have a number of different forms. The **Permission**
object represents these different forms through facets on the **Permission** object.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.permission", "optionalProperties": ["link", "grantedTo", "invitation", "inheritedFrom" ] } -->
```json
{
  "id": "string",
  "roles": ["read|write"],
  "link": { "@odata.type": "oneDrive.sharingLink" },
  "grantedTo": { "@odata.type": "oneDrive.identitySet" },
  "inheritedFrom": { "@odata.type": "oneDrive.itemReference" },
  "shareId": "string"
}
```

## Properties

| Property name     | Type                                             | Description                                                                                                        |
|:------------------|:-------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------|
| **id**            | string                                           | **Read Only** The unique identifier of the permission among all permissions on the item.                           |
| **role**          | Array of strings                                 | The type of permission, e.g. `read`. See below for the full list of roles.                                         |
| **link**          | [SharingLink](sharinglink_facet.md)              | **Read Only** Provides the link details of the current permission, if it is a link type permissions.               |
| **grantedTo**     | [`IdentitySet`](../resources/identity.md)        | **Read Only** For user type permissions, the details of the users & applications for this permission.              |
| **inheritedFrom** | [`ItemReference`](../resources/itemReference.md) | **Read Only** Provides a reference to the ancestor of the current permission, if it is inherited from an ancestor. |
| **shareId**       | string                                           | **Read Only** A unique token that can be used to access this shared item via the **shares** entity set.            |

## Roles enumeration

| Role    | Details                                                                        |
|:--------|:-------------------------------------------------------------------------------|
| `read`  | Provides the ability to read the metadata and contents of the item.            |
| `write` | Provides the ability to read and modify the metadata and contents of the item. |


## Sharing links
The most common type of permissions in OneDrive are sharing links.
Sharing links provide a unique URL that includes both the resource being shared
and an authentication token that provides access to the resource. Users don't
need to sign-in to access the content shared with a sharing link. Users can share a link that gives read-only access to the content, or writable access to the content.

### View Link
A view link provides read-only access to an item.

<!-- {"blockType": "example", "@odata.type": "oneDrive.permission", "name": "permission-view-link" } -->
```json
{
  "id": "1",
  "roles": ["read"],
  "link": {
    "type": "view",
    "webUrl": "https://onedrive.live.com/redir?resid=5D33DD65C6932946!70859&authkey=!AL7N1QAfSWcjNU8&ithint=folder%2cgif",
    "application": { "id": "1234", "displayName": "Sample Application" }
  },
  "shareId": "!LKj1lkdlals90j1nlkascl"
}
```

### Edit link
An edit link provides read and write access to an item.

<!-- {"blockType": "example", "@odata.type": "oneDrive.permission", "name": "permission-edit-link" } -->
```json
{
  "id": "2",
  "roles": ["write"],
  "link": {
    "type": "edit",
    "webUrl": "https://onedrive.live.com/redir?resid=5D33DD65C6932946!70859&authkey=!AL7N1QAfSWcjNU8&ithint=folder%2cgif",
    "application": { "id": "1234", "displayName": "Sample Application" }
  },
  "shareId": "!LKj1lkdlals90j1nlkascl"
}
```

<!-- {
  "type": "#page.annotation",
  "description": "The permission object provides information about permissions and roles and sharing information.",
  "keywords": "sharing,permissions,read,write,acl",
  "section": "documentation"
} -->
