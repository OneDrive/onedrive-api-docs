# Subscription resource type

The subscription resource defines the properties of a single subscription.

## JSON representation

<!-- {
"blockType": "resource",
"@odata.type": "oneDrive.subscription",
"optionalProperties": [ "clientState", "expirationDateTime", "resource", "createdBy" ]
} -->
```json
{
  "clientState": "optional string",
  "createdBy": { "@odata.type": "oneDrive.identitySet" },
  "expirationDateTime": "datetime",
  "id": "string",
  "notificationUrl": "url",
  "resource": "relativePath"
}
```

## Properties

| Property Name          | Type                          | description                                                                                            |
|:-----------------------|:------------------------------|:-------------------------------------------------------------------------------------------------------|
| **clientState**        | String - optional             | An optional string value that is passed back in the notification message for this subscription.        |
| **createdBy**          | [IdentitySet](identitySet.md) | The identity of the entity who created the subscription. Read-only.                                    |
| **expirationDateTime** | DateTime                      | The date and time when the subscription will expire if not updated or renewed.                         |
| **id**                 | String                        | The unique identifier for the subscription resource. Read-only.                                        |
| **notificationUrl**    | String                        | The URL that notifications should be delivered to, if required for the specified **notificationType**. |
| **resource**           | String                        | The relative path of the subscription within the drive. Read-only.                                     |


<!-- {
  "type": "#page.annotation",
  "description": "",
  "keywords": "",
  "section": "documentation",
  "tocPath": "Resources/Subscription"
} -->
