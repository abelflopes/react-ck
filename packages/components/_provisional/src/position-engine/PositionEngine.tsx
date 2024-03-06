import { useEffect, useState, type default as React } from "react";
import * as PositionEngineCore from "./position-engine-core";

export interface PositionEngineProps {
  position: PositionEngineCore.PositionEngineOptions["position"];
  anchorRef: React.RefObject<HTMLElement>;
  render: (
    ...args: Parameters<PositionEngineCore.PositionEngineOptions["onRender"]>
  ) => React.ReactElement;
}

export const PositionEngine = ({
  anchorRef,
  render,
  position,
}: Readonly<PositionEngineProps>): React.ReactNode => {
  const [renderedElement, setRenderedElement] = useState<React.ReactNode>();

  useEffect(() => {
    if (!anchorRef.current) return;

    const positionEngine = new PositionEngineCore.PositionEngine({
      position,
      element: anchorRef.current,
      onRender: (...args): void => {
        setRenderedElement(render(...args));
      },
    });

    return positionEngine.destroy;
  }, [anchorRef, position, render]);

  return renderedElement;
};
