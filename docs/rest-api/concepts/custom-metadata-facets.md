---
author: rgregg
ms.author: dspektor
ms.date: 09/10/2017
ms.topic: conceptual
title: Add custom metadata to items - OneDrive API
---
# Custom facets (preview)

Custom facets provide a way for you to store your own metadata on items.
This can be used to keep track of custom state alongside an item, hold a link
to a related item in another system, and various other things. Just like
[OneDrive's own facets](../resources/index.md#facets), custom facets follow a schema
so that you can be sure the data stays consistent and valid, even when used
with multiple apps.

**Note:** Custom facets are in preview and only available for
OneDrive Personal at this time.

## Reading from custom facets

To view custom facets on an item, you need to list the facet names explicitly
in the [`select` query parameter](../concepts/optional-query-parameters.md).
While custom facets appear alongside regular ones, they aren't returned unless
included in the `select` statement.

### Example

```http
GET /drive/items/{item-id}?select=id,name,image,contoso_oilChange
```

### Response

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
 "id": "beefbeef!123",
 "name": "atom.jpg",
 "image": {
     "height": 1200,
     "width": 1600
 },
 "contoso_oilChange": {
     "lastOilChangeDateTime": "2014-07-06T18:05:33.79Z",
     "lastOilChangeMileage": 6785.3,
     "brand": "fabrikam",
     "viscosity": "5w-30"
 }
}
```

## Writing to custom facets

Custom facets can be provided just like regular ones on
[create](../api/driveitem_post_children.md) or [update](../api/driveitem_update.md) calls.
You may provide both custom facets and regular ones in the same call.

### Example

```http
PATCH /drive/items/{item-id}
Content-Type: application/json

{
   "contoso_oilChange": {
     "lastOilChangeDateTime": "2015-08-01T20:17:12.86Z",
     "lastOilChangeMileage": 9523.9
   }
 }
```

### Response

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "12345",
  "name": "foo",
  "image": {
    "height": 1080,
    "width": 1920
  },
  "contoso_oilChange": {
    "lastOilChangeDateTime": "2015-08-01T20:17:12.86Z",
    "lastOilChangeMileage": 9523.9
  }
}
```

## Schema registration

Before a new custom facet can be used, you need to define its schema and
register it with OneDrive. To register your custom facet, contact
[OneDrive Facet Registration](mailto:odwhr@microsoft.com?subject=CustomFacet%20registration&body=client_id%)
and provide your **client_id** and schema definition JSON.

Below is an example schema definition.

```json
{
    "name": "contoso_oilChange",
    "description": "Stores info about the last oil change for a vehicle",
    "properties": [
        {
            "name": "lastOilChangeDateTime",
            "type": "datetime",
            "nullable": "false"
        },
        {
            "name": "lastOilChangeMileage",
            "type": "double",
            "min": "0",
            "max": "999999999",
            "nullable": "false"
        },
        {
            "name": "brand",
            "type": "string",
            "max": "24",
            "nullable": "true"
        },
        {
            "name": "viscosity",
            "type": "string",
            "nullable": "true"
        }
    ]
}
```

## Schema definition

Field                   |Description
------------------------|-----------
Name                    | The schema name, of the form `{appDomain}_{schemaName}`. If you own `{appDomain}.com`, you can just use {appDomain}. Otherwise, you must use your reverse DNS name, with underscores replacing the dots (ie. if your domain is 'treyresearch.net', you would use 'net_treyresearch').
Description             | A human-readable description of the schema. For documentation purposes. Does not appear on the item.
Properties              | The definitions of the properties in this schema. See table below.

## Property definition

Field      | Description
-----------|-------------
Name       | The name of the property, as it appears in the data. Must be lowerCamelCased and contain only the characters a-z and 0-9.
Type       | The data type. Currently OneDrive only supports `string`, `datetime`, and `double`.
Min        | If specified, the minimum allowed value. For strings, this is length.
Max        | If specified, the maximum allowed value. For strings, this is length. Strings must be under 256 characters.
Nullable   | If true, the value is optional.
Indexed    | If true, OneDrive will allow you to query, sort, and filter based on this property's value.

## Updating an existing schema definition
You can update a schema definition, but only in ways that can't break old apps:

- Existing properties can't be removed
- All new properties must be `nullable`
- All existing properties must have same values as before for `type`, `min`, `max`, `nullable`, and `indexed`.

<!-- {
  "type": "#page.annotation",
  "description": "Use custom facets to store your own metadata on items.",
  "keywords": "metadata,custom,schema,extension,extensibility,facet,facets,onedrive",
  "section": "documentation",
  "tocPath": "Concepts/Custom metadata"
} -->
