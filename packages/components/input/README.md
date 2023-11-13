# RCK | React Input Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The React Input component is a fundamental building block for user interactions within React applications. It provides a user-friendly way to collect and validate user input, ranging from simple text entries to more complex data such as dates or email addresses.

This component allows developers to create various types of input fields, including text inputs, password inputs, checkboxes, radio buttons, and more. Developers can customize the appearance and behavior of the input fields, defining attributes like placeholder text, default values, and validation rules.

One of the key features of the React Input component is its ability to handle user interactions in real time. Developers can implement event listeners to capture user keystrokes, clicks, or selections, enabling dynamic responses to user input. This real-time interaction enhances the user experience, providing instant feedback and validation messages as users enter data.

Furthermore, the React Input component supports accessibility features, ensuring that users with disabilities can interact with input fields using screen readers and keyboard navigation. Developers can add ARIA roles and labels to enhance the input component's accessibility, making it inclusive for all users.

In summary, the React Input component is a crucial element for creating interactive and accessible forms in React applications. Its versatility, real-time interaction capabilities, and support for various input types make it an essential tool for developers striving to build user-friendly and inclusive interfaces.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/input` or `yarn add @react-ck/input`.

You will also need to set up the theme provider, install it using npm or yarn: `npm i --save @react-ck/theme` or `yarn add @react-ck/theme`.

Wrap your app root with the theme provider and use this component:

```tsx
import { ThemeProvider } from "@react-ck/theme";
import { Input } from "@react-ck/input";

const myApp = () => (
    <ThemeProvider>
        <Input ... />
    </ThemeProvider>
);
```
