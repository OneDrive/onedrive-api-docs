---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: AsyncJobStatus - OneDrive API
localization_priority: Normal
---
# AsyncJobStatus resource

This resource provides information on the status of a asynchronous job progress.

The following API calls return **AsyncJobStatus** resources:

* [Copy Item](../api/driveitem_copy.md)
* [Upload From URL](../api/driveitem_upload_url.md)

## JSON representation

<!-- { "blockType": "resource", "@type": "microsoft.graph.asyncJobStatus", "@type.aka": "microsoft.graph.asyncOperationStatus", "optionalProperties": [ "operation", "resourceId", "statusDescription"] } -->

```json
{
  "operation": "ItemCopy | DownloadUrl",
  "percentageComplete": 100.0,
  "resourceId": "01MOWKYVJML57KN2ANMBA3JZJS2MBGC7KM",
  "status": "notStarted | inProgress | completed | updating | failed | deletePending | deleteFailed | waiting",
  "statusDescription": "URL was successfully downloaded to target"
}
```

## Properties

| Property name          | Type   | Description
|:-----------------------|:-------|:-------------------------------------------
| **operation**          | String | A string value that specifies what job is being performed on the item.
| **percentageComplete** | Double | A value between 0 and 100 that indicates the percentage complete.
| **resourceId**         | String | A unique identifier for the results.
| **status**             | String | A string value that maps to an enumeration of possible values about the status of the job.
| **statusDescription**  | String | A description detailing the status of the job.

<!-- {
  "type": "#page.annotation",
  "description": "AsyncJobResource provides details about how to poll for an async completion.",
  "keywords": "async,job status,async status,copy,upload from url",
  "section": "documentation",
  "suppressions": [
    "Warning: /resources/asyncJobStatus.md:
      Found potential enums in resource example that weren't defined in a table:(ItemCopy,DownloadUrl) are in resource, but () are in table",
    "Warning: /resources/asyncJobStatus.md:
      Found potential enums in resource example that weren't defined in a table:(notStarted,inProgress,completed,updating,failed,deletePending,deleteFailed,waiting) are in resource, but () are in table"
  ]
} -->
