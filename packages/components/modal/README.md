# RCK | React Modal Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The React Modal component is a versatile and sleek solution for handling modal dialogs within React applications. Whether it's for notifications, alerts, or displaying additional information, this component streamlines the process of creating and managing modal interactions with users.

With the React Modal component, developers can effortlessly introduce modals into their applications, providing a clean and visually appealing way to grab users' attention. This component supports various configurations, allowing developers to create modals with custom content, control their appearance, and define behaviors like dismissibility.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/list` or `yarn add @react-ck/list`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Modal } from "@react-ck/list";

const myApp = () => (
    <Manager>
        <Modal>
            <ModalHeader ... />
            ...
            <ModalFooter ... />
        </Modal>
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).