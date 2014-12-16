# Move Item
Change the parent folder for an Item resource.

This is a special case of the [update](update.md) method. You can combine
moving the folder with other metadata updates.

##### Pre-requisites

To call the Move Folder API, the user must have granted the application read
access to the original folder and write access to the parent folder of the
specified destination

##### HTTP Request
```
PATCH /drive/items/{item-id}
PATCH /drive/root:/{item-path}
```

### Request Body
You can use update API to move an item into another folder by updating the
`parentRef` facet to point to the new parent.

#### Examples

This example would move the folder `AFolder` from the `Documents` folder to
the `Archive` folder.

```
PATCH /drive/root:/Documents/AFolder
Content-Type: application/json

{
	"parentRef": {"path": "/Archive" }
}
```

You can also use update API to move an item into another folder by updating the
`parentInfo.id` or `parentInfo.path` property to the ID of the desired new parent.

```
For more details, including example responses and error codes,
see the [update](update.md) topic.


##### Error Responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.
[error-response]: ../misc/errors.md

HTTP Code | Error Code | Error Message
--- | --- | ---
400 | ... | Supplied parameter is invalid or has invalid format
403 | ... | The app does not have authorization to move the folder
