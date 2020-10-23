---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Remove a webhook subscription - OneDrive API
localization_priority: Normal
---
# Delete subscription

Delete a subscription from a DriveItem.

After deleting the subscription additional notifications will not be delivered for this subscription.

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
DELETE /subscriptions/{id}
```

## Response

If successful, this method returns a `204 No Content` response code.

## Example

### Request

<!-- { "blockType": "request", "name": "delete-subscription-graph", "tags": "service.graph" } -->

```http
DELETE /subscriptions/{id}
```

### Response

If the subscription is found and successfully deleted, then a `204 No Content` response is returned:

<!-- { "blockType": "response" } -->

```http
HTTP/1.1 204 No Content
```

## Error responses

See [Error Responses][error-response] for more info about
how errors are returned.

[error-response]: ../concepts/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "List the subscriptions created for an item.",
  "keywords": "notification,list,subscription,webhook,enumerate",
  "section": "documentation",
  "tocPath": "Webhooks/Delete"
} -->
