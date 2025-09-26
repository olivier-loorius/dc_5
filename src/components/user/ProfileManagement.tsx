"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCamera,
  faEdit,
  faSave,
  faShieldAlt,
  faKey,
  faDownload,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "@/components/ui/card";

interface ProfileManagementProps {
  user: {
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    created_at?: string;
  };
}

export function ProfileManagement({ user }: ProfileManagementProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Implémenter la sauvegarde
  };

  const handleDeleteAccount = () => {
    // TODO: Implémenter la suppression de compte
    console.log("Suppression du compte...");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* En-tête profil */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-brand/20 flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="h-8 w-8 text-brand" />
              </div>
            )}
            <button className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-brand text-black text-xs hover:bg-brand/90 transition-colors">
              <FontAwesomeIcon icon={faCamera} className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {user.name || "Votre Profil"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Membre depuis{" "}
              {new Date(user.created_at || Date.now()).toLocaleDateString(
                "fr-FR",
                {
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>
          </div>

          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            <FontAwesomeIcon
              icon={isEditing ? faSave : faEdit}
              className="mr-2 h-4 w-4"
            />
            {isEditing ? "Sauvegarder" : "Modifier"}
          </Button>
        </div>

        {/* Informations personnelles */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-foreground">
              Nom complet
            </label>
            {isEditing ? (
              <input
                type="text"
                defaultValue={user.name}
                className="px-3 py-2 rounded-md border border-input bg-background text-foreground"
                placeholder="Votre nom complet"
              />
            ) : (
              <p className="px-3 py-2 text-muted-foreground">
                {user.name || "Non renseigné"}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            {isEditing ? (
              <input
                type="email"
                defaultValue={user.email}
                className="px-3 py-2 rounded-md border border-input bg-background text-foreground"
                placeholder="votre@email.fr"
              />
            ) : (
              <p className="px-3 py-2 text-muted-foreground">{user.email}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-foreground">
              Téléphone
            </label>
            {isEditing ? (
              <input
                type="tel"
                defaultValue={user.phone}
                className="px-3 py-2 rounded-md border border-input bg-background text-foreground"
                placeholder="06 12 34 56 78"
              />
            ) : (
              <p className="px-3 py-2 text-muted-foreground">
                {user.phone || "Non renseigné"}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Actions sécurisées */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <FontAwesomeIcon icon={faShieldAlt} className="text-brand h-5 w-5" />
          Sécurité & Confidentialité
        </h2>

        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <FontAwesomeIcon icon={faKey} className="mr-3 h-4 w-4" />
            Changer le mot de passe
          </Button>

          <Button variant="outline" className="w-full justify-start">
            <FontAwesomeIcon icon={faDownload} className="mr-3 h-4 w-4" />
            Exporter mes données
          </Button>

          <div className="border-t border-border pt-4 mt-4">
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="mr-3 h-4 w-4" />
              Supprimer mon compte
            </Button>
          </div>
        </div>
      </Card>

      {/* Confirmation suppression */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Supprimer votre compte ?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Cette action est irréversible. Toutes vos données seront
              définitivement supprimées.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDeleteAccount}
              >
                Confirmer
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
