---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: conceptual
title: Add custom actions to files - OneDrive
localization_priority: Normal
---
# Specifying actions for file handlers 2.0

When registering a file handler, you specify a set of actions enabled by the file handler.

There are three built-in actions that a file handler can choose to support:

* `newFile`: File type appears in the **New** menu in OneDrive and SharePoint.
* `open`: Files can be opened by the file handler, which appears in the **Open** menu in OneDrive and SharePoint. Open actions are launched in a new browser tab.
* `preview`: Files can be previewed by the file handler. Preview occurs when the user left-clicks on a file in OneDrive and SharePoint. Preview actions are loaded in an `<IFRAME>` element inside the OneDrive and SharePoint websites.

Additional file handlers support a `custom` action type which allows a file handler to create application defined actions.
These additional actions appear in the toolbar in OneDrive and SharePoint, and can be added to any file extension.

## Defining actions in the file handler manifest

Actions are defined in the file handler manifest within the **actions** key-value pair, which contains an array of actions supported by the file handler.

An example of the definition for the three built-in actions and a single custom action:

<!-- {"blockType": "example",
      "name": "list-file-handler-actions",
      "@odata.type": "microsoft.graph.driveAppAction",
      "isCollection": true,
      "truncated": true
      } -->

```json
[
    {
        "type": "newFile",
        "url": "https://url/for/endpoint",
        "availableOn": {
            "file": { "extensions": [".bin"] },
            "web": { }
        }
    },
    {
        "type": "open",
        "url": "https://url/for/endpoint",
        "availableOn": {
            "file": { "extensions": [".bin"] },
            "web": { }
        }
    },
    {
        "type": "preview",
        "url": "https://url/for/endpoint",
        "availableOn": {
            "file": { "extensions": [".bin"] },
            "web": { }
        }
    },
    {
        "type": "custom",
        "url": "https://url/for/endpoint",
        "displayName": "Add Signature with Contoso",
        "shortDisplayName": "Add Signature",
        "icon": {
            "png1x": "https://url/for/icon.png"
        },
        "availableOn": {
            "file": { "extensions": ["*"] },
            "folder": { },
            "allowMultiSelect": true,
            "web": { }
        }
    }
]
```

Due to limitations in the Azure Active Directory addIn extensions, these actions are stored serialized into a string.
It is recommended that you JSON minify the array before converting it to a string value to store in the manifest.

For example, the actions defined above would be stored in the file handler manifest like this:

<!-- { "blockType": "example",
       "name": "file-handler-encoding-example",
       "@odata.type": "oneDriveAddins.fileHandlerManifest",
       "truncated": true } -->

```json
{
    "type": "FileHandler",
    "properties": [
        {
            "key": "version",
            "value": "2"
        },
        {
            "key": "actions",
            "value": "[{\"type\":\"newFile\",\"url\":\"https://url/for/endpoint\",\"availableOn\":{\"file\":{\"extensions\":[\".bin\"]},\"web\":{}}},{\"type\":\"open\",\"url\":\"https://url/for/endpoint\",\"availableOn\":{\"file\":{\"extensions\":[\".bin\"]},\"web\":{}}},{\"type\":\"preview\",\"url\":\"https://url/for/endpoint\",\"availableOn\":{\"file\":{\"extensions\":[\".bin\"]},\"web\":{}}},{\"type\":\"custom\",\"url\":\"https://url/for/endpoint\",\"displayName\":\"Add Signature with Contoso\",\"shortDisplayName\":\"Add Signature\",\"icon\":{\"png1x\":\"https://url/for/icon.png\"},\"availableOn\":{\"file\":{\"extensions\":[\"*\"]},\"folder\":{},\"allowMultiSelect\":true,\"web\":{}}}]"
        }
    ]
}
```

## Action parameters

Each action declared in the action parameter takes the following shape:

<!-- { "blockType": "resource", "@odata.type": "microsoft.graph.driveAppAction" } -->

```json
{
    "type": "newFile | open | preview | custom",
    "url": "url",
    "displayName": "string",
    "shortDisplayName": "string",
    "icon": { 
        "@odata.type": "microsoft.graph.displayIcon",
        "svg": "url",
        "png1x": "url",
        "png1_5x": "url",
        "png2x": "url"
    },
    "availableOn": {
        "@odata.type": "microsoft.graph.availableOn",
        "file": {
            "@odata.type": "microsoft.graph.availableOnFile",
            "extensions": [ ".pdf", ".png", ".psd" ]
        },
        "folder": {
            "@odata.type": "microsoft.graph.availableOnFolder"
        },
        "allowMultiSelect": false,
        "web": { "@odata.type": "microsoft.graph.availableOnWeb" }
    }
}
```

## Properties

Not all properties are required, depending on the type of action specified.

| Parameter name | Type   | Description                                                                          |
| -------------- | ------ | ------------------------------------------------------------------------------------ |
| type           | string | A value of `newFile`, `open`, or `preview`. Required.                                |
| url            | URL    | An `https://` URL for the endpoint that handles the file handler action. Required.   |
| displayName    | string | A default locale string used for `type: "custom"` to represent the action. Optional. |
| shortDisplayName    | string | A default locale string used for `type: "custom"` to represent the action in the toolbar or collapsed action menu. Optional. |
| availableOn    | object | A collection of properties the define where this action is available. Required.      |
| icon           | displayIcon | An object containing URLs to icon images for this file type. Optional. |

* The `displayName` property is only applicable to actions of type `custom` and is ignored for actions of any other type.

### AvailableOn Properties

By setting properties within the  **availableOn** property, you can customize where the action is available:

| Parameter name   | Type             | Description                                                                                                                                                                                                                          |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| file.extensions  | array of strings | An array of the file extensions the action is available on. File extensions must start with a period (.). A wildcard character `*` can be used to indicate all file extensions for custom actions.                                   |
| folder           | object           | An object with no parameters indicates that the file handler is available when a folder is selected or when no files are selected. A null value or the property not being defined indicates the action is not available for folders. |
| allowMultiSelect | boolean          | If `true`, multiple files can be selected and the action will still be displayed. If `false` or missing, the action is only displayed when a single item is selected.                                                                |
| web              | object           | An object with no parameters indicates that the file handler is available when browsing the website. |

* Only one file extension can be specified for actions of type `newFile`. This is the extension the newly created file will have. If multiple file extensions are listed, only the first file extension will be used.
* The `folder` and `allowMultiSelect` properties are only applicable to actions of type `custom`. These values are ignored for actions of any other type.


<!-- {
  "type": "#page.annotation",
  "description": "Create a copy of an existing item.",
  "keywords": "copy existing item",
  "section": "documentation",
  "suppressions": [
    "Warning: /docs/file-handlers/define-actions.md:
      Found potential enums in resource example that weren't defined in a table:(newFile,open,preview,custom) are in resource, but () are in table",
    "Error: microsoft.graph.driveAppAction/folder:
      Referenced type microsoft.graph.object is not defined in the doc set! Potential suggestion: UNKNOWN",
    "Error: microsoft.graph.driveAppAction/web:
      Referenced type microsoft.graph.object is not defined in the doc set! Potential suggestion: UNKNOWN",
    "Warning: /docs/file-handlers/define-actions.md/microsoft.graph.driveAppAction:
      Property 'file.extensions' found in markdown table but not in resource definition.",
    "Warning: /docs/file-handlers/define-actions.md/microsoft.graph.driveAppAction:
      Property 'folder' found in markdown table but not in resource definition.",
    "Warning: /docs/file-handlers/define-actions.md/microsoft.graph.driveAppAction:
      Property 'allowMultiSelect' found in markdown table but not in resource definition.",
    "Warning: /docs/file-handlers/define-actions.md/microsoft.graph.driveAppAction:
      Property 'web' found in markdown table but not in resource definition.",
    "Warning: /docs/file-handlers/define-actions.md/microsoft.graph.driveAppAction/availableOn:
      Type mismatch between example and table. Parameter name: availableOn; example type: (microsoft.graph.availableOn); table type: (microsoft.graph.object)"
  ],
  "tocPath": "File handlers/Defining actions"
} -->
