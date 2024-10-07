import { useEffect, useRef } from "react";

/**
 * Inspired by react-ecs.
 * @see https://github.com/dustinlacewell/react-ecs/blob/master/libs/core/src/hooks/useAnimationFrame.ts
 */
export const useAnimationFrame = (
  callback: (dt: number, time: number) => void,
) => {
  const requestRef = useRef<number>(null as unknown as number);
  const previousTimeRef = useRef<number>(null as unknown as number);

  const animate = (time: number) => {
    // biome-ignore lint/suspicious/noDoubleEquals: null + undefined check
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime, time);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: animate changes every render
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
};
