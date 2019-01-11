---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Copy a file or folder - OneDrive API
localization_priority: Normal
---
# Copy a DriveItem

Asynchronously creates a copy of an [driveItem][item-resource] (including any children), under a new parent item or with a new name.

## Permissions

One of the following permissions is required to call this API. To learn more, including how to choose permissions, see [Permissions](../concepts/permissions_reference.md).

|Permission type      | Permissions (from least to most privileged)              |
|:--------------------|:---------------------------------------------------------|
|Delegated (work or school account) | Files.ReadWrite, Files.ReadWrite.All, Sites.ReadWrite.All    |
|Delegated (personal Microsoft account) | Files.ReadWrite, Files.ReadWrite.All    |
|Application | Files.ReadWrite.All, Sites.ReadWrite.All |

## HTTP request

<!-- { "blockType": "ignored" } -->

```http
POST /drives/{driveId}/items/{itemId}/copy
POST /groups/{groupId}/drive/items/{itemId}/copy
POST /me/drive/items/{item-id}/copy
POST /sites/{siteId}/drive/items/{itemId}/copy
POST /users/{userId}/drive/items/{itemId}/copy
```

### Request body

In the request body, provide a JSON object with the following parameters.


| Name            | Value                                          | Description                                                                                                 |
|:----------------|:-----------------------------------------------|:------------------------------------------------------------------------------------------------------------|
| parentReference | [ItemReference](../resources/itemreference.md) | Optional. Reference to the parent item the copy will be created in.                                         |
| name            | string                                         | Optional. The new name for the copy. If this isn't provided, the same name will be used as the original.    |

**Note:** The _parentReference_ should include the `driveId` and `id` parameters for the target folder.

## Example

This example copies a file identified by `{item-id}` into a folder identified with a `driveId` and `id` value.
The new copy of the file will be named `contoso plan (copy).txt`.

<!-- { "blockType": "request", "name": "copy-item", "scopes": "files.readwrite", "tags": "service.graph", "target": "action" } -->

```http
POST /me/drive/items/{item-id}/copy
Content-Type: application/json

{
  "parentReference": {
    "driveId": "6F7D00BF-FC4D-4E62-9769-6AEA81F3A21B",
    "id": "DCD0D3AD-8989-4F23-A5A2-2C086050513F"
  },
  "name": "contoso plan (copy).txt"
}
```

## Response

Returns details about how to [monitor the progress](../concepts/long-running-actions.md) of the copy, upon accepting the request.

<!-- { "blockType": "response" } -->

```http
HTTP/1.1 202 Accepted
Location: https://contoso.sharepoint.com/_api/v2.0/monitor/4A3407B5-88FC-4504-8B21-0AABD3412717
```

The value of the `Location` header provides a URL for a service that will return the current state of the copy operation.
You can use this info to [determine when the copy has finished](../concepts/long-running-actions.md).

### Remarks

In many cases the copy action is performed asynchronously.
The response from the API will only indicate that the copy operation was accepted or rejected, say due to the destination filename already being in use.

[item-resource]: ../resources/driveitem.md

<!-- {
  "type": "#page.annotation",
  "description": "Create a copy of an existing item.",
  "keywords": "copy existing item",
  "section": "documentation",
  "tocPath": "Items/Copy"
} -->
