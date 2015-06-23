# Drive resource type
The Drive resource represents a drive in OneDrive.
It provides information about the owner of the drive, total and available
storage space, and exposes a collection of all the [Items][item-resource] contained
within the drive.

## JSON representation

Here is a JSON representation of a Drive resource.
<!-- { "blockType": "resource", "@odata.type": "oneDrive.drive" } -->
```json
{
  "id": "string",
  "driveType": "personal | business",
  "owner": { "@odata.type": "oneDrive.identitySet" },
  "quota": { "@odata.type": "oneDrive.quota" }
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

| Relationship name | Type            | Description                                         |
|:------------------|:----------------|:----------------------------------------------------|
| **items**         | Item collection | All items contained in the drive.                   |
| **root**          | Item resource   | The root folder of the drive.                       |
| **special**       | Item collection | Collection of common folders available in OneDrive. |

[item-resource]: ../README.md#item-resource
[identity-set]: ../resources/identitySet.md
[quota-facet]: ../facets/quotainfo_facet.md

<!-- {
  "type": "#page.annotation",
  "description": "Drive is a top level object for OneDrive API that provides access to the contents of a drive. ",
  "keywords": "drive,objects,resources",
  "section": "documentation"
} -->
