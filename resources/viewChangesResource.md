# Sync response object

The **view.changes** method returns the following resource from each call. The resource includes a collection of items that have changes and information about how to retrieve the next set of changes.

## JSON representation
Here is a JSON representation of a Sync response object.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.viewChanges" } -->
```json
{
  "value":
  [
    { "@odata.type": "oneDrive.item" }
  ],
  "@odata.nextLink": "url",
  "@changes.hasMoreChanges": true,
  "@changes.token": "string",
  "@changes.resync": "string"
}
```
## Properties
The Sync response object has these properties.

| Property name               | Value   | Description                                                                                                                                                     |
|:----------------------------|:--------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **value**                   | array   | An array of [Item][item-resource] objects that have been created, modified, or deleted.                                                                         |
| **@odata.nextLink**         | url     | A URL that is used to retrieve the next page of changes.                                                                                                        |
| **@changes.hasMoreChanges** | boolean | A value that indicates if there are additional changes available.                                                                                               |
| **@changes.token**          | string  | A token value that is used on the next call to `view.changes`, to retrieve the next set of changes. This matches the value in the **@odata.nextLink** property. |
| **@changes.resync**         | string  | A value that indicates a delta can't be computed for the provided token, and the client needs to restart synchronizing the data as described in the next table. |

This table describes the instructions based on the value of **@changes.resync**.

| Value of **@changes.resync** | Instructions                                                                                                                                                                                                                    |
|:-----------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `applyDifferences`           | Replace any local items with the server's version (including deletes) if you're sure that the service was up to date with your local changes when you last sync'd. Upload any local changes that the server doesn't know about. |
| `uploadDifferences`          | Upload any local items that the service did not return, and upload any files that differ from the server's version (keeping both copies if you're not sure which one is more up-to-date).                                       |


[item-resource]: item.md
