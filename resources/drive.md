# Drive resource type
The Drive resource represents a Drive in OneDrive.
It provides information about the owner of the Drive, total and available
storage space and exposes a collection of all the [Items][item-resource] contained
within the Drive.

For a list of [methods](#methods) for this resource, see the end of this page.

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.drive" } -->
```json
{
  "id": "string",
  "driveType": "string",
  "owner": { "@odata.type": "oneDrive.identitySet" },
  "quota": { "@odata.type": "oneDrive.quota" }
}
```


## Properties

| Property Name | Type                        | Description                                                                                             |
|:--------------|:----------------------------|:--------------------------------------------------------------------------------------------------------|
| `id`          | string                      | The unique identifier of the drive                                                                      |
| `driveType`   | string                      | Enumerated value that identifies the type of drive account. Possible values are 'consumer', 'business'. |
| `owner`       | [IdentitySet][identity-set] | The user account that owns the drive                                                                    |
| `quota`       | [Quota][quota-facet]        | Information about the drive's storage space quota.                                                      |

## Relationships

The Drive resource has the following relationships defined:

| Relationship name | Type              | Description                                                        |
|:------------------|:------------------|:-------------------------------------------------------------------|
| `items`           | `Item` collection | All items contained in the drive.                                  |
| `root`            | `Item`            | The root folder of the drive.                                      |
| `special`         | `Item` collection | Collection of common folders available in OneDrive.                |
| `shares`          | `Item` collection | Collection of items that have been shared with the signed-in user. |


## Views

The Drive resource also has custom functions implemented to provide useful views
of data that are not immedately available through the standard resources. These
views are defined for a Drive:

| View name     | Type | Description                                                                       |
|:--------------|:-----|:----------------------------------------------------------------------------------|
| `view.shared` |      | `Item` collection grouped by Owner that have been shared with the signed-in user. |
| `view.recent` |      | `Item` collection of recently accessed files                                      |

## Methods

* [get](../drives/get.md)
* [default](../drives/default.md)  

[item-resource]: ../README.md#item
[identity-set]: ../resources/identitySet.md
[quota-facet]: ../facets/quotainfo_facet.md
