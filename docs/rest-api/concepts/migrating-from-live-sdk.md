---
author: rgregg
ms.author: rgregg
ms.date: 10/16/2017
title: Migrating from Live SDK to Microsoft Graph
---
# Migrating from Live SDK to Microsoft Graph

If you are using the Live SDK or Live Connect APIs to connect to profile, calendar, contacts, or files, your app needs to be updated to maintain functionality.

Live SDK and Live Connect APIs have been marked as deprecated for over a year. 
As announced on the [Office Developer blog](https://dev.office.com/blogs), these APIs are now end of life and will no longer be available after **November 1, 2018**.

Profile and contacts data will no longer be available from the Live Connect APIs as of **Decmeber 1, 2017**.
Calendar data has not been available from Live Connect since **June 2017**.

Live Connect APIs are all hosted from `https://apis.live.net/v5.0`. This prefix should be assumed in all of the examples below.

## Switching to Microsoft Graph

The functionality previously available through Live SDK and Live Connect APIs is available via [Microsoft Graph](https://graph.microsoft.com).
To continue to integrate with Microsoft services, developers must update their apps to update their apps to use Microsoft Graph in advance of the timeline for the these services being discontinued.

Similar to the capabilities of Live Connect, Microsoft Graph has a number of resources available depending on the type of user data your app interacts with:

* [Microsoft account authentication](https://developer.microsoft.com/en-us/graph/docs/concepts/auth_overview)
* [OneDrive files](https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/onedrive)
* [Outlook calendar](https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/calendar)
* [Outlook messages](https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/mail_api_overview)
* [Personal contacts](https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/contact)
* [Profile and Identity API](https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/users)

## Libraries

Microsoft Graph offers [client libraries](https://developer.microsoft.com/en-us/graph/code-samples-and-sdks) for many platforms that can integrate with your application similar to Live SDK.

## Permissions

Microsoft Graph uses a different set of permission scopes than Live Connect.
To access the Microsoft Graph APIs, your app will need to switch permission scopes.
This requires your app to prompt the user for consent to sign in and consent to the new permissions.

See the [Microsoft Graph permission reference](https://developer.microsoft.com/en-us/graph/docs/concepts/permissions_reference) for the complete details.

| Live Connect Scope      | Microsoft Graph Permission | Description                                                                                                                     |
| ----------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `wl.basic`              | `Contacts.Read`            | Allows the app to read user contacts.                                                                                           |
| `wl.offline_access`     | `offline_access`           | Allows the app to read and update user data, even when they are not currently using the app.                                    |
| `wl.signin`             | `openid`                   | Allows users to sign in to the app with their work or school accounts and allows the app to see basic user profile information. |
| `wl.skydrive`           | `Files.Read`               | Allows the app to read the signed-in user's files.                                                                              |
| `wl.skydrive_update`    | `Files.ReadWrite`          | Allows the app to read, create, update, and delete the signed-in user's files.                                                  |
| `wl.contacts_create`    | `Contacts.ReadWrite`       | Allows the app to create, read, update, and delete user contacts.                                                               |
| `wl.contacts_calendar`  | `Calendars.Read.Shared`    | Allows the app to read contacts that the user has permissions to access, including the user's own and shared contacts.          |
| `wl.contacts_photos`    | `Contacts.Read`            | Allows the app to read user contacts.                                                                                           |
| `wl.contacts_skydrive`  | `Files.ReadWrite.All`      | Allows the app to read, create, update, and delete all files the signed-in user can access.                                     |
| `wl.calendars`          | `Calendars.Read`           | Allows the app to read events in user calendars.                                                                                |
| `wl.calendars_update`   | `Calendars.ReadWrite`      | Allows the app to create, read, update, and delete events in user calendars.                                                    |
| `wl.emails`             | `Mail.Read`                | Allows the app to read email in user mailboxes.                                                                                 |
| `wl.events_create`      | `Calendars.ReadWrite`      | Allows the app to create, read, update, and delete events in user calendars.                                                    |
| `wl.photos`             | `Files.Read`               | Allows the app to read the signed-in user's files, include photos.                                                              |
| `office.onenote_create` | `Notes.ReadWrite`          | Allows the app to read, share, and modify OneNote notebooks on behalf of the signed-in user.                                    |

## Unique Identifiers

Microsoft Graph uses a different scheme for unique identifiers than Live Connect or Live SDK.
You cannot use the identifiers from Live Connect with Microsoft Graph.

Your application will need to rediscover the identifiers for known items using search, path-based navigation, or asking the user to select the items again.

## Identity API

The identity API functionality will cease to return user data on **December 1, 2017**.

The following table outlines methods in the Live Connect API and the equivelent method in Microsoft Graph.
While the format of the REST path may be similar, the response data does not follow the same format.
You will need to use the Microsoft Graph SDK or update your JSON mapping to use the Microsoft Graph resource format.

| Live Connect API  | Microsoft Graph API    | Notes                                                                 |
|-------------------|------------------------|-----------------------------------------------------------------------|
| `GET /me`         | `GET /me`              | [Try it][1]. Returns the [user's profile][user], display name, and additional information. |
| `GET /me/picture` | `GET /me/photo/$value` | [Try it][2]. Returns the [user's profile photo][user-photo].                                     |

[1]: https://developer.microsoft.com/en-us/graph/graph-explorer?request=me/&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com
[2]: https://developer.microsoft.com/en-us/graph/graph-explorer?request=me/photo/$value&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com
[user]: https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/users
[user-photo]: https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/profilephoto_get

## Contacts API

The contacts API functionality will cease to return user data on **December 1, 2017**.

The following table outlines methods in the Live Connect API and the equivelent method in Microsoft Graph.
While the format of the REST path may be similar, the response data does not follow the same format.
You will need to use the Microsoft Graph SDK or update your JSON mapping to use the Microsoft Graph resource format.

| Live Connect API     | Microsoft Graph API             | Notes                                                                   |
|----------------------|---------------------------------|-------------------------------------------------------------------------|
| `GET /me/contacts`   | `GET /me/contacts`              | [Try it][3]. Returns a list of the [user's personal contacts][contacts]. |
| `GET /{contact-id}`  | `GET /me/contacts/{contact-id}` | [Try it][4]. Returns the data for a [specified contact][contacts].       |
| `POST /{contact-id}` | `POST /me/contacts`             | Create a new [contact][create-contact].                    |

[3]: https://developer.microsoft.com/en-us/graph/graph-explorer?request=me/contacts&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com
[4]: https://developer.microsoft.com/en-us/graph/graph-explorer?request=me/contacts/AAMkAGVmMDEzMTM4LTZmYWUtNDdkNC1hMDZiLTU1OGY5OTZhYmY4OABGAAAAAAAiQ8W967B7TKBjgx9rVEURBwAiIsqMbYjsT5e-T7KzowPTAAAAAAEOAAAiIsqMbYjsT5e-T7KzowPTAAAYbuK-AAA=&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com
[contacts]: https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_contacts
[create-contact]: https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_post_contacts

## Calendar API

The calendar API no longer returns user data as of **June 2017**.

The following table outlines methods in the Live Connect API and the equivelent method in Microsoft Graph.
While the format of the REST path may be similar, the response data does not follow the same format.
You will need to use the Microsoft Graph SDK or update your JSON mapping to use the Microsoft Graph resource format.

| Live Connect API      | Microsoft Graph API | Notes                                                            |
|-----------------------|---------------------|------------------------------------------------------------------|
| `GET /me/calendars`   | `GET /me/calendars` | [Try it][5] Returns a list of the user's [calendars][calendars]. |
| `GET /{calendar-id}`  | `GET /me/events`    | [Try it][6] Return [events][events] from the user's calendars.   |
| `POST /{calendar-id}` | `POST /me/events`   | Create a new [event][create-event] on the user's calendar.       |

[5]: https://developer.microsoft.com/en-us/graph/graph-explorer?request=me/calendars&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com
[6]: https://developer.microsoft.com/en-us/graph/graph-explorer?request=me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com
[calendars]: https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_calendars
[events]: https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_list_events
[create-event]: https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/user_post_events

## OneDrive REST API

The OneDrive portion of the Live Connect API will no longer be functional as of **November 1, 2018**.

The following tables outline methods in the Live Connect API and the equivelent methods in Microsoft Graph.

While the format of the REST path may be similar, the response data does not follow the same format.
You will need to use the Microsoft Graph SDK or update your JSON mapping to use the Microsoft Graph resource format.

For the complete details on navigating the contents of a user's OneDrive, see [Get a DriveItem resource](../api/driveitem_get.md).

| Live Connect API                                    | Microsoft Graph API                        | Notes                                                                                                                          |
|-----------------------------------------------------|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `GET /folder.a6b2a7e8f2515e5e.A6B2A7E8F2515E5E!110` | `GET /me/drive/items/A6B2A7E8F2515E5E!110` | [Try it][8]. Get the metadata for a folder.                                                                                                 |
| `GET /me/skydrive/camera_roll`                      | `GET /me/drive/special/cameraroll`         | Retrieve the user's camera roll backup folder.                                                                                 |
| `GET /me/skydrive/files`                            | `GET /me/drive/root/children`              | [Try it][9]. List the contents of the OneDrive root folder.                                                                                 |
| `GET /me/skydrive/my_documents`                     | `GET /me/drive/special/documents`          | Retrieve the user's documents folder.                                                                                          |
| `GET /me/skydrive/my_photos`                        | `GET /me/drive/special/photos`             | Retrieve the user's photos folder.                                                                                             |
| `GET /me/skydrive/public_documents`                 | n/a                                        | Retrieve the user's public shared folder. This concept has been removed from OneDrive and is not available in Microsoft Graph. |
| `GET /me/skydrive/quota`                            | `GET /me/drive?$select=quota`              | [Try it][12]. Returns quota information for a user's OneDrive, including used space and remaining space.                                     |
| `GET /me/skydrive/recent`                           | `GET /me/drive/recent`                     | Return a list of files and folders shared with the current user.                                                               |
| `GET /me/skydrive/shared`                           | `GET /me/drive/sharedWithMe`               | Return a list of files and folders shared with the current user.                                                               |
| `GET /me/skydrive`                                  | `GET /me/drive/root`                       | [Try it][7]. Retrieve the root folder in the user's OneDrive.                                                                               |
| `GET /skydrive/get_item_preview`                    | `GET /me/drive/items/{item-id}/thumbnails` | Returns the available thumbnails for a file or folder in OneDrive.                                                             |

[7]: https://developer.microsoft.com/en-us/graph/graph-explorer?request=me/drive&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com
[8]: https://developer.microsoft.com/en-us/graph/graph-explorer?request=me/drive/items/01BYE5RZ5MYLM2SMX75ZBIPQZIHT6OAYPB&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com
[9]: https://developer.microsoft.com/en-us/graph/graph-explorer?request=me/drive/root/children&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com
[12]: https://developer.microsoft.com/en-us/graph/graph-explorer?request=me/drive?$select=quota&method=GET&version=v1.0&GraphUrl=https://graph.microsoft.com

## File Picker for web apps

The OneDrive file picker functionality that was provided as part of the Live SDK is now available through the [OneDrive file picker](../../controls/file-pickers/index.md).

Version 5 of the Live SDK (OneDrive file picker) will no longer be functional after **November 1, 2018**.

## Additional resources

For more information about using Microsoft Graph, try the [Microsoft Graph Quick Start](https://developer.microsoft.com/en-us/graph/quick-start).
