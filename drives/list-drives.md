# List available drives

List the available drives for a user or SharePoint site.

## HTTP request

<!-- {"blockType": "request", "name": "enum-drives", "scopes": "files.read" } -->
```http
GET /drives
```

### Request body
Do not provide a request body with this method.

### HTTP response

If successful, this method returns a collection of [Drive resources][drive-resource]
for the available drives either for the current user or the target SharePoint site.

<!-- { "blockType": "response", "@odata.type": "oneDrive.drive", "isCollection": true, "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "value": [
    {
      "id": "0123456789abc",
      "driveType": "personal",
      "owner": {
        "user": {
          "id": "12391913bac",
          "displayName": "Ryan Gregg"
        }
      }
    }
  ]
}
```

**Note:** The Response object is truncated for clarity. All default properties will
be returned from the actual call.


### Remarks

In most cases, OneDrive and OneDrive for Business users will only have a single
drive available, the default drive. When using OneDrive API with a SharePoint
team site, this API returns the collection of document libraries created in the
site.

### Error response

See the [Error Responses][error-response] topic for more info about
how errors are returned.
[error-response]: ../misc/errors.md
[drive-resource]: ../resources/drive.md

<!-- {
  "type": "#page.annotation",
  "description": "List the available drives for a user or team site.",
  "keywords": "drive,onedrive.drive,list drives",
  "section": "documentation",
  "tocPath": "Drives/List Drives"
} -->
