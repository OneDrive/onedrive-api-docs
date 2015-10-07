# Service-to-service notifications (preview)

OneDrive provides service-to-service notifications through [webhooks][wiki-webhooks].
Webhooks provide a simple notification pipeline so your app can
be aware of changes to a user's OneDrive without repeatedly polling the service.
When files or folders that your app can access in a user's OneDrive
are changed, the webhook URL you provide will be sent a request notifying it
that changes have occurred.

[wiki-webhooks]: http://en.wikipedia.org/wiki/Webhook

## Registering

### Static webhook registration

**Note:** During the preview there is no self-service registration
for webhooks. To register, contact [OneDrive Webhook Registration](mailto:odwhr@microsoft.com?subject=Webhook%20registration&body=client_id%)
and provide your **client_id** and **webhook URL**.

OneDrive webhooks require a single URL on the same root domain
as the domain configured for your app in the App Console. For example,
if your root domain is `myservice.contoso.com`, your webhook URL could be
`https://webhooks.myservice.contoso.com/api/changeNotification`.


### Scope of notifications

Webhook notifications will be sent to your app only for changes that meet
the following criteria:

* A user has authorized your app to have access to OneDrive content.
* Your app has requested the `wl.offline_access` scope.
* A user has recently used your app.
* Your app has access to the item that generates the notification.

For example, if your app has been granted access to only an app
folder, it will not receive webhook notifications when items outside of the
app folder are created, modified, or deleted.

However, if your app has been granted full access to a user's OneDrive,
it will receive webhook notifications any time an item in the user's drive
is created, modified, or deleted.

Your app will not receive notifications for items that have been shared with
the user who has signed in.

## Receiving notifications

Once your webhook URL end point is registered, OneDrive will send POST requests
to your webhook URL anytime a user who has connected with your app has
items that are changed. Multiple notifications might be batched together into a
single request if multiple users have changes that occur at the same time.

#### Example notification

The body of the HTTP request to your webhook URL will contain a JSON object
that looks like this:

```json
{
  "value": [
    {
      "subscriptionId": "WLS_SubscriptionId_A640DFF3-0429-44FC-AF7E-30523A476864",
      "subscriptionExpirationDateTime": "2015-08-10T23:15:39.797Z",
      "userId": "bc614f",
      "entity": {
        "id": "bc614f"
      }
    }
  ]
}
```

You'll notice that the notification doesn't include any information about the
changes that triggered it. Your app is expected
to use the **view.delta** verb to detect any changes to the state of items in
OneDrive and store the `syncToken` value for the next time you are notified.

#### Error handling

If an error occurs while sending the notification to your service, OneDrive
will follow exponential back-off logic. Any request that returns an HTTP
status code outside of the 200-299 range, or that times out, will be reattempted
over the next several minutes. If the request is not successful after fifteen
minutes, the notification is dropped. Future notifications will still be
attempted to your service.

#### Expiration

Because webhooks are service-to-service notifications, the webhook
configuration will never expire. However, if OneDrive has not detected a user using
your app for more than two months, the service will stop sending
notifications for that user.

If your app consistently times out on notification requests or returns error
codes indicating that the service is not processing the notifications over several
weeks, OneDrive might stop sending notifications to your service. If this occurs,
you will need to verify that your service is working properly and then re-register
your webhook URL.

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
  "tocPath": "Concepts/Notifications"
} -->
