---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Localize file handlers - OneDrive
---
# Localizing file handler strings

To ensure that your file handler add-in meets international requirements, you must localize the display strings used in your file handler.

To localize display values, you use the strings collection, a property of the file handler addIn:

```json
{
    "id": "guid",
    "type": "FileHandler",
    "properties": [
        { "key": "version", "value": "2" },
        { "key": "fileTypeDisplayName", "value": "Contoso Document File" },
        { "key": "strings en-us", "value": "json" },
        { "key": "strings fr-fr", "value": "json" },
        { "key": "strings de-de", "value": "json" }
    ]
}
```

The localized strings are stored in their own key/value pair, using the key value of `strings`, a space, and the locale code for the region where the strings should be used.
For example, for German - Germany, you would specify `strings de-de` as the key name.

The value for this key is a JSON dictionary that maps the displayName value used in the manifest into the localized text.
These values are matched based on full-string matching.
No partial string replacements are allowed.

For example:

```json
{
    "Contoso Document": "Contoso Dokument"
}
```

This dictionary is used to map the any of the displayName properties (`fileTypeDisplayName`, `displayName`, `shortDisplayName` on actions) into the appropriate international string for the user's selected language.


<!-- {
  "type": "#page.annotation",
  "description": "Create a copy of an existing item.",
  "keywords": "copy existing item",
  "section": "documentation",
  "tocPath": "File handlers/Defining actions"
} -->