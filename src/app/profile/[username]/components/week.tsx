import { Activity } from "@prisma/client";
import { Day } from "./day";

type Props = {
  week: {
    date: Date;
  }[];

  activities: Activity[];
};

export function Week({ week, activities }: Props) {
  return (
    <div className="flex flex-col gap-[2px]">
      {week.map((day, dayIndex) => {
        // find the activity for this day
        const activityThisDay = activities.find(
          (activity) => activity.createdAt.getTime() === day.date.getTime(),
        );

        return <Day key={dayIndex} dayDate={day.date} activityThisDay={activityThisDay} />;
      })}
    </div>
  );
}
