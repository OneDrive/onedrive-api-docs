---
author: JeremyKelley
ms.author: JeremyKe
ms.date: 03/22/2024
title: Hashes - OneDrive API
ms.localizationpriority: Medium
---
# Hashes resource type

The **Hashes** resource groups available hashes into a single structure for an item.

**Note:** Not all services provide a value for all hash properties listed.

## JSON representation

Here is a JSON representation of the resource.

<!-- {
  "blockType": "resource",
  "optionalProperties": [ "sha1Hash", "crc32Hash", "quickXorHash" ],
  "@odata.type": "microsoft.graph.hashes"
}-->

```json
{
  "crc32Hash": "string (hex)",
  "sha1Hash": "string (hex)",
  "quickXorHash": "string (base64)"
}
```

## Properties

| Property         | Type   | Description                                                       |
|:-----------------|:-------|:------------------------------------------------------------------|
| **sha1Hash**     | String | (Hex string). SHA1 hash for the contents of the file (if available). Read-only. |
| **crc32Hash**    | String | (Hex string). The CRC32 value of the file in little endian (if available). Read-only.            |
| **quickXorHash** | String | (Base64 string). A proprietary hash of the file that can be used to determine if the contents of the file have changed (if available). Read-only. |


## Remarks

***Note*** **quickXorHash** is the only value that is guaranteed to be available for both OneDrive for Business and OneDriver Personal.

To calculate **quickXorHash** for a file, refer to the [QuickXorHash snippet](../../code-snippets/quickxorhash.md).

For more information about the facets on a DriveItem, see [DriveItem](driveitem.md).


<!-- {
  "type": "#page.annotation",
  "description": "The hashes facet provides hash identifiers for a file in OneDrive",
  "keywords": "hash,sha1,crc32,item,facet",
  "section": "documentation",
  "tocPath": "Facets/Hashes"
} -->
