# Get the user's default drive

Get metadata about user's default drive.

#### HTTP Request

<!-- {"blockType": "request", "name": "get-default-drive"} -->
```http
GET /drive
```

##### Optional Query Parameters

This method supports [optional query string parameters][odata-query-parameters]
to shape the response.

##### Request Body
Do not supply a request body with this method.

#### HTTP Response

If successful, this method returns a [Drive resource][drive-resource] of
the matching drive in the response body.

<!-- { "blockType": "response", "@odata.type": "oneDrive.drive", "isCollection": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: length

{
  "value": [
    {
      "id": "0123456789abc",
      "driveType": "consumer",
      "owner": { "@odata.type": "oneDrive.identitySet" },
      "quota": { "@odata.type": "oneDrive.quota"}
    }
  ]
}

```
**Note:** Response object is truncated for clarity. All default properties will
be returned from the actual call.

##### Error Response

Read the [Error Responses][error-response] topic for more information about
how errors are returned.
[error-response]: ../misc/errors.md

| HTTP Code | Error Code    | Error Message                                                 |
|:----------|:--------------|:--------------------------------------------------------------|
| 403       |               | The app does not have the proper authorization from the user. |
| 404       | DriveNotFound | Supplied drive-id is invalid or has invalid format            |

[drive-resource]: ../resources/drive.md
[odata-query-parameters]: ../odata/optional-query-parameters.md
