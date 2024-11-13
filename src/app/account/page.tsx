import React from "react";
import { getUserData } from "../actions/get-user-data";

type Props = {};

export default async function AccountPage({}: Props) {
  const { data, error } = await getUserData();
  return <div className="">{data?.username || "no user logged in"}</div>;
}
