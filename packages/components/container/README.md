# React CK | Container Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The Container component in React is a fundamental building block that provides structure and organization to web applications. Acting as a versatile layout element, the Container component serves as a designated space for housing other UI elements, ensuring consistent spacing, alignment, and overall visual harmony.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/container` or `yarn add @react-ck/container`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Container } from "@react-ck/container";

const myApp = () => (
    <Manager>
        <Container ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).