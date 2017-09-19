---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Convert to other formats - OneDrive API
---
# Download a file in another format

Use this API to retrieve the contents of an item in a specific format.
Not all files can be converted into all formats.

To download the item in it's original format, see [download an item's contents](driveitem_get_content.md).

## Prerequisites

To call this API, the user must have granted the application read access to the file the app wishes to convert.

## HTTP request

<!-- { "blockType": "ignored" } -->

```http
GET /drive/items/{item-id}/content?format={format}
GET /drive/root:/{path and filename}:/content?format={format}
```

### Optional request headers

| Name            | Value   | Description                                                                                                                                              |
|:----------------|:--------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
| _if-none-match_ | String  | If this request header is included and the eTag (or cTag) provided matches the current tag on the file, an `HTTP 304 Not Modified` response is returned. |


### Query string parameters

| Name      | Value  | Description                                                    |
|:----------|:-------|:---------------------------------------------------------------|
| _format_  | string | Specify the format the item's content should be downloaded as. |


The following values are valid for the **convert** parameter:

| Value   | Description                        | Supported source extensions |
|:--------|:-----------------------------------|-----------------------------|
| **pdf** | Converts the item into PDF format. | csv, doc, docx, odp, ods, odt, pot, potm, potx, pps, ppsx, ppsxm, ppt, pptm, pptx, rtf, xls, xlsx | 

### Example

<!-- { "blockType": "request", "name": "convert-item-content", "scopes": "files.read" } -->

```http
GET /drive/items/{item-id}/content?format={format}
```

## Response

Returns a `302 Found` response redirecting to a pre-authenticated download URL for the converted file.

To download the converted file, your app must follow the `Location` header in the response.

Pre-authenticated URLs are only valid for a short period of time (a few minutes) and do not require an `Authorization` header to access.

<!-- { "blockType": "response", "@odata.type": "stream" } -->

```http
HTTP/1.1 302 Found
Location: https://b0mpua-by3301.files.1drv.com/y23vmagahszhxzlcvhasdhasghasodfi
```

### Error responses

See [Error Responses][error-response] for more info about how errors are returned.

[error-response]: ../concepts/errors.md
[file-facet]: ../resources/file.md

<!-- {
  "type": "#page.annotation",
  "description": "Convert the contents of an item in OneDrive to a different format.",
  "keywords": "convert,pdf,convert to pdf",
  "section": "documentation",
  "tocPath": "Items/Download formats"
} -->
