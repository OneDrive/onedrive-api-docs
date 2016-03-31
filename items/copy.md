# Copy an Item on OneDrive (preview)

Creates a copy of an [Item][item-resource] (including any children), under a new parent item.

## Prerequisites
To call the copy API, the user must have granted the application read access to
the specified item to be copied and write access to the destination folder.

## HTTP request

<!-- { "blockType": "ignored" } -->
```
POST /drive/items/{item-id}/action.copy
POST /drive/root:/{item-path}:/action.copy
```

### Request body
In the request body, provide a JSON object with the following parameters.


| Name              | Value                                          | Description                                                                                                 |
|:------------------|:-----------------------------------------------|:------------------------------------------------------------------------------------------------------------|
| _parentReference_ | [ItemReference](../resources/itemReference.md) | Reference to the parent item the copy will be created in.                                                   |
| _name_            | string                                         | **Optional** The new name for the copy. If this isn't provided, the same name will be used as the original. |

**Note:** The _parentReference_ should include either an `id` or `path` but not
both. If both are included, they need to reference the same item or an error
will occur.

### Example

<!-- { "blockType": "request", "name": "copy-item", "scopes": "files.readwrite" } -->
```http
POST /drive/items/{item-id}/action.copy
Content-Type: application/json
Prefer: respond-async

{
  "parentReference": {
    "id": "{new-parent-id}",
    "path": "/drive/root:/Documents"
  },
  "name": "foobar.txt"
}
```

## Response

Returns details about how to monitor the progress of the copy, upon accepting the request.

<!-- { "blockType": "response" } -->
```http
HTTP/1.1 202 Accepted
Location: https://onedrive.com/monitor/113jlkjlkjasd1212abcascaf
```

The value of the `Location` header provides a URL for a service that will return
the current state of the copy operation. You can use this info to determine when the copy has finished.

### Error responses
To retrieve the current status of the async copy job, issue a GET request to the URL
in the `Location` header. If the response returns an `HTTP 202` then the
body of the response is an [AsyncJobStatus](../resources/asyncJobStatus.md)
resource that defines the current status of the job.

If the copy job has completed, the GET request will return an `HTTP 303 See Other`
response with a new `Location` header that will take you to the item resource for
the copied item.

See [Error Responses][error-response] for more info about
how errors are returned.
[error-response]: ../misc/errors.md
[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "Create a copy of an existing item.",
  "keywords": "copy existing item",
  "section": "documentation",
  "tocPath": "Items/Copy"
} -->
