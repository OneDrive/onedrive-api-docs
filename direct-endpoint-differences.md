# OneDrive API Endpoint Differences

OneDrive API is available from several different API endpoints.
Microsoft Graph is the preferred endpoint for accessing OneDrive personal, OneDrive for Business, and SharePoint online files.
In some enterprise scenarios, like SharePoint Server 2016, it may be necessary to access OneDrive for Business and SharePoint data by using the direct API endpoint without using Microsoft Graph.
The following notes provide details about differences you may notice between Microsoft Graph and the direct API endpoint.

## Namespaces

### Methods
When using the direct endpoint, methods and actions require a namespace prefix.
For example, to use `sharedWithMe` on the direct endpoint, you must prefix the action name with `oneDrive.`.
Note, this prefix is case-sensative.

```http
https://{server}/_api/v2.0/drive/oneDrive.sharedWithMe
```

The following actions or methods must be prefixed on the direct endpoint:

* [Shared With Me](drives/shared_with_me.md)
* [Recent Files](drives/recent_files.md)
* [Copy](items/copy.md)
* [Invite](items/invite.md)
* [Search](items/search.md)
* [Create Sharing Link](items/sharing_createLink.md)
* [Create Upload Session](items/upload_large_files.md)
* [Delta](items/view_delta.md)

### Instance annotations
Properties on items returned with an at-sign (`@`) also include a namespace.
When using Microsoft Graph, the namespace is always `microsoft.graph`.
However, when accessing the direct API endpoint, the namespace is different.

#### On Item 
`@content.downloadUrl`
`@content.sourceUrl`

