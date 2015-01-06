# VideoFacet type
VideoFacet groups video related data into a single structure.
It is available on the video property of [Item][item-resource] resources that
have associated video.

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.video" } -->
```json
{
  "bitrate": 1234,
  "duration": 1234,
  "height": 720,
  "width": 480,
  "codac": "string"
}
```
## Properties
Property Name | Type | Description | Notes
---|---|---|---
`bitrate` | `int` | bit rate of the video in bits per second |

>TODO: finish properties

[item-resource]: ../resources/item.md
