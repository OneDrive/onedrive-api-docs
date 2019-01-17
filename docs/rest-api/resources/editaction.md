---
author: daspek
ms.author: dspektor
ms.date: 09/14/2017
title: EditAction - OneDrive API
localization_priority: Normal
---
# EditAction resource type

The presence of the **EditAction** resource on an [**itemActivity**][activity] indicates that the activity edited an item.

**Note**: While this resource is empty today, in future API revisions it may be populated with additional properties.

[activity]: itemActivity.md

## JSON representation

<!-- {
  "blockType": "resource",
  "optionalProperties": [ ],
  "@type": "microsoft.graph.editAction"
}-->

```json
{
}
```

## Properties

None. This facet is a null or not-null value and contains no properties.

## Remarks

Item activity records are currently only available on SharePoint and OneDrive for Business.

<!-- {
  "type": "#page.annotation",
  "description": "The EditAction object provides information about an activity that edited an item.",
  "keywords": "activities,activity,action,edit,modify",
  "section": "documentation",
  "tocPath": "Resources/EditAction"
} -->
