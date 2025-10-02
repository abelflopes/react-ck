import styles from "./styles/index.module.scss";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SelectOption } from "./SelectOption";
import { SelectDivider } from "./SelectDivider";
import { Menu } from "../menu";
import { Dropdown } from "../dropdown";
import { Input } from "../input";
import classNames from "classnames";
import { mergeRefs, raf } from "@react-ck/react-utils";
import { EmptyState } from "../empty-state";
import { getChildrenData, simplifyString, valueAsArray } from "./utils";
import { type SelectProps, type ChangeHandler } from "./types";
import { SelectContext, type SelectContextProps } from "./context";
import { useFormFieldContext } from "../form-field";
import { Spinner } from "../spinner";
import { Icon } from "@react-ck/icon";
import { IconChevronDown } from "@react-ck/icon/icons/IconChevronDown";

/** Default positions to exclude from auto-positioning */
const defaultExclude: SelectProps["excludeAutoPosition"] = [
  "left",
  "right",
  "start",
  "end",
  "full",
];

/**
 * A customizable select component that supports single and multiple selection modes.
 * Provides searchable options, custom styling, and keyboard navigation support.
 *
 * Features:
 * - Single and multiple selection modes
 * - Optional search functionality
 * - Customizable appearance through skins
 * - Keyboard navigation
 * - Form field integration
 * - Custom option rendering
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Select placeholder="Choose an option">
 *   <Select.Option value="1">Option 1</Select.Option>
 *   <Select.Option value="2">Option 2</Select.Option>
 * </Select>
 *
 * // With search and multiple selection
 * <Select
 *   multiple
 *   search={{
 *     placeholder: "Search options...",
 *     emptyStateMessage: (term) => `No results for "${term}"`
 *   }}
 * >
 *   <Select.Option value="1">Option 1</Select.Option>
 *   <Select.Option value="2">Option 2</Select.Option>
 * </Select>
 * ```
 *
 * @param props - Component props {@link SelectProps}
 * @returns React element
 */

const Select = ({
  id,
  skin = "default",
  placeholder,
  children,
  className,
  onFocus,
  onBlur,
  search: searchOptions,
  onChange: selectOnChange,
  name: selectName,
  value: userValue,
  multiple: selectMultiple,
  defaultValue,
  allowDeselect = true,
  required,
  disabled,
  displayValueDivider = ",",
  fullWidth,
  loading,
  position,
  excludeAutoPosition = defaultExclude,
  ref,
  displayValueRenderer,
  ...props
}: Readonly<SelectProps>): React.ReactElement => {
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const rootElRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [internalValue, setInternalValue] = useState(userValue ?? defaultValue);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const formFieldContext = useFormFieldContext();
  const sizeSetterRef = useRef<HTMLDivElement>(null);
  const valueSlotRef = useRef<HTMLDivElement>(null);

  const computedSkin = useMemo(
    () => formFieldContext?.skin ?? skin,
    [formFieldContext?.skin, skin],
  );

  const computedId = useMemo(() => formFieldContext?.id ?? id, [formFieldContext?.id, id]);

  /** Children mapped to ChildrenData object to facilitate operations */
  const childrenData = useMemo(() => getChildrenData(children), [children]);

  /** Options list children filtered by user search  */
  const filteredOptions = useMemo(
    () =>
      childrenData
        .filter(
          (i) =>
            !search.length ||
            (i.textContent && simplifyString(i.textContent).includes(simplifyString(search))),
        )
        .map((i) => i.element),
    [childrenData, search],
  );

  /** Returns the internal value always as an array to facilitate operations  */
  const selectedValuesList = useMemo(
    () =>
      valueAsArray(internalValue ?? []).filter((i) =>
        childrenData.map((c) => c.computedValue).includes(i),
      ),
    [childrenData, internalValue],
  );

  const updateInternalValue = useCallback<ChangeHandler>(
    (value, mode) => {
      setInternalValue((v) => {
        if (!selectMultiple && mode === "select") return value;
        else if (!selectMultiple && mode === "deselect" && allowDeselect) return;
        else if (mode === "deselect" && (allowDeselect || selectMultiple) && v !== undefined)
          return valueAsArray(v).filter((i) => i !== value);
        else if (v !== undefined) return [...valueAsArray(v), value];
        return [value];
      });
    },
    [allowDeselect, selectMultiple],
  );

  const handleFocus = useCallback(() => {
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    setOpen(true);
  }, []);

  const handleBlur = useCallback(() => {
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    blurTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  }, []);

  /**
   * Handle change events trigger by the user
   * Also replicates the event on the native select
   */
  const handleChange = useCallback<ChangeHandler>(
    (value, mode) => {
      updateInternalValue(value, mode);

      if (!selectMultiple) setOpen(false);

      raf(() => {
        if (!selectRef.current)
          throw new Error("Select: unable to dispatch event to native element");

        selectRef.current.dispatchEvent(
          new Event("change", {
            bubbles: true,
          }),
        );
      });
    },
    [selectMultiple, updateInternalValue],
  );

  /** Context object propagated to select options  */
  const contextValue = useMemo<SelectContextProps>(
    () => ({
      handleChange,
      selectedValues: selectedValuesList,
    }),
    [handleChange, selectedValuesList],
  );

  /** Compute value label to display */

  const displayValue = useMemo<React.ReactNode>(() => {
    if (selectedValuesList.length === 0) return;

    const selectedChildrenData = childrenData.filter(
      (i) => i.computedValue && selectedValuesList.includes(i.computedValue),
    );

    if (displayValueRenderer) {
      return displayValueRenderer(selectedChildrenData);
    }

    const node = (
      <>
        {selectedChildrenData.map((i, k) => (
          <span key={i.textContent} className={styles.display_value_item}>
            {i.displayValue ?? i.textContent}
            {selectedChildrenData.length > 1 &&
              k < selectedChildrenData.length - 1 &&
              displayValueDivider}
          </span>
        ))}
      </>
    );

    return node;
  }, [selectedValuesList, childrenData, displayValueRenderer, displayValueDivider]);

  /** Actions to do when dropdown closes  */
  useEffect(() => {
    if (!open) return;
    // Clear search
    setSearch("");
  }, [open]);

  /** Set internal state with user provided value  */
  useEffect(() => {
    if (userValue === undefined) return;

    setInternalValue(userValue);
  }, [userValue]);

  /** Set internal state with user provided default value  */
  useEffect(() => {
    if (internalValue || defaultValue === undefined) return;

    setInternalValue(defaultValue);
  }, [defaultValue, internalValue]);

  /** Update internal values when children selected attribute changes */
  useEffect(() => {
    childrenData.forEach(({ selectOptionProps, computedValue, isSelectOption }) => {
      const { selected } = selectOptionProps || {};
      // skip if item is not a select option or the attribute is not set
      if (!isSelectOption || selected === undefined || computedValue === undefined) return;

      updateInternalValue(computedValue, selected ? "select" : "deselect");
    });
  }, [childrenData, updateInternalValue]);

  /**
   * Synchronize the width of the value slot with the native select element.
   */
  useEffect(() => {
    if (!sizeSetterRef.current || fullWidth || formFieldContext?.fullWidth) return;
    const valueSlotRefCurrent = valueSlotRef.current;

    const resizeObserver = new ResizeObserver(() => {
      if (!valueSlotRefCurrent || !sizeSetterRef.current) return;

      if (valueSlotRefCurrent.clientWidth < sizeSetterRef.current.clientWidth) {
        valueSlotRefCurrent.style.width = `${sizeSetterRef.current.clientWidth + 10}px`;
      }
    });
    resizeObserver.observe(sizeSetterRef.current);

    return (): void => {
      valueSlotRefCurrent?.style.removeProperty("width");
      resizeObserver.disconnect();
    };
  }, [fullWidth, formFieldContext?.fullWidth]);

  const selectOptions = useMemo(
    () => childrenData.filter(({ isSelectOption }) => isSelectOption),
    [childrenData],
  );

  return (
    <>
      <div
        {...props}
        ref={rootElRef}
        role="button"
        tabIndex={disabled ? undefined : 0}
        className={classNames(
          styles.root,
          styles[`skin_${computedSkin}`],
          formFieldContext === undefined && styles.standalone,
          (disabled || formFieldContext?.disabled) && styles.disabled,
          loading && styles.loading,
          (fullWidth ?? formFieldContext?.fullWidth) && styles.full_width,
          className,
        )}
        onFocus={(e) => {
          handleFocus();
          onFocus?.(e);
        }}
        onBlur={(e) => {
          handleBlur();
          onBlur?.(e);
        }}>
        <div ref={valueSlotRef} className={styles.value_slot}>
          <div className={styles.value_content}>
            {displayValue || <span className={styles.placeholder}>{placeholder}</span>}
          </div>
          {loading && <Spinner size="l" />}
          <Icon size="l">
            <IconChevronDown />
          </Icon>
        </div>

        <select
          ref={mergeRefs(ref, selectRef)}
          id={computedId}
          name={selectName}
          multiple={selectMultiple}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled || formFieldContext?.disabled}
          value={internalValue}
          className={styles.native_element}
          onChange={(e) => {
            selectOnChange?.(e, selectedValuesList);
          }}>
          <option />
          {selectOptions.map((i) => (
            <option key={`${i.computedValue}-${i.textContent}`} value={i.computedValue}>
              {i.textContent}
            </option>
          ))}
        </select>
        <div ref={sizeSetterRef} className={styles.size_setter}>
          <span className={styles.placeholder}>{placeholder}</span>
          {selectOptions.map((i) => (
            <span key={i.computedValue}>{i.element}</span>
          ))}
        </div>
      </div>

      <Dropdown
        anchorRef={rootElRef}
        open={open}
        spacing="s"
        ref={dropdownRef}
        excludeAutoPosition={excludeAutoPosition}
        position={position}
        restoreFocus={false}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClose={() => {
          setOpen(false);
        }}>
        <Menu className={styles.menu}>
          {searchOptions ? (
            <>
              <Input
                ref={(e) => {
                  e?.focus();
                }}
                value={search}
                type="search"
                placeholder={searchOptions.placeholder}
                skin="ghost"
                className={styles.search_input}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                ignoreContextErrors
              />
              <Menu.Divider />
            </>
          ) : null}

          <SelectContext.Provider value={contextValue}>{filteredOptions}</SelectContext.Provider>

          {searchOptions && filteredOptions.length === 0 ? (
            <EmptyState>
              <span>{searchOptions.emptyStateMessage(search)}</span>
              {/* TODO: fix empty state flex */}
            </EmptyState>
          ) : null}
        </Menu>
      </Dropdown>
    </>
  );
};

type SelectWithOption = typeof Select & {
  Option: typeof SelectOption;
  Divider: typeof SelectDivider;
};

// Add the Option and Divider properties

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- needed for compound component definition with forward ref
const CompoundSelect: SelectWithOption = Select as SelectWithOption;

CompoundSelect.Option = SelectOption;
CompoundSelect.Divider = SelectDivider;

export { CompoundSelect as Select };

export { type SelectOptionProps, type SelectProps, type SelectDividerProps } from "./types";
