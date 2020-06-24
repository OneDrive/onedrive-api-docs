---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: File handler resource definitions
localization_priority: Normal
---
# Resource definitions for file handlers 2.0

The following resource definitions are used for documentation testing on the OneDrive API documentation.


## oneDriveAddins.fileHandlerManifest

<!-- { "blockType": "resource", "@type": "oneDriveAddins.fileHandlerManifest" } -->

```json
{
    "id": "guid",
    "type": "FileHandler",
    "properties": [
        { "@type": "oneDriveAddins.keyValuePair" }
    ]
}
```

## oneDriveAddins.keyValuePair

<!-- { "blockType": "resource", "@type": "oneDriveAddins.keyValuePair" } -->

```json
{
    "key": "version | fileTypeDisplayName | fileTypeIcon | appIcon | actions",
    "value": "string"
}
```

## DriveApp

<!-- { "blockType": "resource", 
       "@odata.type": "microsoft.graph.driveApp",
       "keyProperty": "id" } -->

```json
{
  "id": "guid",
  "application": { "@odata.type": "microsoft.graph.identity" },
  "fileHandler": { "@odata.type": "microsoft.graph.fileHandler" },
  "actions":
  [
    { "@odata.type": "microsoft.graph.driveAppAction" },
    { "@odata.type": "microsoft.graph.driveAppAction" },
    { "@odata.type": "microsoft.graph.driveAppAction" }
  ]
}
```

## AvailableOn

<!-- { "blockType": "resource", "@odata.type": "microsoft.graph.availableOn" } -->

```json
{
    "file": { "@odata.type": "microsoft.graph.availableOnFile" },
    "folder": { "@odata.type": "microsoft.graph.availableOnFolder" },
    "web": { "@odata.type": "microsoft.graph.availableOnWeb" },
    "allowMultiSelect": false
}
```

## AvailableOnFile

<!-- { "blockType": "resource", "@odata.type": "microsoft.graph.availableOnFile",
       "optionalProperties": [ "
       parameters" ] } -->
```json
{
    "extensions": [ ".jpg", ".png" ]
}
```

## AvailableOnFolder

<!-- { "blockType": "resource", "@odata.type": "microsoft.graph.availableOnFolder" } -->

```json
{

}
```

## AvailableOnWeb

<!-- { "blockType": "resource", "@odata.type": "microsoft.graph.availableOnWeb" } -->

```json
{

}
```

## DisplayIcon

<!-- { "blockType": "resource", "@odata.type": "microsoft.graph.displayIcon" } -->

```json
{
    "svg": "url",
    "png1x": "url",
    "png1_5x": "url",
    "png2x": "url"
}
```

## FileHandler

<!-- { "blockType": "resource", "@odata.type": "microsoft.graph.fileHandler" } -->

```json
{

}
```

<!-- {
  "type": "#page.annotation",
  "suppressions": [
    "Warning: /docs/file-handlers/resources.md:
      Found potential enums in resource example that weren't defined in a table:(version,fileTypeDisplayName,fileTypeIcon,appIcon,actions) are in resource, but () are in table",
    "Warning: /docs/file-handlers/resources.md:
      Multiple resources found in file, but we only support one per file. 'oneDriveAddins.fileHandlerManifest,oneDriveAddins.keyValuePair,microsoft.graph.driveApp,microsoft.graph.availableOn,microsoft.graph.availableOnFile,microsoft.graph.availableOnFolder,microsoft.graph.availableOnWeb,microsoft.graph.displayIcon,microsoft.graph.fileHandler'. Skipping.",
    "Warning: fileHandlerManifest:
      Type fileHandlerManifest: Property properties has a different Type value than documentation (Collection(Edm.Object),Collection(oneDriveAddins.keyValuePair))."
  ]
} -->
