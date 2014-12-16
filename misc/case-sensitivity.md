## Case Sensitivity Notes:

Case sensitivity for the following parts of the REST API are discussed in detail:

## URL  
The URL scheme, authority, and path (to the resource) information is treated as
case-insensitive. Depending on the type of resource addressing, following needs
to be taken into consideration:

##### Resource Identifiers

Resource identifiers (drive-id, item-id) are case-sensative.


##### Path Identifiers

Path identifiers, used between colons e.g. `:/Documents/MyFile.xlsx:` and
filenames specified in the URL are **not** case-sensative.

Example: The path `:/Folder-A/Foo.txt:` is treated same as `:/folder-a/foo.TXT:`

## Query Paramater

The request query parameter names are case-sensitive. E.g. $select is **not**
the same as $SELECT.

## Request Headers
Per [HTTP 1.1 protocol][http-protocol], request header names are case-insentive.
Example: `Content-Type` would be treated same as `content-type`

The request header values are case-sensitive. For example, when providing an
eTag value through an `if-match` header, the eTag is case-sensative.

## JSON Request Body
The keys of the JSON object suppled in the request body are case-sensitive. The
value supplied in name-value pairs is stored as-is into the service.

## JSON Response Body
In the JSON response, the property names are camel-cased. The value of the
property (such as item name) is returned as stored in OneDrive.

[http-protocol]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.2
