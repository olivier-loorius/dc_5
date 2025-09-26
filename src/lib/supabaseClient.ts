import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // Utiliser les cookies du navigateur pour la synchronisation
          const cookies = document.cookie.split(";");
          const cookie = cookies.find((c) => c.trim().startsWith(name + "="));
          return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
        },
        set(name: string, value: string, options: any) {
          // Configurer les cookies avec les bonnes options
          const cookieOptions = {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            httpOnly: false, // Important : accessible côté client
            ...options,
          };

          let cookieString = `${name}=${encodeURIComponent(value)}`;
          Object.entries(cookieOptions).forEach(([key, val]) => {
            if (val !== undefined && val !== null) {
              cookieString += `; ${key}=${val}`;
            }
          });

          document.cookie = cookieString;
        },
        remove(name: string, options: any) {
          this.set(name, "", { ...options, maxAge: 0 });
        },
      },
    }
  );
}
