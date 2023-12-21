import { type ReactElement } from "react";

export function getDisplayName(el: ReactElement): string | undefined {
  if (typeof el.type === "string") {
    return el.type;
  }

  if (typeof el.type !== "string" && "name" in el.type) {
    return el.type.name;
  }

  return undefined;
}
