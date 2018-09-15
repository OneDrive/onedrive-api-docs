---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: get-started-article
title: Get started using OneDrive API with SharePoint Server 2019
---
# Getting started with the OneDrive and SharePoint API on SharePoint Server 2019

To get started using the OneDrive API with SharePoint Server 2019 or 2016 feature pack 2, follow these steps.

If you are using Microsoft Graph or connecting to OneDrive, OneDrive for Business, or SharePoint online, see [Getting started with OneDrive API](index.md).

## 1. Authenticate your app

It is preferable to use [OAuth 2.0](http://oauth.net/2/) for [authorization / authentication](authentication.md).
You get an access token that authorizes your app with a particular set of permissions for a user.
You provide an access token through an HTTP header:

`Authorization: bearer {token}`

To obtain an access token and sign the user in, see [OneDrive for Business authentication](aad-oauth.md).

## 2. Make calls against a URL root

Now that you've authenticated your app, you can call the OneDrive API with your access token against the URL root below, combined with one of the [root resources](../index.md#sharepoint-root-resources).
See [drive resource](../resources/drive.md) and [driveItem resource](../resources/driveitem.md) for examples on how to make calls to the OneDrive API.
OneDrive API URLs are relative to the following root unless otherwise noted.

| Service                | URL Root
| ---------------------- | -------------------------------------------------
| SharePoint Server 2016 | `https://{server}/_api/v2.0`
| SharePoint Server 2016 | `https://{server}/{site-relative-path}/_api/v2.0`

**Note:** Throughout the documentation, only partial syntax such as: `GET /drive/items/{item-id}` is used for the sake of brevity.
Prefix the path with the correct root URL and version number in order to obtain the full resource path or URL.

## 3. Keep going

Check out the [OneDrive samples on GitHub](https://github.com/onedrive) to learn more about using the OneDrive API.

Read through the [OneDrive API HTTP documentation](../index.md) to learn more about working with the [**drive**](../resources/drive.md) and [**item**](../resources/driveitem.md) resources in OneDrive API HTTP end point.

Learn how to [address items in OneDrive](../concepts/addressing-driveitems.md) using either **path** or **item id** syntax.

Questions or need support?
You can find us on [Stack Overflow](http://stackoverflow.com/questions/tagged/onedrive) and through the [GitHub issues page for our documentation](https://github.com/onedrive/onedrive-api-docs/issues).

<!-- {
  "type": "#page.annotation",
  "description": "Getting started using HTTP to access the OneDrive API",
  "keywords": "http,auth,onedrive,api,sharepoint",
  "section": "documentation"
  } -->
