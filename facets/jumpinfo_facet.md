# SpecialFolder facet

The **SpecialFolder** facet provides information about how a folder on OneDrive can be accessed via the special
folders collection.

## JSON representation (GET)

<!-- { "blockType": "resource", "@odata.type": "oneDrive.specialFolder" } -->
```json
{
  "name": "string"
}
```

| Property name | Type   | Description                                                            |
|:--------------|:-------|:-----------------------------------------------------------------------|
| **name**      | string | The unique identifier for this item in the `/drive/special` collection |
