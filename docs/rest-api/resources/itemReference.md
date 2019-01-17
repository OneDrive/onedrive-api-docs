---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: ItemReference - OneDrive API
localization_priority: Normal
---
# ItemReference resource type

The **ItemReference** resource provides information necessary to address a [DriveItem](driveitem.md) via the API.

## JSON representation

Here is a JSON representation of the resource

<!-- {
  "blockType": "resource",
  "optionalProperties": [ "path", "shareId", "sharepointIds" ],
  "@odata.type": "microsoft.graph.itemReference"
}-->

```json
{
  "driveId": "string",
  "driveType": "personal | business | documentLibrary",
  "id": "string",
  "listId": "string",
  "name": "string",
  "path": "string",
  "shareId": "string",
  "sharepointIds": { "@odata.type": "microsoft.graph.sharepointIds" },
  "siteId": "string"
}
```

## Properties

| Property      | Type              | Description
|:--------------|:------------------|:-----------------------------------------
| driveId       | String            | Identifier of the drive instance that contains the item. Read-only.
| driveType     | String            | Identifies the type of drive. See [drive][] resource for values.
| id            | String            | Identifier of the item in the drive. Read-only.
| listId        | String            | Identifier of the [list][]. Read-only.
| name          | String            | The name of the item being referenced. Read-only.
| path          | String            | Path that can be used to navigate to the item. Read-only.
| shareId       | String            | Identifier for a shared resource that can be accessed via the [Shares][] API.
| sharepointIds | [sharepointIds][] | Identifiers useful for SharePoint REST compatibility. Read-only.
| siteId        | String            | Identifier of the [site][]. Read-only.

[drive]: ../resources/drive.md
[list]: ../resources/list.md
[sharepointIds]: ../resources/sharepointids.md
[Shares]: ../api/shares_get.md
[site]: ../resources/site.md

## Remarks

To address a **driveItem** from an **itemReference** resource, construct a URL of the format:

```http
GET https://graph.microsoft.com/v1.0/drives/{driveId}/items/{id}
```

The **path** value is an API path relative to the target drive, for example: `/drive/root:/Documents/myfile.docx`.

To retrieve the human-readable path for a breadcrumb, you can safely ignore everything up to the first `:` in the path string.

<!-- uuid: 8fcb5dbc-d5aa-4681-8e31-b001d5168d79
2015-10-25 14:57:30 UTC -->
<!-- {
  "type": "#page.annotation",
  "description": "ItemReference returns a pointer to another item.",
  "section": "documentation",
  "suppressions": [
    "Warning: /api-reference/v1.0/resources/itemreference.md:
      Found potential enums in resource example that weren't defined in a table:(personal,business,documentLibrary) are in resource, but () are in table"
  ],
  "tocPath": "Resources/ItemReference"
} -->
