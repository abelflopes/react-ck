import { getFocusableElements } from "@react-ck/focus-trap";

const getElementPositionData = (
  baseElement: Element,
  relativeElement: Element,
): { deg: number; direction: "up" | "down" | "left" | "right"; distance: number } => {
  const baseElReact = baseElement.getBoundingClientRect();
  const x1 = baseElReact.left + baseElReact.width / 2;
  const y1 = baseElReact.top + baseElReact.height / 2;

  const relativeElRect = relativeElement.getBoundingClientRect();
  const x2 = relativeElRect.left + relativeElRect.width / 2;
  const y2 = relativeElRect.top + relativeElRect.height / 2;

  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const rad = Math.atan2(deltaY, deltaX); // In radians

  let deg = rad * (180 / Math.PI);
  deg = deg >= 0 ? deg : 360 + deg;

  let direction: "up" | "down" | "left" | "right";

  if (deg > 45 && deg < 135) {
    // bottom elements
    direction = "down";
  } else if (deg > 135 && deg < 225) {
    // left elements
    direction = "left";
  } else if (deg > 225 && deg < 315) {
    // top elements
    direction = "up";
  } else {
    // right elements
    direction = "right";
  }

  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  return { deg, direction, distance };
};

export interface KeyboardControlsOptions {
  focusWithArrows?: boolean;
  onEscape?: (e: KeyboardEvent) => void;
}

export class KeyboardControls {
  private readonly container: HTMLElement;
  private readonly options?: KeyboardControlsOptions;

  public constructor(container: HTMLElement, options?: KeyboardControlsOptions) {
    this.options = {
      focusWithArrows: true,
      ...options,
    };
    this.container = container;
  }

  private handleFocusWithArrows = (e: KeyboardEvent): void => {
    const currentElement = document.activeElement;

    // skip if no focused element
    // or content editable element
    // or current element is an input or textarea with value
    if (
      !currentElement ||
      (currentElement instanceof HTMLElement && currentElement.isContentEditable) ||
      (currentElement instanceof HTMLInputElement &&
        currentElement.value &&
        (currentElement.tagName === "INPUT" || currentElement.tagName === "TEXTAREA"))
    )
      return;

    const { focusableElements } = getFocusableElements({
      container: this.container,
      additionalElements: undefined,
    });

    const targetElements = focusableElements
      .filter((element) => element !== currentElement)
      .map((element) => ({
        element,
        ...getElementPositionData(currentElement, element),
      }))
      .filter((element) => element.direction === e.key.replace("Arrow", "").toLowerCase());

    const closestTargetElement = targetElements.sort((a, b) => a.distance - b.distance)[0];

    if (closestTargetElement) {
      closestTargetElement.element.focus();
    }
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      this.options?.onEscape?.(e);
    }

    if (e.key.includes("Arrow") && this.options?.focusWithArrows) {
      this.handleFocusWithArrows(e);
    }
  };

  public activate(): void {
    this.container.addEventListener("keydown", this.handleKeyDown);
  }

  public deactivate(): void {
    this.container.removeEventListener("keydown", this.handleKeyDown);
  }
}
