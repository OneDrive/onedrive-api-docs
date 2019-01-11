---
author: daspek
ms.author: dspektor
ms.date: 09/14/2017
title: CommentAction - OneDrive API
localization_priority: Normal
---
# CommentAction resource type

The **CommentAction** resource provides information about a comment [activity][] made on an item.

[activity]: itemActivity.md

## JSON representation

<!-- {
  "blockType": "resource",
  "optionalProperties": [ ],
  "@type": "microsoft.graph.commentAction"
}-->

```json
{
  "isReply": false,
  "parentAuthor": {"@odata.type": "microsoft.graph.identitySet"},
  "participants": [{"@odata.type": "microsoft.graph.identitySet"}]
}
```

## Properties

| Property name    | Type                       | Description
|:-----------------|:---------------------------|:-----------------------------
| isReply          | boolean                    | If true, this activity was a reply to an existing comment thread.
| parentAuthor     | [identitySet][]            | The identity of the user who started the comment thread.
| participants     | [identitySet][] collection | The identities of the users participating in this comment thread.

[identitySet]: identitySet.md

## Remarks

Item activity records are currently only available on SharePoint and OneDrive for Business.

<!-- {
  "type": "#page.annotation",
  "description": "The CommentAction object provides information about a comment that was made on an item.",
  "keywords": "activities,activity,action,comment",
  "section": "documentation",
  "tocPath": "Resources/CommentAction"
} -->
