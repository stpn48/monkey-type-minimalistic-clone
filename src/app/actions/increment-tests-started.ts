"use server";

import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";

type Response = {
  error: null | string;
};

export async function incrementTestsStarted(): Promise<Response> {
  const user = await getUser();

  if (!user) {
    return { error: "user not found" };
  }

  try {
    await prisma.userData.update({
      where: {
        id: user.id,
      },
      data: {
        stats: {
          update: {
            totalTestsStarted: {
              increment: 1,
            },
          },
        },
      },
    });

    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "error updating stats" };
  }
}
