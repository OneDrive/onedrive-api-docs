# Delta response object

The **view.delta** method returns the following resource from each call. The
resource includes a collection of items that have changes and information about
how to retrieve the next set of changes.

## JSON representation
Here is a JSON representation of a Sync response object.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.viewDelta",
       "optionalProperties": ["@odata.nextLink", "@odata.deltaLink"]} -->
```json
{
  "value":
  [
    { "@odata.type": "oneDrive.item" }
  ],
  "@odata.nextLink": "url",
  "@odata.deltaLink": "url",
  "@delta.token": "string"
}
```
## Properties
The Delta response object has the following properties.

| Name                 | Value   | Description                                                                                                                                      |
|:---------------------|:--------|:-------------------------------------------------------------------------------------------------------------------------------------------------|
| **value**            | array   | An array of [Item][item-resource] objects which have been created, modified, or deleted.                                                         |
| **@odata.nextLink**  | url     | A URL to retrieve the next available page of changes.                                                                                            |
| **@odata.deltaLink** | url     | A URL returned instead of **@odata.nextLink** after all current changes have been returned. Used to read the next set of changes in the future.  |
| **@delta.token**     | string  | A token value that can be used in the query string on manually-crafted calls to `view.delta`. Not needed if you're using nextLink and deltaLink. |


[item-resource]: item.md

<!-- {
  "type": "#page.annotation",
  "description": "Get the changes since a previous moment in time defined by a token.",
  "section": "documentation",
  "tocPath": "Resources/Delta"
} -->
