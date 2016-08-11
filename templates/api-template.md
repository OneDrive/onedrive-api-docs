# {method name}

{description}

## HTTP request

<!-- {"blockType": "request", "name": "template-method-name", "scopes": "files.readwrite service.sharepoint" } -->
```http
GET /drives
```

### Request body
Do not provide a request body with this method.

### HTTP response

If successful, this method returns a collection of Drive resources for the available drives either for the current user or the target SharePoint site.

<!-- { "blockType": "response", "@odata.type": "oneDrive.drive", "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": "0123456789abc"
}
```

**Note:** The Response object is truncated for clarity.
All default properties will be returned from the actual call.


### Remarks

{Remarks}

### Error response

See the [Error Responses][error-response] topic for more info about how errors are returned.

[error-response]: ../misc/errors.md

<!--
 {
  "type": "#page.annotation",
  "description": "Page description for SEO",
  "keywords": "Keywords for SEO",
  "section": "templates",
  "tocPath": "Path/In/TOC"
} -->
