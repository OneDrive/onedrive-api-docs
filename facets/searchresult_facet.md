# SearchResultFacet facet
The SearchResultFacet facet groups search result metadata into a single structure.
It is available on the **searchResult** property of [Item][item-resource] resources that
are part of a search result.

### Sample JSON representation

<!-- { "blockType": "resource", "@odata.type": "oneDrive.searchResult" } -->
```json
{
  "onClickTelemetryUrl": "string"
}
```

## Properties

| Property name         | Type     | Description                                                                                                                             |
|:----------------------|:---------|:----------------------------------------------------------------------------------------------------------------------------------------|
| `onClickTelemetryUrl` | `string` | A callback URL that is used to record telemetry information. The application should issue a GET on this URL if the user interacts with this item. |

[item-resource]: ../resources/item.md

<!-- {
  "type": "#page.annotation",
  "description": "The search result facet indicates an item is from a search.",
  "keywords": "search result facet",
  "section": "documentation",
  "tocPath": "Facets/Search result"
} -->
