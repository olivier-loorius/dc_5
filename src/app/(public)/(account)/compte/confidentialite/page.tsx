import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDownload,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

export default async function PrivacyPage() {
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
            Confidentialité & Données
          </h1>
          <p className="text-muted-foreground">
            Gérez vos données personnelles et préférences de confidentialité
          </p>
        </div>

        <div className="space-y-6">
          {/* Données personnelles */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} className="text-brand h-5 w-5" />
              Mes données
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-md">
                <div>
                  <p className="text-sm font-medium">Informations de profil</p>
                  <p className="text-xs text-muted-foreground">
                    Nom, email, téléphone
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Voir
                </Button>
              </div>

              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-md">
                <div>
                  <p className="text-sm font-medium">
                    Historique des commandes
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Commandes et paiements
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Voir
                </Button>
              </div>

              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-md">
                <div>
                  <p className="text-sm font-medium">Préférences et favoris</p>
                  <p className="text-xs text-muted-foreground">
                    Produits likés et préférences
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Voir
                </Button>
              </div>
            </div>
          </Card>

          {/* Contrôle des données */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Contrôle des données
            </h2>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FontAwesomeIcon icon={faDownload} className="mr-3 h-4 w-4" />
                Télécharger toutes mes données
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <FontAwesomeIcon icon={faEdit} className="mr-3 h-4 w-4" />
                Corriger des données incorrectes
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrashAlt} className="mr-3 h-4 w-4" />
                Demander la suppression de mes données
              </Button>
            </div>
          </Card>

          {/* Consentements */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Consentements
            </h2>

            <div className="space-y-4">
              <label className="flex items-start gap-3">
                <input type="checkbox" className="rounded mt-1" />
                <div>
                  <span className="text-sm font-medium">
                    Analyses et amélioration
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Utiliser mes données pour améliorer l'expérience utilisateur
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3">
                <input type="checkbox" className="rounded mt-1" />
                <div>
                  <span className="text-sm font-medium">
                    Marketing personnalisé
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Recevoir des recommandations basées sur mes préférences
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3">
                <input type="checkbox" className="rounded mt-1" />
                <div>
                  <span className="text-sm font-medium">
                    Partage avec des partenaires
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Partager des données anonymisées avec nos partenaires
                  </p>
                </div>
              </label>
            </div>

            <Button className="mt-4 w-full">Sauvegarder les préférences</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
