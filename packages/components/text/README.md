# RCK | React Text Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The Text component is a highly adaptable tool designed for displaying textual content in diverse ways within a user interface. With its flexibility and versatility, developers can seamlessly integrate the Text component into their applications, leveraging its multiple variations and component polymorphism. By offering a range of visual styles and the ability to serve as a container for various text elements, this component enhances the overall design and user experience without delving into implementation specifics.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/text` or `yarn add @react-ck/text`.

You will also need to set up the theme provider, install it using npm or yarn: `npm i --save @react-ck/theme` or `yarn add @react-ck/theme`.

Wrap your app root with the theme provider and use this component:

```tsx
import { ThemeProvider } from "@react-ck/theme";
import { Text } from "@react-ck/text";

const myApp = () => (
    <ThemeProvider>
        <Text ... />
    </ThemeProvider>
);
```
