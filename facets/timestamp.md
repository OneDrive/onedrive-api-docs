# Timestamp type

The **Timestamp** type represents date and time information for the
OneDrive API, by using
[ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format and is always
in UTC time.

For example, if a file was modified at midnight UTC on Jan 1, 2014, the metadata
would look like this.

```json
{
  "dateTimeLastModified": "2014-01-01T00:00:00Z"
}
```
