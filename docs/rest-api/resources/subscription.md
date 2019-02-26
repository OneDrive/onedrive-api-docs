---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Subscription - OneDrive API
localization_priority: Normal
---
# Subscription resource type

The subscription resource defines the properties of a single subscription.

## JSON representation

<!-- {
"blockType": "resource",
"@odata.type": "microsoft.graph.subscription",
"optionalProperties": [ "clientState", "expirationDateTime", "resource", "subscriptionId", "changeType" ]
} -->

```json
{
  "id": "string",
  "clientState": "optional string",
  "expirationDateTime": "datetime",
  "notificationUrl": "url",
  "resource": "relativePath",
  "changeType": "updated"
}
```

## Properties

| Property Name          | Type                          | description                                                                                            |
|:-----------------------|:------------------------------|:-------------------------------------------------------------------------------------------------------|
| **id**                 | String                        | The unique identifier for the subscription resource. Read-only.                                        |
| **clientState**        | String - optional             | An optional string value that is passed back in the notification message for this subscription.        |
| **expirationDateTime** | DateTime                      | The date and time when the subscription will expire if not updated or renewed.                         |
| **notificationUrl**    | String                        | The URL that notifications should be delivered to, if required for the specified **notificationType**. |
| **resource**           | String                        | The relative path of the subscription within the drive. Read-only.                                     |
| **changeType**         | String                        | The type of changes that should generate notifications for this subscription. OneDrive only supports `updated`. |


<!-- {
  "type": "#page.annotation",
  "description": "",
  "keywords": "",
  "section": "documentation",
  "tocPath": "Resources/Subscription"
} -->
