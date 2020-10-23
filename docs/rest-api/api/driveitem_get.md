---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Get a file or folder - OneDrive API
localization_priority: Priority
---
# Get a DriveItem resource

Retrieve the metadata for a [DriveItem](../resources/driveitem.md) in a [Drive](../resources/drive.md) by file system path or ID.

## Permissions

One of the following permissions is required to call this API. To learn more, including how to choose permissions, see [Permissions](../concepts/permissions_reference.md).

|Permission type      | Permissions (from least to most privileged)              |
|:--------------------|:---------------------------------------------------------|
|Delegated (work or school account) | Files.Read, Files.ReadWrite, Files.Read.All, Files.ReadWrite.All, Sites.Read.All, Sites.ReadWrite.All    |
|Delegated (personal Microsoft account) | Files.Read, Files.ReadWrite, Files.Read.All, Files.ReadWrite.All    |
|Application | Files.Read.All, Files.ReadWrite.All, Sites.Read.All, Sites.ReadWrite.All |

## HTTP request

<!-- { "blockType": "ignored" } -->

```http
GET /drives/{drive-id}/items/{item-id}
GET /drives/{drive-id}/root:/{item-path}
GET /groups/{group-id}/drive/items/{item-id}
GET /groups/{group-id}/drive/root:/{item-path}
GET /me/drive/items/{item-id}
GET /me/drive/root:/{item-path}
GET /sites/{siteId}/drive/items/{itemId}
GET /sites/{siteId}/drive/root:/{item-path}
GET /users/{userId}/drive/items/{itemId}
GET /users/{userId}/drive/root:/{item-path}
```

## Optional query parameters

This method supports the `$expand` and `$select` [OData query parameters](../concepts/optional-query-parameters.md) to customize the response.

You can use the [`$expand` query string parameter](../concepts/optional-query-parameters.md) to include the children of an item in the same call as retrieving the metadata of an item if the item has a **children** relationship.

## Optional request headers

| Name          | Value  | Description                                                                                                                                              |
|:--------------|:-------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
| if-none-match | String | If this request header is included and the eTag (or cTag) provided matches the current tag on the file, an `HTTP 304 Not Modified` response is returned. |

## Response

If successful, this method returns a `200 OK` response code and the [DriveItem](../resources/driveitem.md) resource in the response body.

## Example

### Request

Here is an example of the request to the root folder of the user's OneDrive.

<!-- { "blockType": "request", "name": "get-drive-root", "tags": "service.graph" }-->

```http
GET /me/drive/root
```

## Response

Here is an example of the response.

<!-- { "blockType": "response", "truncated": true, "@odata.type": "microsoft.graph.driveItem" } -->

```http
HTTP/1.1 200 OK
Content-type: application/json

{
  "createdBy": {
      "user": {
          "id": "efee1b77-fb3b-4f65-99d6-274c11914d12",
          "displayName": "Ryan Gregg"
      }
  },
  "createdDateTime": "2016-03-21T20:01:37Z",
  "cTag": "\"c:{86EB4C8E-D20D-46B9-AD41-23B8868DDA8A},0\"",
  "eTag": "\"{86EB4C8E-D20D-46B9-AD41-23B8868DDA8A},1\"",
  "folder": { "childCount": 120 },
  "id": "01NKDM7HMOJTVYMDOSXFDK2QJDXCDI3WUK",
  "lastModifiedBy": {
      "user": {
          "id": "efee1b77-fb3b-4f65-99d6-274c11914d12",
          "displayName": "Ryan Gregg"
      }
  },
  "lastModifiedDateTime": "2016-03-21T20:01:37Z",
  "name": "OneDrive",
  "root": { },
  "size": 157286400,
  "webUrl": "https://contoso-my.sharepoint.com/personal/rgregg_contoso_com/Documents"
}
```

## HEAD requests

In most cases, a HEAD request will behave the same way as a GET request. 

There are a couple differences:

1. HEAD requests will only return the corresponding GET request's headers. This is standard practice for a HEAD response.
2. HEAD requests will not automatically provision a [special folder][special-folder]. Instead, if a special folder is not present, a `404` error will be returned.

In this example, you can see that requesting the root of your OneDrive will respond with simply `200 OK`.

### HTTP request

<!-- { "blockType": "request", "name": "head-root", "scopes": "files.read", "tags": "onedrive.only" } -->

```http
HEAD /drive/root
Accept: application/json
```

### Response

<!-- {"blockType": "response", "isEmpty": true } -->

```http
HTTP/1.1 200 OK
```

## Remarks

See [Error Responses][error-response] for more info about
how errors are returned.

[error-response]: ../concepts/errors.md
[odata-parameters]: ../concepts/optional-query-parameters.md
[item-resource]: ../resources/driveitem.md
[special-folder]: ../api/drive_get_specialfolder.md

<!-- {
  "type": "#page.annotation",
  "description": "Retrieve metadata about an item and its children in OneDrive",
  "keywords": "retrieve,item,metadata",
  "section": "documentation",
  "tocPath": "Items/Get item"
} -->
