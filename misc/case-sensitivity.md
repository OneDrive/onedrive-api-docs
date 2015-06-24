# Case sensitivity notes

This topic describes the case sensitivity for parts of the OneDrive REST API in detail.

## OneDrive URLs
The URL scheme and authority (DNS name) are treated as case-insensitive. The URL
path may have case-sensitive or case-insensitive components, depending on the
type of resource being addressed. Be sure to consider everything documented here.

### Resource identifiers

Resource identifiers like **drive-id**, **item-id** are case-sensitive.

### Path identifiers

File system path identifiers used with colons (such as `:/Documents/MyFile.xlsx`) and
filenames specified in the URL (such as 'MyFile.xlsx' in `/items/{item-id}/children/MyFile.xlsx`)
are _not_ case-sensitive.

For example, the path `:/Folder-A/Foo.txt` is treated the same as `:/folder-a/foo.TXT`.
Likewise, the path `/items/{item-id}/children/Foo.txt` is treated the same as `/items/{item-id}/children/FOO.TxT`.

Metadata path identifiers, such as '/items/{item-id}/image' are case-sensitive.


## Query parameters

The request query parameter names are case-sensitive. For example, `?select` is _not_
the same as `?SELECT`.

## Request headers
Per [HTTP 1.1 protocol][http-protocol], request header names are not case-sensitive.
For example, `Content-Type` would be treated the same as `content-type`.

The request header values are case-sensitive. For example, when providing an
eTag or cTag value in an `if-match` header, the tag is case-sensitive.

## JSON request body
The keys of the JSON object suppled in the request body are case-sensitive. The
value supplied in name-value pairs is stored as-is into the service.

## JSON response body
In the JSON response, the property names are camel-cased. The value of the
property (such as item name) is returned as stored in OneDrive.

[http-protocol]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.2


<!-- {
  "type": "#page.annotation",
  "description": "Understand which parts of the OneDrive API are case sensitive and which are not.",
  "keywords": "constructing urls, case sensitive",
  "section": "documentation",
  "tocPath": "Misc/Case Sensitivity"
} -->
