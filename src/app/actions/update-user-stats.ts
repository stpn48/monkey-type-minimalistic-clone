"use server";

import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";

type Stats = {
  wpm: number;
  totalWords: number;
  correctLetters: number;
  duration: number;
  mistakes: number;
};

type Response = {
  error: null | string;
};

export async function updateUserStats(stats: Stats): Promise<Response> {
  const user = await getUser();

  if (!user) {
    return { error: "user not found" };
  }

  const currentStats = await prisma.userData.findFirst({
    where: {
      id: user.id,
    },
    select: {
      stats: true,
    },
  });

  if (!currentStats) {
    return { error: "user stats not found" };
  }

  const newAllTimeWpm = Math.max(currentStats.stats.allTimeWpm, stats.wpm);

  try {
    await prisma.userData.update({
      where: {
        id: user.id,
      },
      data: {
        stats: {
          update: {
            totalCorrectLettersTyped: {
              increment: stats.correctLetters,
            },
            totalWordsTyped: {
              increment: stats.totalWords,
            },
            totalTestsCompleted: {
              increment: 1,
            },
            totalMistakes: {
              increment: stats.mistakes,
            },
            totalTimeTyped: {
              increment: stats.duration,
            },
            totalLettersTyped: {
              increment: stats.correctLetters + stats.mistakes,
            },
            allTimeWpm: newAllTimeWpm,
          },
        },
      },
    });

    console.log("updating activity or creating new one");
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Reset to start of the day
    todayStart.setDate(todayStart.getDate() + 1);

    await prisma.activity.upsert({
      where: {
        createdAt_userDataId: {
          createdAt: todayStart,
          userDataId: user.id,
        },
      },
      update: {
        testsCompleted: {
          increment: 1,
        },
      },
      create: {
        createdAt: todayStart,
        testsCompleted: 1,
        userDataId: user.id,
      },
    });

    console.log("stats updated successfully");
    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "stats update failed" };
  }
}
