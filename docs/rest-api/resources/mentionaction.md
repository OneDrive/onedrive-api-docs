---
author: daspek
ms.author: dspektor
ms.date: 09/14/2017
title: MentionAction - OneDrive API
---
# MentionAction resource type

The **MentionAction** resource provides information about an [activity][] that mentioned people.

[activity]: itemActivity.md

## JSON representation

<!-- {
  "blockType": "resource",
  "optionalProperties": [ ],
  "@type": "microsoft.graph.mentionAction"
}-->

```json
{
  "mentionees": [{"@odata.type": "microsoft.graph.identitySet"}]
}
```

## Properties

| Property name | Type                       | Description
|:--------------|:---------------------------|:-----------------------------
| mentionees    | [identitySet][] collection | The identities of the users mentioned in this action.

[identitySet]: identitySet.md

## Remarks

Item activity records are currently only available on SharePoint and OneDrive for Business.

<!-- {
  "type": "#page.annotation",
  "description": "The MentionAction object provides information about who was mentioned during an activity.",
  "keywords": "activities,activity,action,mention",
  "section": "documentation",
  "tocPath": "Resources/MentionAction"
} -->
