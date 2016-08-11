# List subscriptions

Enumerate the remaining subscriptions on an item.

## Prerequisites
To view a list of subscriptions an app need read-write permissions to the item
where the subscriptions exist. Only the subscriptions created by the calling
application are enumerated.

Applications with **Manage Lists** permissions for SharePoint can see all
subscriptions created on an item.

## HTTP request

<!-- { "blockType": "ignored" } -->
```
GET /drive/items/{item-id}/subscriptions
GET /drive/root:/{item-path}:/subscriptions
```

### Example

<!-- {
"blockType": "request",
"name": "get-subscriptions",
"scopes": "service.onedrive"
} -->
```http
GET /drive/items/{item-id}/subscriptions
```

## Response

This returns a collection of subscriptions viewable by the calling application.
For most applications, this will return a list of subscriptions created by the
calling app. Apps with elevated permissions can see all subscriptions on an item.

<!-- {
"blockType": "response",
"name": "get-subscriptions",
"@odata.type": "oneDrive.subscription",
"isCollection": true
} -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
   "value": [
     {
       "id": "1234-1231-1-as",
       "resource": "/drives/0/items/57705F13F13C3C0C!104",
       "notificationUrl": "https://contoso.azurewebsites.net/api/webhook-receiver",
       "clientState": "sendThisBackToMe",
       "createdBy": { "application": {"id": "1291919111", "displayName": "Contoso App" } },
       "expirationDateTime": "2016-01-01T11:23:00.000Z"
     }
   ]
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
  "tocPath": "Webhooks/List Subscriptions"
} -->
