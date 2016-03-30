# Thumbnail resource
The Thumbnail resource type represents a thumbnail for an image, video, document, or any file or folder on OneDrive that
has a graphical representation.

## JSON representation

Here is a JSON representation of a Thumbnail resource.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.thumbnail" } -->
```json
{
  "width": 100,
  "height": 100,
  "url": "url"
}
```
## Properties
The Thumbnail resource has these properties.

| Property name | Type    | Description                                  |
|:--------------|:--------|:---------------------------------------------|
| **width**     | integer | The width of the thumbnail, in pixels.       |
| **height**    | integer | The height of the thumbnail, in pixels.      |
| **url**       | string  | The URL used to fetch the thumbnail content. |


## Relationships

The Item resource has the following relationships defined:

| Relationship name | Type         | Description         |
|:------------------|:-------------|:--------------------|
| **content**       | octet-stream | The content stream. |

<!-- {
  "type": "#page.annotation",
  "description": "Thumbnail resource represents a single thumbnail for an item.",
  "section": "documentation",
  "tocPath": "Resources/Thumbnail"
} -->
