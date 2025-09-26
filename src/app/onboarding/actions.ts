"use server";
import { supabaseServer } from "@/lib/supabaseServer";
import { profileSchema, addressSchemaFR } from "@/lib/validation";
import { redirect } from "next/navigation";

export async function saveProfile(form: FormData) {
  const payload = profileSchema.parse({
    first_name: form.get("first_name"),
    last_name: form.get("last_name"),
    birth_year: form.get("birth_year"),
    is_adult: form.get("is_adult") === "on" || form.get("is_adult") === "true",
    phone: form.get("phone"),
  });

  const sb = await supabaseServer();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) throw new Error("auth.required");

  const { error } = await sb
    .from("profiles")
    .upsert({ user_id: user.id, ...payload });
  if (error) throw new Error(error.message);

  redirect("/onboarding/address");
}

export async function saveAddress(form: FormData) {
  const payload = addressSchemaFR.parse({
    label: form.get("label"),
    line1: form.get("line1"),
    line2: form.get("line2"),
    postal_code: form.get("postal_code"),
    city: form.get("city"),
    country: "FR",
    phone: form.get("phone"),
  });

  const sb = await supabaseServer();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) throw new Error("auth.required");

  const { error } = await sb
    .from("addresses")
    .insert({ user_id: user.id, ...payload });
  if (error) throw new Error(error.message);

  redirect("/compte");
}
