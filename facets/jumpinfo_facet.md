# SpecialFolder Facet
JumpInfo provides information about how a folder can be accessed via the special
folders collection.

### JSON representation (GET)

<!-- { "blockType": "resource", "@odata.type": "oneDrive.jumpinfo" } -->
```json
{
  "jumpId": "string"
}
```

| Property Name | Type     | Description                                                          | Writable |
|:--------------|:---------|:---------------------------------------------------------------------|:---------|
| `jumpId`      | `string` | The unique identifier for this item in the /drive/special collection | No       |
