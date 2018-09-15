---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: conceptual
title: Webhook notifications - OneDrive API
---
# Using webhooks to receive service-to-service notifications

OneDrive provides service-to-service notifications through [webhooks][wiki-webhooks].
Webhooks provide a simple notification pipeline so your app can
be aware of changes to a user's drive without polling the service.

When items your app has access to in a user's drive are changed, the URL you
provide will be sent a request notifying it that changes have occurred.

[wiki-webhooks]: http://en.wikipedia.org/wiki/Webhook

## Common tasks

| Task                                                | HTTP method                        |
|-----------------------------------------------------|------------------------------------|
| [Create a new subscription](../api/subscription_post_subscriptions.md) | `POST /subscriptions`              |
| [Delete subscription](../api/subscription_delete.md)       | `DELETE /subscriptions/{id}`       |
| [Update a subscription](../api/subscription_update.md)     | `PATCH /subscriptions/{id}`        |

## Registering

To register for webhooks, you add a new subscription to the item representing
the top of the scope for which you wish to receive changes.

See [adding a new subscription](../api/subscription_post_subscriptions.md) for details on how to
register a URL for notifications.

### Scope of notifications

Webhook notifications will be sent to your app only for changes that meet
the following criteria:

* A user has authorized your app to have access to OneDrive content.
* The app has access to the item that generates the notification.
* The subscription has not expired.

Your app will not receive notifications for items that have been shared with
the user who has signed in or remote items in the user's drive unless separate
subscriptions are created on the original items.

## Receiving notifications

Once your subscription is created, OneDrive will send POST requests
to your registered URL when items under the notification scope are changed.
Multiple notifications to your service may be batched together into a single
request, if multiple users have changes that occur within the same time period.

#### Example notification

The body of the HTTP request to your notification URL will contain a [Webhook Notification](../resources/webhooknotification.md)
resource similar to the following:

<!-- { "blockType": "example", "@odata.type": "oneDrive.webhookNotification",
"truncated": true, "isCollection": true } -->
```json
{
  "value": [
    {
      "subscriptionId": "A640DFF3-0429-44FC-AF7E-30523A476864",
      "expirationDateTime": "2017-02-22T16:00:00Z",
      "resource": "/drive/root",
      "clientState": "client-specific string"
    }
  ]
}
```

You'll notice that the notification doesn't include any information about the
changes that triggered it. Your app is expected
to use the **delta** verb to detect any changes to the state of items in
OneDrive and store the `syncToken` value for the next time you are notified.


#### Error handling

If an error occurs while sending the notification to your service, OneDrive
will follow exponential back-off logic. Any response with an HTTP
status code outside of the 200-299 range, or that times out, will be attempted
again over the next several minutes. If the request is not successful after 15
minutes, the notification is dropped.

Future notifications will still be attempted to your service, although the
service reserves the right to remove the subscription if a sufficient number of
failures are detected.

#### Expiration

New subscriptions are automatically provided an expiration date if one is not
provided when the subscription is created. By default, subscriptions are set
to expire 6 months from when they are created.

### Best practices

When you use webhooks there are some important things to consider:

##### Service-to-service

You should not attempt to use webhooks to notify client devices directly. Each
app has a single webhook URL that is called for all users. This URL
should point to a service you control. You can choose to have your service
parse the notification messages and forward appropriate push notifications to
client apps as you want.

##### Respond quickly

Your app has limited time to respond to the request. You should queue
information about notification updates, and then
process those requests on a separate thread. You should not attempt to pull
changes from the OneDrive service before responding to the webhook request.

##### Expect concurrent notifications

In many circumstances you might receive notifications for the same user multiple
times in quick succession. For example, if a user is new or is uploading a batch
of content to OneDrive, you can receive multiple notifications for the same user
before you have processed the first notification. Ensure that the actions that
respond to webhook notifications properly handle this case.

<!-- {
  "type": "#page.annotation",
  "description": "Use webhooks to receive notifications when your app users change items.",
  "keywords": "notification,push,sync,webhook,onedrive",
  "section": "documentation",
  "tocPath": "Concepts/Notifications",
  "tocBookmarks": { "Webhooks": "#" }
} -->
