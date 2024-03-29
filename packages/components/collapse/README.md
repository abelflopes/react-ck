# React CK | Collapse Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The Collapse component is a dynamic and space-saving element tailored for React applications, offering developers an efficient way to manage and present content in a concise manner. This component provides a seamless solution for displaying large amounts of information while optimizing screen real estate and enhancing user interaction.

With the Collapse component, developers can create expandable sections of content that can be toggled open or closed, allowing users to focus on specific details when needed. This feature is particularly useful for displaying lengthy text, detailed descriptions, or additional information without overwhelming the user interface.

Developers can customize the Collapse component to match the application's design language, defining aspects such as transition animations, icons for toggle buttons, and content positioning. This flexibility ensures that the Collapse component seamlessly integrates into the overall user interface, providing a cohesive and intuitive user experience.

One of the primary benefits of the Collapse component is its ability to improve the accessibility and readability of complex content. By organizing information into collapsible sections, developers can enhance the overall usability of their applications, making it easier for users to navigate and comprehend the presented data.

In summary, the React Collapse component streamlines the presentation of extensive content within React applications. Its interactive and customizable nature, coupled with its ability to optimize space and enhance user accessibility, makes it an essential tool for developers aiming to create user-friendly interfaces with a focus on efficient content management.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/collapse` or `yarn add @react-ck/collapse`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Collapse } from "@react-ck/collapse";

const myApp = () => (
    <Manager>
        <Collapse ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).