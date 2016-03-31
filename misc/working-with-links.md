# Remote items and shared folders

OneDrive supports adding a shared folder to a drive in order to make accessing
content from a shared folder easier. When a shared folder is added to
OneDrive, the folder appears in the root, and its contents are synchronized using the OneDrive sync client.

When enumerating a collection of items, shared folders appear as items
with the **[remoteItem](../facets/remoteitem_facet.md)** facet. This facet
includes the information necessary to access the contents of the shared folder
using the OneDrive API.

## Add a shared folder to the user's drive

Before a shared folder can be added to the user's drive, the following
requirements must be met:

* The user has explicit permission to the shared folder, and isn't accessing the shared folder through a link.
* Your app needs read/write access to the drive where the shared folder will be
  added.

**Note:** A shared folder can only be added to the root of a user's drive.

To add the shared folder to a drive, your app POSTs to the drive's root collection
with the details of the shared folder in the **remoteItem** facet. For example:

<!-- { "blockType": "request", "name": "add-mountpoint",
       "@odata.type": "oneDrive.item", "truncated": true, "scopes": "files.readwrite service.onedrive" } -->
```http
POST /drive/root/children
Content-Type: application/json

{
  "name": "Team Documents",
  "remoteItem": {
      "id": "12345abcde!1221",
      "parentReference": { "driveId": "12345abcde" }
  }
}
```

**Note:** **driveId** and **id** are required.

If successful, the service responds with the complete details of the
created remote item:

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true} -->
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "98765432!12399",
  "name": "Team Documents",
  "remoteItem": {
    "id": "12345abcde!1221",
    "parentReference": {
      "driveId": "12345abcde"
    },
    "folder": { "childCount": 15 }
  },
  "lastModifiedDateTime": "2015-08-10T13:47:11Z",
  "createdDateTime": "2015-08-10T13:47:11Z",
}
```

## Remove a shared folder from the user's drive

To remove a shared folder, simply DELETE the remote item:

<!-- { "blockType": "request", "name": "delete-mountpoint", "scopes": "files.readwrite service.onedrive" } -->
```http
DELETE /drive/items/{local-item-id}
```

This will return a **204 No Content** if the shared folder was removed
successfully. This does not delete the shared folder or items contained in the
shared folder.

<!-- { "blockType": "response" } -->
```http
HTTP/1.1 204 No Content
```

## Enumerate the contents of a shared folder

A remote item provides the information necessary to make a call to the actual
item it represents. The remote item is a placeholder in the user's
drive for that item, but cannot be accessed like an item in the user's drive.
For example, requesting the **children** collection for a remote item will
result in an error from the server.

In this example, consider the following remote item:

<!-- { "blockType": "example", "@odata.type": "oneDrive.item", "name": "mount-point", "truncated": true } -->
```json
{
  "id": "98765432!12399",
  "name": "Team Documents",
  "remoteItem": {
    "id": "12345abcde!1221",
    "parentReference": {
      "driveId": "12345abcde"
    }
  },
  "lastModifiedDateTime": "2015-08-10T13:47:11Z",
  "createdDateTime": "2015-08-10T13:47:11Z"
}
```

To enumerate the contents of this shared folder, the **remoteItem** property is
used to construct a request to the shared folder contained in the remote
drive.

<!-- { "blockType": "request", "name": "enum-mountpoint", "scopes": "files.read service.onedrive" } -->
```http
GET /drives/{drive-id}/items/{item-id}/children
```

This example returns the children of the shared folder, by calling into the
parent drive of the shared folder.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true, "isCollection": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "value":
  [
    {
      "id": "12345abcde!9912",
      "name": "Team Roster.xlsx",
      "file": {  },
      "size": 90122
    }
  ]
}
```

## Using view.delta with remote items

When using **[view.delta](../items/view_changes.md)** in a drive with
shared folders, the shared folder themselves will be returned as part of the
response but the items contained within a shared folder will not be returned. A
separate call to **view.delta** and separate cached delta token is required for each shared folder.

## Moving items into a shared folder

The OneDrive API does not support moving or copying items into
a shared folder. New items can be created in the folder by using the regular
[upload actions](../items/upload.md) and targeting the remoteItem
**driveId** and **id**.


<!-- {
  "type": "#page.annotation",
  "description": "Learn how to access shared folders and remote items in OneDrive API.",
  "keywords": "shared folders, mountpoint, mount points, remote items, symlink, onedrive, shared, items, linked",
  "section": "documentation",
  "tocPath": "Concepts/Remote items"
} -->
