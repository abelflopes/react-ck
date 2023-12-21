# RCK | React Table Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

Thee Styled React Table component is a versatile solution for creating visually appealing and structured tables in React applications. 
This component provides styles and layouts to table-specific elements by using them as children.

By incorporating `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` elements as children, developers gain precise control over the appearance and structure of their tables. Each child element represents a distinct part of the table, enabling developers to style headers, body rows, and individual cells according to their design requirements.

> **NOTE:** You may prefer to use `DataTable` component as it can receive directly a JSON structure that supports React nodes.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/table` or `yarn add @react-ck/table`.

You will also need to set up the manager, install it using npm or yarn: `npm i --save @react-ck/manager` or `yarn add @react-ck/manager`.

Wrap your app root with the theme provider and use this component:

```tsx
import { Manager } from "@react-ck/manager";
import { Table } from "@react-ck/table";

const myApp = () => (
    <Manager>
        <Table ... />
    </Manager>
);
```

<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).