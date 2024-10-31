---
author: patrick-rodgers
ms.author: patrodg
ms.date: 10/24/2022
ms.topic: overview
title: OneDrive File Browser
ms.localizationpriority: High
---

# File Browser

The File Browser v8 allows you to use the same functionality used within the M365 service within your solutions. Meaning as we iterate and improve the service, those new capabilities appear for your users!

This new "control" is a page hosted within the Microsoft service which you interact with via post messages. The page can be hosted either embedded in an iframe or as a popup.

**[Just Show Me The Sample Code](https://aka.ms/OneDrive/samples/file-browsing)**

## Required Setup

To run the samples or use the control in your solution you will need to create an AAD application. You can follow these steps:

1. Create a new AAD App Registration, note the ID of the application
2. Under authentication, create a new Single-page application registry
   1. Set the redirect uri to `https://localhost` (this is for testing the samples)
   2. Ensure both Access tokens and ID tokens are checked
   3. You may optionally configure this application for multitenant but this is outside the scope of this article
3. Under API permissions
   1. Add `Files.Read.All`, `Sites.Read.All`, Leave `User.Read` for Graph delegated permissions
   2. Add `AllSites.Read`, `MyFiles.Read` for SharePoint delegated permissions

> If you are developing in [SharePoint Framework](https://aka.ms/spfx) you can [request these permissions](https://learn.microsoft.com/sharepoint/dev/spfx/use-aadhttpclient#request-permissions-to-an-azure-ad-application) in the application manifest with the resource "SharePoint" and "Microsoft Graph".

## How it works

To use the control you must:

1. Make a POST request to the "control" page hosted at /_layouts/15/FileBrowser.aspx. Using this request you supply some parameters, the key one being [the browser configuration](./v8-schema.md).
2. Setup messaging between your host application and the control using [postMessage](https://developer.mozilla.org/docs/Web/API/Window/postMessage) and [message ports](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort).
3. Once the communication channel is established you must respond to various "commands", the first of which is to provide authentication tokens.
4. Finally, you will need to respond to additional command messages to supply new/different auth tokens, handle browser events, or allow the default actions to occur.

The following sections explain each step.

> We also have a [variety of samples](https://aka.ms/onedrive/samples/file-browsing) showing different ways to integrate with the control.

## Initiate the Browser

To initate the browser you need to create a "window" which can either be an iframe or a popup. Once you have a window you should construct a form and POST the form to the URL `{baseUrl}/_layouts/15/FileBrowser.aspx` with the query string parameters defined.

The `{baseUrl}` value above is either the SharePoint web url of the target web, or the user's onedrive. Some examples are: "https://tenant.sharepoint.com/sites/dev" or "https://tenant-my.sharepoint.com".

- View [file browser configuration schema](./v8-schema.md).

```TypeScript
// get a reference to a "window", here an iframe is used, could also be a pop-up
const { contentWindow } = document.getElementById("IdOfIFrame");

// we need to get an authentication token to use in the form below (more information in auth section)
const authToken = await getToken({
    resource: baseUrl,
    command: "authenticate",
    type: "SharePoint",
});

// now we need to construct our query string
// options: These are the browser configuration, see the schema link for a full explaination of the available options
const queryString = new URLSearchParams({
    fileBrowser: JSON.stringify(options),
});

const url = combine(baseUrl, `_layouts/15/fileBrowser.aspx?${queryString}`);

const form = contentWindow.document.createElement("form");
form.setAttribute("action", url);
form.setAttribute("method", "POST");
contentWindow.document.body.append(form);

const input = contentWindow.document.createElement("input");
input.setAttribute("type", "hidden")
input.setAttribute("name", "access_token");
input.setAttribute("value", authToken);
form.appendChild(input);

form.submit();
```

### Browser Configuration

The browser is configured through serializing a json object containing the desired settings, and appending it to the querystring values as showin in the [Initiate the Browser](#initiate-the-browser) section. You can also view the [full schema](./v8-schema.md). At a minimum you must supply the authentication, entry, and messaging settings.

An example minimal settings object is shown below. This sets up messaging on channel 27, lets the browser know we can supply tokens, and that we want the "My Files" tab to represent the user's OneDrive files. This configuration would use a baseUrl of the form "https://{tenant}-my.sharepoint.com";

```TypeScript
const paramsTest: IFileBrowserOptions = {
    sdk: "8.0",
    entry: {
        oneDrive: {
            files: {},
        }
    },
    authentication: {},
    messaging: {
        origin: "http://localhost:3000",
        channelId: "27"
    },
};
```

> The browser is designed to work with _either_ OneDrive OR SharePoint in a given instance and only one of the entry sections should be included.

## Establish Messaging

Once form is submitted you will need to establish a messaging channel. This is used to receive the commands from the browser and respond.

```TypeScript
let port: MessagePort;

// this adds a listener to the current (host) window, which the popup or embed will message when ready
window.addEventListener("message", (event) => {

   // we validate the message is for us, win here is the same variable as above
   if (event.source && event.source === win) {

      const message = event.data;

      // the channelId is part of the configuration options, but we could have multiple browsers so that is supported via channels
      if (message.type === "initialize" && message.channelId === options.messaging.channelId) {

         // grab the port from the event
         port = event.ports[0];

         // add an event listener to the port (example implementation is in the next section)
         port.addEventListener("message", messageListener);

         // start ("open") the port
         port.start();

         // tell the browser to activate
         port.postMessage({
               type: "activate",
         });
      }
   }
});
```

## Message Listener Implementation

Your solution must handle various messages from the browser, classified as either notifications or commands. Notifications expect no response and can be considered log information. The one exception is the `page-loaded` notification highlighted below, which will tell you the browser is ready.

Commands require that you acknowledge, and depending on the command, respond. This section show an example implementation of the `messageListener` function added as an event listener to the port. The next sections talks in detail about notifications and commands.

```TypeScript
async function messageListener(message: MessageEvent): Promise<void> {

    switch (message.data.type) {

        case "notification":

            if (message.data.data.notification === "page-loaded") {
                // here we know that the browser page is loaded and ready for user interaction
            }

            console.log(message.data);
            break;

        case "command":

            // all commands must be acknowledged
            port.postMessage({
                type: "acknowledge",
                id: message.data.id,
            });

            // this is the actual command specific data from the message
            const command = message.data.data;

            // command.command is the string name of the command
            switch (command.command) {

                case "authenticate":

                    // the first command to handle is authenticate. This command will be issued any time the browser requires a token
                    // 'getToken' represents a method that can take a command and return a valid auth token for the requested resource
                    const token = await getToken(command);

                    if (typeof token !== "undefined") {

                        // we report a result for the authentication via the previously established port
                        port.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "token",
                                token: token,
                            }
                        });
                    }

                    break;

                case "open":

                    // here we have intercepted an "open" command and can handle it within our application

                    // let the browser know that the open command was handled (required)
                    port.postMessage({
                        type: "result",
                        id: message.data.id,
                    });

                    break;

                default:
                    // we have hit a command we do not support
                    log(`Unsupported command: ${JSON.stringify(command)}`);
                    break;
            }

            break;
    }
}
```

## Get Token

The control requires that we are able to provide it with authentication tokens based on the sent command. To do so we create a method that takes a command and returns a token as shown below. We are using the `@azure/msal-browser` package to handle the authentication work.

> Currently the control relies on SharePoint tokens and not Graph, so you will need to ensure your resource is correct and you cannot reuse tokens for Graph calls.

```TS
import { PublicClientApplication, Configuration, SilentRequest } from "@azure/msal-browser";
import { combine } from "@pnp/core";
import { IAuthenticateCommand } from "./types";

const app = new PublicClientApplication(msalParams);

async function getToken(command: IAuthenticateCommand): Promise<string> {
    let accessToken = "";
    const authParams = { scopes: [`${combine(command.resource, ".default")}`] };

    try {

        // see if we have already the idtoken saved
        const resp = await app.acquireTokenSilent(authParams!);
        accessToken = resp.accessToken;

    } catch (e) {

        // per examples we fall back to popup
        const resp = await app.loginPopup(authParams!);
        app.setActiveAccount(resp.account);

        if (resp.idToken) {

            const resp2 = await app.acquireTokenSilent(authParams!);
            accessToken = resp2.accessToken;

        } else {

            // throw the error that brought us here
            throw e;
        }
    }

    return accessToken;
}
```

<!-- {
  "type": "#page.annotation",
  "description": "SDKs to make integrating with OneDrive easy.",
  "keywords": "sdk,windows,ios,android,js,javascript,C#,c-sharp,java,objective-c,python",
  "section": "sdks",
  "tocPath": "OneDrive SDKs",
  "tocBookmarks": {
    "OneDrive SDKs/Client libraries": "#microsoft-graph-sdks-and-sample-code",
    "OneDrive SDKs/File browsers": "#file-browser-sdks"
  }
} -->
