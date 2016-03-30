# Get metadata for a drive on OneDrive

Use the OneDrive API to get metadata for a user's drive using its unique identifier.

## HTTP request

<!-- { "blockType": "request", "name": "get-drive-by-id", "scopes": "files.read" } -->
```
GET /drives/{drive-id}
```

### Path parameters
| Parameter name | Value  | Description                               |
|:---------------|:-------|:------------------------------------------|
| _drive-id_     | string | Required. The ID for the drive requested. |

### Optional query parameters

This method supports [optional query string parameters][odata-query-parameters]
to shape the response.

### Request body
Do not supply a request body with this method.

## HTTP response

If successful, this method returns a [Drive resource][drive-resource] for
the matching drive in the response body.

<!-- { "blockType": "response", "@odata.type": "oneDrive.drive" } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "0123456789abc",
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
  },
  "driveType": "personal"
}

```
**Note:** The Response object is truncated for clarity. All default properties will
be returned from the actual call.

### Error response

See [Error responses][error-response] for more info about
how errors are returned.
[error-response]: ../misc/errors.md
[drive-resource]: ../resources/drive.md
[odata-query-parameters]: ../odata/optional-query-parameters.md

<!-- {
  "type": "#page.annotation",
  "description": "Retrieve metadata for a OneDrive based on a unique ID.",
  "keywords": "drive,onedrive.drive,default drive",
  "section": "documentation",
  "tocPath": "Drives/Get Drive"
} -->
