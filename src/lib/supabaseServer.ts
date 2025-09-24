import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

function firstEnv(names: string[]): string | undefined {
  for (const key of names) {
    const value = process.env[key];
    if (value && value.trim().length > 0) return value;
  }
  return undefined;
}

export function supabaseServer() {
  const cookieStore = cookies();

  // Supporte plusieurs conventions de variables d'environnement
  const url = firstEnv([
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_URL",
    "PUBLIC_SUPABASE_URL",
  ]);
  const anonKey = firstEnv([
    "SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "PUBLIC_SUPABASE_ANON_KEY",
  ]);

  if (!url || !anonKey) {
    throw new Error(
      "Variables Supabase manquantes. Requises (une des suivantes): URL=[NEXT_PUBLIC_SUPABASE_URL|SUPABASE_URL|PUBLIC_SUPABASE_URL], ANON_KEY=[SUPABASE_ANON_KEY|NEXT_PUBLIC_SUPABASE_ANON_KEY|PUBLIC_SUPABASE_ANON_KEY]"
    );
  }

  return createServerClient(url, anonKey, {
    cookies: {
      get: (name) => cookieStore.get(name)?.value,
      set: (name, value, options) =>
        cookieStore.set({ name, value, ...options }),
      remove: (name, options) =>
        cookieStore.set({ name, value: "", ...options }),
    },
  });
}
