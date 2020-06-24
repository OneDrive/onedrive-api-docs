---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Upload contents and metadata - OneDrive API
localization_priority: Normal
---
# Multipart upload to OneDrive using POST

The multipart upload method allows you to provide metadata about an item and the contents of the item in a single API call.
This method only supports requests up to 4MB in size.

**Note:** Multipart upload is only available on OneDrive personal.

To upload large files see [Upload large files with an upload session](driveitem_createuploadsession.md).

## Permissions

One of the following permissions is required to call this API. To learn more, including how to choose permissions, see [Permissions](../concepts/permissions_reference.md).

|Permission type      | Permissions (from least to most privileged)              |
|:--------------------|:---------------------------------------------------------|
|Delegated (work or school account) | n/a    |
|Delegated (personal Microsoft account) | Files.ReadWrite, Files.ReadWrite.All    |
|Application | n/a |

## HTTP request

<!-- {"blockType": "ignored" } -->

```http
POST /me/drive/items/{item-id}/children
POST /me/drive/root:/{item-path}/:children
```

### Request body (multipart content + metadata upload)

The multipart body sets metadata for the file along with the contents of the file at the same time.
The service detects this scenario when the `Content-Type: multipart/related` header is included in the request.

For more information about multipart/related encoding, see [RFC 2387](https://www.ietf.org/rfc/rfc2387.txt) multipart/related documents.

The uploaded document must contain exactly two parts:

| Part name    | Type             | Description                                        |
|:-------------|:-----------------|:---------------------------------------------------|
| **metadata** | application/json | The metadata values to use when creating the item. |
| **content**  | various          | The binary content of the item being created.      |

The request will be rejected if more than two parts are included.
Each part must specify a **name** value in the `Content-Disposition` header that indicates which part it is.
Parts can be in either order, but should specify the metadata part first.

<!-- { "blockType": "request", "name": "upload-multipart", "@odata.type": "microsoft.graph.driveItem", "scopes": "files.readwrite", "tags": "service.onedrive" } -->

```http
POST /drive/items/{folder-id}/children
Content-Type: multipart/related; boundary="A100x"

--A100x
Content-ID: <metadata>
Content-Type: application/json

{
  "name": "newfile.txt",
  "file": {},
  "@microsoft.graph.sourceUrl": "cid:content",
  "@microsoft.graph.conflictBehavior": "rename"
}

--A100x
Content-ID: <content>
Content-Type: text/plain

Contents of the file to be uploaded.

--A100x--
```

**Note:** You can use an [Instance Attribute](../resources/driveitem.md#instance-attributes) on the Item metadata to control what happens if you are uploading a file that matches an existing file's name.
By default, the upload fails if an existing item has the same name.

### Response

If successful, this method returns a [driveItem resource](../resources/driveitem.md) in the response body for the newly created file.

<!-- { "blockType": "response", "@odata.type": "microsoft.graph.driveItem", "truncated": true } -->

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "0123456789abc",
  "name": "newfile.txt",
  "file": { }
}
```

## Error responses

Read the [Error Responses][error-response] topic for more information about how errors are returned.

## Remarks

The multipart upload method is not supported in OneDrive for Business, SharePoint Online and SharePoint Server 2016.


[error-response]: ../concepts/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "Create a new item with custom metadata and content upload.",
  "keywords": "create,upload,post,custom metadata",
  "section": "documentation",
  "suppressions": [
    "Warning: /api/driveitem_post_content.md:
      Failed to parse any rows out of table with headers: |Part name|Type|Description|"
  ]
} -->
