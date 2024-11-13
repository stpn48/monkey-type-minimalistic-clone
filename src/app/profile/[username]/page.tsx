import { getUserData } from "@/app/actions/get-user-data";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    username: string;
  };
};

export default async function AccountPage({ params }: Props) {
  const { data, error } = await getUserData(params.username);
  return (
    <div className="">
      <section className="bg-foreground">
        <Image src={data?.avatarUrl || ""} alt="avatar" width={100} height={100} />
        <h1>{data?.username}</h1>
      </section>
      <section></section>
    </div>
  );
}
