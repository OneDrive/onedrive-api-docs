---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: SiteCollection - OneDrive API
localization_priority: Normal
---
# SiteCollection resource

The **siteCollection** resource provides more information about a site collection.

If a [**site**](site.md) resource has a non-null **siteCollection** property, then the site is a root site for a site collection.

## JSON representation

Here is a JSON representation of the resource.

<!-- {
  "blockType": "resource",
  "optionalProperties": [
  ],
  "@odata.type": "microsoft.graph.siteCollection"
}-->

```json
{
  "dataLocationCode": "JPN",
  "hostname": "contoso.sharepoint.com",
  "root": {"@odata.type": "microsoft.graph.root" }
}
```

## Properties

| Property name    | Type     | Description
|:-----------------|:---------|:---------------------------------------------------
| dataLocationCode | string   | The string in Azure Active Directory representing the geographic location of the data (eg. `JPN`, `NAM`). Read-only.
| hostname         | string   | The hostname for the site collection. Read-only.
| root             | [root][] | If present, indicates that this is a root-level site collection in the tenancy.

[root]: root.md

<!-- uuid: 8fcb5dbc-d5aa-4681-8e31-b001d5168d79
2015-10-25 14:57:30 UTC -->
<!-- {
  "type": "#page.annotation",
  "description": "",
  "keywords": "",
  "section": "documentation",
  "tocPath": "Facets/SiteCollection"
}-->
