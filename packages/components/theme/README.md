# RCK | React Theme Package

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The React Theme Package is a comprehensive solution for managing themes and styling in React applications. This package provides a default theme configuration and a Theme Provider component wrapper, complete with context and theme context utilities, to simplify the process of theming React applications.

## Default Theme Configuration

The React Theme Package includes a well-defined default theme configuration, encompassing color schemes, typography settings, spacing values, and other design-related properties. This default theme serves as a solid foundation, ensuring consistency across the application and providing developers with a starting point for customization.

## Theme Provider Component Wrapper

The package offers a Theme Provider component wrapper, designed to encapsulate the application with the theme context. By using the Theme Provider, developers can effortlessly pass the theme information down the component tree, making it accessible to any component within the application. This streamlined approach simplifies theme management and ensures that components can access the current theme without prop drilling.

## Theme Context and Utilities

The React Theme Package includes theme context utilities that enable developers to consume theme properties easily. With these utilities, components can access theme values such as colors, typography, and spacing directly from the theme context, allowing for dynamic styling based on the current theme. Additionally, the package provides utilities for toggling between different themes, empowering users to switch between light and dark modes or other theme variants seamlessly.

By leveraging the Theme Provider component and theme context utilities, developers can create visually consistent and customizable user interfaces. This approach enhances the maintainability of the codebase and allows for effortless theming, ensuring a delightful user experience across various themes and design preferences.

In summary, the React Theme Package offers a robust solution for managing themes in React applications. Its default theme configuration, Theme Provider component wrapper, and theme context utilities provide developers with the tools needed to create stylish, themable, and user-friendly interfaces while promoting code efficiency and reusability.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/theme` or `yarn add @react-ck/theme`.

Wrap your app root with the theme provider to properly use the components:

```tsx
import { ThemeProvider } from "@react-ck/theme";
import { Button } from "@react-ck/button";

const myApp = () => (
    <ThemeProvider>
        Your app
        <Button ... />
    </ThemeProvider>
);
```