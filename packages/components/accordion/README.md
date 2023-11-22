# RCK | React Accordion Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The Accordion component is a dynamic and space-saving element tailored for React applications, offering developers an efficient way to manage and present content in a concise manner. This component provides a seamless solution for displaying large amounts of information while optimizing screen real estate and enhancing user interaction.

With the Accordion component, developers can create expandable sections of content that can be toggled open or closed, allowing users to focus on specific details when needed. This feature is particularly useful for displaying lengthy text, detailed descriptions, or additional information without overwhelming the user interface.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/accordion` or `yarn add @react-ck/accordion`.

You will also need to set up the theme provider, install it using npm or yarn: `npm i --save @react-ck/theme` or `yarn add @react-ck/theme`.

Wrap your app root with the theme provider and use this component:

```tsx
import { ThemeProvider } from "@react-ck/theme";
import { Accordion } from "@react-ck/accordion";

const myApp = () => (
    <ThemeProvider>
        <Accordion ... />
    </ThemeProvider>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).