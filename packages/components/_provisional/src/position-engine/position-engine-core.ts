/* eslint-disable max-lines -- ddd */
import { type StandardLonghandProperties } from "csstype";

type PositionEngineAlign = "start" | "center" | "end";

type PositionEngineBasePosition = "top" | "bottom" | "left" | "right";

type PositionEngineStyle = Pick<
  StandardLonghandProperties,
  "top" | "bottom" | "left" | "right" | "width" | "maxWidth" | "height" | "maxHeight" | "position"
>;

interface PositionEngineMeasures {
  rect: DOMRect;
  scrollTop: number;
  scrollLeft: number;
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
  position: PositionEnginePosition;
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

    const { scrollTop, scrollLeft } = document.documentElement;

    return {
      rect,
      scrollTop,
      scrollLeft,
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
    const { rect, scrollTop, scrollLeft, windowHeight, windowWidth } = this.getMeasures();

    const availableSpace = this.getAvailableSpace();

    let parent = this.options.element.offsetParent;

    let offsetTop = 0;
    let offsetLeft = 0;
    let scrollOffset = 0;

    /* eslint-disable no-console -- still in development */

    console.clear();

    while (parent) {
      if (parent instanceof HTMLElement) {
        offsetTop += parent.offsetTop;
        offsetLeft += parent.offsetLeft;
        scrollOffset += parent.scrollHeight - parent.offsetHeight;

        console.log("offsetParent", parent);
        console.log("offsetLeft", parent.offsetLeft);
        console.log(
          "top / height / scrollHeight / scrollTop",
          parent.offsetTop,
          parent.offsetHeight,
          parent.scrollHeight,
          parent.scrollTop,
        );
      }

      parent = parent instanceof HTMLElement ? parent.offsetParent : null;
    }

    console.log("total offsetLeft", offsetLeft);
    console.log("total offsetTop", offsetTop);
    console.log("height", availableSpace["top-start"].y);
    console.log("rect.top", rect.top);
    console.log("rect.bottom", rect.bottom);
    console.log("rect.height", rect.height);
    console.log("windowHeight", windowHeight);
    console.log("scrollTop", scrollTop);
    console.log("scrollOffset", scrollOffset);

    /* eslint-enable no-console */

    return {
      "top-start": {
        bottom: `${windowHeight - rect.top - scrollTop}px`,
        left: `${scrollLeft + rect.left}px`,
        maxWidth: `${availableSpace["top-start"].x}px`,
        maxHeight: `${availableSpace["top-start"].y}px`,
      },
      "top-center": {
        bottom: `${windowHeight - rect.top - scrollTop}px`,
        left: `${scrollLeft + rect.left}px`,
        width: `${availableSpace["top-center"].x}px`,
        maxHeight: `${availableSpace["top-center"].y}px`,
      },
      "top-end": {
        bottom: `${windowHeight - rect.top - scrollTop}px`,
        right: `${windowWidth - rect.right - scrollLeft}px`,
        maxWidth: `${availableSpace["top-end"].x}px`,
        maxHeight: `${availableSpace["top-end"].y}px`,
      },
      "right-start": {
        top: `${rect.top + scrollTop - offsetTop}px`,
        left: `${scrollLeft + rect.right - offsetLeft}px`,
        maxWidth: `${availableSpace["right-start"].x}px`,
        maxHeight: `${availableSpace["right-start"].y}px`,
      },
      "right-center": {
        top: `${rect.top + scrollTop - offsetTop}px`,
        left: `${scrollLeft + rect.right - offsetLeft}px`,
        maxWidth: `${availableSpace["right-center"].x}px`,
        height: `${availableSpace["right-center"].y}px`,
      },
      "right-end": {
        bottom: `${windowHeight - rect.bottom - scrollTop}px`,
        left: `${scrollLeft + rect.right - offsetLeft}px`,
        maxWidth: `${availableSpace["right-end"].x}px`,
        maxHeight: `${availableSpace["right-end"].y}px`,
      },
      "bottom-start": {
        top: `${scrollTop + rect.bottom - offsetTop}px`,
        left: `${scrollLeft + rect.left - offsetLeft}px`,
        maxWidth: `${availableSpace["bottom-start"].x}px`,
        maxHeight: `${availableSpace["bottom-start"].y}px`,
      },
      "bottom-center": {
        top: `${scrollTop + rect.bottom - offsetTop}px`,
        left: `${scrollLeft + rect.left - offsetLeft}px`,
        width: `${availableSpace["bottom-center"].x}px`,
        maxHeight: `${availableSpace["bottom-center"].y}px`,
      },
      "bottom-end": {
        top: `${scrollTop + rect.bottom - offsetTop}px`,
        right: `${windowWidth - rect.right - offsetLeft}px`,
        maxWidth: `${availableSpace["bottom-end"].x}px`,
        maxHeight: `${availableSpace["bottom-end"].y}px`,
      },
      "left-start": {
        top: `${rect.top + scrollTop - offsetTop}px`,
        right: `${windowWidth - scrollLeft - rect.left - offsetLeft}px`,
        maxWidth: `${availableSpace["left-start"].x}px`,
        maxHeight: `${availableSpace["left-start"].y}px`,
      },
      "left-center": {
        top: `${rect.top + scrollTop - offsetTop}px`,
        right: `${windowWidth - scrollLeft - rect.left - offsetLeft}px`,
        maxWidth: `${availableSpace["left-center"].x}px`,
        height: `${availableSpace["left-center"].y}px`,
      },
      "left-end": {
        bottom: `${windowHeight - rect.bottom - scrollTop}px`,
        right: `${windowWidth - scrollLeft - rect.left - offsetLeft}px`,
        maxWidth: `${availableSpace["left-end"].x}px`,
        maxHeight: `${availableSpace["left-end"].y}px`,
      },
    };
  };

  private readonly throttledRender = (): void => {
    if (this.animationFrame !== undefined) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame(this.render);
  };

  private readonly render = (): void => {
    const positions = this.getPositionStyles();

    this.options.onRender({
      position: this.options.position,
      style: {
        position: "absolute",
        ...positions[this.options.position],
      },
    });
  };
}
/* eslint-enable max-lines */
