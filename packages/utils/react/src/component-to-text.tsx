import React from "react";
import ReactDOM from "react-dom/server";

/** Extract text only from component markup  */

export const componentToText = (component: React.ReactNode): string | undefined => {
  let text = "";

  const html = ReactDOM.renderToString(<>{component}</>);
  const el = document.createElement("span");
  el.innerHTML = html;
  if (el.textContent?.length) text = el.textContent;

  return text.trim().length > 0 ? text : undefined;
};
