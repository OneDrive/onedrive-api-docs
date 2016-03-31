# Uploading large files on OneDrive

To support the upload of larger files on OneDrive, a resumable upload method is necessary.
This ensures that the whole file can be uploaded in pieces and easily resumed if
the transfer is interrupted.

Complete these steps to upload large files on OneDrive.

1. [Create an upload session](#create-an-upload-session)
2. [Upload fragments](#upload-fragments)


This topic also covers how to:

* [Resume uploads](#resume-uploads)
* [Request upload status](#request-upload-status)
* [Upload remaining data](#upload-remaining-data)
* [Handle commit errors](#handle-commit-errors)
* [Best practices](#best-practices)
* [Cancel the upload session](#cancel-the-upload-session)

## Create an upload session

To begin a large file upload, you first create an
upload session that will hold the contents of the file until it is committed.

```http
POST /drive/root:/{path_to_item}:/upload.createSession
POST /drive/items/{parent_item_id}:/{filename}:/upload.createSession
```

To start an upload session, POST a request to the path to the file or to the parent
item's item ID and name of the file to be uploaded. No request body is required.
**Note:** the parent folder must exist before you call createSession.

To specify a non-default conflict behavior provide the `item` parameter in the
request body with the appropriate value for the `@name.conflictBehavior` instance annotation.

<!-- { "blockType": "request", "name": "upload-fragment-create-session", "scopes": "files.readwrite" } -->
```http
POST /drive/root:{item-path}:/upload.createSession
Content-Type: application/json

{
  "item": {
    "@name.conflictBehavior": "rename",
    "name": "largefile.dat"
  }
}
```

### Optional request headers

| Name       | Value | Description                                                                                                                                                            |
|:-----------|:------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| *if-match* | etag  | If this request header is included and the eTag (or cTag) provided does not match the current etag on the item, a `412 Precondition Failed` errr response is returned. |

The response to this request, if successful, will provide the details for where
the remainder of the requests should be sent as an [UploadSession](../resources/uploadSession.md)
resource. This resource provides details about where the next fragment should
be uploaded and when the session expires.

<!-- { "blockType": "response", "@odata.type": "oneDrive.uploadSession",
       "optionalProperties": [ "nextExpectedRanges" ]  } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "uploadUrl": "https://sn3302.up.1drv.com/up/fe6987415ace7X4e1eF866337",
  "expirationDateTime": "2015-01-29T09:21:55.523Z",
  "nextExpectedRanges": ["0-"]
}
```


## Upload fragments

To upload the file, or a portion of the file, make a PUT request to the **uploadUrl**
received when the session was created. You can either upload the entire file
in one fragment up to 60 MiB (60 \* 1024 \* 1024 bytes), or you can break the file into
multiple fragments and upload each one separately. Fragments must be uploaded in order.

<!-- { "blockType": "request", "name": "upload-fragment-piece", "scopes": "files.readwrite" } -->
```
PUT https://sn3302.up.1drv.com/up/fe6987415ace7X4e1eF866337
Content-Length: 26
Content-Range: bytes 0-25/128

<bytes 0-25 of the file>
```

**Important:** Make sure that the total file size specified in the `Content-Range` header is
the same for all file fragments uploaded. If a fragment declares a different
size, the PUT request will fail.

When the request is complete, the server will respond with HTTP
`202 Accepted` if there are more fragments of the file that need to be uploaded.

<!-- { "blockType": "response", "@odata.type": "oneDrive.uploadSession", "truncated": true } -->
```http
HTTP/1.1 202 Accepted
Content-Type: application/json

{
  "expirationDateTime": "2015-01-29T09:21:55.523Z",
}
```

You can use the `nextExpectedRanges` value to determine where to start the next
fragment. You may see multiple ranges specified, indicating parts of the file
that the server has not yet received. This is especially useful if you need to
resume a transfer that was interrupted and your client is unsure of the state
on the service.

You should always determine the fragment size according to the best practices
below. Do not assume that **nextExpectedRanges** will return reanges of proper
size for an upload fragment. The **nextExpectedRanges** property indicates
ranges of the file that have not been received and not a pattern for how you
should upload the file.

```http
HTTP/1.1 202 Accepted
Content-Type: application/json

{
  "expirationDateTime": "2015-01-29T09:21:55.523Z",
  "nextExpectedRanges": [
  "12345-55232",
  "77829-99375"
  ]
}
```

**Notes:**

* The `nextExpectedRanges` property won't always list all of the missing ranges.
* On successful fragment writes, it will return the next range to start from (eg. "523-").
* On failures when the client sent a fragment the server had already received, the
server will respond with `HTTP 416 Requested Range Not Satisfiable`. You can
[request upload status](#request-upload-status) to get a more detailed list of missing ranges.

When the last fragment is received and the server has all of the file's bytes,
the server will respond with `HTTP 201 Created` (for a new file) or `HTTP 200 OK`
for an updated file and include an [Item][item-resource] resource for the
uploaded file:

<!-- { "blockType": "request", "name": "upload-fragment-final", "scopes": "files.readwrite" } -->
```
PUT https://sn3302.up.1drv.com/up/fe6987415ace7X4e1eF866337
Content-Length: 21
Content-Range: bytes 101-127/128

<final bytes of the file>
```

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "912310013A123",
  "name": "largefile.vhd",
  "size": 128,
  "file": { }
}
```
**Note:** The item response is truncated for documentation clarity.

If a conflict occurs after the file is uploaded (for example, an item with the
same name was created during the upload session), an error is returned when
the last fragment is uploaded.

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error":
  {
    "code": "upload_name_conflict",
    "message": "Another file exists with the same name as the uploaded session.
    You can redirect the upload session to use a new filename by calling PUT
    with the new metadata and @content.sourceUrl attribute.",
  }
}
```

## Cancel the upload session

To cancel an upload session (e.g. the user has aborted the upload),
send a DELETE request to the upload URI.

<!-- { "blockType": "request", "name": "upload-fragment-cancel", "scopes": "files.readwrite" } -->
```http
DELETE https://sn3302.up.1drv.com/up/fe6987415ace7X4e1eF866337
```

The DELETE request will cause the existing upload session to expire, and remove any previously uploaded
content for the file. The file will not appear in OneDrive. The service will
respond with a `204 No Content` upon success.

<!-- { "blockType": "response" } -->
```http
HTTP/1.1 204 No Content
```

## Resume uploads
If an upload request gets terminated while it's in progress (for example, if a
connection is dropped or the server responds with an `HTTP 503 Service Unavailable`),
you should resume the upload from where you left off. To do this, you request the
upload status, and then upload remaining data.

### Request upload status
Query the status of the upload by sending a GET request to the `uploadUrl`.

<!-- { "blockType": "request", "name": "upload-fragment-resume", "scopes": "files.readwrite" } -->
```
GET https://sn3302.up.1drv.com/up/fe6987415ace7X4e1eF86633784148bb98a1zjcUhf7b0mpUadahs
```

**Note:** You can request the status of the file at any time, not just when the
upload has failed.

The server will respond with a list of missing byte ranges that need to be uploaded.
Note: this may not be the full list of missing ranges. As the upload progresses,
more missing ranges will be returned.

<!-- { "blockType": "response", "@odata.type": "oneDrive.uploadSession", "truncated": true } -->
```http
HTTP/1.1 200 OK

{
  "expirationDateTime": "2015-01-29T09:21:55.523Z",
  "nextExpectedRanges": ["12345-"]
}
```

### Upload remaining data
Now that your app knows where to start the upload from, resume the upload by
following the steps in [upload fragments](#upload-fragments) of the file.


## Handle commit errors

When the last fragment of a file is uploaded and OneDrive starts to commit the
file to the user's drive, it is possible for an error to occur. This can be due
to a name conflict or quota limitation being exceeded. OneDrive will
preserve the upload session until the expiration time and allow your app to recover
the upload by manually committing the upload session.

To manually commit the upload session, your app must make a PUT request with a new
Item resource that will be used to commit the file. Inside the Item resource
include an [Instance Attribute](../resources/item.md#instance-attributes) for
`@content.sourceUrl` with the value of your upload session URL.

```http
PUT /drive/root:/{path_to_parent}
Content-Type: application/json
Content-Length: length
If-Match: {etag or ctag}

{
  "name": "largefile_2.vhd",
  "description": "A 5GB virtual disk",
  "@name.conflictBehavior": "rename",
  "@content.sourceUrl": "{upload session URL}"
}
```

**Note:** You can use the `@name.conflictBehavior` and `if-match` headers as
expected in this call.

If the file can be committed using the new metadata, an `HTTP 201 Created` or
`HTTP 200 OK` response will be returned with the Item metadata for the uploaded file.

## Best practices

* Resume or retry uploads that fail due to connection interruptions or any 5xx
  errors, including:
  * `500 Internal Server Error`
  * `502 Bad Gateway`
  * `503 Service Unavailable`
  * `504 Gateway Timeout`
* Use an exponential back off strategy if any 5xx server errors are returned
  when resuming or retrying upload requests.
* For other errors, you should not use an exponential back off strategy but
  limit the number of retry attempts made.
* Handle `404 Not Found` errors when doing resumable uploads by starting the
  entire upload over.
* Use resumable file transfers for files larger than 10 MiB (10 \* 1024 \* 1024 bytes).
* A fragment size of 10 MiB for stable high speed connections is optimal. For slower
  or less reliable connections you may get better results from a smaller
  fragment size. The recommended fragment size is between 5-10 MiB.
* Use a fragment size that is a multiple of 320 KiB (320 \* 1024 bytes). Failing to use a fragment
  size that is a multiple of 320 KiB can result in large file transfers failing
  after the last fragment is uploaded.

## Error responses

See the [Error Responses][error-response] topic for details about
how errors are returned.

[error-response]: ../misc/errors.md
[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "Upload files larger than 100MB using fragment upload.",
  "keywords": "upload,large file,fragment,BITS",
  "section": "documentation"
} -->
