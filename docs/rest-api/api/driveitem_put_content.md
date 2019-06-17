---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Upload small files - OneDrive API
localization_priority: Priority
---
# Upload or replace the contents of a DriveItem

The simple upload API allows you to provide the contents of a new file or update the contents of an existing file in a single API call. 
This method only supports files up to 4MB in size.

To upload large files see [Upload large files with an upload session](driveitem_createuploadsession.md).

## Permissions

One of the following permissions is required to call this API. To learn more, including how to choose permissions, see [Permissions](../concepts/permissions_reference.md).

|Permission type      | Permissions (from least to most privileged)              |
|:--------------------|:---------------------------------------------------------|
|Delegated (work or school account) | Files.ReadWrite, Files.ReadWrite.All, Sites.ReadWrite.All    |
|Delegated (personal Microsoft account) | Files.ReadWrite, Files.ReadWrite.All    |
|Application | Files.ReadWrite.All, Sites.ReadWrite.All |

## HTTP request (to replace an existing item)

<!-- { "blockType": "ignored" } -->

```http
PUT /drives/{drive-id}/items/{item-id}/content
PUT /groups/{group-id}/drive/items/{item-id}/content
PUT /me/drive/items/{item-id}/content
PUT /sites/{site-id}/drive/items/{item-id}/content
PUT /users/{user-id}/drive/items/{item-id}/content
```

## HTTP request (to upload a new file)

<!-- { "blockType": "ignored" } -->

```http
PUT /drives/{drive-id}/items/{parent-id}:/{filename}:/content
PUT /groups/{group-id}/drive/items/{parent-id}:/{filename}:/content
PUT /me/drive/items/{parent-id}:/{filename}:/content
PUT /sites/{site-id}/drive/items/{parent-id}:/{filename}:/content
PUT /users/{user-id}/drive/items/{parent-id}:/{filename}:/content
```

## Request body

The contents of the request body should be the binary stream of the file to be uploaded.

## Response

If successful, this method returns a [driveItem](../resources/driveitem.md) object in the response body for the newly created or updated file.

## Example (upload a new file)

This example uploads the string "The contents of the file goes here." to a file in the signed-in user's drive under FolderA named FileB.txt.

<!-- { "blockType": "request", "name": "upload-via-put", "scopes": "files.readwrite" } -->

```http
PUT /me/drive/root:/FolderA/FileB.txt:/content
Content-Type: text/plain

The contents of the file goes here.
```

### Response

If successful, this method returns an [driveItem][item-resource] resource in the response body for the newly created file.

<!-- { "blockType": "response", "@odata.type": "microsoft.graph.driveItem", "truncated": true } -->

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "0123456789abc",
  "name": "FileB.txt",
  "size": 35,
  "file": { }
}
```

## Example (updating an existing file)

This example replaces the contents of a file with a known ID.

<!-- { "blockType": "request", "name": "upload-via-put-id", "scopes": "files.readwrite" } -->

```http
PUT /me/drive/items/{item-id}/content
Content-Type: text/plain

The contents of the file goes here.
```

### Response

If successful, this method returns an [driveItem][item-resource] resource in the response body for the newly created file.

<!-- { "blockType": "response", "@odata.type": "microsoft.graph.driveItem", "truncated": true } -->

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "0123456789abc",
  "name": "FileB.txt",
  "size": 35,
  "file": { }
}
```

## Remarks

### Blocked File Types

SharePoint Server 2016 blocks several file extensions from being uploaded to the server.

* .ashx - ASP.NET Web handler file
* .asmx - ASP.NET Web Services source file
* .json - JavaScript Object Notation file
* .soap - Simple Object Access Protocol file
* .svc - Windows Communication Foundation (WCF) service file
* .xamlx - Visual Studio Workflow service file

See [Types of files that cannot be added to a list or library][blocked-extensions]
for more information on blocked file extensions.

[blocked-extensions]: https://support.office.com/en-us/article/Types-of-files-that-cannot-be-added-to-a-list-or-library-30be234d-e551-4c2a-8de8-f8546ffbf5b3?ui=en-US&rs=en-AU&ad=AU&fromAR=1#__toc355959797]

### Conflict Resolution Behavior

By default, this API will replace an existing item with the same name. To customize the conflict resolution behavior, add a query parameter named @microsoft.graph.conflictBehavior with values _fail_, _replace_, or _rename_, to the request.

## Error responses

See [Error Responses][error-response] for details about
how errors are returned.

[error-response]: ../concepts/errors.md
[item-resource]: ../resources/driveitem.md

<!-- {
  "type": "#page.annotation",
  "description": "Create a new file with content or update a file's content.",
  "keywords": "insert,upsert,update,upload",
  "section": "documentation"
} -->
