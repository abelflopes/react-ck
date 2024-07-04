import React from "react";

export function getDisplayName(el: React.ReactNode): string | undefined {
  if (!React.isValidElement(el)) return undefined;
  else if (typeof el.type === "string") return el.type;
  else if (typeof el.type !== "string" && "name" in el.type) return el.type.name;
  return undefined;
}
