# RCK | React Progress Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The React Progress component is a dynamic and engaging tool tailored for React applications, offering developers a seamless solution for displaying loading progress. Whether it's fetching data, submitting forms, or any other asynchronous task, this component keeps users in the loop, visually signaling that something is happening behind the scenes.

With the React Progress component, developers can effortlessly integrate progress indicators into their applications, providing users with a clear visual representation of ongoing processes. This component supports various configurations, allowing developers to customize the appearance of the progress indicator, choose different styles, and adapt it to the overall design language of the application.


### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/progress` or `yarn add @react-ck/progress`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Progress } from "@react-ck/progress";

const myApp = () => (
    <Manager>
        <Progress ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).