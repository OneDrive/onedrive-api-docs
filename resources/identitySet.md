# IdentitySet type
The IdentitySet type is a keyed collection of [Identity](identity.md) objects.
It is used to represent a set of identities associated with various events for an item, such as
_created by_ or _last modified by_.

## JSON representation
Here is a JSON representation of an identitySet type.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.identitySet", "optionalProperties": ["user", "application", "device"] } -->
```json
{
  "user": { "@odata.type": "oneDrive.identity" },
  "application": { "@odata.type": "oneDrive.identity" },
  "device": { "@odata.type": "oneDrive.identity" }
}
```
## Properties
The IdentitySet type has these properties.

| Property name   | Type                    | Description                                           |
|:----------------|:------------------------|:------------------------------------------------------|
| **user**        | [Identity](identity.md) | An Identity resource that represents a user.          |
| **application** | [Identity](identity.md) | An Identity resource that represents the application. |
| **device**      | [Identity](identity.md) | An Identity resource that represents the device.      |
