# Photo facet

The **Photo** facet groups photo-related data on OneDrive, for example, EXIF metadata, into a single structure.

It is available on the photo property of [Item][item-resource] resources that represent photos.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.photo" } -->
```json
{
  "takenDateTime": "timestamp",
  "cameraMake": "string",
  "cameraModel": "string",
  "fNumber": 1.8,
  "exposureDenominator": 1000,
  "exposureNumerator": 1,
  "focalLength": 22.5,
  "iso": 100
}
```
## Properties

| Property name           | Type                      | Description                                                     |
|:------------------------|:--------------------------|:----------------------------------------------------------------|
| **takenDateTime**       | [timestamp](timestamp.md) | Represents the date and time the photo was taken.               |
| **cameraMake**          | string                    | Camera manufacturer.                                            |
| **cameraModel**         | string                    | Camera model.                                                   |
| **fNumber**             | number                    | The F-stop value from the camera.                               |
| **exposureDenominator** | number                    | The denominator for the exposure time fraction from the camera. |
| **exposureNumerator**   | number                    | The numerator for the exposure time fraction from the camera.   |
| **focalLength**         | number                    | The focal length from the camera.                               |
| **iso**                 | number                    | The ISO value from the camera.                                  |

[item-resource]: ../resources/item.md
