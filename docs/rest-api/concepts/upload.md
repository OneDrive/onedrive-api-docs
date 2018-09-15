---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: conceptual
title: Uploading files - OneDrive API
---
# Upload contents for an item on OneDrive

There are four OneDrive APIs that can be used to upload the contents of an item. The
correct method to use depends on where the content is coming from and how large
the contents of the item are.

* **[Simple item upload](../api/driveitem_put_content.md)** is available for items with less than 4 MB of content.

* **[Resumable item upload](../api/driveitem_createuploadsession.md)** is provided for large files or when a resumable transfer may be necessary.

[file-facet]: ../resources/file.md

<!-- {
  "type": "#page.annotation",
  "description": "Methods for how files can be uploaded to OneDrive.",
  "keywords": "upload,upload methods,simple,resumable",
  "section": "documentation",
  "tocPath": "Items/Upload"
} -->
