# ItemReference type
The ItemReference type groups data needed to reference an Item accross the service into a single structure.
<br/> (ODB-Support: coming soon)

### JSON representation
```json
{
	"driveId": {string},
	"id": {string},
	"path": {string}
	"thumbnails": {Thumbnail array}
}
```
## Properties

Property Name | Type | Description | Writable
--- | --- | --- | ---
`driveId` | `string` | Unique identifier for the Drive that contains the item | No
`id` | `string` | Unique identifier for the item | Yes
`path` | `string` | Path that can be used to navigate to the item| Yes

*Note: When updating an Item's ParentInfo to move the item, you need only specify either the id or the path of the new parent. If you specify both, they must match the same item, or an error will be returned.*
