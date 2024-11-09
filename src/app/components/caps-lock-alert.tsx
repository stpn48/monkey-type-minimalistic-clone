"use client";

import { useTypingField } from "@/context/use-typing-field";
import React from "react";

export function CapsLockAlert() {
  const { capsLockActive } = useTypingField();

  return (
    <>
      {capsLockActive && (
        <div className="absolute left-1/2 -translate-x-1/2 rounded-lg bg-primary px-4 py-4 text-text">
          Caps Lock is on
        </div>
      )}
    </>
  );
}
