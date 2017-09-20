---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
---
# Saving files with the OneDrive file picker SDK for JavaScript

**Note:** This version has been replaced by [file picker v7.2](../js-v72/index.md).
New integrations should use the latest version of the file picker SDK.


This topic walks you through embedding the file picker SDK into your JavaScript
app and using it to save a file to OneDrive.

### Save demo

## 1. Add a reference to the SDK

To open files, include this reference in your web page,
replacing *APP_ID* with your OneDrive Personal and/or OneDrive for Business
app ID. If you are using both services, you can include both IDs separated by a
comma. You can use the same App IDs for opening and saving scenarios.

```html
<script type="text/javascript" src="https://js.live.net/v6.0/OneDrive.js" id="onedrive-js" client-id="APP_ID"></script>
```

## 2. Launch the file picker

To save files from OneDrive, your app should provide a button to programmatically
start the OneDrive picker experience.    Because this code will launch
a pop-up window in the browser, it needs to be called as part of an explicit
user action to avoid being blocked by a pop-up blocker.

As part of the `OneDrive.save(...)` method, you specify the options for how
the picker should behave.

```html
<script type="text/javascript">
  function launchOneDriveSaver(){
    var saverOptions = { file: "fileToUpload" /* ... */ };
    OneDrive.save(saverOptions);
  }
</script>

<input id="fileToUpload" name="fileToUpload" type="file" />
<button onclick="launchOneDriveSaver">Save to OneDrive</button>
```

**Note:** The maximum file size that can be saved using this method is 100 MB.
To upload larger files, follow the API under
[Uploading large files to OneDrive](../../../rest-api/api/driveitem_createuploadsession.md).

### Picker options

You can specify how the file picker behaves by providing an object with parameters
that control the picker's behavior. This object also includes the callback
functions for when the file picker is complete or encounters an error.

When saving files, the options object can have the following parameters:

```javascript
var saveOptions = {
  file: "inputFile", /* The id of a file type input element or a valid data URI string */
  fileName: "file.txt", /* Required if `saverOptions.file` is a data URI string */
  openInNewWindow: true,
  success: function() { /* upload is complete */ },
  progress: function(p) { /* upload is progressing */ },
  cancel: function() { /* upload was cancelled */ },
  error: function(e) { /* an error occurred */ }
}
```

The **saverOptions** object has the following properties:

| Parameter name      | Description                                                                                                                                                                                                                                                                    |
|:--------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **file**            | Required. The form input element ID for the file parameter or a [data URI](https://en.wikipedia.org/wiki/Data_URI_scheme) of the content to be uploaded.                                                                                                                        |
| **fileName**        | Required if the `file` parameter is a [data URI](https://en.wikipedia.org/wiki/Data_URI_scheme). If the `file` parameter is the id of file type input element and the `fileName` is not provided, the file name will be inferred from the name attribute of the input element. |
| **openInNewWindow** | The default value is **true**, which opens the OneDrive picking experience in a popup window. **false** opens the OneDrive picking experience in the same window.                                                                                                              |
| **success**         | Called when the file upload to the server is complete.                                                                                                                                                                                                                         |
| **progress**        | Called at various points with a float between 0.0 and 100.0 to indicate the progress of the upload. This is called at least once with 100.0.                                                                                                                                   |
| **cancel**          | Called when the user cancels the saver.                                                                                                                                                                                                                                        |
| **error**           | Called when an error occurred on the server, the user is out of quota, the user doesn't have permission to upload to the chosen location, or the user has not selected a file to be uploaded.                                                                                  |

**Note**: If `openInNewWindow` is `false`, then all callback functions **must**
be globally declared on the page before the SDK is referenced to guarantee the
functions will be called. In addition, the values for the callback functions -
`success`, `progress`, `cancel`, and `error` - must be the string name of the
globally defined function.


<!-- {
  "type": "#page.annotation",
  "description": "Use the JavaScript picker and saver SDKs to connect your web app to OneDrive.",
  "keywords": "js,javascript,onedrive,picker,saver,open,save,cloud",
  "section": "sdks",
  "headerAdditions": [
    "<script type=\"text/javascript\" src=\"https://js.live.net/v6.0/OneDrive.js\" id=\"onedrive-js\" client-id=\"000000004C181C1C,99594742-f258-449f-af3b-a259f65d6072\"></script>"
  ],
  "footerAdditions": [
    "<link rel=\"stylesheet\" type=\"text/css\" href=\"js-sample.css\" />",
    "<script type=\"text/javascript\" src=\"unified-js-sample.js\"></script>"]
} -->
