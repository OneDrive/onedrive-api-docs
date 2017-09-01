# App Folder

The _App Folder_ is a dedicated, special folder for your app.
The App Folder is typically named after your app, and is found in the **Apps** folder in the user's OneDrive.
If you request the `onedrive.appfolder` permission scope and the user authorizes it, your app gets read and write access to this folder.
Since it behaves like any other folder in the user's OneDrive, users can add, modify, and remove content from it. Your app doesn't need to maintain logic unique to the user, which allows the user to rename or move it.

## Getting authorization from the user

To have your own app's folder, you must request either the `onedrive.appfolder` or `onedrive.readwrite` permission scope when getting an access token.
For more details, see [app authorization](../auth/msa-oauth.md).

## Creating your app's folder

OneDrive creates your app's folder in the user's `Apps` folder, located in the root of the user's OneDrive, when your app makes the first call to the folder using the [special folder](../api/specialfolder-get.md) namespace.
Below are the most common calls your app can make to create the folder for the first time.

* [Get your app folder's metadata](../api/driveitem-get.md): `GET /drive/special/approot`
* [List your app folder's children](../api/driveitem-list.md): `GET /drive/special/approot/children`
* [Create a folder under the approot](../api/driveitem-create.md): `POST /drive/special/approot/children`
* [Create an upload session](../api/driveitem-upload-large-files.md): `POST /drive/special/approot:/{filename}:/createUploadSession`
* [Upload an item's content](../api/driveitem-upload-put.md): `PUT /drive/special/approot:/{fileName}:/content`
* [Upload an item's content w/ metadata](../api/driveitem-upload-post.md): `POST /drive/special/approot/children`
* [Upload an item's content from URL](../api/driveitem-upload-url.md): `POST /drive/special/approot/children`

### Naming your app's folder

When OneDrive creates your app's folder, it uses the Application name set at that point for the calling app id.
You may change your app's folder name in the [Microsoft Application Registration Portal][1].
If you choose to do so, you may localize your app's folder name by going to the [Microsoft Application Registration Portal][1] and editing your app's localization settings.

[1]: https://apps.dev.microsoft.com

## Working with your app's folder

Your app's folder supports all the standard `item` operations.

| Common task                                         | HTTP method (by path)                                       |
| --------------------------------------------------- | ----------------------------------------------------------- |
| [Get metadata for an Item](../api/driveitem-get.md)         | `GET /drive/special/approot:/{path}`                        |
| [List an Item's children](../api/driveitem-list.md)         | `GET /drive/special/approot:/{path}:/children`              |
| [Create an Item](../api/driveitem-create.md)                | `PUT /drive/special/approot:/{parent-path}/{name}`          |
| [Upload an Item's contents](../api/driveitem-upload-put.md)     | `PUT /drive/special/approot:/{parent-path}/{name}:/content` |
| [Update an Item's contents](../api/driveitem-update.md)     | `PATCH /drive/special/approot:/{path}`                      |
| [Delete an Item](../api/driveitem-delete.md)                | `DELETE /drive/special/approot:/{path}`                     |
| [Move an Item](../api/driveitem-move.md)                    | `PATCH /drive/special/approot:/{path}`                      |
| [Copy an Item](../api/driveitem-copy.md)                    | `POST /drive/special/approot:/{path}:/action.copy`          |
| [Download an Item's contents](../api/driveitem-download.md) | `GET /drive/special/approot:/{path}:/content`               |
| [Download specific file format](../api/driveitem-download-format.md)   | `GET /drive/special/approot:/{path}:/content?format={format}` |
| [Search for an Item](../api/driveitem-search.md)            | `GET /drive/special/approot:/{path}:/search`                |
| [View changes on an Item][item-changes]             | `GET /drive/special/approot:/{path}:/delta`                 |
| [Get thumbnails for an Item][get-thumbnails]        | `GET /drive/special/approot:/{path}:/thumbnails`            |

[item-changes]: ../api/driveitem-delta.md
[get-thumbnails]: ../api/driveitem-thumbnails.md

<!-- {
  "type": "#page.annotation",
  "description": "Use the app root special folder to create a home for your app's user content.",
  "keywords": "approot, app folder, application folder, special folder, home folder",
  "section": "documentation",
  "tocPath": "Concepts/App folder"
} -->
