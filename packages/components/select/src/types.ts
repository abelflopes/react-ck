import { type InputProps } from "@react-ck/input";
import { type MenuItemProps } from "@react-ck/provisional";

export type UserValue = string | string[] | undefined;

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
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>, selectedValues: SelectedValues) => void;
  value?: UserValue;
  defaultValue?: UserValue;
  name?: React.SelectHTMLAttributes<HTMLSelectElement>["name"];
  multiple?: React.SelectHTMLAttributes<HTMLSelectElement>["multiple"];
  displayValueFormatter?: (data: {
    displayValue: string;
    selectedValues: string[];
    childrenData: SelectChildrenData[];
  }) => React.ReactNode;
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
  textContent: string | undefined;
  element: React.ReactNode;
};
