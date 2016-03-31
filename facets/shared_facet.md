# Shared facet

Indicates that an item has been shared with others. Includes information about
how the item is shared.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.shared" } -->
```json
{
  "owner": { "@odata.type": "oneDrive.identitySet" },
  "scope": "anonymous | organization | users",
}
```

## Properties

| Property name      | Type                                       | Description                                                                             |
|:-------------------|:-------------------------------------------|:----------------------------------------------------------------------------------------|
| **owner**          | [IdentitySet](../resources/identitySet.md) | The identity of the user who owns the item that is shared.                              |
| **scope**          | **String**                                 | Indicates the scope of how the item is shared: `anonymous`, `organization`, or `users`. |

## Scope values

| Value          | Description                                                                           |
|:---------------|:--------------------------------------------------------------------------------------|
| `anonymous`    | The item is shared by using a link that works for anyone with the link.               |
| `organization` | The item is shared by using a link that works for anyone in the owner's organization. |
| `users`        | The item is shared with specific users only.                                          |

<!-- {
  "type": "#page.annotation",
  "description": "The shared facet provides info about shared items.",
  "keywords": "shared,share,item,facet,onedrive",
  "section": "documentation",
  "tocPath": "Facets/Shared"
} -->
