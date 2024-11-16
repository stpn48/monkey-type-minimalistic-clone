"use server";

import prisma from "@/utils/prisma";
import { Stats, UserData } from "@prisma/client";

type GetUserDataResponse = {
  error: string | null;
  data: (UserData & { stats: Stats }) | null | undefined;
};

export async function getUserData(username: string): Promise<GetUserDataResponse> {
  const userData = await prisma.userData.findFirst({
    where: {
      username: username,
    },
    include: { stats: true },
  });

  if (!userData) {
    return { error: "User data not found", data: null };
  }

  return { error: null, data: userData };
}
