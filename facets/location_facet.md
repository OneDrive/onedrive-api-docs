# Location facet

The **Location** facet groups geographic location-related data on OneDrive into a single structure.

It is available on the location property of [Item][item-resource] resources that have
an associated geographic location.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.location" } -->
```json
{
  "altitude": 760.0,
  "latitude": 122.1232,
  "longitude": 34.0012
}
```

## Properties
| Property name | Type   | Description                                                    |
|:--------------|:-------|:---------------------------------------------------------------|
| **altitude**  | Double | The altitude (height), in feet,  above sea level for the item. |
| **latitude**  | Double | The latitude, in decimal, for the item.                        |
| **longitude** | Double | The longitude, in decimal, for the item.                       |


[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "The location facet provides geographic location related properties for an item",
  "keywords": "location,geographic,item,onedrive",
  "section": "documentation",
  "tocPath": "Facets/Location"
} -->
