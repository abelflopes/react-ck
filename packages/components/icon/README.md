# RCK | React Icon Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The React Icon component is a compact and versatile element designed for displaying scalable vector icons within React applications. This component simplifies the integration of icons, offering developers a convenient way to enhance user interfaces with visual cues and meaningful symbols.

By providing a wide range of icons representing various actions, objects, and concepts, the React Icon component empowers developers to improve user experience and communication. Icons can be easily customized in terms of size, color, and style to match the application's design language, ensuring a cohesive visual presentation.

With its lightweight and efficient implementation, the React Icon component enhances the accessibility and intuitiveness of web applications. Icons can convey information quickly and universally, making them invaluable for navigation, notifications, and interactive elements. Whether used for buttons, menus, or tooltips, the React Icon component simplifies the process of incorporating visually appealing icons into React projects, contributing to a more engaging user interface.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/icon` or `yarn add @react-ck/icon`.

You will also need to set up the theme provider, install it using npm or yarn: `npm i --save @react-ck/theme` or `yarn add @react-ck/theme`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Icon } from "@react-ck/icon";

const myApp = () => (
    <Manager>
        <Icon ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).
