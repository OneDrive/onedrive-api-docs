# Getting Thumbnails

There are two common tasks related to getting thumbnails:
* Getting a single thumbnail
* Getting URLs to multiple thumbnails with a single request

## Getting a single standard thumbnail

Getting a single standard thumbnail for an item is easy. Thumbnails for an item
can be addressed via the `thumbnails` reference property which returns an array
of [ThumbnailSets](../resource/thumbnail_set.md) resources.

Every file can have zero or more thumbnail sets associated with it. Each
thumbnail set is a collection of different sized versions of the same image.
The different standard sizes are retuned in the 'small', 'medium' and 'large'
properties of the thumbnail set.

For information on the standard thumbnail sizes, see
[Standard Thumbnail Sizes](#standardthumbnailsizes).

For example, to get the "medium" thumbnail for a file:
```
GET /drive/items/{item-id}/thumbnails/0/medium/content
```

Note that `/me/items/{item-id}/thumbnails/0/medium` above addresses a
[Thumbnail](../resource/thumbnail.md) resource. Referencing the `content`
relationship on the Thumbnail resource returns the binary content.

Another sample using path based addressing, getting the 'large' thumbnail:
```
GET /drive/root:/Photos/Summer%202013/DSCN1234.JPG:/thumbnails/0/large/content
```

## Getting a single custom thumbnail

Getting a single custom thumbnail for an item is done using
the [descriptor](../misc/thumbnail_descriptor.md)
for the desired thumbnail instead of one of the standard thumbnail names.

For example, to get a 320x320 thumbnail for a file:
```
GET /drive/items/{item-id}/thumbnails/0/320x320/content
```


**Note:** This thumbnail will be generated on the fly if it doesn not exist,
which may cause a delay in the response of the API.

Another sample using path based addressing:
```
GET /drive/root:/Photos/Summer%202013/DSCN1234.JPG:/thumbnails/0/400x400_Crop/content
```

### Getting standard thumbnails for a single item
Instead of asking for a single thumbnail at a time, you can also expand
the collection of available thumbnails for an image. The three standard
thumbnails will be returned for every item that supports thumbnails.

```
GET /me/items/{file-id}?$expand=thumbnails

{
  "id": "12903019809a!109bac",
  "name": "DSCN1234.JPG",
  "thumbnails":
  [
    {
      "small": {
        "id": "small",
        "width": 48,
        "height": 48,
        "url": "https://livefilestore.com/qErsfhn343fwe0s9uflkhg/image.jpg"
      },
      "medium": {
        "id": "medium",
        "width": 176,
        "height": 117,
        "url": "https://livefilestore.com/qErsfhn3Ed42e0s9uf34afe/image.jpg"
      },
      "large": {
        "id": "large",
        "width": 1920,
        "height": 1280,
        "url": "https://livefilestore.com/ASpofswjras9uflkhg/image.jpg"
      }
    }
  ]
}
```
**Note:** Item properties were truncated or removed for clarity.


## Getting multiple thumbnails

In situations where you will be displaying multiple thumbnails, such as rendering
photo thumbnails for a collection of images, you should optimize your API calls
and request those thumbnail URLs in one request. This will optimize the performance
of your application and reduce the number of API calls your app makes.

### Getting standard thumbnails for a folder's children
Thumbnails can be expanded for an entire collection of items. This allows you
to enumerate items and retrieve thumbnail URLs in a single call.

```
GET /me/items/{item-id}/children?$expand=thumbnails

{
  "children": [
    {
      "id": "12903019809a!109bac",
      "name": "DSCN1234.JPG",
      "thumbnails": [
        {
          "small": {
            "id": "small",
            "width": 48,
            "height": 48,
            "url": "https://bn2_0095.livefilestore.com/qErsfhn343fwe0s9uflkhg/image.jpg"
          },
          "medium": {
            "id": "medium",
            "width": 176,
            "height": 117,
            "url": "https://bn2_0095.livefilestore.com/qErsfhn3Ed42e0s9uf34afe/image.jpg"
          },
          "large": {
            "id": "large",
            "width": 1920,
            "height": 1280,
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
          "small": {
            "id": "small",
            "width": 48,
            "height": 48,
            "url": "https://bn2_0095.livefilestore.com/qErsfhn343fwe0s9uflkhg/image.jpg"
          },
          "medium": {
            "id": "medium",
            "width": 176,
            "height": 117,
            "url": "https://bn2_0095.livefilestore.com/qErsfhn3Ed42e0s9uf34afe/image.jpg"
          },
          "large": {
            "id": "large",
            "width": 1920,
            "height": 1280,
            "url": "https://bn2_0095.livefilestore.com/ASpofswjras9uflkhg/image.jpg"
          }
        }
      ]
    }
  ]
}
```

### Getting multiple custom thumbnails

By using $select on the expanded thumbnails collection
the caller can ask for custom thumbnails instead of the three default ones.
The value of the $select parameter is one or more thumbnail
 [descriptors](../misc/thumbnail_descriptor.md).

```
GET /me/items/{file-id}?$expand=thumbnails($select=64x64_Crop,600x600)

{
  "id": "12903019809a!109bac",
  "name": "DSCN1234.JPG",
  "thumbnails": [
    {
      "64x64_Crop": {
        "id": "64x64_Crop",
        "width": 64,
        "height": 64,
        "url": "https://bn2_0095.livefilestore.com/qErsfhn343fwe0s9uflkhg/image.jpg"
      },
      "600x600": {
        "id": "600x600",
        "width": 600,
        "height": 400,
        "url": "https://bn2_0095.livefilestore.com/qErsfhn3Ed42e0s9uf34afe/image.jpg"
      }
    }
  ]
}
```

The same technique will work on a collection of items too, e.g.

```
GET /me/items/{folder-id}/children?$expand=thumbnails($select=64x64_Crop,600x600)

```

## Standard Thumbnail Sizes

OneDrive defines the following values as known thumbnail sizes. While you can
request any arbitrary size thumbnail, the following are likely to exist and
return a value quickly:

 Name     | Resolution   | Aspect Ratio        | Description
:---------|:-------------|:--------------------|:---------------------------------------------------------------------
 `small`  | 48x48        | Cropped - Square    | Small, highly compressed thumbnail cropped to a square aspect ratio.
 `medium` | 176 x 1117   | Cropped - Rectangle | Cropped to the standard item size for the OneDrive web view.
 `large`  | 1920 longest | Original            | Thumbnail with the longest edge resized to 1920 pixels.
