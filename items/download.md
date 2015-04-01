# Download a OneDrive Item contents

Use this API to download the contents (default stream) for an Item on OneDrive, with the
[File][file-facet] facet.

## Prerequisites
To call the download API, the user must have granted the application read access
to the file the app wishes to download.

## HTTP request
<!-- { "blockType": "ignored" } -->
````
GET /drive/items/{item-id}/content
GET /drive/root:/{path and filename}:/content
````

### Optional request headers

| Name            | Value | Description                                                                                                                                     |
|:----------------|:------|:------------------------------------------------------------------------------------------------------------------------------------------------|
| _if-none-match_ | etag  | If this request header is included and the etag provided matches the current etag on the file, an `HTTP 304 Not Modified` response is returned. |
| _range_         | range | Range of bytes that should be returned in the request.                                                                                          |

### Request body

Do not supply a request body with this method.

### Example

<!-- { "blockType": "request", "name": "download-item-content" } -->
```
GET /drive/items/{item-id}/content
```

## Response

Returns a `302 Found` response redirecting to `@content.downloadUrl` for file download on success.
To download the contents of the file your application will need to follow
the `Location` header in the response and include the `Authorization` header
to have access to download the file. Not all HTTP client libraries will
automatically include the headers of the original request when following a 302
redirection.

<!-- { "blockType": "response", "@odata.type": "stream" } -->
```http
HTTP/1.1 302 Found
Location: https://b0mpua-by3301.files.1drv.com/y23vmagahszhxzlcvhasdhasghasodfi
```

### Error responses

See [Error Responses][error-response] for more info about
how errors are returned.

[error-response]: ../misc/errors.md
[file-facet]: ../facets/file_facet.md

<!-- {
  "type": "#page.annotation",
  "description": "Download the contents of an item in OneDrive",
  "keywords": "download,item,contents",
  "section": "documentation",
  "tocPath": "Items/Download"
} -->
