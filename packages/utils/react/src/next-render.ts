import { useCallback, useEffect, useState } from "react";

// export const useNextRender = (): ((callback: () => void) => void) =>
//   useCallback((callback: () => void): void => {
//     window.requestAnimationFrame(() => {
//       window.requestAnimationFrame(callback);
//     });
//   }, []);

export const useNextRender = (): ((callback: () => void) => void) => {
  const [callbackQueue, setCallbackQueue] = useState<Array<() => void>>([]);

  const fn = useCallback((callback: () => void) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setCallbackQueue((v) => [...v, callback]);
        });
      });
    });
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
