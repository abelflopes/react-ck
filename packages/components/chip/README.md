# React CK | Chip Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The Chip component is a dynamic and adaptable element designed specifically for React applications, providing developers with a versatile solution for displaying and interacting with small pieces of information. This component serves as a compact container for various types of content, such as text, icons, or images, allowing developers to present data in an organized and visually appealing manner.

With the Chip component, developers can effortlessly showcase different types of information, including tags, categories, or user avatars. Its customizable features enable developers to define the chip's appearance, such as background color, text color, and border radius, ensuring seamless integration into any user interface design.

One of the key advantages of the Chip component lies in its ability to handle user interactions efficiently. Developers can implement click events or hover effects to enhance user engagement and create intuitive user experiences. Additionally, the component supports integration with icons or custom SVG elements, enabling developers to add visual context to the displayed information.

In summary, the React Chip component simplifies the process of displaying concise information within React applications. Its flexibility, interactive capabilities, and customization options make it an invaluable tool for developers, enhancing the overall user experience and improving the presentation of data in various contexts.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/chip` or `yarn add @react-ck/chip`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Chip } from "@react-ck/chip";

const myApp = () => (
    <Manager>
        <Chip ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).