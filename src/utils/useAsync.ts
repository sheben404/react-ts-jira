import { useState } from "react";
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

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState({
    ...defaultState,
    ...initialState,
  });

  const [retry, setRetry] = useState(() => () => {});

  const mountedRef = useMountedRef();

  const config = { ...defaultConfig, ...initialConfig };

  const setData = (data: D) => {
    setState({
      data,
      error: null,
      status: "success",
    });
  };

  const setError = (error: Error) => {
    setState({
      data: null,
      error,
      status: "error",
    });
  };

  const run = (
    promise: Promise<D>,
    runConfig?: {
      retry: () => Promise<D>;
    }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    setState({ ...state, status: "loading" });
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig.retry(), runConfig);
      }
    });
    return promise
      .then((data) => {
        if (mountedRef.current) {
          setData(data);
        }
        return data;
      })
      .catch((error) => {
        setError(error);
        // catch 会消化异常导致不再抛出
        if (config.throwOnError) return Promise.reject(error);
        return error;
      });
  };

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
