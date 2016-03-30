# OneDrive file picker SDK for JavaScript v6.0 overview

**Note:** This version has been replaced by [file picker v7.0](../js-v7/js-picker-overview.md).
New integrations should use the latest version of the file picker SDK.

The OneDrive file picker SDK enables your web app to quickly integrate
OneDrive for opening and saving files without a lot of code. The latest version
of the file picker SDK works with any OneDrive account, Personal or Business.

You can use the file picker SDK to integrate with OneDrive in the following ways:

* Open a file and receive a short-lived URL to download the content of the file.
* Create a long-lived shareable link to view or edit a file. These are designed to be
  sent or shared with co-workers, friends and family, or other individuals.
* Save a file to OneDrive.

**Note:** You can only get shareable links for files in OneDrive for Business if
the an administrator has enabled external sharing. For OneDrive Personal, you
can always get a shareable link.

## Requirements

The OneDrive file picker SDK requires that your web application meet these
requirements:

* Use the picker SDK from a finite number of static URLs without bookmarks or
  query string parameters. E.g. https://www.contoso.com/openFile.aspx.
* Have user-driven interaction launch the picker SDK (to prevent pop-up blockers
  from blocking the file picker).

## Setting up

To get started you need to register for an app ID to identify your application
to OneDrive. If you already have an existing app ID you can continue to use it.

You will need to obtain separate app IDs for OneDrive Personal and OneDrive for
Business because they use different authentication systems. This is
only required if you wish to allow users of both services to use your integration.

### OneDrive Personal

[Register your app](/app-registration.md#register-your-app-for-onedrive) to get
an app ID (client ID), if you haven't already done so. Ensure that the web
page that is going to reference the SDK is a *Redirect URL* under
**API Settings**.  You can also upload your application logo, which
OneDrive will display in the file picker experience.

### OneDrive for Business

[Register your app](/app-registration.md#register-your-app-for-onedrive-for-business) to get an
app ID (client ID), if you haven't already done so. When registering your app, please ensure the
following:

* Your app is registered as a web application. Your app must be set to use the
  *implict flow* which must be manually enabled in your application manifest.
  You can do that by downloading your app's manifest, modifying
  it so that `oauth2AllowImplicitFlow` is set to `true`, and uploading it. See
  [Integrating applications with Azure Active Directory][aad-implicit-flow]
  for more information.
* The Reply URL is the *Redirect URL*, which is the web page that is going to
  reference the SDK.
* Your app needs to be granted permissions to **Office 365 SharePoint Online**
  and needs either **Read user files** permissions (for downloading only) or
 **Read and write user files** permission (for sharing links and saving files).

[aad-implicit-flow]: https://azure.microsoft.com/en-us/documentation/articles/active-directory-integrating-applications/#enabling-oauth-20-implicit-grant-for-single-page-applications

### Next Step

* [Opening files with the OneDrive file picker SDK](js-picker-open.md)
* [Saving files with the OneDrive file picker SDK](js-picker-save.md)

## Supported browsers

The OneDrive picker and saver supports the following web browsers:

* Internet Explorer Desktop & Mobile 11+
* Chrome Desktop 5+
* Chrome for Android
* Android Browser 4.1+
* Firefox Desktop & Mobile 8+
* Safari Desktop & Mobile 5+

## Known issues

* The SDK returns thumbnail links that require authentication for image files selected from OneDrive for Business.
* The SDK will fail to upload a file to OneDrive for Business if the file name is taken.
* Data URIs are not supported with OneDrive for Business.

<!-- {
  "type": "#page.annotation",
  "description": "Learn how to use the JavaScript file picker SDK to connect your web app to OneDrive.",
  "keywords": "js,javascript,onedrive,picker,saver,open,save,cloud",
  "section": "sdks",
  "headerAdditions": [
    "<script type=\"text/javascript\" src=\"https://js.live.net/v6.0/OneDrive.js\" id=\"onedrive-js\" client-id=\"000000004C142703,99594742-f258-449f-af3b-a259f65d6072\"></script>"
  ],
  "footerAdditions": [
    "<link rel=\"stylesheet\" type=\"text/css\" href=\"js-sample.css\" />",
    "<script type=\"text/javascript\" src=\"unified-js-sample.js\"></script>"]
} -->
