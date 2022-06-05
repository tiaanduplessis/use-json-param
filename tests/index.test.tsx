import React, { ReactNode } from "react";
import { describe, test, expect, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { renderHook, act } from "@testing-library/react-hooks/dom";

import { useJSONParam } from "../src";

const wrapper = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("use-json-param", () => {
  test("should persist to search", () => {
    window.location.assign("/");
    const { result } = renderHook(() => useJSONParam(), { wrapper });
    expect(result.current[0]).toEqual({});

    act(() => {
      result.current[1]({ foo: true });
    });

    expect(result.current[0]).toEqual({ foo: true });
    expect(window.location.search).includes("?q=%28%27foo%21true%29_");
  });

  test.skip("should read existing search state", () => {});
  test.skip("should support custom key", () => {});
});
