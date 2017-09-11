---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
---
# Deleted facet

The **Deleted** facet indicates that the item on OneDrive has been deleted. In this version
of the API, the presence (non-null) of the facet value indicates that the file was
deleted. A null (or missing) value indicates that the file is not deleted.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.deleted" } -->
```json
{
  "state": "string"
}
```
## Properties

| Property name        | Type    | Description                             |
| -------------------- | ------  | --------------------------------------- |
| **state**            | string  | Describes the delete state of the item. |


<!-- {
  "type": "#page.annotation",
  "description": "The deleted facet providers properties about deleted items",
  "keywords": "deleted,delete,item,facet",
  "section": "documentation",
  "tocPath": "Facets/Deleted"
} -->
