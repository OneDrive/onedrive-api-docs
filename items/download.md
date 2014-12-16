# Download Item Contents

Use this API to download the contents (default stream) for an Item with the
[File][file-facet] facet.

##### Pre-requisites
To call the download API, the user must have granted the application read access
to the file the app wishes to download.

##### HTTP Request
````
GET /drive/items/{item-id}/content
GET /drive/root:/{path and filename}/:content
````

##### Optional Request Headers
Name            | Value   | Description
--------------- | ------- | -----------
`if-none-match` | `etag`  | If this request header is included and the etag provided matches the current etag on the file, an `HTTP 304` Not Modified response is returned.
`range`         | `range` | Range of bytes that should be returned in the request.

##### Request Body
Do not supply a request body with this method.


#### Example

```
GET /drive/items/1234567890ABC/content
```

##### Response

**Note** You may receive a `302 Found` response instead of the contents of the
file. To download the contents of the file your application will need to follow
the `Location` header in the response and resubmit the `Authorization` header
to have access to download the file. Not all HTTP client libraries will
automatically include the headers of the original request when following a 302
redirection.

If successful, this method returns the binary contents of the file being requested.

```http
HTTP/1.1 200 OK
Content-Type: image/jpeg
Content-Length: 2048

{binary content}
```

##### Error Response

Read the [Error Responses][error-response] topic for more information about
how errors are returned.
[error-response]: ../misc/errors.md

HTTP Code|HTTP Error Message|Error Code|Error Message|Notes
---|---|---|---|---|---|
400|Bad Request|InvalidParameter|Supplied parameter is invalid or has incorrect format|
403|Forbidden|AccessRestricted|The app does not have authorization to delete this file.|
403|Forbidden|AccessRestricted|Resource has been restricted in use|
404|Not Found|ResourceDoesNotExist|Resource specified in the request does not exist|
409|Conflict|VirusInfected|This document is infected with a virus|
409|Conflict|VirusError|There was an error scanning this document for viruses|
409|Conflict|VirusSuspicious|This document is suspicious and may have a virus|
409|Conflict|PendingAVScan|AVScan is pending. Retry later|
416|Requested Range Not Satisfiable|InvalidRange|Requested range is invalid|

[file-facet]: ../facets/file_facet.md
