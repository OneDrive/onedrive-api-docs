﻿# OneDrive authentication and sign-in

To use the OneDrive APIs, you need to have an access token that authenticates
your app to a particular set of permissions for a user. In this section, you'll learn how to:

1. Register your application to get a client ID and a client secret.
2. Sign your user in to OneDrive with the specified [scopes](#authentication-scopes) using the token flow or code flow.
3. Sign the user out (optional).

The OneDrive API uses the standard [OAuth 2.0](http://oauth.net/2/) authentication scheme to authenticate users and generate access tokens. You must provide an authentication token for every API call via one of the following.

* An HTTP header: `Authorization: bearer {token}`
* A query parameter: `?access_token={token}`

## Register your app

To authenticate your app, you need to register your app with Microsoft and provide some details about
your app.

### To register your app

1. Go to the [Microsoft account Developer Center][app-portal].
2. When prompted, sign in with your Microsoft account credentials.
3. Choose **Create application**.
4. Enter your app's display name and choose the app's primary language.
5. Read the **Live Connect terms of use** and the **Privacy and Cookies**
statement, and then choose **I accept** to accept the terms of use.

After you've completed these steps, a client ID and client secret are created for your
app. Choose **App Settings** to view the values associated with your app.

**Important** Treat the value of client secret the same
as you would a user's password. The secret represents the key to your
application and, if made available, can be used to impersonate your application.

On the **API Settings** page, configure details about your application.
For example, is your application a mobile, desktop, or web application?
For mobile or desktop applications, change the setting **Mobile or desktop client app** to **Yes**.

For web apps, configure the **Redirect URLs** that your app will use
during the login process. For security purposes, all redirect URLs
must be on the same root domain.

## Sign users in
Your app must initiate the sign-in process by contacting the
Microsoft account authorization web service with a specified scope, and receive
an access token. The flow follows standard OAuth 2.0 authentication flows and
requires calls from a web browser or web-browser control.

## Authentication scopes

Scopes determine what type of access the app is granted when the user is signed in. All scopes support single sign-on on the web, which means that if a user is already signed in to OneDrive, then the user can skip the authentication flow
and go straight to the authorization flow.


| Scope name         | Description                                                                                                                                                | Required |
|:-------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|:---------|
| wl.signin          | Allows your application to take advantage of single sign-on capabilities.                                                                                  | No       |
| wl.offline_access  | Allows your application to receive a refresh token so it can work offline even when the user isn't active. This scope is not available for token flow.     | No       |
| onedrive.readonly  | Grants read-only permission to all of a user's OneDrive files, including files shared with the user.                                                       | Yes      |
| onedrive.readwrite | Grants read and write permission to all of a user's OneDrive files, including files shared with the user. To create sharing links, this scope is required. | Yes      |

As an example, a typical application might request the following scopes:
```
wl.signin wl.offline_access onedrive.readwrite
```

## Supported Authentication flows

There are two supported authentication flows to choose from:

* [Token flow](#token-flow)
* [Code flow](#code-flow)

Scope example

```
w1.offline_access onedrive.readwrite
```

## Token flow
The easiest authentication flow is the token flow. This flow is useful for quickly
obtaining an access token to use the OneDrive API in an interactive fashion. This flow
does not provide a refresh token, so it can't be used for long term access to the
OneDrive API.

![Token Flow Diagram](../site-images/implicit_grant_flow.png)

To start the sign-in process with the token flow, use a web browser or web-browser
control to load a URL request.

```
GET https://login.live.com/oauth20_authorize.srf?client_id={client_id}&scope={scope}
    &response_type=token&redirect_uri={redirect_uri}
```

### Required query string parameters
| Parameter name | Value  | Description                                                                   |
|:---------------|:-------|:------------------------------------------------------------------------------|
| *client_id*    | string | The client ID value created for your application.                             |
| *scope*        | string | A space-separated list of scopes your application requires.                   |
| *redirect_uri* | string | The redirect URL that the browser is sent to when authentication is complete. |

Use this redirect URL for mobile and desktop applications `https://login.live.com/oauth20_desktop.srf`.

### Response

Upon successful authentication and authorization of your application, the web browser
will be redirected to your redirect URL with additional parameters added to the URL.

```
https://login.live.com/oauth20_authorize.srf#access_token=EwC...EB
  &authentication_token=eyJ...3EM&token_type=bearer&expires_in=3600
  &scope=onedrive.readwrite&user_id=3626...1d
```

Values for `access_token`, `authentication_token`, and `user_id` are truncated
in the previous example. The values for `access_token` and `authentication_token`
are quite long.

You can use the value of `access_token` to make requests to the OneDrive API.

## Code flow

The code flow for authentication is a three-step process with separate calls to authenticate and authorize
the application and to generate an access token to use the OneDrive API. This also
allows your application to receive a refresh token that will enable long-term
use of the API in some scenarios, to allow access when the user isn't actively using your application.


![Authorization Code Flow Diagram](../site-images/authorization_code_flow.png)


### Step 1. Get an authentication code
To start the sign-in process with the code flow, use a web browser or web-browser
control to load this URL request.

```
GET https://login.live.com/oauth20_authorize.srf?client_id={client_id}&scope={scope}
  &response_type=code&redirect_uri={redirect_uri}
```

#### Required query string parameters
| Parameter name | Value  | Description                                                                   |
|:---------------|:-------|:------------------------------------------------------------------------------|
| *client_id*    | string | The client ID created for your app.                                           |
| *scope*        | string | A space-separated list of scopes that your app requires.                      |
| *redirect_uri* | string | The redirect URL that the browser is sent to when authentication is complete. |

#### Response

Upon successful authentication and authorization of your application, the web browser
will be redirected to your redirect URL with additional parameters added to the URL.

```
https://login.live.com/oauth20_authorize.srf?code=df6aa589-1080-b241-b410-c4dff65dbf7c
```

#### Errors

If there are errors with authentication, the web browser will be redirected to an error page.

```
https://login.live.com/err.srf?lc=1033#error={error_type}&error_description={error_message}
```

#### Troubleshooting
| Error        | Notes                                                                              |
|:-------------|:-----------------------------------------------------------------------------------|
| client_id    | The client id must be the ID created for your app, and not the app name.           |
| scope        | The correct scope values are defined above, in the Authentication Scopes section.  |
| redirect_uri |                                                                                    |

### Step 2. Redeem the code for access tokens
After you have received the `code` value, you can redeem this code for a set of
tokens that allow you to authenticate with the OneDrive API. To redeem the code, make the following request:

```
POST https://login.live.com/oauth20_token.srf
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
[Live SDK app management site][app-portal].

#### Response
If the call is successful, the response for the POST request contains a JSON string
that includes several properties, including `access_token`, `authentication_token`, and
`refresh_token` (if you requested the **wl.offline_access** scope).

```json
{
  "token_type":"bearer",
  "expires_in": 3600,
  "scope":"wl.basic onedrive.readwrite",
  "access_token":"EwCo...AA==",
  "authentication_token":"eyJh...93G4",
  "refresh_token":"eyJh...9323"
}
```

You can now store and use the `access_token` provided to make authenticated
requests to the OneDrive API.

**Important:** Treat the values of `access_token`, `authentication_token`, and `refresh_token` in this response as securely as you would a user's password.

The access token is valid for only the number of seconds that is
specified in the **expires_in** property. You can request a new access token
by using the refresh token (if available), or by repeating the authentication
request from the beginning.

### Step 3. Get a new access token or refresh token
If your app has requested access to **wl.offline_access** this step will
return a **refresh_token** that can be used to generate additional access
tokens after the initial token has expired.

To redeem the refresh token for a new access token, make the following request:

```http
POST https://login.live.com/oauth20_token.srf
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
[Live SDK app management site][app-portal].

#### Response
If the call is successful, the response for the POST request contains a JSON string
that includes several properties including `access_token`, `authentication_token` and
`refresh_token` if you requested the **wl.offline_access** scope.

```json
{
  "token_type":"bearer",
  "expires_in": 3600,
  "scope": "wl.basic onedrive.readwrite wl.offline_access",
  "access_token":"EwCo...AA==",
  "authentication_token":"eyJh...93G4",
  "refresh_token":"eyJh...9323"
}
```

You can now store and use the `access_token` to make authenticated
requests to the OneDrive API.

**Important:** Treat the values of `access_token`, `authentication_token`, and `refresh_token` in this response as securely as you would a user's password.

The access token is valid for only the number of seconds that is
specified in the **expires_in** property. You can request a new access token
by using the refresh token (if available) or by repeating the authentication
request from the beginning.

## Sign the user out
To sign a user out, make a call to the authorization web service using this URL.

```
GET https://login.live.com/oauth20_logout.srf?client_id={client_id}&redirect_uri={redirect_uri}
```

### Required query string parameters
| Parameter name | Value  | Description                                                                                                                                                 |
|:---------------|:-------|:------------------------------------------------------------------------------------------------------------------------------------------------------------|
| *client_id*    | string | The client ID value created for your application.                                                                                                           |
| *redirect_uri* | string | The redirect URL that the browser is sent to when authentication is complete. This must match exactly the redirect_uri value used in the get token request. |

## Error codes
If an error occurs during the request for authentication or authorization, the
web browser will be redirected to an error page.

```
https://login.live.com/err.srf?lc=1033#error=unauthorized_client&error_description=The%20client%20does%20not%20exist.%20If%20you%20are%20the%20application%20developer%2c%20configure%20a%20new%20application%20through%20the%20application%20management%20site%20at%20https://manage.dev.live.com/.
```

The URL includes query parameters that you can use to parse the error and respond
accordingly. The page content will always display a generic error message for
the user.

### Query string parameters

| Parameter name      | Value   | Description                                     |
|:--------------------|:--------|:------------------------------------------------|
| *lc*                | integer | Langauge identifier for the client's language.  |
| *error*             | string  | Error code identifying the error that occurred. |
| *error_description* | string  | A description of the error.                     |


[app-portal]: http://go.microsoft.com/fwlink/p/?LinkId=193157


#### Errors

If there are errors with authentication, the web browser will be redirected to
an error page. While the error page always presents an end-user friendly message
the URL for the error page includes additional information that may help you
debug what happened. This information is not always shown in the content of the
error page displayed in the browser.

```
https://login.live.com/err.srf?lc=1033#error={error_type}&error_description={error_message}
```

## Related topics

The following topics contain high-level overviews of other concepts that apply
to the OneDrive API.

* [Develop with the OneDrive API](readme.md)
