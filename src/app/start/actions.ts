"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setAgeOk(form: FormData) {
  const ok = form.get("age_ok");
  const next = (form.get("next") as string) || "/";
  if (ok === "on" || ok === "true") {
    cookies().set({
      name: "age_ok",
      value: "true",
      httpOnly: true,
      sameSite: "lax",
    });
    redirect(next);
  }
  throw new Error("age.required");
}
