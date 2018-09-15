---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Hashes - OneDrive API
---
# Hashes resource type

The **Hashes** resource groups available hashes into a single structure for an item.

## JSON representation

Here is a JSON representation of the resource.

<!-- {
  "blockType": "resource",
  "optionalProperties": [ "quickXorHash" ],
  "@odata.type": "oneDrive.hashes"
}-->

```json
{
  "quickXorHash": "string (base64)"
}
```

## Properties

| Property         | Type   | Description                                                       |
|:-----------------|:-------|:------------------------------------------------------------------|
| **quickXorHash** | String | (Base64 string). A proprietary hash of the file that can be used to determine if the contents of the file have changed (if available). Read-only. |

**Note:** In some cases hash values may not be available. 
If this is the case, the hash values on an item will be updated after the item is downloaded.

## Remarks

To calculate **quickXorHash** for a file, refer to the [QuickXorHash snippet](../../code-snippets/quickxorhash.md).

For more information about the facets on a DriveItem, see [DriveItem](driveitem.md).


<!-- {
  "type": "#page.annotation",
  "description": "The hashes facet provides hash identifiers for a file in OneDrive",
  "keywords": "hash,sha1,crc32,item,facet",
  "section": "documentation",
  "tocPath": "Facets/Hashes"
} -->
