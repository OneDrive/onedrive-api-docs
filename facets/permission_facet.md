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
  "invitation": { "@odata.type": "oneDrive.invitation"},
  "inheritedFrom": { "@odata.type": "oneDrive.itemReference" }
}
```

## Properties

| Property name     | Type                                             | Description                                                                                                        |
|:------------------|:-------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------|
| **id**            | string                                           | **Read Only** The unique identifier of the permission among all permissions on the item.                           |
| **role**          | Array of strings                                 | The type of permission, e.g. `read`. See below for the full list of roles.                                         |
| **link**          | [SharingLink](sharinglink_facet.md)              | **Read Only** Provides the link details of the current permission, if it is a link type permissions.               |
| **grantedTo**     | [`IdentitySet`](../resources/identity.md)        | **Read Only** For user type permissions, the details of the users & applications for this permission.              |
| **invitation**    | [`SharingInvitation`](invitation_facet.md)       | **Read Only** Details of any associated sharing invitation for this permission.                                    |
| **inheritedFrom** | [`ItemReference`](../resources/itemReference.md) | **Read Only** Provides a reference to the ancestor of the current permission, if it is inherited from an ancestor. |

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
  }
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
    "type": "write",
    "webUrl": "https://onedrive.live.com/redir?resid=5D33DD65C6932946!70859&authkey=!AL7N1QAfSWcjNU8&ithint=folder%2cgif",
    "application": { "id": "1234", "displayName": "Sample Application" }
  }
}
```

### Sharing Invitation
In addition to creating sharing links, a user can be invited by e-mail address.
In this scenario the permission creates an invitation that is sent to the user's
email.

#### Invitation Sent to Microsoft Account
In some cases, the sharing invitation may be sent to an email address that represents
a valid Microsoft Account. In these cases, the `grantedTo` property will be
set to information about the user account.

<!-- {"blockType": "example", "@odata.type": "oneDrive.permission", "name": "permission-invite-msa" } -->
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
    "signInRequired": true,
    "redeemedBy": "none"
  }
}
```

#### Invitation Send to Email Address
In other cases, the recipient of the sharing message may not be a Microsoft
Account. When this happens, the `grantedTo` property is not set until the
invitation is redeemed by the user who receieves the email invitation.

<!-- {"blockType": "example", "@odata.type": "oneDrive.permission", "name": "permission-invite-email" } -->
```json
{
  "id": "1",
  "roles": ["write"],
  "invitation": {
    "email": "jd@gmail.com",
    "signInRequired": true,
    "redeemedBy": "none"
  }
}
```

#### Sharing Invite Redeemed By Same Microsoft Account
Later, when an invitation is redeemed by the recipient using a Microsoft Account
that matches the original email address for the recipient, the permission object
is updated to show the `grantedTo` property for the user who redeemed the
invitation.

<!-- {"blockType": "example", "@odata.type": "oneDrive.permission", "name": "permission-redeem-same" } -->
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
    "signInRequired": true,
    "redeemedBy": "same"
  }
}
```

#### Sharing Invitation Redeemed By Different Microsoft Account
If the sharing invitation is redeemed by a Microsoft Account that doesn't match
the email address the invitation was sent to, the `grantedTo` property is set
to the user who redeemed the invitation and the `redeemedBy` property is set to
`other` to indicate a different user accepted the invitation.

<!-- {"blockType": "example", "@odata.type": "oneDrive.permission", "name": "permission-redeem-different" } -->
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
    "email": "jd@gmail.com",
    "signInRequired": true,
    "redeemedBy": "other"
  }
}
```

<!-- {
  "type": "#page.annotation",
  "description": "The permission object provides information about permissions and roles and sharing information.",
  "keywords": "sharing,permissions,read,write,acl",
  "section": "documentation"
} -->
