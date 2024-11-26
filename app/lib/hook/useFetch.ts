import useBool from "@/app/lib/hook/useBool";
import { cloneDeepWith, isNumber, omit } from "lodash";
import { useCallback } from "react";

type PromiseFnType =
  | Record<string, string | number>
  | {
      params?: Record<string, string | number>;
    };

const useFetch = <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  uri: string,
) => {
  const [isFetching, start, stop] = useBool();
  const promiseFn = useCallback(
    async (data?: PromiseFnType) => {
      let responseData;

      try {
        start();

        const params = cloneDeepWith(data?.params, (value) => {
          if (isNumber(value)) return String(value);
        });
        let query = new URLSearchParams(params).toString();

        query = query ? "?" + query : query;

        const body = omit(data, ["params"]);
        let response;

        switch (method) {
          case "GET":
            response = await fetch(uri + query);

            break;

          default:
            response = await fetch(uri + query, {
              method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            });
            break;
        }

        responseData = (await response.json()).data;
      } finally {
        stop();
      }

      return responseData as T;
    },
    [uri, method, start, stop],
  );

  return [promiseFn, isFetching] as [
    (data?: PromiseFnType) => Promise<T>,
    boolean,
  ];
};

export default useFetch;
