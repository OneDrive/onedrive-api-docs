---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Get Drive - OneDrive API
localization_priority: Priority
---
# Get Drive

Retrieve the properties and relationships of a [Drive](../resources/drive.md) resource.

A Drive is the top-level container for a file system, such as OneDrive or SharePoint document libraries.

## Permissions

One of the following permissions is required to call this API. To learn more, including how to choose permissions, see [Permissions](../concepts/permissions_reference.md).

|Permission type      | Permissions (from least to most privileged)              |
|:--------------------|:---------------------------------------------------------|
|Delegated (work or school account) | Files.Read, Files.ReadWrite, Files.Read.All, Files.ReadWrite.All, Sites.Read.All, Sites.ReadWrite.All    |
|Delegated (personal Microsoft account) | Files.Read, Files.ReadWrite, Files.Read.All, Files.ReadWrite.All    |
|Application | Files.Read.All, Files.ReadWrite.All, Sites.Read.All, Sites.ReadWrite.All |

## Get current user's OneDrive

The signed in user's drive (when using delegated authentication) can be accessed from the `me` singleton.

If a user's OneDrive is not provisioned but the user has a license to use OneDrive, this request will automatically provision the user's drive, when using delegated authentication.

### HTTP request

<!-- { "blockType": "request", "name": "get-drive-default", "scopes": "files.read", "tags": "service.graph" } -->

```http
GET /me/drive
```

When using the direct OneDrive service endpoint, leave out the `/me` segment.

<!-- { "blockType": "request", "name": "get-drive-default-direct", "scopes": "files.read", "tags": "onedrive.only" } -->

```http
GET /drive
```

## Get a user's OneDrive

To access a user's OneDrive or OneDrive for Business, your app must request the **drive** relationship on the User resource.

If a user's OneDrive is not provisioned but the user has a license to use OneDrive, this request will automatically provision the user's drive, when using delegated authentication.

### HTTP request

<!-- { "blockType": "request", "name": "get-drive-by-user", "scopes": "files.read.all", "tags": "service.graph" } -->

```http
GET /users/{idOrUserPrincipalName}/drive
```

### Path parameters

| Parameter name | Value  | Description                                       |
|:---------------|:-------|:--------------------------------------------------|
| _idOrUserPrincipalName_     | string | Required. The identifier for the user object who owns the OneDrive. |

## Get the document library associated with a group

To access a Group's default document library, your app requests the **drive** relationship on the Group.

### HTTP request

<!-- { "blockType": "request", "name": "get-drive-by-group", "scopes": "group.read.all", "tags": "service.graph" } -->

```http
GET /groups/{groupId}/drive
```

### Path parameters

| Parameter name | Value  | Description                                       |
|:---------------|:-------|:--------------------------------------------------|
| _groupId_      | string | Required. The identifier for the group which owns the document library. |

## Get the document library for a site

To access a [Site's](../resources/site.md) default document library, your app requests the **drive** relationship on the Site.

### HTTP request

```http
GET /sites/{siteId}/drive
```

### Path parameters

| Parameter name | Value  | Description                                       |
|:---------------|:-------|:--------------------------------------------------|
| _siteId_       | string | Required. The identifier for the site that contains the document library. |

## Get a drive by ID

If you have the unique identifier for a drive, you can access it directly from the top-level drives collection.

### HTTP request

<!-- { "blockType": "request", "name": "get-drive-by-id", "scopes": "files.read" } -->

```http
GET /drives/{drive-id}
```

### Path parameters

| Parameter name | Value  | Description                                       |
|:---------------|:-------|:--------------------------------------------------|
| _driveId_      | string | Required. The identifier for the drive requested. |

## Optional query parameters

These method support the [$select query parameter][odata-query-parameters] to shape the response.

## HTTP response

Each of these methods returns a [Drive resource][drive-resource] for the matching drive in the response body.

<!-- { "blockType": "response", "@odata.type": "microsoft.graph.drive", "truncated": true, "name": ["get-drive-by-id", "get-drive-by-group", "get-drive-by-user", "get-drive-default", "get-drive-default-direct"] } -->

```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "id": "b!t18F8ybsHUq1z3LTz8xvZqP8zaSWjkFNhsME-Fepo75dTf9vQKfeRblBZjoSQrd7",
    "driveType": "business",
    "owner": {
        "user": {
            "id": "efee1b77-fb3b-4f65-99d6-274c11914d12",
            "displayName": "Ryan Gregg"
        }
    },
    "quota": {
        "deleted": 256938,
        "fileCount": 2,
        "remaining": 1099447353539,
        "state": "normal",
        "total": 1099511627776
    }
}
```

### Error response codes

If the drive does not exist and cannot be provisioned automatically (when using delegated authentication) an `HTTP 404` response will be returned.

[drive-resource]: ../resources/drive.md
[odata-query-parameters]: ../concepts/optional-query-parameters.md

<!-- {
  "type": "#page.annotation",
  "description": "Get metadata for a OneDrive, OneDrive for Business, or Office 365 group drive",
  "keywords": "drive,onedrive,default drive,group drive",
  "section": "documentation",
  "suppressions": [
      "Warning: /api/drive_get.md:
        Unable to map some markdown elements into schema.
            Unmapped methods:
        get-drive-default, get-drive-default-direct, get-drive-by-user, get-drive-by-group, get-drive-by-id
            Unmapped tables:
        Permissions - AuthScopes, Path parameters - PathParameters, Path parameters - PathParameters, Path parameters - PathParameters, Path parameters - PathParameters"
  ],
  "tocPath": "Drives/Get drive"
} -->
