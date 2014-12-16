# Thumbnail resource type
Represents a thumbnail for an image, video, document, or any file or folder that
may have a graphical representation.

## JSON representation
<br/> (ODB-Support: coming soon)

```json
{
	"width": {integer},
	"height": {integer},
	"id": {string},
	"url": {string}
}
```
### Properties
Name | Type | Description
--- | --- | ---
`width` | `integer` | The width of the thumbnail, in pixels.
`height` | `integer` | The height of the thumbnail, in pixels.
`id` | `string` | The [descriptor](../misc/thumbnail_descriptor.md) of the thumbnail, along with a trailing number used for uniqueness if multiple of the same are returned (E.g. for folder cover images). The first thumbnail of a set will not have a trailing number, while the second will start at 2.
`url` | `string` | The URL that can be used to fetch the thumbnail content.


## Relationships

The Item resource has the following relationships defined:

Relationship name | Type | Description
--- | --- | ---
`content` | `octet-stream` | The content stream.
