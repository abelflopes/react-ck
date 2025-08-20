import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Snackbar } from "../index";
import { useSnackbar } from "@react-ck/snackbar-provider";

import { Manager } from "@react-ck/manager/src";

// Test component that uses the snackbar context
const TestSnackbarConsumer = ({ onAdd }: { onAdd: () => void }) => {
  useSnackbar(); // Access context to ensure it's available

  React.useEffect(() => {
    onAdd();
  }, [onAdd]);

  return <div data-testid="consumer">Consumer</div>;
};

describe("unit Snackbar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders correctly with children", async () => {
    const content = "Test Content";
    render(
      <Manager>
        <Snackbar>
          <div data-testid="child">{content}</div>
        </Snackbar>
      </Manager>,
    );

    const child = await screen.findByTestId("child");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent(content);
  });

  it("renders with initial items", async () => {
    const initialItems = [
      (id: string) => (
        <div key={id} data-testid="initial-item-1">
          Initial Item 1
        </div>
      ),
      (id: string) => (
        <div key={id} data-testid="initial-item-2">
          Initial Item 2
        </div>
      ),
    ];

    render(
      <Manager>
        <Snackbar initialItems={initialItems} />
      </Manager>,
    );

    const item1 = await screen.findByTestId("initial-item-1");
    const item2 = await screen.findByTestId("initial-item-2");

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item1).toHaveTextContent("Initial Item 1");
    expect(item2).toHaveTextContent("Initial Item 2");
  });

  it("does not render snackbar container when no items", () => {
    render(
      <Manager>
        <Snackbar data-testid="snackbar" />
      </Manager>,
    );

    const snackbar = screen.queryByTestId("snackbar");
    expect(snackbar).not.toBeInTheDocument();
  });

  it("renders snackbar container when items are present", async () => {
    const initialItems = [(id: string) => <div key={id}>Test Item</div>];

    render(
      <Manager>
        <Snackbar initialItems={initialItems} data-testid="snackbar" />
      </Manager>,
    );

    const snackbar = await screen.findByTestId("snackbar");
    expect(snackbar).toBeInTheDocument();
  });

  it("provides snackbar context to children", async () => {
    const mockOnAdd = jest.fn();

    render(
      <Manager>
        <Snackbar>
          <TestSnackbarConsumer onAdd={mockOnAdd} />
        </Snackbar>
      </Manager>,
    );

    const consumer = await screen.findByTestId("consumer");
    expect(consumer).toBeInTheDocument();
    expect(mockOnAdd).toHaveBeenCalled();
  });

  it("adds items dynamically through context", async () => {
    let addFunction: ReturnType<typeof useSnackbar>["add"] | null = null;

    const TestComponent = () => {
      const { add } = useSnackbar();

      React.useEffect(() => {
        addFunction = add;
      }, [add]);

      return <div data-testid="test-component">Test</div>;
    };

    render(
      <Manager>
        <Snackbar>
          <TestComponent />
        </Snackbar>
      </Manager>,
    );

    await screen.findByTestId("test-component");

    act(() => {
      if (addFunction) {
        addFunction((id: string) => (
          <div key={id} data-testid="dynamic-item">
            Dynamic Item
          </div>
        ));
      }
    });

    const dynamicItem = await screen.findByTestId("dynamic-item");
    expect(dynamicItem).toBeInTheDocument();
    expect(dynamicItem).toHaveTextContent("Dynamic Item");
  });

  it("removes items when remove is called", async () => {
    let addFunction: ReturnType<typeof useSnackbar>["add"] | null = null;
    let removeFunction: ReturnType<typeof useSnackbar>["remove"] | null = null;

    const TestComponent = () => {
      const { add, remove } = useSnackbar();

      React.useEffect(() => {
        addFunction = add;
        removeFunction = remove;
      }, [add, remove]);

      return <div data-testid="test-component">Test</div>;
    };

    render(
      <Manager>
        <Snackbar>
          <TestComponent />
        </Snackbar>
      </Manager>,
    );

    await screen.findByTestId("test-component");

    let itemId: string | null = null;

    act(() => {
      if (addFunction) {
        itemId = addFunction((id: string) => (
          <div key={id} data-testid="item-to-remove">
            Item to Remove
          </div>
        ));
      }
    });

    const item = await screen.findByTestId("item-to-remove");
    expect(item).toBeInTheDocument();

    act(() => {
      if (removeFunction && itemId) {
        removeFunction(itemId);
      }
    });

    await waitFor(() => {
      expect(screen.queryByTestId("item-to-remove")).not.toBeInTheDocument();
    });
  });

  it("auto-dismisses items with short duration", async () => {
    let addFunction: ReturnType<typeof useSnackbar>["add"] | null = null;

    const TestComponent = () => {
      const { add } = useSnackbar();

      React.useEffect(() => {
        addFunction = add;
      }, [add]);

      return <div data-testid="test-component">Test</div>;
    };

    render(
      <Manager>
        <Snackbar>
          <TestComponent />
        </Snackbar>
      </Manager>,
    );

    await screen.findByTestId("test-component");

    act(() => {
      if (addFunction) {
        addFunction(
          (id: string) => (
            <div key={id} data-testid="auto-dismiss-item">
              Auto Dismiss Item
            </div>
          ),
          { duration: "short" },
        );
      }
    });

    const item = await screen.findByTestId("auto-dismiss-item");
    expect(item).toBeInTheDocument();

    // Fast-forward time to trigger auto-dismissal (3000ms for short duration)
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.queryByTestId("auto-dismiss-item")).not.toBeInTheDocument();
    });
  });

  it("auto-dismisses items with medium duration", async () => {
    let addFunction: ReturnType<typeof useSnackbar>["add"] | null = null;

    const TestComponent = () => {
      const { add } = useSnackbar();

      React.useEffect(() => {
        addFunction = add;
      }, [add]);

      return <div data-testid="test-component">Test</div>;
    };

    render(
      <Manager>
        <Snackbar>
          <TestComponent />
        </Snackbar>
      </Manager>,
    );

    await screen.findByTestId("test-component");

    act(() => {
      if (addFunction) {
        addFunction(
          (id: string) => (
            <div key={id} data-testid="medium-duration-item">
              Medium Duration Item
            </div>
          ),
          { duration: "medium" },
        );
      }
    });

    const item = await screen.findByTestId("medium-duration-item");
    expect(item).toBeInTheDocument();

    // Fast-forward time to trigger auto-dismissal (6000ms for medium duration)
    act(() => {
      jest.advanceTimersByTime(6000);
    });

    await waitFor(() => {
      expect(screen.queryByTestId("medium-duration-item")).not.toBeInTheDocument();
    });
  });

  it("auto-dismisses items with long duration", async () => {
    let addFunction: ReturnType<typeof useSnackbar>["add"] | null = null;

    const TestComponent = () => {
      const { add } = useSnackbar();

      React.useEffect(() => {
        addFunction = add;
      }, [add]);

      return <div data-testid="test-component">Test</div>;
    };

    render(
      <Manager>
        <Snackbar>
          <TestComponent />
        </Snackbar>
      </Manager>,
    );

    await screen.findByTestId("test-component");

    act(() => {
      if (addFunction) {
        addFunction(
          (id: string) => (
            <div key={id} data-testid="long-duration-item">
              Long Duration Item
            </div>
          ),
          { duration: "long" },
        );
      }
    });

    const item = await screen.findByTestId("long-duration-item");
    expect(item).toBeInTheDocument();

    // Fast-forward time to trigger auto-dismissal (12000ms for long duration)
    act(() => {
      jest.advanceTimersByTime(12_000);
    });

    await waitFor(() => {
      expect(screen.queryByTestId("long-duration-item")).not.toBeInTheDocument();
    });
  });

  it("calls onRemove callback when item is removed", async () => {
    const onRemoveMock = jest.fn();
    let addFunction: ReturnType<typeof useSnackbar>["add"] | null = null;
    let removeFunction: ReturnType<typeof useSnackbar>["remove"] | null = null;

    const TestComponent = () => {
      const { add, remove } = useSnackbar();

      React.useEffect(() => {
        addFunction = add;
        removeFunction = remove;
      }, [add, remove]);

      return <div data-testid="test-component">Test</div>;
    };

    render(
      <Manager>
        <Snackbar>
          <TestComponent />
        </Snackbar>
      </Manager>,
    );

    await screen.findByTestId("test-component");

    let itemId: string | null = null;

    act(() => {
      if (addFunction) {
        itemId = addFunction(
          (id: string) => (
            <div key={id} data-testid="callback-item">
              Callback Item
            </div>
          ),
          { onRemove: onRemoveMock },
        );
      }
    });

    const item = await screen.findByTestId("callback-item");
    expect(item).toBeInTheDocument();

    act(() => {
      if (removeFunction && itemId) {
        removeFunction(itemId);
      }
    });

    await waitFor(() => {
      expect(screen.queryByTestId("callback-item")).not.toBeInTheDocument();
      expect(onRemoveMock).toHaveBeenCalledTimes(1);
    });
  });

  it("clears timeout when item is manually removed", async () => {
    let addFunction: ReturnType<typeof useSnackbar>["add"] | null = null;
    let removeFunction: ReturnType<typeof useSnackbar>["remove"] | null = null;

    const TestComponent = () => {
      const { add, remove } = useSnackbar();

      React.useEffect(() => {
        addFunction = add;
        removeFunction = remove;
      }, [add, remove]);

      return <div data-testid="test-component">Test</div>;
    };

    render(
      <Manager>
        <Snackbar>
          <TestComponent />
        </Snackbar>
      </Manager>,
    );

    await screen.findByTestId("test-component");

    let itemId: string | null = null;

    act(() => {
      if (addFunction) {
        itemId = addFunction(
          (id: string) => (
            <div key={id} data-testid="timeout-item">
              Timeout Item
            </div>
          ),
          { duration: "short" },
        );
      }
    });

    const item = await screen.findByTestId("timeout-item");
    expect(item).toBeInTheDocument();

    // Remove item before timeout completes
    act(() => {
      if (removeFunction && itemId) {
        removeFunction(itemId);
      }
    });

    await waitFor(() => {
      expect(screen.queryByTestId("timeout-item")).not.toBeInTheDocument();
    });

    // Fast-forward time to ensure timeout doesn't trigger removal again
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Item should still be removed (not re-appear)
    expect(screen.queryByTestId("timeout-item")).not.toBeInTheDocument();
  });

  it("applies custom className", async () => {
    const customClass = "custom-snackbar-class";
    const initialItems = [(id: string) => <div key={id}>Test Item</div>];

    render(
      <Manager>
        <Snackbar initialItems={initialItems} className={customClass} data-testid="snackbar" />
      </Manager>,
    );

    const snackbar = await screen.findByTestId("snackbar");
    expect(snackbar).toHaveClass(customClass);
  });

  it("passes through other props", async () => {
    const initialItems = [(id: string) => <div key={id}>Test Item</div>];

    render(
      <Manager>
        <Snackbar
          initialItems={initialItems}
          data-testid="snackbar"
          data-custom-attr="custom-value"
        />
      </Manager>,
    );

    const snackbar = await screen.findByTestId("snackbar");
    expect(snackbar).toHaveAttribute("data-custom-attr", "custom-value");
  });
});
