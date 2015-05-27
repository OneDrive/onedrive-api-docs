# OData support

The OneDrive API supports OData V4 at the minimum conformance level.
Some of the features of the OneDrive API might not be
available via the OData metadata or generated content.

Some of the key supported features include:

* _$metadata_ - Service document at the service root.
* Support _upserts_ - A single command for insert and update.
* JSON objects - Returns data in one of the OData defined formats.
  If the service does not support the requested format, it replies with a
  `406 Not Acceptable` error response.
* Detects errors - Returns `501 Not Implemented` for any unsupported functionality.

For more details, see the [OData Minimum Conformance Level][odatav4minconformance] section from the article [OData Version 4.0 Part 1][odatav4part1].
[odatav4minconformance]: http://docs.oasis-open.org/odata/odata/v4.0/os/part1-protocol/odata-v4.0-os-part1-protocol.html#_Toc372793759
[odatav4part1]: http://docs.oasis-open.org/odata/odata/v4.0/os/part1-protocol/odata-v4.0-os-part1-protocol.html

<!-- {
  "type": "#page.annotation",
  "description": "Details of how OneDrive implements the OData v4 spec.",
  "keywords": "odata,onedrive,conformance,compatibilty",
  "section": "documentation",
  "tocPath": "Misc/OData Support"
} -->
