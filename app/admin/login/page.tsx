"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  // Lock out after 5 failed attempts for 30 s
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [lockCountdown, setLockCountdown] = useState(0);

  useEffect(() => {
    if (!lockedUntil) return;
    const id = setInterval(() => {
      const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockedUntil(null);
        setLockCountdown(0);
        setAttempts(0);
        clearInterval(id);
      } else {
        setLockCountdown(remaining);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [lockedUntil]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockedUntil) return;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (res.ok) {
        router.push(from);
        router.refresh();
      } else {
        const data = await res.json();
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= 5) {
          setLockedUntil(Date.now() + 30_000);
          setError("Too many failed attempts. Locked for 30 seconds.");
        } else {
          setError(data.error ?? "Invalid credentials.");
        }
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isLocked = !!lockedUntil;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #002e1c 0%, #005c37 50%, #007a45 100%)",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 30px)",
        }}
      />

      {/* Watermark */}
      <div
        className="absolute right-0 bottom-0 text-white opacity-5 font-bold leading-none select-none pointer-events-none overflow-hidden"
        style={{ fontSize: "clamp(80px,20vw,240px)", fontFamily: "'Crimson Pro', serif" }}
      >
        ICPC
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Top stripe */}
          <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #008751, #C8A000)" }} />

          <div className="px-8 py-10">
            {/* Logo + title */}
            <div className="text-center mb-8">
              <img
                src="/images/logo.png"
                alt="NANS"
                className="w-16 h-16 rounded-full mx-auto mb-4 border-4"
                style={{ borderColor: "#e8f5ee" }}
              />
              <p
                className="font-bold text-xs tracking-[0.25em] uppercase mb-1"
                style={{ color: "#C8A000" }}
              >
                NANS · ICPC 2026
              </p>
              <h1
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                Admin Portal
              </h1>
              <p className="text-gray-400 text-xs mt-1">
                Authorised ICPC personnel only
              </p>
            </div>

            {/* Lock notice */}
            {isLocked && (
              <div className="mb-5 rounded-xl p-4 bg-red-50 border border-red-200 text-center">
                <p className="text-red-700 font-bold text-sm">🔒 Access Locked</p>
                <p className="text-red-500 text-xs mt-1">
                  Try again in <strong>{lockCountdown}s</strong>
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@nanscpc.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLocked}
                  className="w-full px-4 py-3 text-sm text-black rounded-xl border focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderColor: "#d4eadb", "--tw-ring-color": "#008751" } as React.CSSProperties}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLocked}
                    className="w-full px-4 py-3 pr-12 text-black text-sm rounded-xl border focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ borderColor: "#d4eadb", "--tw-ring-color": "#008751" } as React.CSSProperties}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && !isLocked && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
                  <span className="text-red-500 flex-shrink-0">⚠️</span>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Attempts warning */}
              {attempts > 0 && attempts < 5 && !isLocked && (
                <p className="text-xs text-center" style={{ color: "#C8A000" }}>
                  {5 - attempts} attempt{5 - attempts !== 1 ? "s" : ""} remaining before lockout
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || isLocked || !email || !password}
                className="w-full py-3 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: "#008751" }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  "Sign In to Admin Portal"
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div
            className="px-8 py-4 border-t text-center"
            style={{ borderColor: "#f0f0f0", backgroundColor: "#f8fdf9" }}
          >
            <p className="text-xs text-gray-400">
              For access issues contact{" "}
              <a
                href="mailto:icpcnans@gmail.com"
                className="font-semibold"
                style={{ color: "#008751" }}
              >
                icpcnans@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-5">
          <Link
            href="/"
            className="text-white/60 text-xs hover:text-white transition-colors"
          >
            ← Back to NANS public site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
