---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Check In Files - OneDrive API
localization_priority: Priority
---
# Check-in changes to a DriveItem resource

Check-in a checked out DriveItem resource, which makes the version of the document available to others.

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
POST /drives/{driveId}/items/{itemId}/checkin
POST /groups/{groupId}/drive/items/{itemId}/checkin
POST /me/drive/items/{item-id}/checkin
POST /sites/{siteId}/drive/items/{itemId}/checkin
POST /users/{userId}/drive/items/{itemId}/checkin
```

### Request body

In the request body, provide a JSON object with the following parameters.


|   Name    | Value  |                                                Description                                                |
| :-------- | :----- | :-------------------------------------------------------------------------------------------------------- |
| checkInAs | string | Optional. The desired status of the document after the check-in operation is complete. Can be `published` or unspecified. |
| comment   | string | A check-in comment that is associated with the version.                                                   |

## Example

This example checks in a file identified by `{item-id}`.

<!-- { "blockType": "request", "name": "checkin-item", "scopes": "files.readwrite sites.readwrite.all", "target": "action", "apiVersions": "beta" } -->

```http
POST /drives/{drive-id}/items/{item-id}/checkin
Content-Type: application/json

{
  "comment": "Updating the latest guidelines"
}
```

## Response

If successful, the API call returns a `204 No Content`.

<!-- { "blockType": "response" } -->

```http
HTTP/1.1 204 No Content
```

### Remarks


[item-resource]: ../resources/driveitem.md

<!-- {
  "type": "#page.annotation",
  "description": "Create a copy of an existing item.",
  "keywords": "copy existing item",
  "section": "documentation",
  "tocPath": "Items/Copy"
} -->
