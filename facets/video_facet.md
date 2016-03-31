# Video facet
The **Video** facet groups video-related data on OneDrive into a single complex type.

It is available on the video property of [Item][item-resource] resources that
represent videos.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.video" } -->
```json
{
  "bitrate": 1234,
  "duration": 1234,
  "height": 720,
  "width": 480
}
```
## Properties

| Property name | Type   | Description                               |
|:--------------|:-------|:------------------------------------------|
| **bitrate**   | number | Bit rate of the video in bits per second. |
| **duration**  | number | Duration of the file in milliseconds.     |
| **height**    | number | Height of the video, in pixels.           |
| **width**     | number | Width of the video, in pixels.            |

[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "The video facet provides information about the properties of a video file.",
  "keywords": "bitrate,duration,size,video",
  "section": "documentation",
  "tocPath": "Facets/Video"
} -->
