---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Create a new folder - OneDrive API
localization_priority: Priority
---
# Create a new folder in a drive

Create a new folder or [DriveItem](../resources/driveitem.md) in a [Drive](../resources/drive.md) with a specified parent item or path.

## Permissions

One of the following permissions is required to call this API. To learn more, including how to choose permissions, see [Permissions](../concepts/permissions_reference.md).

|Permission type      | Permissions (from least to most privileged)              |
|:--------------------|:---------------------------------------------------------|
|Delegated (work or school account) | Files.ReadWrite, Files.ReadWrite.All, Sites.ReadWrite.All    |
|Delegated (personal Microsoft account) | Files.ReadWrite, Files.ReadWrite.All    |
|Application | Files.ReadWrite.All, Sites.ReadWrite.All |

## HTTP request

<!-- { "blockType": "ignored" } -->

```http
POST /drives/{drive-id}/items/{parent-item-id}/children
POST /groups/{group-id}/drive/items/{parent-item-id}/children
POST /me/drive/items/{parent-item-id}/children
POST /sites/{site-id}/drive/items/{parent-item-id}/children
POST /users/{user-id}/drive/items/{parent-item-id}/children
```

## Request body

In the request body, supply a JSON representation of the [DriveItem](../resources/driveitem.md) resource to create.

## Response

If successful, this method returns `201 Created` response code and a [Driveitem](../resources/driveitem.md) resource in the response body.

## Example

### Request

Here is an example of the request to create a new folder in the signed-in user's OneDrive root folder.
The `@microsoft.graph.conflictBehavior` property used indicates that if an item already exists with the same name, the service should choose a new name for the folder while creating it.

<!-- { "blockType": "request", "name": "create-folder", "scopes": "files.readwrite" } -->

```http
POST /me/drive/root/children
Content-Type: application/json

{
  "name": "New Folder",
  "folder": { },
  "@microsoft.graph.conflictBehavior": "rename"
}
```

### Response

If successful, this method returns the newly created folder as a [DriveItem][item-resource] resource.

<!-- { "blockType": "response", "@odata.type": "microsoft.graph.driveItem", "truncated": true } -->

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "createdBy": {
    "user": {
      "displayName": "Ryan Gregg",
      "id": "309EC495-3E92-431D-9124-F0299633171D"
    }
  },
  "createdDateTime": "2016-09-20T14:34:00Z",
  "eTag": "343F1FBD-E9B3-4DDE-BCA7-D61AEAFF44E5,1",
  "id": "ACEA49D1-1444-45A9-A1CB-68B1B28AE491",
  "lastModifiedBy": {
    "user": {
      "displayName": "Ryan Gregg",
      "id": "309EC495-3E92-431D-9124-F0299633171D"
    }
  },
  "lastModifiedDateTime": "2016-09-20T14:34:00Z",
  "name": "New Folder",
  "parentReference": {
    "driveId": "5FE38E3C-051C-4D55-9B83-8A437658275B",
    "id": "E67A8F34-B0AA-46E1-8FF7-0750A29553DF",
    "path": "/drive/root:/"
  },
  "size": 0,
  "folder": {
    "childCount": 0
  }
}
```

## Error response

Read the [Error Responses][error-response] topic for more info about
how errors are returned.
[error-response]: ../concepts/errors.md
[item-resource]: ../resources/driveitem.md
[folder-facet]: ../resources/folder.md

<!-- {
  "type": "#page.annotation",
  "description": "Create a folder item in a drive.",
  "keywords": "create,folder,new item",
  "section": "documentation",
  "tocPath": "Items/Create folder"
} -->
