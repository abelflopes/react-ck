import { useEffect, useState, type default as React } from "react";
import * as PositionEngineCore from "./position-engine-core";

/**
 * Props for configuring the PositionEngine component
 */
export interface PositionEngineProps {
  /** Whether the positioned element is active/visible */
  active: boolean;
  /** Preferred position relative to anchor element. Can be "auto" or "{top|bottom|left|right}-{start|center|end|full}" */
  position: PositionEngineCore.PositionEngineOptions["position"];
  /** Positions or alignments to exclude from auto-positioning */
  exclude?: PositionEngineCore.PositionEngineOptions["exclude"];
  /** Reference to the anchor element */
  anchorRef: React.RefObject<HTMLElement>;
  /** Render function that receives position and style data */
  render: (
    ...args: Parameters<PositionEngineCore.PositionEngineOptions["onRender"]>
  ) => React.ReactElement;
}

/**
 * Engine for positioning elements relative to an anchor
 * Handles automatic positioning, window resizing, and scroll events
 */
export const PositionEngine = ({
  active,
  anchorRef,
  render,
  position,
  exclude,
}: Readonly<PositionEngineProps>): React.ReactNode => {
  const [renderedElement, setRenderedElement] = useState<React.ReactNode>();

  useEffect(() => {
    if (!anchorRef.current || !active) return;

    const positionEngine = new PositionEngineCore.PositionEngine({
      position,
      exclude,
      element: anchorRef.current,
      onRender: (...args): void => {
        setRenderedElement(render(...args));
      },
    });

    return positionEngine.destroy;
  }, [anchorRef, position, render, exclude, active]);

  return renderedElement;
};
