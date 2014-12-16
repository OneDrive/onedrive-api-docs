# QuotaInfo type

The QuotaInfo type groups storage space quota related information
into a single structure.

### JSON representation

```json
{
  "total": 10995116277760,
  "used": 10995116277760,
  "remaining": 10995116277760,
  "deleted": 10995116277760,
  "state": "ok",
  "hasUnlimitedStorage": true
}
```

## Properties

Property Name       | Type    | Description
------------------- | ------- | ------------------
total               | int64   | Total allowed storage space, in bytes.
used                | int64   | Total space used, in bytes.
remaining           | int64   | Total space remaining before hitting the quota limit, in bytes.
deleted             | int64   | Total space consumed by files in the recycle bin, in bytes.
state               | string  | Enumerated value that indicates the state of the storage space. Possible values are `ok`, `warning`, `critical`, `over`.
hasUnlimitedStorage | boolean | A value of true indicates the user has unlimited storage, regardless of the quota values.
