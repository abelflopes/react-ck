# React CK | Skeleton Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The Skeleton component is a versatile and adaptable element designed specifically for React applications, providing developers with a dynamic solution for displaying placeholder content while actual data is loading. This component serves as a visual representation of the content structure, giving users a sense of anticipation and engagement even before the actual data is available.

With the Skeleton component, developers can effortlessly create placeholders for various types of content, such as text blocks, images, or cards. Its customizable features enable developers to define the skeleton's appearance, such as background color, animation style, and spacing, ensuring seamless integration into any user interface design.


### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/skeleton` or `yarn add @react-ck/skeleton`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Skeleton } from "@react-ck/skeleton";

const myApp = () => (
    <Manager>
        <Skeleton ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).