# React CK | Banner Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The Banner component is a versatile and visually appealing element designed specifically for React applications.
It serves as a prominent interface element, allowing developers to showcase images, messages,
or calls to action effectively. With this component, developers can create engaging and interactive banners tailored to their application's needs.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/banner` or `yarn add @react-ck/banner`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Banner } from "@react-ck/banner";

const myApp = () => (
    <Manager>
        <Banner ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).