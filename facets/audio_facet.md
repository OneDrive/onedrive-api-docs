# AudioFacet type
AudioFacet groups audio related data into a single structure.
It is available on the audio property of [Item][item-resource] resources that
have associated audio.

### Sample JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.audio" } -->
```json
{
	"album": "string",
	"albumArtist": "string",
	"artist": "string",
	"bitrate": "string",
	"composers": "string",
	"copyright": "string",
	"disc": 0,
	"discCount": 0,
	"duration": "hh:mm:ss.ttt",
	"genre": "string",
	"hasDrm": false,
	"isVariableBitrate": false,
	"title": "string",
	"track": 1,
	"trackCount": 16,
	"year": 2014
}
```

## Properties

| Property Name       | Type      | Description                                                          |
|:--------------------|:----------|:---------------------------------------------------------------------|
| `album`             | `string`  | The title of the album for this audio file.                          |
| `albumArtist`       | `string`  | The artist named on the album for the audio file.                    |
| `artist`            | `string`  | The performing artist for the audio file.                            |
| `bitrate`           | `string`  | Bitrate expressed in kbps.                                           |
| `composers`         | `string`  | The name of the composer of the audio file.                          |
| `copyright`         | `string`  | Copyright information for the audio file.                            |
| `disc`              | `number`  | The number of the disc this audio file came from.                    |
| `discCount`         | `number`  | The total number of discs in this album.                             |
| `duration`          | `string`  | Duration of the audio file, expressed in `hh:mm:ss.ttt`              |
| `genre`             | `string`  | The genre of this audio file.                                        |
| `hasDrm`            | `boolean` | Indicates if the file is protected with digital rights management.   |
| `isVariableBitrate` | `boolean` | Indicates if the file is encoded with a variable bitrate.            |
| `title`             | `string`  | The title of the audio file.                                         |
| `track`             | `number`  | The number of the track on the original disc for this audio file.    |
| `trackCount`        | `number`  | The total number of tracks on the original disc for this audio file. |
| `year`              | `number`  | The year the audio file was recorded.                                |

[item-resource]: ../resources/item.md
