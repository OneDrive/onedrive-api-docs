# Thumbnails for an item on OneDrive

An item in OneDrive can be represented by zero or more **ThumbnailSet** objects.
Each **ThumbnailSet** can have one or more **Thumbnail** objects, which are
images that represent the item. For example, a **ThumbnailSet** may include
**Thumbnail** objects, such as common ones including `small`, `medium`, or
`large` and custom defined ones such as `c300x400_Crop`.
Items have **ThumbnailSet** objects that are either generated automatically by
OneDrive based off the item or that are defined by a custom uploaded image.

## Enumerate available thumbnails

To enumerate the available thumbnails for an item, you make the following request using the
**thumbnails** collection on any item.

### HTTP request

<!-- { "blockType": "request", "name": "enum-item-thumbnails", "scopes": "files.read" } -->
```http
GET /drive/items/{item-id}/thumbnails
```

This returns an array of available **thumbnailSets** for the item. Any item in OneDrive can have zero or more thumbnails.

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
      "small": { "height": 64, "width": 96, "url": "https://sn3302files.onedrive.com/123"},
      "medium": { "height": 117, "width": 176, "url": "https://sn3302files.onedrive.com/234"},
      "large": { "height": 533, "width": 800, "url": "https://sn3302files.onedrive.com/345"}
    }
  ]
}
```

## Retrieve a single thumbnail

Retrieve the metadata for a single thumbnail and size by addressing
it directly in a request.

**Note:** custom sizes are only supported on OneDrive Personal.

### HTTP request

<!-- { "blockType": "request", "name": "get-one-thumbnail", "scopes": "files.read" } -->
```http
GET /drive/items/{item-id}/thumbnails/{thumb-id}/{size}
```

### Path parameters


| Name         | Type   | Description                                                                              |
|:-------------|:-------|:-----------------------------------------------------------------------------------------|
| **item-id**  | string | The unique identifier for the item referenced.                                           |
| **thumb-id** | number | The index of the thumbnail, usually 0-4. If there is a custom thumbnail, its index is 0. |
| **size**     | string | The size of the thumbnail requested. This can be one of the standard sizes listed below. |


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

<!-- { "blockType": "request", "name":"get-thumbnail-content", "scopes": "files.read" } -->
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

**Note:** Expanding the thumbnails collection only available for OneDrive Personal.

### HTTP request

This request returns the **id** and **name** property for each item, along with a
the **large** thumbnail size for any item that has a thumbnail available.

<!-- { "blockType": "request", "name":"get-many-thumbnails", "scopes": "files.read service.onedrive" } -->
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
| `large`        | 800 longest | Original     | Thumbnail with the longest edge resized to 800 pixels.               |
| `smallSquare`  | 96x96       | Square Crop  | Small square thumbnail                                               |
| `mediumSquare` | 176x176     | Square Crop  | Small square thumbnail                                               |
| `largeSquare`  | 800x800     | Square Crop  | Large square thumbnail                                               |


## Custom thumbnail sizes

In addition to the defined sizes, your app can request a custom thumbnail size
by specifying the dimensions of the thumbnail prefixed with `c`. For example
if you need thumbnails that are 300x400, you can request that size like this:

<!-- { "name": "get-thumbnail-custom-size", "scopes": "files.read service.onedrive" } -->
```http
GET /drive/items/{item-id}/thumbnails?select=c300x400_Crop
```

Which responds with just the custom thumbnail size selected:

<!-- { "blockType": "response", "@odata.type": "oneDrive.thumbnailSet", "isCollection": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "value": [
    {
      "id": "0",
      "c300x400_Crop": { "height": 300, "width": 400, "url": "https://sn3302files.onedrive.com/123"},
    }
  ]
}
```

You can specify the following options after the size of the thumbnail requested:

#### Examples of custom identifiers
| Thumbnail identifier | Resolution             | Aspect ratio | Description                                                                                                                                         |
|:---------------------|:-----------------------|:-------------|:----------------------------------------------------------------------------------------------------------------------------------------------------|
| c300x400             | Bounded by 300x400 box | Original     | Generate a thumbnail that fits inside a 300x400 pixel box, maintaining aspect ratio                                                                 |
| c300x400_Crop        | 300x400                | Cropped      | Generate a thumbnail that is 300x400 pixels. This works by resizing the image to fill the 300x400 box and cropping whatever spills outside the box. |

**Note:** Custom thumbnail sizes are only available on OneDrive Personal.

## Upload a custom thumbnail on an item

This request allows your app to upload a custom thumbnail, which persists with the file
even if the file's contents is updated, to any item that has the `file` facet.   If a
custom uploaded thumbnail is already set, then this request will overwrite that existing
custom uploaded thumbnail.

**Note:** Custom thumbnails are only available on OneDrive Personal.

### HTTP request

<!-- { "blockType": "request", "name": "add-custom-thumbnail", "scopes": "files.readwrite service.onedrive" } -->
```
PUT /drive/items/{item-id}/thumbnails/0/source/content
Content-Type: application/octet-stream

<<The contents of the image goes here.>>
```

### Response

<!-- { "blockType": "response", "isEmpty": true } -->
```http
HTTP/1.1 200 OK
```

If successful, this call returns a `200 OK` response to indicate that custom thumbnail was
upload successfully. In the response, the `Content-Location` and the `Location` response
header will return the URL to that custom thumbnail.


## Determine if a custom uploaded thumbnail exists

To determine if a custom uploaded thumbnail exists on a file, look for the `source` property
on the thumbnail set. If it has a value, then the value represents the custom uploaded
thumbnail. If it is not present, then no custom uploaded thumbnail exists.

**Note:** Custom thumbnails are only available on OneDrive Personal.

<!-- { "blockType": "request", "name": "get-custom-thumbnail", "scopes": "files.read service.onedrive" } -->
```
GET /drive/items/{item-id}/?expand=thumbnails(select=id,large,medium,small,source)
```

### Response

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 200 OK

{
   "thumbnails":[
      {
         "id":"0",
         "large":{
            "height":800,
            "url":"https://dhbkba-sn3302.files.1drv.com/y2mfq7dB...IlE9xeFMPb0jZMt7SI",
            "width":753
         },
         "medium":{
            "height":176,
            "url":"https://dhbkba-sn3302.files.1drv.com/y2m...Gx3-VnOqMmoW4l15cjX9ADw",
            "width":166
         },
         "small":{
            "height":96,
            "url":"https://dhbkba-sn3302.files.1drv.com/y2m2T1...SLCIKpScctlzybSdNXxE",
            "width":90
         },
         "source":{
            "height":500,
            "url":"https://dhbkba-sn3302.files.1drv.com/y2m2T1...89mxla9x7OeLhMdbIteg",
            "width":500
         }
      }
   ]
}
```

**Note:** The response object is truncated for clarity. All default properties
will be returned from the actual call.


### Error responses

See [Error Responses][error-response] for more info about
how errors are returned.

[error-response]: ../misc/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "Get metadata and content for thumbnails of multiple sizes for OneDrive items.",
  "keywords": "thumbnail,content,download,sizes",
  "section": "documentation",
  "tocPath": "Items/Thumbnails"
} -->
