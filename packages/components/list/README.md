# RCK | React List Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The React List component is a powerful and efficient tool for displaying lists of items within React applications. Whether used for menus, navigation, or dynamic content display, this component simplifies the process of rendering and managing lists of varying lengths and complexities.

With the React List component, developers can effortlessly handle arrays of data, transforming them into visually appealing and interactive lists. This component supports different list item types, allowing developers to create simple text-based lists, image galleries, or complex interactive elements within each list item.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/list` or `yarn add @react-ck/list`.

You will also need to set up the theme provider, install it using npm or yarn: `npm i --save @react-ck/theme` or `yarn add @react-ck/theme`.

Wrap your app root with the theme provider and use this component:

```tsx
import { ThemeProvider } from "@react-ck/theme";
import { List } from "@react-ck/list";

const myApp = () => (
    <ThemeProvider>
        <List ... />
    </ThemeProvider>
);
```
