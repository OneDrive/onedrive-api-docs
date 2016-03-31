# OneDrive file picker for JavaScript v7.0 overview

The OneDrive file picker SDK enables your web app to quickly integrate
OneDrive for opening and saving files without a lot of code. The latest version
of the file picker SDK works with any OneDrive account, Personal or Business.

**Note:** The OneDrive File Picker for JavaScript is in preview and functionality
may deviate from the documented. Do not assume current behavior that deviates from
the documentation will persist.

You can use the file picker SDK to integrate with OneDrive in the following ways:

* Open a file and receive a short-lived URL to download the content of the file.
* Create a long-lived sharable link to view or edit a file. These are designed to be
  sent or shared with co-workers, friends and family, or other individuals.
* Get a direct link to the file which requires end user authorization.
* Get a file or folder ID for a file that can be used with the OneDrive API to
  perform API actions on the file.
* Save a file to OneDrive.

**Note:** You can only get shareable links for files in OneDrive for Business if
the user's tenant admin has enabled external sharing. For OneDrive consumer, you
can get shareable links for all files.

## Setting up

To get started you need to register for an app ID to identify your application
to OneDrive. If you already have an existing app ID you can continue to use it.

You will need to obtain separate app IDs for OneDrive Personal and OneDrive for
Business because they currently use different authentication systems. This is
only required if you wish to allow users of both services to use your integration.

### OneDrive consumer

[Register your app](../../app-registration.md) to get
an app ID (client ID), if you haven't already done so. Ensure that the web
page that is going to reference the SDK is a *Redirect URL* under
**API Settings**.   You can also upload your application logo, which
OneDrive will display in the picker and saver experience.

### OneDrive for Business

[Register your app](../../app-registration.md#register-your-app-for-onedrive-for-business) to get an
app ID (client ID), if you haven't already done so. When registering your app, please ensure the
following:

* Your app is registered as a web application. Your app must be set to use the
  *implict flow*. You can do that by downloading your app's manifest, modifying
  it so that `oauth2AllowImplicitFlow` is set to `true`, and uploading it.
* The Reply URL is the *Redirect URL*, which is the web page that is going to
  reference the SDK.
* Your app has read permissions if your app only opens from OneDrive and write
  permissions if your app saves to OneDrive.


### Next Step

Learn more about [opening files with the OneDrive file picker](js-picker-open.md) or
[saving files with the OneDrive file picker SDK](js-picker-save.md).


## Supported browsers

The OneDrive picker and saver supports the following web browsers:

* Internet Explorer Desktop & Mobile 11+
* Microsoft Edge v25+
* Chrome Desktop 5+
* Chrome for Android
* Android Browser 4.1+
* Firefox Desktop & Mobile 8+
* Safari Desktop & Mobile 5+


## Known issues
* The SDK does not support saving files through a form upload on IE9.
* The SDK returns thumbnail links that require authentication for image and
  video files selected from a user's OneDrive for Business.
* The SDK will fail to upload a file to OneDrive for Business if the file name
  is taken.
* Data URIs uploaded to OneDrive for Business through the SDK appear to succeed
  but show up as 0 byte files.

## Previous versions

* [File picker SDK v6.0](../js-v6/js-picker-overview.md)
* [File picker SDK v5.0](../js-v5/javascript-picker-saver.md)


<!-- {
  "type": "#page.annotation",
  "description": "Use the JavaScript picker and saver SDKs to connect your web app to OneDrive.",
  "keywords": "js,javascript,onedrive,picker,saver,open,save,cloud",
  "section": "sdks",
  "tocPath": "OneDrive SDKs/JavaScript file picker"
} -->
