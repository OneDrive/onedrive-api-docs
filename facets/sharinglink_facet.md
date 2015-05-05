# SharingLink type

The **SharingLink** type groups sharing link-related data on OneDrive into a single structure.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.sharingLink", "optionalProperties": ["application"] } -->
```json
{
  "type": "view | edit ",
  "webUrl": "string",
  "application": { "@odata.type": "oneDrive.identity" }
}
```
## Properties

| Property name   | Type                                 | Description                                                                                                                                                                      |
|:----------------|:-------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **token**       | string                               | The access token that represents the current link permission. You can use this in place of other authentication tokens to access the resource the current permission is set for. |
| **webUrl**      | string                               | A URL that opens the item in the browser on the OneDrive website.                                                                                                                |
| **type**        | string                               | The type of the link created.                                                                                                                                                    |
| **application** | [Identity](../resources/identity.md) | The app the link is associated with. The value is missing or `null` if the link is associated with an official Microsoft app.                                                    |

## Type enumeration

This table defines the possible values for the **type** property.

| Value  | Role    | Description                                          |
|:-------|:--------|:-----------------------------------------------------|
| `view` | `read`  | A view-only sharing link, allowing read-only access. |
| `edit` | `write` | An edit sharing link, allowing read-write access.    |

<!-- {
  "type": "#page.annotation",
  "description": "The sharing link facet provides information about how a file is shared.",
  "keywords": "sharing,sharing link, sharing url, webUrl",
  "section": "documentation"
} -->
