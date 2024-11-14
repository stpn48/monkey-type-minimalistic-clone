import { getUserData } from "@/app/actions/get-user-data";
import { Statistic } from "@/components/statistic";
import Image from "next/image";
import { MainInfo } from "./components/main-stats";
import { SignOutButton } from "./components/sign-out-button";

type Props = {
  params: {
    username: string;
  };
};

export default async function AccountPage({ params }: Props) {
  const { username } = await params;
  const { data, error } = await getUserData(params.username);

  if (!data || !data.stats || error) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-col gap-10 font-geist-mono">
      <section className="flex gap-10">
        <MainInfo username={username} stats={data.stats} />
        {/* TODO: Activity field like on github */}
      </section>
      <SignOutButton /> {/* TODO: Move to the dropdown */}
    </div>
  );
}
