# RCK | React Button Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The Button component is a versatile and highly customizable element tailored for React applications. It provides developers with a powerful tool to create interactive user interfaces. The component offers options to define the button's color scheme and integrate icons or custom SVG components seamlessly. Developers can utilize the skin prop to specify the color scheme as "primary" or "secondary" and the icon prop to include any valid React node. This flexibility allows for the creation of visually appealing buttons with various styles and functionalities, enhancing the overall user experience in React applications. The Button component simplifies the process of building interactive UI elements, making it a valuable asset for developers.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/button` or `yarn add @react-ck/button`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Button } from "@react-ck/button";

const myApp = () => (
    <Manager>
        <Button ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).