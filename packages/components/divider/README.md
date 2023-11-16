# RCK | React Divider Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The React Divider component is a minimalist element designed to create a clear visual distinction between sections or elements within a user interface. This simple component serves a singular purpose: rendering a horizontal or vertical line, enhancing the overall layout and readability of the content.

Developers can easily integrate the React Divider component into their applications to separate different sections of a page or group related elements, providing a subtle visual cue to users. The component offers the flexibility to render both horizontal and vertical lines, allowing developers to choose the appropriate orientation based on the layout requirements.

With its straightforward implementation, the React Divider component is ideal for projects where simplicity and clarity are paramount. Its unobtrusive design ensures that it seamlessly blends into various user interfaces, maintaining a clean and organized appearance without overwhelming the overall visual hierarchy.

In summary, the React Divider component is a lightweight and essential tool for developers seeking a straightforward solution to create visual separation between elements. Its ability to render horizontal or vertical lines makes it a versatile choice for enhancing the structure and readability of web applications without unnecessary complexity.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/divider` or `yarn add @react-ck/divider`.

You will also need to set up the theme provider, install it using npm or yarn: `npm i --save @react-ck/theme` or `yarn add @react-ck/theme`.

Wrap your app root with the theme provider and use this component:

```tsx
import { ThemeProvider } from "@react-ck/theme";
import { Divider } from "@react-ck/divider";

const myApp = () => (
    <ThemeProvider>
        <Divider ... />
    </ThemeProvider>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).