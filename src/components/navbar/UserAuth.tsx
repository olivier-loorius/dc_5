"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { UserProfileDropdown } from "./UserProfileDropdown";

interface UserAuthProps {
  tKey: {
    account: string;
    login: string;
    logout: string;
    profile: string;
    orders: string;
    favorites: string;
    settings: string;
    privacy: string;
  };
}

export function UserAuth({ tKey }: UserAuthProps) {
  const [user, setUser] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Vérification initiale avec retry pour la synchronisation
    const getUser = async (retryCount = 0) => {
      try {
        console.log("🔍 UserAuth: Vérification de l'authentification...");

        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        console.log("🔍 UserAuth résultat:", {
          user: user?.email,
          error: error?.message,
        });

        if (!error && user) {
          console.log("✅ UserAuth: Utilisateur connecté:", user.email);
          setIsConnected(true);

          // Récupérer le profil (optionnel, peut être mis en cache)
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          setUser({
            name: profile?.full_name || user.user_metadata?.full_name,
            email: user.email,
            avatar: profile?.avatar_url,
          });
        } else {
          console.log("❌ UserAuth: Utilisateur non connecté");
          setIsConnected(false);
          setUser(null);
        }
      } catch (error) {
        console.error("❌ UserAuth error:", error);

        // Retry une fois si échec (peut être un problème de timing)
        if (retryCount < 1) {
          console.log("🔄 UserAuth: Retry dans 500ms...");
          setTimeout(() => getUser(retryCount + 1), 500);
          return;
        }

        setIsConnected(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔄 UserAuth: Changement d'authentification:", event);

      if (event === "SIGNED_IN" && session?.user) {
        console.log("✅ UserAuth: SIGNED_IN détecté pour:", session.user.email);
        setIsConnected(true);
        setUser({
          name: session.user.user_metadata?.full_name,
          email: session.user.email,
          avatar: null, // sera récupéré plus tard si nécessaire
        });
      } else if (event === "SIGNED_OUT") {
        console.log("❌ UserAuth: SIGNED_OUT détecté");
        setIsConnected(false);
        setUser(null);
      } else if (event === "TOKEN_REFRESHED" && session?.user) {
        console.log("🔄 UserAuth: TOKEN_REFRESHED pour:", session.user.email);
        // Re-vérifier après refresh de token
        getUser();
      }
    });

    return () => {
      subscription.unsubscribe();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleVisibilityChange);
    };
  }, []);

  // Pendant le chargement, afficher un placeholder
  if (isLoading) {
    return (
      <div className="relative">
        <div className="h-10 w-10 rounded-full bg-brand/20 animate-pulse" />
        {/* Pas d'indicateur pendant le chargement */}
      </div>
    );
  }

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    // L'état sera mis à jour automatiquement par onAuthStateChange
  };

  return (
    <UserProfileDropdown
      user={user}
      isConnected={isConnected}
      tKey={tKey}
      onLogout={handleLogout}
    />
  );
}
