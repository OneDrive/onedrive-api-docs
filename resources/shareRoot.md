# Share resource

The share resource provides information about how one or more items have
been shared.

<!-- {"blockType": "resource", "@odata.type": "oneDrive.share" } -->
```json
{
  "id": "string",
  "name": "string",
  "owner": { "@odata.type": "oneDrive.identitySet" },

  "items": [ { "@odata.type": "oneDrive.item" }],
  "root": { "@odata.type": "oneDrive.item" }
}
```

## Relationships

The following table defines the relationships that the Drive resource has to other resources.

| Relationship name | Type            | Description                                                                                                                                                |
|:------------------|:----------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **items**         | Item collection | All items contained in the sharing root. This collection cannot be enumerated.                                                                             |
| **root**          | Item resource   | The root item being shared. This is an [item](item.md) that represents either the shared item or a container of shared items, when multiple items have been shared. |


<!-- {
  "type": "#page.annotation",
  "description": "Share resource returns information about a shared item or collection of items.",
  "keywords": "share,shared,sharing root,shared files, shared items",
  "section": "documentation",
  "tocPath": "Resources/Share"
} -->
