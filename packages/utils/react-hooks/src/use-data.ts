import { useState, useMemo, useRef, useEffect } from "react";

export interface UseDataReturn {
  data: unknown;
  dataPromise: Promise<unknown> | undefined;
  loading: boolean;
  error: string | undefined;
}

export const useData = (url: string): UseDataReturn => {
  const [dataPromise, setDataPromise] = useState<UseDataReturn["dataPromise"]>(undefined);
  const [data, setData] = useState<UseDataReturn["data"]>(undefined);
  const [loading, setLoading] = useState(0);
  const [error, setError] = useState<UseDataReturn["error"]>(undefined);
  const mounted = useRef(false);
  const computedLoading = useMemo(() => loading > 0, [loading]);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, [url]);

  useEffect(() => {
    setLoading((v) => v + 1);

    void (async (): Promise<void> => {
      try {
        const dataPromise = (async (): Promise<unknown> => {
          const response = await fetch(url);

          return response.json();
        })();

        setDataPromise(dataPromise);

        const data: unknown = await dataPromise;

        if (mounted.current) setData(data);
      } catch (error: unknown) {
        if (mounted.current)
          setError(error instanceof Error ? error.message : JSON.stringify(error));
      }

      if (mounted.current) setLoading((v) => v - 1);
    })();
  }, [url]);

  return {
    loading: computedLoading,
    data,
    dataPromise,
    error,
  };
};
