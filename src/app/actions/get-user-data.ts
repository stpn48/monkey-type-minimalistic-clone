"use server";

import prisma from "@/utils/prisma";
import { createClient, getUser } from "@/utils/supabase/server";
import { Stats, UserData } from "@prisma/client";

type GetUserDataResponse = {
  error: string | null;
  data: (UserData & { stats: Stats }) | null;
};

export async function getUserData(): Promise<GetUserDataResponse> {
  const user = await getUser();

  if (!user) {
    return { error: "User not found", data: null };
  }

  const userData = await prisma.userData.findFirst({
    where: {
      id: user.id,
    },
    include: {
      stats: true,
    },
  });

  if (!userData) {
    return { error: "User data not found", data: null };
  }

  return { error: null, data: userData };
}
