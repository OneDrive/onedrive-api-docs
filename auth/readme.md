#Authentication for OneDrive API

The OneDrive API uses standard [OAuth 2.0][oauth] authentication scheme to authenticate
users and generate access tokens.

### Microsoft Account
OneDrive uses Microsoft Accounts to authenticate users.

Method | Description
--- | --- | ----
[sign-in](msa_oauth.md) | Sign in to OneDrive.
[refresh](msa_oauth.md) | Refresh your access token.
[sign-out](msa_oauth.md) | Sign out of OneDrive.

### Azure Active Directory
OneDrive for Business uses Azure Active Directory to authenticate users.
The details of the authentication model can be found at [this link][odbauth].


[//]: # (Define all the Links that this document will use)
[odbauth]: http://msdn.microsoft.com/EN-US/library/office/dn605895(v=office.15).aspx
[odbdiscovery]: http://msdn.microsoft.com/en-us/library/office/dn605895(v=office.15).aspx#sectionSection1
[odatav4minconformance]: http://docs.oasis-open.org/odata/odata/v4.0/os/part1-protocol/odata-v4.0-os-part1-protocol.html#_Toc372793759
[oauth]: http://tools.ietf.org/html/draft-ietf-oauth-v2-22
