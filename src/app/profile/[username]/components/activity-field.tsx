import prisma from "@/utils/prisma";
import { Field } from "./field";

type Props = {
  userId: string;
};

export async function ActivityField({ userId }: Props) {
  if (!userId) {
    return <p>Unexpected error: userId is not defined</p>;
  }

  const activities = await prisma.activity.findMany({
    where: {
      userDataId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col items-center gap-6 font-geist-mono">
      <h1 className="text-text">ACTIVITY</h1>
      <Field activities={activities} />
    </div>
  );
}
