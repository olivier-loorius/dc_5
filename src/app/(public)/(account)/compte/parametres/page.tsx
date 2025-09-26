import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faKey,
  faDownload,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

export default async function SettingsPage() {
  const sb = await supabaseServer();

  const {
    data: { user },
    error,
  } = await sb.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Paramètres du compte
          </h1>
          <p className="text-muted-foreground">
            Gérez vos préférences et paramètres de sécurité
          </p>
        </div>

        <div className="space-y-6">
          {/* Sécurité */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="text-brand h-5 w-5"
              />
              Sécurité
            </h2>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FontAwesomeIcon icon={faKey} className="mr-3 h-4 w-4" />
                Changer le mot de passe
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-3 h-4 w-4" />
                Authentification à deux facteurs
              </Button>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Notifications
            </h2>

            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Offres et promotions</span>
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Nouveaux produits</span>
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Statut des commandes</span>
              </label>
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Actions
            </h2>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FontAwesomeIcon icon={faDownload} className="mr-3 h-4 w-4" />
                Exporter mes données
              </Button>

              <Button variant="destructive" className="w-full justify-start">
                <FontAwesomeIcon icon={faTrashAlt} className="mr-3 h-4 w-4" />
                Supprimer mon compte
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
