# ThumbnailSet resource
The ThumbnailSet resource is a keyed collection of [Thumbnail](thumbnail.md) objects.
It is used to represent a set of thumbnails associated with a single file on OneDrive.

## JSON representation
Here is a JSON representation of a ThumbnailSet type.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.thumbnailSet",
       "optionalProperties": ["source", "small", "medium", "large"],
       "openType": true } -->
```json
{
  "id": "0",
  "small": { "@odata.type": "oneDrive.thumbnail" },
  "medium": { "@odata.type": "oneDrive.thumbnail" },
  "large": { "@odata.type": "oneDrive.thumbnail" },
  "source": { "@odata.type": "oneDrive.thumbnail" }
}
```
## Properties
The ThumbnailSet type has these properties.

| Property name | Type             | Description                                                                       |
|:--------------|:-----------------|:----------------------------------------------------------------------------------|
| **id**        | string           | The id within the item.                                                           |
| **small**     | Thumbnail object | A 48x48 cropped thumbnail.                                                        |
| **medium**    | Thumbnail object | A 176x176 scaled thumbnail.                                                       |
| **large**     | Thumbnail object | A 1920x1920 scaled thumbnail.                                                     |
| **source**    | Thumbnail object | A custom thumbnail image or the original image used to generate other thumbnails. |

<!-- {
  "type": "#page.annotation",
  "description": "ThumbnailSet enables access to thumbnails of different sizes",
  "section": "documentation",
  "tocPath": "Resources/Thumbnail set"
} -->
