---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: get-started-article
title: Get started using OneDrive API
---
# Getting started with OneDrive API

This page provides a quick overview of the steps required to use Microsoft Graph and the OneDrive API.
For a more detailed walk through, check out the [Microsoft Graph Quick Start](https://graph.microsoft.io/en-us/getting-started).

If you are working with SharePoint Server 2016 or not using Microsoft Graph, see the [Using OneDrive API with SharePoint Server 2016](sharepoint-server-2016.md) topic.

## 1. User authentication and authorizing your app

Microsoft Graph and OneDrive API use [OAuth 2.0](http://oauth.net/2/) for [authorization](authentication.md).
By completing an OAuth flow, your app receives an access token that provides access to the Microsoft Graph a particular set of permissions for a user.

Your app provides the access token in each request, through an HTTP header:

`Authorization: bearer {token}`

For more information on authorizing your application and obtaining an access token, see [App authorization with Microsoft Graph](https://graph.microsoft.io/en-us/docs/authorization/auth_overview).

## 2. Make calls to a resource

Once your app is authorized and received an access token, it can make requests to the Microsoft Graph endpoint for OneDrive or SharePoint resources.
To construct the URL for a resource, you need to know the relative URL for the [root resource (like a user, group, or site)](../index.md#microsoft-graph-root-resources) and the [drive resource](../resources/drive.md) or [driveItem resource](../resources/driveitem.md) your request is targeting.

A request URL includes these components:

* Microsoft Graph root URL and version (`https://graph.microsoft.com/v1.0`)
* A root resource target (`/users/{id}`)
* A OneDrive API resource target (`/drive` or `/drives/{id}/items/{item-id}` or `/drive/root:/path/to/item`)

**Note:** Throughout the documentation, only partial syntax such as: `GET /drive/items/{item-id}` is used for the sake of brevity.
Prefix the path with the correct root URL and root resource target in order to obtain the full resource path or URL.

## 3. Keep going

Check out the [OneDrive samples on GitHub](https://github.com/onedrive) and the [Microsoft Graph samples on GitHub](https://github.com/microsoftgraph) to learn more about using files in the Microsoft Graph.

Read through the [OneDrive API HTTP documentation](../index.md) to learn more about working with the [**drive**](../resources/drive.md) and [**driveItem**](../resources/driveitem.md) resources.
For more information about all resources in Microsoft Graph, see the [Microsoft Graph documentation](https://graph.microsoft.com).

Questions or need support? You can find us on [Stack Overflow](http://stackoverflow.com/questions/tagged/onedrive) and through the [GitHub issues page for our documentation](https://github.com/onedrive/onedrive-api-docs/issues).

<!-- {
  "type": "#page.annotation",
  "description": "Quick walkthrough for using Microsoft Graph to access files in OneDrive or SharePoint",
  "keywords": "http,auth,onedrive,api,sharepoint",
  "section": "documentation",
  "tocPath": "Overview/Getting started",
  "tocIndex": -100
} -->
