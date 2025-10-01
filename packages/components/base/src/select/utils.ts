import React from "react";
import {
  componentToText,
  getChildrenListWithoutFragments,
  getDisplayName,
} from "@react-ck/react-utils";
import {
  type SelectChildrenData,
  type SelectOptionProps,
  type SelectGroupProps,
  type SelectedValues,
  type UserValue,
} from "./types";

export const valueAsArray = (value: UserValue): SelectedValues =>
  value ? (Array.isArray(value) ? value : [value]) : [];

export const getChildrenData = (children: React.ReactNode): SelectChildrenData[] => {
  const result: SelectChildrenData[] = [];

  const processChildren = (children: React.ReactNode, groupName?: string) => {
    getChildrenListWithoutFragments(children).forEach((i) => {
      if (getDisplayName(i) === "SelectOption" && React.isValidElement<SelectOptionProps>(i)) {
        if (!("children" in i.props || "value" in i.props))
          throw new Error("SelectOption has no computable value");

        const { value, displayValue, disabled } = i.props;
        const textContent = componentToText(i);
        const computedValue = value ?? textContent;

        result.push({
          isSelectOption: true,
          element: i,
          selectOptionProps: {
            ...i.props,
            disabled,
          },
          selectGroupProps: undefined,
          textContent: textContent ?? value,
          computedValue,
          displayValue,
          groupName,
        });
      } else if (getDisplayName(i) === "SelectGroup" && React.isValidElement<SelectGroupProps>(i)) {
        const { name, children: groupChildren } = i.props;
        processChildren(groupChildren, name);
      } else {
        result.push({
          isSelectOption: false,
          element: i,
          textContent: undefined,
          computedValue: undefined,
          selectOptionProps: undefined,
          selectGroupProps: undefined,
          displayValue: undefined,
          groupName,
        });
      }
    });
  };

  processChildren(children);
  return result;
};

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
