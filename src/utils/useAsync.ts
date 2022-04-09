import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  data: D | null;
  error: Error | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultState: State<null> = {
  data: null,
  error: null,
  status: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({
      ...state,
      ...action,
    }),
    {
      ...defaultState,
      ...initialState,
    }
  );

  const safeDispatch = useSafeDispatch(dispatch);
  const [retry, setRetry] = useState(() => () => {});

  const config = { ...defaultConfig, ...initialConfig };

  const setData = useCallback(
    (data: D) => {
      safeDispatch({
        data,
        error: null,
        status: "success",
      });
    },
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        data: null,
        error,
        status: "error",
      });
    },
    [safeDispatch]
  );

  const run = useCallback(
    (
      promise: Promise<D>,
      runConfig?: {
        retry: () => Promise<D>;
      }
    ) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }
      safeDispatch({ status: "loading" });
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig);
        }
      });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          // catch 会消化异常导致不再抛出
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    setData,
    setError,
    run,
    retry,
    ...state,
  };
};
