import { useData } from "../src/index";
import { renderHook, act, render, type RenderResult } from "@testing-library/react";
import { mockFetch } from "./mock-fetch";
import React from "react";
import "@testing-library/jest-dom";

const Component = (): React.ReactElement => {
  const { data, loading, error } = useData("http://localhost:0000/api");

  return (
    <>
      {loading && <span>loading</span>}
      {error && <span>{error}</span>}
      {data && <span>{JSON.stringify(data)}</span>}
    </>
  );
};

describe("Unit useData hook", () => {
  test("returns unresolved promise", async () => {
    const { result } = renderHook(() => useData("http://localhost:0000/api"));

    // Prevent act error messages
    await act(async () => undefined);

    expect(result.current.dataPromise).toBeInstanceOf(Promise);
  });

  test("returns loading state", async () => {
    const { result } = renderHook(() => useData("http://localhost:0000/api"));

    expect(result.current.loading).toBe(true);

    // Prevent act error messages
    await act(async () => undefined);
  });

  it("displays data", async () => {
    const data = { abc: 123 };

    mockFetch(data);

    const component = await getActRender(<Component />, "render");

    expect(component?.getByText(JSON.stringify(data))).toBeInTheDocument();
  });

  it("displays error", async () => {
    const errorMessage = "Api error";

    mockFetch(new Error(errorMessage));

    const component = await getActRender(<Component />, "render");

    expect(component?.getByText(errorMessage)).toBeInTheDocument();
  });
});
