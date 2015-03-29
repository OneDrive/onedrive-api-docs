# Error response

Errors are returned using standard HTTP error code syntax. The following
HTTP status codes should be expected.

| Status code | Status message                  | Description                                                                                                             |
|:------------|:--------------------------------|:------------------------------------------------------------------------------------------------------------------------|
| 400         | Bad Request                     | Cannot process the request because it is malformed or incorrect.                                                        |
| 401         | Unauthorized                    | Required authentication information is either missing or not valid for the resource.                                    |
| 403         | Forbidden                       | Access is denied to the requested resource. The user might not have enough permission.                                  |
| 404         | Not Found                       | The requested resource doesn’t exist.                                                                                   |
| 405         | Method Not Allowed              | The HTTP method in the request is not allowed on the resource.                                                          |
| 406         | Not Acceptable                  | This service doesn’t support the format requested in the Accept header.                                                 |
| 409         | Conflict                        | The current state conflicts with what the request expects. For example, the specified parent folder might not exist.    |
| 411         | Length Required                 | A Content-Length header is required on the request.                                                                     |
| 412         | Precondition Failed             | A precondition provided in the request (such as an if-match header) does not match the resource's current state.        |
| 413         | Request Entity Too Large        | The request size exceeds the maximum limit.                                                                             |
| 415         | Unsupported Media Type          | The content type of the request is a format that is not supported by the service.                                       |
| 416         | Requested Range Not Satisfiable | The specified byte range is invalid or unavailable.                                                                     |
| 422         | Unprocessable Entity            | Cannot process the request because it is semantically incorrect.                                                        |
| 429         | Too Many Requests               | Client application has been throttled and should not attempt to repeat the request until an amount of time has elapsed. |
| 500         | Internal Server Error           | There was an internal server error while processing the request.                                                        |
| 501         | Not Implemented                 | The requested feature isn’t implemented.                                                                                |
| 503         | Service Unavailable             | The service is temporarily unavailable. You may repeat the request after a delay. There may be a Retry-After header.    |
| 507         | Insufficient Storage            | The maximum storage quota has been reached.                                                                             |

The error response is a single JSON object. The object contains a single
property named **error**, which includes all of the details of the error message.
Additional information is included in the body of the failed call. Here is an example
of a full JSON error body.

<!-- { "blockType": "example", "@odata.type": "oneDrive.error", "expectError": true } -->
```json
{
  "error": {
    "code": "invalidRange",
    "message": "Uploaded fragment overlaps with existing data.",
    "innererror": {
      "code": "fragmentOverlap"
    }
  }
}

```

**Important:** Error messages are not localized and are intended for the developer
to reference. They shouldn't be displayed directly to the user.
