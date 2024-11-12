"use server";

import { createClient } from "@/utils/supabase/server";
import { Session, User, WeakPassword } from "@supabase/supabase-js";

type LoginResponse = {
  error: null | Error;
  data: null | {
    session: Session;
    user: User;
    weakPassword?: WeakPassword;
  };
};

export async function login(email: string, password: string): Promise<LoginResponse> {
  // TODO: check if the received arguments are valid

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error, data: null };

  return { error: null, data };
}
