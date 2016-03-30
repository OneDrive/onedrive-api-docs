# View Changes Response resource

The **view.changes** method returns the following resource from each call. The
resource includes a collection of items that have changes and information about
how to retrieve the next set of changes.

**Note:** This resource has been replaced by the [viewDeltaResource](viewDeltaResource.md) returned
from the [view.delta](../items/view_delta.md) action, which should be used instead
of **view.changes**.

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
The view changes response resource has these properties.

| Property name               | Value            | Description                                                                                                                                                     |
|:----------------------------|:-----------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **value**                   | Collection(Item) | An array of [Item][item-resource] objects that have been created, modified, or deleted.                                                                         |
| **@odata.nextLink**         | String           | A URL that is used to retrieve the next page of changes.                                                                                                        |
| **@changes.hasMoreChanges** | Boolean          | A value that indicates if there are additional changes available.                                                                                               |
| **@changes.token**          | String           | A token value that is used on the next call to `view.changes`, to retrieve the next set of changes. This matches the value in the **@odata.nextLink** property. |
| **@changes.resync**         | String           | A value that indicates a delta can't be computed for the provided token, and the client needs to restart synchronizing the data as described in the next table. |

### Enumeration

This table describes the instructions based on the value of **@changes.resync**.

| Value of **@changes.resync** | Instructions                                                                                                                                                                                                                    |
|:-----------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `applyDifferences`           | Replace any local items with the server's version (including deletes) if you're sure that the service was up to date with your local changes when you last sync'd. Upload any local changes that the server doesn't know about. |
| `uploadDifferences`          | Upload any local items that the service did not return, and upload any files that differ from the server's version (keeping both copies if you're not sure which one is more up-to-date).                                       |


[item-resource]: item.md

<!-- {
  "type": "#page.annotation",
  "description": "Get the changes since a previous moment in time defined by a token.",
  "section": "documentation"
} -->
