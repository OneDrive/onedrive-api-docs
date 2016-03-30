# Sending a Sharing Invitation (Preview)

The invite action is used to add additional permissions to an existing item
and optionally notify the recipient of those permissions they have access to
the item via email.

Using the invite action is more secure than [creating a sharing link](sharing_createLink.md),
because the permissions are only valid for the recipient and cannot be used by others.

**Note:** This functionality is a preview and should only be used for evaluating
and testing. Some details of this API are expected to be changed before this
functionality is finally released.

##### HTTP Request

<!-- { "blockType": "ignored" } -->
```
POST /drive/items/{item-id}/action.invite
POST /drive/root:/{item-path}:/action.invite
```

##### Request Body
The body of the request defines the details of the sharing invitation that will
be generated. The request body should be a JSON object with the following
properties:

<!-- { "blockType": "resource", "@odata.type": "oneDrive.inviteParameters", "scopes": "files.readwrite" } -->
```json
{
  "requireSignIn": false,
  "sendInvitation": false,
  "roles": [ "read | write"],
  "recipients": [
    { "@odata.type": "oneDrive.recipients" },
    { "@odata.type": "oneDrive.recipients" }
  ],
  "message": "string"
}
```

| Name               | Type         | Description                                                                                                |
|:-------------------|:-------------|:-----------------------------------------------------------------------------------------------------------|
| **requiresSignIn** | boolean      | If `true`, the recipient of the invitation is required to sign-in to view the shared item.            |
| **sendInvitation** | boolean      | If `true`, an email is generated and sent to the recipients specified. If `false` then the permissions are applied but the invitation email is not sent.            |
| **roles**          | string array | A collection of the roles to be granted to the recipients.                         |
| **recipients**     | string array | A collection recipient objects that will be invited. |
| **message**        | string       | A plain text formatted message that is included in the sharing invitation. Maximum length 2000 characters. Optional. |

##### HTTP Request

<!-- { "blockType": "request", "name": "send-sharing-invite", "@odata.type": "oneDrive.inviteParameters", "scopes": "files.readwrite" } -->
```http
POST /drive/items/{item-id}/action.invite
Content-Type: application/json

{
  "requireSignIn": false,
  "sendInvitation": false,
  "roles": ["write"],
  "recipients": [
    { "email": "johndoe@contoso.com" },
    { "email": "accounts_team@contoso.com" }
  ],
  "message": "Here's the document I was talking about yesterday."
}
```

##### HTTP Response

If successful, this method returns a collection of [Permission](../resources/permission.md)
resources for each permission created or modified as a result of the call.

<!-- { "blockType": "response", "@odata.type": "oneDrive.permission", "isCollection": true, "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "value":
  [
    {
      "id": "500",
      "roles": ["write"],
      "link": { },
      "invitation": { "email": "johndoe@contoso.com" }
    },
    {
      "id": "501",
      "roles": ["write"],
      "link": { },
      "invitation": { "email": "accounts_team@contoso.com" }
    }
  ]
}
```

##### Error Responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.

## Remarks

When sharing a container item using **action.invite** the added permissions are
inherited to child items.

## Known issues

* Email invitations will not be sent when using invite from OneDrive Personal.

[error-response]: ../misc/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "Add permissions to an item and optionally send a sharing notification.",
  "keywords": "retrieve,item,metadata",
  "section": "documentation",
  "tocPath": "Sharing/Add Permissions"
} -->
