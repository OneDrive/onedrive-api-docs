---
author: kevintcoughlin
ms.author: keco
ms.date: 10/02/2018
---

# Selecting Files with the Microsoft File Browser SDK

The following walk through demonstrates how to integrate the [Microsoft File Browser SDK](https://www.npmjs.com/package/@microsoft/file-browser) with the sample React application used in [project setup](index.md).

## Handling File Selection

### 1. Attach an onSuccess callback

The `GraphFileBrowser` component exposes the following action callback props, `onSuccess` and `onCancel`.
The `onSuccess` callback is invoked when a user selects files via the default "Select" action button.

#### onSuccess Callback

The `onSuccess` callback prop expects a function that receives an Array of keys for the items selected in the File Browser.
Below is an example implementation of the `onSuccess` prop which logs the selected file keys to the Browser's console:

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

class App extends React.Component {
  public render() {
    return (
      <GraphFileBrowser 
        getAuthenticationToken={this.getAuthenticationToken}
        onSuccess={this.onSuccess} />
    );
  }

  private getAuthenticationToken() {
    return Promise.resolve('<access_token>');
  }

  private onSuccess(keys) {
    console.log('onSuccess', keys);
  }
}

ReactDOM.render(
  <App />,
  mountNode
);
```

To invoke the `onSuccess` callback in the File Browser, click the "Select" action button once rendered.
The keys of any selected files will be logged to the Browser's console.

#### onSuccess Payload

When the `onSuccess` callback is invoked, it is passed a single argument that is an Array of keys of the selected items.
Each key has the following structure:

```ts
{
  // the key of the item in the File Browser's internal cache
  [key: string]: {
    endpoint: string, // the endpoint url the item was fetched from
    driveId?: string, // the identifier of the drive that contains the item
    itemId?: string   // the identifier of the item
  } 
}
```

With the above information and a valid `access_token`, you may act upon the file using the [Microsoft Graph API](https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/onedrive).

### 2. Attach an onCancel callback

The `onCancel` callback is invoked when a user cancels a select action via the default "Cancel" action button.

#### onCancel Callback

The `onCancel` callback prop expects a function that receives an `Error` as its only argument upon selection of the default "Cancel" action button.
Building upon our previous example, an example implementation of the `onCancel` prop is:

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

class App extends React.Component {
  public render() {
    return (
      <GraphFileBrowser 
        getAuthenticationToken={this.getAuthenticationToken}
        onSuccess={this.onSuccess}
        onCancel={this.onCancel} />
    );
  }

  private getAuthenticationToken() {
    return Promise.resolve('<access_token>');
  }

  private onSuccess(keys) {
    console.log('onSuccess', keys);
  }

  private onCancel(err) {
    console.log('onCancel', err.message);
  }
}

ReactDOM.render(
  <App />,
  mountNode
);
```

To invoke the `onCancel` callback, click the "Cancel" action button.
An `Error` with the canceled by user message will then be output to the Browser's console.

## Advanced Configuration
 
The `GraphFileBrowser` component accepts props to support additional advanced scenarios.
The props are defined as follows:

| Component Prop                       | Description                                                                                                             |
|:---------------------------|:------------------------------------------------------------------------------------------------------------------------|
| **getAuthenticationToken** | The **required** function with return type `Promise<string>` which contains a valid `access_token` for authentication against the provided `endpoint`.|
| **onSuccess**              | The callback with signature `(keys: any[]) => void` invoked on "Select" of one or more files. |
| **onCancel**               | The callback with signature `(err: Error) => void` invoked on "Cancel" or when an error is thrown.  |
| **onRenderSuccessButton**  | The optional render function to override the default "Select" action button. |
| **onRenderCancelButton**   | The optional render function to override the default "Cancel" action button. |
| **selectionMode**          | The selection mode for the picker, where the value is one of `files`, `folders`, or `all` (default). A selection mode of `files` will restrict user selection to file types, similarly `folders` will restrict selection to folders, and `all` allows for the selection of both Files and Folders.   |
| **itemMode**               | Controls item selection behavior, where the value is one of `pick`, `single`, or `multiple` (default). An `itemMode` of `single`, allows for only a single item to be selected at a time, while `multiple` allows for the selection of any number of items. An `itemMode` of `pick` invokes `onSelect` on item "click" rather than when the "Select" action button is pressed. |
| **endpoint**               | By default, the File Browser will fetch items from the Microsoft Graph endpoint at `https://graph.microsoft.com/v1.0/me`. You may specify a valid OneDrive for Business or SharePoint document library URL to override the default endpoint.|
| **itemId**                 | By default, the File Browser will open to the `root` drive. You may choose a different drive to open on render by specifying the drive's unique identifier. |

## Next Step

In the next section, we cover [customizing the File Browser](customization.md).

<!-- {
  "type": "#page.annotation",
  "description": "Use the Microsoft File Browser SDK to select files from the Microsoft Graph.",
  "keywords": "js,javascript,onedrive,graph,file,browser,picker,saver,open,save,cloud",
  "section": "sdks",
  "headerAdditions": [],
  "footerAdditions": []
} -->
