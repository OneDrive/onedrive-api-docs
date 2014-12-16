# Get Metadata for a Drive
Get metadata of a drive by unique identifier.

#### HTTP Request

```
GET /drives/{drive-id}
```

##### Path Parameters
Parameter Name | Value    | Description
-------------- | -------- | ------------
`drive-id`     | `string` | Required. The ID for the drive requested.

##### Optional Query Parameters

This method supports [optional query string parameters][odata-query-parameters]
to shape the response.

##### Request Body
Do not supply a request body with this method.

#### HTTP Response

If successful, this method returns a [Drive resource][drive-resource] of
the matching drive in the response body.

```json
{
    "id": "0123456789abc",
    "owner": {
        "id": "12391913bac",
        "name": "Ryan Gregg",
        "email": "ryan@example.org"
    },
    "quota": {
        "total": 1024000,
        "used": 514000
    },
    "driveType": "consumer"
}

```
**Note:** Response object is truncated for clarity. All default properties will
be returned from the actual call.

##### Error Response

Read the [Error Responses][error-response] topic for more information about
how errors are returned.
[error-response]: ../misc/errors.md

HTTP Code | Error Code     | Error Message
--------- | -------------- | --------------
403       |                | The app does not have the proper authorization from the user.
404       | ItemNotFound   | Supplied drive-id is invalid or has invalid format

[drive-resource]: ../drives/README.md
[odata-query-parameters]: ../odata/optional-query-parameters.md
