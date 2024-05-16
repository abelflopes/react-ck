/* eslint-disable max-lines -- ddd */
import { type StandardLonghandProperties } from "csstype";

type PositionEngineAlign = "start" | "center" | "end";

type PositionEngineBasePosition = "top" | "bottom" | "left" | "right";

type PositionEngineStyle = Pick<
  StandardLonghandProperties,
  "top" | "bottom" | "left" | "right" | "width" | "maxWidth" | "height" | "maxHeight" | "position"
> & {
  "--pe-max-height"?: string;
  "--pe-max-width"?: string;
};

interface PositionEngineMeasures {
  rect: DOMRect;
  windowHeight: number;
  windowWidth: number;
}

type PositionEngineAvailableSpace = Record<
  PositionEnginePosition,
  {
    x: number;
    y: number;
  }
>;

export type PositionEnginePosition = `${PositionEngineBasePosition}-${PositionEngineAlign}`;

export interface PositionEngineOptions {
  position: PositionEnginePosition | "auto";
  exclude?: Array<PositionEngineBasePosition | PositionEngineAlign | PositionEnginePosition>;
  element: HTMLElement;
  onRender: (data: { position: PositionEnginePosition; style: PositionEngineStyle }) => void;
}

export class PositionEngine {
  private readonly options: PositionEngineOptions;
  private readonly resizeObserver: ResizeObserver;
  private animationFrame: number | undefined;

  public constructor(options: PositionEngineOptions) {
    this.options = options;

    this.resizeObserver = new ResizeObserver(this.throttledRender);

    this.init();
  }

  public init = (): void => {
    this.render();

    this.resizeObserver.observe(this.options.element);
    window.addEventListener("resize", this.throttledRender);
    window.addEventListener("scroll", this.throttledRender, { capture: true });
  };

  public destroy = (): void => {
    this.resizeObserver.disconnect();
    window.removeEventListener("resize", this.throttledRender);
    window.removeEventListener("scroll", this.throttledRender);

    if (this.animationFrame !== undefined) cancelAnimationFrame(this.animationFrame);
  };

  private readonly getMeasures = (): PositionEngineMeasures => {
    const rect = this.options.element.getBoundingClientRect();

    const { innerHeight: windowHeight, innerWidth: windowWidth } = window;

    return {
      rect,
      windowHeight,
      windowWidth,
    };
  };

  private readonly getAvailableSpace = (): PositionEngineAvailableSpace => {
    const { rect, windowHeight, windowWidth } = this.getMeasures();

    return {
      "top-start": {
        x: windowWidth - rect.left,
        y: rect.top,
      },
      "top-center": {
        x: rect.width,
        y: rect.top,
      },
      "top-end": {
        x: rect.right,
        y: rect.top,
      },
      "right-start": {
        x: windowWidth - rect.right,
        y: windowHeight - rect.top,
      },
      "right-center": {
        x: windowWidth - rect.right,
        y: rect.height,
      },
      "right-end": {
        x: windowWidth - rect.right,
        y: rect.top + rect.height,
      },
      "bottom-start": {
        x: windowWidth - rect.left,
        y: windowHeight - rect.bottom,
      },
      "bottom-center": {
        x: rect.width,
        y: windowHeight - rect.bottom,
      },
      "bottom-end": {
        x: rect.right,
        y: windowHeight - rect.bottom,
      },
      "left-start": {
        x: rect.left,
        y: windowHeight - rect.top,
      },
      "left-center": {
        x: rect.left,
        y: rect.height,
      },
      "left-end": {
        x: rect.left,
        y: rect.top + rect.height,
      },
    };
  };

  private readonly getPositionStyles = (): Record<PositionEnginePosition, PositionEngineStyle> => {
    const { rect, windowHeight, windowWidth } = this.getMeasures();

    const availableSpace = this.getAvailableSpace();

    return {
      "top-start": {
        bottom: `${windowHeight - rect.top}px`,
        left: `${rect.left}px`,
        maxWidth: `${availableSpace["top-start"].x}px`,
        maxHeight: `${availableSpace["top-start"].y}px`,
      },
      "top-center": {
        bottom: `${windowHeight - rect.top}px`,
        left: `${rect.left}px`,
        width: `${availableSpace["top-center"].x}px`,
        maxHeight: `${availableSpace["top-center"].y}px`,
      },
      "top-end": {
        bottom: `${windowHeight - rect.top}px`,
        right: `${windowWidth - rect.right}px`,
        maxWidth: `${availableSpace["top-end"].x}px`,
        maxHeight: `${availableSpace["top-end"].y}px`,
      },
      "right-start": {
        top: `${rect.top}px`,
        left: `${rect.right}px`,
        maxWidth: `${availableSpace["right-start"].x}px`,
        maxHeight: `${availableSpace["right-start"].y}px`,
      },
      "right-center": {
        top: `${rect.top}px`,
        left: `${rect.right}px`,
        maxWidth: `${availableSpace["right-center"].x}px`,
        height: `${availableSpace["right-center"].y}px`,
      },
      "right-end": {
        bottom: `${windowHeight - rect.bottom}px`,
        left: `${rect.right}px`,
        maxWidth: `${availableSpace["right-end"].x}px`,
        maxHeight: `${availableSpace["right-end"].y}px`,
      },
      "bottom-start": {
        top: `${rect.bottom}px`,
        left: `${rect.left}px`,
        maxWidth: `${availableSpace["bottom-start"].x}px`,
        maxHeight: `${availableSpace["bottom-start"].y}px`,
      },
      "bottom-center": {
        top: `${rect.bottom}px`,
        left: `${rect.left}px`,
        width: `${availableSpace["bottom-center"].x}px`,
        maxHeight: `${availableSpace["bottom-center"].y}px`,
      },
      "bottom-end": {
        top: `${rect.bottom}px`,
        right: `${windowWidth - rect.right}px`,
        maxWidth: `${availableSpace["bottom-end"].x}px`,
        maxHeight: `${availableSpace["bottom-end"].y}px`,
      },
      "left-start": {
        top: `${rect.top}px`,
        right: `${windowWidth - rect.left}px`,
        maxWidth: `${availableSpace["left-start"].x}px`,
        maxHeight: `${availableSpace["left-start"].y}px`,
      },
      "left-center": {
        top: `${rect.top}px`,
        right: `${windowWidth - rect.left}px`,
        maxWidth: `${availableSpace["left-center"].x}px`,
        height: `${availableSpace["left-center"].y}px`,
      },
      "left-end": {
        bottom: `${windowHeight - rect.bottom}px`,
        right: `${windowWidth - rect.left}px`,
        maxWidth: `${availableSpace["left-end"].x}px`,
        maxHeight: `${availableSpace["left-end"].y}px`,
      },
    };
  };

  private readonly throttledRender = (): void => {
    if (this.animationFrame !== undefined) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame(this.render);
  };

  private readonly getAutoPosition = (): PositionEnginePosition => {
    const availableSpace = this.getAvailableSpace();

    const [idealPosition] = Object.entries(availableSpace)
      .map(([key, value]) => ({
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- key is PositionEnginePosition
        position: key as PositionEnginePosition,
        area: value.x * value.y,
      }))
      .sort((a, b) => b.area - a.area)
      .filter((i) => !this.options.exclude?.some((e) => i.position.includes(e)));

    if (!idealPosition) throw new Error("No ideal position found");

    return idealPosition.position;
  };

  private readonly render = (): void => {
    const positions = this.getPositionStyles();

    const position =
      this.options.position === "auto" ? this.getAutoPosition() : this.options.position;

    this.options.onRender({
      position,
      style: {
        "position": "fixed",
        "--pe-max-height": String(
          positions[position].maxHeight ?? positions[position].height ?? "unset",
        ),
        "--pe-max-width": String(
          positions[position].maxWidth ?? positions[position].width ?? "unset",
        ),
        ...positions[position],
      },
    });
  };
}
/* eslint-enable max-lines */
