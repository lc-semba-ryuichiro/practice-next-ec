/**
 * メディアクエリ Hook
 * @example
 * ```tsx
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * ```
 */

"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * メディアクエリにマッチするかどうかを監視する Hook
 * @param query - CSS メディアクエリ文字列
 * @returns メディアクエリにマッチするかどうか
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void): (() => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", callback);
      return () => {
        mediaQueryList.removeEventListener("change", callback);
      };
    },
    [query]
  );

  const getSnapshot = useCallback((): boolean => {
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback((): boolean => {
    return false;
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
