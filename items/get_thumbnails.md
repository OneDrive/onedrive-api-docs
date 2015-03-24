# Get thumbnails for an item on OneDrive

There are three common tasks related to getting thumbnails:

* Enumerate available thumbnails for an item
* Retrieve a single thumbnail for an item
* Retrieve thumbnails for multiple items in a single request

## Enumerate available thumbnails

To enumerate the available thumbnails for an item, you make a request to the
**thumbnails** collection on any item. This returns an array of available
**thumbnailSets** for the item. Any item in OneDrive can have zero or more thumbnails.

### HTTP request

<!-- { "blockType": "request", "name": "enum-thumbnails" } -->
```http
GET /drive/items/{item-id}/thumbnails
```

**Note:** You can use the _select_ query string parameter to control which
thumbnail sizes are returned in the **ThumbnailSet**. For example, `/thumbnails?select=medium` retrieves only the medium sized thumbnails.


### Request body

Do not supply a request body with this request.

### Response

This call returns a collection of [ThumbnailSet](../resources/thumbnailSet.md)
resources available for the item. Most items will have zero or one **ThumbnailSets**
available. Items that contain other items, such a folders, may contain up to
five **ThumbnailSets** representing child items of the referenced item.

<!-- { "blockType": "response", "@odata.type": "oneDrive.thumbnailSet", "isCollection": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "value": [
    {
      "id": "0",
      "small": { "height": 64, "width": 96, "url": "https://sn3302files..."},
      "medium": { "height": 117, "width": 176, "url": "https://sn3302files..."},
      "large": { "height": 533, "width": 800, "url": "https://sn3302files..."}
    }
  ]
}
```

## Retrieve a single thumbnail

Retrieve the metadata for a single thumbnail and size by addressing
it directly in a request.

### HTTP request

<!-- { "blockType": "request", "name": "get-one-thumbnail" } -->
```http
GET /drive/items/{item-id}/thumbnails/{thumb-id}/{size}
```

### Path parameters

| Name       | Type   | Description                                                                              |
|:-----------|:-------|:-----------------------------------------------------------------------------------------|
| _item-id_  | string | The unique identifier for the item referenced.                                           |
| _thumb-id_ | number | The index of the thumbnail, usually 0-4.                                                 |
| _size_     | string | The size of the thumbnail requested. This can be one of the standard sizes listed below. |


<!-- { "blockType": "response", "@odata.type": "oneDrive.thumbnail" } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "width": 100,
  "height": 100,
  "url": "http://onedrive.com/asd123a/asdjlkasjdkasdjlk.jpg"
}
```

## Retrieve thumbnail content

You can directly retrieve the content of the thumbnail directly by requesting the
**content** property of the thumbnail.

### HTTP request

<!-- { "blockType": "request", "name":"get-thumbnail-content" } -->
```http
GET /drive/items/{item-id}/thumbnails/{thumb-id}/{size}/content
```

### Response

The service responds with a redirect to thumbnail URL.

<!-- { "blockType": "response" } -->
```http
HTTP/1.1 302 Found
Location: https://b0mpua-by3301.files.1drv.com/y23vmagahszhxzlcvhasdhasghasodfi
```

Thumbnail URLs are cache-safe. The URL will change, if the item
changes in a way that requires a new thumbnail to be generated.


## Getting multiple thumbnails

To display multiple thumbnails, such as rendering
photo thumbnails for a collection of images, you can optimize your API calls
by requesting those thumbnail URLs in one request. This will optimize the performance
of your application and reduce the number of API calls your app makes.

When retrieving a collection of items, expand the thumbnails collection to also
get the thumbnail URLs for those items.

### HTTP request

This request returns the **id** and **name** property for each item, along with a
the **large** thumbnail size for any item that has a thumbnail available.

<!-- { "blockType": "request", "name":"get-many-thumbnails" } -->
```http
GET /drive/items/{item-id}/children?select=id,name&expand=thumbnails(select=large)
```

### Response

In addition to the normal enumeration of an item's children, this request also
returns thumbnail metadata for the large thumbnails on all items where a thumbnail
is available.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "isCollection": true, "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "value": [
    {
      "id": "12903019809a!109bac",
      "name": "DSCN1234.JPG",
      "thumbnails": [
        {
          "id": "0",
          "large": {
            "width": 800,
            "height": 533,
            "url": "https://bn2_0095.livefilestore.com/ASpofswjras9uflkhg/image.jpg"
          }
        }
      ]
    },
    {
      "id": "12903019809a!109bae",
      "name": "DSCN1235.JPG",
      "thumbnails": [
        {
          "id": "0",
          "large": {
            "width": 800,
            "height": 533,
            "url": "https://bn2_0095.livefilestore.com/ASpofswjras9uflkhg/image.jpg"
          }
        }
      ]
    }
  ]
}
```


### Size values

This table defines the possible thumbnail sizes. While you can
request any arbitrary thumbnail size, the defined values are likely to exist and
return a value quickly:

| Name           | Resolution  | Aspect Ratio | Description                                                          |
|:---------------|:------------|:-------------|:---------------------------------------------------------------------|
| `small`        | 96 longest  | Original     | Small, highly compressed thumbnail cropped to a square aspect ratio. |
| `medium`       | 176 longest | Original     | Cropped to the standard item size for the OneDrive web view.         |
| `large`        | 800 longest | Original     | Thumbnail with the longest edge resized to 800 pixels.              |
| `smallSquare`  | 96x96       | Square Crop  | Small square thumbnail                                               |
| `mediumSquare` | 176x176     | Square Crop  | Small square thumbnail                                               |
| `largeSquare`  | 800x800     | Square Crop  | Large square thumbnail                                               |


## Custom Thumbnail Sizes
In addition to the defined sizes, your app can request a custom thumbnail size
by specifying the dimensions of the thumbnail prefixed with `c`. For example
if you need thumbnails that are 300x400, you can request that size like this:

```http
GET /drive/items/{item-id}/thumbnails?select=c300x400_Crop
```

You can specify the following options after the size of the thumbnail requested:

#### Examples of Custom identifiers
| Thumbnail identifier | Resolution             | Aspect ratio | Description                                                                                                                                         |
|:---------------------|:-----------------------|:-------------|:----------------------------------------------------------------------------------------------------------------------------------------------------|
| c300x400             | Bounded by 300x400 box | Original     | Generate a thumbnail that fits inside a 300x400 pixel box, maintaining aspect ratio                                                                 |
| c300x400_Crop        | 300x300                | Cropped      | Generate a thumbnail that is 300x300 pixels. This works by resizing the image to fill the 300x300 box and cropping whatever spills outside the box. |

### Error responses

See [Error Responses][error-response] for more info about
how errors are returned.

[error-response]: ../misc/errors.md
