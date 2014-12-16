## Comparison of OneDrive API calls with competitors

>#####[Folders](misc/api-comparisons/createfolder.md) | Files


###Uploading a file


####Dropbox
```http
Basic upload (max 150 MB):
    PUT /1/files_put/auto/pictures/kauai2013/luau.jpg

    {...file content...}


Resumable upload (chunks must be in order; max chunk size 150MB):
    PUT /1/chunked_upload

    {...first chunk...}
  --
    200 OK
    {
      "upload_id": "v0k84B0AT9fYkfMUp0sBTA",
      "offset": 31337,
      "expires": "Tue, 9 Sep 2014 21:55:38 +0000"
    }
  --
    PUT /1/chunked_upload?upload_id=v0k84B0AT9fYkfMUp0sBTA&offset=31337

    {...repeat for next chunks...}
  --
    POST /1/commit_chunked_upload/auto/pictures/kauai2013/luau.jpg?upload_id=v0k84B0AT9fYkfMUp0sBTA


Multi-part upload:
    N/A; Dropbox does not support rich metadata on files, and hence
    does not allow binary and metadata to be specified together.
```

####Google Drive
```http
Basic upload (can't specify file name or path!):
    POST /upload/drive/v2/files?uploadType=media
    Content-Type: image/jpeg

    {...file content...}


Resumable upload (out-of-order OK; chunks must be a multiple of 256 KB):
    POST /upload/drive/v2/files?uploadType=resumable
    Content-Type: application/json
    X-Upload-Content-Type: image/jpeg
    X-Upload-Content-Length: {totalBytes}

    {
      "title": "luau.jpg",
      "parents": [{"id":"ParentFolderId0ADK06pfg"}]
    }
  --
    200 OK
    Location: https://somegoogleurl.com/blahblahblahblah?upload_id=xa298sd_sdlkj2
  --
    PUT /blahblahblahblah?upload_id=xa298sd_sdlkj2
    Content-Length: 524288
    Content-Range: bytes 0-524287/2000000
    Content-Type: image/jpeg

    {...chunk bytes...}
  --
    308 Resume Incomplete   // chunk saved; upload incomplete
    Range: 0-524287         // note: non-standard; misuse of 308
  -or-
    201 Created             // new file created
  -or-
    200 OK                  // existing file updated


Multi-part upload:
    POST /upload/drive/v2/files?uploadType=multipart
    Content-Type: multipart/related; boundary="foo_bar"

    --foo_bar
    Content-Type: application/json

    {
      "title": "luau.jpg"
      "parents": [{"id":"ParentFolderId0ADK06pfg"}]
    }
    --foo_bar
    Content-Type: image/jpeg

    {...file content...}

    --foo_bar--
```

####Box
```http
Basic upload:
    N/A; Box only support multipart.


Resumable upload:
    N/A; Box does not support resumable upload

Multi-part upload:
    POST /api/2.0/files/content
    Content-Type: multipart/form-data; boundary="foo_bar"

    --foo_bar
    Content-Disposition: form-data; filename="luau.jpg"; name="filename"

    {...file content...}
    --foo_bar
    Content-Disposition: form-data; name="folder_id"

    ParentFolderId0ADK06pfg
    --foo_bar--
```

####Copy.com (Barracuda)
```http
Basic upload:
    N/A; Copy.com only supports multipart.

Resumable upload:
    N/A; Copy.com does not currently support resumable upload, but they say it's planned

Multi-part upload (max 1 GB):
    POST /rest/files/pictures/kauai2013/luau.jpg
    Content-Type: multipart/form-data; boundary="foo_bar"

    --foo_bar
    Content-Disposition: form-data; filename="luau.jpg"; name="file"
    Content-Type: image/jpeg

    {...file content...}
    --foo_bar--
```
####OneDrive
```http
Basic upload (max 200 MB):
    PUT /me/path/pictures/kauai2013/luau.jpg/:content

    {...file content...}

Resumable upload (out-of-order OK; max chunk size 64 MB):
    POST /me/path/pictures/kauai2013/luau.jpg
    Content-Type: application/json
    X-Upload-Content-Length: {totalBytes}

    {
      // optional metadata if desired
      "caption": "hula hula"
    }
  --
    200 OK
    Location: https://someuploadurl.com/UploadSessionBlahblahblahblahblah
  --
    PUT /UploadSessionBlahblahblahblahblah
    Content-Length: 524288
    Content-Range: bytes 0-524287/2000000

    {...chunk bytes...}
  --
    200 OK                  // chunk saved; upload incomplete
    Range: 0-524287
  -or-
    201 Created             // new file created
  -or-
    204 No Content          // existing file updated

Multi-part upload (max 200 MB total payload):
    POST /me/path/pictures/kauai2013/luau.jpg
    Content-Type: multipart/related; boundary="foo_bar"

    --foo_bar
    Content-Type: application/json

    {
      "caption": "hula hula"
    }
    --foo_bar
    Content-Type: image/jpeg

    {...file content...}

    --foo_bar--

```
