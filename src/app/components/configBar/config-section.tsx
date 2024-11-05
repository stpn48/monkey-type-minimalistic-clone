import React from "react";

type Props = {
  children: React.ReactNode;
};

export function ConfigSection({ children }: Props) {
  return <section className="flex gap-4">{children}</section>;
}
