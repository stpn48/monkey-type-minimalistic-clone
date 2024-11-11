import { useTypingField } from "@/context/use-typing-field";
import { useEffect, useRef } from "react";

export function useContainerWidth() {
  const { setFieldWidth } = useTypingField();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current?.offsetWidth) {
      setFieldWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef.current?.offsetWidth, setFieldWidth]);

  return { containerRef };
}
