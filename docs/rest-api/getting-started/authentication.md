---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: conceptual
title: Sign-in and authorization - OneDrive API
---
# Authorizing your app to access SharePoint

Before your app can make requests to SharePoint, it needs a user to authenticate and authorize the application to have access to their data.

## SharePoint Server 2019 and 2016 Feature Pack 2

The OneDrive API supports authentication mechanisms provided in SharePoint Server 2016 and 2019 including Microsoft Azure Access Control Service (ACS), Windows NT LAN Manager (NTLM) and Active Directory Federation Services (AD FS), for user and application authentication.
Hybrid customers also have the option to use AAD authentication.

### AAD authentication

Hybrid customers, or on-premises customers who have [integrated their on-premises identities with AAD](https://azure.microsoft.com/en-us/documentation/articles/active-directory-aadconnect/) can use the OneDrive API with the standard [OAuth 2.0][oauth] authentication scheme to authenticate users and generate access tokens. 

| Method                         | Description                                          |
|:-------------------------------|:-----------------------------------------------------|
| [Sign in](aad-oauth.md)        | Sign in to an AAD account and OneDrive for Business. |
| [Refresh][aad-refresh]         | Refresh your access token.                           |

[oauth]: http://tools.ietf.org/html/draft-ietf-oauth-v2-22
[aad-refresh]: aad-oauth.md#step-4-redeem-refresh-token-for-an-access-token-to-call-onedrive-api

### ACS authentication

SharePoint Server supports claims-based authentication.
The result of a claims-based authentication is a claims-based security token, which the SharePoint Security Token Service (STS) generates.
SharePoint Server supports Windows, forms-based, and Security Assertion Markup Language (SAML)-based claims authentication. 

To perform ACS app authentication, the application needs to obtain an access token from either the Microsoft Azure Access Control Service (ACS), or by self-signing an access token with a certificate that SharePoint Server trusts.
Then, the access token asserts a request for access to a specific SharePoint resource and contains information that identifies the app and the associated user, instead of validating only the user’s credentials. 

You can find more information about these three user authentication methods as well as ACS app authentication, in [Authentication Overview for SharePoint 2016](https://technet.microsoft.com/en-us/library/jj219571.aspx).

### AD FS authentication

The OneDrive API can also use AD FS authentication in SharePoint Server to authenticate users and applications.
AD FS in Windows Server 2016 (AD FS 2016) enables you to add industry standard OpenID Connect and OAuth 2.0 based authentication and authorization to your applications, and have those applications authenticate users directly against AD FS. 

You can add AD FS modern authentication to your application by using the same set of tools and libraries you already use to authenticate users against Azure AD.
In AD FS scenarios, it is AD FS and not Azure AD that serves as the identity provider and authorization server.
Otherwise the concepts are exactly the same: users provide their credentials and obtain tokens, either directly or via an intermediary, for access to resources.

Find more details about AD FS authentication in [ADFS Scenarios for Developers](https://technet.microsoft.com/en-us/library/mt728971.aspx).

<!-- {
  "type": "#page.annotation",
  "description": "OneDrive uses the standard OAuth 2.0 authentication scheme for users and apps",
  "keywords": "authentication,sign in, sign out, logout, login, oauth, msa",
  "section": "documentation",
  "tocPath": "Overview/Authentication"
} -->
