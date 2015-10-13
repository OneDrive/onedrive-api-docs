# Sending a Sharing Invitation

The `invite` action is used to send a sharing invitation to an existing Item. A
sharing invitation creates a unique sharing link and sends an email to the
recipient of the invitation that includes the sharing link.

Using the invite action is more secure than creating a sharing link, because
the link is only valid for the recipient of the sharing invitation and cannot
be reused by other users.

##### HTTP Request

```
POST /drive/items/{item-id}/action.invite
POST /drive/root:/{item-path}:/action.invite
```

##### Request Body
The body of the request defines the details of the sharing invitation that will
be generated. The request body should be a JSON object with the following
properties:

<!-- {"blockType": "resource", "@odata.type": "oneDrive.sendInviteRequest"} -->
```json
{
  "requireSignIn": false,
  "suppressNotification": false,
  "type": "mail",
  "roles": ["read|write"],
  "recipients": ["joe@example.com", "ryan@example.com"],
  "message": "Here's the document we're collaborating on!"
}
```

| Name                   | Type         | Description                                                                                                |
|:-----------------------|:-------------|:-----------------------------------------------------------------------------------------------------------|
| `requiresSignIn`       | boolean      | Specifies where the recipient of the invitation is required to sign-in to view the shared Item.            |
| `suppressNotification` | boolean      | Specifies if an email or post is generated (false) or if the permission is just created (true).            |
| `type`                 | string       | Specify the type of sharing invitation link to create. Must be set to `mail`.                              |
| `roles`                | string array | Specify the roles that are be granted to the recipients of the sharing invitation.                         |
| `recipients`           | string array | A list of recipient email addresses for the sharing invitation.                                            |
| `message`              | string       | A plain text formatted message that is included in the sharing invitation. Maximum length 2000 characters. |


##### HTTP Request

<!-- { "blockType": "request", "name":"send-sharing-invite", "@odata.type": "oneDrive.sharingInviteRequest" } -->
```http
POST /drive/items/{item-id}/action.invite
Content-Type: application/json

{
  "requireSignIn": false,
  "suppressNotification": false,
  "type": "mail",
  "roles": ["write"],
  "recipients": ["joe@example.org"],
  "message": "Here's the document I was talking about yesterday."
}
```

##### HTTP Response

If successful, this method returns a collection of [Permission](../facets/permission_facet.md)
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
      "invitation": { }
    },
    {
      "id": "501",
      "roles": ["write"],
      "link": { },
      "invitation": { }
    }
  ]
}
```

>> What happens if permissions work for some, but fail for others. What is the
>> outcome (do we do permissions atomically) and if the outcome can be a mix of
>> success and failure, how do we represent that?

##### Error Responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.

[error-response]: ../misc/errors.md
