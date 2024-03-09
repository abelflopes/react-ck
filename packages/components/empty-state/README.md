# React CK | Empty State Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The Empty State component serves as a crucial element in React applications, providing a clean and user-friendly experience when no content is available.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/empty-state` or `yarn add @react-ck/empty-state`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { EmptyState } from "@react-ck/empty-state";

const myApp = () => (
    <Manager>
        <EmptyState ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).