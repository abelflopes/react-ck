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
  r = r.replaceAll(new RegExp(String.raw`\s`, "gu"), "");
  r = r.replaceAll(new RegExp("[àáâãäå]", "gu"), "a");
  r = r.replaceAll(new RegExp("æ", "gu"), "ae");
  r = r.replaceAll(new RegExp("ç", "gu"), "c");
  r = r.replaceAll(new RegExp("[èéêë]", "gu"), "e");
  r = r.replaceAll(new RegExp("[ìíîï]", "gu"), "i");
  r = r.replaceAll(new RegExp("ñ", "gu"), "n");
  r = r.replaceAll(new RegExp("[òóôõö]", "gu"), "o");
  r = r.replaceAll(new RegExp("œ", "gu"), "oe");
  r = r.replaceAll(new RegExp("[ùúûü]", "gu"), "u");
  r = r.replaceAll(new RegExp("[ýÿ]", "gu"), "y");

  // r = r.replace(new RegExp("\\W", "gu"), ""); // Special chars
  return r;
};
