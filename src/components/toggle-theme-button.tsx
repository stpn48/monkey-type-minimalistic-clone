"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

type Props = {
  className?: string;
};

//TODO: rename this component
export function ToggleThemeButton({ className }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTheme(e.target.value);
    },
    [setTheme],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <select
      className="absolute bottom-4 right-4 bg-background"
      onChange={toggleTheme}
      value={theme}
    >
      <option value="dark">Dark</option>
      <option value="light">Light</option>
      <option value="vercel">Vercel</option>
    </select>
  );
}
