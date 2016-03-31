# Sharepoint IDs facet

The **Sharepoint IDs** facet returns a list of Sharepoint IDs associated with
an item. This facet is returned only if it is specified via a select. The intent
of this facet is to allow you to use CSOM IDs to implement scenarios using CSOM
APIs in cases where a OneDrive REST API is not available.

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.sharepointIds" } -->
```json
{
  "siteId": "string",
  "webId": "string",
  "listId": "string",
  "listItemId": 1234,
  "listItemUniqueId": "string",
}
```
## Properties

| Property name        | Type   | Description                                                                           |
|:---------------------|:-------|:--------------------------------------------------------------------------------------|
| **siteId**           | string | Unique identifier of the SharePoint site collection (SPSite) that contains this item. |
| **webId**            | string | Unique identifier of the Sharepoint site (SPWeb) that contains this document library. |
| **listId**           | string | Unique identifier of the list within the SharePoint site for this document library.   |
| **listItemId**       | int64  | Ordinal identifier for the current item in the SharePoint list.                       |
| **listItemUniqueId** | string | Unique identifier for the current item in the SharePoint list.                        |


[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "The Sharepoint_ids facet provides Sharepoint ids associated with an item.",
  "keywords": "item, unique, id, csom, facet",
  "section": "documentation",
  "tocPath": "Facets/Sharepoint IDs"
} -->
