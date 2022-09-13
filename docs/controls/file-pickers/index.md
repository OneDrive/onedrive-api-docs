---
author: patrick-rodgers
ms.author: patrodg
ms.date: 09/10/2017
ms.topic: overview
title: OneDrive File Picker
ms.localizationpriority: High
---

# File picker

The File Picker v8 allows you to use the same functionality used within the M365 service within your solutions. Meaning as we iterate and improve the service, those new capabilities appear for your users!

This new "control" is a page hosted within the Microsoft service which you interact with via post messages. The page can be hosted either embedded in an iframe or as a popup.

**[Just Show Me The Sample Code](https://aka.ms/OneDrive/samples/file-picking)**

> You can find the [documentation for the 7.2 picker here](./js-v72/index.md).

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

> If you are developing in [SharePoint Framework](https://aka.ms/spfx) you can [request these permissions](https://docs.microsoft.com/sharepoint/dev/spfx/use-aadhttpclient#request-permissions-to-an-azure-ad-application) in the application manifest with the resource "SharePoint" and "Microsoft Graph".

> To allow the user to upload files and create folders within the Picker experience, you may request access to `Files.ReadWrite.All`, `Sites.ReadWrite.All`, `AllSites.Write`, and `MyFiles.Write`.

## How it works

To use the control you must:

1. Make a POST request to the "control" page hosted at /_layouts/15/FilePicker.aspx. Using this request you supply some parameters, the key one being [the picker configuration](./v8-schema.md).
2. Setup messaging between your host application and the control using [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) and [message ports](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort).
3. Once the communication channel is established you must respond to various "commands", the first of which is to provide authentication tokens.
4. Finally, you will need to respond to additional command messages to supply new/different auth tokens, handle picked files, or close the popup.

The following sections explain each step.

> We also have a [variety of samples](https://aka.ms/OneDrive/samples/file-picking) showing different ways to integrate with the control.

## Initiate the Picker

To initate the picker you need to create a "window" which can either be an iframe or a popup. Once you have a window you should construct a form and POST the form to the URL `{baseUrl}/_layouts/15/FilePicker.aspx` with the query string parameters defined.

The `{baseUrl}` value above is either the SharePoint web url of the target web, or the user's onedrive. Some examples are: "https://tenant.sharepoint.com/sites/dev" or "https://tenant-my.sharepoint.com".

- View [file picker configuration schema](./v8-schema.md).

```TypeScript
// create a new window. The Picker's recommended maximum size is 1080x680, but it can scale down to
// a minimum size of 250x230 for very small screens or very large zoom.
const win = window.open("", "Picker", "width=1080,height=680");

// to use an iframe you can use code like:
// const frame = document.getElementById("iframe-id");
// const win = frame.contentWindow;

// now we need to construct our query string
// options: These are the picker configuration, see the schema link for a full explaination of the available options
const queryString = new URLSearchParams({
   filePicker: JSON.stringify(options),
   locale: 'en-us'
});

// Use MSAL to get a token for your app, specifying the resource as {baseUrl}.
const accessToken = await getToken(baseUrl);

// we create the absolute url by combining the base url, appending the _layouts path, and including the query string
const url = baseUrl + `/_layouts/15/FilePicker.aspx?${queryString}`);

// create a form
const form = win.document.createElement("form");

// set the action of the form to the url defined above
// This will include the query string options for the picker.
form.setAttribute("action", url);

// must be a post request
form.setAttribute("method", "POST");

// Create a hidden input element to send the OAuth token to the Picker.
// This optional when using a popup window but required when using an iframe.
const tokenInput = win.document.createElement("input");

tokenInput.setAttribute("type", "hidden");
tokenInput.setAttribute("name", "access_token");
tokenInput.setAttribute("value", accessToken);

form.appendChild(tokenInput);

// append the form to the body
win.document.body.append(form);

// submit the form, this will load the picker page
form.submit();
```

### Picker Configuration

The picker is configured through serializing a json object containing the desired settings, and appending it to the querystring values as showin in the [Initiate the Picker](#initiate-the-picker) section. You can also view the [full schema](./v8-schema.md). At a minimum you must supply the authentication, entry, and messaging settings.

An example minimal settings object is shown below. This sets up messaging on channel 27, lets the picker know we can supply tokens, and that we want the "My Files" tab to represent the user's OneDrive files. This configuration would use a baseUrl of the form "https://{tenant}-my.sharepoint.com";

```TypeScript
const channelId = uuid(); // Always use a unique id for the channel when hosting the picker.

const options = {
    sdk: "8.0",
    entry: {
        oneDrive: {}
    },
    // Applications must pass this empty `authentication` option in order to obtain details item data
    // from the picker, or when embedding the picker in an iframe.
    authentication: {},
    messaging: {
        origin: "http://localhost:3000",
        channelId: channelId
    },
}
```

> The picker is designed to work with _either_ OneDrive OR SharePoint in a given instance and only one of the entry sections should be included.

### Localization

The File Picker's interface supports localization for the [same set of languages as SharePoint](https://support.microsoft.com/en-us/office/languages-supported-by-sharepoint-dfbf3652-2902-4809-be21-9080b6512fff).

To set the language for the File Picker, use the `locale` query string parameter, set to one of the LCID values in the above list.

## Establish Messaging

Once the window is created and the form submitted you will need to establish a messaging channel. This is used to receive the commands from the picker and respond.

```TypeScript
let port: MessagePort;

function initializeMessageListener(event: MessageEvent): void {
    // we validate the message is for us, win here is the same variable as above
    if (event.source && event.source === win) {

        const message = event.data;

        // the channelId is part of the configuration options, but we could have multiple pickers so that is supported via channels
        // On initial load and if it ever refreshes in its window, the Picker will send an 'initialize' message.
        // Communication with the picker should subsequently take place using a `MessageChannel`.
        if (message.type === "initialize" && message.channelId === options.messaging.channelId) {
            // grab the port from the event
            port = event.ports[0];

            // add an event listener to the port (example implementation is in the next section)
            port.addEventListener("message", channelMessageListener);

            // start ("open") the port
            port.start();

            // tell the picker to activate
            port.postMessage({
                type: "activate",
            });
        }
    }
};

// this adds a listener to the current (host) window, which the popup or embed will message when ready
window.addEventListener("message", messageEvent);
```

## Message Listener Implementation

Your solution must handle various messages from the picker, classified as either notifications or commands. Notifications expect no response and can be considered log information. The one exception is the `page-loaded` notification highlighted below, which will tell you the picker is ready.

Commands require that you acknowledge, and depending on the command, respond. This section show an example implementation of the `channelMessageListener` function added as an event listener to the port. The next sections talks in detail about notifications and commands.

```TypeScript
async function channelMessageListener(message: MessageEvent): Promise<void> {
    const payload = message.data;

    switch (payload.type) {

        case "notification":
            const notification = payload.data;

            if (notification.notification === "page-loaded") {
                // here we know that the picker page is loaded and ready for user interaction
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
            const command = payload.data;

            // command.command is the string name of the command
            switch (command.command) {

                case "authenticate":
                    // the first command to handle is authenticate. This command will be issued any time the picker requires a token
                    // 'getToken' represents a method that can take a command and return a valid auth token for the requested resource
                    try {
                        const token = await getToken(command);

                        if (!token) {
                            throw new Error("Unable to obtain a token.");
                        }

                        // we report a result for the authentication via the previously established port
                        port.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "token",
                                token: token,
                            }
                        });
                    } catch (error) {
                        port.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "error",
                                error: {
                                    code: "unableToObtainToken",
                                    message: error.message
                                }
                            }
                        });
                    }

                    break;

                case "close":

                    // in the base of popup this is triggered by a user request to close the window
                    await close(command);

                    break;

                case "pick":

                    try {
                        await pick(command);
    
                        // let the picker know that the pick command was handled (required)
                        port.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "success"
                            }
                        });
                    } catch (error) {
                        port.postMessage({
                            type: "result",
                            id: message.data.id,
                            data: {
                                result: "error",
                                error: {
                                    code: "unusableItem",
                                    message: error.message
                                }
                            }
                        });
                    }

                    break;

                default:
                    // Always send a reply, if if that reply is that the command is not supported.
                    port.postMessage({
                        type: "result",
                        id: message.data.id,
                        data: {
                            result: "error",
                            error: {
                                code: "unsupportedCommand",
                                message: command.command
                            }
                        }
                    });

                    break;
            }

            break;
    }
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
    "OneDrive SDKs/File pickers": "#file-picker-sdks"
  }
} -->
