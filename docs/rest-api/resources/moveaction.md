---
author: daspek
ms.author: dspektor
ms.date: 09/14/2017
title: MoveAction - OneDrive API
localization_priority: Normal
---
# MoveAction resource type

The presence of the **MoveAction** resource on an [**itemActivity**][activity] indicates that the activity moved an item.

[activity]: itemActivity.md

## JSON representation

<!-- {
  "blockType": "resource",
  "optionalProperties": [ ],
  "@type": "microsoft.graph.moveAction"
}-->

```json
{
  "from": "string",
  "to": "string"
}
```

## Properties

| Property name | Type   | Description
|:--------------|:-------|:----------------------------------------------------
| from          | string | The name of the location the item was moved from.
| to            | string | The name of the location the item was moved to.

## Remarks

Item activity records are currently only available on SharePoint and OneDrive for Business.

<!-- {
  "type": "#page.annotation",
  "description": "The MoveAction object provides information about an activity that moved an item.",
  "keywords": "activities,activity,action,move,moved",
  "section": "documentation",
  "tocPath": "Resources/MoveAction"
} -->
