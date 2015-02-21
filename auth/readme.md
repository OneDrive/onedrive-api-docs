# Authentication for the OneDrive API

The OneDrive API uses standard [OAuth 2.0][oauth] authentication scheme to authenticate
users and generate access tokens.

### Microsoft account
OneDrive uses Microsoft accounts to authenticate users.

| Method                   | Description                |
|:-------------------------|:---------------------------|
| [sign-in](msa_oauth.md)  | Sign in to OneDrive.       |
| [refresh](msa_oauth.md)  | Refresh your access token. |
| [sign-out](msa_oauth.md) | Sign out of OneDrive.      |

[oauth]: http://tools.ietf.org/html/draft-ietf-oauth-v2-22
