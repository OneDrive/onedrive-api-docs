---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: conceptual
title: Understand differences between OneDrive API and Microsoft Graph
---
# OneDrive API Endpoint Differences

OneDrive API is available from several different API endpoints.
Microsoft Graph is the preferred endpoint for accessing OneDrive personal, OneDrive for Business, and SharePoint online files.
In some enterprise scenarios, like SharePoint Server 2016, it may be necessary to access OneDrive for Business and SharePoint data by using the direct API endpoint without using Microsoft Graph.
The following notes provide details about differences you may notice between Microsoft Graph and the direct API endpoint.

Differences:

* [API namespaces](#namespaces)
* [Endpoints](#discovering-an-endpoint)
* [Permissions](#permissions)

## Namespaces

### Methods

When using the direct endpoint, methods and actions require a namespace prefix.
For example, to use `sharedWithMe` on the direct endpoint, you must prefix the action name with `oneDrive.`.
Note, this prefix is case-sensitive.

```http
https://{server}/_api/v2.0/drive/oneDrive.sharedWithMe
```

The following actions or methods must be prefixed on the direct endpoint:

* [Copy](../api/driveitem_copy.md)
* [Create Sharing Link](../api/driveitem_createlink.md)
* [Create Upload Session](../api/driveitem_createuploadsession.md)
* [Delta](../api/driveitem_delta.md)
* [Invite](../api/driveitem_invite.md)
* [Recent Files](../api/drive_recent.md)
* [Search](../api/driveitem_search.md)
* [Shared With Me](../api/drive_sharedwithme.md)

### Instance annotations

Properties on items returned with an at-sign (`@`) also include a namespace.
When using Microsoft Graph, the namespace is always `microsoft.graph`.
However, when accessing the direct API endpoint, the namespace is different.

| Documented property name (Microsoft Graph) | Direct API property name |
| ------------------------------------------ | ------------------------ |
| `@microsoft.graph.downloadUrl`             | `@content.downloadUrl`   |
| `@microsoft.graph.sourceUrl`               | `@content.sourceUrl`     |
| `@microsoft.graph.conflictBehavior`        | `@name.conflictBehavior` |

### Property names

Some property names on resources are changed when returned from Microsoft Graph.
The following table contains resources and property names which are different between Microsoft Graph and OneDrive API.

| Documented property name (Microsoft Graph) | Direct API property name |
| ------------------------------------------ | ------------------------ |
| [folder][].view                            | folder.folderView        |

[folder]: ../resources/folder.md

## Discovering an endpoint

Microsoft Graph provides a single API endpoint, `graph.microsoft.com` for consumer and work/school accounts.
When using the OneDrive API directly, you must discover the correct OneDrive API endpoint.

To discover the correct endpoint for OneDrive API, you must use Microsoft Graph.

### OneDrive personal accounts

To access OneDrive API for OneDrive personal, your app must use the `https://api.onedrive.com/v1.0` endpoint for all requests.

You can determine if the signed in user is a OneDrive personal user by checking the `id_token` for `tid: 9188040d-6c67-4c5b-b112-36a304b66dad`. 
More information about this is available on the [Active Directory v2 protocol](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols-implicit) topic.

### OneDrive for Business and SharePoint

To access the direct API endpoint for OneDrive for Business, your app must first discover the user's My Site URL.
You can make a request to Microsoft Graph to return this information:

```http
GET https://graph.microsoft.com/v1.0/me?$select=mySite
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "mySite": "https://contoso-my.sharepoint.com/personal/rgregg_contoso_com/"
}
```

You can then append the API path for the OneDrive API, `_api/v2.0/` to this URL, to construct the API endpoint:

```javascript
var apiEndPoint = response.mySite + '_api/v2.0';
```

In some cases a work/school user may not have a `mySite` value returned.
This occurs when the account has not created their OneDrive for Business yet.
In this scenario, your app will need to use Microsoft Graph to provision the user's OneDrive by requesting the root folder of the drive from Microsoft Graph.

## Permissions

For calls to SharePoint and OneDrive for Business, you can assign these permission scopes to your application through the Azure Portal via the **Office 365 SharePoint Online** service.
For OneDrive Personal, the scope string is passed into the OAuth workflow directly and do not need to be registered ahead of time.

| Microsoft Graph Permission | OneDrive Personal  | SharePoint and OneDrive for Business |
| -------------------------- | ------------------ | ------------------------------------ |
| Files.Read                 | OneDrive.Read      | MyFiles.Read                         |
| Files.ReadWrite            | OneDrive.ReadWrite | MyFiles.Write                        |
| Files.ReadWrite.All        | OneDrive.ReadWrite | Files.ReadWrite.All                  |
| Files.ReadWrite.AppFolder  | OneDrive.AppFolder | Files.ReadWrite.AppFolder            |
| Sites.Read.All             | N/A                | Sites.Read.All                       |
| Sites.ReadWrite.All        | N/A                | Sites.ReadWrite.All                  |



<!-- {
  "type": "#page.annotation",
  "description": "Learn the differences between using Microsoft Graph and the OneDrive API endpoint",
  "section": "documentation",
  "tocPath": "Misc/OneDrive endpoint"
} -->
