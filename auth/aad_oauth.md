# OneDrive for Business authentication and sign in

To use the [OneDrive API](readme.md) with OneDrive for Business, you need to have an
access token that authenticates your app to a particular set of permissions
for a user.

Getting an application configured for access to OneDrive for Business is a
challenge. We're working on making this process easier, so please bear with us.

In this section, you'll learn how to:

1. [Register your app with Azure Active Directory](#1-register-your-app-with-azure-active-directory).
2. [Sign your user in to OneDrive](#2-sign-users-in).

The OneDrive API uses the standard [OAuth 2.0](http://oauth.net/2/)
authentication scheme to authenticate users and generate access tokens. You
provide an access token for every API call via an HTTP header:

`Authorization: bearer {token}`

You access the API by sending HTTP requests to a specific endpoint URL. The root
URL is based on the host name of the server that serves as the REST endpoint.
You can [use the Discovery Service API to find endpoints for your Office 365
app](https://msdn.microsoft.com/en-us/office/office365/howto/discover-service-endpoints).
Your root URL appears in the next example, where `{tenant}` comes from your discovered endpoint URL:

`https://{tenant}-my.sharepoint.com/_api/v2.0/`

## 1. Register your app with Azure Active Directory

Before your can sign in, you need to register your app with Azure Active
Directory and set the permissions your app needs. For more information see
[Register your app for OneDrive for
Business](../app-registration.md#register-your-app-for-onedrive-for-business).

## 2. Sign users in

Your app initiates the sign-in process by contacting the Azure Active Directory (Azure AD)
authorization web service with a client ID, user info, and authorization code. After Azure AD receives the information, you'll receive an access token. The flow follows standard OAuth 2.0 authentication
flows and requires calls from a web browser or web-browser control. See
[Understanding Office 365 app authentication concepts](https://msdn.microsoft.com/en-us/office/office365/howto/common-app-authentication-tasks)
for general Office 365 authentication info.

Access to web APIs by native clients and websites in Azure AD is implemented by using the OAuth 2.0
[Authorization Code Grant Flow](https://msdn.microsoft.com/en-US/library/azure/dn645542.aspx).
Here, you'll request an authorization code, and use the authorization code to
obtain an access token. See [OAuth 2.0 in Azure AD](https://msdn.microsoft.com/en-us/library/azure/dn645545.aspx) for more information about sign-in flows for other scenarios.

The code flow for authentication is a three-step process with separate calls to
authenticate and authorize the application and to generate an access token to
use the OneDrive API. This process also creates and sends a refresh token to your application.
With the refresh token, long-term use of the API is avaialable when the user isn't actively using your application.

![Authorization Code Flow Diagram](../site-images/authorization_code_flow.png)

### Step 1. Get an authorization code
In the next example, the URL request starts the sign in process with the code flow. You can use a web browser or web-browser
control to load this URL request.

**Note** The user must be signed in to the resource URL.

```http
GET https://login.windows.net/common/oauth2/authorize?response_type=code&client_id={client_id}&redirect_uri={redirect_uri}&resource={resource_uri}
```

#### Required query string parameters
| Parameter name  | Value  | Description                                                                                            |
|:----------------|:-------|:-------------------------------------------------------------------------------------------------------|
| *client_id*     | string | The client ID created for your app.                                                                    |
| *response_type* | string | Specifies the requested response type. In an authorization code grant request, the value must be code. |
| *redirect_uri*  | string | The redirect URL that the browser is sent to when authentication is complete.                          |
| *resource_uri*  | string | Root url for the resource being accessed.                                                              |

#### Response

Upon successful authentication and authorization of your application, as shown in the next example, the web
browser is redirected to your redirect URL with additional parameters added
to the URL.

```url
https://myapp.contoso.com/myapp/callback?code=AwABAAAAvPM...
```

### Step 2. Redeem the code for access tokens

After you have received the `code` value, you can redeem this code for a set of
tokens that allow you to authenticate with the OneDrive API. To redeem the code,
make the following request:

```http
POST https://login.windows.net/common/oauth2/token
Content-Type: application/x-www-form-urlencoded

client_id={client_id}&redirect_uri={redirect_uri}&client_secret={client_secret}
&code={code}&grant_type=authorization_code
```

#### Required request body parameters

The request body is a properly encoded URL string, with some required parameters.

| Parameter name  | Value  | Description                                                                                                                              |
|:----------------|:-------|:-----------------------------------------------------------------------------------------------------------------------------------------|
| *client_id*     | string | The client ID value created for your application.                                                                                        |
| *redirect_uri*  | string | The redirect URL that the browser is sent to when authentication is complete. This should match the *redirect_uri* in the first request. |
| *client_secret* | string | The client secret created for your application.                                                                                          |
| *code*          | string | The authorization code you received in the first authentication request.                                                                 |

**Note**  For web apps, the domain portion of the redirect URI must match the
domain portion of the redirect URI that you specified in the
[Azure Management Portal](https://manage.windowsazure.com/).

#### Response

If the call is successful, the response for the POST request contains a JSON string
that includes several properties, including `access_token`, `token_type`, and
`refresh_token`.

<!-- {"blockType": "resource", "@odata.type": "oauth2.tokenResponse" } -->
```json
{
  "token_type":"bearer",
  "expires_in": 3600,
  "scope":"MyFiles.ReadWrite",
  "access_token":"EwCo...AA==",
  "refresh_token":"eyJh...9323"
}
```

You can now store and use the provided `access_token` to make authenticated
requests to the OneDrive API.

**Important:** Treat the values of `access_token` and `refresh_token` in this
response as securely as you would a user's password.

The access token is valid for only the number of seconds that is
specified in the **expires_in** property. You can request a new access token
by using the refresh token (if available), or by repeating the authentication
request from the beginning.

### Step 3. Get a new access token or refresh token

To redeem the refresh token for a new access token, make the following request:

```http
POST https://login.windows.net/common/oauth2/token
Content-Type: application/x-www-form-urlencoded

client_id={client_id}&redirect_uri={redirect_uri}&client_secret={client_secret}
&refresh_token={refresh_token}&grant_type=refresh_token
```

#### Required request body parameters

The request body is a properly encoded URL string, with some required parameters.

| Parameter name  | Value  | Description                                                                                                                                         |
|:----------------|:-------|:----------------------------------------------------------------------------------------------------------------------------------------------------|
| *client_id*     | string | The client ID created for your application.                                                                                                         |
| *redirect_uri*  | string | The redirect URL that the browser is sent to when authentication is complete. This should match the *redirect_uri* value used in the first request. |
| *client_secret* | string | The client secret created for your application.                                                                                                     |
| *refresh_token* | string | The refresh token you received previously.                                                                                                          |

**Note**  For web apps, the domain portion of the redirect URI must match the
domain portion of the redirect URI that you specified in the
[Azure Management Portal](https://manage.windowsazure.com/).

#### Response

If the call is successful, the response for the POST request contains a JSON string
that includes several properties including `access_token`, `authentication_token` and
`refresh_token` if you requested the **wl.offline_access** scope.

<!-- {"blockType": "example", "@odata.type": "oauth2.tokenResponse", "name": "oauth-response-example" } -->
```json
{
  "token_type":"bearer",
  "expires_in": 3600,
  "scope": "MyFiles.ReadWrite",
  "access_token":"EwCo...AA==",
  "refresh_token":"eyJh...9323"
}
```

You can now store and use the `access_token` to make authenticated
requests to the OneDrive API. For more info about refresh tokens, see
[Refresh Tokens for Multiple Resources](https://msdn.microsoft.com/en-us/library/azure/dn645538.aspx).

**Important:** Treat the values of `access_token` and `refresh_token` in this
response as securely as you would a user's password.

The access token is valid for only the number of seconds that is
specified in the **expires_in** property. You can request a new access token
by using the refresh token (if available) or by repeating the authentication
request from the beginning.

## Errors

If there are errors with authentication, the web browser is redirected to
an error page. While the error page always presents an end-user friendly message,
the URL for the error page includes additional information that may help you
debug what happened. This kind of information is not always shown in the content of the
error page displayed in the browser.

The URL includes query parameters that you can use to parse the error and respond
accordingly. These parameters are always included as a bookmark (after the `#`
character). The page content will always display a generic error message for
the user.

If the user selects not to provide consent to your application, the flow will
redirect to your redirect_uri and include the same error parameters.

For more info about handling errors, see [Error Handling in OAuth 2.0](https://msdn.microsoft.com/en-us/library/azure/dn645540.aspx).

[app-portal]: http://go.microsoft.com/fwlink/p/?LinkId=193157

## Related topics

The following topics contain high-level overviews of other concepts that apply
to the OneDrive API.

* [Develop with the OneDrive API](../readme.md)
* [Using Azure AD for Authorization](https://msdn.microsoft.com/en-us/library/azure/dn385718.aspx)
* [OneDrive authentication and sign-in using Microsoft accounts](msa_oauth.md)
* [Office 365 authentication concepts](https://msdn.microsoft.com/en-us/office/office365/howto/common-app-authentication-tasks)
* [OAuth 2.0 in Auzure AD](https://msdn.microsoft.com/en-us/library/azure/dn645545.aspx)
* [Authorization Code Grant Flow](https://msdn.microsoft.com/en-us/library/azure/dn645542.aspx)

<!-- {
  "type": "#page.annotation",
  "description": "Learn how to authenticate your app with Azure Active Directory and get access to OneDrive for Business",
  "keywords": "authentication,oauth,azure active directory,aad,onedrive,api, onedrive for business",
  "section": "documentation",
  "tocPath": "OneDrive for Business (preview)/Auth"
} -->
