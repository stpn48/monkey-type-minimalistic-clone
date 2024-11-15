import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import { addDays, eachDayOfInterval, endOfWeek, startOfWeek, subMonths } from "date-fns";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Week } from "./week";

type Props = {
  userId: string;
};

export async function ActivityField({ userId }: Props) {
  if (!userId) {
    return <div>Only the user can see the activity field... for now</div>;
  }

  const activities = await prisma.activity.findMany({
    where: {
      userDataId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const weeks = generateWeeksForLastThreeMonths();

  return (
    <div className="flex gap-2">
      {weeks.map((week, weekIndex) => (
        <Week key={weekIndex} week={week} activities={activities} />
      ))}
    </div>
  );
}

function generateWeeksForLastThreeMonths() {
  const today = new Date();
  const threeMonthsAgo = subMonths(today, 3);

  // Start from the beginning of the week 3 months ago
  const startDate = startOfWeek(threeMonthsAgo, { weekStartsOn: 0 }); // Sunday as the start of the week

  // Create an array of weeks
  const weeks = [];
  let currentStartOfWeek = startDate;

  while (currentStartOfWeek <= today) {
    // Get all days in the current week
    const daysInWeek = eachDayOfInterval({
      start: currentStartOfWeek,
      end: endOfWeek(currentStartOfWeek, { weekStartsOn: 0 }),
    }).map((date) => ({
      date,
    }));

    weeks.push(daysInWeek);

    // Move to the next week
    currentStartOfWeek = addDays(currentStartOfWeek, 7);
  }

  return weeks;
}
