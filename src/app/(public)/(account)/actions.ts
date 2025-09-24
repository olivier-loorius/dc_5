"use server";
import { supabaseServer } from "@/lib/supabaseServer";
import { signInSchema, signUpSchema } from "@/lib/validation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function doSignUp(form: FormData) {
  const data = signUpSchema.parse({
    email: form.get("email"),
    password: form.get("password"),
    passwordConfirm: form.get("passwordConfirm"),
  });

  const sb = supabaseServer();
  const { error } = await sb.auth.signUp({
    email: data.email,
    password: data.password,
  });
  if (error) {
    throw new Error(error.message);
  }

  // Pose le cookie age_ok si la case a été validée en amont
  if (!cookies().get("age_ok")) {
    cookies().set({
      name: "age_ok",
      value: "true",
      httpOnly: true,
      sameSite: "lax",
    });
  }

  redirect("/onboarding/identity");
}

export async function doSignIn(form: FormData) {
  const data = signInSchema.parse({
    email: form.get("email"),
    password: form.get("password"),
  });

  const sb = supabaseServer();
  const { error } = await sb.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}

