---
author: D4N14L
ms.author: danade
title: Restore a drive item - OneDrive API
---
# Restore a drive item

Restore a [driveItem](../resources/driveitem.md) that has been deleted and is currently in the recycle bin.

## Permissions

One of the following permissions is required to call this API. To learn more, including how to choose permissions, see [Permissions](../concepts/permissions_reference.md).

|Permission type      | Permissions (from least to most privileged)              |
|:--------------------|:---------------------------------------------------------|
|Delegated (work or school account) | Not supported.    |
|Delegated (personal Microsoft account) | Files.ReadWrite.All    |
|Application | Files.ReadWrite.All |

## HTTP request

<!-- { "blockType": "ignored" } -->

```http
POST /drives/{drive-id}/items/{item-id}/restore
POST /me/drive/items/{item-id}/restore
POST /users/{user-id}/drive/items/{item-id}/restore
```

### Request body

In the request body, you may optionally supply a value for the **parentReference** property to allow you to restore the item to the target parent, otherwise it will be restored to the same directory it was deleted from.

You may also optionally supply a value for the **name** property to allow you to rename the item when it is restored.

## Example

This example restores a deleted item identified by `{item-id}`.

<!-- { "blockType": "request", "name": "restore-item", "scopes": "files.readwrite", "target": "action" } -->

```http
POST /me/drive/items/{item-id}/restore
Content-Type: application/json

{
  "name": "new-item-name.txt",
  "parentReference": {
    "id": "{new-parent-folder-id}"
  }
}
```

## Response

This method returns a [DriveItem](../resources/driveitem.md) for the item being restored.

<!-- { "blockType": "response", "@odata.type": "microsoft.graph.driveItem", "truncated": true } -->

```http
HTTP/1.1 200 OK
Content-type: application/json

{
  "id": "1312abc!1231",
  "name": "new-item-name.txt",
  "size": 19121,
  "lastModifiedDateTime": "2017-12-12T10:40:59Z"
}
```

### Remarks

This functionality is currently only available for OneDrive Personal.

<!-- {
  "type": "#page.annotation",
  "description": "Follow an item.",
  "keywords": "follow item",
  "section": "documentation",
  "tocPath": "Items/Follow"
} -->
