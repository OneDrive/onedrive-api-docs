---
author: natalieethell
ms.author: nethell
ms.date: 10/03/2018
ms.topic: conceptual
title: Add custom theme to file browser component
---

# Apply a Custom Theme

You can easily apply a custom theme to the File Browser by utilizing Office UI Fabric's `Customizer` component. The following steps demonstrate how to apply a custom theme to the `GraphFileBrowser`:

1. In your React app, import `Customizer` from `office-ui-fabric-react/lib/Utilities` and `ITheme` from `office-ui-fabric/lib/Styling`.
1. Create a custom `ITheme` and pass it into the `settings` prop of `Customizer`. You can use [Office UI Fabric's Theme Generator](https://developer.microsoft.com/en-us/fabric#/styles/themegenerator) to create a custom palette.
1. Wrap `GraphFileBrowser` with `Customizer` to see your custom theme reflected in your component.

After following the above steps, your code should resemble:

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
                getAuthenticationToken={this.getAuthenticationToken} />
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
  "description": "Applying a custom theme to the Microsoft File Browser SDK.",
  "keywords": "js,javascript,onedrive,graph,file,browser,picker,saver,open,save,cloud,theming,customizer,theme",
  "section": "sdks",
  "headerAdditions": [],
  "footerAdditions": []
} -->
