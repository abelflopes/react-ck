import React from "react";
import { type DropdownProps } from "../dropdown";
import { type InputProps } from "../input";
import { type MenuItemProps } from "../menu";

/** Type representing the user-selected value(s) in the select component */
export type UserValue = string | string[] | undefined;

/** Array of currently selected values in the select component */
export type SelectedValues = string[];

/** Handler function for selection/deselection events in the select component
 * @param value - The value being selected or deselected
 * @param mode - Whether the value is being selected or deselected
 */
export type ChangeHandler = (value: string, mode: "select" | "deselect") => void;

/**
 * Props interface for the Select component.
 * Provides a customizable dropdown selection interface with single/multiple selection support.
 */
export interface SelectProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange" | "value" | "defaultValue">,
    Pick<React.ComponentPropsWithRef<"select">, "ref"> {
  /** Visual theme of the select input.
   * @default "default"
   */
  skin?: InputProps["skin"];
  /** Preferred position of the select relative to the anchor. Defaults to "auto" */
  position?: DropdownProps["position"];
  /** Positions to exclude from auto-positioning */
  excludeAutoPosition?: DropdownProps["excludeAutoPosition"];
  /** Text displayed when no option is selected */
  placeholder?: InputProps["placeholder"];
  /** Select options, typically SelectOption components */
  children?: React.ReactNode;
  /** Configuration for searchable select functionality */
  search?: {
    /** Placeholder text for the search input */
    placeholder: string;
    /** Function to render custom empty state message when search yields no results
     * @param value - Current search term
     */
    emptyStateMessage: (value: string) => React.ReactNode;
  };
  /** Handler called when selection changes
   * @param e - Native select change event
   * @param selectedValues - Array of currently selected values
   */
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>, selectedValues: SelectedValues) => void;
  /** Controlled value(s) for the select */
  value?: UserValue;
  /** Initial value(s) for uncontrolled select */
  defaultValue?: UserValue;
  /** HTML name attribute for form submission */
  name?: React.SelectHTMLAttributes<HTMLSelectElement>["name"];
  /** Enable multiple selection mode
   * @default false
   */
  multiple?: React.SelectHTMLAttributes<HTMLSelectElement>["multiple"];
  /** Allow deselection of selected options
   * @default true
   */
  allowDeselect?: boolean;
  /** Mark the select as required in forms
   * @default false
   */
  required?: boolean;
  /** Disable the select input
   * @default false
   */
  disabled?: boolean;
  /** Select is loading
   * @default false
   */
  loading?: boolean;
  /** Display value divider */
  displayValueDivider?: React.ReactNode;
  /** Whether the select should take the full width of the parent container */
  fullWidth?: boolean;
  /** Custom display value renderer */
  displayValueRenderer?: (data: SelectChildrenData[]) => React.ReactNode;
}

/**
 * Props interface for individual Select options.
 * Used to define the properties and behavior of each selectable item.
 */
export interface SelectOptionProps extends Omit<MenuItemProps, "skin"> {
  /** Value associated with this option */
  value?: string;
  /** Disable selection of this option
   * @default false
   */
  disabled?: boolean;
  /** Mark this option as selected
   * @default false
   */
  selected?: boolean;
  /** Custom display value for the option when selected */
  displayValue?: React.ReactNode;
  /** Handler called when the option is selected */
  onSelected?: (value: string) => void;
  /** Handler called when the option is deselected */
  onDeselected?: (value: string) => void;
}

/**
 * Props interface for Select group components.
 * Used to group related options together with a label.
 */
export interface SelectGroupProps {
  /** Name/label for the group */
  name: string;
  /** Wrapper for select options */
  children?: React.ReactNode;
}

/**
 * Internal type for processing select children data.
 * Used to normalize and handle different types of child elements.
 */
export type SelectChildrenData = {
  /** Whether the child is a SelectOption component */
  isSelectOption: boolean;
  /** Props passed to the SelectOption if applicable */
  selectOptionProps: SelectOptionProps | undefined;
  /** Props passed to the SelectGroup if applicable */
  selectGroupProps: SelectGroupProps | undefined;
  /** Processed value for the option */
  computedValue: string | undefined;
  /** Text content of the option */
  textContent: string | undefined;
  /** Original React element */
  element: React.ReactNode;
  /** Custom display value for selected state */
  displayValue: SelectOptionProps["displayValue"];
  /** Group name if this is part of a group */
  groupName?: string;
};
