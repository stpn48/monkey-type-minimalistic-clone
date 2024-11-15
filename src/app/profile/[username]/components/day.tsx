import { Activity } from "@prisma/client";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  activityThisDay: Activity | undefined;
  dayDate: Date;
};

export function Day({ activityThisDay, dayDate }: Props) {
  return (
    <div
      className={twMerge(
        "group relative size-4 rounded-md",
        getColorStrength(activityThisDay?.testsCompleted || 0),
      )}
    >
      <div className="hidden group-hover:block">
        <div className="padding-2 absolute -top-[60px] z-50 flex flex-col gap-2 rounded-lg bg-background text-xs opacity-75">
          <p>{dayDate.toLocaleDateString()}</p>
          <p>
            {activityThisDay?.testsCompleted
              ? `${activityThisDay?.testsCompleted} tests completed`
              : "No activity"}
          </p>
        </div>
      </div>
    </div>
  );
}

function getColorStrength(testsCompleted: number) {
  if (!testsCompleted) return "bg-foreground";

  if (testsCompleted < 5) {
    return "bg-green-900";
  }

  if (testsCompleted < 10) {
    return "bg-green-700";
  }

  if (testsCompleted < 15) {
    return "bg-green-600";
  }

  if (testsCompleted < 20) {
    return "bg-green-500";
  }

  return "bg-green-400";
}
