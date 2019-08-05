---
author: danade
ms.author: danade
ms.date: 07/17/2019
title: PendingOperations - OneDrive API
localization_priority: Normal
---
# PendingOperations resource type

The **pendingOperations** resource indicates that one or more operations that may affect the state of the DriveItem are pending completion.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "microsoft.graph.pendingOperations" } -->
```json
{
  "pendingContentUpdate": { "@odata.type": "microsoft.graph.pendingContentUpdate" }
}
```

## Properties

| Property Name       | Type                    | Description                                                                                                 |
|:--------------------|:------------------------|:------------------------------------------------------------------------------------------------------------|
| pendingContentUpdate | [pendingContentUpdate][] | A property indicating that an operation that may update the binary content of a file is pending completion. |

## Remarks 

For more information about the facets on a DriveItem, see [DriveItem](driveitem.md).

[pendingContentUpdate]:pendingcontentupdate.md

<!-- {
  "type": "#page.annotation",
  "description": "The pendingOperations resource indicates that an operation that may affect the state of the DriveItem is pending completion.",
  "keywords": "pendingoperations, pendingoperations, operation, pendingcontentupdate",
  "section": "documentation",
  "tocPath": "Facets/PendingOperations"
} -->
