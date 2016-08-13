# Handling webhook validation requests

When a new subscription is created, OneDrive will validate the webhook URL
supports receiving webhook notifications. This validation is performed
during the [create subscription](create-subscription.md) request. The subscription
will only be created if your service responds correct.

When a new subscription is created, OneDrive will POST a request to the
registered URL in the following format:

## Example validation request

```http
POST https://contoso.azurewebsites.net/your/webhook/service?validationtoken={randomString}
Content-Length: 0
```

## Response

For the subscription to be created successfully, your service must respond
to this request by returning the value of the **validationtoken** query string
parameter as a plain-text response.

```http
HTTP/1.1 200 OK
Content-Type: text/plain

{randomString}
```

If your application returns a status code other than `200` or fails to respond
with the value of the validationtoken parameter, the request to create a new
subscription will fail.

<!-- {
  "type": "#page.annotation",
  "description": "Learn how to respond to a webhook validation request.",
  "keywords": "notification,list,subscription,webhook,create,validate,validation",
  "section": "documentation",
  "tocPath": "Webhooks/Validation"
} -->
