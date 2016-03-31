# Identity resource

The Identity resource represents an identity of an **actor**. For example, and
actor can be a user, device, or application.

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.identity", "optionalProperties": ["displayName", "thumbnails"] } -->
```json
{
  "id": "string",
  "displayName": "string",
  "thumbnails": { "@odata.type": "oneDrive.thumbnailSet" }
}

```
## Properties

| Property name   | Type         | Description                                                                                                                                                                                                                                                                            |
|:----------------|:-------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **id**          | string       | Unique identifier for the identity.                                                                                                                                                                                                                                                    |
| **displayName** | string       | The identity's display name. Note that this may not always be available or up to date. For example, if a user changes their display name, OneDrive may show the new value in a future response, but the items associated with the user won't show up as having changed in `view.delta` |
| **thumbnails**  | ThumbnailSet | A collection of thumbnail images that represents this identity. Profile photos are returned for people, icons are returned for other identity types.                                                                                                                                   |


<!-- {
  "type": "#page.annotation",
  "description": "Identity contains information about an app, user, or group.",
  "keywords": "identity,owner,modifier,app,user,group",
  "section": "documentation",
  "tocPath": "Resources/Identity"

} -->
