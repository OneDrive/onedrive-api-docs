# IdentitySet type
The IdentitySet type is a keyed collection of [Identity type](identity.md) objects.
It is used to represent a set of identities associated with various events for a file or folder, such as
created by.

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.identitySet", "optionalProperties": ["user", "application", "device"] } -->
```json
{
	"user": { "@odata.type": "oneDrive.identity" },
	"application": { "@odata.type": "oneDrive.identity" },
	"device": { "@odata.type": "oneDrive.identity" }
}
```
## Properties

>TODO:properties
