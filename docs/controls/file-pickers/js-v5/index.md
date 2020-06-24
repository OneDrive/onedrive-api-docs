---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: overview
localization_priority: Normal
---
# OneDrive file picker SDK for JavaScript

**Note:** This version has been replaced by [file picker v7.2](../js-v72/index.md).
New integrations should use the latest version of the file picker SDK.

The OneDrive picker and saver SDK for Web apps is the fastest way to integrate
OneDrive into your website. Open and save files to OneDrive by using a button, or
just a few lines of JavaScript - all without handling authentication. The
OneDrive picker and saver SDK for Web apps is different from other
OneDrive picker and saver SDKs because you can start using it without
downloading anything.

When using the picker to open files from OneDrive, you get shareable links to
files, which are great for web viewing and sending to friends and family, or
downloadable links, which are great for getting the contents of a file. You also
get thumbnails of image and video files for simple, fast displays.

In this guide, we’ll show you how to get your app quickly
[opening](#opening-files-from-onedrive) and
[saving files](#saving-files-to-onedrive) on OneDrive.

## Setting up

[Register your app](https://account.live.com/developers/applications) to get
an app ID (client ID), if you haven't already done so.  Ensure that the web
page that is going to reference the SDK is a *Redirect URL* under
**API Settings**.   You can also upload your application logo, which
OneDrive will display in the picker and saver experience.

Then, to start opening or saving files, include this reference in your web
page, replacing *APP_ID* with your app's ID or client ID.  

```html
<script type="text/javascript" src="https://js.live.net/v5.0/OneDrive.js" id="onedrive-js" client-id="APP_ID"></script>
```

## Opening files from OneDrive

To open files from OneDrive, your app can either embed an "Open from OneDrive"
button, or provide a customized button and programmatically start the OneDrive
picker experience.
Both methods require a **pickerOptions** object with the following parameters.

| Parameter name  | Description                                                                                                                                                                                                                                                                                                                                                                  |
|:----------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **success**     | Required. Called when the user finishes picking files and passes an array of file objects to the provided function.                                                                                                                                                                                                                                                          |
| **cancel**      | Called if the user cancels the picker.                                                                                                                                                                                                                                                                                                                                       |
| **linkType**    | The type of link to create for access to the file. The default value is **webViewLink**, which returns a URL to a sharing link that provides a web preview of the file. This link is valid until the user deletes the shared link through OneDrive. The **downloadLink** gets a URL that provides access for one hour directly to the contents of the file. You can use this URL to download the file into your application. |
| **multiSelect** | The default value is **false**, which allows the user to select a single file. **true** enables the user to select multiple files.                                                                                                                                                                                                                                           |
| **theme**       | The color theme of the button. The default value is **blue**. Available values are **blue** and **white**. Used only with the **OneDrive.createOpenButton** method.                                                                                                                                                                                                          |

### Example of a pickerOptions object

```javascript
var pickerOptions = {
  success: function(files) {
    // Handle returned file object(s)
    alert("You picked " + files.values[0].fileName);
  },

  cancel: function() {
      // handle when the user cancels picking a file
  },

  linkType: "webViewLink", // or "downloadLink",
  multiSelect: false // or true
}
```

### Open files using a button

You can use the ![Open from OneDrive Button](../../../media/open-button.png)
button on your website to start opening files from OneDrive. This code adds a
button element to your page. When a user clicks this button, the OneDrive picker
starts with the specified pickerOptions, and returns the file(s) the user
selected.  

To add the ![Open from OneDrive Button](../../../media/open-button.png) button to
your page, configure the `pickerOptions` and embed the button, like this.

```html
<script type="text/javascript">
  window.onload = function() {
    var pickerOptions = { /* ... */ };
    var pickerButton = OneDrive.createOpenButton(pickerOptions);
    document.getElementById("picker").appendChild(pickerButton);
  }
</script>

<div id="picker"></div>
```

**Note:** After the `createOpenButton` method is called, the `pickerOptions`
object can't be modified.

### Start the picker programmatically

If you want to design your own button or start the picker programmatically, use
the `OneDrive.open` method, configured with the desired `pickerOptions`:

```html
<script type="text/javascript">
  function launchOneDrivePicker(){
    var pickerOptions = { /* ... */ };
    OneDrive.open(pickerOptions);
  }
</script>

<button onclick="launchOneDrivePicker">Open from OneDrive</button>
```

When the picker starts, it opens a dialog box, prompting the user to select
files. Once the user either cancels or finishes selecting file(s), your app
receives a **response** object representing the files they selected.

### Handling the picker response with the files object

When the user is done picking file(s), the `success` callback receives
`response` object which has a `values` property, which includes is an array of
`file` objects, with length 1 for single select.

```javascript
{
  link: "https://...",
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
| **link**      | string - url              | If the **linkType** is `webViewLink` and **multiSelect** is `true`, then **link** will return a **webViewLink** for viewing all files. If not, then **link** is *null*. |
| **values**    | Array of **file** objects | Collection of file objects for each file selected by the user.                                                                                                          |

### Example of a file object

```javascript
{
  fileName: "file.txt",
  link: "https://...",
  linkType: "webViewLink",
  size: 123456,
  thumbnails: ["https://...", "https://...", "https://..."]
}
```

The **file** object has the following properties:

| Property name  | Values                  | Description                                                                                                                           |
|:---------------|:------------------------|:--------------------------------------------------------------------------------------------------------------------------------------|
| **fileName**   | string                  | Name of the file including its extension.                                                                                             |
| **link**       | string - url            | URL of the requested file.                                                                                                            |
| **linkType**   | string                  | Type of link generated. Either `webViewLink` or `downloadLink`.                                                                       |
| **size**       | integer                 | Size of the file, in bytes.                                                                                                           |
| **thumbnails** | Array of thumbnail urls | Array of thumbnail links for image or video files (large, medium, and small, in that order). This value is null for other file types. |

## Saving files to OneDrive

To start saving files to OneDrive, embed a
![Save to OneDrive button](../../../media/saver-button.png) button directly into
your app by using the **OneDrive.createSaveButton** method, or create a more
personalized experience by using the **OneDrive.save** method.
Both methods require a **saverOptions** object with the following parameters.

**Note:** A user can only save files up to 100 MB using the OneDrive JavaScript saver
SDK.

**Example of a saverOptions object**

```javascript
var saverOptions = {
  file: "inputFile",
  fileName: 'file.txt',
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
    // an error occured
  }
}
```

The **saverOptions** object has the following properties:

| Parameter name | Description                                                                                                                                                         |
|:---------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **file**       | Required. The form input element ID for the file parameter.                                                                                                         |
| **fileName**   | If not provided, the file name will be inferred from the name attribute of the input element.                                                                       |
| **success**    | Called when the file upload to the server is complete.                                                                                                              |
| **progress**   | Called at various points with a float between 0.0 and 100.0 to indicate the progress of the upload. This is called at least once with 100.0.                        |
| **cancel**     | Called when the user cancels the saver.                                                                                                                             |
| **error**      | Called when an error occurred on the server, the user is out of quota, or the user doesn't have permission to upload to the chosen location.                        |
| **theme**      | The color theme of the button. The default value is **blue**. Available values are **blue** and **white**. Used only with the **OneDrive.createSaveButton** method. |


### Save files to OneDrive by using a button

Much like the ![Open from OneDrive Button](../../../media/open-button.png) button,
you can embed the ![Save to OneDrive button](../../../media/saver-button.png)
button with a few lines of code.
When a user clicks this button, the OneDrive saver will start and the user can
choose a location in their OneDrive to save the file.

```html
<script type="text/javascript">
window.onload = function() {
    var saverOptions = { file: "file" /* ... */ };
    var saverButton = OneDrive.createSaveButton(saverOptions);
    document.getElementById("save").appendChild(saverButton);
}
</script>

<input id="file" name="file" type="file" />
<div id="save"></div>
```

**Note:** When the `createSaveButton` method is called, the `saverOptions`
object cannot be modified.

### Start the saver programmatically

You can design your own button or start the OneDrive saver programmatically, by
calling the `OneDrive.save` method. It displays a dialog box that asks the user
to choose a folder to save the file to. Once the folder is selected, the
OneDrive saver uploads the file.
Use the `OneDrive.save` method configured with the desired options to launch
the saver experience.

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

When the saver is started, it launches a popup dialog. After the user chooses a
folder to save the file to, the saver is dismissed and the file is uploaded.

## Supported Browsers

The OneDrive picker and saver supports the following web browsers:

* Internet Explorer 9+
* Latest version of Chrome
* Latest version of Firefox
* Latest version of Safari  

## License

Copyright (c) Microsoft Corporation. All rights reserved.

Licensed under the [MIT](https://opensource.org/licenses/MIT) License.

<!-- {
  "type": "#page.annotation",
  "description": "Use the JavaScript picker and saver SDKs to connect your web app to OneDrive.",
  "keywords": "js,javascript,onedrive,picker,saver,open,save,cloud",
  "section": "sdks",
  "headerAdditions": [
    "<script type=\"text/javascript\" src=\"https://js.live.net/v5.0/OneDrive.js\" id=\"onedrive-js\" client-id=\"000000004C142703\"></script>"
  ],
  "footerAdditions": [
    "<link rel=\"stylesheet\" type=\"text/css\" href=\"js-sample.css\" />",
    "<script type=\"text/javascript\" src=\"js-sample.js\"></script>"]
} -->
