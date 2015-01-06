# Copy Item

Create copy of an Item (including any children) under a new parent.

##### Pre-requisites
To call the Copy API, the user must have granted the application read access to
the specified folder to be copied and write access to the destination parent folder.

##### HTTP Request

<!-- { "blockType": "ignored" } -->
```
POST /drive/items/{item-id}/action.copy
POST /drive/root:/{item-path}:/action.copy
```


##### Request Body
In the request body, provide a JSON object that sets the following parameters:

Name             | Value    | Description
---------------- | -------- | ---
`destFolderId`   | `string` | The ID for the parent folder the copy should be created in.
`destFolderPath` | `string` | The path for the parent folder the copy should be created in.
`newName`        | `string` | *Optional* The new filename for the copy. If not provided, the same filename will be used as the original.

**Note** Either destFolderID or destPath should be provided, do not specify
both values.

##### Example

<!-- { "blockType": "request", "name": "copy-item" } -->
```http
POST /drive/items/{item-id}/action.copy
Content-Type: application/json

{
  "destFolderId": "123456789abc",
  "newName": "copy of item (1)"
}
```

##### Response

If successful, this method returns an [Item][item-resource] in the response
body.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-type: application/json
Content-length: length

{
  id: "0123456789abc",
  name: "copy of item (1)"
}
```

**Note:** Response object is truncated for clarity. All default properties will
be returned from the actual call.


##### Error Responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.
[error-response]: ../misc/errors.md

HTTP Code|HTTP Error Message|Error Code|Error Message|Notes
---|---|---|---|---|---|
400|Bad Request|MissingBody|Request Body is required|
400|Bad Request|InvalidBody|Supplied request body is invalid or incomplete|
400|Bad Request|TotalAffectCountTooLarge|Operation is not allowed because the number of affected items exceeds threshold.|
403|Forbidden|AccessRestricted|The app does not have authorization to delete this file.|
403|Forbidden|AccessRestricted|Resource has been restricted in use|
404|Not Found|SourceDoesNotExist|Source resource specified in the request does not exist|
404|Not Found|DestinationDoesNotExist|Destination folder specified in the request does not exist|
403|Forbidden|QuotaLimitReached|The maximum storage quota has been reached|
403|Forbidden|InsufficientSpaceAvailable|The intended operation would exceed the quota|
409|Conflict|ItemAlreadyExists|Target resource already exists |

[item-resource]: ../resources/item.md
