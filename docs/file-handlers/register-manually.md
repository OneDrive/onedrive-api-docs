---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: conceptual
topic: Register a file handler with Azure Active Directory
---
# How to: Register a file handler add-in manually

To develop a file handler add-in you first need to upload your file handler manifest into your app registration in Azure Active Directory.

This topic walks you through the process of registering your file handler manifest manually.

## App manifest and the addIns property

File handler manifests are stored along side your app manifest in Azure Active Directory.
The **addIns** property of the app manifest lists the add-in components of an application, like file handlers, and their associated properties.

The manifest is made up of a set of key-value properties, which define the properties of the file handler.
For more information about the file handler manifest, see [File handler overview](index.md).

An example file handler manifest:

<!-- { "blockType": "example", "name": "file-handler-manifest", "@type": "oneDriveAddins.fileHandlerManifest" } -->

```json
{
"id": "968A844F-7A47-430C-9163-07AE7C31D407",
"type": "FileHandler",
"properties": [
    { "key": "version", "value": "2" },
    { "key": "fileTypeDisplayName", "value": "Display name of the file format" },
    { "key": "fileTypeIcon", "value": "{\"svg\":\"https://example.org/icon.svg\",\"png1x\":\"https://example.org/icon@1x.png\",\"png1.5x\":\"https://example.org/icon@1.5x.png\",\"png2x\":\"https://example.org/icon@2x.png\"}" },
    { "key": "appIcon", "value": "{\"svg\":\"https://example.org/app-icon.svg\",\"png1x\":\"https://example.org/app-icon@1x.png\",\"png1.5x\":\"https://example.org/app-icon@1.5x.png\",\"png2x\":\"https://example.org/app-icon@2x.png\"}" },
    { "key": "actions", "value": "json string of additional actions"}
  ]
}
```

To register a file handler, you need to update the **addIns** collection in the app manifest stored in Azure Active Directory.
There is currently no UI in the Azure Management Portal to do this, so you need to do this using Azure AD Graph API manually.

## 1. Obtain an access token with tenant admin permissions

To make Azure AD Graph queries, you need to have `Directory.ReadWrite.All` permissions, which require a tenant administrator to consent.
To obtain an access token with these permissions, you can use a tool like [Postman](https://www.getpostman.com/).

1. Install the Postman application, and then launch the app.
2. On the **Authorization** tab, change **Type** to **OAuth 2.0**.
3. Click **Get New Access Token**. A dialog will appear asking for a number of fields to be completed.
4. In your browser, navigate to the [Azure Portal](https://portal.azure.com) and sign-in.
5. Select **Azure Active Directory**, then click on **App registrations**.
6. Click **Add** to create a new application, which will be used to manage file handler manifests.
    1. Name the application `File handler registration tool` and set the sign-on URL to the value Postman tells you to use: `https://www.getpostman.com/oauth2/callback`.
    2. Scroll to the end of the application list and click on **File handler registration tool**.
    3. Copy the **application ID** value (guid) and paste it into Postman next to **Client ID**.
    4. Click on **Required permissions**, then **Windows Azure Active Directory**.
    5. Under **Delegated permissions** find and check the following permissions:
        * **Sign in and read user profile**
        * **Read and write directory data**
        * **Access the directory as the signed in user**
    6. Click **Save**.
    7. Click on **Keys**, then create a new key by changing the Expires drop down to **Never expires** and clicking **Save**.
    8. Copy the value of the new key, and paste it into Postman next to **Client Secret**.
7. In Postman, complete the access token form, by providing the following values: 
    * **Token name**: `File handler registration tool`
    * **Auth URL**: `https://login.microsoftonline.com/common/oauth2/authorize?resource=https://graph.windows.net`
    * **Access Token URL**: `https://login.microsoftonline.com/common/oauth2/token`
    * **Grant Type**: `Authorization code`
8. Click **Request Token** and sign in as a tenant administrator.
9. After consenting to the permissions, Postman will show you a token for **File handler registration tool**. Select that entry, and change **Add token to** to **Header** and then click **Use Token** to append the new access token.
10. Make a request to find your file handler application manifest, by entering the URL: `https://graph.windows.net/myorganization/applications/?api-version=1.6`.
11. Scan through the API response to locate the app with the **displayName** property matching your file handler application. Note the **objectId** guid for the application (this is different from the appId value used in OAuth flows). You will need this value below.
12. Make a request to add the file handler manifest to your application.
    1. Change the URL to `https://graph.windows.net/myorganization/applications/{applicationObjectId}/addIns?api-version=1.6`. Replace `{applicationObjectId}` with the value obtained previously.
    2. Change the request type to **PUT**.
    3. Click on the **Body** tab, and then select **Raw** and change the **Text** drop down to **JSON**.
    4. Copy and paste the file handler manifest into the body window. The body request needs to be wrapped inside a JSON object, with a **value** array containing the file handler manifest: `{"value": [ { /* manifest here */} ] }`. **Important:** this request will overwrite any existing file handlers or addIns registered for this application. If there are other addIns registered, you need to submit all of the addIns in the same request.
    5. Click **Send** to update the application.
    6. If you see the response status as `204 No Content` then the update was successful.

Now that your file handler manifest has been registered with your application in AAD, you can proceed to building and testing your file handler add-in.

**Note** The **addIns** property is part of the [Azure AD Graph 1.6 schema](https://graph.windows.net/microsoft.com/$metadata?api-version=1.6), so you need to specify 1.6 for the **api-version** parameter, as show in the examples.

**Note** Changes to the addIn manifest many not be immediately applied. The file handlers manifest is cached for performance.
Changes to the file handler manifest can take up to 24 hours to appear.
See [Refresh file handler cache](reset-cache.md) for information about how to force the cache to be cleared for development purposes.


<!-- {
  "type": "#page.annotation",
  "description": "Create a copy of an existing item.",
  "keywords": "copy existing item",
  "section": "documentation",
  "tocPath": "File handlers/Registering"
} -->