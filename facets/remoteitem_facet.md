# Remote item facet
The **Remote item** facet contains data and references items that exist in another drive.
It is available on the `remoteItem` property of [Item][item-resource] resources that have been shared and added to a drive, for example, by using the "Add to OneDrive" feature. 

**Note:** Unlike with folders in the user's drive, an item moved into a
remote item might have its `id` changed.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.remoteItem" } -->
```json
{
  "remoteItem": { "@odata.type": "oneDrive.item" }
}
```
## Properties

| Property name  | Type                  | Description                                                   |
|:---------------|:----------------------|:--------------------------------------------------------------|
| **remoteItem** | [Item][item-resource] | Information about the remote item.                             |

[item-resource]: ../resources/item.md
