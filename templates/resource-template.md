# {type} resource

{description}

## Tasks on {type} resources

The following tasks are available for {type} resources.

| Common task                                             | HTTP method                   |
|:--------------------------------------------------------|:------------------------------|
| [Method name](resource-template.md)                     | `GET /drive`                  |

## JSON representation

Here is a JSON representation of a {type} resource.

<!-- { "blockType": "resource", "@type": "oneDrive.typeTemplate",
       "keyProperty": "id", "optionalProperties": [ ] } -->

```json
{
  "id": "string",
  "complexType": { "@type": "oneDrive.typeTemplate" },
}
```

## Properties

The {type} resource has these properties.

| Property name   | Type                                | Description                                   |
|:----------------|:------------------------------------|:----------------------------------------------|
| **id**          | string                              | The unique identifier for {type}.             |
| **complexType** | [ComplexType](resource-template.md) | Complex type property with useful properties. |

## Relationships

The following table defines the relationships that the Drive resource has to other resources.

| Relationship name | Type                  | Description                                                             |
|:------------------|:----------------------|:------------------------------------------------------------------------|
| **items**         | Collection(driveItem) | All items contained in the drive. This collection cannot be enumerated. |

<!--
 {
  "type": "#page.annotation",
  "description": "Page description for SEO",
  "keywords": "Keywords for SEO",
  "section": "templates",
  "tocPath": "Path/In/TOC"
} -->
