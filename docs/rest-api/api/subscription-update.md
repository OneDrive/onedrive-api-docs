# Updating a subscription

An app can update an existing subscription by using the PATCH verb to
change the properties of the subscription.

## Prerequisites
To modify a subscription the app must have read access to the item the subscription exists on.

## HTTP request

<!-- { "blockType": "ignored" } -->
```
PATCH /subscriptions/{id}
```

### Example

<!-- {
"blockType": "request",
"name": "patch-subscription-graph",
"@odata.type": "oneDrive.subscription",
"scopes": "service.graph"
} -->
```http
PATCH /drive/items/{item-id}/subscriptions/{id}
Content-Type: application/json

{
  "expirationDateTime": "2016-01-03T11:23:00.000Z"
}
```

## Response

If the subscription is patched successfully then the resulting subscription
object is returned:

<!-- { "blockType": "response", 
       "name": "patch-subscription-graph",
       "@odata.type": "oneDrive.subscription" } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
 "subscriptionId": "1039149811asbc",
 "resource": "/drives/0/items/57705F13F13C3C0C!104",
 "notificationUrl": "https://contoso.azurewebsites.net/api/v2/webhook-receiver",
 "expirationDateTime": "2016-01-03T11:23:00.000Z"
}
```

### Error responses

See [Error Responses][error-response] for more info about
how errors are returned.

[error-response]: ../concepts/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "List the subscriptions created for an item.",
  "keywords": "notification,list,subscription,webhook,enumerate",
  "section": "documentation",
  "tocPath": "Webhooks/Update"
} -->
