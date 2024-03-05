import React from "react";
import ReactDOM from "react-dom/server";

/** Extract text only from component markup  */

export const componentToText = (component: NonNullable<React.ReactNode>): string | undefined => {
  let text = "";
  // eslint-disable-next-line react/jsx-no-useless-fragment -- needs fragment so that it is accepted as ReactElement
  const html = ReactDOM.renderToString(<>{component}</>);
  const el = document.createElement("span");
  el.innerHTML = html;
  if (el.textContent?.length) text = el.textContent;

  return text.trim().length > 0 ? text : undefined;
};
