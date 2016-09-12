# OneDrive file picker for JavaScript v7.0 overview

The OneDrive file picker SDK enables your web app to quickly integrate
OneDrive for opening and saving files without a lot of code. The latest version
of the file picker SDK works with any OneDrive account, Personal or Business.

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

To get started you need to register your application and receive an app ID
from the [Microsoft Application Registration Portal](https://apps.dev.microsoft.com).

1. Log in to the [Microsoft Application Registration Portal](https://apps.dev.microsoft.com)
   using your Microsoft account, or a work or school account.
2. Click **Add an app** and enter a name for your app.
3. After your application is created, configure it to support the JavaScript picker:
   1. Click **Generate New Password** to create an **Application secret**. This value is not necessary for the picker, but it must be created.
   2. Click **Add Platform** and then select **Web**.
   3. Enter one or more **URLs** where the picker will be hosted on your website. Each page that hosts the picker needs to have a redirect URL provided.
   4. Click the **Save** button to save your changes.
4. Copy the Application Id for your application and use it in the JavaScript options object you provided to [open](js-picker-open.md) or [save](js-picker-save.md) a file.

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
* The SDK returns thumbnail links that require authentication for image files selected from a user's OneDrive for Business.
* Files selected from OneDrive for Business may not have a thumbnail collection available. You should check for a null value.
* The SDK will fail to upload a file to OneDrive for Business if the filename is taken.
* Data URIs uploaded to OneDrive for Business through the SDK appear to succeed but show up as 0 byte files.

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
