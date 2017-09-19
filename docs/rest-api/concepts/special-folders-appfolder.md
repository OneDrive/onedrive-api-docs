---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: conceptual
title: What is an App Folder - OneDrive API
---
# Using an App Folder to store user content without access to all files

The _App Folder_ is a dedicated, special folder for your app.
The App Folder is typically named after your app, and is found in the **Apps** folder in the user's OneDrive.
If you request the `Files.ReadWrite.AppFolder` permission scope and the user authorizes it, your app gets read and write access to this folder.
Since it behaves like any other folder in the user's OneDrive, users can add, modify, and remove content from it. Your app doesn't need to maintain logic unique to the user, which allows the user to rename or move it.

## Getting authorization from the user

To have your own app's folder, you must request either the `onedrive.appfolder` or `onedrive.readwrite` permission scope when getting an access token.
For more details, see [authentication](../getting-started/authentication.md).

## Creating your app's folder

OneDrive creates your app's folder in the user's `Apps` folder, located in the root of the user's OneDrive, when your app makes the first call to the folder using the [special folder](../api/drive_get_specialfolder.md) namespace.
Below are the most common calls your app can make to create the folder for the first time.

* [Get your app folder's metadata](../api/driveitem_get.md): `GET /drive/special/approot`
* [List your app folder's children](../api/driveitem_list_children.md): `GET /drive/special/approot/children`
* [Create a folder under the approot](../api/driveitem_post_children.md): `POST /drive/special/approot/children`
* [Create an upload session](../api/driveitem_createuploadsession.md): `POST /drive/special/approot:/{filename}:/createUploadSession`
* [Upload an item's content](../api/driveitem_put_content.md): `PUT /drive/special/approot:/{fileName}:/content`
* [Upload an item's content w/ metadata](../api/driveitem_post_content.md): `POST /drive/special/approot/children`
* [Upload an item's content from URL](../api/driveitem_upload_url.md): `POST /drive/special/approot/children`

### Naming your app's folder

When OneDrive creates your app's folder, it uses the Application name set at that point for the calling app id.
You may change your app's folder name in the [Microsoft Application Registration Portal][1].
If you choose to do so, you may localize your app's folder name by going to the [Microsoft Application Registration Portal][1] and editing your app's localization settings.

[1]: https://apps.dev.microsoft.com

## Working with your app's folder

Your app's folder supports all the standard `item` operations.

| Common task                                         | HTTP method (by path)                                       |
| --------------------------------------------------- | ----------------------------------------------------------- |
| [Get metadata for an Item](../api/driveitem_get.md)         | `GET /drive/special/approot:/{path}`                        |
| [List an Item's children](../api/driveitem_list_children.md)         | `GET /drive/special/approot:/{path}:/children`              |
| [Create an Item](../api/driveitem_post_children.md)                | `PUT /drive/special/approot:/{parent-path}/{name}`          |
| [Upload an Item's contents](../api/driveitem_put_content.md)     | `PUT /drive/special/approot:/{parent-path}/{name}:/content` |
| [Update an Item's contents](../api/driveitem_update.md)     | `PATCH /drive/special/approot:/{path}`                      |
| [Delete an Item](../api/driveitem_delete.md)                | `DELETE /drive/special/approot:/{path}`                     |
| [Move an Item](../api/driveitem_move.md)                    | `PATCH /drive/special/approot:/{path}`                      |
| [Copy an Item](../api/driveitem_copy.md)                    | `POST /drive/special/approot:/{path}:/action.copy`          |
| [Download an Item's contents](../api/driveitem_get_content.md) | `GET /drive/special/approot:/{path}:/content`               |
| [Download specific file format](../api/driveitem_get_content_format.md)   | `GET /drive/special/approot:/{path}:/content?format={format}` |
| [Search for an Item](../api/driveitem_search.md)            | `GET /drive/special/approot:/{path}:/search`                |
| [View changes on an Item][item-changes]             | `GET /drive/special/approot:/{path}:/delta`                 |
| [Get thumbnails for an Item][get-thumbnails]        | `GET /drive/special/approot:/{path}:/thumbnails`            |

[item-changes]: ../api/driveitem_delta.md
[get-thumbnails]: ../api/driveitem_list_thumbnails.md

<!-- {
  "type": "#page.annotation",
  "description": "Use the app root special folder to create a home for your app's user content.",
  "keywords": "approot, app folder, application folder, special folder, home folder",
  "section": "documentation",
  "tocPath": "Concepts/App folder"
} -->
