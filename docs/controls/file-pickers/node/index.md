---
author: keco
ms.author: keco
ms.date: 10/02/2018
ms.topic: overview
---
# Microsoft File Browser SDK for Node.js (Preview)

The [Microsoft File Browser SDK](https://www.npmjs.com/package/@microsoft/file-browser) provides a reusable React component for building file experiences with the [Microsoft Graph](https://developer.microsoft.com/en-us/graph). By using the SDK, any React application can render and perform actions on files by providing a valid `access_token`. In this guide, we will show you how to get your React app quickly rendering the File Browser component for Microsoft Graph.

## Setup

### Add Microsoft File Browser as a dependency

You will need to add `@microsoft/file-browser` to your project as a dependency. Using NPM, you can add the dependency by running the following command: 

```shell
$ npm i --save @microsoft/file-browser
```

### Add SDK peer dependencies

The Microsoft File Browser SDK relies on several peer dependencies. The bundle requires its consumers to provide `react` and `react-dom`.
If you are using TypeScript, the package also relies on typings for React and `office-ui-fabric-react`. The `office-ui-fabric-react` components
themselves are included in the bundle.

Below is an example `package.json` excerpt showing the dependency on `@microsoft/file-browser` with appropriate peer dependencies:

```json
"dependencies": {
  "@microsoft/file-browser": "~1.0.0-preview.0",
  "office-ui-fabric-react": "^5.123.0",
  "react": "^16.5.2",
  "react-dom": "^16.5.2",
},
"devDependencies": {
  "@types/react": "^16.4.14",
  "@types/react-dom": "^16.0.7"
}
```

## Render the File Browser

Once the required dependencies have been added to your project, you are ready to render the File Browser component for Microsoft Graph. 
The SDK exposes the component `GraphFileBrowser` which requires a valid `access_token` be returned via the `getAuthenticationToken` prop. The 
below component code shows an example usage:

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

To successfully fetch files, you will need to return a valid `access_token` via the `getAuthenticationToken` prop. More information
on acquiring valid authentication tokens for the Microsoft Graph can be found in [this tutorial](https://developer.microsoft.com/en-us/graph/docs/concepts/auth_overview). In the next section, we cover [selecting files with the File Browser SDK](select-files.md).

<!-- {
  "type": "#page.annotation",
  "description": "Use the Microsoft File Browser SDK to connect your web app to the Microsoft Graph.",
  "keywords": "js,javascript,onedrive,graph,file,browser,picker,saver,open,save,cloud",
  "section": "sdks",
  "headerAdditions": [
  ],
  "footerAdditions": [
  ]
} -->
