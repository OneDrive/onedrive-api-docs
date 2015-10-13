# Create an Item in OneDrive

Add a new item under an existing parent item in OneDrive.

**Note** You can't create empty files in OneDrive. See
[Upload item contents](upload.md) for more info about creating a file with metadata and
contents in an API call.

## Prerequisites

To create an item in OneDrive, the user must have granted the app write
access to the parent folder of the new item. There are 3 ways to create,
but all end in the same result.

## HTTP request

<!-- { "blockType": "ignored" } -->
```
PUT /drive/items/{parent-id}/children/{name}
PUT /drive/items/{parent-id}:/{name}
POST /drive/items/{parent-id}/children
```

### Request body
In the request body, supply a JSON representation of a [Folder][folder-facet] Item, as shown
below.


### Folder example

Here is an example of how to create a new folder.

<!-- { "blockType": "request", "name": "create-folder" } -->
```
POST /drive/root/children
Content-Type: application/json

{
  "name": "FolderA",
  "folder": { },
  "@name.conflictBehavior": "rename"
}
```

| Name                     | Value                       | Description                                                                                                                                                    |
|:-------------------------|:----------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| _name_                   | string                      | Name of the folder to be created.                                                                                                                              |
| _folder_                 | [FolderFacet][folder-facet] | Empty *Folder* facet to indicate that folder is the type of resource to be created.                                                                            |
| _@name.conflictBehavior_ | string                      | Determines what to do if an item with a matching name already exists in this folder. Accepted values are: **rename**, **replace**, and **fail** (the default). |

If _@name.conflictBehavior_ is set to **rename** and an item with the same name already
exists in the destination, the new item name will be updated to be unique. OneDrive
will append a number to the end of the item name (for files - before the extension).

For example, `My Folder` would be renamed `My Folder 1`.
If `My Folder 1` is taken, then the number would be incremented
again until a unique filename is discovered.

### File example

See [Multipart Upload](upload_post.md) for details on how to create an item and
provide metadata and file contents at the same time.


## Response

If successful, this method returns an [Item][item-resource] in
the response body.

<!-- { "blockType": "response", "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 201 Created
Content-type: application/json

{
  "id": "0123456789abc",
  "name": "FolderA",
  "folder": { "childCount": 0 }
}
```

**Note:** The response object is truncated for clarity. All default properties will
be returned from the actual call.

### Error response

Read the [Error Responses][error-response] topic for more info about
how errors are returned.
[error-response]: ../misc/errors.md
[item-resource]: ../resources/item.md
[folder-facet]: ../facets/folder_facet.md

<!-- {
  "type": "#page.annotation",
  "description": "Create a new item, like a folder.",
  "keywords": "create,folder,new item",
  "section": "documentation",
  "tocPath": "Items/Create"
} -->
