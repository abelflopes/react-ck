# React CK | Provisional Components

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

Provisional components that are candidates for stable release.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/provisional` or `yarn add @react-ck/provisional`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { SomeComponent } from "@react-ck/provisional";

const myApp = () => (
    <Manager>
        <SomeComponent ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).