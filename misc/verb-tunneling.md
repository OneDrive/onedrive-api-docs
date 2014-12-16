# Verb Tunneling


It is possible to instruct network intermediaries (proxies, firewalls, and so
on) inspecting traffic at the application protocol layer (for example, HTTP) to
block requests that contain certain HTTP verbs. In practice, GET and POST verbs
are rarely blocked (traditional web pages rely heavily on these HTTP methods),
while, for a variety of reasons (such as security vulnerabilities in prior
protocols), other HTTP methods (PUT, DELETE, and so on) are at times blocked
by intermediaries. Additionally, some existing HTTP libraries do not allow
creation of requests using verbs other than GET or POST. Therefore, an
alternative way of specifying request types which use verbs other than GET and
POST is needed to ensure that this document works well in a wide range of
environments.

To address this need, the `X-HTTP-Method-Override` header can be added to a
`POST` request that signals that the server MUST process the request not as a
POST, but as if the HTTP verb specified as the value of the header was used as
the method on the HTTP request's request line, as specified in RFC 2616
section 5.1.

This header is only valid for POST requests. It will be ignored for other HTTP
methods.

For example, if the DELETE verb is blocked by a firewall, your application can
tunnel the verb to the API to ensure your app can still delete a file:


```
POST /drive/items/{item-id} HTTP/1.1
Host: api.onedrive.com
X-HTTP-Method-Override: DELETE
```

This request will delete the resource identified. The response from the service
will match the response that would have been returned if the HTTP method had
DELETE.
