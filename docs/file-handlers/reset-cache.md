---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Reload OneDrive File Handlers
---
# Resetting the file handler cache

File handlers are cached per-user, with a cache expiration period of 24 hours.
As a result, it can take up to a day before a new file handler appears, or changes to a file handler registration are visible.

When developing a file handler, it's useful to be able to reset the local cache for your account to see the latest file handlers.
To reset the cache, you should:

1. Submit the below request to refresh the server-side cache.
2. Close the OneDrive browser window.
3. Open the browser window and navigate back to OneDrive.


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