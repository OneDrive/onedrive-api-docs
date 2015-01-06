# Simple Item Upload (PUT)

The simple upload API allows you to provide the contents of a new file or update
the contents of an existing file in a single API call. This method only supports
files up to 100MB in size.

See [Uploading Item Contents](upload.md) for more information about how to upload
the contents of an item.

##### Pre-requisites

To use the Upload APIs, the user must have granted the application write access
to the folder that the file will be uploaded to.

##### HTTP Request

```
PUT /drive/items/{parent-id}:/{filename}:/content
PUT /drive/root:/{parent-path}/{filename}:/content
PUT /drive/items/{parent-id}/children/filename/content
```

##### Optional Request Headers
Header Name | Value    | Description
----------- | -------- | -----------
`Expect`    | `string` | Can be set to `100-continue` if the requesting client wants to validate the PUT request before transmitting data.

##### Request Body
The contents of the request body should be the binary stream of the file to be uploaded.

#### Example

<!-- { "blockType": "request", "name": "upload-via-put" } -->
```
PUT /drive/root:{path-to-file}:/content
Content-Type: text/plain

The contents of the file go here.
```

##### Response

If successful, this method returns an [Item][item-resource] resource in
the response body for the newly created file.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 201 Created
Content-Type: application/json
Content-Length: length

{
	"id": "0123456789abc",
	"name": "myfile.jpg"
}
```

**Note:** Response object is truncated for clarity. All default properties will be returned from the actual call.

##### Error Response

Read the [Error Responses][error-response] topic for more information about
how errors are returned.
[error-response]: ../misc/errors.md

HTTP Code|HTTP Error Message|Error Code|Error Message|Notes
---|---|---|---|---|---|
400|Bad Request|PathTooDeep|Folder hierarchy depth limit reached|
400|Bad Request|InvalidResourceName|Resource name is invalid or has incorrect format|
403|Forbidden|AccessRestricted|The app does not have authorization to delete this file.|
403|Forbidden|QuotaLimitReached|The maximum storage quota has been reached|
403|Forbidden|InsufficientSpaceAvailable|The intended operation would exceed the quota|
405|Method Not Allowed|NotUpdatable|Method not allowed for the specified resource|(Note: applies to when /content is not specified or another invalid or property of the entity is specified as the target
409|Conflict|ItemAlreadyExists|File already Exists |
413|Request Entity Too Large|SizeTooLarge|File size is larger than the maximum size allowed for this operation|
417|Expectation Failed|InvalidExpectValue|Invalid Expect header value supplied

[item-resource]: ../resources/item.md
