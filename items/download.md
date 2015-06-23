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

| Name            | Value | Description                                                                                                                                              |
|:----------------|:------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
| _if-none-match_ | etag  | If this request header is included and the eTag (or cTag) provided matches the current tag on the file, an `HTTP 304 Not Modified` response is returned. |
| _range_         | range | Range of bytes that should be returned in the request.                                                                                                   |

### Request body

Do not supply a request body with this method.

### Example

<!-- { "blockType": "request", "name": "download-item-content" } -->
```
GET /drive/items/{item-id}/content
```

## Response

Returns a `302 Found` response redirecting to a download URL for the file. This
is the same URL available through the `@content.downloadUrl` property on an item.

To download the contents of the file your application will need to follow
the `Location` header in the response.

Download URLs are only valid for a short time period and do not require an
`Authorization` header to download.

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
