import { render, act, renderHook } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { mockFetch } from "./mock-fetch";
import { useData } from "../src/index";

const Component = (): React.ReactElement => {
  const { data, loading, error } = useData("http://localhost:0000/api");

  return (
    <>
      {loading ? <span>loading</span> : null}

      {error ? <span>{error}</span> : null}

      {data ? <span>{JSON.stringify(data)}</span> : null}
    </>
  );
};

describe("unit useData hook", () => {
  it("returns unresolved promise", async () => {
    const { result } = renderHook(() => useData("http://localhost:0000/api"));

    // Prevent act error messages
    await act(
      async () =>
        new Promise<void>((r) => {
          r();
        }),
    );

    expect(result.current.dataPromise).toBeInstanceOf(Promise);
  });

  it("returns loading state", async () => {
    const { result } = renderHook(() => useData("http://localhost:0000/api"));

    expect(result.current.loading).toBe(true);

    // Prevent act error messages
    await act(
      async () =>
        new Promise<void>((r) => {
          r();
        }),
    );
  });

  it("displays data", async () => {
    const data = { abc: 123 };

    mockFetch(data);

    const tree = render(null);

    await act(async () => {
      tree.rerender(<Component />);

      await new Promise<void>((r) => {
        r();
      });
    });

    expect(tree.getByText(JSON.stringify(data))).toBeInTheDocument();
  });

  it("displays error", async () => {
    const errorMessage = "Api error";

    mockFetch(new Error(errorMessage));

    const tree = render(null);

    await act(async () => {
      tree.rerender(<Component />);

      await new Promise<void>((r) => {
        r();
      });
    });

    expect(tree.getByText(errorMessage)).toBeInTheDocument();
  });
});
