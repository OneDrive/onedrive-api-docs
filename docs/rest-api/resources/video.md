---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Video - OneDrive API
---
# Video resource type

The **Video** resource groups video-related data items into a single structure.

If a [**DriveItem**](driveitem.md) has a non-null **video** facet, the item represents a video file.
The properties of the **Video** resource are populated by extracting metadata from the file.

## JSON representation

Here is a JSON representation of the resource

<!-- {
  "blockType": "resource",
  "optionalProperties": [  ],
  "@odata.type": "oneDrive.video"
}-->

```json
{
}
```

## Properties

The presence of the **Video** facet indicates that the item is a video.
There are no additional properties.

[item-resource]: ../resources/driveitem.md

## Remarks

This resource is returned on items that are expected to be videos based on file extension.

For more information about the facets on a DriveItem, see [DriveItem](driveitem.md).

<!-- {
  "type": "#page.annotation",
  "description": "The video facet provides information about the properties of a video file.",
  "keywords": "bitrate,duration,size,video",
  "section": "documentation",
  "tocPath": "Facets/Video"
} -->
