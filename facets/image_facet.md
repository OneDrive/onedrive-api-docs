# ImageFacet type
ImageFacet groups bitmap image related data, including photo EXIF metadata,
into a single structure.
It is available on the image property of [Item][item-resource] resources that have
associated bitmaps.

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.image" } -->
```json
{
	"width": 100,
	"height": 200,
	"dotsPerInch": 72,
	"bitsPerPixel": 8
}
```

## Properties
| Property Name             | Type      | Description                                        | Notes |
|:--------------------------|:----------|:---------------------------------------------------|:------|
| `width`                   | integer   | Pixel width of the image                           |       |
| `height`                  | integer   | Pixel height of the image                          |       |
| `dotsPerInch`             | integer   | Number of pixels that make up one inch             |       |
| `bitsPerPixel`            | integer   | Color depth for each pixel of the image            |       |

[item-resource]: ../resources/item.md


