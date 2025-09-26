import { NextResponse, type NextRequest } from "next/server";

// CORRECTION URGENTE: /login ne doit PAS être protégé (boucle de redirection)
const PROTECTED_PREFIXES = ["/compte", "/panier"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // GARDE: éviter les redirections en boucle
  if (pathname === "/start") {
    return NextResponse.next(); // Ne jamais rediriger /start
  }

  if (PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))) {
    const ageOk = req.cookies.get("age_ok")?.value === "true";
    if (!ageOk) {
      const url = req.nextUrl.clone();
      url.pathname = "/start";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  // CORRECTION: Exclure /login pour éviter la boucle
  matcher: ["/compte/:path*", "/panier"],
};
