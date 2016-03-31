# File facet

The **File** facet groups file-related data on OneDrive into a single structure.
It is available on the file property of [Item][item-resource] resources that represent files.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.file", "optionalProperties": ["@downloadUrl", "@copyFromUrl"] } -->
```json
{
  "mimeType": "string",
  "hashes":  { "@odata.type": "oneDrive.hashes" }
}
```

| Property Name | Type                          | Description                                                                                                                                 |
|:--------------|:------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------|
| **mimeType**  | string                        | The MIME type for the file. This is determined by logic on the server and might not be the value provided when the file was uploaded. |
| **hashes**    | [HashesType](hashes_facet.md) | Hashes of the file's binary content, if available.                                                                                          |

[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "The file facet describes properties of a file",
  "keywords": "file,item,facet",
  "section": "documentation",
  "tocPath": "Facets/File"
} -->
