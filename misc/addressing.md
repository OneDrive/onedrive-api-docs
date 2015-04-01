# Addressing resources in a drive on OneDrive

The OneDrive API allows a single URL to address two aspects of a resource:
* The Item resource
* A property, facet, or relationship of the Item

An Item facet represents an element of the resource, like the image metadata,
folder metadata, and so on.

In this example, a canonical URL for a file might look like this.

```
/drive/root:/Documents/MyFile.xlsx:/content
```
This example URL has these components:
* `/drive` - The signed-in user's drive.
* `/root` - The root folder for the drive.
* `:/Documents/MyFile.xlsx:` - The `: :` around `/Documents/MyFile.xlsx` represents
a switch to the path-based addressing syntax. Everything between the two colons is
treated as a path relative to the item before the path (in this case, the root).
* `/content` - Represents the default binary stream for the file. You can also
address other properties or relationships on the item.

## ID-based addressing
OneDrive supports ID-based addressing of items. Items are assigned a unique
identifier when they are created and the ID persists across the actions a user
performs on the item. Renaming or moving the item will not change the item's ID.

ID-based addressing is a useful way to track items that might be moved by the user
to different locations on OneDrive. As long as you have the item's ID and the item exists, you'll be
able to find it.

## Path-based addressing
OneDrive also supports path-based addressing. This allows you to use a friendly
URL syntax to address items relative to the hierarchy of items visible in
OneDrive. If you know the hierarchy to an item, you can directly address that
item, without spending any time making repeated calls to discover each level of the
hierarchy.

However, since path-based addressing is based on the name of the item, renaming
or moving the item to a new location will cause the path of the item to change.

Path-based addressing can be used relative to any item in OneDrive, which enables
some very useful scenarios. For example, when working with shared folders, you
can use a path-based URL relative to the shared folder's item ID to address
something in the shared folder by path.

## Examples
These examples show the different URL formats that can be used to access data.
All of these URLs are logically equivalent and return the content of MyFile.xlsx.

| URL example                                       | Description                                              |
|:--------------------------------------------------|:---------------------------------------------------------|
| `/drive/root:/Documents/MyFile.xlsx:/content`     | Specified by path relative to the root of a drive.       |
| `/drive/special/documents:/MyFile.xlsx:/content`  | Specified by filename in the `documents` special folder. |
| `/drive/items/0123456789AB/content`               | Specified by item-id.                                    |
| `/drives/AB0987654321/items/0123456789AB/content` | Specified by drive-id and item-id.                       |

<!-- {
  "type": "#page.annotation",
  "description": "Learn how to address items in OneDrive by path or unique ID.",
  "keywords": "addressing,create url, path, unique id, file id, id",
  "section": "documentation",
  "tocPath": "Misc/Addressing Items"
} -->
