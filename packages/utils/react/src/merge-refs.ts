import { type ForwardedRef, type RefObject, type RefCallback } from "react";

export const mergeRefs =
  <T>(
    ...refs: Array<undefined | null | ForwardedRef<T> | RefObject<T | null> | RefCallback<T>>
  ): RefCallback<T> =>
  (r) => {
    refs.forEach((thisRef) => {
      if (!thisRef) return;
      if (typeof thisRef === "object" && "current" in thisRef) thisRef.current = r;
      else if (typeof thisRef === "function") thisRef(r);
      else throw new Error("Unuspported ref type to merge");
    });
  };
