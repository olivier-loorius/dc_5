import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { doSignIn } from "@/app/(public)/(auth)/actions";
import { Button } from "@/components/ui/button";
import { PasswordField } from "@/components/auth/PasswordField";
import { HeaderBack } from "@/components/auth/HeaderBack";

export default async function Page() {
  const t = await getTranslations("auth");
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl rounded-xl border border-white/10 bg-background/30 p-6 shadow-sm md:p-8">
        <HeaderBack label={(await getTranslations("common"))("back")} />
        <h1 className="font-display text-3xl md:text-4xl text-brand mb-6 text-center">
          {t("login_title")}
        </h1>
        <form action={doSignIn} className="grid gap-5">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm opacity-90">
              {t("email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="peer bg-input/30 border-input text-foreground placeholder:opacity-60 rounded-md border px-3 py-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 invalid:border-destructive invalid:ring-destructive/20"
              placeholder={t("email")}
              defaultValue=""
            />
            <p className="hidden peer-invalid:block text-xs text-destructive">
              {t("invalidEmail")}
            </p>
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="text-sm opacity-90">
              {t("password")}
            </label>
            <PasswordField
              id="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder={t("password")}
              invalidHint={t("required")}
              value=""
            />
          </div>
          <Button type="submit" className="w-full">
            {t("login_submit")}
          </Button>
          <p className="text-sm opacity-80 text-center">
            {t("no_account")}{" "}
            <Link
              href="/signup"
              className="underline text-[color:var(--brand)]"
            >
              {t("link_signup")}
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
