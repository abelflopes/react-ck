# React CK | Manager Package

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

This component is the main wrapper of your application when using the components of this library. It will provide theme context to the components and also manage visual layers.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the manager provider to properly use the components:

```tsx
import { ManagerProvider } from "@react-ck/manager";
import { Button } from "@react-ck/button";

const myApp = () => (
    <Manager>
        Your app
        <Button ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).