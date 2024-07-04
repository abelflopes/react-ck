import { type InputProps } from "@react-ck/input";
import { type MenuItemProps } from "@react-ck/provisional";

export type UserValue = string | string[];

export type SelectedValues = string[];

export type ChangeHandler = (value: string, mode: "select" | "deselect") => void;

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "value" | "defaultValue"> {
  skin?: InputProps["skin"];
  placeholder?: InputProps["placeholder"];
  children?: React.ReactNode;
  search?: {
    placeholder: string;
    emptyStateMessage: (value: string) => React.ReactNode;
  };
  onChange?: React.SelectHTMLAttributes<HTMLSelectElement>["onChange"];
  value?: UserValue;
  defaultValue?: UserValue;
  name?: React.SelectHTMLAttributes<HTMLSelectElement>["name"];
  multiple?: React.SelectHTMLAttributes<HTMLSelectElement>["multiple"];
}

export interface SelectOptionProps extends Omit<MenuItemProps, "skin"> {
  value?: string;
  disabled?: boolean;
  selected?: boolean;
}

export type SelectChildrenData = {
  isSelectOption: boolean;
  selectOptionProps: SelectOptionProps | undefined;
  computedValue: string | undefined;
  searchText: string | undefined;
  element: React.ReactNode;
};
