---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Search for files - OneDrive API
localization_priority: Priority
---
# Search for a DriveItems within a drive

Search the hierarchy of items for items matching a query.
You can search within a folder hierarchy, a whole drive, or files shared with the current user.

## Permissions

One of the following permissions is required to call this API. To learn more, including how to choose permissions, see [Permissions](../concepts/permissions_reference.md).

|Permission type      | Permissions (from least to most privileged)              |
|:--------------------|:---------------------------------------------------------|
|Delegated (work or school account) | Files.Read, Files.ReadWrite, Files.Read.All, Files.ReadWrite.All, Sites.Read.All, Sites.ReadWrite.All    |
|Delegated (personal Microsoft account) | Files.Read, Files.ReadWrite, Files.Read.All, Files.ReadWrite.All    |
|Application | Files.Read.All, Files.ReadWrite.All, Sites.Read.All, Sites.ReadWrite.All |

## HTTP request

<!-- { "blockType": "ignored" } -->

```http
GET /drives/{drive-id}/root/search(q='{search-text}')
GET /groups/{group-id}/drive/root/search(q='{search-text}')
GET /me/drive/root/search(q='{search-text}')
GET /sites/{site-id}/drive/root/search(q='{search-text}')
GET /users/{user-id}/drive/root/search(q='{search-text}')
```

## Optional query parameters

This method supports the `$expand`, `$select`, `$skipToken`, `$top`, and `$orderby` [OData query parameters](../concepts/optional-query-parameters.md) to customize the response.

## Function parameters

| Name | Value  | Description                                                                                                                          |
|:-----|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `q`  | string | The query text used to search for items. Values may be matched across several fields including filename, metadata, and file content. |

## Example

### Request

Here is an example of the request searching the current user's OneDrive

<!-- { "blockType": "request", "name": "item_search", "tags": "service.graph" }-->

```http
GET /me/drive/root/search(q='{search-query}')
```

### Response

This method returns an object containing an collection of [DriveItems](../resources/driveitem.md) that match the search criteria.
If no items were found, an empty collection is returned.

If there are too many matches the response will be paged and an **@odata.nextLink** property will contain a URL to the next page of results.
You can use the `$top` query parameter to specify the number of items in the page.

<!-- { "blockType": "response", "@odata.type": "Collection(microsoft.graph.driveItem)", "truncated": true } -->

```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "value": [
      {
        "id": "0123456789abc!123",
        "name": "Contoso Project",
        "folder": {},
        "searchResult": { "onClickTelemetryUrl": "https://bing.com/0123456789abc!123" }
      },
      {
        "id": "0123456789abc!456",
        "name": "Contoso Project 2016",
        "folder": {},
        "searchResult": { "onClickTelemetryUrl": "https://bing.com/0123456789abc!456" }
      }
    ],
    "@odata.nextLink": "https://graph.microsoft.com/v1.0/me/drive/root/search(query='contoso project')&skipToken=1asdlnjnkj1nalkm!asd"
}
```

## Searching for items a user can access

In addition to searching for items within a drive, your app can search more broadly to include items shared with the current user.
To broaden the search scope, use the **search** method on the [Drive](../resources/drive.md) resource.

### Example

<!-- { "blockType": "request", "name": "item_search_all", "tags": "service.graph" }-->

```http
GET /me/drive/search(q='{search-query}')
```

### Response

Responses when searching from the **drive** resource may include items outside of the drive (items shared with the current user).
These items will include the [**remoteItem**](../resources/remoteitem.md) facet to indicate they are stored outside of the target drive. 

<!-- { "blockType": "response", "truncated": true, "@odata.type": "Collection(microsoft.graph.driveItem)" } -->

```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "value": [
      {
        "id": "0123456789abc!123",
        "name": "Contoso Project",
        "folder": {},
        "searchResult": { "onClickTelemetryUrl": "https://bing.com/0123456789abc!123" },
        "remoteItem": { "id": "!23141901", "parentReference": { "driveId": "s!1020101jlkjl12lx" } }
      },
      {
        "id": "0123456789abc!456",
        "name": "Contoso Project 2016",
        "folder": {},
        "searchResult": { "onClickTelemetryUrl": "https://bing.com/0123456789abc!456" }
      }
    ],
    "@odata.nextLink": "https://graph.microsoft.com/v1.0/me/drive/root/search(query='contoso project')&skipToken=1asdlnjnkj1nalkm!asd"
}
```

## Remarks

*Note:* In OneDrive for Business and SharePoint, when searching under a folder hierarchy, image file types, may not be returned in the results.

## Error responses

See [Error Responses][error-response] for more information about
how errors are returned.

[error-response]: ../concepts/errors.md
[item-resource]: ../resources/driveitem.md
[odata-query-parameters]: ../concepts/optional-query-parameters.md

<!-- {
  "type": "#page.annotation",
  "description": "Search for a file across a OneDrive.",
  "keywords": "search,query,bing,filename,content",
  "section": "documentation",
  "tocPath": "Items/Search"
} -->
