import { ProfileSearch } from "./components/profile-search";
import { TestsCompletedLeaderboard } from "./components/tests-completed-leaderboard";
import { WpmLeaderboard } from "./components/wpm-leaderboard";

type Props = {};

export default function SearchProfilesPage({}: Props) {
  return (
    <div className="flex flex-1 flex-col gap-20 font-geist-mono">
      <section className="flex w-full justify-center">
        <ProfileSearch />
      </section>
      <section className="flex justify-between">
        <WpmLeaderboard />
        <TestsCompletedLeaderboard />
      </section>
    </div>
  );
}
