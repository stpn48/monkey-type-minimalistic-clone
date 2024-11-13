"use server";

import prisma from "@/utils/prisma";

export async function validateUsername(username: string) {
  const user = await prisma.userData.findFirst({
    where: {
      username: username,
    },
  });

  if (user) {
    return false;
  }

  return true;
}
