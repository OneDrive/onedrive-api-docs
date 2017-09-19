---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: OneDrive API release notes
---
# Release notes for using Microsoft Graph with OneDrive for Business and SharePoint

Microsoft Graph provides a common API for accessing files from OneDrive personal, OneDrive for Business, and SharePoint.
However, while the API surface is common, these services may have slight differences in how the API works that you need to account for.
As much as possible the Microsoft Graph works to eliminate these differences, but this page calls out any that you may need to be aware of when working with Microsoft Graph.

## Differences between OneDrive Personal, OneDrive for Business, and SharePoint

Differences between OneDrive, OneDrive for Business, and SharePoint are listed below:

* [CTag implemention](#ctag-implementation)
* [Custom thumbnails](#custom-thumbnails)
* [Thumbnails collection](#thumbnails-collection)
* [Item searching](#item-searching)
* [Filtering](#filtering)
* [Sorting](#sorting)
* [View deltas](#view-deltas)
* [Uploading items](#uploading-items)
* [File facet is empty](#file-facet)
* [Image and photo facets](#image-and-photo-facets)
* [Sharing links](#sharing-links-and-permissions)
* [Shared By Me](#shared-by-me)


### CTag implementation

* OneDrive for Business and SharePoint
  * The **cTag** property of an [driveItem](../resources/driveitem.md) returns only files. This property is not available on folders.

### Custom thumbnails

* OneDrive for Business and SharePoint
  * Setting a [custom thumbnail](../api/driveitem_list_thumbnails.md) on an item is not available.

### Thumbnails collection

* SharePoint Server 2016
  * Thumbnails for all driveItems are not available.

### Item searching

* OneDrive for Business and SharePoint
  * [Search](../api/driveitem_search.md) will not return the following properties:
    * **createdBy**
    * **modifiedBy**
    * **parentReference**

### Filtering

* OneDrive for Business and SharePoint
  * Filtering an item collection can only be done by the **name** and **url** properties only.

### Sorting

* OneDrive for Business and SharePoint
  * The **orderby** query string only works with **name** and **url** properties.

### View deltas

* OneDrive for Business and SharePoint
  * The **delta** action is only available on the `root` item of a drive e.g. `/drive/root`.
  * The following properties are not returned:
    * **createdBy**
    * **cTag**
    * **fileSystemInfo**
    * **lastModifiedBy**
* SharePoint Server 2016
  * The **delta** function is not available.


### Special folders

* OneDrive for Business and SharePoint
  * Not all of the [defined special folders](../api/drive_get_specialfolder.md) are available.
    The following special folders are available:
    * **approot**
    * **documents**
    * **photos**

### Uploading items

* OneDrive for Business and SharePoint
  * [Upload from URL](../api/driveitem_upload_url.md) is only available for data URIs. It does not support uploading from HTTP or HTTPS URLs.
  * [Multipart upload](../api/driveitem_post_content.md) is not available.

### File facet

* OneDrive for Business and SharePoiint
  * The file facet does not include MIME type, SHA1 or CRC32 hash values.

* OneDrive personal
  * The file facet does not include the QuickXOr hash value.

### Image and photo facets

* OneDrive for Business and SharePoint
  * A limited subset of properties for images and photos is available.
  * The `photo` facet only provides the `takenDateTime` property.
  * The `image` facet is returned on items that appear to be images, but has no properties.

### Sharing links and permissions

* SharePoint Server 2016
  * Sharing links are not available.

* OneDrive for Business and SharePoint
  * The **inheritedFrom** property on the [**Permission**](../resources/permission.md) resource is not returned.

### Shared by me

* OneDrive for Business and SharePoint
  * [Shared by Me](../api/drive_sharedbyme.md) is not available.

## Send us feedback!

Please use the community links at the bottom of our website to send us feedback
either through UserVoice or by posting issues in GitHub. We want to hear more
from you about the OneDrive API for OneDrive for Business.

<!-- {
  "type": "#page.annotation",
  "description": "Read more about the differences in using OneDrive API with OneDrive for Business",
  "keywords": "release,notes,onedrive,onedrive for business,od4b,odb,files api,files api v2",
  "section": "documentation",
  "tocPath": "Overview/Release notes"
} -->
