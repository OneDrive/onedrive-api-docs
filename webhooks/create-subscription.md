# Adding a new subscription

To add a new subscription, your app POSTs a request to the subscription
collection that includes the properties of the subscription you want to
have created.

**Note:** OneDrive for Business and SharePoint document libraries can only have
subscriptions created on the drive's root item.

## Prerequisites
To create a subscription the app must have read-write access to the item the
subscription will be created on.

## HTTP request

<!-- { "blockType": "ignored" } -->
```
POST /drive/items/{item-id}/subscriptions
POST /drive/root:/{item-path}:/subscriptions
```

### Example

<!-- {
"blockType": "request",
"name": "add-subscription",
"@odata.type": "oneDrive.subscription",
"scopes": "service.onedrive"
} -->
```http
POST /drive/items/{item-id}/subscriptions
Content-Type: application/json

{
 "notificationUrl": "https://contoso.azurewebsites.net/api/webhook-receiver",
 "expirationDateTime": "2016-01-01T11:23:00.000Z"
}
```

## Response

If the subscription is added, then a `201 Created` response is returned that
includes the newly created subscription object.

<!-- {
"blockType": "response",
"@odata.type": "oneDrive.subscription"
} -->
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
    "id": "1039149811asbc",
    "resource": "/drives/0/items/57705F13F13C3C0C!104",
    "notificationUrl": "https://contoso.azurewebsites.net/api/webhook-receiver",
    "expirationDateTime": "2016-01-01T11:23:00.000Z",
    "createdBy": { "application": {"id": "1291919111", "displayName": "Contoso App" } }
}
```

## URL validation

Before a new subscription is created, OneDrive will send a request to the
URL provided in the request to create a new subscription. Your service must
respond to this request by returning the validation key.

If your service fails to validate the request in this way, the subscription
will fail to be created.

See [handling webhook validation requests](webhook-validation.md) for detailed
information.

### Error responses

See [Error Responses][error-response] for more info about
how errors are returned.

[error-response]: ../misc/errors.md


<!-- {
  "type": "#page.annotation",
  "description": "List the subscriptions created for an item.",
  "keywords": "notification,list,subscription,webhook,enumerate",
  "section": "documentation",
  "tocPath": "Webhooks/Create"
} -->
