# Deleted facet

The **Deleted** facet indicates that the item on OneDrive has been deleted. In this version
of the API, the presence (non-null) of the facet value indicates that the file was
deleted. A null (or missing) value indicates that the file is not deleted.

**Note**: While this facet is empty today, in future API revisions the facet
may be populated with additional properties.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.deleted" } -->
```json
{
  "state": "string"
}
```
## Properties

None. This facet is a null or not-null value and contains no properties.

<!-- {
  "type": "#page.annotation",
  "description": "The deleted facet providers properties about deleted items",
  "keywords": "deleted,delete,item,facet",
  "section": "documentation",
  "tocPath": "Facets/Deleted"
} -->
