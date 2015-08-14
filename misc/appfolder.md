# App Folder

The _App Folder_ is a dedicated, special folder for your app. The App Folder is
typically named after your app, and is found in the **Apps** folder in the
user's OneDrive. If
you request the `onedrive.appfolder` permission scope and the user
authorizes it, your app gets read and write access to this folder.
Since it behaves like any other folder in the user's OneDrive, users
can add, modify, and remove content from it. Your app doesn't need to maintain
logic unique to the user, which allows the user to rename or move it.

## Getting authorization from the user
To have your own app's folder, you must request either the
`onedrive.appfolder` or `onedrive.readwrite` permission scope when
getting an access token. For more details, see
[app authorization](../auth/msa_oauth.md).

## Creating your app's folder

OneDrive creates your app's folder in the user's `Apps` folder, located
in the root of the user's OneDrive, when your app makes the
first call to the folder using the
[special folder](../items/special_folders.md) namespace. Below are the
most common calls your app can make to create the folder for the first
time.

* [Get your app folder's metadata](../items/get.md): `GET /drive/special/approot`
* [List your app folder's children](../items/list.md): `GET /drive/special/approot/children`
* [Create a folder under the approot](../items/create.md): `POST /drive/special/approot/children`
* [Upload an item's content](../items/upload_put.md): `PUT /drive/special/approot:/{fileName}:/content`
* [Upload an item's content w/ metadata](../items/upload_post.md): `POST /drive/special/approot/children`
* [Upload an item's content from URL](../items/upload_url.md): `POST /drive/special/approot/children`

### Naming your app's folder

When OneDrive creates your app's folder, it uses the Application name
set at that point for the calling app id.  You may change your
app's folder name in the [Microsoft account Developer Center](https://account.live.com/developers/applications/index).
If you choose to do so, you may localize your app's folder name by going to
the [Microsoft account Developer Center](https://account.live.com/developers/applications/index)
and editing your app's localization settings.


## Working with your app's folder

Your app's folder supports all the standard `item` operations.

| Common task                                         | HTTP method (by path)                               |
|:----------------------------------------------------|:----------------------------------------------------|
| [Get metadata for an Item](../items/get.md)         | `GET /drive/special/approot:/{path}`                        |
| [List an Item's children](../items/list.md)         | `GET /drive/special/approot:/{path}:/children`              |
| [Create an Item](../items/create.md)                | `PUT /drive/special/approot:/{parent-path}/{name}`          |
| [Upload an Item's contents](../items/upload.md)     | `PUT /drive/special/approot:/{parent-path}/{name}:/content` |
| [Update an Item's contents](../items/update.md)     | `PATCH /drive/special/approot:/{path}`                      |
| [Delete an Item](../items/delete.md)                | `DELETE /drive/special/approot:/{path}`                     |
| [Move an Item](../items/move.md)                    | `PATCH /drive/special/approot:/{path}`                      |
| [Copy an Item](../items/copy.md)                    | `POST /drive/special/approot:/{path}:/action.copy`          |
| [Download an Item's contents](../items/download.md) | `GET /drive/special/approot:/{path}:/content`               |
| [Search for an Item](../items/search.md)            | `GET /drive/special/approot:/{path}:/view.search`           |
| [View changes on an Item][item-changes]             | `GET /drive/special/approot:/{path}:/view.delta`            |
| [Get thumbnails for an Item][get-thumbnails]        | `GET /drive/special/approot:/{path}:/thumbnails`            |

[item-changes]: ../items/view_delta.md
[get-thumbnails]: ../items/thumbnails.md

<!-- {
  "type": "#page.annotation",
  "description": "Use the app root special folder to create a home for your app's user content.",
  "keywords": "approot, app folder, application folder, special folder, home folder",
  "section": "documentation",
  "tocPath": "Concepts/App Folder"
} -->
