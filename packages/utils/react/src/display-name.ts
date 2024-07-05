import React from "react";

export const DISPLAY_NAME_ATTRIBUTE = "_react-ck-display-name";

export const DISPLAY_NAMES = {
  SELECT_OPTION: "select-option",
  LAYER: "layer",
  ICON: "icon",
};

export function getDisplayName(el: React.ReactNode): string | undefined {
  if (!React.isValidElement(el)) return undefined;

  let displayName: string | undefined = undefined;

  if (typeof el.type === "string") {
    displayName = el.type;
  } else if (typeof el.type === "function") {
    const functionProperties = Object.fromEntries(Object.entries(el.type));
    const r: unknown = functionProperties[DISPLAY_NAME_ATTRIBUTE];
    if (typeof r !== "string" && r !== undefined) throw new Error("Unknown component name type");
    displayName = r;
  }

  return displayName;
}
