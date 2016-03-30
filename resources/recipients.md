# Recipients resource (preview)

The recipients resource represents a single recipient for the
[invite](../items/invite.md) action and [item permissions](../items/permissions.md).

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.recipients", "optionalProperties": ["alias", "objectId", "email"] } -->
```json
{
  "email": "string",
  "alias": "string",
  "objectId": "string",
}
```

## Properties
The recipients resource has these properties.

| Property name            | Type              | Description                                                                                                                                                               |
|:-------------------------|:------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **email**                | String            | The email address for the recipient, if the recipient has an associated email address. |
| **alias**                | String            | The alias of the domain object, for cases where an email address is unavailable (e.g. security groups). |
| **objectId**             | String            | The unique identifier for the recipient in the directory. |

## Remarks
When using [action.invite](../items/invite.md) to add permissions, the recipients type
can specify **email**, **alias**, or **objectId**. Only one of these values is
required.

**Note:** this preview resource is likely to be renamed in a future API update.


<!-- {
  "type": "#page.annotation",
  "description": "Recipients resource defines a single recipient for the sharing invitation and permissions collection.",
  "keywords": "sharing,share,permissions,action.invite,invite,email",
  "section": "documentation",
  "tocPath": "Resources/Recipients"
} -->
