# Addressing Resources in a Drive

The OneDrive API allows a single URL to address two aspects of a resource:
* the Item
* a Property, Facet, or Relationship of the Item

A Item Facet represents an element of the resource, like the binary stream of
content, a particular version of the file, a thumbnail, etc.

For example, a canonical URL for a file might look like this:

```
/drive/root:/Documents/MyFile.xlsx:/content
```

This URL has these components:
* `/drive` - The sign-in user's drive
* `/root` - The root folder for the drive
* `:/Documents/MyFile.xlsx:` - The `: :` around `/Documents/MyFile.xlsx` represent
a switch to the path-based addressing syntax. Everything between the colons is
treated as a path relative to the item before the path (in this case, the root).
* `/content` - Represents the default binary stream for the file. You can also
address other properties or relationships on the item.

## ID-Based Addressing
OneDrive supports ID-based addressing of items. Items are assigned a unique
identifier when they are created and the ID persists across the actions a user
performs on the item. Renaming or moving the item will not change the item's ID.

ID-Based addressing is a useful way to track items that may be moved by the user
to different locations in OneDrive. As long as you have the item's ID, you'll be
able to find the item as long as it exists.

## Path-Based Addressing
OneDrive also supports path-based addressing. This allows you to use a friendly
URL syntax to address items relative to the hierarchy of items visible in
OneDrive. If you know the hierarchy to an item, you can directly address that
item without spending time making repeated calls to discover each level of the
hierarchy.

However, since path-based addressing is based on the name of the item, renaming
or moving the item to a new location will cause the path of the item to change.

Path-based addressing can be used relative to any item in OneDrive, which enables
some very useful scenarios. For example, when working with shared folders, you
can use a path-based URL relative to the shared folder's item ID to address
something in the shared folder by path.

## Examples

The same URL could be re-written as follows, all of which are logically equivalent and
return the content of MyFile.xlsx:

URL Example                                      | Description
------------------------------------------------ | ------------
`/drive/root:/Documents/MyFile.xlsx:/content`    | Specified by path relative to the root of a drive
`/drive/special/documents:/MyFile.xlsx:/content` | Specified by filename in the `documents` special folder
`/drive/items/0123456789AB/content`              | Specified by item-id
`/drives/AB0987654321/items/0123456789AB/content`| Specified by drive-id and item-id
