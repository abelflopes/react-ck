# RCK | React Tabs Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

for React applications. It's a powerhouse for developers, providing an efficient way to organize and showcase content while ensuring a streamlined user experience.

With the Tabs component, developers can effortlessly create expandable sections of content, allowing users to toggle open or closed sections to focus on specific details. This functionality is a game-changer for handling extensive text, intricate descriptions, or any additional information without cluttering the user interface

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/tabs` or `yarn add @react-ck/tabs`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Tabs } from "@react-ck/tabs";

const myApp = () => (
    <Manager>
        <Tabs ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).