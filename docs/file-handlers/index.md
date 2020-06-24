---
author: rgregg
ms.author: rgregg
ms.date: 09/10/2017
ms.topic: overview
title: Integrate with OneDrive file handlers
localization_priority: Priority
---
# Adding custom preview, open, and actions to files with File Handlers 2.0

File handlers are a type of Office add-in that integrate custom file types into Office 365 the same way that Office file types are.

With file handlers, you can enable the following user experiences in OneDrive for Business and SharePoint document libraries:

* Customized file icons (for proprietary file extensions)
* Create new files in the browser (for proprietary file extensions)
* File preview (for proprietary file extensions)
* Rich view/edit capability (all file extensions)
* [Custom actions that launch into your app](define-actions.md) (all file extensions)
* Support multiple selection and acting on folders (custom actions only)

Check out the [Markdown File Handler example project][markdown-file-handler] for more specifics.


## What's changed with file handlers 2.0

The 2.0 upgrade to file handlers enables additional scenarios for SharePoint Online and OneDrive for Business.

* Use Microsoft Graph API for more robust access to files, including file metadata, permissions, and sharing.
* Add custom action buttons that launch your file handler add-in, with custom text and icons.

## What's in a file handler

A file handler is comprised of the following components:

* [File handler endpoint.](#file-handler-endpoint) A provider-hosted app that enables the experience of your file handler.
  This end point can optionally provide an experience for creating, previewing, and editing files that are registered with your file handler.
* [File handler manifest.](#file-handler-manifest) A set of metadata that defines the interaction between Office 365 and your file handler endpoint.
* Application registered in Azure Active Directory. This application is used to authorize your access to selected files via Microsoft Graph, and is where the file handler manifest is registered.

### File handler endpoint

The file handler endpoint is a cloud-hosted app that contains the functional logic for creating, previewing, opening, and saving files of the type that it handles.
It can be hosted on any stack, including non-Microsoft stacks.
File handlers uses Azure Active Directory to gain authorized access to Office 365 resources, so your application needs to be registered with Azure AD.
For more information about registering an application with Azure AD, see [Registering your app for Microsoft Graph](../rest-api/getting-started/app-registration.md).

For a complete example of a file handler, see the [Markdown-FileHandler on GitHub][markdown-file-handler].

### File handler manifest

The manifest defines the interaction between Office 365 and the file handler endpoint.
The manifest is registered with Azure Active Directory, using the **addIns** collection for an application object in the directory.
To register or update the registration for your file handler manifest, see [How to: Register a file handler manually](register-manually.md).

An example file handler manifest:

<!-- { "blockType": "resource", "@type": "oneDriveAddins.fileHandlerManifest" } -->

```json
{
    "id": "guid",
    "type": "FileHandler",
    "properties": [
        { "key": "version", "value": "2" },
        { "key": "appIcon", "value": "{\"svg\":\"https://example.org/icon.svg\",\"png1x\":\"https://example.org/icon@1x.png\",\"png1.5x\":\"https://example.org/icon@1.5x.png\",\"png2x\":\"https://example.org/icon@2x.png\"}" },
        { "key": "fileTypeDisplayName", "value": "Contoso Document File" },
        { "key": "fileTypeIcon", "value": "{\"svg\":\"https://example.org/icon.svg\",\"png1x\":\"https://example.org/icon@1x.png\",\"png1.5x\":\"https://example.org/icon@1.5x.png\",\"png2x\":\"https://example.org/icon@2x.png\"}" },
        { "key": "actionMenuDisplayName", "value": "Contoso Actions" },
        { "key": "actions", "value": "json" }
    ]
}
```

Each file handler manifest includes the following key-value pairs as part of the `properties` array:

| Property Name           | Type                 | Description                                                                                                                                           |
| ----------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **version**             | String               | Specify the version of the file handler. This value must be set to `2`. Required for file handlers 2.0.                                               |
| **appIcon**             | String, encoded JSON | A collection of icon URLs in different formats that are used to represent the file handler application. Optional. |
| **fileTypeDisplayName** | String               | The default locale description for the file type. Optional.                                                                                           |
| **fileTypeIcon**        | String, encoded JSON | A collection of icon URLs in different formats that are used to represent file types handled by this file handler. Optional. |
| **actionMenuDisplayName** | String             | Optional. A display string in the default locale that is used when the actions associated with this file handler are collapsed into a menu. |
| **actions**             | String, encoded JSON | A collection of actions implemented by this file handler extension. See [specifying actions](define-actions.md) for more information. Required. |

#### File handlers at runtime

The file handler add-in is invoked via the endpoint URL specified in the file handler manifest for the invoked action.
To understand what happens, let's take a look at the scenario where a user clicks to preview a file.
If there is a registered file handler for that file type, Office 365 invokes the file handler app by making a **POST** request to the URL specified for the **preview** action.
In the body of the POST request, Office 365 will include the [activation parameters](#activation-parameters) that specify the file that was selected.
The other actions, including **newFile**, **open**, and **custom** are invoked the same way.

#### Activation parameters

In the previous scenarios, your file handler app requires details, called activation parameters, about the file, tenant, Office 365 client, etc., to work with the selected file.
Office 365 includes these details as form data sent in the **POST** request to the file handler endpoint associated with the user's action.
These parameters are included in the request with the MIME type `application/x-www-form-urlencoded` and are URL encoded in the body of the request.

The following parameters are provided in the **activation parameters**:

| Parameter Name  | Type                           | Description                                                                                                 |
| --------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **cultureName** | string                         | The locale identifier for the user's current display language.                                              |
| **client**      | string                         | The Office 365 application from which the file handler was invoked; for example "SharePoint" or "OneDrive". |
| **userId**      | string                         | The UPN/login email for the user who invoked the file handler.                                            |
| **domainHint**  | string                         | A domain hint string that indicates either `organizations` or `consumers`.                                  |
| **items**       | JSON string collection of URLs | A collection of Microsoft Graph URLs to the selected item(s).                                               |

These values are encoded in the **POST** request as form values.

Here is an example request that will be sent to the file handler endpoint:

```http
POST https://contoso.com/_api/filehandlers/preview
Content-Type: application/x-www-form-urlencoded

cultureName=en-us&client=OneDrive&userId=rgregg%40contoso.com&items=%5B%22https%3A%2F%2Fgraph.microsoft.com%2Fv1.0%2Fme%2Fdrive%2Fitems%2F4D679BEA-6F9B-4106-AB11-101DDE52B06E%22%5D
```

**Note:** The URLs returned in the items collection may be very long (but less than the maximum URL length of 2048 characters).
Each URL contains a token embedded in the URL that allows the file handler app to access the content without a full-trust permission scope.
However, your file handler endpoint should ensure it expects long URLs to be returned and handles them correctly.

For ASP.NET developers, you can access these values using the `Request.Form` collection, for example:

```csharp
var itemsJson = Request.Form["items"];
var itemUrls = JsonConvert.DecodeObject<string[]>(items);
```

The **activation parameters** should be cached when the request comes in, either using a server-side cache or via cookies on the response.
For the initial file handler request, it's likely that the file handler app will need to redirect the user to retrieve an accessToken via Azure Active Directory OAuth2 experience.
The activation parameters will be lost if not persisted before this redirect occurs.

You can see an example of using a data model object and handler method for caching the activation parameters in a cookie, in the [Markdown File Handler sample][markdown-file-handler].

[GPXFileHandler]: https://github.com/OfficeDev/GPX-FileHandler
[markdown-file-handler]: https://github.com/rgregg/o365-markdown-file-handler

## Seamless authentication with file handlers 2.0

After your file handler has received a request with activation parameters, it will need to retrieve an access token to make API calls to Microsoft Graph.
Your app will need to call the [Azure Active Directory authentication endpoint][aad-auth] to retrieve an access token for the signed in user.
To enable single sign-on and avoid prompting the user to select an account, you can use the [`login_hint` parameter][aad-odic] and provide the value of the **userId** activation parameter.

In some scenarios, your file handler may need to prompt the user to sign-in.
If your file handler is running as a `preview` action, you cannot redirect to the sign-in experience inside an IFRAME and will need to popup the sign-in experience for your file handler.

[aad-auth]: https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-authentication-scenarios
[aad-odic]: https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols-oidc

## File handler availability

The following table lists the Office 365 services that support file handlers.

| Service name          | File handlers 2.0 | File handlers 1.0        |
| --------------------- | ----------------- | ------------------------ |
| SharePoint Online     | Generally available (GA) | GA |
| OneDrive for Business | GA | GA                       |
| OneDrive personal     | Not available     | Not available            |
| Outlook Web App       | Not available     | GA                       |

<!-- {
  "type": "#page.annotation",
  "description": "Learn about integrating your app inside OneDrive with file handlers",
  "section": "documentation",
  "suppressions": [
    "Warning: Resource oneDriveAddins.fileHandlerManifest is defined in multiple files: /docs/file-handlers/index.md, /docs/file-handlers/resources.md",
    "Warning: /docs/file-handlers/index.md:
      Property 'id' found in resource definition for 'oneDriveAddins.fileHandlerManifest', but not described in markdown table.",
    "Warning: /docs/file-handlers/index.md:
      Property 'type' found in resource definition for 'oneDriveAddins.fileHandlerManifest', but not described in markdown table.",
    "Warning: /docs/file-handlers/index.md:
      Property 'properties' found in resource definition for 'oneDriveAddins.fileHandlerManifest', but not described in markdown table."
  ],
  "tocPath": "File handlers"
} -->
