"use server";
import { supabaseServer } from "@/lib/supabaseServer";
import { signInSchema, signUpSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

export async function doSignUp(form: FormData) {
  const data = signUpSchema.parse({
    email: form.get("email"),
    password: form.get("password"),
    passwordConfirm: form.get("passwordConfirm"),
  });

  const sb = await supabaseServer();
  const { error } = await sb.auth.signUp({
    email: data.email,
    password: data.password,
  });
  if (error) {
    throw new Error(error.message);
  }

  redirect("/onboarding/identity");
}

export async function doSignIn(form: FormData) {
  const data = signInSchema.parse({
    email: form.get("email"),
    password: form.get("password"),
  });

  const sb = await supabaseServer();
  const { error } = await sb.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}
