# IdentitySet resource type

The **IdentitySet** resource is a keyed collection of [identity](identity.md) resources.
It is used to represent a set of identities associated with various events for an item, such as _created by_ or _last modified by_.

## JSON representation

Here is a JSON representation of the resource.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.identitySet",
       "optionalProperties": ["user", "application", "device"],
       "openType": true } -->
```json
{
  "application": {"@odata.type": "oneDrive.identity"},
  "device": {"@odata.type": "oneDrive.identity"},
  "user": {"@odata.type": "oneDrive.identity"}
}
```
## Properties

| Property    | Type                    | Description                                            |
|:------------|:------------------------|:-------------------------------------------------------|
| application | [Identity](identity.md) | Optional. The application associated with this action. |
| device      | [Identity](identity.md) | Optional. The device associated with this action.      |
| user        | [Identity](identity.md) | Optional. The user associated with this action.        |

## Remarks 

See [Item](../resources/item.md) for usage of **IdentitySet** resources.


<!-- uuid: 8fcb5dbc-d5aa-4681-8e31-b001d5168d79
2015-10-25 14:57:30 UTC -->
<!-- {
  "type": "#page.annotation",
  "description": "Identity set is a collection of identities",
  "section": "documentation",
  "tocPath": "Resources/IdentitySet"
} -->
