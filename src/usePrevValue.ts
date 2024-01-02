import { useEffect, useRef } from "react";

export const usePrevValueRef = (value: any) => {
  const prevValueRef = useRef(value);

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  return prevValueRef;
};
