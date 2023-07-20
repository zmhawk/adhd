import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();
  useEffect(() => {
    savedCallback.current = callback;
  });
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    tick();
    if (delay) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
