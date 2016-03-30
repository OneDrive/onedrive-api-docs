# Saving Files with the OneDrive File Picker JavaScript SDK v7.0

To save files from OneDrive, your app should provide a button to programmatically
start the OneDrive picker experience.   

### Save demo

## 1. Register your application

To use the OneDrive picker, you need to register your application through the
[Microsoft Application Registration Portal](https://apps.dev.microsoft.com) and
receive a Client Id. You also need to add a valid redirect URI for your web
application using the picker. This can either be the page hosting the picker SDK
or a custom URL you define.

## 2. Add a reference to the SDK

Embed the OneDrive JavaScript SDK into your page.

```html
<script type="text/javascript" src="https://js.live.net/v7.0/OneDrive.js"></script>
```

## 3. Launch the file picker

To save files to OneDrive, your app should provide a button to programmatically
open the OneDrive file picker. Because this code will launch a pop-up window in
the browser, it needs to be called as part of an explicit user action to avoid
being blocked by a pop-up blocker.

As part of the `OneDrive.save(...)` method, you specify the options for how the
picker should behave and how the picker will call back to your code through an
options object.

```html
<script type="text/javascript">
  function launchSaveToOneDrive(){
    var odOptions = { /* ... specify the desired options ... */ };
    OneDrive.save(odOptions);
  }
</script>

<input id="fileUploadControl" name="fileUploadControl" type="file" />
<button onclick="launchSaveToOneDrive">Save to OneDrive</button>
```

### Picker options

You can specify how the file picker behaves when saving files by providing an
object with parameters that control the picker's behavior. This object also
includes the callback functions for when the file picker is finished or
encounters an error.

#### Example file picker options

```javascript
var odOptions = {
  clientId: "INSERT-APP-ID-HERE",
  action: "save | query",
  sourceInputElementId: "fileUploadControl",
  sourceUri: "",
  fileName: "file.txt",
  openInNewWindow: true,
  advanced: {},
  success: function(files) { /* success handler */ },
  progress: function(p) { /* progress handler */ },
  cancel: function() { /* cancel handler */ },
  error: function(e) { /* error handler */ }
}
```

#### Parameters

| Parameter name           | Description                                                                                                                                                                                                                                       |
|:-------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **clientId**             | The application ID generated by the app registration console for your integration.                                                                                                                                                                |
| **action**               | The action type being performed with the files selected. You can specify `save` to save a file directly to OneDrive, or `query` to return identifiers that can be used with the Microsoft Graph API or OneDrive API to save to a selected folder. |
| **sourceInputElementId** | The form input (type=file) element ID for the file to be uploaded.                                                                                                                                                                                |
| **sourceUri**            | An http, https, or data URI for the file to be uploaded. OneDrive for Business and SharePoint only supports data URI values.                                                                                                                      |
| **fileName**             | Required if the `sourceUri` parameter is a [data URI](https://en.wikipedia.org/wiki/Data_URI_scheme). If not provided, the file name will be inferred from the name attribute of the input element.                                               |
| **openInNewWindow**      | The default value is **true**, which opens the OneDrive picking experience in a popup window. **false** opens the OneDrive picking experience in the same window.                                                                                 |
| **advanced**             | A collection of additional properties which can further customize the behavior of the picker, but are not necessary for most scenarios. See [Advanced Save Scenarios](#advanced-save-scenarios) for more details.                                           |
| **success**              | Called when the file upload to the server is complete. The files parameter is a collection of metadata returned by the service for the uploaded file.                                                                                             |
| **progress**             | Called at various points with a float between 0.0 and 100.0 to indicate the progress of the upload. This is called at least once with 100.0.                                                                                                      |
| **cancel**               | Called when the user cancels the saver.                                                                                                                                                                                                           |
| **error**                | Called when an error occurred on the server, the user is out of quota, the user doesn't have permission to upload to the chosen location, or the user has not selected a file to be uploaded.                                                     |

**Note**: If `openInNewWindow` is `false`, then all callback functions **must**
be declared globally on the page before the SDK is referenced to guarantee the
functions will be called. When registered globally the callback function names
are renamed with a prefix of `oneDriveFilePicker`. For example, `success`
becomes `oneDriveFilePickerSuccess`.

### Types of actions

Using the picker SDK's **action** parameter you can specify how the picker
behaves. The following values are allowed for the `save()`` action:

| Value   | Description                                                                                                                   |
|:--------|:------------------------------------------------------------------------------------------------------------------------------|
| `save`  | Saves the file provided by **sourceInputElementId** or **sourceUri**  to the selected folder in the user's OneDrive.          |
| `query` | Returns API metadata about the selected folder. Your app then uploads one or more files into the folder selected by the user. |

## 4. Handling the picker response object

When the user is done picking file(s), the `success` callback receives
`response` object. This object contains properties, include **value** property
which is a collection of [Item resource](/resources/item.md) with a subset of
the item's properties.

When using the `save` action, this collection provides the item metadata for
the newly uploaded file. For the `query` action, this collection will contain
metadata for the selected folder.

### Example when uploading a document

```json
{
  "value": [
    {
      "id": "123456",
      "name": "document1.docx",
      "size": 12340,
      "@content.downloadUrl": "https://contoso-my.sharepoint.com/download.aspx?guid=1231231231a",
      "webUrl": "https://cotoso-my.sharepoint.com/personal/user_contoso_com/documents/document1.docx",
      "thumbnails": [
        {
          "id": "0",
          "small": { "url": "https://sn3302files.onedrive.live.com/..." },
          "medium": { "url": "https://sn3302files.onedrive.live.com/..." },
          "large": { "url": "https://sn3302files.onedrive.live.com/..." }
        }
      ]
    }
  ]
}
```

### Example when using `query` to save to a folder

```json
{
  "value": [
    {
      "id": "1234567!12",
      "name": "Project Vroom",
      "webUrl": "https://cotoso-my.sharepoint.com/personal/user_contoso_com/documents/project%20vroom",
      "folder": { "childCount": 4 }
    }
  ]
}
```

## Advanced save scenarios

The advanced parameter on the options object has the following defined
properties:


| Parameter name           | Description                                                                                                                                                                                                                                                                                                                                                                                     |
|:-------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **redirectUri**          | By default the picker uses the page it was launched from as the redirect uri for authentication. This may not be desirable in all scenarios, so you can set a custom URL to use instead. This URL must be in the same root domain and use the same protocol as the page hosting the picker SDK. The target page must reference the OneDrive Picker SDK in the same fashion as the calling page. |


### Using a custom redirect URI

If your app is a large client-side JavaScript app or uses query string parameters
to maintain state, it may not be desirable to use the page launching the file
picker as the redirect URI. This requires that your whole app is reloaded inside
the popup window, which may cause performance issues. You can specify an
alternative redirect URI through the advanced object
which is used instead.

```javascript
var odOptions = {
  clientId: "INSERT-APP-ID-HERE",
  action: "download",
  openInNewWindow: true,
  advanced: {
    redirectUri: "https://contoso.com/filePickerRedirect.htm"
  },
  success: function(files) { /* success handler */ },
  cancel: function() { /* cancel handler */ },
  error: function(e) { /* error handler */ }
}
```

The page you redirect to needs only to load the OneDrive SDK script:

```html
<html>
<script type="text/javascript" src="https://js.live.net/v7.0/OneDrive.js"></script>
</html>
```

**Note:** you can only provide a custom redirect URI when using file picker as a
popup window (**openInNewWindow** is `true`). When using the inline experience
the default redirect URI is always used.

<!-- {
  "type": "#page.annotation",
  "description": "Use the JavaScript picker and saver SDKs to connect your web app to OneDrive.",
  "keywords": "js,javascript,onedrive,picker,saver,open,save,cloud",
  "section": "sdks",
  "tocPath": "OneDrive SDKs/JavaScript file picker/Save a File",
  "headerAdditions": [
    "<script type=\"text/javascript\" src=\"OneDrive.7-0-rc.js\"></script>"
  ],
  "footerAdditions": [
    "<link rel=\"stylesheet\" type=\"text/css\" href=\"js-sample.css\" />",
    "<script type=\"text/javascript\" src=\"unified-js-sample.js\"></script>"]
} -->