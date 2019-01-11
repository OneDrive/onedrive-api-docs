---
author: rgregg
ms.author: rgregg
ms.date: 09/11/2017
title: Delete an entry from a SharePoint list
localization_priority: Normal
---
# Delete an item from a list

Removes an item from a [list][].

[list]: ../resources/list.md

## Permissions

To delete an item, the user must have granted the application write access to the item to be deleted.

One of the following permissions is required to call this API. To learn more, including how to choose permissions, see [Permissions](../concepts/permissions_reference.md).

|Permission type      | Permissions (from least to most privileged)              |
|:--------------------|:---------------------------------------------------------|
|Delegated (work or school account) | Sites.ReadWrite.All    |
|Delegated (personal Microsoft account) | Not supported.    |
|Application | Sites.ReadWrite.All |

## HTTP request

<!-- { "blockType": "ignored" } -->

```http
DELETE /sites/{site-id}/lists/{list-id}/items/{item-id}
```

## Optional request headers

| Name       | Value | Description
|:-----------|:------|:--------------------------------------------------------
| _if-match_ | etag  | If this request header is included and the eTag provided does not match the current tag on the item, a `412 Precondition Failed` response is returned and the item will not be deleted.

## Request body

Do not supply a request body with this method.

## Example

<!-- { "blockType": "request", "name": "delete-item-site", "scopes": "files.readwrite sites.readwrite.all" } -->

```http
DELETE /sites/{site-id}/lists/{list-id}/items/{item-id}
```

## Response

If successful, this call returns a `204 No Content` response to indicate that resource was deleted and there was nothing to return.

<!-- { "blockType": "response" } -->

```http
HTTP/1.1 204 No Content
```

<!-- {
  "type": "#page.annotation",
  "description": "",
  "keywords": "",
  "section": "documentation",
  "tocPath": "ListItem/Delete"
} -->
