# ItemReference type

The itemReference type groups data needed to reference a OneDrive item across the service into a single structure.


## JSON representation

Here is a JSON representation of an itemReference type.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.itemReference" } -->
```json
{
  "driveId": "string (identifier)",
  "id": "string (identifier)",
  "path": "string (path)"
}
```

## Properties

The itemReference type has these properties.

| Property name | Type   | Description                                             | Read/Write  |
|:--------------|:-------|:--------------------------------------------------------|:------------|
| **driveId**   | string | Unique identifier for the Drive that contains the item. | Read-only.  |
| **id**        | string | Unique identifier for the item.                         | Read/Write. |
| **path**      | string | Path that used to navigate to the item.                 | Read/Write. |

**Note:** The **path** value is a OneDrive API path, for example: `/drive/root:/Documents/myfile.docx`.
To retrieve the human-readable path for a breadcrumb, you can safely ignore
everything up to the first `:` in the path string.

<!-- {
  "type": "#page.annotation",
  "description": "ItemReference returns a pointer to another item.",
  "section": "documentation",
  "tocPath": "Resources/Item reference"
} -->
