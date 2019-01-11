---
author: daspek
ms.author: dspektor
ms.date: 09/14/2017
title: VersionAction - OneDrive API
localization_priority: Normal
---
# VersionAction resource type

The presence of the **VersionAction** resource on an [**itemActivity**][activity] indicates that the activity caused a new version to be created.

[activity]: itemActivity.md

## JSON representation

<!-- {
  "blockType": "resource",
  "optionalProperties": [ ],
  "@type": "microsoft.graph.versionAction"
}-->

```json
{
  "newVersion": "string"
}
```

## Properties

| Property name | Type   | Description
|:--------------|:-------|:----------------------------------------------------
| newVersion    | string | The name of the new version that was created by this action.

## Remarks

Item activity records are currently only available on SharePoint and OneDrive for Business.

<!-- {
  "type": "#page.annotation",
  "description": "The VersionAction object provides information about an activity that resulted in a new item version.",
  "keywords": "activities,activity,action,version",
  "section": "documentation",
  "tocPath": "Resources/VersionAction"
} -->
