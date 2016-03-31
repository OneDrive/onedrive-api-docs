# Updating a subscription

An app can update an existing subscription by using the PATCH verb to
change the properties of the subscription.

**Note:** Webhooks in OneDrive for Business are being rolling out to tenants
over the next 2-3 weeks. If you are unable to create a subscription or receive
a notification please try again in a few days.

## Prerequisites
To modify a subscription the app must have read-write access to the item the
subscription exists on.

## HTTP request

<!-- { "blockType": "ignored" } -->
```
PATCH /drive/items/{item-id}/subscriptions/{id}
PATCH /drive/root:/{item-path}:/subscriptions/{id}
```

### Example

<!-- {
"blockType": "request",
"name": "patch-subscription",
"@odata.type": "oneDrive.subscription",
"scopes": "service.onedrive"
} -->
```http
PATCH /drive/items/{item-id}/subscriptions/{id}
Content-Type: application/json

{
  "notificationUrl": "https://contoso.azurewebsites.net/api/v2/webhook-receiver",
  "expirationDateTime": "2016-01-03T11:23:00.000Z"
}
```

## Response

If the subscription is patched successfully then the resulting subscription
object is returned:

<!-- { "blockType": "response", "name": "patch-subscription", "@odata.type": "oneDrive.subscription", "scopes": "service.onedrive" } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
 "id": "1039149811asbc",
 "resource": "/drives/0/items/57705F13F13C3C0C!104",
 "notificationUrl": "https://contoso.azurewebsites.net/api/v2/webhook-receiver",
 "expirationDateTime": "2016-01-03T11:23:00.000Z",
 "createdBy": { "application": {"id": "1291919111", "displayName": "Contoso App" } }
}
```

### Error responses

See [Error Responses][error-response] for more info about
how errors are returned.

[error-response]: ../misc/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "List the subscriptions created for an item.",
  "keywords": "notification,list,subscription,webhook,enumerate",
  "section": "documentation",
  "tocPath": "Webhooks/Update"
} -->
