# Delta response object

The [**delta** method](../items/view_delta.md) returns the following resource from each call.
The resource includes a collection of items that have changes and information about how to retrieve the next set of changes.

## JSON representation

Here is a JSON representation of a Delta response object.

<!-- { "blockType": "resource", "@odata.type": "oneDrive.viewDelta",
       "optionalProperties": ["@odata.nextLink", "@odata.deltaLink", "@microsoft.graph.token"]} -->
```json
{
  "value":
  [
    { "@odata.type": "oneDrive.item" }
  ],
  "@odata.nextLink": "url",
  "@odata.deltaLink": "url",
  "@microsoft.graph.token": "string"
}
```

## Properties

The Delta response object has the following properties.

| Name                       | Value  | Description                                                                                                                                                                                              |
| -------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **value**                  | array  | An array of [driveItem][item-resource] objects which have been created, modified, or deleted.                                                                                                            |
| **@odata.nextLink**        | url    | A URL to retrieve the next available page of changes.                                                                                                                                                    |
| **@odata.deltaLink**       | url    | A URL returned instead of **@odata.nextLink** after all current changes have been returned. Used to read the next set of changes in the future.                                                          |
| **@microsoft.graph.token** | string | The unique token that can be used in a request to **delta** to get the next set of changes. In general the **nextLink** and **deltaLink** properties should be preferred over using the **token** value. |

[item-resource]: item.md

<!-- {
  "type": "#page.annotation",
  "description": "Get the changes since a previous moment in time defined by a token.",
  "section": "documentation",
  "tocPath": "Resources/Delta"
} -->
