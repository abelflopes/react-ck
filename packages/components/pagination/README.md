# React CK | Pagination Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The React Pagination component is a user-friendly control system designed to navigate through data distributed across multiple pages, such as lists or documents. It empowers developers to enhance user experience by providing intuitive controls for page navigation.

With the React Pagination component, developers can seamlessly integrate pagination into their applications. It's a practical solution for breaking down and presenting data in a structured manner. This component comes with customizable options, allowing developers to define the number of visible slots or pages, set the current active page, and handle page changes through a provided callback function.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/pagination` or `yarn add @react-ck/pagination`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Pagination } from "@react-ck/Modal";

const myApp = () => (
    <Manager>
        <Pagination total={20} />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).