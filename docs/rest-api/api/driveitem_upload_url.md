---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Upload from a URL - OneDrive API
localization_priority: Priority
---
# Upload an item to OneDrive from a URL (preview)

Your app can upload an item to OneDrive by providing a URL.
OneDrive will download the file directly from a remote server so your app doesn't have to upload the file's bytes.
This is especially useful for mobile clients or browser add-ins, where the file contents aren't available, or are expensive to transfer.

To upload large files see [Upload large files with an upload session](driveitem_createuploadsession.md).

**Note:** You can only upload items from a URL to OneDrive personal.

## Permissions

One of the following permissions is required to call this API. To learn more, including how to choose permissions, see [Permissions](../concepts/permissions_reference.md).

|Permission type      | Permissions (from least to most privileged)              |
|:--------------------|:---------------------------------------------------------|
|Delegated (work or school account) | n/a   |
|Delegated (personal Microsoft account) | Files.ReadWrite, Files.ReadWrite.All    |
|Application | n/a |

## HTTP request

<!-- { "blockType": "ignored" } -->

```http
POST /me/drive/items/{parent-item}/children
```

### Request headers

| Name   | Type  | Description                                                                                    |
|:--------------|:-------|:-----------------------------------------------------------------------------------------------|
| **Prefer**    | string | Set to `respond-async` to enable asynchronous item transfer. Otherwise the request is aborted. |

## Request body

The contents of the request body should be the JSON representation of the item to create from the remote URL.
Note that when the serivce downloads the file from the remote URL, it will not authenticate as the user, so the URL must be publicly accessible.

## Response

This method returns details about how to [monitor the progress](../concepts/long-running-actions.md) of the download, upon accepting the request.

<!-- { "blockType": "ignored" } -->

```http
HTTP/1.1 202 Accepted
Location: https://api.onedrive.com/monitor/4A3407B5-88FC-4504-8B21-0AABD3412717
```

## Example

<!-- { "blockType": "request", "name": "upload-from-url", "scopes": "files.readwrite", "tags": "service.onedrive" } -->

```http
POST /drive/items/{parent-item}/children
Content-Type: application/json
Prefer: respond-async

{
  "@microsoft.graph.sourceUrl": "http://wscont2.apps.microsoft.com/winstore/1x/e33e38d9-d138-42a1-b252-27da1924ca87/Screenshot.225037.100000.jpg",
  "name": "halo-screenshot.jpg",
  "file": { }
}
```

### Response

The service will return immediately upon accepting the request and provide details about how to monitor the progress of the copy.

<!-- { "blockType": "response" } -->

```http
HTTP/1.1 202 Accepted
Location: https://api.onedrive.com/monitor/4A3407B5-88FC-4504-8B21-0AABD3412717
```

The value of the `Location` header provides a URL that can be used to get the current state of the operation and let you know when the upload has finished.

## Remarks

Uploading an item to OneDrive for Business, SharePoint Online and SharePoint Server 2016 using a URL is not supported.

[item-resource]: ../resources/driveitem.md

<!-- {
  "type": "#page.annotation",
  "description": "Upload a file to OneDrive from a URL",
  "keywords": "upload, upload from url",
  "section": "documentation"
} -->
