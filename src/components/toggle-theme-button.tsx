"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

//TODO: rename this component
export function ToggleThemeButton() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (isMounted) {
        setTheme(e.target.value);
      }
    },
    [setTheme],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !theme) return null;

  return (
    <select className="bg-background" onChange={toggleTheme} value={theme}>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
}
