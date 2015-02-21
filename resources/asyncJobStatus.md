# AsyncOperationStatus resource

This resource provides information on the status of a asynchronous job progress.

The following API calls return AsyncOperationStatus resources:

* [Copy Item](../items/copy.md)
* [Upload From URL](../items/upload_url.md)

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.asyncOperationStatus" } -->
```json
{
  "operation": "string",
  "percentageComplete": 100.0,
  "status": "notStarted | inProgress | completed | updating | failed | deletePending | deleteFailed | waiting"
}
```

## Properties

| Property Name        | Type   | Description                                                                                |
|:---------------------|:-------|:-------------------------------------------------------------------------------------------|
| `operation`          | string | The type of job being run.                                                                 |
| `percentageComplete` | string | An float value between 0 and 100 that indicates the percentage complete.                   |
| `status`             | string | A string value that maps to an enumeration of possible values about the status of the job. |
