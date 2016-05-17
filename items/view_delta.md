# View changes for a OneDrive Item and its children

This method allows your app to enumerate the changes under a OneDrive folder
from an earlier state, represented by a delta token. This enables your app to
maintain a local representation of the contents of a drive and update the local
state efficiently.

## HTTP request

````
GET /drive/items/{item-id}/view.delta
GET /drive/root:/{item-path}:/view.delta
````

### Optional query string parameters

| Name      | Value  | Description                                                                                                                          |
|:----------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| **token** | string | The last token returned from the previous call to `view.delta`. If omitted, `view.delta` returns the current state of the hierarchy. |
| **top**   | number | The desired number of items to return in the next page. Note: `view.delta` may end up returning more or fewer.                       |

### Example

<!-- { "blockType": "request", "name": "get-delta", "idempotent": true, "scopes": "files.read" } -->
```
GET /drive/items/{item-id}/view.delta
Accept: application/json
```

### Response

If successful, this call returns a [Delta Response object][delta-resource]
which contains a collection of [Item resources][item-resource] representing the
current state of each item. The collection also includes the additional
properties shown in the next table.

| Name                 | Value  | Description                                                                                                                                      |
|:---------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------------------|
| **value**            | array  | An array of [Item][item-resource] objects which have been created, modified, or deleted.                                                         |
| **@odata.nextLink**  | url    | A URL to retrieve the next available page of changes, if there are additional changes in the current set.                                        |
| **@odata.deltaLink** | url    | A URL returned instead of **@odata.nextLink** after all current changes have been returned. Used to read the next set of changes in the future.  |
| **@delta.token**     | string | A token value that can be used in the query string on manually-crafted calls to `view.delta`. Not needed if you're using nextLink and deltaLink. |

Your app begins by calling `view.delta` without the `token` query parameter.
The service starts enumerating the folder's hierarchy, returning pages of items
as well as a `@delta.token` and either an `@odata.nextLink` or an
`@odata.deltaLink`, as described above. Your app should continue calling
`view.delta` either with the `@odata.nextLink` or with the `token` parameter
until you no longer see an `@odata.nextLink` returned, or you see a response
with an empty set of changes. After you have finished receiving all the
changes, you may apply them to your local state. To check for changes in the
future, call `view.delta` again with the `@odata.deltaLink` or the latest
`delta.token`.

Deleted items are returned with a `deleted` facet. Items with this facet should
be removed from your local state. Note: you should only delete a folder locally
if it is empty after syncing all the changes.

### Example

#### More changes available

<!-- { "blockType": "response", "@odata.type": "oneDrive.viewDelta", "truncated": true } -->
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
        },
        {
            "id": "2353010204ddgg",
            "name": "file5.txt",
            "deleted": { }
        }
    ],
    "@odata.nextLink": "https://api.onedrive.com/drive/root/view.delta?token=1230919asd190410jlka",
    "@delta.token": "1230919asd190410jlka"
}
```

#### Last page (no more changes)

<!-- { "blockType": "example", "@odata.type": "oneDrive.viewDelta", "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "value": [
        {
            "id": "Zcv23t61asdf335",
            "name": "folder5",
            "folder": { }
        },
        {
            "id": "mmng3523321235c",
            "name": "file.txt",
            "file": { }
        }
    ],
    "@odata.deltaLink": "https://api.onedrive.com/drive/root/view.delta?token=52316919gghhd19041023kj",
    "@delta.token": "52316919gghhd19041023kj"
}
```

**Notes:**

* The Response object is truncated for clarity. All default properties will be
  returned from the actual call.
* The delta feed shows the latest state for each item, not each change. If an
  item were renamed twice, it would only show up once, with its latest name.
* The same item may appear more than once in a delta feed, for various reasons.
  You should use the last occurrence you see.
* The `parentReference` property on items will not include a value for `path`.
  This occurs because renaming a folder does not result in any descendants of
  the folder being returned from view.delta. When using view.delta you should
  always track items by id.

There may be cases when the service can't provide a list of changes for a given
token (for example, if a client tries to reuse an old token after being
disconnected for a long time, or if server state has changed and a new token is
required). In these cases the service will return an `HTTP 410 Gone` error with
an [error response][error-response] containing one of the error codes below,
and a `Location` header containing a new nextLink that starts a fresh delta
enumeration from scratch. After finishing the full enumeration, compare the
returned items with your local state and follow these instructions.

| Error Type                       | Instructions                                                                                                                                                                                                                    |
|:---------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ResyncChangesApplyDifferences`  | Replace any local items with the server's version (including deletes) if you're sure that the service was up to date with your local changes when you last sync'd. Upload any local changes that the server doesn't know about. |
| `ResyncChangesUploadDifferences` | Upload any local items that the service did not return, and upload any files that differ from the server's version (keeping both copies if you're not sure which one is more up-to-date).                                       |


### Retrieving just the latest delta token
It is possible to retrieve just the latest delta token, without first
enumerating all of the items. This can be useful if your app only wants to know
about changes, and doesn't care about any existing items. To retrieve just the
latest token, call `view.delta` with the string `latest` as the value for the
`token` query parameter.

**Note: If you are trying to maintain a full local representation of the items
in a folder or a drive, you must use `view.delta` for the initial enumeration.
Other approaches, such as paging through the `children` collection of a folder,
are not guaranteed to return every single item if any writes take place during
the enumeration. `view.delta` is the only way to guarantee that you've read all
of the data you need to.**

#### Example

<!-- { "blockType": "request", "name": "get-delta-latest", "scope": "files.read" } -->
```
GET /drive/root/view.delta?token=latest
Accept: application/json
```

<!-- { "blockType": "response", "@odata.type": "oneDrive.viewDelta" } -->
```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "value": [ ],
    "@odata.deltaLink": "https://api.onedrive.com/drive/root/view.delta?token=1230919asd190410jlka",
    "@delta.token": "1230919asd190410jlka"
}
```

### Error responses

In addition to the resync errors detailed above, see [Error Responses][error-response] for details about
how errors are returned.

[delta-resource]: ../resources/viewDeltaResource.md
[error-response]: ../misc/errors.md
[item-resource]: ../resources/item.md

## Remarks

In OneDrive for Business, `view.delta` is only supported on the `root` folder,
not on other folders. It also will not return the following Item properties:

* **createdBy**
* **eTag**
* **fileSystemInfo**
* **lastModifiedBy**

<!-- {
  "type": "#page.annotation",
  "description": "Sync changes from the service to your client state.",
  "keywords": "sync,view.delta,view.changes,$delta",
  "section": "documentation",
  "tocPath": "Items/Sync Changes"
} -->
