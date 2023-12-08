# RCK | React Textarea Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The React Multiline Text Input component in the React-CK library is a fundamental pillar for driving user interactions in React applications. It provides a user-friendly way to collect and validate multiline text, accommodating everything from simple notes to more intricate data such as addresses or code snippets.

This component empowers developers to create various types of multiline text fields, including regular text inputs, password-protected inputs, checkboxes, radio buttons, and more. Dive into the customization pool and define attributes like placeholder text, default values, and validation rules to tailor the component to your exact needs.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/textarea` or `yarn add @react-ck/textarea`.

You will also need to set up the theme provider, install it using npm or yarn: `npm i --save @react-ck/theme` or `yarn add @react-ck/theme`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Textarea } from "@react-ck/textarea";

const myApp = () => (
    <Manager>
        <Textarea ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).