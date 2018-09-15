---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: conceptual
title: Sharing items - OneDrive API
---
# Sharing items in OneDrive and SharePoint

OneDrive for Business, and SharePoint provide two different
primary ways to share items with other users:

* **Sharing links** make it easy to share files with anyone who has the link. The link
  includes the authentication required to access the file and allows either read
  or read-write access to the shared item.
* **Permissions** on the item allow it to be shared with specific users who must be
  signed in to access the files.

OneDrive API supports creating both sharing links and item permissions.

## Tasks for sharing items

| Task                                           | HTTP method                                      |
|:-----------------------------------------------|:-------------------------------------------------|
| [Create a sharing link](../api/driveitem_createlink.md) | `POST /drive/items/{item-id}/oneDrive.createLink`         |
| [Add permissions](../api/driveitem_invite.md)                   | `POST /drive/items/{item-id}/oneDrive.invite`             |
| [Read permissions](../api/driveitem_list_permissions.md)             | `GET /drive/items/{item-id}/permissions`         |
| [Remove permissions](../api/permission_delete.md)     | `DELETE /drive/items/{item-id}/permissions/{id}` |
| [Update permissions](../api/permission_update.md)     | `PATCH /drive/items/{item-id}/permissions/{id}`  |
| [Send sharing invitation](../api/driveitem_invite.md)           | `POST /drive/items/{item-id}/oneDrive.invite`             |

<!-- {
  "type": "#page.annotation",
  "description": "Overview of various ways to share items with OneDrive API",
  "keywords": "sharing items files folders onedrive sharepoint",
  "section": "documentation",
  "tocPath": "Sharing"

} -->
