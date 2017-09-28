---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
title: Error - OneDrive API
---
# Error resource

The error resource is returned whenever an error occurs in the processing
of a request.

Error responses follow the definition in the
[OData v4](http://docs.oasis-open.org/odata/odata-json-format/v4.0/os/odata-json-format-v4.0-os.html#_Toc372793091)
specification for error responses.

See the topic on [Error response](../concepts/errors.md) for more information about
handling errors with the OneDrive API.

## JSON Representation

The error resource is composed of these resources:

<!-- { "blockType": "resource", "@odata.type": "microsoft.graph.error" } -->
```json
{
  "error": { "@odata.type": "odata.error" }  
}
```

#### odata.error resource type

Inside the error response is an error resource that includes the following
properties:

<!-- { "blockType": "resource", "@odata.type": "odata.error", "optionalProperties": [ "target", "details", "innererror"] } -->
```json
{
  "code": "string",
  "message": "string",
  "innererror": { "@odata.type": "odata.error" }
}
```

| Property name  | Value                  | Description\                                                                                               |
|:---------------|:-----------------------|:-----------------------------------------------------------------------------------------------------------|
| **code**       | string                 | An error code string for the error that occurred                                                            |
| **message**    | string                 | A developer ready message about the error that occurred. This should not be displayed to the user directly. |
| **innererror** | error object           | Optional. Additional error objects that may be more specific than the top level error.                     |


<!-- {
  "type": "#page.annotation",
  "description": "OneDrive API error resource definition.",
  "keywords": "onedrive,api,error,resource",
  "section": "documentation",
  "tocPath": "Resources/Error"
} -->
