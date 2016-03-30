# Recently used files

List a set of items that have been recently used by the signed in user. This list
includes items that are in the user's drive as well as items they have access to
from other drives.

<!-- { "name": "view-recent-files", "idempotent": true, "scopes": "files.read service.onedrive" } -->
```http
GET /drive/view.recent
```

The response is a collection of [Item resources](../resources/item.md). They are
ordered by most recently used first.

<!-- { "@odata.type": "oneDrive.item", "isCollection": true, "truncated": true} -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "value": [
    {
      "id": "1312abc!1231",
      "remoteItem":
      {
        "id": "1991210caf!192",
        "name": "March Proposal.docx",
        "file": { },
        "size": 19121,
        "parentReference": {
          "driveId": "1991210caf",
          "id": "1991210caf!104"
        }
      }
    },
    {
      "id": "1312def!9943",
      "name": "Vacation.jpg",
      "file": { },
      "size": 37810,
      "parentReference": {
        "driveId": "1312def",
        "id": "1312def!123"
      }
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

<!-- {
  "type": "#page.annotation",
  "description": "Retrieve a list of recently used files for the owner of the drive.",
  "keywords": "drive,onedrive.drive,default drive",
  "section": "documentation",
  "tocPath": "Drives/Recent Files"
} -->
