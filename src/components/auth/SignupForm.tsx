"use client";
import { useMemo, useState } from "react";
import { doSignUp } from "@/app/(public)/(auth)/actions";
import { Button } from "@/components/ui/button";
import { PasswordField } from "@/components/auth/PasswordField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export function SignupForm() {
  const [isAdult, setIsAdult] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");

  const rules = useMemo(() => {
    const lengthOk = pwd.length >= 8;
    const lowerOk = /[a-z]/.test(pwd);
    const upperOk = /[A-Z]/.test(pwd);
    const digitOk = /\d/.test(pwd);
    const specialOk = /[^A-Za-z0-9]/.test(pwd);
    const matchOk = pwd.length > 0 && pwd === pwd2;
    return { lengthOk, lowerOk, upperOk, digitOk, specialOk, matchOk };
  }, [pwd, pwd2]);
  return (
    <form action={doSignUp} className="grid gap-4 max-w-md">
      <div className="flex items-center gap-3">
        <input
          id="is_adult_form"
          type="checkbox"
          className="size-4"
          checked={isAdult}
          onChange={(e) => setIsAdult(e.target.checked)}
        />
        <label htmlFor="is_adult_form" className="text-sm">
          J’atteste avoir 18 ans ou plus
        </label>
      </div>

      <fieldset
        disabled={!isAdult}
        className="grid gap-4 contents-enabled:opacity-100 disabled:opacity-50"
      >
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm opacity-90">
            Email
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--brand)]">
              <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
            </span>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="peer bg-input/30 border-input text-foreground placeholder:opacity-60 rounded-md border pl-10 pr-3 py-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 invalid:border-destructive invalid:ring-destructive/20 w-full"
              placeholder="ex: jean.dupont@email.fr"
            />
          </div>
          <p className="hidden peer-invalid:block text-xs text-destructive">
            Email invalide
          </p>
          <p className="text-xs text-white/60">
            Nous ne partagerons jamais votre email.
          </p>
        </div>
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm opacity-90">
            Mot de passe
          </label>
          <PasswordField
            id="password"
            name="password"
            required
            autoComplete="new-password"
            placeholder="8+ caractères, maj, min, chiffre, spécial"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <p className="hidden peer-invalid:block text-xs text-destructive">
            Mot de passe trop faible
          </p>
          <p className="text-xs text-white/60">
            Utilisez une phrase de passe et évitez la réutilisation.
          </p>
        </div>
        <div className="grid gap-2">
          <label htmlFor="passwordConfirm" className="text-sm opacity-90">
            Confirmer
          </label>
          <PasswordField
            id="passwordConfirm"
            name="passwordConfirm"
            required
            autoComplete="new-password"
            placeholder="Répéter le mot de passe"
            value={pwd2}
            onChange={(e) => setPwd2(e.target.value)}
          />
          <p className="text-xs text-white/60">
            Répétez exactement le même mot de passe.
          </p>
        </div>
        <div className="rounded-md border border-white/5 bg-background/20 p-2 text-xs text-white/70">
          <ul className="grid gap-1">
            <li
              className={rules.lengthOk ? "text-emerald-400" : "text-white/60"}
            >
              8+ caractères
            </li>
            <li
              className={rules.lowerOk ? "text-emerald-400" : "text-white/60"}
            >
              1 minuscule
            </li>
            <li
              className={rules.upperOk ? "text-emerald-400" : "text-white/60"}
            >
              1 majuscule
            </li>
            <li
              className={rules.digitOk ? "text-emerald-400" : "text-white/60"}
            >
              1 chiffre
            </li>
            <li
              className={rules.specialOk ? "text-emerald-400" : "text-white/60"}
            >
              1 caractère spécial
            </li>
            <li
              className={rules.matchOk ? "text-emerald-400" : "text-white/60"}
            >
              Confirmation identique
            </li>
          </ul>
        </div>
        <Button type="submit" className="w-full">
          Créer mon compte
        </Button>
      </fieldset>
    </form>
  );
}
