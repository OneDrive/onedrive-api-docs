---
author: kevintcoughlin
ms.author: keco
ms.date: 10/02/2018
ms.topic: overview
localization_priority: Priority
---
# Microsoft File Browser SDK (Preview)

The [Microsoft File Browser SDK](https://www.npmjs.com/package/@microsoft/file-browser) provides a reusable React component for building file experiences with the [Microsoft Graph](https://developer.microsoft.com/en-us/graph).
By using the SDK, any React application can render and perform actions on files by providing a valid `access_token`.
In this guide, we will show you how to get your React app quickly rendering the File Browser component for Microsoft Graph.

## Setup

### 1. Add Microsoft File Browser as a dependency

In order to use the SDK, you will need to add `@microsoft/file-browser` to your project as a dependency.
Using NPM, you can add the dependency by running the following command: 

```shell
$ npm i --save @microsoft/file-browser
```

### 2. Add SDK peer dependencies

The Microsoft File Browser SDK relies on several peer dependencies. The bundle requires its consumers to provide `react` and `react-dom`.
If you are using [TypeScript](https://www.typescriptlang.org/), the package also relies on typings for [React](https://github.com/facebook/react/) and [office-ui-fabric-react](https://github.com/OfficeDev/office-ui-fabric-react). 
The `office-ui-fabric-react` components themselves are included in the bundle.

Below is an example `package.json` excerpt showing the dependency on `@microsoft/file-browser` with appropriate peer dependencies that you should match in your project:

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

### 3. Render the File Browser

Once the required dependencies have been added to your React project, you are ready to render the `GraphFileBrowser` component.
To successfully fetch and display files, the component expects a valid `access_token` be returned via the required `getAuthenticationToken` prop.
Below is an example implementation:

```jsx
class App extends React.Component {
  public render() {
    return (
      <GraphFileBrowser 
        getAuthenticationToken={this.getAuthenticationToken} />
    );
  }

  private getAuthenticationToken() {
    return Promise.resolve('<access_token>');
  }
}
```

In the above example, you will need to replace `<access_token>` with a valid access token for authentication.
One way to quickly test a valid token is to sign-in to the [Microsoft Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer).
Once signed-in, you can copy the access token for your account from the `access_token` query parameter.

More information on acquiring valid authentication tokens for the Microsoft Graph can be found in [this tutorial](https://developer.microsoft.com/en-us/graph/docs/concepts/auth_overview).

## Next Step

Learn more about [selecting files with the File Browser](select-files.md) or [customizing the File Browser](customization.md).

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
