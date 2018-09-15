---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: conceptual
title: CORS support - OneDrive API
---
# Using the OneDrive API in JavaScript apps (CORS support)

The OneDrive API supports [HTTP access control (CORS)](http://www.w3.org/TR/cors/) to allow single page JavaScript applications to use the OneDrive API through the common [XMLHttpRequest pattern][xhr-scenario].

You can read more about CORS (Cross-Origin Resource Sharing) on [Wikipedia](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) or the [W3C CORS Wiki](http://www.w3.org/wiki/CORS).

[xhr-scenario]: https://msdn.microsoft.com/en-us/library/hh772834(v=vs.85).aspx

## Sample code

The OneDrive Explorer JS sample app demonstrates how to use the OneDrive API from a JavaScript app. 
This sample shows you how to browse and navigate the contents of a user's OneDrive in JavaScript.

You can try the [OneDrive explorer sample app](https://dev.onedrive.com/odx) or [view the source code](https://github.com/onedrive/onedrive-explorer-js).

## Example request

This example creates a CORS request that returns the items from a user's OneDrive, by sending a GET request to the `/drive/root/children` endpoint.
The example was generated using [test-cors.org](http://test-cors.org).

```js
var createCORSRequest = function(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // Most browsers.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // IE8 & IE9
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
};

var url = 'https://sp-my.contoso.com/_api/v2.0/drive/root/children';
var method = 'GET';
var xhr = createCORSRequest(method, url);

xhr.onload = function() {
  // Success code goes here.
};

xhr.onerror = function() {
  // Error code goes here.
};

xhr.setRequestHeader('Authorization', 'Bearer access_token_value');
xhr.send();
```

## Downloading OneDrive files in JavaScript apps

To download files from OneDrive in a JavaScript app you cannot use the `/content` API, since this responds with a `302` redirect. 
A `302` redirect is explicitly prohibited when a CORS _preflight_ is required, such as when providing the **Authorization** header.

Instead, your app needs to select the `@content.downloadUrl` property, which returns the same URL that `/content` would have redirected to.
This URL can then be requested directly using XMLHttpRequest.
Because these URLs are pre-authenticated they can be retrieved without a CORS preflight request.

### Example

To retrieve the download URL for a file, first make a request that includes the `@content.downloadUrl` property:

```http
GET /drive/items/{item-id}?select=id,@content.downloadUrl
```

This returns the id and download URL for a file:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "12319191!11919",
  "@content.downloadUrl": "https://..."
}
```

You can then make an XMLHttpRequest for the URL provided in `@content.downloadUrl` to retrieve the file.

<!-- {
  "type": "#page.annotation",
  "description": "Learn more about using the OneDrive API from a single page JavaScript app",
  "keywords": "cors, http access control, javascript, single, page, application, app",
  "section": "documentation",
  "tocPath": "Concepts/Working with CORS"
} -->
