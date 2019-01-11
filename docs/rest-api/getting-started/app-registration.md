---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: conceptual
title: Create an app with Microsoft Graph - OneDrive API
localization_priority: Priority
---
# Registering your app for Microsoft Graph

To use the OneDrive from the Microsoft Graph, you need to first register your app and receive an Application ID to represent your application in API calls.

For most applications, we recommend using the Microsoft Application Registration Portal.
However, for some enterprise-class applications, your app may need features that are only available via the Azure Active Directory management portal.
If you are unsure about which approach to use, see [Deciding between Azure AD and Azure AD v2.0 endpoints](https://graph.microsoft.io/en-us/docs/authorization/auth_overview#deciding-between-the-azure-ad-and-azure-ad-v2.0-endpoints).

## Register your app with Microsoft

To connect with Microsoft Graph, you'll need a work/school account or a Microsoft account.

1. Go to the [Microsoft Application Registration Portal][1].
2. When prompted, sign in with your account credentials.
3. Find **My applications** and click **Add an app**.
4. Enter your app's name and click **Create application**.

[1]: https://apps.dev.microsoft.com/?referrer=https%3A%2F%2Fdev.onedrive.com

After you've completed these steps, an application ID is created for your app and displayed on your new app's properties page.

If your application is a confidential client (a service), you must create a new app password to secure your application.
For public client apps (native apps or JavaScript apps), you do not need to an app password.

**Important** Treat the value of any app password the same as you would a user's password.
The secret represents the key to your application and, if made available, can be used to impersonate your application.

Under the **Platforms** header, configure details about your app.
By default a new app is created as a **web** app and needs one or more redirect URIs.
To enable native client flows for your app as well, click the **Add Platform** button and choose **Mobile**.

Microsoft account uses scopes to determine which API your app can access, and these scopes are included in the OAuth flow when the user logs in.
For more information about how to authenticate a user with your app, see [OneDrive authentication and sign-in](msa-oauth.md).


## Keep going

Once you have your app registered, continue on to [learning how to authenticate a user and authorize your application](graph-oauth.md).


<!-- {
  "type": "#page.annotation",
  "description": "How to register your app to work with OneDrive or OneDrive for Business and the OneDrive API.",
  "keywords": "authentication,oauth,msa,app registration,registration,azure active directory,aad,onedrive,api,onedrive for business",
  "section": "documentation",
  "tocPath": "Overview/App registration"
} -->
