import React from "react";

type Props = {
  label: string;
  value: string | number;
};

export function Statistic({ label, value }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h1>{label}</h1>
      <p className="text-4xl font-bold text-primary">{value}</p>
    </div>
  );
}
