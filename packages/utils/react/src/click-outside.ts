import { type default as React, useCallback, useEffect } from "react";

export const useOnClickOutside = (
  active: boolean,
  refs: Array<React.RefObject<HTMLElement | null>>,
  onClickOutside: () => void,
): void => {
  const clickHandler = useCallback(
    (e: MouseEvent) => {
      const { target } = e;

      if (!active) return;
      else if (!(target instanceof HTMLElement) && !(target instanceof SVGElement))
        throw new Error("click outside target is not an HTMLElement");
      else if (!refs.every(Boolean)) throw new Error("some click outside ref is not available");
      else if (refs.some((i) => i.current?.contains(target))) return;

      onClickOutside();
    },
    [active, onClickOutside, refs],
  );

  useEffect(() => {
    if (!active) return;

    const container = document.documentElement;

    container.addEventListener("click", clickHandler);

    return (): void => {
      container.removeEventListener("click", clickHandler);
    };
  }, [active, clickHandler]);
};
