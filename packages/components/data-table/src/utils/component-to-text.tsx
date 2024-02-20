import React from "react";
import ReactDOM from "react-dom/server";

/** Extract text only from component markup  */

export const componentToText = (component: NonNullable<React.ReactNode>): string | undefined => {
  let text = "";
  // eslint-disable-next-line react/jsx-no-useless-fragment -- needed to be received as a react node by react dom server
  const html = ReactDOM.renderToString(<>{component}</>);
  const el = document.createElement("span");
  el.innerHTML = html;

  if (el.textContent && el.textContent.length > 0) text = el.textContent;

  return text.trim().length > 0 ? text : undefined;
};
