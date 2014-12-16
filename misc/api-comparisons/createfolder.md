## Comparison of OneDrive API calls with competitors

>#####Folders | [Files](misc/api-comparisons/createfile.md)

###Creating a folder

####Dropbox
```http
By Path:
    POST /1/fileops/create_folder?root=auto&path=/pictures/kauai2013

By ID:
    N/A; Dropbox does not have stable ID's for items. Just paths.
```

####Google Drive
```http
By Path:
  N/A; Google Drive does not support path-based access.
  Need to do GETs on hierarchy first to discover parent ID.

By ID:
    POST /drive/v2/files
    Content-Type: application/json

    {
      "title": "kauai2013",
      "parents": [{"id":"ParentFolderId0ADK06pfg"}]
      "mimeType": "application/vnd.google-apps.folder"
    }
```

####Box
```http
By Path:

    N/A; Box does not support path-based access.
    Need to do GETs on hierarchy first to discover parent ID.

By ID:
    POST /2.0/folders
    Content-Type: application/json

    {
      "name": "kauai2013",
      "parent": {"id":"ParentFolderId0ADK06pfg"}
    }
```

####Copy.com (Barracuda)
```http
By Path:
    POST /rest/files/pictures/kauai2013

By ID:
    N/A; Copy.com does not have stable ID's for items. Just paths.
```
####OneDrive
```http
By Path:
    PUT /me/path/pictures/kauai2013
    Content-Type: application/json

    {
      folder:
      {
        // optional metadata
      }
    }

By ID:
    PUT /me/id/ParentFolderId0ADK06pfg/children/kauai2013
    Content-Type: application/json

    {
      folder:
      {
        // optional metadata
      }
    }

```
