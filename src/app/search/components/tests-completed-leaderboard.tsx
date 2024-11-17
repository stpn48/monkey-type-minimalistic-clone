import prisma from "@/utils/prisma";
import Link from "next/link";

export async function TestsCompletedLeaderboard() {
  const users = await prisma.userData.findMany({
    select: {
      username: true,
      stats: {
        select: {
          totalTestsCompleted: true,
        },
      },
    },
    orderBy: {
      stats: {
        totalTestsCompleted: "desc",
      },
    },
    take: 10,
  });

  return (
    <section className="flex w-[400px] flex-col gap-4 rounded-lg bg-foreground p-4">
      <h1 className="flex w-full justify-center text-xl font-bold text-primary">TESTS COMPLETED</h1>
      {users.map((user, userIndex) => (
        <Link
          key={user.username}
          href={`/profile/${user.username}`}
          className={`${userIndex % 2 === 0 ? "bg-background/50" : "bg-foreground"} flex items-center justify-between gap-4 rounded-lg px-4 py-2 hover:bg-background`}
        >
          <div className="flex items-center gap-4">
            <h1 className="text-base">{userIndex + 1}.</h1>
            <h1>{user.username}</h1>
          </div>

          <p>{user.stats.totalTestsCompleted} Completed</p>
        </Link>
      ))}
    </section>
  );
}
