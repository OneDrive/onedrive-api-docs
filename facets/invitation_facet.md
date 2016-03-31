# SharingInvitation Facet

Represents information about a sharing invitation for a set of permissions.
This object is read-only.

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.invitation" } -->
```json
{
  "email": "string",
  "signInRequired": false,
  "invitedBy": { "@odata.type": "oneDrive.identitySet" }
}
```

## Properties

| Property Name    | Type                | Description                                                                                   |
|:-----------------|:--------------------|:------------------------------------------------------------------------------------------------------------------------------|
| `email`          | `string`            | The email address provided for the recipient of the sharing invitation. Read-only.                                            |
| `signInRequired` | `boolean`           | If `true` the recipient of the invitation needs to sign in in order to access the shared item. Read-only.                     |
| `invitedBy`      | `oneDrive.identity` | Provides information about who sent the invitation that created this permission, if that information is available. Read-only. |

<!-- {
  "type": "#page.annotation",
  "description": "The sharing invitation facet describes details of a sharing invitation associated with a permission.",
  "keywords": "image,width,height,item,facet",
  "section": "documentation",
  "tocPath": "Facets/Sharing invitation"
} -->
