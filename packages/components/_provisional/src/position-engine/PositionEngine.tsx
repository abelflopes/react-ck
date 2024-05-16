import { useEffect, useState, type default as React } from "react";
import * as PositionEngineCore from "./position-engine-core";

export interface PositionEngineProps {
  position: PositionEngineCore.PositionEngineOptions["position"];
  exclude?: PositionEngineCore.PositionEngineOptions["exclude"];
  anchorRef: React.RefObject<HTMLElement>;
  render: (
    ...args: Parameters<PositionEngineCore.PositionEngineOptions["onRender"]>
  ) => React.ReactElement;
}

export const PositionEngine = ({
  anchorRef,
  render,
  position,
  exclude,
}: Readonly<PositionEngineProps>): React.ReactNode => {
  const [renderedElement, setRenderedElement] = useState<React.ReactNode>();

  useEffect(() => {
    if (!anchorRef.current) return;

    const positionEngine = new PositionEngineCore.PositionEngine({
      position,
      exclude,
      element: anchorRef.current,
      onRender: (...args): void => {
        setRenderedElement(render(...args));
      },
    });

    return positionEngine.destroy;
  }, [anchorRef, position, render, exclude]);

  return renderedElement;
};
