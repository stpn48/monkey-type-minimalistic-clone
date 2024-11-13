"use server";

import prisma from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";
import { Session, User } from "@supabase/supabase-js";

type SignUpResponse = {
  error: null | Error;
  user: User | null;
};

export async function signUp(
  username: string,
  email: string,
  password: string,
): Promise<SignUpResponse> {
  // TODO: check if the received arguments are valid

  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !user) return { error, user: null };

  await prisma.userData.create({
    data: {
      id: user.id,
      username,
      stats: {
        create: {
          allTimeWpm: 0,
          totalTestsCompleted: 0,
          totalTestsStarted: 0,
          totalTimeTyped: 0,
          totalWordsTyped: 0,
          totalLettersTyped: 0,
          totalCorrectLettersTyped: 0,
          totalMistakes: 0,
        },
      },
    },
  });

  await supabase.auth.signInWithPassword({ email, password });

  return { error: null, user };
}
