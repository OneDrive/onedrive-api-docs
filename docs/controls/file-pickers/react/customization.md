---
author: natalieethell
ms.author: naethell
ms.date: 10/03/2018
ms.topic: conceptual
title: Customizing the File Browser
---

# Customizing the File Browser

## Applying Custom Themes

You can easily apply a custom theme to the File Browser by utilizing [Office UI Fabric](https://developer.microsoft.com/en-us/fabric)'s `Customizer` component.
The following walk through covers applying a theme to the `GraphFileBrowser` using `Customizer`:

1. In your React app, import `Customizer` from `office-ui-fabric-react/lib/Utilities` and `ITheme` from `office-ui-fabric/lib/Styling`.
1. Create a custom `ITheme` and pass it to the `settings` prop of `Customizer`. You can use [Office UI Fabric's Theme Generator](https://developer.microsoft.com/en-us/fabric#/styles/themegenerator) to create a custom palette.
1. Wrap the `GraphFileBrowser` component with the `Customizer` component to see your custom theme applied.

Below is a code sample after completing the above steps:

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { GraphFileBrowser } from '@microsoft/file-browser';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';
import { createTheme, ITheme } from 'office-ui-fabric-react/lib/Styling';

export const theme = createTheme({
  palette: {
    themePrimary: '#6264a7',
    themeLighterAlt: '#f7f7fb',
    themeLighter: '#e1e1f1',
    themeLight: '#c8c9e4',
    themeTertiary: '#989ac9',
    themeSecondary: '#7173b0',
    themeDarkAlt: '#585a95',
    themeDark: '#4a4c7e',
    themeDarker: '#37385d',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#c2c2c2',
    neutralSecondary: '#858585',
    neutralPrimaryAlt: '#4b4b4b',
    neutralPrimary: '#333',
    neutralDark: '#272727',
    black: '#1d1d1d',
    white: '#fff'
  },
  semanticColors: {
    bodyBackground: '#fff',
    bodyText: '#333'
  }
});

class App extends React.Component {
  getAuthenticationToken() {
    return Promise.resolve('<access_token>');
  }

  render() {
    return (
      <Customizer
        settings={ { theme } }>
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

## Render Custom Action Buttons

To support advanced scenarios, the File Browser SDK exposes React Component props for customizing its "Select" and "Cancel" action buttons.
By default, the `GraphFileBrowser` component renders "Select" and "Cancel" buttons in the footer.
Each button has a corresponding function for providing a custom element to render in place of the default button.
These are named `onRenderSuccessButton` and `onRenderCancelButton` respectively.

```ts
/**
  * Custom render function for the "Success" action button.
  */
onRenderSuccessButton?: IRenderFunction<IButtonProps>;
/**
  * Custom render function for the "Cancel" action button.
  */
onRenderCancelButton?: IRenderFunction<IButtonProps>;
```

Both `onRenderSuccessButton` and `onRenderCancelButton` props are of type `IRenderFunction` from `office-ui-fabric-react`.
This type accepts component props and invokes an optional rendering function with the props as its only argument.
In the case of the action buttons, the `GraphFileBrowser`'s default action button props of type `IButtonProps` are passed in.
The developer is then free to apply those props on and return a valid `JSX.Element` however they wish.

This walk through covers customizing both the text and style of the action buttons.

### Custom Button Text

The above mentioned render functions allow for complete customization of the action buttons.
For example, you may customize the text of the controls while retaining the remaining default props by using the following implementations:

```jsx
class App extends React.Component {
  public render() {
    return (
      <GraphFileBrowser
        getAuthenticationToken={this.getAuthenticationToken}
        onRenderSuccessButton={this.onRenderSuccessButton}
        onRenderCancelButton={this.onRenderCancelButton} />
    );
  }

  private getAuthenticationToken() {
    return Promise.resolve('<access_token>');
  }

  private onRenderSuccessButton(props) {
    return <PrimaryButton {...props} text="Ok" />
  }

  private onRenderCancelButton(props) {
    return <DefaultButton {...props} text="Discard" />
  }
}
```

This replaces the text to be "Ok" and "Discard" for the "Select" and "Cancel" buttons for the `GraphFileBrowser` component.

### Custom Button Styles

By using `IRenderFunction<IButtonProps>`, a developer may customize the File Browser buttons beyond changing their text values.
For example, custom styles can be applied per button by overriding the styles for default, hovered, and pressed states.

Building off of the above customized "Select" button, let's apply a custom `background-color` in default, hovered, and pressed states.
Since we're rendering an `office-ui-fabric-react` Button, we can style a `PrimaryButton` component using the library's `styles` approach covered in this [Wiki](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling#using-a-styleable-component) entry.

```jsx
private onRenderSuccessButton(props) {
  const styles = {
    root: {
      backgroundColor: '#5c2d91'
    },
    rootHovered: {
      backgroundColor: '#6b3e9f'
    },
    rootPressed: {
      backgroundColor: '#32145a'
    }
  };

  return <PrimaryButton {...props} text="Ok" styles={styles} />
}
```

After applying the above changes, refresh your application to see the "Ok" button rendered with a custom set of colors for its `background-color` when in hovered, pressed, and default states.

<!-- {
  "type": "#page.annotation",
  "description": "Customize the Microsoft File Browser SDK's theme and action buttons.",
  "keywords": "js,javascript,onedrive,graph,file,browser,picker,saver,open,save,cloud,theming,customizer,theme,customizing",
  "section": "sdks",
  "headerAdditions": [],
  "footerAdditions": []
} -->
