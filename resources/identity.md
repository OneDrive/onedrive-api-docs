# Identity type
The Identity type represents an identity of an _actor_. For example, and actor can be a user, device, or application.

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.identity", "optionalProperties": ["displayName"] } -->
```json
{
  "id": "string",
  "displayName": "optional string"
}

```
## Properties

| Property name   | Type   | Description                                                                                                                                                                                                                                                                              |
|:----------------|:-------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **id**          | string | Unique identifier for the identity.                                                                                                                                                                                                                                                      |
| **displayName** | string | The identity's display name. Note that this may not always be available or up to date. For example, if a user changes their display name, OneDrive may show the new value in a future response, but the items associated with the user won't show up as having changed in `view.changes` |

### Public identity

In this example, the identity defines a file that has a `public` sharing role and is available to everyone without
authentication.

```json
{
  "id": "public",
  "displayName": "public"
}
```
