import { ToggleThemeButton } from "@/components/toggle-theme-button";
import React from "react";

export function Footer() {
  return (
    <div className="fixed bottom-8 flex w-screen items-center justify-between px-8">
      <h1>footer</h1>
      <ToggleThemeButton />
    </div>
  );
}
