---
author: keco
author: natalieethell
ms.author: keco
ms.author: natalieethell
ms.date: 10/02/2018
---
# Selecting Files with the Microsoft File Browser SDK

The following walk through shows how to integrate the [Microsoft File Browser SDK](https://www.npmjs.com/package/@microsoft/file-browser) with the React application we created during [project setup](index.md).

## Select Files Demo

### 1. Pass a valid Access Token to the SDK

In order to select files with the File Browser SDK, it first needs to successfully fetch items from the Microsoft Graph. Follow [this tutorial](https://developer.microsoft.com/en-us/graph/docs/concepts/auth_overview) to get a valid `access_token`. Once obtained, replace `<access_token>` in the sample code below with
the valid token so that it is returned as a `Promise` via `getAuthenticationToken`.

```jsx
class App extends React.Component {
  public render() {
    return (
      <GraphFileBrowser 
        getAuthenticationToken={this.getAuthenticationToken} />
    );
  }

  private getAuthenticationToken() {
    return new Promise(resolve => resolve('<access_token>'));
  }
}
```

Reload your application with the above change and you should see the File Browser fetch and render items from your root drive.

### 2. Attach success and cancel callbacks

The `GraphFileBrowser` component exposes the following callback props, `onSuccess` and `onCancel`. The `onSuccess` callback is invoked when a user selects files via the default "Select" action button. The `onCancel` callback is invoked when a user cancels a select action via the default "Cancel" action button.

#### Select File Callback

The `onSuccess` prop expects a function that receives an Array of keys for the items selected in the File Browser. An example usage of the prop is:

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

With the above code, one can select files in the File Explorer and upon clicking the default "Select" action button, the selected keys will be output to the Browser's console.

#### Cancel Callback

The `onCancel` prop expects a function that receives an `Error` as its only argument upon selection of the default "Cancel" action button. Building upon our previous example, an example usage of the prop is:

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

With the above code, one can click the default "Cancel" action button. Upon doing so an `Error` with the canceled by user message will be output to the Browser's console.

In the next section, we cover [applying a custom theme to your File Browser](theming-customization.md).

<!-- {
  "type": "#page.annotation",
  "description": "Use the Microsoft File Browser SDK to select OneDrive files.",
  "keywords": "js,javascript,onedrive,graph,file,browser,picker,saver,open,save,cloud",
  "section": "sdks",
  "headerAdditions": [],
  "footerAdditions": []
} -->
