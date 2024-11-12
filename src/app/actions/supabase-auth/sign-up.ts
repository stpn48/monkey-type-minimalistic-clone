"use server";

import { createClient } from "@/utils/supabase/server";
import { Session, User, WeakPassword } from "@supabase/supabase-js";

type SignUpResponse = {
  error: null | Error;
  data: null | {
    session: Session | null;
    user: User | null;
  };
};

export async function signUp(email: string, password: string): Promise<SignUpResponse> {
  // TODO: check if the received arguments are valid

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return { error, data: null };

  return { error: null, data };
}
