---
author: JeremyKelley
ms.author: JeremyKe
ms.date: 09/10/2017
ms.topic: conceptual
topic: Register a file handler with Azure Active Directory
ms.localizationpriority: Medium
---
# How to: Register a file handler add-in manually

To develop a file handler add-in you first need to upload your file handler manifest into your app registration in Azure Active Directory. This can be done programmatically or through the Azure Active Directory app manifest editor.

## App manifest and the addIns property

File handler manifests are stored along side your app manifest in Azure Active Directory.
The **addIns** property of the app manifest lists the add-in components of an application, like file handlers, and their associated properties.

The manifest is made up of a set of key-value properties, which define the properties of the file handler. For more information about the file handler manifest, see [File handler overview](index.md).

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

## Updating App Manifest in AAD

This method requires you to [update the JSON manifest directly in AAD](https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-app-manifest).

1. Navigate to the application in Azure Active Directory
2. Select the "Manifest" left menu option
3. Paste your File Handler Add-In JSON into the "addIns" array as shown below:

```JSON
{
	"id": "9280aaa1-65c3-4a01-9ced-4f3e8e989c56",
	"acceptMappedClaims": null,
	"accessTokenAcceptedVersion": 2,
	"addIns": [
		{
			"id": "328486ea-7159-4b6a-a2aa-f036b2423b23",
			"type": "FileHandler",
			"properties": [
				{
					"key": "version",
					"value": "2"
				},
				{
					"key": "fileTypeDisplayName",
					"value": "Contoso Markdown"
				},
				{
					"key": "fileTypeIcon",
					"value": "{\"svg\":\"https://localhost:3000/images/icons/icon.svg\",\"png1x\":\"https://localhost:3000/images/icons/icon@1x.png\",\"png1.5x\":\"https://localhost:3000/images/icons/icon@1.5x.png\",\"png2x\":\"https://localhost:3000/images/icons/icon@2x.png\"}"
				},
				{
					"key": "appIcon",
					"value": "{\"svg\":\"https://localhost:3000/images/icons/app-icon.svg\",\"png1x\":\"https://localhost:3000/images/icons/app-icon@1x.png\",\"png1.5x\":\"https://localhost:3000/images/icons/app-icon@1.5x.png\",\"png2x\":\"https://localhost:3000/images/icons/app-icon@2x.png\"}"
				},
				{
					"key": "actions",
					"value": "[{\"type\":\"newFile\",\"url\":\"https://localhost:3000/markdown/create\",\"availableOn\":{\"file\":{\"extensions\":[\".md\"]},\"web\":{}}},{\"type\":\"open\",\"url\":\"https://localhost:3000/markdown/edit\",\"availableOn\":{\"file\":{\"extensions\":[\".md\"]},\"web\":{}}},{\"type\":\"preview\",\"url\":\"https://localhost:3000/markdown/preview\",\"availableOn\":{\"file\":{\"extensions\":[\".md\"]},\"web\":{}}}]"
				}
			]
		}
	],
  "allowPublicClient": true,
  remainder omitted...
}
```

4. Select "Save" from the top menu bar

## Using Microsoft Graph to Register a File Handler

You can programmatically update an AAD Application Registration to add the File Handler manifest. This requires two existing applications - the File Handler application and an application with `Directory.ReadWrite.All` permissions to allow updates to the File Handler registration.

1. You will need to acquire a bearer token to access Microsoft Graph. To read more about token please see the [AAD tokens docs](https://docs.microsoft.com/en-us/azure/databricks/dev-tools/api/latest/aad/). This token must include the `Directory.ReadWrite.All` permissions as mentioned above.

2. Note the __Object ID__ of the application that represents the file handler registration into which the manifest will be injected. This can be found on the "Overview" page of the application registration and is different from the Application Id.

3. Now using the token from step 1 and the Object ID from step 2 you can make a PUT request to `https://graph.microsoft.com/v1.0/applications/${objectId}/addIns` including the manifest in the body as shown.

```
PUT https://graph.microsoft.com/v1.0/applications/${objectId}/addIns HTTP/1.1
Authorization: Bearer ${AAD Token}
Accept: application/json
Content-Type: application/json

{
  "value": [{
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
  }]
}
```

Now that your file handler manifest has been registered with your application in AAD, you can proceed to building and testing your file handler add-in.

> [!NOTE]
> You can see a full example of acquiring a token, creating an application, and registering the file handler add-in in the [Nodejs sample's tools](https://github.com/pnp/contoso/blob/main/filehandler/tools/local-setup/index.ts).

> [!IMPORTANT]
> Changes to the file handler manifest can take 24-48 hours to appear. See [Refresh file handler cache](reset-cache.md) for information about how to force the cache to be cleared for development purposes.

<!-- {
  "type": "#page.annotation",
  "description": "Create a copy of an existing item.",
  "keywords": "copy existing item",
  "section": "documentation",
  "tocPath": "File handlers/Registering"
} -->
