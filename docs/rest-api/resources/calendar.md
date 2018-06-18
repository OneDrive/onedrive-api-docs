# calendar resource type

A calendar which is a container for events. It can be a calendar for a [user](user.md), or the default calendar of an Office 365 [group](group.md).

> **Note:** There are a few minor differences in the way you can interact with user calendars and group calendars:

 - You can organize only user calendars in a [calendarGroup](calendargroup.md).
 - Outlook automatically accepts all meeting requests on behalf of groups. You can [accept](../api/event_accept.md), [tentatively accept](../api/event_tentativelyaccept.md), or [decline](../api/event_decline.md)  meeting requests for user calendars only.
  - Outlook doesn't support reminders for group events. You can [snooze](../api/event_snoozereminder.md) or [dismiss](../api/event_dismissreminder.md) a [reminder](reminder.md) for user calendars only.

## Methods

| Method       | Return Type  |Description|
|:---------------|:--------|:----------|
|[List calendars](../api/user_list_calendars.md)|[calendar](calendar.md) collection|Get all the user's calendars, or the calendars in the default or other specific calendar group.|
|[Create calendar](../api/user_post_calendars.md) |[calendar](calendar.md)| Create a new calendar in the default calendar group or specified calendar group for a user.|
|[Get calendar](../api/calendar_get.md) | [calendar](calendar.md) |Get the properties and relationships of a **calendar** object. The calendar can be one for a user, or the default calendar of an Office 365 group. |
|[Update](../api/calendar_update.md) | [calendar](calendar.md)  |Update the properties of a **calendar** object. The calendar can be one for a user, or the default calendar of an Office 365 group. |
|[Delete](../api/calendar_delete.md) | None |Delete calendar object. |
|[List calendarView](../api/calendar_list_calendarview.md) |[event](event.md) collection| Get the occurrences, exceptions, and single instances of events in a calendar view defined by a time range, from the user's primary calendar `(../me/calendarview)` or from a specified calendar.|
|[List events](../api/calendar_list_events.md) |[event](event.md) collection| Retrieve a list of events in a calendar.  The list contains single instance meetings and series masters.|
|[Create Event](../api/calendar_post_events.md) |[event](event.md)| Create a new Event in the default or specified calendar.|
|[Create single-value extended property](../api/singlevaluelegacyextendedproperty_post_singlevalueextendedproperties.md) |[calendar](calendar.md)  |Create one or more single-value extended properties in a new or existing calendar.   |
|[Get calendar with single-value extended property](../api/singlevaluelegacyextendedproperty_get.md)  | [calendar](calendar.md) | Get calendars that contain a single-value extended property by using `$expand` or `$filter`. |
|[Create multi-value extended property](../api/multivaluelegacyextendedproperty_post_multivalueextendedproperties.md) | [calendar](calendar.md) | Create one or more multi-value extended properties in a new or existing calendar.  |
|[Get calendar with multi-value extended property](../api/multivaluelegacyextendedproperty_get.md)  | [calendar](calendar.md) | Get a calendar that contains a multi-value extended property by using `$expand`. |

## Properties
| Property	   | Type	|Description|
|:---------------|:--------|:----------|
|canEdit |Boolean |True if the user can write to the calendar, false otherwise. This property is true for the user who created the calendar. This property is also true for a user who has been shared a calendar and granted write access. |
|canShare |Boolean |True if the user has the permission to share the calendar, false otherwise. Only the user who created the calendar can share it. |
|canViewPrivateItems |Boolean |True if the user can read calendar items that have been marked private, false otherwise. |
|changeKey|String|Identifies the version of the calendar object. Every time the calendar is changed, changeKey changes as well. This allows Exchange to apply changes to the correct version of the object. Read-only.|
|color|calendarColor|Specifies the color theme to distinguish the calendar from other calendars in a UI. The property values are: LightBlue=0, LightGreen=1, LightOrange=2, LightGray=3, LightYellow=4, LightTeal=5, LightPink=6, LightBrown=7, LightRed=8, MaxColor=9, Auto=-1|
|id|String|The group's unique identifier. Read-only.|
|name|String|The calendar name.|
|owner |[emailAddress](emailaddress.md) | If set, this represents the user who created or added the calendar. For a calendar that the user created or added, the **owner** property is set to the user. For a calendar shared with the user, the **owner** property is set to the person who shared that calendar with the user. |

### calendarColor values
| Member     | Value
|:-----------|:----------
| auto       | -1
| lightBlue  | 0
| lightGreen | 1
| lightOrange| 2
| lightGray  | 3
| lightYellow| 4
| lightTeal  | 5
| lightPink  | 6
| lightBrown | 7
| lightRed   | 8
| maxColor   | 9

## Relationships
| Relationship | Type	|Description|
|:---------------|:--------|:----------|
|calendarView|[Event](event.md) collection|The calendar view for the calendar. Navigation property. Read-only.|
|events|[Event](event.md) collection|The events in the calendar. Navigation property. Read-only.|
|multiValueExtendedProperties|[multiValueLegacyExtendedProperty](multivaluelegacyextendedproperty.md) collection| The collection of multi-value extended properties defined for the calendar. Read-only. Nullable.|
|singleValueExtendedProperties|[singleValueLegacyExtendedProperty](singlevaluelegacyextendedproperty.md) collection| The collection of single-value extended properties defined for the calendar. Read-only. Nullable.|

## JSON representation

Here is a JSON representation of the resource

<!--{
  "blockType": "resource",
  "optionalProperties": [
    "calendarView",
    "events",
    "multiValueExtendedProperties",
    "singleValueExtendedProperties"
  ],
  "keyProperty": "id",
  "baseType": "microsoft.graph.entity",
  "@odata.type": "microsoft.graph.calendar",
  "@odata.annotations": [
    {
      "property": "calendarView",
      "capabilities": {
        "changeTracking": true,
        "deletable": false,
        "expandable": false,
        "insertable": false,
        "navigability": "single",
        "searchable": false,
        "updatable": false
      }
    },
    {
      "property": "events",
      "capabilities": {
        "changeTracking": false,
        "expandable": false,
        "navigability": "single",
        "searchable": false
      }
    }
  ]
}-->

```json
{
  "canEdit": "boolean",
  "canShare": "boolean",
  "canViewPrivateItems": "boolean",
  "changeKey": "string",
  "color": "String",
  "id": "string (identifier)",
  "name": "string",
  "owner": {"@odata.type": "microsoft.graph.emailAddress"}
}

```
<!-- uuid: 8fcb5dbc-d5aa-4681-8e31-b001d5168d79
2015-10-25 14:57:30 UTC -->
<!-- {
  "type": "#page.annotation",
  "description": "calendar resource",
  "keywords": "",
  "section": "documentation",
  "tocPath": ""
}-->