# RCK | React Spinner Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

A versatile and customizable spinner component for React applications, providing developers with a dynamic solution to enhance user engagement and indicate loading states. This component serves as a visual representation of activity within the application, keeping users informed and engaged while waiting for data to load.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/spinner` or `yarn add @react-ck/spinner`.

You will also need to set up the theme provider, install it using npm or yarn: `npm i --save @react-ck/theme` or `yarn add @react-ck/theme`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Spinner } from "@react-ck/spinner";

const myApp = () => (
    <Manager>
        <Spinner ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).