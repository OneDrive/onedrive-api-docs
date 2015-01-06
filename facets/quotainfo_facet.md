# QuotaInfo type

The QuotaInfo type groups storage space quota related information
into a single structure.

### JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.quota" } -->
```json
{
  "total": 1234,
  "used": 1234,
  "remaining": 1234,
  "deleted": 1234,
  "state": "string (should be ok)"
}
```

## Properties

| Property Name | Type   | Description                                                                                                              |
|:--------------|:-------|:-------------------------------------------------------------------------------------------------------------------------|
| total         | int64  | Total allowed storage space, in bytes.                                                                                   |
| used          | int64  | Total space used, in bytes.                                                                                              |
| remaining     | int64  | Total space remaining before hitting the quota limit, in bytes.                                                          |
| deleted       | int64  | Total space consumed by files in the recycle bin, in bytes.                                                              |
| state         | string | Enumerated value that indicates the state of the storage space. Possible values are `ok`, `warning`, `critical`, `over`. |
