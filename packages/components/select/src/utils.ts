import React from "react";
import {
  componentToText,
  getChildrenListWithoutFragments,
  getDisplayName,
} from "@react-ck/react-utils";
import {
  type SelectChildrenData,
  type SelectOptionProps,
  type SelectedValues,
  type UserValue,
} from "./types";

export const valueAsArray = (value: UserValue): SelectedValues =>
  value ? (value instanceof Array ? value : [value]) : [];

export const getChildrenData = (children: React.ReactNode): SelectChildrenData[] =>
  getChildrenListWithoutFragments(children).map<SelectChildrenData>((i) => {
    if (getDisplayName(i) === "SelectOption" && React.isValidElement<SelectOptionProps>(i)) {
      if (!("children" in i.props || "value" in i.props))
        throw new Error("SelectOption has no computable value");

      const { value } = i.props;
      const textContent = componentToText(i);
      const computedValue = value ?? textContent;

      return {
        isSelectOption: true,
        element: i,
        selectOptionProps: i.props,
        searchText: textContent ?? value,
        computedValue,
      };
    }

    return {
      isSelectOption: false,
      element: i,
      searchText: undefined,
      computedValue: undefined,
      selectOptionProps: undefined,
    };
  });
