# Microsoft Graph reports API overview

Usage reports in the Microsoft 365 admin center enable admins to understand their company's usage across Office 365 services. You can use the reports API in Microsoft Graph to integrate with Office 365 usage reports.

## Why use the reports API?

### Integrate Office 365 usage reporting into your organization's existing reporting solution
Many companies have existing reporting solutions that use a reporting application or web portal. You can use the reports API to incorporate Office 365 usage data into your organization's existing reporting solution so that all IT service reports are in a unified location.  

### Retain usage reports for historical analysis
You can use the reports API to get the data that's available in all usage reports, including organization-level summaries per service, entity-level (user, sites, accounts) usage information for the last 7/30/90/180 days, and daily activity aggregates. This gives you the option to keep historical usage information for as long as required.

## What data can I access by using the reports API?

You can use the reports API to access the data sets listed in the following table.

|Office 365 app|Data set|
|:--------|:--------|
|Microsoft Teams|[Device usage](../resources/microsoft_teams_device_usage_reports.md)<br/>|[User activity](../resources/microsoft_teams_user_activity_reports.md)|
|Office 365 (general) |[Activiations](../resources/office_365_activations_reports.md)<br/>[Active users](../resources/office_365_active_users_reports.md)<br/>[Groups activity](../resources/office_365_groups_activity_reports.md)|
|OneDrive |[Activity](../resources/onedrive_activity_reports.md)<br/>[Usage](../resources/onedrive_usage_reports.md)|
|Outlook|[Activity](../resources/email_activity_reports.md)<br/>[App usage](../resources/email_app_usage_reports.md)<br/>[Mailbox usage](../resources/mailbox_usage_reports.md)|
|SharePoint |[Activity](../resources/sharepoint_activity_reports.md)<br/>[Site usage](../resources/sharepoint_site_usage_reports.md)|
|Skype for Business |[Activity](../resources/skype_for_business_activity_reports.md)<br/>[Device usage](../resources/skype_for_business_device_usage_reports.md)<br/>[Device usage](../resources/skype_for_business_device_usage_reports.md)<br/>[Participant activity](../resources/skype_for_business_participant_activity_reports.md)<br/>[Peer to peer activity](../resources/skype_for_business_peer_to_peer_activity.md)|
|Yammer |[Activity](../resources/yammer_activity_reports.md)<br/>[Device usage](../resources/yammer_device_usage_reports.md)<br/>[Groups activity](../resources/yammer_groups_activity_reports.md)|

## Next steps

* Explore the APIs in the [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer).
* Learn more about how to [use the reports REST API](../resources/report.md).
