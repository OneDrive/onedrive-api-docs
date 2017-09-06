# Verb tunneling

There are some cases where apps can't make HTTP requests with verbs other than
GET or POST. For example, some proxies, firewalls, etc. might be configured by
their operators to block certain HTTP verbs, or certain app environments might
not support other verbs. For these cases, the OneDrive API provides an
alternative way of specifying an HTTP verb when necessary.

You can tunnel any HTTP request through a POST by making a POST request and
adding the `X-HTTP-Method-Override` header set to the method you want to invoke.
This signals the server to process the request not as a POST, but as whatever
verb was specified as the value of that header.

This header is only valid for POST requests. It will be ignored for other HTTP
methods.

For example, if the DELETE verb is blocked by a firewall, your application can
tunnel the verb to the API to ensure that your app can still delete a file.


```http
POST /drive/items/{item-id} HTTP/1.1
Host: api.onedrive.com
X-HTTP-Method-Override: DELETE
```

This request will delete the resource identified. The response from the service
will match the response that would have been returned if the HTTP method had
DELETE.

<!-- {
  "type": "#page.annotation",
  "description": "Verb tunneling enables a client that doesn't support all HTTP verbs to work.",
  "keywords": "verb,tunneling,tunnelling,post",
  "section": "documentation"
} -->
