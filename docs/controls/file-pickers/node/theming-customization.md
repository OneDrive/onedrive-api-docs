---
author: natalieethell
ms.author: nethell
ms.date: 10/03/2018
ms.topic: conceptual
title: Add custom theme to file browser component
---

# Theming customization

You can give your File Browser a custom theme by utilizing Fabric's `Customizer` component.

In your React app, import `Customizer` from `office-ui-fabric-react/lib/Utilities` and `ITheme` from `office-ui-fabric/lib/Styling`. Create a custom `ITheme` and pass it into the `settings` prop of `Customizer`. Finally, wrap `Customizer` around `GraphFileBrowser` to see your custom theme reflected in your component.

The following example uses a theme pulled directly from [Fabric's theme generator](https://developer.microsoft.com/en-us/fabric#/styles/themegenerator) and passes it into an instance of Fabric's `createTheme` method.

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";

import { GraphFileBrowser } from '@microsoft/file-browser';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';
import { createTheme, ITheme } from 'office-ui-fabric-react/lib/Styling';

export const theme: ITheme = createTheme({
  palette: {
    themePrimary: "#6264a7",
    themeLighterAlt: "#f7f7fb",
    themeLighter: "#e1e1f1",
    themeLight: "#c8c9e4",
    themeTertiary: "#989ac9",
    themeSecondary: "#7173b0",
    themeDarkAlt: "#585a95",
    themeDark: "#4a4c7e",
    themeDarker: "#37385d",
    neutralLighterAlt: "#f8f8f8",
    neutralLighter: "#f4f4f4",
    neutralLight: "#eaeaea",
    neutralQuaternaryAlt: "#dadada",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c8c8",
    neutralTertiary: "#c2c2c2",
    neutralSecondary: "#858585",
    neutralPrimaryAlt: "#4b4b4b",
    neutralPrimary: "#333",
    neutralDark: "#272727",
    black: "#1d1d1d",
    white: "#fff"
  },
  semanticColors: {
    bodyBackground: "#fff",
    bodyText: "#333"
  }
});

class App extends React.Component {
  getAuthenticationToken() {
    return new Promise(resolve => {
      resolve(
        "<access_token>"
      );
    });
  }

  render() {
    return (
        <Customizer settings={{theme}}>
            <GraphFileBrowser
                getAuthenticationToken={this.getAuthenticationToken}
            />
        </Customizer>
    );
  }
}

ReactDOM.render(
  <App />,
  mountNode
);
```

<!-- {
  "type": "#page.annotation",
  "description": "Use the Microsoft File Browser SDK to select OneDrive files.",
  "keywords": "js,javascript,onedrive,graph,file,browser,picker,saver,open,save,cloud,theming,customizer,theme",
  "section": "sdks",
  "headerAdditions": [],
  "footerAdditions": []
} -->
