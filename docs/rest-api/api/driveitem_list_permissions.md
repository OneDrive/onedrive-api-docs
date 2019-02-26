---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: List who has access to a file - OneDrive API
localization_priority: Priority
---
# List sharing permissions on a DriveItem

List the effective sharing permissions of on a [DriveItem](../resources/driveitem.md).

## Access to sharing permissions

The permissions collection includes potentially sensitive information and may not be available for every caller.

* For the owner of the item, all sharing permissions will be returned. This includes co-owners.
* For a non-owner caller, only the sharing permissions that apply to the caller are returned.
* Sharing permission properties that contain secrets (e.g. `shareId` and `webUrl`) are only returned for callers that are able to create the sharing permission.

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
GET /drives/{drive-id}/items/{item-id}/permissions
GET /groups/{group-id}/drive/items/{item-id}/permissions
GET /me/drive/items/{item-id}/permissions
GET /me/drive/root:/{path}:/permissions
GET /sites/{siteId}/drive/items/{itemId}/permissions
GET /users/{userId}/drive/items/{itemId}/permissions
```

## Optional query parameters

This method supports the `$select` [OData Query Parameters](../concepts/optional-query-parameters.md) to customize the response.

## Optional request headers

| Name          | Type   | Description                                                                                                                                     |
|:--------------|:-------|:------------------------------------------------------------------------------------------------------------------------------------------------|
| if-none-match | string | If this request header is included and the etag provided matches the current etag on the item, an `HTTP 304 Not Modified` response is returned. |

## Response

If successful, this method returns a `200 OK` response code and collection of [Permission](../resources/permission.md) resources in the response body.

Effective sharing permissions of a DriveItem can come from two sources:

* Sharing permissions applied directly on the DriveItem itself
* Sharing permissions inherited from the DriveItem's ancestors

Callers can differentiate if the permission is inherited or not by checking the **inheritedFrom** property.
This property is an [**itemReference**](../resources/itemreference.md) resource referencing the ancestor that the permission is inherited from.

SharePoint permission levels set on an item are returned with an 'SP' prefix. For example, SP.View Only, SP.Limited Access, SP.View Web Analytics Data. See [Full list of SharePoint roles](https://technet.microsoft.com/en-us/library/cc721640.aspx#section1).

## Example

This example retrieves the collection of permissions on an item in the signed in user's drive.

<!-- { "blockType": "request", "name": "get-item-permissions", "scopes": "files.read", "tags": "service.graph" } -->

```http
GET /me/drive/items/{item-id}/permissions
```

### Response

This example response includes three permissions, the first is a sharing link with edit permissions, the second is an explicit permission for a user named John, which was inherited from a parent folder, and the third is a read-write sharing link created by an application.

<!-- {"blockType": "response", "@odata.type": "Collection(microsoft.graph.permission)", "truncated": true} -->

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "value": [
    {
      "id": "1",
      "roles": ["write"],
      "link": {
        "webUrl": "https://onedrive.live.com/redir?resid=5D33DD65C6932946!70859&authkey=!AL7N1QAfSWcjNU8&ithint=folder%2cgif",
        "type": "edit"
      }
    },
    {
      "id": "2",
      "roles": ["write"],
      "grantedTo": {
        "user": {
          "id": "5D33DD65C6932946",
          "displayName": "John Doe"
        }
      },
      "inheritedFrom": {
        "driveId": "1234567890ABD",
        "id": "1234567890ABC!123",
        "path": "/drive/root:/Documents" }
    },
    {
      "id": "3",
      "roles": ["write"],
      "link": {
        "webUrl": "https://onedrive.live.com/redir?resid=5D33DD65C6932946!70859&authkey=!AL7N1QAfSWcjNU8&ithint=folder%2cgif",
        "type": "edit",
        "application": {
          "id": "12345",
          "displayName": "Contoso Time Manager"
        }
      }
    }
  ]
}
```

## Remarks

The **permissions** relationship of DriveItem cannot be expanded as part of a call to [get DriveItem](driveitem_get.md) or a collection of DriveItems.
You must access the permissions property directly.

## Error responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.

[error-response]: ../concepts/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "List an item's permissions",
  "keywords": "permission, permissions, sharing",
  "section": "documentation",
  "tocPath": "Sharing/Permissions"
} -->
