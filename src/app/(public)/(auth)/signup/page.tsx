import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SignupForm } from "@/components/auth/SignupForm";
import { HeaderBack } from "@/components/auth/HeaderBack";

export default async function Page() {
  const t = await getTranslations("auth");
  const tc = await getTranslations("common");
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl rounded-xl border border-white/10 bg-background/30 p-6 shadow-sm md:p-8">
        <HeaderBack label={tc("back")} />
        <h1 className="font-display text-3xl md:text-4xl text-brand mb-6 text-center">
          {t("signup_title")}
        </h1>
        <SignupForm />
        <p className="mt-4 text-sm opacity-80 text-center">
          {t("have_account")}{" "}
          <Link href="/login" className="underline text-[color:var(--brand)]">
            {t("link_login")}
          </Link>
        </p>
      </div>
    </main>
  );
}
