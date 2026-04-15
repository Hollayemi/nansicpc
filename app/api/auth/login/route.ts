import { NextRequest, NextResponse } from "next/server";
import { ADMIN_CREDENTIALS, AUTH_COOKIE_NAME } from "../../lib/auth-config";
import { signToken } from "../../lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (
      !email ||
      !password ||
      ADMIN_CREDENTIALS[email.toLowerCase().trim()] !== password
    ) {
      // Generic message — don't reveal which field is wrong
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Build a signed session token: email + expiry (24 h)
    const expires = Date.now() + 24 * 60 * 60 * 1000;
    const payload = `${email.toLowerCase().trim()}|${expires}`;
    const token = await signToken(payload);

    const res = NextResponse.json({ ok: true });

    res.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,           // not accessible from JS
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,    // 24 hours
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
