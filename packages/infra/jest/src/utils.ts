import type React from "react";
import renderer, { act } from "react-test-renderer";
import { render, type RenderResult } from "@testing-library/react";

/**
 * Combines act and react test renderer or testing library, returns a rendered component
 * executed with act
 * @param element  - React element to render
 * @param mode  - Output mode:
 * - "render" testing library render instance
 * - "create" (default) will output react test renderer instance
 */

async function getActRender(
  element: React.ReactElement,
  mode?: "create" | undefined,
): Promise<renderer.ReactTestRenderer | undefined>;
async function getActRender(
  element: React.ReactElement,
  mode: "render",
): Promise<RenderResult | undefined>;
async function getActRender(
  element: React.ReactElement,
  mode?: "create" | "render" | undefined,
): Promise<renderer.ReactTestRenderer | RenderResult | undefined> {
  let component: renderer.ReactTestRenderer | RenderResult | undefined = undefined;

  await act(() => {
    component = mode === "render" ? render(element) : renderer.create(element);
  });

  return component;
}

export { getActRender };
