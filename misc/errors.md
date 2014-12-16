# Error Response

Errors are returned using standard HTTP error code syntax. Additional
information is included in the body of the failed call. An example of a full
JSON error body is listed below:

```json
{
	"error":
	{
		"code": "unsupported_func",
		"message": "Unsupported functionality",
		"target": "query",
		"details": [
			{
			"code": "301",
			"target": "$search",
			"message":  "requested query option not supported",
			}
		],
		"innererror": {
			"trace": [ ],
			"context": { }
		}
	}
}
```

The error response is a single JSON object. The object contains a single
property named `error` which includes all of the details of the error message.

**Note:** Error messages are not localized and are intended for the developer
to reference. They should not be displayed directly to the user.

**Note:** The `innererror` property will not be returned on the production side
for non-dogfood accounts. This property contains information that will enable
service-level debugging.

### Common Error Codes

Below is a listing of common application error code/scenarios. The relevant
error codes/conditions are listed at individual API level.


HTTP Code | HTTP MSG                        | Error Code                    | Error Message
--------- | ------------------------------- | ----------------------------- | ----------------
400       | Bad Request                     | InvalidRequest                | Cannot process the request
400       | Bad Request                     | PathContainsInvalidCharacters | Cannot parse the Resource Path
400       | Bad Request                     | InvalidArgument               | The argument is invalid or missing or has an incorrect format
401       | Unauthorized                    | Unauthenticated               | Required authentication information  is either missing or invalid
403       | Forbidden                       | AccessDenied                  | You cannot perform the requested operation
403       | Forbidden                       | NotAllowed                    | The request isn’t allowed
403       | Forbidden                       | VirusInfected                 | The resource is infected with malware
404       | Not Found                       | ItemNotFound                  | The requested resource doesn’t exist
406       | Not Acceptable                  | FormatNotAccepted             | This service doesn’t support the requested format
409       | Conflict                        | NameAlreadyExists             | The resource with the same name already exists
409       | Conflict                        | EditConflict                  | Unable to process the request due to a conflict
409       | Conflict                        | FolderNotEmpty                | The ‘Delete If Empty’ flag is on and the folder is not empty
411       | Length Required                 | ContentLengthRequired         | A Content-Length header is required
412       | Pre Condition Failed            | ResourceModified              | The server doesn’t meet a requirement for the request
413       | Request Entity Too Large        | RequestTooLarge               | The file size exceeds the maximum size
416       | Requested Range Not Satisfiable | InvalidRange                  | The requested range is invalid
429       | Too Many Requests               | ActivityLimitReached          | Activity limit has been reached
500       | Internal Server Error           | GeneralException              | There was an internal server error while processing the request
501       | Not Implemented                 | NotImplemented                | The requested feature isn’t implemented
503       | Service Unavailable             | ServiceNotAvailable           | The service is unavailable
507       | Insufficient Storage            | QuotaLimitReached             | The maximum storage quota has been reached
