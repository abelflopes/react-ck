# RCK | React Badge Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

A Badge React component is a small, visually distinct element typically used to highlight or signify specific information within a user interface. It serves as a visual indicator, often containing concise text or a numerical value, and is commonly employed to showcase notifications, counts, or status indicators. The Badge component is versatile, allowing developers to customize its appearance to match the overall design language of their application, making it a handy tool for enhancing user experience and drawing attention to important elements.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/badge` or `yarn add @react-ck/badge`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Badge } from "@react-ck/badge";

const myApp = () => (
    <Manager>
        <Badge ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).