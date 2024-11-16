import { getUserData } from "@/app/actions/get-user-data";
import prisma from "@/utils/prisma";
import { ActivityField } from "./components/activity-field";
import { MainInfo } from "./components/main-stats";

type Props = {
  params: {
    username: string;
  };
};

export default async function AccountPage({ params }: Props) {
  const { username } = await params;
  const { data, error } = await getUserData(username);

  if (!data?.id) {
    return <p>Unexpected error: userId is not defined</p>;
  }

  const activities = await prisma.activity.findMany({
    where: {
      userDataId: data.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!data || !data.stats || error) {
    return <div className="mt-10 flex w-full justify-center">User not found</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-10 font-geist-mono">
      <MainInfo username={username} stats={data.stats} />
      <ActivityField activities={activities} />
    </div>
  );
}
