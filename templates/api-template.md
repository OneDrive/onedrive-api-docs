# {method name}

{description}

## HTTP request

<!-- {"blockType": "request", "name": "template-method-name", "scopes": "files.readwrite", "tags": "service.sharepoint" } -->

```http
GET /drives
```

### Request body

Do not provide a request body with this method.

## Response

If successful, this method returns a collection of Drive resources for the available drives either for the current user or the target SharePoint site.

<!-- { "blockType": "response", "@odata.type": "oneDrive.drive", "truncated": true } -->

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": "0123456789abc"
}
```

## Remarks

{Remarks}

### Error response

See the [Error Responses][error-response] topic for more info about how errors are returned.

[error-response]: ../docs/rest-api/concepts/errors.md

<!--
 {
  "type": "#page.annotation",
  "description": "Page description for SEO",
  "keywords": "Keywords for SEO",
  "section": "templates",
  "tocPath": "Path/In/TOC"
} -->
