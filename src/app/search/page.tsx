import { Input } from "@/components/input";
import React from "react";
import { ProfileSearch } from "./components/profile-search";

type Props = {};

export default function SearchProfilesPage({}: Props) {
  return (
    <div className="fle flex-1 flex-col gap-4 font-geist-mono">
      <section className="flex w-full justify-center">
        <ProfileSearch />
      </section>
      <section className="ga-4 flex">
        <section></section>
        <section></section>
        <section></section>
      </section>
    </div>
  );
}
