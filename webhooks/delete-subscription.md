# Deleting a subscription

Remove a subscription from an item. Note that after deleting the subscription
the subscription will no longer exist and additional notifications will not
be delivered.

## Prerequisites
To modify a subscription the app must have read-write access to the item the
subscription exists on.

## HTTP request

<!-- { "blockType": "ignored" } -->
```
DELETE /drive/items/{item-id}/subscriptions/{id}
DELETE /drive/root:/{item-path}:/subscriptions/{id}
```

### Example

<!-- { "blockType": "request", "name": "delete-subscription", "scopes": "service.onedrive" } -->
```http
DELETE /drive/items/{item-id}/subscriptions/{id}
```

## Response

If the subscription is found and successfully deleted, then a `204 No Content`
response is returned:

<!-- { "blockType": "response" } -->
```http
HTTP/1.1 204 No Content
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
  "tocPath": "Webhooks/Delete"
} -->
