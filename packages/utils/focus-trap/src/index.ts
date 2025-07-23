import { raf } from "@react-ck/react-utils";

export interface FocusTrapOptions {
  additionalElements?: HTMLElement[];
  restoreFocus?: boolean;
}

/**
 * A class that manages focus trapping within a DOM element.
 * This is useful for modals, dropdowns, and other UI components where focus should be contained.
 */
export class FocusTrap {
  private static readonly trapStack: FocusTrap[] = [];
  private readonly container: HTMLElement;
  private readonly options?: FocusTrapOptions;
  private initialActiveElement: HTMLElement | null = null;

  /**
   * Creates a new FocusTrap instance.
   * @param container - The DOM element to trap focus within
   */
  public constructor(container: HTMLElement, options?: FocusTrapOptions) {
    this.options = options;
    this.container = container;
  }

  /**
   * Gets the currently active focus trap instance.
   * @returns The active focus trap instance or null if none is active
   */
  public isActiveTrap(): boolean {
    return FocusTrap.trapStack.indexOf(this) === FocusTrap.trapStack.length - 1;
  }

  /**
   * Updates the list of focusable elements within the container.
   * @private
   */
  private getFocusableElements(): {
    focusableElements: HTMLElement[];
    firstFocusableElement: HTMLElement | null;
    lastFocusableElement: HTMLElement | null;
  } {
    const focusableSelectors = ["button", "[href]", "input", "select", "textarea", "[tabindex]"];

    const focusableElements = [
      ...(this.options?.additionalElements || []),
      ...this.container.querySelectorAll<HTMLElement>(focusableSelectors.join(",")),
    ].filter((el) => el.checkVisibility() && !el.hasAttribute("disabled") && el.tabIndex !== -1);

    const firstFocusableElement = focusableElements[0] || null;
    const lastFocusableElement = focusableElements.at(-1) || null;

    return {
      focusableElements,
      firstFocusableElement,
      lastFocusableElement,
    };
  }

  /**
   * Handles the focus trap when tabbing forward.
   * @private
   */
  private handleForwardTab(e: KeyboardEvent): void {
    const { lastFocusableElement, firstFocusableElement } = this.getFocusableElements();

    if (document.activeElement === lastFocusableElement) {
      e.preventDefault();
      firstFocusableElement?.focus();
    }
  }

  /**
   * Handles the focus trap when tabbing backward.
   * @private
   */
  private handleBackwardTab(e: KeyboardEvent): void {
    const { lastFocusableElement, firstFocusableElement } = this.getFocusableElements();

    if (document.activeElement === firstFocusableElement) {
      e.preventDefault();
      lastFocusableElement?.focus();
    }
  }

  private readonly isCurrentFocusAllowed = (): boolean => {
    const { focusableElements } = this.getFocusableElements();

    if (
      !(document.activeElement instanceof HTMLElement) ||
      !document.activeElement.checkVisibility()
    )
      return false;

    return (
      this.container.contains(document.activeElement) ||
      focusableElements.includes(document.activeElement)
    );
  };

  private moveFocusToContainer(): void {
    // focus is already in container
    if (!this.isActiveTrap() || this.isCurrentFocusAllowed()) return;

    const { firstFocusableElement } = this.getFocusableElements();

    firstFocusableElement?.focus();
  }

  /**
   * Handles keyboard events for focus trapping.
   * @private
   */
  private readonly handleKeyDown = (e: KeyboardEvent): void => {
    if (!this.isActiveTrap()) return;

    const isInContainer = this.isCurrentFocusAllowed();

    if (e.key === "Tab") {
      if (isInContainer) {
        if (e.shiftKey) this.handleBackwardTab(e);
        else this.handleForwardTab(e);
      } else {
        this.moveFocusToContainer();
      }
    }
  };

  /**
   * Activates the focus trap.
   * This will store the currently focused element and trap focus within the container.
   * If another focus trap is active, it will be temporarily disabled.
   */
  public activate(): void {
    this.initialActiveElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    // If this trap is already in the stack, remove it
    const existingIndex = FocusTrap.trapStack.indexOf(this);
    if (existingIndex !== -1) FocusTrap.trapStack.splice(existingIndex, 1);

    // Add this trap to the stack
    FocusTrap.trapStack.push(this);

    globalThis.addEventListener("keydown", this.handleKeyDown);

    raf(() => {
      this.moveFocusToContainer();
    });
  }

  /**
   * Deactivates the focus trap.
   * This will restore focus to the previously focused element.
   * If there was another focus trap active before this one, it will be reactivated.
   */
  public deactivate(): void {
    globalThis.removeEventListener("keydown", this.handleKeyDown);

    // Remove this trap from the stack
    const index = FocusTrap.trapStack.indexOf(this);

    if (index !== -1) FocusTrap.trapStack.splice(index, 1);

    // Restore focus to the previous element
    if (this.options?.restoreFocus ?? true) this.initialActiveElement?.focus();
    this.initialActiveElement = null;
  }
}
