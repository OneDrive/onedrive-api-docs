# Create a new folder in OneDrive

Create a new folder in a specified parent item or parent path.

## Prerequisites

To create an item in OneDrive, the user must have granted the app write
access to the parent folder of the new item.

## HTTP request

<!-- { "blockType": "ignored" } -->
```http
POST /drive/items/{parent-id}/children
```

### Request body
In the request body, supply a JSON representation of a [Folder][folder-facet]
item, as shown below.

### Example

Here is an example of how to create a new folder.

<!-- { "blockType": "request", "name": "create-folder", "scopes": "files.readwrite" } -->
```
POST /drive/root/children
Content-Type: application/json

{
  "name": "FolderA",
  "folder": { }
}
```

| Name                       | Value                       | Description                                                                                                                                                    |
|:---------------------------|:----------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **name**                   | string                      | Name of the folder to be created.                                                                                                                              |
| **folder**                 | [FolderFacet][folder-facet] | Empty *Folder* facet to indicate that folder is the type of resource to be created.                                                                            |
| **@name.conflictBehavior** | string                      | Determines what to do if an item with a matching name already exists in this folder. Accepted values are: **rename**, **replace**, and **fail** (the default). |

If _@name.conflictBehavior_ is set to **rename** and an item with the same name already
exists in the destination, the new item name will be updated to be unique. OneDrive
will append a number to the end of the item name (for files - before the extension).

For example, `My Folder` would be renamed `My Folder 1`. If `My Folder 1` is
taken, then the number would be incremented again until a unique filename is
discovered.


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
  "description": "Create a folder item in a drive.",
  "keywords": "create,folder,new item",
  "section": "documentation",
  "tocPath": "Items/Create Folder"
} -->
