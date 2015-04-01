# Authentication for the OneDrive API

The OneDrive API uses standard [OAuth 2.0][oauth] authentication scheme to authenticate
users and generate access tokens.

### Microsoft account
OneDrive uses Microsoft accounts to authenticate users.

| Method                                                                  | Description                |
|:------------------------------------------------------------------------|:---------------------------|
| [sign-in](msa_oauth.md)                                                 | Sign in to OneDrive.       |
| [refresh](msa_oauth.md#step-3.-get-a-new-access-token-or-refresh-token) | Refresh your access token. |
| [sign-out](msa_oauth.md#sign-the-user-out)                              | Sign out of OneDrive.      |

[oauth]: http://tools.ietf.org/html/draft-ietf-oauth-v2-22

<!-- {
  "type": "#page.annotation",
  "description": "OneDrive uses the standard OAuth 2.0 authentication scheme for users and apps",
  "keywords": "authentication,sign in, sign out, logout, login, oauth, msa",
  "section": "documentation",
  "tocPath": "Concepts/Auth"
} -->
