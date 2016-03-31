# Getting started with OneDrive API

To get started, follow these steps.

### 1. Authenticate your app

OneDrive uses [OAuth 2.0](http://oauth.net/2/) for
[authentication](auth/readme.md). You get an access token that authenticates
your app with a particular set of permissions for a user. You
provide an access token through an HTTP header:

`Authorization: bearer {token}`

To obtain an access token and sign the user in, see
[OneDrive authentication](auth/msa_oauth.md) or
[OneDrive for Business authentication](auth/aad_oauth.md).

### 2. Make calls against a URL root

Now that you've authenticated your app, you can call the OneDrive API with your
access token against the URL root below, combined with one of the
[root resources](README.md#onedrive-api-root-resources).
See [Drive resource](resources/drive.md) and
[Item resource](resources/item.md) for examples on how to make calls to the
OneDrive API. OneDrive API URLs are relative to the following root unless
otherwise noted.

| Service               | URL Root                                                    |
|:----------------------|:------------------------------------------------------------|
| OneDrive              | `https://api.onedrive.com/v1.0`                             |
| OneDrive for Business | `https://{tenant}-my.sharepoint.com/_api/v2.0`              |
| SharePoint Online     | `https://{tenant}.sharepoint.com/{site-relative-path}/_api/v2.0` |

**Note:** Throughout the documentation, only partial syntax such as:
`GET /drive/items/{item-id}`
is used for the sake of brevity. Prefix the path with the correct root
URL and version number in order to obtain the full resource path or URL.

### 3. Keep going

Check out the [OneDrive samples on GitHub](https://github.com/onedrive) to learn more about using the OneDrive API.

Read through the [OneDrive API HTTP documentation](README.md) to learn more about
working with the [**drive**](resources/drive.md) and [**item**](resources/item.md)
resources in OneDrive API HTTP end point.

Learn how to [address items in OneDrive](misc/addressing.md) using either
**path** or **item id** syntax.

Questions or need support? You can find us on [Stack Overflow](http://stackoverflow.com/questions/tagged/onedrive)
and through the [GitHub issues page for our documentation](https://github.com/onedrive/onedrive-api-docs/issues).


<!-- {
  "type": "#page.annotation",
  "description": "Getting started using HTTP to access the OneDrive API",
  "keywords": "http,auth,onedrive,api,sharepoint",
  "section": "documentation",
  "tocPath": "Getting Started/Walkthrough"

} -->
