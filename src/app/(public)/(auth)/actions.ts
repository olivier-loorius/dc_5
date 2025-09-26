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

  const sb = await supabaseServer();
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
  console.log("🔐 doSignIn appelé");

  try {
    const rawEmail = form.get("email");
    const rawPassword = form.get("password");

    console.log("📧 Données reçues:", {
      email: rawEmail,
      password: rawPassword ? "***" : "VIDE",
    });

    const data = signInSchema.parse({
      email: rawEmail,
      password: rawPassword,
    });

    console.log("✅ Validation OK");

    const sb = await supabaseServer();
    console.log("🔗 Supabase client créé");

    const { error, data: authData } = await sb.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.error("❌ Erreur Supabase:", error);
      throw new Error(error.message);
    }

    console.log("✅ Connexion réussie:", authData.user?.email);
    console.log("🏠 Redirection vers /");

    redirect("/");
  } catch (error) {
    console.error("💥 Erreur doSignIn:", error);
    throw error;
  }
}
