# SharingInvitation
Represents information about a sharing invitation for a set of permissions.
This object is read-only.

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.invitation" } -->
```json
{
  "email": "string",
  "signInRequired": false,
  "redeemedBy": "string"
}
```

## Properties

| Property Name    | Type      | Description                                                                                   |
|:-----------------|:----------|:----------------------------------------------------------------------------------------------|
| `email`          | `string`  | The email address the invitation was sent to                                                  |
| `signInRequired` | `boolean` | If `true` the recipient of the invitation needs to sign in in order to access the shared item |
| `redeemedBy`     | `string`  | Indicates the redemption status of the invitation. See possible values below.                 |


### RedeemedBy Values
| Value   | Description                                                                                                        |
|:--------|:-------------------------------------------------------------------------------------------------------------------|
| `none`  | The sharing invitation has not been redeemed or accepted.                                                          |
| `same`  | The sharing invitation was redeemed by a Microsoft Account matching the email address of the recipient.            |
| `other` | The sharing invitation was redeemed by a Microsoft Account that does not match the email address of the recipient. |
