# Connect to files in OneDrive and SharePoint

[![Documentation validation and build status](https://ci.appveyor.com/api/projects/status/jummmj5gb9q28lfr?svg=true)](#continuous-documentation-validation)

The OneDrive developer platform provides services and tools to connect your application to files across Office 365, including:

* **OneDrive personal**
* **OneDrive for Business**
* **SharePoint Online**
* **SharePoint Server 2016**

The OneDrive developer platform allows your solution to work with files across the Office 365 ecosystem and write the same code to enable solutions for consumers to enterprise customers.
OneDrive APIs are a part of the [Microsoft Graph](https://graph.microsoft.com), a common API for Microsoft services.

Our platform consists of several components, designed to build on one another to making building apps and solutions easy.

* [OneDrive file pickers](sdks.md), which enable your app to open and save from OneDrive using the native OneDrive user experience and minimal code.
* [Microsoft Graph SDKs](https://graph.microsoft.io/code-samples-and-sdks), a set of client libraries which make accessing files from the Microsoft Graph straightforward.
* [Microsoft Graph APIs](https://graph.microsoft.io/docs), a collection of REST APIs your app can call directly instead of using an SDK.

For existing solutions using OneDrive API outside of Microsoft Graph, or solutions targeting SharePoint Server 2016, see [direct endpoint differences](direct-endpoint-differences.md) for more context on reading this documentation.

## Getting started

To quickly experiment with Microsoft Graph and accessing files, check out the [Graph Explorer](https://graph.microsoft.io/en-us/graph-explorer?request=me%2Fdrive%2Froot%2Fchildren&method=GET&version=v1.0) and the [Microsoft Graph Quick Start](https://graph.microsoft.io/getting-started).

OneDrive provides two top-level types that represent addressible resources in the API:

* [drive][drive-resource] _(top-level object)_
* [driveItem][item-resource] _(files and folders)_

The following is an example of a **driveItem** resource.

<!-- {"blockType": "example", "@odata.type": "oneDrive.item", "truncated": true, "name": "item-example"} -->
```json
{
  "@microsoft.graph.downloadUrl":"http://public-sn3302.files.1drv.com/y2pcT7OaUEExF7EHOl",
  "createdDateTime": "2014-10-31T03:37:04.72Z",
  "eTag": "aRDQ2NDhGMDZDOTFEOUQzRCE1NDkyNy4w",
  "id":"D4648F06C91D9D3D!54927",
  "lastModifiedBy": {
    "user": {
      "displayName": "daron spektor",
      "id": "d4648f06c91d9d3d"
    }
  },
  "name":"BritishShorthair.docx",
  "size":35212,
  "file": {
    "hashes":{
      "sha1Hash":"cf23df2207d99a74fbe169e3eba035e633b65d94"
    }
  }
}
```

Data about a resource is provided in three ways:

* _Properties_ (like **id** and **name**) expose simple values.
* _Facets_ (like **file** and **photo**) expose complex values. 
  The presence of facets on an item generally indicate behaviors or capabilities of an item and related properties.
* _References_ (like **children**) point to collections of other resources.

Many requests can be tailored to include additional data or remove unused properties from the responses.
OneDrive uses [optional query parameters](odata/optional-query-parameters.md) to enable this functionality.
Throughout the documentation, each request provides more context about which parameters are supported.

By default, most properties and facets are returned while all references are hidden.
For efficiency, we recommend that you specify _select_ and _expand_ for the data you care about.

For details about resources and facets, see [Resources](resources/resources.md) and [Facets](facets/facets.md).

### Microsoft Graph root resources

Within the Microsoft Graph, the OneDrive functionality is available from several root resources.
These resources correspond to where OneDrive and SharePoint document libraries are available within Office 365.
The follow entities in Microsoft Graph may contain one or more drives:

| Entity                   | Example Path                       |
| ------------------------ | ---------------------------------- |
| [User][graph-user]       | `/v1.0/users/{id}` or `/v1.0/me`   |
| [Group][graph-group]     | `/v1.0/groups/{id}`                |
| [Site][graph-site]       | `/beta/sharePoint/sites/{id}`      |

[graph-user]: https://graph.microsoft.io/en-us/docs/api-reference/v1.0/resources/users
[graph-group]: https://graph.microsoft.io/en-us/docs/api-reference/v1.0/resources/group
[graph-site]: https://graph.microsoft.io/en-us/docs/api-reference/beta/resources/sharepoint

### OneDrive root resources

When addressing a Microsoft Graph root resource, your app can address OneDrive resources using the following paths:

| Path                                                      | Resource                                                                       |
| --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`/drive`](drives/default.md)                             | User's default [drive][drive-resource].                                        |
| [`/drives`](drives/list-drives.md)                        | List [drive][drive-resource] resources available to the authenticated user.    |
| [`/drives/{drive-id}`](drives/get.md)                     | Access a specific [drive][drive-resource] by its ID.                           |
| [`/drives/{drive-id}/root/children`](items/list.md)       | List items in the root of a specific [drive][drive-resource].                  |
| [`/drive/items/{item-id}`](items/get.md)                  | Access a [driveItem][item-resource] by its ID.                                 |
| [`/drive/special/{special-id}`](items/special_folders.md) | Access a [known folder](items/special_folders.md) by its known name.           |
| [`/shares/{share-id}`](shares/shares.md)                  | Access a [driveItem][item-resource] by its **shareId** or a sharing URL.       |


### Path-based addressing within a drive

A **driveItem** can be addressed by either a unique identifier or where that item exists in the drive's hierarchy (i.e. user path).
Within an API request, a colon can be used to shift between *API path space* and *user path space*.
This syntax is valid for any [driveItem](resources/item.md) addressed via the API space.

You can also transition back to *API path space* by using a colon at the end of the *file system path space*.
Ensure user data within the URL follows the [addressing and path encoding](misc/addressing.md) requirements.

| Path                                               | Resource                                                               |
| -------------------------------------------------- | ---------------------------------------------------------------------- |
| `/drive/root:/path/to/file`                        | Access a [driveItem][item-resource] by path under the root.               |
| `/drive/items/{item-id}:/path/to/file`             | Access a [driveItem][item-resource] by its path relative to another item. |
| `/drive/root:/path/to/folder:/children`            | List children when accessing by path relative to the drive root.       |
| `/drive/items/{item-id}:/path/to/folder:/children` | List children when accessing by path relative to another item.         |


### Shared folders and remote items

OneDrive personal allows a user to add one or more shared items from another drive to their OneDrive.
These shared items appear as a **driveItem** in the `children` collection with a [remoteItem facet](facets/remoteitem_facet.md).

In addition, scenarios where items are returned from outside the target drive will also include a **remoteItem** facet.
These items may also be returned from [search](items/search.md), [recent files](drives/recent_files.md), [shared with me](drives/shared_with_me.md).

For more information on working with shared folders and remote items, see [Remote items and shared folders](misc/working-with-links.md).

### Sharing and permissions

One of the most common actions for OneDrive and SharePoint is sharing items with other people.
OneDrive allows your app to create [sharing links](items/sharing_createLink.md), [add permissions, and send invitations](items/invite.md) to items stored in a drive.

OneDrive also provides a way for your app to [access shared content](shares/shares.md) directly from the sharing link.

For more details on how to share and consume shared content, see [Sharing items in OneDrive](items/sharing.md).

## Webhooks and notifications

[OneDrive supports sending webhook-style push notifications](webhooks/webhooks.md) when the contents of a OneDrive is changed.
Your app can use these notifications to track changes in near real-time instead of polling the server for changes.

## Programming notes

### API Compatibility
OneDrive will continue to evolve and gain additional functionality.
The API path includes a version number to protect your app against breaking changes.
When a breaking change is required, the API version number will be incremented.
Existing apps calling the original version number will remain unaffected by the change.
See the [Microsoft Graph support policy](https://graph.microsoft.io) for information about how long a version of the API is supported.

A breaking change is a change in the format of a request or response that removes or alters an existing _documented_ behavior or removes an element of a resource's definition.
It is not a breaking change to add additional actions, properties, facets, or references to a resource.

It is possible that the API will expose additional undocumented features from time to time.
These features should not be utilized until they are documented.
Do not assume that current behavior that deviates from the documentation will persist.

We will continue to make non-breaking changes to the existing version of the API, including adding facets, properties, and resources to the API.
As such, any code calling the API needs to:

* Be resilient to additional properties being added to JSON responses.
  Ignoring them is OK.
* Have no dependency on the order of properties returned in JSON responses.
* Use documented API paths, resources, properties, and enumerated values only.
  Non-documented values are not guaranteed to remain consistent.
* All URLs returned by OneDrive API should be treated as opaque URLs. 
  Your app should not make any assumptions about format or parameters in these URLs.
  They are subject to change without notice.

### Throttling
OneDrive has limits in place to make sure that individuals and apps do not adversely affect the experience of other users.
When an activity exceeds OneDrive's limits, API requests will be rejected for a period of time.
OneDrive may also return a *Retry-After* header with the number of seconds your app should wait before sending more requests.

```
HTTP/1.1 429 Too Many Requests  
Retry-After: 3600
```

### Working with OneNote Notebooks
**Note:** Although OneDrive stores OneNote notebooks, you shouldn't use the OneDrive API to work with OneNote notebooks.
Instead, use the [OneNote API](http://dev.onenote.com).

## Continuous documentation validation
As part of our commitment to high quality documentation, we've developed a process through which the samples and examples in our documentation are tested for validity as part of every check-in.
We call this continuous documentation validation.

Each time a change to our documentation is made, we validate that everything works as documented in the service.
When we create a new build of the service, we validate that the examples in our documentation also continue to work.
This helps us ensure that everything we document works and works as expected even as new updates are made available.

For the latest build details, check out the [AppVeyor build status page for our documentation repository](https://ci.appveyor.com/project/OneDrive/onedrive-api-docs).

## Related topics
The following topics contain high level overviews of other concepts that apply to the OneDrive API.

* [Authentication and sign in](auth/readme.md)
* [Addressing resources](misc/addressing.md)
* [Case sensitivity](misc/case-sensitivity.md)
* [Error responses](misc/errors.md)
* [HTTP verb tunneling](misc/verb-tunneling.md)
* [Terms of use](terms-of-use.md)

[drive-default]: drives/default.md
[drive-resource]: resources/drive.md
[item-resource]: resources/item.md
[drive-get]: drives/get.md
[item-changes]: items/view_delta.md
[item-search]: items/search.md
[item-children]: items/list.md
[permission-resource]: resources/permission.md
[item-get]: items/get.md

<!-- {
  "type": "#page.annotation",
  "description": "Getting started programming with the OneDrive REST API",
  "keywords": "getting started onedrive rest api programming C# ios android rest http",
  "section": "documentation",
  "tocPath": "Overview",
  "tocIndex": -100
} -->
