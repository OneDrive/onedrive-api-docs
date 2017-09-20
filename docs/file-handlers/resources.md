---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: File handler resource definitions
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
       "@odata.type": "oneDrive.driveApp",
       "keyProperty": "id" } -->

```json
{
  "id": "guid",
  "application": { "@odata.type": "oneDrive.identity" },
  "fileHandler": { "@odata.type": "oneDrive.fileHandler" },
  "actions":
  [
    { "@odata.type": "oneDrive.driveAppAction" },
    { "@odata.type": "oneDrive.driveAppAction" },
    { "@odata.type": "oneDrive.driveAppAction" }
  ]
}
```

## AvailableOn

<!-- { "blockType": "resource", "@odata.type": "oneDrive.availableOn" } -->

```json
{
    "file": { "@odata.type": "oneDrive.availableOnFile" },
    "folder": { "@odata.type": "oneDrive.availableOnFolder" },
    "allowMultiSelect": false
}
```

## AvailableOnFile

<!-- { "blockType": "resource", "@odata.type": "oneDrive.availableOnFile",
       "keyProperty": "id", "optionalProperties": [ "
       parameters" ] } -->
```json
{
    "extensions": [ ".jpg", ".png" ]
}
```

## AvailableOnFolder

<!-- { "blockType": "resource", "@odata.type": "oneDrive.availableOnFolder" } -->

```json
{

}
```

## DisplayIcon

<!-- { "blockType": "resource", "@odata.type": "oneDrive.displayIcon" } -->

```json
{
    "svg": "url",
    "png1x": "url",
    "png1_5x": "url",
    "png2x": "url"
}
```