# Authentication for the OneDrive API

The OneDrive API uses standard [OAuth 2.0][oauth] authentication scheme to authenticate
users and generate access tokens.

## OneDrive Personal

OneDrive uses [Microsoft accounts](https://account.live.com/developers/applications/) to authenticate users and applications.

| Method                                                                 | Description                                          |
|:-----------------------------------------------------------------------|:-----------------------------------------------------|
| [Sign in](msa_oauth.md)                                                | Sign in to Microsoft account and OneDrive personal.  |
| [Refresh](msa_oauth.md#step-3-get-a-new-access-token-or-refresh-token) | Refresh your access token.                           |
| [Sign out](msa_oauth.md#sign-the-user-out)                             | Sign out of Microsoft account and OneDrive personal. |

## OneDrive For Business

OneDrive for Business uses [Azure Active Directory](https://manage.windowsazure.com/) to authenticate users and applications.

| Method                         | Description                                          |
|:-------------------------------|:-----------------------------------------------------|
| [Sign in](aad_oauth.md)        | Sign in to an AAD account and OneDrive for Business. |
| [Discover Endpoint][discovery] | Discover the OneDrive for Business URL for a user.   |
| [Refresh][aad-refresh]         | Refresh your access token.                           |


[oauth]: http://tools.ietf.org/html/draft-ietf-oauth-v2-22
[discovery]: aad_oauth.md#step-3-discover-the-onedrive-for-business-resource-uri
[aad-refresh]: aad_oauth.md#step-4-redeem-refresh-token-for-an-access-token-to-call-onedrive-api

<!-- {
  "type": "#page.annotation",
  "description": "OneDrive uses the standard OAuth 2.0 authentication scheme for users and apps",
  "keywords": "authentication,sign in, sign out, logout, login, oauth, msa",
  "section": "documentation",
  "tocPath": "Getting Started/Authentication"
} -->
