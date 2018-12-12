---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Set a thumbnail on a file - OneDrive API
---
# Upload a custom thumbnail for a DriveItem



This request allows your app to upload a custom thumbnail, which persists with the file
even if the file's contents is updated, to any item that has the `file` facet.   If a
custom uploaded thumbnail is already set, then this request will overwrite that existing
custom uploaded thumbnail.

**Note:** Custom thumbnails are only available on OneDrive Personal.

### HTTP request

<!-- { "blockType": "request", "name": "add-custom-thumbnail", "scopes": "files.readwrite", "tags": "service.onedrive" } -->
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

<!-- { "blockType": "request", "name": "get-custom-thumbnail", "scopes": "files.read", "tags": "service.onedrive service.graph" } -->
```
GET /drive/items/{item-id}/?expand=thumbnails(select=id,large,medium,small,source)
```

### Response

<!-- { "blockType": "response", "@odata.type": "microsoft.graph.driveItem", "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

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

<!-- {
  "type": "#page.annotation",
  "suppressions": [
    "Warning: ExampleRequest_drive/items/{var}/thumbnails/0:
      Assuming 0 under microsoft.graph.thumbnailSet is a hard-coded key in the example path. Please fix to be a placeholder."
  ]
} -->
