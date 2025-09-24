import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/login", "/compte", "/panier"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
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
  matcher: ["/login", "/compte/:path*", "/panier"],
};
