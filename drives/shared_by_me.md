# List items shared from a drive

Return the shared items that exist in the target drive.

**Note:** this API is only available on OneDrive Personal.

<!-- { "blockType": "request", "name": "shared-by-me", "scopes": "files.read service.onedrive" } -->
```http
GET /drive/shared
```

This returns a collection of [Item resources](../resources/item.md) that enumerates
the set of items that have been shared by the current user.

<!-- {
"blockType": "response", "@odata.type": "oneDrive.item",
"isCollection": true, "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "value": [
    { "id": "1231abc", "name": "shared-file1.txt" },
    { "id": "1231abd", "name": "shared-file2.txt" },
    { "id": "1231abf", "name": "shared-file3.txt" },
  ]
}
```

You can also use this path on another user's drive to list the files that are
accessible in that user's drive by the currently signed in user.

For example, to see what files have been shared between the current user
and the user with a drive-id of `1234ABCDE` you can make this call:

```
GET /drives/1234ABCDE/shared
```

This will return a collection as above for all items that the signed in user
can access from the specified drive.

##### Error Responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.

[error-response]: ../misc/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "List the items shared in the target drive.",
  "keywords": "drive,onedrive.drive,default drive",
  "section": "documentation",
  "tocPath": "Drives/List Shared Files"
} -->
