---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
---
# Opening files with the OneDrive file picker SDK for JavaScript

**Note:** This version has been replaced by [file picker v7.2](../js-v72/index.md).
New integrations should use the latest version of the file picker SDK.


This topic walks you through embedding the file picker SDK into your JavaScript
app and using it to open a file from OneDrive.

### Open demo

## 1. Add a reference to the SDK

To open files, include this reference in your web page,
replacing *APP_ID* with your OneDrive Personal and/or OneDrive for Business
app ID. If you are using both services, you can include both IDs separated by a
comma. You can use the same App IDs for opening and saving scenarios.

```html
<script type="text/javascript" src="https://js.live.net/v6.0/OneDrive.js" id="onedrive-js" client-id="APP_ID"></script>
```

## 2. Launch the file picker

To open files from OneDrive, your app should provide a button to
programmatically open the OneDrive file picker. Because this code will launch
a pop-up window in the browser, it needs to be called as part of an explicit user
action to avoid being blocked by a pop-up blocker.

As part of the `OneDrive.open(...)` method, you specify the options for how
the picker should behave.

```html
<script type="text/javascript">
  function launchOneDrivePicker(){
    var pickerOptions = { /* ... */ };
    OneDrive.open(pickerOptions);
  }
</script>

<button onClick="launchOneDrivePicker">Open from OneDrive</button>
```

### Picker options

You can specify how the file picker behaves by providing an object with parameters
that control the picker's behavior. This object also includes the callback
functions for when the file picker is complete or encounters an error.

When opening files, the options object can have the following parameters:

```javascript
var pickerOptions = {
  linkType: "downloadLink",
  multiSelect: true,
  openInNewWindow: true,
  success: function(files) { /* success handler */ },
  cancel: function() { /* cancel handler */ },
  error: function(e) { /* error handler */ }
}
```

| Parameter name      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|:--------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **linkType**        | The type of link to create for access to the file. The default value is **downloadLink**, which returns a URL that provides access for one hour directly to the contents of the file. You can use this URL to download the file into your application.  You can also request a **webLink**, which returns a URL to a sharing link that provides a web preview of the file. This link is valid until the user deletes the shared link through OneDrive. |
| **multiSelect**     | The default value is **false**, which allows the user to select a single file. **true** enables the user to select multiple files.                                                                                                                                                                                                                                                                                                                     |
| **openInNewWindow** | The default value is **true**, which opens the OneDrive picking experience in a popup window. **false** opens the OneDrive picking experience in the same window.                                                                                                                                                                                                                                                                                      |
| **success**         | Required. Called when the user finishes picking files and passes an array of file objects to the provided function.                                                                                                                                                                                                                                                                                                                                    |
| **cancel**          | Called if the user cancels the picker.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **error**           | Called when an error occurred on the server or the user doesn't have permission to get a link to the chosen file.                                                                                                                                                                                                                                                                                                                                      |

**Note**: If `openInNewWindow` is `false`, then all callback functions **must**
be globally declared on the page before the SDK is referenced to guarantee the
functions will be called. In addition, the values for the callback functions -
`success`, `cancel`, and `error` - must be the string name of the globally
defined function.

### Types of links

Using the picker SDK's linkType parameter you can specify which type of URL should
be returned after the user selects a file or folder. The following values
are allowed:

| Value          | Description                                                                                                      |
|:---------------|:-----------------------------------------------------------------------------------------------------------------|
| downloadLink   | A URL to download the contents of the selected file for a short period of time.                                  |
| webLink        | A long lived URL that enables a recipient to open the file with read-only permissions. This URL does not expire. |

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

  linkType: "downloadLink", // or webLink
  multiSelect: false, // or true
  openInNewWindow: true // or false
}
```

When the picker is started, it navigates to the OneDrive picker either in a
popup or in the same window. Once the user either cancels or finishes selecting
file(s), your app receives a **response** object representing the files they
selected.

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
    }
  ]
}
```

The **response** object has the following properties:

| Property name | Value        | Description                                                                                                                                                                                                                |
|:--------------|:-------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **link**      | String       | If the **linkType** requested is `webLink`, **multiSelect** is `true`, and the files were selected from OneDrive Personal, then **link** will return a **webLink** for viewing all files. If not, then **link** is *null*. |
| **values**    | File Array | Collection of file objects representing each file selected by the user.                                                                                                                                                    |

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

| Property name  | Value                   | Description                                                                                                                                                |
|:---------------|:------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **fileName**   | String                  | Name of the file including its extension.                                                                                                                  |
| **link**       | String                  | A URL that provides access to the selected file                                                                                                            |
| **linkType**   | String                  | Type of link generated, which is `downloadLink` or `webLink`.                                                                                              |
| **size**       | Integer                 | Size of the file, in bytes.                                                                                                                                |
| **thumbnails** | String Array          | Array of thumbnail links for image or video files in OneDrive consumer (large, medium, and small, in that order). This value is null for other file types. |


<!-- {
  "type": "#page.annotation",
  "description": "Use the JavaScript file picker SDK to open files from OneDrive.",
  "keywords": "js,javascript,onedrive,picker,saver,open,save,cloud",
  "section": "sdks",
  "headerAdditions": [
    "<script type=\"text/javascript\" src=\"https://js.live.net/v6.0/OneDrive.js\" id=\"onedrive-js\" client-id=\"000000004C181C1C,99594742-f258-449f-af3b-a259f65d6072\"></script>"
  ],
  "footerAdditions": [
    "<link rel=\"stylesheet\" type=\"text/css\" href=\"js-sample.css\" />",
    "<script type=\"text/javascript\" src=\"unified-js-sample.js\"></script>"]
} -->
