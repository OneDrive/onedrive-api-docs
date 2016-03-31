# Path encoding and reserved characters

OneDrive supports addressing files and folders using the path of the item in the
user's OneDrive. However, because the path contains user specified content which
can potentially contain characters that are not URL safe, you should ensure proper
encoding of any path segments.

The OneDrive API expects that URLs conform to [RFC 3986](http://tools.ietf.org/html/rfc3986).
The following is a summary of how to properly encode paths for the OneDrive API.

## OneDrive reserved characters
The following characters are OneDrive reserved characters, and can't be used in OneDrive folder and file names.

```
  onedrive-reserved  = "/" / "\" / "*" / "<" / ">" / "?" / ":" / "|"
  onedrive-business-reserved
                     = "/" / "\" / "*" / "<" / ">" / "?" / ":" / "|" / "#" / "%"
```

**Note:** Folder names can't end with a period (`.`).

**Note:** OneDrive for Business file or folder names cannot begin with a
tilde ('~'). See [Restrictions and limitations with OneDrive for Business](https://support.microsoft.com/en-us/kb/2933738)
for more information.

### URI path characters

When constructing the path segment of a URL for the OneDrive API, the following
characters are allowed for path names, based on the URI RFC.

```
  pchar       = unreserved / pct-encoded / sub-delims / ":" / "@"
  pct-encoded = "%" HEXDIG HEXDIG
  unreserved  = ALPHA / DIGIT / "-" / "." / "_" / "~"
  sub-delims  = "!" / "$" / "&" / "'" / "(" / ")"
              / "*" / "+" / "," / ";" / "="
```

Item name characters, which are not included in the `pchar` group, such as `#`
and ` ` (space), must be percent encoded.

### Encoding characters
The OneDrive API uses standard percent encoding, where invalid characters are
encoded with a % and then the UTF-8 character code for the character. For
example:

* `" "` -> `%20`
* `"#"` -> `%23`

### Common URL encoding mistakes
You can't encode an entire URL in one call, because the encoding rules for
each segment of a URL are different. Without proper encoding, the unencoded URL
will be ambiguous for which segments contain which content.
As such, you need to encode the URL path when building your URL string.

For example, instead of writing this:

```
string url = url_encode("https://api.onedrive.com/v1.0/drive/root:/" + path + ":/children")
```

Write this:

```
string url = "https://api.onedrive.com/v1.0/drive/root:/" + url_path_encode(path) + ":/children")
```

However, not all URL encoding libraries respect all the requirements of standard
URL path encoding.

### .NET / C-Sharp / Visual Basic

The .NET classes for `HttpUtility` and `Uri` include various methods for
URL encoding. However, none of those methods properly encode all reserved
characters for the path component of the URL (including `HttpUtility.UrlPathEncode`).

Instead of using those methods, you should use `UriBuilder` to construct a
properly escaped URL.

```csharp
UriBuilder builder = new UriBuilder("https://api.onedrive.com");
builder.Path = "/v1.0/drive/root:/Documents/My Files/#nine.docx";
Uri url = builder.Uri;
```

### Objective-C / iOS

For Objective-C, iOS and Mac OS X development, use the `stringByAddingPercentEncodingWithAllowedCharacters` method and
`[NSCharacterSet URLPathAllowedCharacterSet]` to properly encode the path
component of the URL.

```objc
NSString *root = @"https://api.onedrive.com/v1.0/drive/root:/";
NSString *path = @"Documents/My Files/#nine.docx";
NSString *encPath = [path stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLPathAllowedCharacterSet]];
NSURL *url = [[NSURL alloc] initWithString:[root stringByAppendingString:encPath]];
```


### Android

Use the `Uri.Builder` class to construct a properly encoded URL.

```java
Uri.Builder builder = new Uri.Builder();
builder.
  scheme("https").
  authority("api.onedrive.com").
  appendPath("v1.0").
  appendPath("drive").
  appendPath("root:").
  appendPath("Documents").
  appendPath("My Files").
  appendPath("#nine.docx");
String url = builder.build().toString();
```

### JavaScript

Use `escape()` in JavaScript to properly encode a path component.

```javascript
var root = "https://api.onedrive.com/v1.0/drive/root:";
var path = "/Documents/My Files/#nine.docx";
var url = root + escape(path);
```

### Examples

Here is an example of a OneDrive user (Ryan) with the following folder hierarchy:
```
OneDrive
	\Ryan's Files
		\doc (1).docx
    \estimate%s.docx
	\Break#Out
		\saved_game[1].bin
```

To address each of Ryan's files, you use percent encoding, as follows:

| Path                     | Encoded URL for path                      |
|:-------------------------|:------------------------------------------|
| `\Ryan's Files`          | `/root:/Ryan's%20Files`                   |
| `\...\doc (1).docx`      | `/root:/Ryan's%20Files/doc%20(1).docx`    |
| `\...\estimate%.docx`    | `/root:/Ryan's%20Files/estimate%25s.docx` |
| `\Break#Out`             | `/root:/Break%23Out`                      |
| `\...\saved_game[1].bin` | `/root:/Break%23Out/saved_game[1].bin`    |


<!-- {
  "type": "#page.annotation",
  "description": "Information on path name encoding and restrictions on characters for file and folder names in OneDrive API.",
  "keywords": "constructing urls, path encoding, restrictions, file name limits",
  "section": "documentation",
  "tocPath": "Misc/Filename Encoding"
} -->
