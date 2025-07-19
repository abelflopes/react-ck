import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

interface ShadowDomProps extends React.HTMLAttributes<HTMLDivElement> {
  /** query selector for stylesheets to transport to the shadow DOM */
  cssQuerySelector: string;
}

export const ShadowDom = ({
  cssQuerySelector,
  children,
  ...otherProps
}: Readonly<ShadowDomProps>): React.ReactNode => {
  const shadowDomContainer = useRef<HTMLDivElement>(null);
  const deferredChildren = useRef(children);

  useEffect(() => {
    if (!shadowDomContainer.current) return;

    // Create shadow dom and container element
    const p = document.createElement("div");
    shadowDomContainer.current.append(p);

    const shadowDom = p.attachShadow({ mode: "open" });

    const el = document.createElement("div");
    shadowDom.append(el);

    // Render demo styles in shadow dom
    const root = createRoot(el);

    const rerender = (): void => {
      // Move styles to shadow dom
      const styles = document.querySelectorAll(cssQuerySelector);
      styles.forEach((style) => {
        shadowDom.append(style);
      });

      root.render(deferredChildren.current);
    };

    const mo = new MutationObserver((_, instance) => {
      rerender();
      instance.disconnect();
    });

    mo.observe(document.head, {
      childList: true,
    });

    if (!el.hasChildNodes()) rerender();

    return () => {
      mo.disconnect();
      root.unmount();
      p.remove();
    };
  }, [cssQuerySelector]);

  return <div {...otherProps} ref={shadowDomContainer} />;
};
