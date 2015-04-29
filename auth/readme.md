# Authentication for the OneDrive API

The OneDrive API uses standard [OAuth 2.0][oauth] authentication scheme to authenticate
users and generate access tokens.

## OneDrive Personal

OneDrive uses [Microsoft accounts](https://account.live.com/developers/applications/) to authenticate users and applications.

| Method                                                                  | Description                                          |
|:------------------------------------------------------------------------|:-----------------------------------------------------|
| [Sign in](msa_oauth.md)                                                 | Sign in to Microsoft account and OneDrive personal.  |
| [Refresh](msa_oauth.md#step-3.-get-a-new-access-token-or-refresh-token) | Refresh your access token.                           |
| [Sign out](msa_oauth.md#sign-the-user-out)                              | Sign out of Microsoft account and OneDrive personal. |

## OneDrive For Business (preview)

OneDrive for Business uses [Azure Active Directory](https://manage.windowsazure.com/) to authenticate users and applications.

| Method                                                                  | Description                                       |
|:------------------------------------------------------------------------|:--------------------------------------------------|
| [Sign in](aad_oauth.md)                                                 | Sign in to an AAD account and OneDrive for Business. |
| [Refresh](aad_oauth.md#step-3.-get-a-new-access-token-or-refresh-token) | Refresh your access token.                        |
| [Discover Endpoint][discovery]                                          | Discover the OneDrive for Business URL for a user. |

[oauth]: http://tools.ietf.org/html/draft-ietf-oauth-v2-22
[discovery]: https://msdn.microsoft.com/en-us/office/office365/api/discovery-service-rest-operations

<!-- {
  "type": "#page.annotation",
  "description": "OneDrive uses the standard OAuth 2.0 authentication scheme for users and apps",
  "keywords": "authentication,sign in, sign out, logout, login, oauth, msa",
  "section": "documentation",
  "tocPath": "Concepts/Auth"
} -->
