# React CK | FormField Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

> :warning: **WARNING**: This component is used as an internal utility, if you want to render an element such as an input, use its component directly.

The FormField component is a versatile and visually adaptable element that provides a consistent layout and input peripherals for React applications. It ensures a uniform structure for various form-related elements, offering developers a convenient way to structure form fields within their applications.

The component allows for easy integration of input elements within the content section, providing a cohesive and structured appearance.


### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/form-field` or `yarn add @react-ck/form-field`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { FormField } from "@react-ck/form-field";

const myApp = () => (
    <Manager>
        <FormField ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).