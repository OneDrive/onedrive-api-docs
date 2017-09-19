---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: conceptual
title: Create an app with SharePoint Server 2016 - OneDrive API
---
# Registering your app to use OneDrive API with SharePoint Server 2016

To use the OneDrive API with SharePoint Server 2016, you need to first register your app and receive a Client ID to represent your application in API calls.

To register you need an Office 365 subscription and an Azure subscription to get started.
You register your app with Azure Active Directory and then request permissions for SharePoint.

### 1. Get an Office 365 subscription

If you don't have one, you need to create an Office 365 Developer Site. This site represents your `{tenant}`. There are several ways to create one:

* [An MSDN subscription](https://msdn.microsoft.com/subscriptions/manage/default.aspx) -
  This is available to MSDN subscribers with Visual Studio Ultimate and Visual
  Studio Premium.
* [An existing Office 365 subscription](https://msdn.microsoft.com/library/2ec857d5-dc6f-4cf6-ba45-adc845ef2a25%28Office.15%29.aspx) -
  You can use an existing Office 365 subscription, which can be any of the
  following: Office 365 Midsize Business, Office 365 Enterprise,
  Office 365 Education, Office 365 Government.
* [Free trial](https://portal.microsoftonline.com/Signup/MainSignUp.aspx?OfferId=6881A1CB-F4EB-4db3-9F18-388898DAF510&DL=DEVELOPERPACK) -
  You can start with a free 30-day trial, or buy an Office 365 developer
  subscription.
* [Purchase a subscription](https://portal.microsoftonline.com/Signup/MainSignUp.aspx?OfferId=C69E7747-2566-4897-8CBA-B998ED3BAB88&DL=DEVELOPERPACK) -
  You can purchase an annual developer subscription for $99.00 per year.

After signup, use the resulting **userid** (in the format
**userid@yourdomain.onmicrosoft.com**) to sign in to your portal site where you
administer your account. Your Office 365 Developer Site is provisioned at your
new domain:

`http://{tenant}.sharepoint.com`.

For more info, see [Get an Office 365 Developer Site](https://msdn.microsoft.com/office/office365/HowTo/setup-development-environment#bk_Office365Account).

### 2. Set up an Azure Active Directory tenant

You will need to set up an Azure Active Directory (Azure AD) tenant and associate it with
your Office 365 Developer Site. An Azure AD tenant gives you access to the
management portal in Microsoft Azure, where you can add users, roles, and apps.

You can use the Azure AD tenant that was created when you created your Office 365
subscription to register and authenticate your apps. To access this underlying
tenant from your Office 365 Admin Center, you'll use the next procedure to create a subscription
and manage your Azure tenant.

1. Sign in to your Office 365 tenant and go to the Office 365 admin center.
2. In the same browser, open a new tab and sign in to Microsoft Azure by
   navigating to [Azure Active Directory](https://account.windowsazure.com/SignUp).
   If you are prompted to sign in with your organizational account, do so and then sign in with your Office 365 credentials.
3. Create a new Azure subscription.
4. After you create your subscription, choose **Portal**.

You should now see all items in the Azure tenant. It lists a single directory
with the name of your Office 365 tenant.

If you already have an existing Azure AD tenant, you can associate it with
your Office 365 subscription by following these steps:

1. Sign in to the [Microsoft Azure Management](https://manage.windowsazure.com/)
   portal with your existing Azure credentials (for example, your Microsoft ID
   such as user@live.com), and navigate to the **Active Directory** node.
2. Choose the **Active Directory** node, then choose the **Directory** tab and,
   at the bottom of the screen, choose **New**. In the next dialog box, choose **Use
   existing directory**, select the check box, and then choose the check mark in the
   lower-right corner. This brings you back to the [Azure Management Portal](https://manage.windowsazure.com/).
3. Sign in with your Office 365 subscription information. You will be prompted
   whether to use your directory with Azure.
4. Choose **Continue** and a screen appears to confirm your action. Now,
   choose **Sign out now**.
5. Close the browser and open the [portal](https://manage.windowsazure.com/) again.
   Otherwise, you will get an access denied error.
6. Sign in again to your Azure subscription (for example, with your Microsoft ID).
   Navigate to the **Active Directory** node and, under **Directory**, you
   should now see your Office 365 subscription.

For more info about setting up an Azure AD tenant, see [Set up Azure Active
Directory access for your Developer Site](https://msdn.microsoft.com/en-us/office/office365/howto/setup-development-environment#bk_CreateAzureSubscription).

### 3. Register your app with Azure Active Directory

To authenticate your app, you need to register your app with Azure AD, and provide some details about your app. You can register your app manually by using the [Azure Management Portal](https://manage.windowsazure.com/),
or by using Visual Studio.

To register your app manually, see [Manually register your app with Azure AD so
it can access Office 365 APIs](https://msdn.microsoft.com/en-us/office/office365/howto/add-common-consent-manually).

To register your app by using Visual Studio, see [Using Visual Studio to
register your app and add Office 365 APIs](https://msdn.microsoft.com/office/office365/HowTo/adding-service-to-your-Visual-Studio-project).

After you've registered your app, Azure AD will generate a client ID and client
secret (web apps only) for your app. You'll need to use this client ID to get
your access token.

**Important** Treat the value of your client secret the same
as you would a user's password. The secret represents the key to your
application and, if made available, can be used to impersonate your application.

When you register your app in the [Azure Management Portal](https://manage.windowsazure.com/),
you will need to configure details about your application with the following steps:

1. Specify whether your application is a mobile, desktop, or web application.
2. Specify the app endpoint. Azure will use this endpoint for redirection during
   authentication (i.e. the **Redirect URLs** that your app will use during the
   login process). For security purposes, all redirect URLs
   must be on the same root domain, except if your app is a web app. For web apps, specify a sign in URL and app URI.
3. For web apps, specify whether to make your app available only in the Azure
   tenancy you registered it in, or across multiple tenancies.
4. For web apps, generate the app secret and its duration.
5. Specify the permission levels your app requires from the Office 365 API
   applications in Azure using [app permissions](https://msdn.microsoft.com/office/office365/howto/application-manifest).
   Using OneDrive API or the file picker requires at least **Read user files**. Uploading, editing, or sharing files
   requires the **Read and write user files** permission.

![Authentication scopes for OneDrive for Business and SharePoint](../../media/AuthScopesForSharePoint.png)

To add, remove, or update an application on Azure AD, see
[Adding, Updating, and Removing an Application](https://msdn.microsoft.com/library/azure/dn132599.aspx#BKMK_Native).

Now you have everything set up to connect to your app to OneDrive for Business.
For information on how to authenticate, see [OneDrive for Business authentication and sign in](aad-oauth.md).



<!-- {
  "type": "#page.annotation",
  "description": "How to register your app to work with OneDrive or OneDrive for Business and the OneDrive API.",
  "keywords": "authentication,oauth,msa,app registration,registration,azure active directory,aad,onedrive,api,onedrive for business",
  "section": "documentation"
} -->
