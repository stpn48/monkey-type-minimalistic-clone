"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Activity } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { generateWeeksForMonths } from "../utils/generate-weeks-for-moths";
import { Week } from "./week";

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
      <select
        name="months"
        className="w-fit rounded-md bg-foreground" // TODO: Add a custom select component
        id="months"
        onChange={(e) => setMonths(Number(e.target.value))}
      >
        <option value="12">12 months</option>
        <option value="6">6 months</option>
        <option value="3">3 months</option>
        <option value="1">1 month</option>
      </select>

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
