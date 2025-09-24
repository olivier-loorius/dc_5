import { Button } from "@/components/ui/button";
import { setAgeOk } from "@/app/start/actions";

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="font-display text-3xl text-brand mb-4">
        Accès réservé aux adultes
      </h1>
      <p className="opacity-80 mb-6">
        Vous devez avoir 18 ans ou plus pour continuer.
      </p>

      {/* Un seul formulaire: la case 18+ est requise et vous choisissez ensuite l’action */}
      <form action={setAgeOk} className="grid gap-5 max-w-md">
        <div className="flex items-center gap-3">
          <input
            id="age_ok"
            name="age_ok"
            type="checkbox"
            required
            className="size-4"
          />
          <label htmlFor="age_ok" className="text-sm">
            J’atteste avoir 18 ans ou plus
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Chaque bouton transmet la destination via name=next */}
          <Button type="submit" name="next" value="/login">
            Continuer et se connecter
          </Button>
          <Button type="submit" name="next" value="/signup" variant="secondary">
            Continuer et créer un compte
          </Button>
        </div>
      </form>
    </main>
  );
}
