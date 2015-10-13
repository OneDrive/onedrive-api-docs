# Accessing File Versions

OneDrive provides access to multiple versions of a file. Each time an update is
made to a file, OneDrive automatically creates a new version of the file.

The original version and current version of a file are maintained indefinitely.
Version history for other versions are maintained for _30 days_.

## Tasks

| Task Name               | ID Syntax                                                                 | Path Syntax                                                                     |
|:------------------------|:--------------------------------------------------------------------------|:--------------------------------------------------------------------------------|
| List Versions           | `GET /drive/items/{item-id}/versions`                                     | `GET /drive/root:/{path_to_file}:/versions`                                     |
| Get Version Information | `GET /drive/items/{id}/versions/{version-id}`                             | `GET /drive/root:/{path_to_file}:/versions/{version-id}`                        |
| Promote Version         | `POST /drive/items/{item-id}/versions/{version-id}/action.promoteVersion` | `POST /drive/root:/{path_to_file}:/versions/{version-id}/action.promoteVersion` |
| Get Version Content     | `GET /drive/items/{item-id}/versions/{version-id}/content`                | `GET /drive/root:/{path_to_file}:/versions/{version-id}/content`                |

## Version Resource

OneDrive does not preserve the complete metadata for previous versions of a file. When
you retrieve the list of available versions for a file, an Item resource is returned
that provides the available information about the specific version. The resource
will be missing most of the metadata normally provided on an Item resource.

The following properties are available on a version history item:

<!-- { "blockType": "example", "name": "version-history-item", "@odata.type": "oneDrive.item", "truncated": true } -->
```json
{
  "id": "131098098109281",
  "name": "filename_original.png",
  "cTag": "cTag",
  "lastModifiedBy": {
    "user": {
      "id": "1234567890",
      "displayName": "Ryan Gregg"
    }
  },
  "lastModifiedDateTime": "timestamp",
  "size": 1203010,
  "file": {
    "mimeType": "file/content",
    "hashes":
    {
      "sha1Hash": "1230a0a0"
    }
   },
  "thumbnails": [ ]
}
```

**Note:** Other properties or facets not specified above are not available.

You can use the [optional query string values](../odata/optional-query-parameters.md)
to change the shape of the response from this call. This includes expanding
the `thumbnails` collection to retrieve thumbnail URLs in a single call.

## List Versions
You can retrieve information on the available versions of a file through
the `versions` collection on an Item:

<!-- { "blockType": "request", "name": "get-previous-versions" } -->
```
GET /drive/items/{item-id}/versions
```

This returns a collection of versions:

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true, "isCollection": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "value":
  [
    {
      "id": "1231913180",
      "name": "myfile.jpg",
      "lastModifiedBy": { },
      "lastModifiedDateTime": "timestamp"
    },
    {
      "id": "12319131810",
      "name": "sunny_vacation.jpg",
      "lastModifiedBy": { },
      "lastModifiedDateTime": "timestamp"
    },
    {
      "id": "12319131811",
      "name": "sunny_vacation.jpg",
      "lastModifiedBy": { },
      "lastModifiedDateTime": "timestamp"
    }
  ]
}
```
## Get Version Information
You can retrieve information of a version of a file through
the `versions` collection on an Item:

<!-- { "blockType": "request", "name": "get-single-version" } -->
```
GET /drive/items/{item-id}/versions/{version-id}
```

This returns a collection of versions:

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true, "isCollection": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "value":
  [
    {
      "id": "1231913180",
      "name": "myfile.jpg",
      "lastModifiedBy": { },
      "lastModifiedDateTime": "timestamp"
    }
  ]
}
```

##### Error Responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.

[error-response]: ../misc/errors.md
