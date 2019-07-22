---
author: danade
ms.author: danade
ms.date: 07/17/2019
title: PendingOperations - OneDrive API
localization_priority: Normal
---
# PendingOperations resource type

The **pendingOperaitons** resource indicates that one or more operations that may affect the state of the DriveItem are pending completion.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "microsoft.graph.pendingOperations" } -->
```json
{
  "pendingBinaryUpdate": { "@odata.type": "microsoft.graph.pendingBinaryUpdate" }
}
```

## Properties

| Property Name       | Type                    | Description                                                                                                 |
|:--------------------|:------------------------|:------------------------------------------------------------------------------------------------------------|
| pendingBinaryUpdate | [pendingBinaryUpdate][] | A property indicating that an operation that may update the binary content of a file is pending completion. |

## Remarks 

For more information about the facets on a DriveItem, see [DriveItem](driveitem.md).

[pendingBinaryUpdate]:pendingbinaryupdate.md

<!-- {
  "type": "#page.annotation",
  "description": "The pendingOperations resource indicates that an operation that may affect the state of the DriveItem is pending completion.",
  "keywords": "pendingoperations, pendingoperations, operation, pendingbinaryupdate",
  "section": "documentation",
  "tocPath": "Facets/PendingOperations"
} -->
