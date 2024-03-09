# React CK | Select Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The React Select component in the React-CK library is a fundamental tool for empowering user interactions in React applications. It provides an elegant and user-friendly way to handle selections, offering a polished experience for users to pick from a predefined set of options.

Developers can utilize this component to create various types of select fields, including single and multiple selections, with customizable styles and behaviors. Dive into the customization pool and define attributes like placeholder text, default values, and option groups to tailor the select component to suit your application's needs.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/select` or `yarn add @react-ck/select`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Select } from "@react-ck/select";

const myApp = () => (
    <Manager>
        <Select ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).