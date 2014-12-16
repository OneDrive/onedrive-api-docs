# Update an Item

Update the metadata for an Item by ID or path. You can also use update to move
an Item to another parent by updating the item's ParentRef facet.

##### Pre-requisites

To call the Update API to change an Item's metadata the user must have granted
the application write access to the item to be updated.

To call the Update API to change the Item's parent, the user must have granted
the application write access to the new parent Item.

##### HTTP Request
```
PATCH /drive/items/{item-id}
PATCH /drive/root:/{folder-path}
```

##### Optional Request Headers
Name       | Value  | Description
---------- | ------ | -----------
`if-match` | `etag` | If this request header is included and the ttag provided does not match the current etag on the folder, an `412 Precondition Failed` response is returned.



##### Request Body
In the request body, supply the values for relevant fields that should be
updated. Existing properties that are not included in the request body request
will maintain their previous values or be recalculated based on changes to other
property values. For performance reasons you should not include existing values
that have not changed.


### Example

The following example renames and moves a folder to a new parent path:
```
PATCH /drive/root:/Documents/AFolder
Content-Type: application/json

{
	"name": "BFolder"
	"parentInfo" : {"path": "/Archive"}
}
```

#### Response

If successful, this method returns an [Item][item-resource] resource in
the response body.

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: length

{
	"id": "0123456789abc",
	"name": "BFolder",
	"folder": { "childrenCount": 3 }
}
```

**Note:** Response object is truncated for clarity. All default properties will be returned from the actual call.

##### Error Response

Read the [Error Responses][error-response] topic for more information about
how errors are returned.
[error-response]: ../misc/errors.md

HTTP Code|HTTP Error Message|Error Code|Error Message|Notes
---|---|---|---|---|---|
400|Bad Request|MissingBody|Request Body is required|
400|Bad Request|InvalidFolderBody|Valid JSON Folder Representation in Body is expected |
400|Bad Request|PropertyNotUpdateable|Modification not allowed for one or more properties in the request|
403|Forbidden|AccessRestricted|The app does not have authorization to delete this file.|
404|Not Found|ResourceDoesNotExist|Resource specified in the request does not exist|
405|Method Not Allowed|NotUpdatable|Method not allowed for the specified resource|
409|Conflict|EditConflict|Request could not be processed because of conflict|
412|Pre Condition Failed|ResourceModified|The server does not meet one of the preconditions that the requester put on the request.|


[item-resource]: README.md
