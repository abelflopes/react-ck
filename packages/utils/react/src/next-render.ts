import { useCallback, useEffect, useState } from "react";

// export const useNextRender = (): ((callback: () => void) => void) =>
//   useCallback((callback: () => void): void => {
//     window.requestAnimationFrame(() => {
//       window.requestAnimationFrame(callback);
//     });
//   }, []);

export const onNextRender = (callback: () => void): (() => void) => {
  const animationFrames: number[] = [];

  animationFrames.push(
    window.requestAnimationFrame(() => {
      animationFrames.push(
        window.requestAnimationFrame(() => {
          animationFrames.push(window.requestAnimationFrame(callback));
        }),
      );
    }),
  );

  return () => {
    animationFrames.forEach(cancelAnimationFrame);
  };
};

export const useNextRender = (): ((callback: () => void) => void) => {
  const [callbackQueue, setCallbackQueue] = useState<Array<() => void>>([]);

  const fn = useCallback((callback: () => void) => {
    onNextRender(callback);
  }, []);

  useEffect(() => {
    if (!callbackQueue.length) return;

    callbackQueue.forEach((i) => {
      i();
    });

    setCallbackQueue((v) => v.filter((i) => !callbackQueue.includes(i)));
  }, [callbackQueue]);

  return fn;
};
