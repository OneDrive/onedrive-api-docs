# SharingLink type

The **SharingLink** type groups sharing link-related data on OneDrive into a single structure.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.sharingLink", "optionalProperties": ["application"] } -->
```json
{
  "type": "view | edit | embed | mail",
  "token": "string",
  "webUrl": "string",
  "application": { "@odata.type": "oneDrive.identity" }
}
```
## Properties

| Property name   | Type                                 | Description                                                                                                                                                                      |
|:----------------|:-------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **token**       | string                               | The access token that represents the current link permission. You can use this in place of other authentication tokens to access the resource the current permission is set for. |
| **webUrl**      | string                               | A URL that opens the item in the browser on the OneDrive website.                                                                                                                |
| **apiUrl**      | string                               | A URL that provides API-level access to the item.                                                                                                                                |
| **type**        | string                               | The type of the link created.                                                                                                                                                    |
| **application** | [Identity](../resources/identity.md) | The app the link is associated with. The value is missing or `null` if the link is associated with an official Microsoft app.                                                    |

## Link types

This table defines the possible values for the **type** property.

| type   | Role    | Description                                          |
|:-------|:--------|:-----------------------------------------------------|
| `view` | `read`  | A view-only sharing link, allowing read-only access. |
| `edit` | `write` | An edit sharing link, allowing read-write access.    |
