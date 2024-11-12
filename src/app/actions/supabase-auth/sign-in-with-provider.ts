"use server";

import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

type Response = {
  error: null | Error;
};

export async function signInWithProvider(provider: Provider): Promise<Response> {
  //TODO: check if the received arguments are valid

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
    },
  });

  if (error) return { error };

  if (data.url) {
    redirect(data.url);
  }

  return { error: null };
}
