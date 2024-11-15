"use client";

import { Logo } from "@/components/icons";
import { useStatisticsStore } from "@/context/use-statistics";
import { useTypingField } from "@/context/use-typing-field";
import { usePreserveSearchParams } from "@/hooks/use-preserve-search-params";
import React, { useCallback } from "react";

export function LogoButton() {
  const { navigateWithParams } = usePreserveSearchParams();
  const { resetTypingField } = useTypingField();
  const { resetStatistics } = useStatisticsStore();

  const handleLogoClick = useCallback(() => {
    navigateWithParams("/", "replace");
    resetStatistics();
    resetTypingField();
  }, [navigateWithParams, resetStatistics, resetTypingField]);

  return (
    <div onClick={handleLogoClick} className="flex cursor-pointer items-center gap-2">
      <Logo />
      <h1 className="font-geist-sans text-2xl font-bold text-text-primary">tpye</h1>
    </div>
  );
}
