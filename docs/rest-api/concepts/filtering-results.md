---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: conceptual
title: How to filter items - OneDrive API
---
# Filtering a collection

The `filter` query string parameter allows clients to filter a collection of
Items that are returned by a request. The expression specified with `filter`
is evaluated for each resource in the collection, and only Items where the
expression evaluates to true are included in the response. Items with
expressions that evaluates to false or null, or Items that reference properties
that are unavailable, are omitted from the response.

OneDrive API supports only the following subset of the official [OData 4.0 filter syntax grammar][odata-filter-grammar].

**Note:** Samples omit proper URL encoding for readability.
Actual filter syntax usage must be URL encoded.

_Example: return all Products whose Price is less than $10.00_

```http
GET /Products?filter=Price lt 10.00
```

The value of the `filter` option is a Boolean expression.

## Supported operators

OneDrive API supports the following set of operations in the `filter` syntax.

| Operator | Description           | Example                                                 |
|:---------|:----------------------|:--------------------------------------------------------|
| `eq`     | Equal                 | `city eq 'Redmond'`                                     |
| `ne`     | Not equal             | `city ne 'London'`                                      |
| `gt`     | Greater than          | `price gt 20`                                           |
| `ge`     | Greater than or equal | `price ge 10`                                           |
| `lt`     | Less than             | `price lt 20`                                           |
| `le`     | Less than or equal    | `price le 10`                                           |
| `and`    | Logical and           | `price le 200 and price gt 3.5`                         |
| `or`     | Logical or            | `price le 3.5 or price gt 200`                          |
| `( )`    | Precedence grouping   | `(priority eq 1 or city eq 'Redmond') and price gt 100` |

## Operator precedence

Operators for the `filter` syntax are evaluated in the following order, from
highest to lowest. Operators in the same group/category have equal precedence
and are evaluated from left-to-right.

| Group           | Operator | Description           |
|:----------------|:---------|:----------------------|
| Grouping        | `( )`    | Precedence grouping   |
| Relational      | `gt`     | Greater than          |
|                 | `ge`     | Greater than or equal |
|                 | `lt`     | Less than             |
|                 | `le`     | Less than or equal    |
| Equality        | `eq`     | Equal                 |
|                 | `ne`     | Not equal             |
| Conditional AND | `and`    | Logical and           |
| Conditional OR  | `or`     | Logical or            |

## Filterable properties

While the **filter** syntax can be used on any property of an item, we have
optimized certain properties to be fast and efficient to filter on.

**Note:** In OneDrive for Business, SharePoint Online and SharePoint Server 2016, filtering support only **name** and **url** properties.

* audio
* createdDateTime (for gt, ge, lt, le)
* deleted
* file
* folder
* image
* lastModifiedDateTime (for gt, ge, lt, le)
* video

Filtering on other properties which are not optimized can result in the following
behaviors:

* Higher API latency (longer return time for response)
* Empty pages (no items in the value collection but an **odata.nextLink**
  property for the next page)

### Example

Below is an example of filtering search results for only items that have a
**file** and **image** facet.

#### Request

<!-- { "blockType": "request", "name": "filtering-image-file", "scopes": "files.read", "tags": "service.onedrive", "target": "action" } -->

```
GET /drive/root/search(q='vacation')?filter=image%20ne%20null%20and%20file%20ne%20null
```

#### Response

<!-- { "blockType": "response", "@odata.type": "microsoft.graph.driveItem", "isCollection": true, "truncated": true } -->

```http
HTTP/1.1 200 OK
Content-type: application/json

{
    "value": [
      {
        "id": "0123456789abc!123",
        "name": "Vacation.jpg",
        "image": { },
        "file": { },
        "searchResult":
        {
          "onClickTelemetryUrl": "https://bing.com/0123456789abc!123"
        }
      },
      {
        "id": "0123456789abc!456",
        "name": "Summer.jpg",
        "image": { },
        "file": { },
        "searchResult":
        {
          "onClickTelemetryUrl": "https://bing.com/0123456789abc!456"
        }
      }
    ],
    "@search.approximateCount": 12,
    "@odata.nextLink": "https://api.onedrive.com/drive/root/search?query=vacation&skipToken=1asdlnjnkj1nalkm!asd"
}
```

[odata-filter-grammar]: http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398301

<!-- {
  "type": "#page.annotation",
  "description": "Filter the results of a collection based on values for properties of items returned.",
  "keywords": "search,filter,restrict,limit,query,items,files",
  "section": "documentation",
  "suppressions": [
    "Error: search(q={var}):
      Couldn't find definition for parameter q={var} in search(q={var}) after looking in /docs/rest-api/concepts/filtering-results.md"
  ],
  "tocPath": "Items/Filter"
} -->
