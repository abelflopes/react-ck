# React CK | Utils Library

> :warning: **WARNING**: This component library is being updated frequently and it's currently unstable due to being in it's early stages, we advice you to use only in production environments only after version **2.0.0**.

### Installation 

To integrate the this library into your React apps, you can install it using npm or yarn: `npm i --save @react-ck/react-utils` or `yarn add @react-ck/react-utils`.

## Utilities

### Polimorphy

Component polimorphy allows consumer to choose which HTML tags and attributes will be rendered from a specific component.

### Usage Examples

### Implementation

```diff
import React, { isValidElement, useEffect, useMemo } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
- import { getDisplayName } from "@react-ck/react-utils";
+ import {
+  getDisplayName,
+  PolymorphicComponent,
+  type ConsumerPolymorphicProps,
+  type HTMLTag,
+ } from "@react-ck/react-utils";

- export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
+ export interface ButtonProps<T extends HTMLTag>
+  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
+    ConsumerPolymorphicProps<T> {
  skin?: "primary" | "secondary" | "ghost" | "negative";
  size?: "s" | "m" | "l";
  icon?: React.ReactNode;
}

- export const Button = ({
+ export const Button = <T extends HTMLTag>({
+  as,
  skin = "primary",
  size = "m",
  icon,
  children,
  className,
  ...otherProps
- }: Readonly<ButtonProps>): React.ReactElement => {
+ }: Readonly<ButtonProps<T>>): React.ReactElement => {
  const isIconOnly = useMemo(
    () => icon !== undefined && React.Children.count(children) === 0,
    [children, icon],
  );

  return (
-    <button
-      className={classNames(
-        styles.root,
-        styles[skin],
-        styles[`size-${size}`],
-        {
-          [`${styles["icon-only"]}`]: isIconOnly,
-        },
-        className,
-      )}
-      {...otherProps}>
+    <PolymorphicComponent
+      as={as}
+      fallback={["button", otherProps]}
+      commonProps={{
+        className: classNames(
+          styles.root,
+          styles[skin],
+          styles[`size-${size}`],
+          {
+            [`${styles["icon-only"]}`]: isIconOnly,
+          },
+          className,
+        ),
+      }}>
      {icon && !isIconOnly ? <span className={styles.icon}>{icon}</span> : null}
      {children}
      {isIconOnly ? icon : null}
-     </button>
+    </PolymorphicComponent>
  );
};
```


<!-- storybook-ignore -->

---

Check the documentation website - [react-ck.js.org](https://react-ck.js.org).