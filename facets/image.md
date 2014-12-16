# ImageFacet type
ImageFacet groups bitmap image related data, including photo EXIF metadata, into a single structure.
It is available on the image property of [Item](item.md) resources that have associated bitmaps.

### JSON representation
(ODB-Support: coming soon)
```json
{
	"width": {integer},
	"height": {integer},
	"dotsPerInch": {integer},
	"bitsPerPixel": {integer},
  "dateTimeTaken": {timestamp},
	"cameraMake": {string},
	"cameraModel": {string},
	"fNumber": {double},
	"exposureDenominator": {integer},
	"exposureNumerator": {integer},
	"focalLength": {double},
	"focalLength35": {double},
	"iso": {integer}
}
```
## Properties
Property Name | Type | Description | Notes
--- | --- | --- | ---
`width` | integer | Pixel width of the image |
`height` | integer | Pixel height of the image |
`dotsPerInch` | integer | Number of pixels that make up one inch |
`bitsPerPixel` | integer | Color depth for each pixel of the image |
 `dateTimeTaken`|timestamp| Date and time when the photo was taken
	`cameraMake`|string|Camera make
	`cameraModel`|string|Camera model
`fNumber`|double| E.g. `2.8` for an 1/2.8 aperture
	`exposureTimeDenominator`|integer|The denominator of the exposure, e.g. `1` in 1/250
	`exposureTimeNumerator`|integer|The numerator of the exposure, e.g. `250` in 1/250
	`focalLength`|integer|Focal length in millimeters
	`focalLength35`|integer|35mm film equivalent focal length in millimeters
	`iso`|integer|ISO speed setting
