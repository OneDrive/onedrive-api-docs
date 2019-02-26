---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Convert to other formats - OneDrive API
localization_priority: Priority
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


#### Format options

| Value | Description                        | Supported source extensions
|:------|:-----------------------------------|---------------------------------
| glb   | Converts the item into GLB format  | cool, fbx, obj, ply, stl, 3mf
| html  | Converts the item into HTML format | eml, md, msg
| jpg   | Converts the item into JPG format  | 3g2, 3gp, 3gp2, 3gpp, 3mf, ai, arw, asf, avi, bas, bash, bat, bmp, c, cbl, cmd, cool, cpp, cr2, crw, cs, css, csv, cur, dcm, dcm30, dic, dicm, dicom, dng, doc, docx, dwg, eml, epi, eps, epsf, epsi, epub, erf, fbx, fppx, gif, glb, h, hcp, heic, heif, htm, html, ico, icon, java, jfif, jpeg, jpg, js, json, key, log, m2ts, m4a, m4v, markdown, md, mef, mov, movie, mp3, mp4, mp4v, mrw, msg, mts, nef, nrw, numbers, obj, odp, odt, ogg, orf, pages, pano, pdf, pef, php, pict, pl, ply, png, pot, potm, potx, pps, ppsx, ppsxm, ppt, pptm, pptx, ps, ps1, psb, psd, py, raw, rb, rtf, rw1, rw2, sh, sketch, sql, sr2, stl, tif, tiff, ts, txt, vb, webm, wma, wmv, xaml, xbm, xcf, xd, xml, xpm, yaml, yml
| pdf   | Converts the item into PDF format  | doc, docx, epub, eml, htm, html, md, msg, odp, ods, odt, pps, ppsx, ppt, pptx, rtf, tif, tiff, xls, xlsm, xlsx
 
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
