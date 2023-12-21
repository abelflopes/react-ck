# RCK | React Overlay Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The React Overlay component is a versatile and essential element for creating modal dialogs, tooltips, popovers, and other overlay-based UI elements within React applications. This component provides developers with a powerful way to display additional information or actions without navigating away from the current context.

With the React Overlay component, developers can create visually appealing overlays that appear above the main content, drawing users' attention to specific information or interactive features. These overlays often include content such as forms, images, or detailed explanations, enhancing the user experience by providing contextually relevant information.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/overlay` or `yarn add @react-ck/overlay`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Overlay } from "@react-ck/overlay";

const myApp = () => (
    <Manager>
        <Overlay ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).