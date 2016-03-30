# View changes for a OneDrive Item and its children

**Note: `view.changes` has been replaced with [`view.delta`](view_delta.md),
which has new features and simplifications to error-handling and paging.
Please use [`view.delta`](view_delta.md) instead.**

This method allows your app to enumerate the sync changes under a OneDrive folder from a specified state. Each change is represented by a
change token. This enables your app to maintain a local copy of the drive, and update the local state efficiently.

## HTTP request

````
GET /drive/items/{item-id}/view.changes
GET /drive/root:/{item-path}:/view.changes
````

### Optional query string parameters

| Name    | Value  | Description                                                                                                                                  |
|:--------|:-------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| _token_ | string | The last token returned from the previous call to `view.changes`. If omitted, `view.changes` will return the current state of the hierarchy. |

### Example

<!-- { "blockType": "request", "name": "get-changes", "idempotent": true, "scopes": "files.read service.onedrive" } -->
```
GET /drive/items/{item-id}/view.changes?token={token}
Accept: application/json
```

### Response

If successful, this call returns a [Sync Response object](../resources/viewChangesResource.md)
which contains a collection of [Item resources][item-resource] representing the current state of
each item. The collection also includes the additional properties shown in the next table.

| Name                        | Value   | Description                                                                                                                                                        |
|:----------------------------|:--------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **value**                   | array   | An array of [Item][item-resource] objects which have been created, modified, or deleted.                                                                           |
| **@odata.nextLink**         | url     | A URL that can be used to retrieve the next page of changes.                                                                                                       |
| **@changes.hasMoreChanges** | boolean | A value that indicates if there are additional changes available.                                                                                                  |
| **@changes.token**          | string  | A token value that can be used on the next call to `view.changes` to retrieve the next set of changes. This matches the value in the **@odata.nextLink** property. |
| **@changes.resync**         | string  | A value indicating that a delta can't be computed for the provided token, and the client needs to resync the data as described below.                              |

Your application should continue to call `view.changes` until the
**@changes.hasMoreChanges** value is set to `false`, or until you make a request that
returns with no changes. After you have finished receiving all the changes, you
may apply them to your local state.

Deleted items will be returned with a `deleted` facet. Items with this facet
should be removed from your local state. Note: you should only delete a
folder locally if it is empty after syncing all the changes.

There may be cases when the service can't provide a list of changes for a given token
(for example, if a client tries to reuse an old token after being disconnected for a long time).
In these cases the service returns **@changes.resync** with a value of either
`applyDifferences` or `uploadDifferences`, and begins a full enumeration
of items, as if you had started without a sync token. After finishing the full resync, compare
the returned items with your local state and follow these instructions.

**Note:** When using `view.changes` the `parentReference` property will not
include a value for `path`. This occurs because renaming a folder does not result
in any descendants of the folder being returned from `view.changes`. When using
`view.changes` you should always track items by `id`.

| Value of **@changes.resync** | Instructions                                                                                                                                                                                                                    |
|:-----------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `applyDifferences`           | Replace any local items with the server's version (including deletes) if you're sure that the service was up to date with your local changes when you last sync'd. Upload any local changes that the server doesn't know about. |
| `uploadDifferences`          | Upload any local items that the service did not return, and upload any files that differ from the server's version (keeping both copies if you're not sure which one is more up-to-date).                                       |

### Example

<!-- { "blockType": "response", "@odata.type": "oneDrive.viewChanges", "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "value": [
    {
        "id": "0123456789abc",
        "name": "folder2",
        "folder": { }
    },
    {
        "id": "123010204abac",
        "name": "file.txt",
        "file": { }
    }
    ],
    "@odata.nextLink": "https://api.onedrive.com/drive/root/view.changes?token=1230919asd190410jlka",
    "@changes.hasMoreChanges": true,
    "@changes.token": "1230919asd190410jlka"
}
```

**Notes:**

* The Response object is truncated for clarity. All default properties will be returned from the actual call.
* The parent item will always be returned before any child items.
* By default each response will include the next 200 changes available on the service. You can modify the number of changes returned in a single call by using the _$top_ query string parameter.


### Fetch current token

In some scenarios your app may need the current token value without seeing the
current state of items. If you send a request with the **token** parameter set
to `latest` the response will include only the latest **token** and **nextLink**
parameters.

<!-- { "blockType": "request", "name": "get-changes-latest", "scopes": "files.read service.onedrive" } -->
```http
GET /drive/items/{item-id}/view.changes?token=latest
```

Which returns an empty **value** collection and a **nextLink** and **token** value
that can be used to pick up changes from this point forward.

<!-- { "blockType": "response", "@odata.type": "oneDrive.viewChanges", "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "value": [],
    "@odata.nextLink": "https://api.onedrive.com/drive/root/view.changes?token=1230919asd190410jlka",
    "@changes.hasMoreChanges": true,
    "@changes.token": "1230919asd190410jlka"
}
```

### Error responses

See [Error Responses][error-response] for details about
how errors are returned.

[error-response]: ../misc/errors.md
[item-resource]: ../resources/item.md
