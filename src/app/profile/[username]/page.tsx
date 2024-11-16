import { getUserData } from "@/app/actions/get-user-data";
import { ActivityField } from "./components/activity-field";
import { MainInfo } from "./components/main-stats";
import { SignOutButton } from "./components/sign-out-button";

type Props = {
  params: {
    username: string;
  };
};

export default async function AccountPage({ params }: Props) {
  const { username } = await params;
  const { data, error } = await getUserData(username);

  if (!data || !data.stats || error) {
    return <div className="mt-10 flex w-full justify-center">User not found</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-10 font-geist-mono">
      <MainInfo username={username} stats={data.stats} />
      <ActivityField userId={data.id} />
    </div>
  );
}
