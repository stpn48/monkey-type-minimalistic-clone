"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { Select } from "./select";

const themes = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "norse", label: "Norse" },
  { value: "mountain", label: "Mountain" },
];

//TODO: rename this component
export function ToggleThemeButton() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(
    (value: string) => {
      if (isMounted) {
        setTheme(value);
      }
    },
    [setTheme, isMounted],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !theme) return null;

  return <Select options={themes} onValueChange={toggleTheme} defaultValue={theme} />;
}
