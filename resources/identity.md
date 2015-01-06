# Identity type
The Identity type represents an identity of an actor (e.g. user, device or application).

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.identity", "optionalProperties": ["displayName"] } -->
```json
{
    "id": "string",
    "displayName": "string, optional"
}

```
## Properties

 Property Name | Type     | Description                        | Notes
:--------------|:---------|:-----------------------------------|:------
 `id`          | `string` | Unique identifier for the identity |
 `displayName` | `string` | Displayable name for the identity  |
