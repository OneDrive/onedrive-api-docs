---
author: daspek
ms.author: dspektor
ms.date: 09/14/2017
title: DeleteAction - OneDrive API
localization_priority: Normal
---
# DeleteAction resource type

The presence of the **DeleteAction** resource on an [**itemActivity**][activity] indicates that the activity deleted an item.

[activity]: itemActivity.md

## JSON representation

<!-- {
  "blockType": "resource",
  "optionalProperties": [ ],
  "@type": "microsoft.graph.deleteAction"
}-->

```json
{
  "name": "string",
  "objectType": "File | Folder"
}
```

## Properties

| Property name | Type   | Description
|:--------------|:-------|:----------------------------------------------------
| name          | string | The name of the item that was deleted.
| objectType    | string | `File` or `Folder`, depending on the type of the deleted item.

## Remarks

Item activity records are currently only available on SharePoint and OneDrive for Business.

<!-- {
  "type": "#page.annotation",
  "description": "The DeleteAction object provides information about the deletion of an item.",
  "keywords": "activities,activity,action,delete,deletion",
  "section": "documentation",
  "suppressions": [
    "Warning: /resources/deleteAction.md:
      Found potential enums in resource example that weren't defined in a table:(File,Folder) are in resource, but () are in table"
  ],
  "tocPath": "Resources/DeleteAction"
} -->
