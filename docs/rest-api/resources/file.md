# File facet

The **File** facet groups file-related data on OneDrive into a single structure.
It is available on the file property of [driveItem][item-resource] resources that represent files.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.file" } -->
```json
{
  "mimeType": "string",
  "hashes":  { "@odata.type": "oneDrive.hashes" },
  "processingMetadata": false
}
```

| Property Name          | Type                          | Description                                                                                                                                 |
|:-----------------------|:------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------|
| **mimeType**           | string                        | The MIME type for the file. This is determined by logic on the server and might not be the value provided when the file was uploaded.       |
| **hashes**             | [HashesType](hashes.md) | Hashes of the file's binary content, if available.                                                                                          |
| **processingMetadata** | Boolean                       | Flag indicating if the item is still being processed to extract metadata                                                                    |

[item-resource]: ../resources/driveitem.md

<!-- {
  "type": "#page.annotation",
  "description": "The file facet describes properties of a file",
  "keywords": "file,item,facet",
  "section": "documentation",
  "tocPath": "Facets/File"
} -->
