# Drive resource

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
| [List changes for all Items in the Drive][item-changes] | `GET /drive/root/view.delta`  |
| [Search for Items in the Drive][item-search]            | `GET /drive/root/view.search` |
| [Access special folder](../items/special_folders.md)    | `GET /drive/special/{name}`   |

In the previous table, the examples use `/drive`, but `/drives/{drive-id}` is valid too.

## JSON representation

Here is a JSON representation of a Drive resource.
<!-- { "blockType": "resource", "@odata.type": "oneDrive.drive",
       "keyProperty": "id", "optionalProperties": [ "items", "root", "special"] } -->
```json
{
  "id": "string",
  "driveType": "personal | business",
  "owner": { "@odata.type": "oneDrive.identitySet" },
  "quota": { "@odata.type": "oneDrive.quota" },

  "items": [ { "@odata.type": "oneDrive.item" } ],
  "root": { "@odata.type": "oneDrive.item" },
  "special": [ { "@odata.type": "oneDrive.item" }]
}
```

## Properties

The Drive resource has these properties.

| Property name | Type                        | Description                                                                                          |
|:--------------|:----------------------------|:-----------------------------------------------------------------------------------------------------|
| **id**        | string                      | The unique identifier of the drive.                                                                  |
| **driveType** | string                      | Enumerated value that identifies the type of drive account. OneDrive drives will show as `personal`. |
| **owner**     | [IdentitySet][identity-set] | The user account that owns the drive.                                                                |
| **quota**     | [Quota][quota-facet]        | Information about the drive's storage space quota.                                                   |

## Relationships

The following table defines the relationships that the Drive resource has to other resources.

| Relationship name | Type             | Description                                                             |
|:------------------|:-----------------|:------------------------------------------------------------------------|
| **items**         | Colletion(item)  | All items contained in the drive. This collection cannot be enumerated. |
| **root**          | Item             | The root folder of the drive.                                           |
| **special**       | Collection(item) | Collection of common folders available in OneDrive.                     |

## Views

The Drive resource also has custom functions implemented to provide useful views
of data that are not immediately available through the standard resources. These
views are defined for a Drive:

| View name       | Type             | Description                                                                     |
|:----------------|:-----------------|:--------------------------------------------------------------------------------|
| **view.shared** | Collection(item) | Item collection grouped by Owner that have been shared with the signed-in user. |
| **view.recent** | Collection(item) | Item collection of recently accessed files                                      |

[item-resource]: ../README.md#item-resource
[identity-set]: ../resources/identitySet.md
[quota-facet]: ../facets/quotainfo_facet.md
[drive-default]: ../drives/default.md
[drive-resource]: ../resources/drive.md
[drive-get]: ../drives/get.md
[item-get]: ../items/get.md
[item-changes]: ../items/view_delta.md
[item-search]: ../items/search.md
[item-children]: ../items/list.md


<!-- {
  "type": "#page.annotation",
  "description": "Drive is a top level object for OneDrive API that provides access to the contents of a drive. ",
  "keywords": "drive,objects,resources",
  "section": "documentation",
  "tocPath": "Drives",
  "tocBookmarks": { "Resources/Drive": "#" }
} -->
