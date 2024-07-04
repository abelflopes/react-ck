import React from "react";

/**
 * Returns the children list, always as an array, omitting react fragments
 */
export const getChildrenListWithoutFragments = (children: React.ReactNode): React.ReactNode[] => {
  const arr = React.Children.toArray(children);

  const mapped = React.Children.map(arr, (i) => {
    if (React.isValidElement<{ children?: React.ReactNode }>(i)) {
      const isFragment = i.type.toString().includes("fragment");
      if (isFragment) return getChildrenListWithoutFragments(i.props.children);
    }

    return i;
  });

  return mapped;
};
