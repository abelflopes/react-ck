import styles from "./styles/index.module.scss";
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SelectOption } from "./SelectOption";
import { Menu } from "../menu";
import { Dropdown } from "../dropdown";
import { Input } from "../input";
import classNames from "classnames";
import { megeRefs, raf } from "@react-ck/react-utils";
import { EmptyState } from "../empty-state";
import { getChildrenData, simplifyString, valueAsArray } from "./utils";
import { type SelectProps, type ChangeHandler } from "./types";
import { SelectContext, type SelectContextProps } from "./context";
import { useFormFieldContext } from "../form-field";

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

const Select = forwardRef<HTMLSelectElement, Readonly<SelectProps>>(
  (
    {
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
      position,
      excludeAutoPosition = defaultExclude,
      ...props
    },
    ref,
  ) => {
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
      () => formFieldContext?.skin ?? skin ?? "default",
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

    const displayValue = useMemo(() => {
      if (selectedValuesList.length === 0) return;

      const displayValue = childrenData.filter(
        (i) => i.computedValue && selectedValuesList.includes(i.computedValue),
      );

      const node = (
        <>
          {displayValue.map((i, k) => (
            <span key={i.textContent} className={styles.display_value_item}>
              {i.displayValue ?? i.textContent}
              {displayValue.length > 1 && k < displayValue.length - 1 && displayValueDivider}
            </span>
          ))}
        </>
      );

      return node;
    }, [childrenData, selectedValuesList, displayValueDivider]);

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

        valueSlotRefCurrent.style.width = `${sizeSetterRef.current.clientWidth + 10}px`;
      });
      resizeObserver.observe(sizeSetterRef.current);

      return (): void => {
        valueSlotRefCurrent?.style.removeProperty("width");
        resizeObserver.disconnect();
      };
    }, [fullWidth, formFieldContext?.fullWidth]);

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
            {displayValue || <span className={styles.placeholder}>{placeholder}</span>}
          </div>

          <select
            ref={megeRefs([ref, selectRef])}
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
            {childrenData.map((i) => (
              <option key={`${i.computedValue}-${i.textContent}`} value={i.computedValue}>
                {i.textContent}
              </option>
            ))}
          </select>
          <div ref={sizeSetterRef} className={styles.size_setter}>
            <span className={styles.placeholder}>{placeholder}</span>
            {childrenData.map((i) => (
              <span key={i.computedValue}>{i.element}</span>
            ))}
          </div>
        </div>

        <Dropdown
          anchorRef={rootElRef}
          open={open}
          spacing="s"
          rootRef={dropdownRef}
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
  },
);

Select.displayName = "Select";

type SelectWithOption = typeof Select & {
  Option: typeof SelectOption;
};

// Add the Option property

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- needed for compound component definition with forward ref
const CompoundSelect: SelectWithOption = Select as SelectWithOption;

CompoundSelect.Option = SelectOption;

export { CompoundSelect as Select };

export { type SelectOptionProps, type SelectProps } from "./types";
