# ItemReference type

The **itemReference** type groups data needed to reference a OneDrive item across the service into a single structure.

## JSON representation

Here is a JSON representation of an itemReference type.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.itemReference" } -->
```json
{
  "driveId": "string (identifier)",
  "id": "string (identifier)",
  "path": "string (path)",
  "name": "string"
}
```

## Properties

The itemReference type has these properties.

| Property name | Type   | Description                                             |
|:--------------|:-------|:--------------------------------------------------------|
| **driveId**   | string | Unique identifier for the Drive that contains the item. |
| **id**        | string | Unique identifier for the item.                         |
| **path**      | string | Path that used to navigate to the item.                 |
| **name**      | string | The filename of the referenced item.                    |
| **shareId**   | string | The unique identifier for shared items.                 |

**Note:** The **path** value is a relative API path to the root of the drive, for example: `/drive/root:/Documents/myfile.docx`.
To retrieve the human-readable path for a breadcrumb, you can safely ignore everything up to the first `:` in the path string.

<!-- {
  "type": "#page.annotation",
  "description": "ItemReference returns a pointer to another item.",
  "section": "documentation",
  "tocPath": "Resources/ItemReference"
} -->
