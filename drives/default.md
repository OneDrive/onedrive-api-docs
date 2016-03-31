# Get the default drive for a user on OneDrive

Get metadata about a user's default drive on OneDrive.

## HTTP request

<!-- {"blockType": "request", "name": "get-default-drive", "scopes": "files.read" } -->
```http
GET /drive
```

### Optional query parameters

This method supports [optional query string parameters][odata-query-parameters]
to shape the response.

### Request body
Do not provide a request body with this method.

### HTTP response

If successful, this method returns a [Drive resource][drive-resource] of
the matching drive in the response body.

<!-- { "blockType": "response", "@odata.type": "oneDrive.drive" } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "0123456789abc",
  "driveType": "personal",
  "owner": {
    "user": {
      "id": "12391913bac",
      "displayName": "Ryan Gregg"
    }
  },
  "quota": {
    "total": 1024000,
    "used": 514000,
    "remaining": 1010112,
    "deleted": 0,
    "state": "normal"
  }
}

```
**Note:** The Response object is truncated for clarity. All default properties will
be returned from the actual call.

### Error response

See the [Error Responses][error-response] topic for more info about
how errors are returned.
[error-response]: ../misc/errors.md
[drive-resource]: ../resources/drive.md
[odata-query-parameters]: ../odata/optional-query-parameters.md

<!-- {
  "type": "#page.annotation",
  "description": "Get metadata about a user's default OneDrive.",
  "keywords": "drive,onedrive.drive,default drive",
  "section": "documentation",
  "tocPath": "Drives/Get Default Drive"
} -->
