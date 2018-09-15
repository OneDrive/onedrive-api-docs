---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Image - OneDrive API
---
# Image resource type

The **Image** resource groups image-related properties into a single structure.
If a [**DriveItem**](driveitem.md) has a non-null **image** facet, the item represents a bitmap image.

**Note:** If the service is unable to determine the width and height of the image, the **Image** resource may be empty.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.image" } -->
```json
{
}
```

## Properties

The presence of the **Image** facet indicates that an item is an image.
There are no additional properties.

## Remarks

This resource is returned on items that are expected to be images based on file extension.

For more information about the facets on a DriveItem, see [DriveItem](driveitem.md).


<!-- {
  "type": "#page.annotation",
  "description": "The image facet describes properties of an image like width and height",
  "keywords": "image,width,height,item,facet",
  "section": "documentation",
  "tocPath": "Facets/Image"
} -->
