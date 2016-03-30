# Accessing Shared Content

Access a shared item or a collection of shared items by using a **sharingToken** or
sharing URL.

Using the **shares API** allows you to access content shared with the signed in user
or shared using an authenticated sharing URL.

**Note:** The **shares API** is not available for SharePoint or OneDrive for Business.

## HTTP Request

<!-- { "blockType": "request", "name": "get-shared-root", "scopes": "service.onedrive" } -->
```http
GET /shares/{sharingTokenOrUrl}
```
### Path Parameters

| Parameter Name        | Value    | Description                                                                         |
|:----------------------|:---------|:------------------------------------------------------------------------------------|
| **sharingTokenOrUrl** | `string` | Required. A sharing token as returned by the API or a properly encoded sharing URL. |


### Encoding sharing URLs
To encode a sharing URL, use the following logic:

1. First, use base64 encode the URL.
2. Convert the base64 encoded result to [unpadded base64url format](https://en.wikipedia.org/wiki/Base64) by removing `=` characters
   from the end of the value, replacing `/` with `_` and `+` with `-`.)
3. Append `u!` to be beginning of the string.

As an example, to encode a URL in C#:

```csharp
string sharingUrl = "https://onedrive.live.com/redir?resid=1231244193912!12&authKey=1201919!12921!1";
string base64Value = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(sharingUrl));
string encodedUrl = "u!" + base64Value.TrimEnd('=').Replace('/','_').Replace('+','-');
```

#### Request Body
Do not supply a request body with this method.

## HTTP Response

This method returns an [Share resource](../resources/shareRoot.md) for the root of
the shared item(s). The items that are shared can be accessed using the `root`
relationship of the Share resource.

<!-- { "blockType": "response", "truncated": true, "@odata.type": "oneDrive.share" } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "123139199abc",
  "name": "shared-item.docx",
  "owner": {
    "user": {
      "id": "123001a",
      "displayName": "Daron Spektor"
    }
  }
}
```

### Remarks

The **share** resource behaves similar to the **drive** resource. You can access
items within the share by using the **items** or **root** relationship, just like
with a **drive**.

If only a single item is shared, instead of a collection of items, attempting to
get the children of the **root** relationship will fail.

## Example

This example shows how to use a sharing URL to retrieve the items that have been
shared.

<!-- { "blockType": "request", "name": "get-shared-item", "scopes": "service.onedrive"} -->
```http
GET /shares/{sharingTokenOrUrl}/root?expand=children
```

This request asks for the root item that was shared, which can either be the
shared item (when a single item has been shared) or a collection of items. By
including the `?expand=children` parameter, the result will return information
from a single call that will be useful for either single or multiple shared items.

<!-- { "blockType": "response",
       "@odata.type": "oneDrive.item", "truncated": true } -->
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "191911111!11123",
  "name": "OfficeProjectPlanning.docx",
  "createdBy": { "user": { "id": "123001a", "displayName": "Daron Spektor" } },
  "size": 11412,
  "file": { }
}
```

##### Error Responses

Read the [Error Responses][error-response] topic for more information about
how errors are returned.

## Remarks

* This API is not available for OneDrive for Business or SharePoint.

[error-response]: ../misc/errors.md

<!-- {
  "type": "#page.annotation",
  "description": "Access the contents of a sharing link with the OneDrive API.",
  "keywords": "shares,shared,sharing,share link, sharing link, share id, share token",
  "section": "documentation",
  "tocPath": "Sharing/Use a link"
} -->
