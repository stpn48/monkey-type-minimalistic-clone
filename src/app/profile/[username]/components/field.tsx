"use client";

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
    <div className="flex flex-col gap-4">
      <select className="w-fit" value={months} onChange={(e) => setMonths(Number(e.target.value))}>
        <option value={12}>12 months</option>
        <option value={6}>6 months</option>
        <option value={3}>3 months</option>
        <option value={1}>1 month</option>
      </select>
      <div className="flex h-fit w-fit gap-1 rounded-lg bg-foreground p-4">
        <div>
          <p>Monday</p>
          <p>Tuesday</p>
          <p>Wednesday</p>
          <p>Thursday</p>
          <p>Friday</p>
          <p>Saturday</p>
          <p>Sunday</p>
        </div>
        {weeks.map((week, weekIndex) => (
          <Week key={weekIndex} week={week} activities={activities} />
        ))}
      </div>
    </div>
  );
}
