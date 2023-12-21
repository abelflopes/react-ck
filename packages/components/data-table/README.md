# RCK | React Data Table Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The React Table component is a versatile element designed to efficiently display structured data in a tabular format within React applications. Unlike traditional table components, this component accepts an array of records, where each record is represented as an object with named keys and corresponding React nodes. This flexibility allows developers to easily populate tables with dynamic and diverse content without the need for complex nesting.

By accepting an `Array<Record<string, React.ReactNode>>` as input, developers can populate the table with data in a concise and straightforward manner. Each record in the array corresponds to a row in the table, and the keys within the records determine the columns. This streamlined approach simplifies the process of rendering data-driven tables, making it ideal for dynamic applications where the content may vary based on user input or API responses.

The React Table component provides essential features such as sorting, pagination, and search functionality out of the box, enhancing user experience and enabling seamless interaction with large datasets. Developers can also customize the appearance and behavior of the table to match the application's design language, ensuring a cohesive and visually appealing presentation.

In summary, the React Table component offers a pragmatic solution for displaying structured data in React applications. Its ability to handle an array of records with named keys and React nodes simplifies the data rendering process, making it an efficient choice for developers aiming to create responsive and interactive tables in their projects.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/data-table` or `yarn add @react-ck/data-table`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { DataTable } from "@react-ck/data-table";

const myApp = () => (
    <Manager>
        <DataTable ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).