# React CK | Card Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The Card component is a versatile and essential building block for creating dynamic and interactive user interfaces in React applications. This component enables developers to showcase content in a structured and visually appealing manner. With the Card component, you can present various types of information, including text, images, and actions, effectively engaging users.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/card` or `yarn add @react-ck/card`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Card } from "@react-ck/card";

const myApp = () => (
    <Manager>
        <Card ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).