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
        "group relative size-3 overflow-visible rounded-sm",
        getColorStrength(activityThisDay?.testsCompleted || 0),
      )}
    >
      <div className="relative hidden group-hover:block">
        <div className="padding-2 absolute -top-[60px] z-50 flex flex-col gap-2 whitespace-nowrap rounded-lg bg-background bg-opacity-80 p-2 text-xs text-text-primary">
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

// TODO: Add more colors, to theme
function getColorStrength(testsCompleted: number) {
  if (!testsCompleted) return "bg-background";

  if (testsCompleted < 5) {
    return "bg-primary/40";
  }

  if (testsCompleted < 10) {
    return "bg-primary/60";
  }

  if (testsCompleted < 15) {
    return "bg-primary/80";
  }

  return "bg-primary";
}
