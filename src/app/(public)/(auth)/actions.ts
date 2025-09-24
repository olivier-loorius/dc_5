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
    if (error.message?.toLowerCase().includes("registered")) {
      // Utilisateur déjà inscrit → tenter un sign-in direct
      const { error: signInErr } = await sb.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (signInErr) {
        // Rediriger vers login si le mot de passe ne correspond pas
        redirect("/login");
      }
    } else {
      throw new Error(error.message);
    }
  }

  // Next 15: cookies() doit être await avant utilisation
  const ck = await cookies();
  if (!ck.get("age_ok")) {
    ck.set({ name: "age_ok", value: "true", httpOnly: true, sameSite: "lax" });
  }

  redirect("/onboarding/identity?signup=success");
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
