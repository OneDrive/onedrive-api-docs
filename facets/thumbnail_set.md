# ThumbnailSet type
The ThumbnailSet type is a keyed collection of [Thumbnail](thumbnail.md) objects.
It is used to represent a set of thumbnails associated with a single file.

### JSON representation

```json
{
  "small": {Thumbnail},
  "medium": {Thumbnail},
  "large": {Thumbnail}
}
```
## Properties

Property Name | Type | Description | Writable
--- | --- | --- | ---
`small` | Thumbnail object | 48x48 cropped thumbnail | No
`medium` | Thumbnail object | 176x176 scaled thumbnail | No
`large` | Thumbnail object | 1920x1920 scaled thumbnail | No
