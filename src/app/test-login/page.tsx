"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TestLoginPage() {
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResult("🔄 Test en cours...");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // Test basique des données du formulaire
      setResult(`
        📧 Email: ${email}
        🔑 Password: ${password ? "***" + password.slice(-2) : "vide"}
        ✅ Formulaire reçu correctement
      `);

      // Simuler l'appel à l'action serveur
      const response = await fetch("/api/test-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setResult((prev) => prev + "\n✅ Action serveur OK");
      } else {
        setResult((prev) => prev + "\n❌ Action serveur échoue");
      }
    } catch (error) {
      setResult(
        `❌ Erreur: ${error instanceof Error ? error.message : "Inconnue"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mx-auto w-full max-w-md bg-background/30 p-6 rounded-xl border border-white/10">
        <h1 className="text-2xl font-bold text-brand mb-6 text-center">
          🧪 Test Connexion
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label htmlFor="email" className="text-sm opacity-90">
              Email de test
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              className="w-full bg-input/30 border-input text-foreground rounded-md border px-3 py-2 mt-1"
              placeholder="test@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm opacity-90">
              Mot de passe de test
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="off"
              className="w-full bg-input/30 border-input text-foreground rounded-md border px-3 py-2 mt-1"
              placeholder="motdepasse123"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "⏳ Test..." : "🧪 Tester la connexion"}
          </Button>
        </form>

        {result && (
          <div className="mt-4 p-4 bg-muted/20 rounded-md">
            <h3 className="font-semibold mb-2">Résultat :</h3>
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
