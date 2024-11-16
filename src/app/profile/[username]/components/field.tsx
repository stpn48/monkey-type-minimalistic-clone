"use client";

import { Select } from "@/components/select";
import { Activity } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { generateWeeksForMonths } from "../utils/generate-weeks-for-moths";
import { Week } from "./week";

const monthOptions = [
  { value: "12", label: "12 months" },
  { value: "6", label: "6 months" },
  { value: "3", label: "3 months" },
  { value: "1", label: "1 month" },
];

type Props = {
  activities: Activity[];
};

type Week = {
  date: Date;
}[][];

export function Field({ activities }: Props) {
  const [months, setMonths] = useState(12);
  const [weeks, setWeeks] = useState<Week>([]);

  useEffect(() => {
    const weeks = generateWeeksForMonths(months);
    setWeeks(weeks);
  }, [months]);

  return (
    <>
      {/* SELECT MONTHS */}
      <Select options={monthOptions} onValueChange={(value) => setMonths(Number(value))} />

      {/* FIELD */}
      <div className="flex w-fit flex-col gap-4 bg-foreground p-4">
        <div className="flex gap-4">
          <div className="flex flex-col justify-center gap-2">
            <p>Mon</p>
            <p>Wed</p>
            <p>Fri</p>
          </div>
          <div className="flex h-fit gap-[2px]">
            {weeks.map((week, weekIndex) => (
              <Week key={weekIndex} week={week} activities={activities} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
