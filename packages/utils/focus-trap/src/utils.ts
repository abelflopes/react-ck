export const getFocusableElements = (options: {
  container: HTMLElement;
  additionalElements: HTMLElement[] | undefined;
}): {
  focusableElements: HTMLElement[];
  firstFocusableElement: HTMLElement | null;
  lastFocusableElement: HTMLElement | null;
} => {
  const focusableSelectors = ["button", "[href]", "input", "select", "textarea", "[tabindex]"];

  const focusableElements = [
    ...(options.additionalElements || []),
    ...options.container.querySelectorAll<HTMLElement>(focusableSelectors.join(",")),
  ]
    .filter((el) => el.checkVisibility() && !el.hasAttribute("disabled") && el.tabIndex !== -1)
    .sort((a, b) => a.tabIndex - b.tabIndex);

  const firstFocusableElement = focusableElements[0] || null;
  const lastFocusableElement = focusableElements[focusableElements.length - 1] || null;

  return {
    focusableElements,
    firstFocusableElement,
    lastFocusableElement,
  };
};
