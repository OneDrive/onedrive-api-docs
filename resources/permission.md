# Permission resource

Represents a single permission on an item.

Permissions have a number of different forms. The **permission**
resource represents these different forms through facets on the
**permission** resource.

## JSON representation

<!-- {
"blockType": "resource",
"@odata.type": "oneDrive.permission",
"optionalProperties": ["link", "grantedTo", "invitation", "inheritedFrom", "shareId" ],
"keyProperty": "id" } -->
```json
{
  "id": "string",
  "roles": ["read|write"],
  "link": { "@odata.type": "oneDrive.sharingLink" },
  "grantedTo": { "@odata.type": "oneDrive.identitySet" },
  "inheritedFrom": { "@odata.type": "oneDrive.itemReference" },
  "invitation": { "@odata.type": "oneDrive.invitation" },
  "shareId": "string"
}
```

## Properties

| Property name     | Type                                               | Description                                                                                                                    |
|:------------------|:---------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------|
| **id**            | string                                             | The unique identifier of the permission among all permissions on the item. Read-only.                                       |
| **role**          | Collection(String)                                 | The type of permission, e.g. `read`. See below for the full list of roles.                                                     |
| **link**          | [SharingLink](../facets/sharinglink_facet.md)      | Provides the link details of the current permission, if it is a link type permissions. Read-only.                           |
| **grantedTo**     | [IdentitySet](identity.md)                         | For user type permissions, the details of the users & applications for this permission. Read-only.                          |
| **invitation**    | [SharingInvitation](../facets/invitation_facet.md) | Details of any associated sharing invitation for this permission. Read-only.                                                |
| **inheritedFrom** | [ItemReference](itemReference.md)                  | Provides a reference to the ancestor of the current permission, if it is inherited from an ancestor. Read-only.             |
| **shareId**       | string                                             | A unique token that can be used to access this shared item via the [**shares** entity set](../shares/shares.md). Read-only. |

## Roles enumeration

| Role        | Details                                                                        |
|:------------|:-------------------------------------------------------------------------------|
| `read`      | Provides the ability to read the metadata and contents of the item.            |
| `write`     | Provides the ability to read and modify the metadata and contents of the item. |
| `sp.owner`  | For SharePoint and OneDrive for Business this represents the owner role.       |
| `sp.member` | For SharePoint and OneDrive for Business this represents the member role.      |


## Sharing links
The most common type of permissions are sharing links.
Sharing links provide a unique URL that includes both the resource being shared
and an authentication token that provides access to the resource. Users don't
need to sign-in to access the content shared with a sharing link. Users can
share a link that gives read-only access to the content or writable access to
the content.

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

### Sharing Invitation
In addition to creating sharing links, a user can be invited by e-mail address.
In this scenario the permission creates an invitation that is sent to the user's
email.

#### Invitation to an email address
If the permission was sent via an email address to a recipient who does not have
a matching account, the **grantedTo** property may not be set until the
invitation is redeemed, which occurs the first time a user clicks the link and
signs in.

<!-- {"blockType": "example", "@odata.type": "oneDrive.permission", "name": "permission-invite-email" } -->
```json
{
  "id": "1",
  "roles": ["write"],
  "invitation": {
    "email": "jd@gmail.com",
    "signInRequired": true
  },
  "shareId": "FWxc1lasfdbEAGM5fI7B67aB5ZMPDMmQ11U"
}
```

After the sharing invitation has been redeemed by a user, the **grantedTo**
property will contain the information about the account that redeemed the permissions:

<!-- {"blockType": "example", "@odata.type": "oneDrive.permission", "name": "permission-invite-redeemed" } -->
```json
{
  "id": "1",
  "roles": ["write"],
  "grantedTo": {
    "user": {
      "id": "5D33DD65C6932946",
      "displayName": "John Doe"
    }
  },
  "invitation": {
    "email": "jd@outlook.com",
    "signInRequired": true
  },
  "shareId": "FWxc1lasfdbEAGM5fI7B67aB5ZMPDMmQ11U"
}
```


<!-- {
  "type": "#page.annotation",
  "description": "The permission object provides information about permissions and roles and sharing information.",
  "keywords": "sharing,permissions,read,write,acl",
  "section": "documentation",
  "tocPath": "Resources/Permission"
} -->
