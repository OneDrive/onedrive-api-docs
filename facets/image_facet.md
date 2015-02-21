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

[item-resource]: ../resources/item.md
