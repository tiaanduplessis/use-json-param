import { useMemo, useCallback } from "react";
import { NavigateOptions, useSearchParams } from "react-router-dom";
import JSONCrush from "jsoncrush";
import merge from "deepmerge";

const parse = (val: string) =>
  JSON.parse(JSONCrush.uncrush(decodeURIComponent(val)));

const stringify = (val: any) =>
  encodeURIComponent(JSONCrush.crush(JSON.stringify(val)));

type Defaults = { [key: string]: any };

type Options = [] | [string, Defaults] | [Defaults] | [string];

export const useJsonParam = <T>(...opts: Options) => {
  const key = typeof opts[0] === "string" ? opts[0] : "q";
  const defaults =
    typeof opts[0] === "object"
      ? opts[0]
      : typeof opts[1] === "object"
      ? opts[1]
      : null;

  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = searchParams.get(key);

  const value = useMemo(() => {
    const parsed = paramValue ? parse(paramValue) : {};
    return defaults ? merge(defaults, parsed) : parsed;
  }, [paramValue, defaults]);

  const setValue = useCallback(
    (newValue: T, options?: NavigateOptions) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, stringify(newValue));
      setSearchParams(newSearchParams, { replace: true, ...options });
    },
    [key, searchParams, setSearchParams]
  );

  return useMemo<
    [T | undefined, (newQuery: T, options?: NavigateOptions) => void]
  >(() => [value, setValue], [value, setValue]);
};

export const useJSONParam = useJsonParam;
export default useJSONParam;
