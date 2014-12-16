# Timestamp type

Throughout the OneDrive API date and time information is represented using
[ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format and is always
in UTC time.

For example, if a file was modified at midnight UTC on Jan 1, 2014, the metadata
would look like this:
```
{
	...
	dateTimeLastModified: "2014-01-01T00:00:00Z"
	...
}
```
