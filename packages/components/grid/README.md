# RCK | React Grid Component

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

The React Grid component features a robust 12-column system, providing developers with a flexible framework to create responsive and well-structured layouts. This system allows elements to be precisely positioned within the grid, offering granular control over their placement and alignment. With the ability to utilize these 12 columns, developers can design layouts that are visually balanced and optimized for different screen sizes.

Moreover, the React Grid component offers the convenience of both wrapping and nowrap behaviors. When set to wrap, the grid intelligently adjusts its content, allowing items to flow into new rows as needed. This ensures that the layout gracefully accommodates varying amounts of content without sacrificing its structure. Conversely, the nowrap option prevents items from wrapping onto new lines, maintaining a compact and streamlined appearance.

By combining the 12-column system with the flexibility to wrap or nowrap elements, developers can effortlessly create responsive designs that adapt to diverse devices and content lengths. This versatile component empowers developers to craft visually appealing interfaces that maintain consistency and readability across different screen sizes, enhancing the overall user experience.

### Installation 

To integrate the this component into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/grid` or `yarn add @react-ck/grid`.

You will also need to set up the theme provider, install it using npm or yarn: `npm i --save @react-ck/theme` or `yarn add @react-ck/theme`.

Wrap your app root with the theme provider and use this component:

```tsx
import { ThemeProvider } from "@react-ck/theme";
import { GridContainer, GridColumn } from "@react-ck/grid";

const myApp = () => (
    <ThemeProvider>
        <GridContainer ... />
    </ThemeProvider>
);
```