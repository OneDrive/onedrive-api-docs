# ThumbnailSet type
The ThumbnailSet type is a keyed collection of [Thumbnail](thumbnail.md) objects.
It is used to represent a set of thumbnails associated with a single file.

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.thumbnailSet" } -->
```json
{
  "small": { "@odata.type": "oneDrive.thumbnail" },
  "medium": { "@odata.type": "oneDrive.thumbnail" },
  "large": { "@odata.type": "oneDrive.thumbnail" }
}
```
## Properties

Property Name | Type | Description | Writable
--- | --- | --- | ---
`small` | Thumbnail object | 48x48 cropped thumbnail | No
`medium` | Thumbnail object | 176x176 scaled thumbnail | No
`large` | Thumbnail object | 1920x1920 scaled thumbnail | No
