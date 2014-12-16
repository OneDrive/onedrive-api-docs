# Delete Item

Delete an Item using an ID or path. Note that deleting items with this method
will move the items to the Recycling Bin instead of permanently deleting the
item.


##### Pre-requisites
To call the Delete API, the user must have granted the application write access
to the item to be deleted.

##### HTTP Request
```
DELETE /drive/items/{item-id}
DELETE /drive/root:/{item-path}
```

##### Optional Request Query Parameters
Name      | Value     | Description
--------- | --------- | -----------
`ifEmpty` | `boolean` | If `true`, deletion will fail if the item has any children. By default it is set to false.

##### Optional Request Headers
Name       | Value  | Description
---------- | ------ | -----------
`if-match` | `etag` | If this request header is included and the etag provided does not match the current etag on the item, an `412 Precondition Failed` response is returned and the item will not be deleted.

##### Request Body
Do not supply a request body with this method.


#### Example
```
DELETE /drive/items/123456789ABC
```

##### Response

If successful, this call returns a `204 No Content` response to indicate that
resource was deleted and there was nothing to return.

```http
HTTP/1.1 204 No Content
```

##### Error Response

Read the [Error Responses][error-response] topic for more information about
how errors are returned.
[error-response]: ../misc/errors.md

HTTP Code|HTTP Error Message|Error Code|Error Message|Notes
---|---|---|---|---|---|
400|Bad Request|FolderNotEmpty|Delete If Empty flag is on for non-empty Folder|
403|Forbidden|AccessRestricted|The app does not have authorization to delete this file.|
403|Forbidden|AccessRestricted|Resource has been restricted in use|
404|Not Found|ResourceDoesNotExist|Resource specified in the request does not exist|
405|Method Not Allowed|RootFolderDeletedNotAllowed|Root Folder cannot be deleted|
409|Conflict|EditConflict|Request could not be processed because of conflict|
412|Pre Condition Failed|ResourceModified|The server does not meet one of the preconditions that the requester put on the request.|
