---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
---
# Root facet

The **Root** facet indicates that the item is the top-most item within a drive container.
The presence (non-null) of the facet value indicates that the driveItem is the root.
A null (or missing) value indicates the driveItem is not the root..

**Note**: While this facet is empty today, in future API revisions the facet may be populated with additional properties.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.root" } -->

```json
{
}
```

## Properties

None. This facet is a null or not-null value and contains no properties.

<!-- {
  "type": "#page.annotation",
  "section": "documentation",
  "tocPath": "Facets/Root"
} -->
