---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Permission - OneDrive API
localization_priority: Priority
---
# Permission resource type

The **Permission** resource provides information about a sharing permission granted for a [DriveItem](driveitem.md) resource.

Sharing permissions have a number of different forms.
The **Permission** resource represents these different forms through facets on the resource.

## JSON representation

Here is a JSON representation of the resource

<!--{
  "blockType": "resource",
  "optionalProperties": [
    "link",
    "grantedTo",
    "grantedToIdentities",
    "invitation",
    "inheritedFrom",
    "shareId"
  ],
  "keyProperty": "id",
  "baseType": "microsoft.graph.entity",
  "@odata.type": "microsoft.graph.permission"
}-->

```json
{
  "id": "string (identifier)",
  "grantedTo": {"@odata.type": "microsoft.graph.identitySet"},
  "grantedToIdentities": [{"@odata.type": "microsoft.graph.identitySet"}],
  "inheritedFrom": {"@odata.type": "microsoft.graph.itemReference"},
  "invitation": {"@odata.type": "microsoft.graph.sharingInvitation"},
  "link": {"@odata.type": "microsoft.graph.sharingLink"},
  "roles": ["string"],
  "shareId": "string"
}
```

## Properties

| Property            | Type                        | Description
|:--------------------|:----------------------------|:-------------------------
| id                  | String                      | The unique identifier of the permission among all permissions on the item. Read-only.
| grantedTo           | [IdentitySet][]             | For user type permissions, the details of the users & applications for this permission. Read-only.
| grantedToIdentities | Collection([IdentitySet][]) | For link type permissions, the details of the users to whom permission was granted. Read-only.
| invitation          | [SharingInvitation][]       | Details of any associated sharing invitation for this permission. Read-only.
| inheritedFrom       | [ItemReference][]           | Provides a reference to the ancestor of the current permission, if it is inherited from an ancestor. Read-only.
| link                | [SharingLink][]             | Provides the link details of the current permission, if it is a link type permissions. Read-only.
| roles               | Collection(String)          | The type of permission, e.g. `read`. See below for the full list of roles. Read-only.
| shareId             | String                      | A unique token that can be used to access this shared item via the **[shares API][]**. Read-only.

## Roles enumeration

| Role        | Details                                                                        |
|:------------|:-------------------------------------------------------------------------------|
| `read`      | Provides the ability to read the metadata and contents of the item.            |
| `write`     | Provides the ability to read and modify the metadata and contents of the item. |
| `sp.owner`  | For SharePoint and OneDrive for Business this represents the owner role.       |
| `sp.member` | For SharePoint and OneDrive for Business this represents the member role.      |

The permission resource uses _facets_ to provide information about the kind of permission represented by the resource.

Sharing links contain a unique token required to access the item.

Permissions with an [**invitation**][SharingInvitation] facet represent permissions added by inviting specific users or groups to have access to the file.

## Sharing links

Permissions with a [**link**][SharingLink] facet represent sharing links created on the item.
These are the most common kinds of permissions.
Sharing links provide a unique URL that can be used to access a file or folder.
They can be set up to grant access in a variety of ways.
For example, you can use the [createLink][] API to create a link that works for anyone signed into your organization, or you can create a link that works for anyone, without needing to sign in.
You can use the [invite][] API to create a link that only works for specific people, whether they're in your company or not.

Here are some examples of sharing links.

### View Link

This view link provides read-only access to anyone with the link.

<!-- {"blockType": "example", "@odata.type": "microsoft.graph.permission", "name": "permission-view-link" } -->

```json
{
  "id": "1",
  "roles": ["read"],
  "link": {
    "scope": "anonymous",
    "type": "view",
    "webUrl": "https://onedrive.live.com/redir?resid=5D33DD65C6932946!70859&authkey=!AL7N1QAfSWcjNU8&ithint=folder%2cgif",
    "application": { "id": "1234", "displayName": "Sample Application" }
  },
  "shareId": "!LKj1lkdlals90j1nlkascl"
}
```

### Edit link

This edit link provides read and write access to anyone in the organization with the link.

<!-- {"blockType": "example", "@odata.type": "microsoft.graph.permission", "name": "permission-edit-link" } -->

```json
{
  "id": "2ceefb3g32hh",
  "roles": ["write"],
  "link": {
    "scope": "organization",
    "type": "edit",
    "webUrl": "https://contoso.sharepoint.com/:w:/t/design/fj277ghautbb422707565gnvg23",
    "application": { "id": "1234", "displayName": "Sample Application" }
  },
  "shareId": "!LKj1lkdlals90j1nlkascl"
}
```

### Specific people link

This link provides read and write access to the specific people in the `grantedToIdentities` collection.

<!-- {"blockType": "example", "@odata.type": "microsoft.graph.permission", "name": "permission-people-link" } -->

```json
{
  "id": "3",
  "grantedToIdentities": [
    {
       "user": {
        "id": "35fij1974gb8832",
        "displayName": "Misty Suarez"
      }
    },
    {
       "user": {
        "id": "9397721fh4hgh73",
        "displayName": "Judith Clemons"
      }
    }
  ],
  "roles": ["write"],
  "link": {
    "webUrl": "https://contoso.sharepoint.com/:w:/t/design/a577ghg9hgh737613bmbjf839026561fmzhsr85ng9f3hjck2t5s",
    "application": { "id": "1234", "displayName": "Sample Application" }
  },
  "shareId": "!LKj1lkdlals90j1nlkascl"
}
```

## Sharing Invitations

Permissions sent by the [invite][] API may have additional information in the [invitation][SharingInvitation] facet.
If an invitation was sent to an email address that doesn't match a known account, the **grantedTo** property may not be set until the invitation is redeemed, which occurs the first time the user clicks the link and signs in.

<!-- {"blockType": "example", "@odata.type": "microsoft.graph.permission", "name": "permission-invite-email" } -->

```json
{
  "id": "1",
  "roles": ["write"],
  "invitation": {
    "email": "jd@fabrikam.com",
    "signInRequired": true
  },
  "shareId": "FWxc1lasfdbEAGM5fI7B67aB5ZMPDMmQ11U"
}
```

After the sharing invitation has been redeemed by a user, the **grantedTo** property will contain the information about the account that redeemed the permissions:

<!-- {"blockType": "example", "@odata.type": "microsoft.graph.permission", "name": "permission-invite-redeemed" } -->

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
    "email": "jd@fabrikam.com",
    "signInRequired": true
  },
  "shareId": "FWxc1lasfdbEAGM5fI7B67aB5ZMPDMmQ11U"
}
```

## Methods

| Method                                                   | REST Path
|:---------------------------------------------------------|:-----------------------
| [List permissions](../api/driveitem_list_permissions.md) | `GET /drive/items/{item-id}/permissions`
| [Get permission](../api/permission_get.md)               | `GET /drive/items/{item-id}/permissions/{id}`
| [Create link][createLink]                                | `POST /drive/items/{item-id}/createLink`
| [Invite people][invite]                                  | `POST /drive/items/{item-id}/invite`
| [Update](../api/permission_update.md)                    | `PATCH /drive/items/{item-id}/permissions/{id}`
| [Delete](../api/permission_delete.md)                    | `DELETE /drive/items/{item-id}/permissions/{id}`


## Remarks

OneDrive for Business and SharePoint document libraries do not return the **inheritedFrom** property.

[createLink]: ../api/driveItem_createLink.md
[IdentitySet]: identityset.md
[invite]: ../api/driveItem_invite.md
[ItemReference]: itemreference.md
[shares API]: ../api/shares_get.md
[SharingInvitation]: sharinginvitation.md
[SharingLink]: sharinglink.md

<!-- uuid: 8fcb5dbc-d5aa-4681-8e31-b001d5168d79
2015-10-25 14:57:30 UTC -->
<!-- {
  "type": "#page.annotation",
  "description": "The permission object provides information about permissions and roles and sharing information.",
  "keywords": "sharing,permissions,read,write,acl",
  "section": "documentation",
  "tocPath": "Resources/Permission"
} -->
