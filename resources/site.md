# Site resource

The **site** resource provides metadata and relationships for a SharePoint site.

## Tasks

| Task name            | Example Request                                   |
| :------------------- | :------------------------------------------------ |
| [Get root site][]    | GET /sites/root                                   |
| [Get site][]         | GET /sites/{site-id}                              |
| [Get site by path][] | GET /sites/{hostname}:/{site-path}                |
| [Search for sites][]  | GET /sites?search={query}                         |

[Get site]: ../sites/get.md
[Get root site]: ../sites/get.md
[Get site by path]: ../sites/get-by-path.md
[Search for sites]: ../sites/search.md

## JSON representation

Here is a JSON representation of a **site** resource.

The **driveItem** resource is derived from [**baseItem**](baseItem.md) and inherits properties from that resource.

<!-- { "blockType": "resource",
       "@odata.type": "oneDrive.site",
       "keyProperty": "id",
       "optionalProperties": [ "root", "sharepointIds", "siteCollection", "drive", "drives", "sites" ] } -->

```json
{
  "id": "string",
  "root": { "@odata.type": "oneDrive.root" },
  "sharepointIds": { "@odata.type": "oneDrive.sharepointIds" },
  "siteCollection": {"@odata.type": "oneDrive.siteCollection"},
  "displayName": "string",

  /* relationships */
  "drive": { "@odata.type": "oneDrive.drive" },
  "drives": [ { "@odata.type": "oneDrive.drive" }],
  "items": [ { "@odata.type": "oneDrive.baseItem" }],
  "sites": [ { "@odata.type": "oneDrive.site"} ],

  /* inherited from baseItem */
  "name": "string",
  "createdDateTime": "datetime",
  "description": "string",
  "eTag": "string",
  "lastModifiedDateTime": "datetime",
  "webUrl": "url"
}
```

## Properties

| Property name            | Type                                | Description                                                                                    |
| :----------------------- | :---------------------------------- | :--------------------------------------------------------------------------------------------- |
| **id**                   | string                              | The unique identifier of the item. Read-only.                                                  |
| **createdDateTime**      | DateTimeOffset                      | The date and time the item was created. Read-only.                                             |
| **description**          | string                              | The descriptive text for the site.                                                             |
| **displayName**          | string                              | The full title for the site. Read-only.                                                        |
| **lastModifiedDateTime** | DateTimeOffset                      | The date and time the item was last modified. Read-only.                                       |
| **name**                 | string                              | The name / title of the item.                                                                  |
| **root**                 | [root](../facets/root_facet.md)                     | If present, indicates that this is the root site in the site collection. Read-only.            |
| **sharepointIds**        | [sharepointIds](../facets/sharepointIds_facet.md)   | Returns identifiers useful for SharePoint REST compatibility. Read-only.                       |
| **siteCollection**       | [siteCollection](../facets/siteCollection_facet.md) | Provides details about the site's site collection. Available only on the root site. Read-only. |
| **webUrl**               | string (url)                        | URL that displays the item in the browser. Read-only.                                          |

## Relationships

| Relationship name | Type                     | Description
|:------------------|:-------------------------|:----------------------------------
| **drive**         | [drive][]                | The default drive (document library) for this site.
| **drives**        | Collection([drive][])    | The collection of drives (document libraries) under this site.
| **items**         | Collection([baseItem][]) | Used to address any item contained in this site. This collection cannot be enumerated.
| **sites**         | Collection([site][])     | The collection of the sub-sites under this site.

[baseItem]: baseItem.md
[drive]: drive.md
[identitySet]: identitySet.md
[site]: site.md

<!-- {
  "type": "#page.annotation",
  "description": "",
  "keywords": "",
  "section": "documentation",
  "tocPath": "Sites",
  "tocBookmarks": { "Resources/Site": "#" }
} -->
