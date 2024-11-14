"use server";

import prisma from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";

type LoginResponse = {
  error: null | Error;
  username: string | null;
};

export async function login(email: string, password: string): Promise<LoginResponse> {
  // TODO: check if the received arguments are valid

  const supabase = await createClient();

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error, username: null };

  const data = await prisma.userData.findFirst({
    where: {
      id: user.user.id,
    },
    select: { username: true },
  });

  console.log("data", data?.username);

  return { error: null, username: data?.username || null };
}
