---
author: rgregg
ms.author: rgregg
ms.date: 09/17/2017
title: ListItemVersion - OneDrive API
localization_priority: Normal
---
# ListItemVersion resource type

The **listItemVersion** resource represents a previous version of a [ListItem](listitem.md) resource.

## Tasks on ListItemVersion resources

The following tasks are available for listItemVersion resources.

|            Common task             |         HTTP method         |
| :--------------------------------- | :-------------------------- |
| [List versions][version-list]      | `GET /sites/{site-id}/items/{item-id}/versions`  |
| [Get version][version-get]         | `GET /sites/{site-id}/items/{item-id}/versions/{version-id}`     |
| [Restore version][version-restore] | `POST /sites/{site-id}/items/{item-id}/versions/{version-id}/restore` |

[version-list]: ../api/listitem_list_versions.md
[version-get]: ../api/listitemversion_get.md
[version-restore]: ../api/listitemversion_restore.md


## JSON representation

<!--{
  "blockType": "resource",
  "baseType": "microsoft.graph.baseItemVersion",
  "@odata.type": "microsoft.graph.listItemVersion",
  "@type.aka": "oneDrive.baseItemVersion"
}-->

```json
{
  "fields": { "@odata.type": "microsoft.graph.fieldValueSet" },
  "id": "string",
  "lastModifiedBy": { "@odata.type": "microsoft.graph.identitySet" },
  "lastModifiedDateTime": "2016-01-01T15:20:01.125Z",
  "published": { "@odata.type": "microsoft.graph.publicationFacet" }
}
```

## Properties

|      Property name       |                         Type                         |                               Description                               |
| :----------------------- | :--------------------------------------------------- | :---------------------------------------------------------------------- |
| **id**                   | string                                               | The ID of the version. Read-only.                                       |
| **lastModifiedBy**       | [IdentitySet](../resources/identitySet.md)           | Identity of the user which last modified the version. Read-only.        |
| **lastModifiedDateTime** | [DateTimeOffset](../resources/timestamp.md)          | Date and time the version was last modified. Read-only.                 |
| **published**            | [PublicationFacet](../resources/publicationfacet.md) | Indicates the publication status of this particular version. Read-only. |


## Relationships

The following table defines the relationships that the **driveItemVersion** resource has to other resources.

| Relationship name |                      Type                      |                               Description                                |
| :---------------- | :--------------------------------------------- | :----------------------------------------------------------------------- |
| **fields**        | [FieldValueSet](../resources/fieldvalueset.md) | A collection of the fields and values for this version of the list item. |


<!-- {
  "type": "#page.annotation",
  "description": "The version facet provides information about the properties of a file version.",
  "keywords": "version,versions,version-history,history",
  "section": "documentation",
  "tocPath": "Facets/Version"
} -->
