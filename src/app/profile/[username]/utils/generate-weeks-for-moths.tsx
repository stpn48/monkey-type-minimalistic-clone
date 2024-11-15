import { addDays, eachDayOfInterval, endOfWeek, startOfWeek, subMonths } from "date-fns";

export function generateWeeksForMonths(months: number = 12) {
  const today = new Date();
  const threeMonthsAgo = subMonths(today, months);

  // Start from the beginning of the week 3 months ago
  const startDate = startOfWeek(threeMonthsAgo, { weekStartsOn: 1 }); // Sunday as the start of the week

  // Create an array of weeks
  const weeks = [];
  let currentStartOfWeek = startDate;

  while (currentStartOfWeek <= today) {
    // Get all days in the current week
    const daysInWeek = eachDayOfInterval({
      start: currentStartOfWeek,
      end: endOfWeek(currentStartOfWeek, { weekStartsOn: 1 }),
    }).map((date) => ({
      date,
    }));

    weeks.push(daysInWeek);

    // Move to the next week
    currentStartOfWeek = addDays(currentStartOfWeek, 7);
  }

  return weeks;
}
