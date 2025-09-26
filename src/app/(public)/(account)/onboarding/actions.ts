"use server";
import { supabaseServer } from "@/lib/supabaseServer";
import { profileSchema, addressSchemaFR } from "@/lib/validation";
import { redirect } from "next/navigation";

export async function saveProfile(form: FormData) {
  const parsed = profileSchema.parse({
    first_name: form.get("first_name"),
    last_name: form.get("last_name"),
    birthdate: form.get("birthdate"),
    phone: form.get("phone"),
  });

  // Convertir JJ/MM/AAAA vers Date et calculer 18 ans + 1 jour
  const [dd, mm, yyyy] = (parsed.birthdate as string).split("/");
  const birth = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  if (isNaN(birth.getTime())) {
    throw new Error("profile.badBirthdate");
  }
  const today = new Date();
  const adultThreshold = new Date(
    birth.getFullYear() + 18,
    birth.getMonth(),
    birth.getDate() + 1
  );
  const isAdult = today >= adultThreshold;
  if (!isAdult) {
    redirect("/onboarding/identity?error=mustBeAdult");
  }

  const payload = {
    first_name: parsed.first_name,
    last_name: parsed.last_name,
    birth_year: birth.getFullYear(),
    is_adult: true,
    phone: parsed.phone ?? null,
  } as const;

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

  redirect("/compte?onboarding=done");
}
