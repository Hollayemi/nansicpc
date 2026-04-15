// ─── Allowed admin credentials ───────────────────────────────────────────────
// Add / remove entries here to manage access. No database needed.
export const ADMIN_CREDENTIALS: Record<string, string> = {
  "admin@nanscpc.org": "access123",
  "admin2@nanscpc.org": "access123",
};

// ─── Cookie config ────────────────────────────────────────────────────────────
export const AUTH_COOKIE_NAME = "nans_admin_session";

// Simple secret used to sign the session token.
// In production, set ADMIN_SESSION_SECRET in your .env.local
export const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ?? "nans-icpc-2026-super-secret-key";
