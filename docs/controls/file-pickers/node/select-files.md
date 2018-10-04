---
author: keco
author: natalieethell
ms.author: keco
ms.author: natalieethell
ms.date: 10/02/2018
---
# Selecting Files with the Microsoft File Browser SDK

The following walk through demonstrates how to integrate the [Microsoft File Browser SDK](https://www.npmjs.com/package/@microsoft/file-browser) with the React application used earlier in [project setup](index.md).

## Select Files Demo

### 1. Attach an onSuccess callback

The `GraphFileBrowser` component exposes the following callback props, `onSuccess` and `onCancel`. The `onSuccess` callback is invoked when a user selects files via the default "Select" action button.

#### The onSuccess Callback

The `onSuccess` prop expects a function that receives an Array of keys for the items selected in the File Browser. Below is an example implementation of the `onSuccess` prop that logs the selected file keys to the Browser's console:

```jsx
class App extends React.Component {
  public render() {
    return (
      <GraphFileBrowser 
        getAuthenticationToken={this.getAuthenticationToken}
        onSuccess={this.onSuccess} />
    );
  }

  private getAuthenticationToken() {
    return new Promise(resolve => resolve('<access_token>'));
  }

  private onSuccess(keys) {
    console.log('onSuccess', keys);
  }
}
```

To invoke the `onSuccess` callback, click the default "Select" action button. The keys of any selected files will then be output to the Browser's console.

#### onSuccess Callback Parameter

When the `onSuccess` callback is invoked, it is passed a single argument that is an Array of keys of the selected items. Each key contains the following structure:

```ts
{
  // the key of the item in the File Browser's cache
  [key: string]: {
    endpoint: string, // the endpoint url the item was fetched from
    driveId?: string, // the identifier of the drive that contains the item
    itemId?: string   // the identifier of the itme
  } 
}
```

With the above information and a valid `access_token`, you may act upon the file using the [Microsoft Graph API](https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/resources/onedrive).

### 2. Attach an onCancel callback

The `onCancel` callback is invoked when a user cancels a select action via the default "Cancel" action button.

#### Cancel Callback

The `onCancel` prop expects a function that receives an `Error` as its only argument upon selection of the default "Cancel" action button. Building upon our previous example, an example implementation of the `onCancel` prop is:

```jsx
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
    return new Promise(resolve => resolve('<access_token>'));
  }

  private onSuccess(keys) {
    console.log('onSuccess', keys);
  }

  private onCancel(err: Error): void {
    console.log('onCancel', err.message);
  }
}
```

To invoke the `onCancel` callback, click the default "Cancel" action button. An `Error` with the canceled by user message will then be output to the Browser's console.

In the next section, we cover [applying a custom theme to your File Browser](theming-customization.md).

<!-- {
  "type": "#page.annotation",
  "description": "Use the Microsoft File Browser SDK to select OneDrive files.",
  "keywords": "js,javascript,onedrive,graph,file,browser,picker,saver,open,save,cloud",
  "section": "sdks",
  "headerAdditions": [],
  "footerAdditions": []
} -->
