import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "./api/lib/auth-config";
import { verifyToken } from "./api/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Let the login page and auth API through ───────────────────────────────
  if (pathname === "/admin/login") return NextResponse.next();
  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  // ── Guard everything under /admin ─────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (!token) return redirectToLogin(req);

    const payload = await verifyToken(token);
    if (!payload) return redirectToLogin(req);

    // Check expiry
    const [, expiresStr] = payload.split("|");
    if (!expiresStr || Date.now() > Number(expiresStr)) {
      return redirectToLogin(req);
    }

    // Valid — continue
    return NextResponse.next();
  }

  return NextResponse.next();
}

function redirectToLogin(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", req.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  // Run middleware on all /admin routes and /api/auth routes
  matcher: ["/admin/:path*", "/api/auth/:path*"],
};
