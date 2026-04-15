import { SESSION_SECRET } from "./auth-config";

const encoder = new TextEncoder();

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ✅ FIXED: now returns ArrayBuffer (not Uint8Array)
function hexToBuf(hex: string): ArrayBuffer {
  const pairs = hex.match(/.{1,2}/g) ?? [];
  const array = new Uint8Array(pairs.map((b) => parseInt(b, 16)));
  return array.buffer;
}

/** Create a signed token: `payload.hex(hmac)` */
export async function signToken(payload: string): Promise<string> {
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${bufToHex(sig)}`;
}

/** Verify and extract payload. Returns null if tampered. */
export async function verifyToken(token: string): Promise<string | null> {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return null;

  const payload = token.slice(0, lastDot);
  const sigHex = token.slice(lastDot + 1);

  const key = await getKey();
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    hexToBuf(sigHex),
    encoder.encode(payload)
  );

  return valid ? payload : null;
}