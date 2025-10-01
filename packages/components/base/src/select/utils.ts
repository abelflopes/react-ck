import React from "react";
import {
  componentToText,
  getChildrenListWithoutFragments,
  getDisplayName,
} from "@react-ck/react-utils";
import {
  type SelectChildrenData,
  type SelectOptionProps,
  type SelectDividerProps,
  type SelectedValues,
  type UserValue,
} from "./types";

export const valueAsArray = (value: UserValue): SelectedValues =>
  value ? (Array.isArray(value) ? value : [value]) : [];

export const getChildrenData = (children: React.ReactNode): SelectChildrenData[] =>
  getChildrenListWithoutFragments(children).map<SelectChildrenData>((i) => {
    if (getDisplayName(i) === "SelectOption" && React.isValidElement<SelectOptionProps>(i)) {
      if (!("children" in i.props || "value" in i.props))
        throw new Error("SelectOption has no computable value");

      const { value, displayValue } = i.props;
      const textContent = componentToText(i);
      const computedValue = value ?? textContent;

      return {
        isSelectOption: true,
        element: i,
        selectOptionProps: i.props,
        textContent: textContent ?? value,
        computedValue,
        displayValue,
      };
    }

    if (getDisplayName(i) === "SelectDivider" && React.isValidElement<SelectDividerProps>(i)) {
      return {
        isSelectOption: false,
        element: i,
        textContent: undefined,
        computedValue: undefined,
        selectOptionProps: undefined,
        displayValue: undefined,
      };
    }

    return {
      isSelectOption: false,
      element: i,
      textContent: undefined,
      computedValue: undefined,
      selectOptionProps: undefined,
      displayValue: undefined,
    };
  });

export const simplifyString = (s: string): string => {
  let r = s.toLowerCase().trim();
  r = r.replace(new RegExp(String.raw`\s`, "gu"), "");
  r = r.replace(new RegExp("[àáâãäå]", "gu"), "a");
  r = r.replace(new RegExp("æ", "gu"), "ae");
  r = r.replace(new RegExp("ç", "gu"), "c");
  r = r.replace(new RegExp("[èéêë]", "gu"), "e");
  r = r.replace(new RegExp("[ìíîï]", "gu"), "i");
  r = r.replace(new RegExp("ñ", "gu"), "n");
  r = r.replace(new RegExp("[òóôõö]", "gu"), "o");
  r = r.replace(new RegExp("œ", "gu"), "oe");
  r = r.replace(new RegExp("[ùúûü]", "gu"), "u");
  r = r.replace(new RegExp("[ýÿ]", "gu"), "y");

  // r = r.replace(new RegExp("\\W", "gu"), ""); // Special chars
  return r;
};
