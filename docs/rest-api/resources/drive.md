# Drive resource type

The drive resource is the top level object within a user's OneDrive.
A user will always have at least one Drive available--the default Drive.
The drive resource also represents a document library in a SharePoint site or
Office 365 group.

## Tasks on Drive resources

The following tasks are available for drive resources.

| Common task                                             | HTTP method                   |
|:--------------------------------------------------------|:------------------------------|
| [Get user's default Drive metadata][drive-default]      | `GET /drive`                  |
| [Get Drive metadata of another Drive][drive-get]        | `GET /drives/{drive-id}`      |
| [Get root folder for user's default Drive][item-get]    | `GET /drive/root`             |
| [List children under the Drive][item-children]          | `GET /drive/root/children`    |
| [List changes for all Items in the Drive][item-changes] | `GET /drive/root/delta`  |
| [Search for Items in the Drive][item-search]            | `GET /drive/root/search` |
| [Access special folder](../api/specialfolder-get.md)    | `GET /drive/special/{name}`   |

In the previous table, the examples use `/drive`, but `/drives/{drive-id}` is valid too.

## JSON representation

Here is a JSON representation of a Drive resource.
<!-- { "blockType": "resource", "@odata.type": "oneDrive.drive",
       "keyProperty": "id", "optionalProperties": [ "createdBy", "createdDateTime", "description", "lastModifiedBy", "lastModifiedDateTime", "name", "webUrl", "items", "root", "special"] } -->
```json
{
  "id": "string",
  "createdBy": { "@odata.type": "oneDrive.identitySet" },
  "createdDateTime": "string (timestamp)",
  "description": "string",
  "driveType": "personal | business | documentLibrary",
  "items": [ { "@odata.type": "oneDrive.item" } ],
  "lastModifiedBy": { "@odata.type": "oneDrive.identitySet" },
  "lastModifiedDateTime": "string (timestamp)",
  "name": "string",
  "owner": { "@odata.type": "oneDrive.identitySet" },
  "quota": { "@odata.type": "oneDrive.quota" },
  "root": { "@odata.type": "oneDrive.item" },
  "special": [ { "@odata.type": "oneDrive.item" }],
  "webUrl": "url"
}
```

## Properties

The Drive resource has these properties.

| Property name            | Type                                     | Description                                                                                                                                                                                      |
| :----------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **createdBy**            | [IdentitySet](identitySet.md)            | Identity of the user, device, and application which created the drive. Read-only.                                                                                                                |
| **createdDateTime**      | [DateTimeOffset](../resources/timestamp.md) | Date and time of drive creation. Read-only.                                                                                                                                                      |
| **description**          | string                                   | Provide a user-visible description of the drive. Read-write.                                                                                                                                     |
| **driveType**            | string                                   | Enumerated value that identifies the type of drive account. OneDrive drives will show as `personal`, OneDrive for Business as `business` and SharePoint document libraries as `documentLibrary`. |
| **id**                   | string                                   | The unique identifier of the drive.                                                                                                                                                              |
| **lastModifiedBy**       | [IdentitySet](identitySet.md)            | Identity of the user, device, and application which last modified the drive. Read-only.                                                                                                          |
| **lastModifiedDateTime** | [DateTimeOffset](../resources/timestamp.md) | Date and time the drive was last modified. Read-only.                                                                                                                                            |
| **name**                 | string                                   | The name of the drive. Read-only.                                                                                                                                                                |
| **owner**                | [IdentitySet][identity-set]              | The user account that owns the drive. Owner may not be available in all scenarios, depending on permissions granted to the application.                                                          |
| **quota**                | [Quota][quota-facet]                     | Information about the drive's storage space quota. Quota is not available unless the calling user is the owner of the drive.                                                                     |
| **webUrl**               | URL                                      | URL that displays the drive in the browser. Read-only.                                                                                                                                           |



## Relationships

The following table defines the relationships that the Drive resource has to other resources.

| Relationship name | Type             | Description                                                             |
|:------------------|:-----------------|:------------------------------------------------------------------------|
| **items**         | Collection(item) | All items contained in the drive. This collection cannot be enumerated. |
| **root**          | Item             | The root folder of the drive.                                           |
| **special**       | Collection(item) | Collection of common folders available in OneDrive.                     |

## Views

The Drive resource also has custom functions implemented to provide useful views
of data that are not immediately available through the standard resources. These
views are defined for a Drive:

| View name  | Type             | Description                                                                     |
| ---------- | ---------------- | ------------------------------------------------------------------------------- |
| **shared** | Collection(item) | Item collection grouped by Owner that have been shared with the signed-in user. |
| **recent** | Collection(item) | Item collection of recently accessed files                                      |

[item-resource]: ../resources/driveitem.md
[identity-set]: ../resources/identityset.md
[quota-facet]: ../resources/quotainfo.md
[drive-default]: ../api/drive-get-default.md
[drive-resource]: ../resources/drive.md
[drive-get]: ../api/drive-get.md
[item-get]: ../api/driveitem-get.md
[item-changes]: ../api/driveitem-delta.md
[item-search]: ../api/driveitem-search.md
[item-children]: ../api/driveitem-list.md


<!-- {
  "type": "#page.annotation",
  "description": "Drive is a top level object for OneDrive API that provides access to the contents of a drive. ",
  "keywords": "drive,objects,resources",
  "section": "documentation",
  "tocPath": "Drives",
  "tocBookmarks": { "Resources/Drive": "#" }
} -->
