---
author: JeremyKelley
ms.author: JeremyKe
ms.date: 09/10/2017
title: AsyncJobStatus - OneDrive API
ms.localizationpriority: Medium
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
  "status": "notStarted | inProgress | completed | failed | cancelled | waiting | cancelPending",
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

## status Meaning

| String Value           | Description
|:-----------------------|:-------------------------------------------
| **notStarted**         | The work has been enqueued but not yet picked up.
| **inProgress**         | The work is being actively processed.
| **completed**          | The work has been completed.
| **failed**             | The work failed.
| **cancelled**          | The work was cancelled.
| **waiting**            | The work was interrupted, but will be tried again.
| **cancelPending**      | The work was cancelled, but processing has not yet aborted.

<!-- {
  "type": "#page.annotation",
  "description": "AsyncJobResource provides details about how to poll for an async completion.",
  "keywords": "async,job status,async status,copy,upload from url",
  "section": "documentation",
  "suppressions": [
  "Warning: /docs/rest-api/resources/asyncJobStatus.md:
      Found potential enums in resource example that weren't defined in a table:(ItemCopy,DownloadUrl) are in resource, but () are in table",
  "Warning: /docs/rest-api/resources/asyncJobStatus.md:
      Found potential enums in resource example that weren't defined in a table:(notStarted,inProgress,completed,failed,cancelled,waiting,cancelPending) are in resource, but ()       are in table"
  ]
} -->
