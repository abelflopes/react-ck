# React CK | Alert Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.


The Alert component is a crucial tool in React applications, offering developers a dynamic and adaptable solution for effectively communicating important messages to users. Crafted with flexibility in mind, this component empowers developers to create visually appealing and user-friendly alerts that seamlessly blend into the overall design of their applications.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/alert` or `yarn add @react-ck/alert`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Alert } from "@react-ck/alert";

const myApp = () => (
    <Manager>
        <Alert ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).