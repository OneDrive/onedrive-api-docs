# Image facet

The **Image** groups image-related data on OneDrive into a single structure.

It is available on the image property of [Item][item-resource] resources that
represent images.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.image" } -->
```json
{
  "width": 100,
  "height": 200
}
```

## Properties
| Property name | Type    | Description                     |
|:--------------|:--------|:--------------------------------|
| **width**     | integer | Width of the image, in pixels.  |
| **height**    | integer | Height of the image, in pixels. |

## Remarks

In OneDrive for Business, this facet is returned on items that are expected to be images. This facet has no properties in OneDrive for Business.

[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "The image facet describes properties of an image like width and height",
  "keywords": "image,width,height,item,facet",
  "section": "documentation",
  "tocPath": "Facets/Image"
} -->
