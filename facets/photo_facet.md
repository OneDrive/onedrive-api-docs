# PhotoFacet type
PhotoFacet groups photo related data - e.g. EXIF metadata - into a single structure.
It is available on the photo property of [Item][item-resource] resources that represent photos.

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.photo" } -->
```json
{
	"dateTimeTaken": "string (timestamp)",
	"cameraMake": "string",
	"cameraModel": "string",
	"fNumber": 1.8,
	"exposureDenominator": 1000,
	"exposureNumerator": 1,
	"focalLength": 22.5,
	"focalLength35": 22.5,
	"iso": 100
}
```
## Properties

Property Name | Type | Description | Notes
--- | --- | --- | ---

>TODO properties

[item-resource]: ../resources/item.md
