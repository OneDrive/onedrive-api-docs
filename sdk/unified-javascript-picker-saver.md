# OneDrive unified web picker SDK (JavaScript) - Preview

The OneDrive picker and saver SDK for web apps is the fastest way to integrate
OneDrive into your web app. Quickly open and save files to OneDrive consumer and OneDrive
for Business with just a few lines of code and no need to manage authentication or the user
experience.

**Note:** The unified OneDrive web picker SDK (JavaScript) is in preview
and may not work exactly as documented. Do not assume that the current behavior
won't deviate from this documentation.

When using the picker to open files from OneDrive, you get download links are 
useful for your app if you apps plans to download the contents of the file within a relatively short 
amount of time. These links should not be cached or persisted since they are only valid for a 
limited duration. With OneDrive consumer, you also receive thumbnails for some types of files 
for easy displaying.

In this guide, we'll show you how to get your app quickly
[opening](#opening-files-from-onedrive) and
[saving files](#saving-files-to-onedrive) on OneDrive.

## Setting up

### OneDrive consumer

[Register your app](https://account.live.com/developers/applications) to get
an app ID (client ID), if you haven't already done so. Ensure that the web
page that is going to reference the SDK is a *Redirect URL* under
**API Settings**.   You can also upload your application logo, which
OneDrive will display in the picker and saver experience.

### OneDrive for Business
[Register your app](../app-registration.md#register-your-app-for-onedrive-for-business) to get an
app ID (client ID), if you haven't already done so. When registering your app, please ensure the 
following:

* Your app is registered as a web application. Your app must be set to use the *implict
flow*. You can do that by downloading your app's manifest, modifying it so that 
``oauth2AllowImplicitFlow`` is set to ``true``, and uploading it.
* The Reply URL is the *Redirect URL*, which is the web page that is going to reference the SDK.
* Your app has read permissions if your app only opens from OneDrive and write permissions if your 
app saves to OneDrive.

**Important:** There is a known issue where to ensure that the SDK works with your OneDrive for 
Business, your tenant must be using the new OneDrive for Business end user experience. To work 
around this known issue, your tenant admin can opt in your tenant to the new end user experience in 
the Office 365 admin portal at https://portal.office.com/admin/default.aspx by going to 
`Service Settings`, clicking on `Updates`, and selecting `Entire organization` under 
`First release`. Alternatively, you may contact us with your tenant name, and we can opt you in 
manually. Note that opting in to the new OneDrive for Business end user experience will update the 
OneDrive for Business experience for all users within the tenant.

### Putting it all together

Then, to start opening or saving files, include this reference in your web
page, replacing *APP_ID* with your OneDrive consumer and OneDrive for Business app ID or 
client ID separated by a comma. 

```html
<script type="text/javascript" src="https://js.live.net/v6.0/OneDrive.js" id="onedrive-js" client-id="APP_ID"></script>
```

## Opening files from OneDrive

To open files from OneDrive, your app should provide a button to programmatically start 
the OneDrive picker experience.   

To do so, use the `OneDrive.open` method, configured with the desired `pickerOptions`.

```html
<script type="text/javascript">
  function launchOneDrivePicker(){
    var pickerOptions = { /* ... */ };
    OneDrive.open(pickerOptions);
  }
</script>

<button onClick="launchOneDrivePicker">Open from OneDrive</button>
```

The **pickerOptions** object is defined with the following parameters.

| Parameter name  | Description       |
|:----------------|:-------------------------------------------------------------------------------------------------------------------|
| **success**     | Required. Called when the user finishes picking files and passes an array of file objects to the provided function.                      |
| **cancel**      | Called if the user cancels the picker.                                   |
| **error**       | Called when an error occurred on the server or the user doesn't have permission to get a link to the chosen file.      |
| **linkType**    | The type of link to create for access to the file. The default value is **downloadLink**, which returns a URL that provides access for one hour directly to the contents of the file. You can use this URL to download the file into your application.  |
| **multiSelect** | The default value is **false**, which allows the user to select a single file. **true** enables the user to select multiple files. |
| **openInNewWindow** | The default value is **true**, which opens the OneDrive picking experience in a popup window. **false** opens the OneDrive picking experience in the same window. |

**Note**: If `openInNewWindow` is `false`, then all callback functions **must** be globally declared on the page before the SDK is referenced to guarantee the functions will be called. In addition, the values for the callback functions - `success`, `cancel`, and `error` - must be the string name of the globally defined function.

### Example of a pickerOptions object

```javascript
var pickerOptions = {
  success: function(files) {
    // Handle returned file object(s)
    alert("You picked " + files.values[0].fileName);
  },

  cancel: function() {
    // Handle when the user cancels picking a file
  },
  
  error: function(e) {
	// Handle when there is an error getting a link to the selected file
  },

  linkType: "downloadLink", 
  multiSelect: false, // or true
  openInNewWindow: true // or false
}
```

When the picker is started, it navigates to the OneDrive picker either in a popup or in the same 
window. Once the user either cancels or finishes selecting file(s), your app receives a 
**response** object representing the files they selected.

### Handling the picker response with the files object

When the user is done picking file(s), the `success` callback receives `response` object which has 
a `values` property, which includes is an array of `file` objects, with length 1 for single select.

```javascript
{
  values: [
    {
      fileName: "file.txt",
      link: "https://..."
    },  
    { },
    { }
  ]
}
```

The **response** object has the following properties:

| Property name | Value                     | Description                                                                                                                                                             |
|:--------------|:--------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **values**    | Array of **file** objects | Collection of file objects for each file selected by the user.                                                                                                          |

### Example of a file object

```javascript
{
  fileName: "file.txt",
  link: "https://...",
  linkType: "downloadLink",
  size: 123456,
  thumbnails: ["https://...", "https://...", "https://..."]
}
```

The **file** object has the following properties:

| Property name  | Values                  | Description                                                                                                                           |
|:---------------|:------------------------|:--------------------------------------------------------------------------------------------------------------------------------------|
| **fileName**   | string                  | Name of the file including its extension.                                                                                             |
| **link**       | string - url            | A URL that provides access for one hour directly to the contents of the file                                                                                                         |
| **linkType**   | string                  | Type of link generated, which is `downloadLink`.                                                                       |
| **size**       | integer                 | Size of the file, in bytes.                                                                                                           |
| **thumbnails** | Array of thumbnail urls | Array of thumbnail links for image or video files in OneDrive consumer (large, medium, and small, in that order). This value is null for other file types. |

## Saving files to OneDrive

To save files from OneDrive, your app should provide a button to programmatically start the OneDrive 
picker experience.   

To do so, use the `OneDrive.save` method, configured with the desired `saverOptions`.   Your app
should validate that the user has selected a file if uploading through a form element.

```html
<script type="text/javascript">
  function launchOneDriveSaver(){
    var saverOptions = { file: "file" /* ... */ };
    OneDrive.save(saverOptions);
  }
</script>

<input id="file" name="file" type="file" />
<button onclick="launchOneDriveSaver">Save to OneDrive</button>
```

**Note:** A user can only save files up to 100 MB using the OneDrive JavaScript saver
SDK.    

**Example of a saverOptions object**

```javascript
var saverOptions = {
  file: "inputFile", /* The id of a file type input element or a valid data URI string */
  fileName: 'file.txt', /* Required if `saverOptions.file` is a data URI string */
  success: function(){
    // upload is complete
  },
  progress: function(p) {
    // upload is progressing
  },
  cancel: function(){
    // upload was cancelled
  },
  error: function(e) {
    // an error occurred
  },
  openInNewWindow: true // or false  
}
```

The **saverOptions** object has the following properties:

| Parameter name | Description                                                                                                                                                         |
|:---------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **file**       | Required. The form input element ID for the file parameter or a [data URI](https://en.wikipedia.org/wiki/Data_URI_scheme) of the content to be uploaded             |
| **fileName**   | Required if the `file` parameter is a [data URI](https://en.wikipedia.org/wiki/Data_URI_scheme). If the `file` parameter is the id of file type input element and the `fileName` is not provided, the file name will be inferred from the name attribute of the input element. |
| **success**    | Called when the file upload to the server is complete.                                                                                                              |
| **progress**   | Called at various points with a float between 0.0 and 100.0 to indicate the progress of the upload. This is called at least once with 100.0.                        |
| **cancel**     | Called when the user cancels the saver.                                                                                                                             |
| **error**      | Called when an error occurred on the server, the user is out of quota, the user doesn't have permission to upload to the chosen location, or the user has not selected a file to be uploaded.                        |
| **openInNewWindow** | The default value is **true**, which opens the OneDrive picking experience in a popup window. **false** opens the OneDrive picking experience in the same window. |

**Note**: If `openInNewWindow` is `false`, then all callback functions **must** be globally declared on the page before the SDK is referenced to guarantee the functions will be called. In addition, the values for the callback functions - `success`, `progress`, `cancel`, and `error` - must be the string name of the globally defined function.

When the saver is started, it navigates to the OneDrive picker either in a popup or in the same 
window. After the user chooses a folder to save the file to, the saver is dismissed and the file is 
uploaded.

## Supported browsers

The OneDrive picker and saver supports the following web browsers:

* Internet Explorer Desktop & Mobile 9+
* Chrome Desktop 5+
* Chrome for Android
* Android Browser 4.1+
* Firefox Desktop & Mobile 8+
* Safari Desktop & Mobile 5+


## Known issues
* For some OneDrive for Business users, the file object's link value may be undefined.
* The SDK does not properly handle the Open and Save responses on IE.
* The SDK does not support saving files through a form upload on IE9.
* The SDK returns thumbnail links that require authentication for image and video files selected from a user's OneDrive for Business.
* The SDK will fail to upload a file to OneDrive for Business if the file name is taken.
* Data URIs uploaded to OneDrive for Business through the SDK appear to succeed but show up as 0 byte files.
* To use the OneDrive for Business picking experience, the user's tenant must have enabled the new OneDrive for Business end user experience. To work around this, the user's tenant admin can opt the user's tenant into the new end user experience in the Office 365 admin portal.


<!-- {
  "type": "#page.annotation",
  "description": "Use the JavaScript picker and saver SDKs to connect your web app to OneDrive.",
  "keywords": "js,javascript,onedrive,picker,saver,open,save,cloud",
  "section": "sdks",
  "headerAdditions": [
    "<script type=\"text/javascript\" src=\"https://js.live.net/v6.0/OneDrive.js\" id=\"onedrive-js\" client-id=\"000000004C142703,99594742-f258-449f-af3b-a259f65d6072\"></script>"
  ],
  "footerAdditions": [
    "<link rel=\"stylesheet\" type=\"text/css\" href=\"js-sample.css\" />",
    "<script type=\"text/javascript\" src=\"unified-js-sample.js\"></script>"]
} -->
