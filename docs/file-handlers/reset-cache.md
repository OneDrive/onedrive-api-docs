---
author: JeremyKelley
ms.author: JeremyKe
ms.date: 02/16/2021
title: Reload OneDrive File Handlers
ms.localizationpriority: Medium
---
# Resetting the file handler cache

File handlers are cached in two ways - locally in the browser and on the server. These caches have a timeout of 24 hours, meaning it can take up to 48 hours for updates to a File Handler manifest to appear for users.

When developing a file handler, it's useful to be able to reset the local cache for your account to see the latest file handlers.

To reset the cache, you should:

1. Submit the below request to refresh the server-side cache.
2. Clear the browser's local data
3. Close the OneDrive browser window.
4. Open the browser window and navigate back to OneDrive.

Via the OneDrive API (not Microsoft Graph) you can request that the list of file handlers be refreshed by making the following request:

## HTTP request

<!-- { "blockType": "ignored" } -->

```http
GET https://{tenant}-my.sharepoint.com/_api/v2.0/drive/apps?forceRefresh=1
Authorization: Bearer {access-token}
```

**Note:** The {access-token} for this request must have either the `MyFiles.Write` or `Sites.Read.All` scope for the SharePoint application.

This request will tell OneDrive to refresh the cache, but will return the current values from the cache.
The cache may take several seconds to repopulate, depending on the number of applications installed in the user's tenant.

In addition to the server-side cache of installed file handlers, the OneDrive web app also has a session cache of file handlers.
This cache is automatically cleared when the browser session ends (when the last OneDrive tab is closed).

## Calling the forceRefresh method for end-users

For user-consent scenarios (instead of admin deployment), it may be beneficial to your user experience to call the above request after a user consents to your application for the first time.
This way, the user will be presented with the file handler next time they visit the OneDrive web app, instead of needing to wait up to 24 hours for the file handler to appear.


<!-- {
  "type": "#page.annotation",
  "description": "Instructions to reset the file handler cache for development purposes.",
  "section": "documentation"
} -->

# Tenant Admin Reset

Because updates to apps take time to propagate through the system tenant admins can refresh the stored app cache globally, which affects the visibility of file handlers to users. This impacts changes based on user assignment, hidden flag, or other updates to the AAD app hosting the file handler. To reset the cached app data for all users a tenant admin can visit the url:

```http
GET https://{tenant}.sharepoint.com/_api/v2.0/drive/apps?adminForceRefresh=1
Authorization: Bearer {access-token}
```

> This API can be called only once per hour to avoid performance impacts as it affects all users.

