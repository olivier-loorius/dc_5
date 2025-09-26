"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function AuthStatusPage() {
  const [authState, setAuthState] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // Vérifier la session actuelle
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      console.log("📋 Session:", {
        session: sessionData.session?.user?.email,
        error: sessionError,
      });

      // Vérifier l'utilisateur actuel
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      console.log("👤 User:", { user: userData.user?.email, error: userError });

      // Vérifier les cookies
      const cookies = document.cookie
        .split(";")
        .filter((c) => c.includes("sb-"));
      console.log("🍪 Cookies Supabase:", cookies);

      setAuthState({
        session: sessionData.session,
        user: userData.user,
        sessionError,
        userError,
        cookies,
        timestamp: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error("❌ Erreur auth check:", error);
      setAuthState({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-2xl bg-background/30 p-6 rounded-xl border border-white/10">
        <h1 className="text-2xl font-bold text-brand mb-6 text-center">
          🔍 Debug Authentification
        </h1>

        <div className="space-y-4">
          <Button onClick={checkAuth} disabled={isLoading} className="w-full">
            {isLoading
              ? "🔄 Vérification..."
              : "🔍 Vérifier l'authentification"}
          </Button>

          {authState && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/20 rounded-md">
                <h3 className="font-semibold mb-2">
                  État d'authentification :
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Session:</strong>{" "}
                    {authState.session
                      ? `✅ ${authState.session.user?.email}`
                      : "❌ Aucune session"}
                  </div>
                  <div>
                    <strong>User:</strong>{" "}
                    {authState.user
                      ? `✅ ${authState.user?.email}`
                      : "❌ Aucun utilisateur"}
                  </div>
                  <div>
                    <strong>Erreurs:</strong>{" "}
                    {authState.sessionError ||
                      authState.userError ||
                      "❌ Aucune"}
                  </div>
                  <div>
                    <strong>Cookies:</strong>{" "}
                    {authState.cookies?.length > 0
                      ? "✅ Présents"
                      : "❌ Manquants"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Dernière vérification: {authState.timestamp}
                  </div>
                </div>
              </div>

              {authState.cookies?.length > 0 && (
                <details className="p-4 bg-muted/10 rounded-md">
                  <summary className="cursor-pointer font-semibold">
                    🍪 Détail des cookies
                  </summary>
                  <pre className="mt-2 text-xs whitespace-pre-wrap">
                    {authState.cookies.join("\n")}
                  </pre>
                </details>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
