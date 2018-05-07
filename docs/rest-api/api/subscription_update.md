---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Update a webhook subscription - OneDrive API
---
# Update subscription

Renew a subscription by extending its expiry time.

Subscriptions to resources expire at dates proscribed by the individual resource types.
In order not to miss notifications, subscriptions should be renewed well in advance of their expiry date.
See [subscription](../resources/subscription.md) for individual expiry dates.

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
PATCH /subscriptions/{id}
```

## Example

### Request

<!-- { "blockType": "request", "name": "patch-subscription-graph", "@odata.type": "microsoft.graph.subscription", "tags": "service.graph" } -->

```http
PATCH /subscriptions/{id}
Content-type: application/json

{
  "expirationDateTime": "2018-01-03T11:23:00.000Z"
}
```

### Response

If the subscription is patched successfully then the resulting subscription object is returned:

<!-- { "blockType": "response",  "name": "patch-subscription-graph", "@odata.type": "microsoft.graph.subscription" } -->

```http
HTTP/1.1 200 OK
Content-type: application/json

{
 "id": "1039149811asbc",
 "resource": "/me/drive/root",
 "changeType": "updated",
 "clientState": "subscription-identifier",
 "notificationUrl": "https://contoso.azurewebsites.net/api/v2/webhook-receiver",
 "expirationDateTime": "2018-01-03T11:23:00.000Z"
}
```

### Error responses

See [Error Responses][error-response] for more info about
how errors are returned.

[error-response]: ../concepts/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "Update a subscription created for an item.",
  "keywords": "notification,list,subscription,webhook,enumerate",
  "section": "documentation",
  "tocPath": "Webhooks/Update"
} -->
