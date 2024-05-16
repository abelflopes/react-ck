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

    let accOffsetTop = 0;
    let accOffsetLeft = 0;
    let accScrollTop = scrollTop;
    let accScrollLeft = scrollLeft;

    /* eslint-disable no-console -- still in development */

    console.clear();

    console.group("Measure parent offset");

    while (parent) {
      if (parent instanceof HTMLElement) {
        accOffsetTop += parent.offsetTop;
        accOffsetLeft += parent.offsetLeft;
        accScrollTop += parent.scrollTop;
        accScrollLeft += parent.scrollLeft;

        console.group("offsetParent", parent);
        console.log("position", window.getComputedStyle(parent).position);
        console.log("marginTop", window.getComputedStyle(parent).marginTop);
        console.log("paddingTop", window.getComputedStyle(parent).paddingTop);
        console.log("offsetTop", parent.offsetTop);
        console.log("offsetLeft", parent.offsetLeft);
        console.log("offsetHeight", parent.offsetHeight);
        console.log("offsetWidth", parent.offsetWidth);
        console.log("clientHeight", parent.clientHeight);
        console.log("clientWidth", parent.clientWidth);
        console.log("scrollHeight", parent.scrollHeight);
        console.log("scrollTop", parent.scrollTop);
        console.log("scrollLengthTop", parent.scrollHeight - parent.offsetHeight);
        console.log("scrollWidth", parent.scrollWidth);
        console.log("scrollLeft", parent.scrollLeft);
        console.log("scrollLengthLeft", parent.scrollWidth - parent.offsetWidth);
        console.log("rect", parent.getBoundingClientRect());
        console.groupEnd();
      }

      parent = parent instanceof HTMLElement ? parent.offsetParent : null;
    }
    console.groupEnd();

    console.group("Acc ---------------------");
    console.log("accOffsetLeft", accOffsetLeft);
    console.log("accOffsetTop", accOffsetTop);
    console.log("accScrollLeft", accScrollLeft);
    console.log("accScrollTop", accScrollTop);
    console.groupEnd();

    console.group("Render ------------------");
    console.log("availableSpace", availableSpace);
    console.log("rect.top", rect.top);
    console.log("rect.bottom", rect.bottom);
    console.log("rect.height", rect.height);
    console.log("windowHeight", windowHeight);
    console.log("windowWidth", windowWidth);
    console.log("scrollTop", scrollTop);
    console.groupEnd();

    /* eslint-enable no-console */

    return {
      "top-start": {
        bottom: `${windowHeight - rect.top - accScrollTop}px`,
        left: `${accScrollLeft + rect.left}px`,
        maxWidth: `${availableSpace["top-start"].x}px`,
        maxHeight: `${availableSpace["top-start"].y}px`,
      },
      "top-center": {
        bottom: `${windowHeight - rect.top - accScrollTop}px`,
        left: `${accScrollLeft + rect.left - accOffsetLeft}px`,
        width: `${availableSpace["top-center"].x}px`,
        maxHeight: `${availableSpace["top-center"].y}px`,
      },
      "top-end": {
        bottom: `${windowHeight - rect.top - accScrollTop}px`,
        right: `${windowWidth - rect.right - accScrollLeft}px`,
        maxWidth: `${availableSpace["top-end"].x}px`,
        maxHeight: `${availableSpace["top-end"].y}px`,
      },
      "right-start": {
        top: `${rect.top + accScrollTop - accOffsetTop}px`,
        left: `${accScrollLeft + rect.right - accOffsetLeft}px`,
        maxWidth: `${availableSpace["right-start"].x}px`,
        maxHeight: `${availableSpace["right-start"].y}px`,
      },
      "right-center": {
        top: `${rect.top + accScrollTop - accOffsetTop}px`,
        left: `${accScrollLeft + rect.right - accOffsetLeft}px`,
        maxWidth: `${availableSpace["right-center"].x}px`,
        height: `${availableSpace["right-center"].y}px`,
      },
      "right-end": {
        bottom: `${windowHeight - rect.bottom - accScrollTop + accOffsetTop}px`,
        left: `${accScrollLeft + rect.right - accOffsetLeft}px`,
        maxWidth: `${availableSpace["right-end"].x}px`,
        maxHeight: `${availableSpace["right-end"].y}px`,
      },
      "bottom-start": {
        top: `${accScrollTop + rect.bottom - accOffsetTop}px`,
        left: `${accScrollLeft + rect.left - accOffsetLeft}px`,
        maxWidth: `${availableSpace["bottom-start"].x}px`,
        maxHeight: `${availableSpace["bottom-start"].y}px`,
      },
      "bottom-center": {
        top: `${accScrollTop + rect.bottom - accOffsetTop}px`,
        left: `${accScrollLeft + rect.left - accOffsetLeft}px`,
        width: `${availableSpace["bottom-center"].x}px`,
        maxHeight: `${availableSpace["bottom-center"].y}px`,
      },
      "bottom-end": {
        top: `${accScrollTop + rect.bottom - accOffsetTop}px`,
        right: `${windowWidth - rect.right - accOffsetLeft - accScrollLeft}px`,
        maxWidth: `${availableSpace["bottom-end"].x}px`,
        maxHeight: `${availableSpace["bottom-end"].y}px`,
      },
      "left-start": {
        top: `${rect.top + accScrollTop - accOffsetTop}px`,
        right: `${windowWidth - rect.left - accOffsetLeft - accScrollLeft}px`,
        maxWidth: `${availableSpace["left-start"].x}px`,
        maxHeight: `${availableSpace["left-start"].y}px`,
      },
      "left-center": {
        top: `${rect.top + accScrollTop - accOffsetTop}px`,
        right: `${windowWidth - rect.left - accOffsetLeft - accScrollLeft}px`,
        maxWidth: `${availableSpace["left-center"].x}px`,
        height: `${availableSpace["left-center"].y}px`,
      },
      "left-end": {
        bottom: `${windowHeight - rect.bottom - accScrollTop + accOffsetTop}px`,
        right: `${windowWidth - rect.left - accOffsetLeft - accScrollLeft}px`,
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
