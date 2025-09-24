import { saveAddress } from "@/app/(public)/(account)/onboarding/actions";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { HeaderBack } from "@/components/auth/HeaderBack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faHouseChimney,
  faCity,
  faPhone,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";

export default async function Page() {
  const t = await getTranslations("onboarding");
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl rounded-xl border border-white/10 bg-background/30 p-6 shadow-sm md:p-8">
        <HeaderBack label={(await getTranslations("common"))("back")} />
        <h1 className="font-display text-3xl text-brand mb-6">
          {t("address_title")}
        </h1>
        <form action={saveAddress} className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="label" className="text-sm opacity-90">
              {t("label")}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--brand)]">
                <FontAwesomeIcon icon={faLocationDot} className="h-4 w-4" />
              </span>
              <input
                id="label"
                name="label"
                className="bg-input/30 border-input text-foreground placeholder:opacity-60 rounded-md border pl-10 pr-3 py-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 w-full"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="line1" className="text-sm opacity-90">
              {t("line1")}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--brand)]">
                <FontAwesomeIcon icon={faHouseChimney} className="h-4 w-4" />
              </span>
              <input
                id="line1"
                name="line1"
                required
                className="peer bg-input/30 border-input text-foreground placeholder:opacity-60 rounded-md border pl-10 pr-3 py-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 invalid:border-destructive invalid:ring-destructive/20 w-full"
              />
            </div>
            <p className="hidden peer-invalid:block text-xs text-destructive">
              Adresse invalide
            </p>
          </div>
          <div className="grid gap-2">
            <label htmlFor="line2" className="text-sm opacity-90">
              {t("line2")}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--brand)]">
                <FontAwesomeIcon icon={faHouseChimney} className="h-4 w-4" />
              </span>
              <input
                id="line2"
                name="line2"
                className="bg-input/30 border-input text-foreground placeholder:opacity-60 rounded-md border pl-10 pr-3 py-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 w-full"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="postal_code" className="text-sm opacity-90">
              {t("postal_code")}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--brand)]">
                <FontAwesomeIcon icon={faHashtag} className="h-4 w-4" />
              </span>
              <input
                id="postal_code"
                name="postal_code"
                required
                pattern="^\d{5}$"
                className="peer bg-input/30 border-input text-foreground placeholder:opacity-60 rounded-md border pl-10 pr-3 py-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 invalid:border-destructive invalid:ring-destructive/20 w-full"
              />
            </div>
            <p className="hidden peer-invalid:block text-xs text-destructive">
              Code postal invalide
            </p>
          </div>
          <div className="grid gap-2">
            <label htmlFor="city" className="text-sm opacity-90">
              {t("city")}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--brand)]">
                <FontAwesomeIcon icon={faCity} className="h-4 w-4" />
              </span>
              <input
                id="city"
                name="city"
                required
                className="peer bg-input/30 border-input text-foreground placeholder:opacity-60 rounded-md border pl-10 pr-3 py-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 invalid:border-destructive invalid:ring-destructive/20 w-full"
              />
            </div>
            <p className="hidden peer-invalid:block text-xs text-destructive">
              Ville invalide
            </p>
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
                className="peer bg-input/30 border-input text-foreground placeholder:opacity-60 rounded-md border pl-10 pr-3 py-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 w-full"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            {t("save")}
          </Button>
        </form>
      </div>
    </main>
  );
}
