---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: conceptual
title: Uploading files - OneDrive API
---
# Upload contents for an item on OneDrive

Items on OneDrive with a [File facet][file-facet] have one or more streams of content
associated with the item. The default stream represents the contents of the
file. Other streams may be used to represent item thumbnails or alternative
data formats.

There are four OneDrive APIs that can be used to upload the contents of an item. The
correct method to use depends on where the content is coming from and how large
the contents of the item are.

* **[Simple item upload](../api/driveitem_put_content.md)** is available for items with less than 4 MB of content.

* **[Resumable item upload](../api/driveitem_createuploadsession.md)** is provided for large files or when a resumable transfer may be necessary.

* **[Multipart item upload](../api/driveitem_post_content.md)** allows you to upload both the contents of an item and provide metadata about the item in the same call.
    This is only available for OneDrive Personal.

* **[Upload from URL (preview)](../api/driveitem_upload_url.md)** allows you to upload the contents of a file by providing a URL where the contents of the file can be retrieved.
    This is only available for OneDrive Personal.

[file-facet]: ../resources/file.md

<!-- {
  "type": "#page.annotation",
  "description": "Methods for how files can be uploaded to OneDrive.",
  "keywords": "upload,upload methods,simple,resumable,multipart,from url",
  "section": "documentation",
  "tocPath": "Items/Upload"
} -->
