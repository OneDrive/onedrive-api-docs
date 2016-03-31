# Photo facet

The **Photo** facet groups photo-related data on OneDrive, for example, EXIF metadata, into a single structure.

It is available on the photo property of [Item][item-resource] resources that represent photos.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.photo" } -->
```json
{
  "takenDateTime": "string (timestamp)",
  "cameraMake": "string",
  "cameraModel": "string",
  "fNumber": 1.8,
  "exposureDenominator": 1000.0,
  "exposureNumerator": 1.0,
  "focalLength": 22.5,
  "iso": 100
}
```
## Properties

| Property name           | Type           | Description                                                     |
|:------------------------|:---------------|:----------------------------------------------------------------|
| **takenDateTime**       | DateTimeOffset | Represents the date and time the photo was taken.               |
| **cameraMake**          | String         | Camera manufacturer.                                            |
| **cameraModel**         | String         | Camera model.                                                   |
| **fNumber**             | Double         | The F-stop value from the camera.                               |
| **exposureDenominator** | Double         | The denominator for the exposure time fraction from the camera. |
| **exposureNumerator**   | Double         | The numerator for the exposure time fraction from the camera.   |
| **focalLength**         | Double         | The focal length from the camera.                               |
| **iso**                 | Int64          | The ISO value from the camera.                                  |


## Remarks

In OneDrive for Business, this facet is returned if it includes the **takenDateTime** property.

[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "The photo facet provides details about the camera and settings on the camera for photos.",
  "keywords": "camera make,camera model, exposure, f-stop, iso",
  "section": "documentation",
  "tocPath": "Facets/Photo"
} -->
