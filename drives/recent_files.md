# Recently used files

List a set of items that have been recently used by the signed in user. This list
includes items that are in the user's drive as well as items they have access to
from other drives.

<!-- { "blockType": "request", "name": "view-recent-files" } -->
```http
GET /drive/view.recent
```

The response is a collection of [Item resources](../resources/item.md). They are
ordered by most recently used first.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "isCollection": true, "truncated": true} -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "value": [
    {
      "id": "1312abc",
      "name": "most-recent-file.docx",
      "lastModifiedDateTime": "2014-01-12T05:07:21Z"
    },
    {
      "id": "1419alac",
      "name": "another-recent-file.xlsx",
      "lastModifiedDateTime": "2014-01-11T21:01:52Z"
    }
  ]
}
```

**Note:** The objects in the response are truncated for readability. The
actual HTTP response will include all default properties of these items.

### Error Responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.

[error-response]: ../misc/errors.md
