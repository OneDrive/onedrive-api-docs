#OData Support
The OneDrive API supports OData V4 at the minimum conformance level. Any
deviations are documented. Some of the features of the OneDrive API may not be
available via the OData metadata or generated content.

Some of the key supported features include:
* Service document at the service root ($metadata)
* Supports Upserts
* Return data according to at least one of the OData defined formats (JSON or Atom-XML). If the service does not support the requested format, it replies with a 406 Not Acceptable error response
* Return 501 Not Implemented for any unsupported functionality
* Refer to the [link][odatav4minconformance] for additional details

In addition, any combination of the supported system query options (listed below)
may be present on a valid data service URI. A data service URI with more than one
query option present will be be evaluated as if the query options were applied
to the resource(s) identified by the resource path section of the URI, in the
following order:

```
$filter, $orderby, $skiptoken, $skip, $top, $expand, $select
```

[odatav4minconformance]: http://docs.oasis-open.org/odata/odata/v4.0/os/part1-protocol/odata-v4.0-os-part1-protocol.html#_Toc372793759
