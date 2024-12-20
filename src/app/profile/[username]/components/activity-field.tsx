"use client";

import { Activity } from "@prisma/client";
import { useEffect, useState } from "react";
import { generateWeeksForMonths } from "../utils/generate-weeks-for-moths";
import { Week } from "./week";

// const monthOptions = [
//   { value: "12", label: "12 months" },
//   { value: "6", label: "6 months" },
//   { value: "3", label: "3 months" },
//   { value: "1", label: "1 month" },
// ];

type Props = {
  activities: Activity[];
};

type Week = {
  date: Date;
}[][];

export function ActivityField({ activities }: Props) {
  // const [months, setMonths] = useState(12);
  const [weeks, setWeeks] = useState<Week>([]);

  useEffect(() => {
    const weeks = generateWeeksForMonths(12);
    setWeeks(weeks);
  }, []);

  return (
    <div className="mt-10 flex justify-center gap-4 font-geist-mono">
      {/* SELECT MONTHS */}
      {/* <Select options={monthOptions} onValueChange={(value) => setMonths(Number(value))} /> */}

      {/* FIELD */}
      <div className="flex w-fit flex-col gap-4 rounded-lg bg-foreground p-4">
        <div className="flex gap-4">
          <div className="flex flex-col justify-center gap-2">
            <p>Mon</p>
            <p>Wed</p>
            <p>Fri</p>
            <p>Sun</p>
          </div>
          <div className="flex h-fit gap-[2px]">
            {weeks.map((week, weekIndex) => (
              <Week key={weekIndex} week={week} activities={activities} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
