import { saveProfile } from "@/app/(public)/(account)/onboarding/actions";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { HeaderBack } from "@/components/auth/HeaderBack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone } from "@fortawesome/free-solid-svg-icons";
import { BirthdateField } from "@/components/auth/BirthdateField";

export default async function Page() {
  const t = await getTranslations("onboarding");
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl rounded-xl border border-white/10 bg-background/30 p-6 shadow-sm md:p-8">
        <HeaderBack label={(await getTranslations("common"))("back")} />
        <h1 className="font-display text-3xl text-brand mb-6">
          {t("identity_title")}
        </h1>
        <form action={saveProfile} className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="first_name" className="text-sm opacity-90">
              {t("first_name")}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--brand)]">
                <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
              </span>
              <input
                id="first_name"
                name="first_name"
                required
                placeholder="Jean"
                className="peer bg-input/30 border-input text-foreground placeholder:opacity-60 rounded-md border pl-10 pr-3 py-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 invalid:border-destructive invalid:ring-destructive/20 w-full"
              />
            </div>
            <p className="hidden peer-invalid:block text-xs text-destructive">
              Prénom invalide
            </p>
            <p className="text-xs text-white/60">{t("first_name_help")}</p>
          </div>
          <div className="grid gap-2">
            <label htmlFor="last_name" className="text-sm opacity-90">
              {t("last_name")}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--brand)]">
                <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
              </span>
              <input
                id="last_name"
                name="last_name"
                required
                placeholder="Dupont"
                className="peer bg-input/30 border-input text-foreground placeholder:opacity-60 rounded-md border pl-10 pr-3 py-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 invalid:border-destructive invalid:ring-destructive/20 w-full"
              />
            </div>
            <p className="hidden peer-invalid:block text-xs text-destructive">
              Nom invalide
            </p>
            <p className="text-xs text-white/60">{t("last_name_help")}</p>
          </div>
          <div className="grid gap-2">
            <label htmlFor="birthdate" className="text-sm opacity-90">
              {t("birthdate")}
            </label>
            <BirthdateField id="birthdate" name="birthdate" />
            <p className="text-xs text-white/60">{t("birthdate_help")}</p>
          </div>
          <div className="grid gap-2">
            <label htmlFor="phone" className="text-sm opacity-90">
              {t("phone_optional")}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--brand)]">
                <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
              </span>
              <input
                id="phone"
                name="phone"
                placeholder="+33 6 12 34 56 78"
                className="peer bg-input/30 border-input text-foreground placeholder:opacity-60 rounded-md border pl-10 pr-3 py-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 w-full"
              />
            </div>
            <p className="text-xs text-white/60">{t("phone_help")}</p>
          </div>
          <Button type="submit" className="w-full">
            {t("continue")}
          </Button>
        </form>
      </div>
    </main>
  );
}
