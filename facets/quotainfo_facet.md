# Quota facet

The **Quota** facet groups storage space quota-related information
on OneDrive into a single structure.

## JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.quota" } -->
```json
{
  "total": 1234,
  "used": 1234,
  "remaining": 1234,
  "deleted": 1234,
  "state": "normal | nearing | critical | exceeded"
}
```

## Properties

| Property name | Type   | Description                                                                 |
|:--------------|:-------|:----------------------------------------------------------------------------|
| total         | Int64  | Total allowed storage space, in bytes. Read-only.                           |
| used          | Int64  | Total space used, in bytes. Read-only.                                      |
| remaining     | Int64  | Total space remaining before reaching the quota limit, in bytes. Read-only. |
| deleted       | Int64  | Total space consumed by files in the recycle bin, in bytes. Read-only.      |
| state         | string | Enumeration value that indicates the state of the storage space. Read-only. |



## State Enumeration

| Value      | Description                                                                                                                                                                 |
|:-----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `normal`   | The drive has plenty of remaining quota left.                                                                                                                               |
| `nearing`  | Remaining quota is less than 10% of total quota space.                                                                                                                      |
| `critical` | Remaining quota is less than 1% of total quota space.                                                                                                                       |
| `exceeded` | The used quota has exceeded the total quota. New files or folders cannot be added to the drive until it is under the total quota amount or more storage space is purchased. |

<!-- {
  "type": "#page.annotation",
  "description": "The quota facet provides information about how much space the OneDrive has available.",
  "keywords": "quota,available,remaining,used",
  "section": "documentation",
  "tocPath": "Facets/Quota"
} -->
