import { sequentialPromiseAll } from "./promise";

/**
 * Executes callbacks in a sequential list of requestAnimationFrame calls
 * @param callbacks - The callbacks to execute.
 * @returns A promise that resolves when all callbacks have been executed.
 */
export const raf = <T>(
  callbacks: (() => T) | Array<() => T>,
): {
  /**
   * A promise that resolves when all callbacks have been executed.
   */
  promise: Promise<void | T[]>;
  /**
   * Cancels the execution of the callbacks.
   */
  cancel: () => void;
} => {
  const computedCallbacks = Array.isArray(callbacks) ? callbacks : [callbacks];

  const animationFrames: number[] = [];

  const cancelCallbacks: Array<() => void> = [];

  const promise = sequentialPromiseAll(
    computedCallbacks.map(
      (i, inden) => async () =>
        new Promise<T>((resolve, reject) => {
          cancelCallbacks.push(() => {
            reject(new Error("Cancelled"));
          });

          // if first request two frames as requestAnimationFrame is often called immediately
          if (inden === 0) {
            animationFrames.push(
              globalThis.requestAnimationFrame(() => {
                animationFrames.push(
                  globalThis.requestAnimationFrame(() => {
                    resolve(i());
                  }),
                );
              }),
            );
          } else {
            animationFrames.push(
              globalThis.requestAnimationFrame(() => {
                resolve(i());
              }),
            );
          }
        }),
    ),
  ).catch(() => {
    /* prevent unhandled rejection */
  });

  return {
    promise,
    cancel: (): void => {
      cancelCallbacks.forEach((cancel) => {
        cancel();
      });

      animationFrames.forEach((frame) => {
        cancelAnimationFrame(frame);
      });
    },
  };
};
