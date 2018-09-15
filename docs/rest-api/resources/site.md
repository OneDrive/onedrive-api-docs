---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Site - OneDrive API
---
# Working with SharePoint site resources

The SharePoint API supports the following core scenarios:

* Access to SharePoint **sites**, **lists**, and **drives** (document libraries)
* Read-only support for **site** resources (no ability to create new sites)
* Read-write support for **lists**, **listItems**, and **driveItems**
* Address resources by SharePoint ID, URL, or relative path

The SharePoint API exposes three major resource types:

* [Site](site.md) _(this object)_
* [List](list.md)
* [ListItem](listitem.md)

## Tasks

All examples below are relative to `https://sp-my.contoso.com/_api/v2.0`.

| Task name                                                     | Example Request                    |
| :------------------------------------------------------------ | :--------------------------------- |
| [Get root site][]                                             | GET /sites/root                    |
| [Get site][]                                                  | GET /sites/{site-id}               |
| [Get site by path][]                                          | GET /sites/{hostname}:/{site-path} |
| [Search for sites][]                                          | GET /sites?search={query}          |
| [Access the default document library for a site][]            | GET /sites/{site-id}/drive         |
| [Enumerate the collection of document libraries under site][] | GET /sites/{site-id}/drives        |
| [Enumerate the lists under a site][]                          | GET /sites/{site-id}/lists         |
| [Search for sites][]           | GET /sites?search={query}

[Get site]: ../api/site_get.md
[Get root site]: ../api/site_get.md
[Get site by path]: ../api/site_getbypath.md
[Get site for a group]: ../api/site_get.md
[Search for sites]: ../api/site_search.md
[Access the default document library for a site]: ../api/drive_get.md
[Enumerate the collection of document libraries under site]: ../api/drive_list.md
[Enumerate the lists under a site]: ../api/list_list.md

Sites can also be addressed by path by using the SharePoint hostname, followed by a colon and the relative path to the site.
You can optionally transition back to addressing the resource model by putting another colon at the end.

| Path                                           | Description
|:-----------------------------------------------|:-----------------------------------
| /sites/sp.contoso.com:/teams/hr        | The site associated with https://sp.contoso.com/teams/hr
| /sites/sp.contoso.com:/teams/hr:/drive | Access the default [drive](drive.md) for this site.

## JSON representation

Here is a JSON representation of a **site** resource.

The **site** resource is derived from [**baseItem**](baseitem.md) and inherits properties from that resource.

<!--{
  "blockType": "resource",
  "optionalProperties": [
    "root",
    "sharepointIds",
    "siteCollection",
    "drive",
    "drives",
    "sites"
  ],
  "keyProperty": "id",
  "baseType": "oneDrive.baseItem",
  "@odata.type": "oneDrive.site"
}-->

```json
{
  "id": "string",
  "root": { "@odata.type": "oneDrive.root" },
  "sharepointIds": { "@odata.type": "oneDrive.sharepointIds" },
  "siteCollection": {"@odata.type": "oneDrive.siteCollection"},
  "displayName": "string",

  /* relationships */
  "contentTypes": [ { "@odata.type": "oneDrive.contentType" }],
  "drive": { "@odata.type": "oneDrive.drive" },
  "drives": [ { "@odata.type": "oneDrive.drive" }],
  "items": [ { "@odata.type": "oneDrive.baseItem" }],
  "lists": [ { "@odata.type": "oneDrive.list" }],
  "sites": [ { "@odata.type": "oneDrive.site"} ],
  "columns": [ { "@odata.type": "oneDrive.columnDefinition" }],

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

| Property name            | Type               | Description
|:-------------------------|:-------------------|:-----------------------------
| **id**                   | string             | The unique identifier of the item. Read-only.
| **createdDateTime**      | DateTimeOffset     | The date and time the item was created. Read-only.
| **description**          | string             | The descriptive text for the site.
| **eTag**                 | string             | ETag for the item. Read-only.                                                                  |
| **displayName**          | string             | The full title for the site. Read-only.
| **lastModifiedDateTime** | DateTimeOffset     | The date and time the item was last modified. Read-only.
| **name**                 | string             | The name / title of the item.
| **root**                 | [root][]           | If present, indicates that this is the root site in the site collection. Read-only.
| **sharepointIds**        | [sharepointIds][]  | Returns identifiers useful for SharePoint REST compatibility. Read-only.
| **siteCollection**       | [siteCollection][] | Provides details about the site's site collection. Available only on the root site. Read-only.
| **webUrl**               | string (url)       | URL that displays the item in the browser. Read-only.

## Relationships

| Relationship name | Type                             | Description
|:------------------|:---------------------------------|:----------------------
| **columns**       | Collection([columnDefinition][]) | The collection of column definitions reusable across lists under this site.
| **contentTypes**  | Collection([contentType][])      | The collection of content types defined for this site.
| **drive**         | [drive][]                        | The default drive (document library) for this site.
| **drives**        | Collection([drive][])            | The collection of drives (document libraries) under this site.
| **items**         | Collection([baseItem][])         | Used to address any item contained in this site. This collection cannot be enumerated.
| **lists**         | Collection([list][])             | The collection of lists under this site.
| **sites**         | Collection([site][])             | The collection of the sub-sites under this site.

[columnDefinition]: columndefinition.md
[baseItem]: baseitem.md
[contentType]: contentType.md
[drive]: drive.md
[identitySet]: identityset.md
[list]: list.md
[root]: root.md
[sharepointIds]: sharepointIds.md
[site]: site.md
[siteCollection]: siteCollection.md

## Note for existing SharePoint developers

The v2.0 SharePoint API has a few key differences with the CSOM APIs.
The [site][] resource maps to `SPWeb`.
The root [site][] (`SPWeb`) in a site collection has a [siteCollection](sitecollection.md) facet, which contains information about the `SPSite`.
Because IDs for sites are only unique within their site collection, addressing a site by ID requires providing both the site collection identifier and the site identifier.

```http
GET https://sp-my.contoso.com/_api/v2.0/sites/{hostname},{spsite-id},{spweb-id}/
```
A URL constructed with only the hostname will point to the root site (`SPWeb`) in the default site collection.

```http
GET https://sp-my.contoso.com/_api/v2.0/sites/{hostname}
```

A URL constructed with only the hostname and siteCollection (`SPSite`) ID will point to the root site (`SPWeb`) in the given site collection.

```http
GET https://sp-my.contoso.com/_api/v2.0/sites/{hostname},{spsite-id}
```




<!-- {
  "type": "#page.annotation",
  "description": "",
  "keywords": "",
  "section": "documentation",
  "tocPath": "Sites",
  "tocBookmarks": { "Resources/Site": "#" }
} -->
