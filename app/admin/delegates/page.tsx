"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiSearch, BiArrowBack } from "react-icons/bi";
import { FaInbox } from "react-icons/fa";
import { ZONES } from "@/app/components/data";

type DelegateStatus = "pending" | "confirmed" | "rejected";

interface Delegate {
  _id: string;
  fullName: string;
  institution: string;
  position: string;
  zone: string;
  state: string;
  phone: string;
  email?: string;
  matricNumber: string;
  passportPhotoUrl: string;
  schoolIdUrl: string;
  code: string;
  registeredAt: string;
  status?: DelegateStatus;
  adminNote?: string;
}

const STATUS_META: Record<DelegateStatus, { label: string; bg: string; text: string; dot: string }> = {
  pending:   { label: "Pending",   bg: "#fef9e7", text: "#C8A000", dot: "#C8A000" },
  confirmed: { label: "Confirmed", bg: "#e8f5ee", text: "#008751", dot: "#008751" },
  rejected:  { label: "Rejected",  bg: "#fef2f2", text: "#dc2626", dot: "#dc2626" },
};

/* ── Image lightbox ──────────────────────────────────────────────────────── */
const Lightbox: React.FC<{ url: string; onClose: () => void }> = ({ url, onClose }) => (
  <div
    className="fixed inset-0 z-[1100] flex items-center justify-center p-6 bg-black/90"
    onClick={onClose}
  >
    <button
      className="absolute top-5 right-5 text-white text-3xl font-bold leading-none hover:text-gray-300 transition-colors"
      onClick={onClose}
    >
      ✕
    </button>
    {url.toLowerCase().endsWith(".pdf") ? (
      <iframe src={url} className="w-full max-w-3xl h-[80vh] rounded-xl" title="Document" />
    ) : (
      <img
        src={url}
        alt="Document"
        className="max-w-full max-h-full rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    )}
  </div>
);

/* ── Delegate detail modal ────────────────────────────────────────────────── */
const DelegateModal: React.FC<{
  delegate: Delegate;
  onClose: () => void;
  onStatusChange: (id: string, status: DelegateStatus, note: string) => Promise<void>;
}> = ({ delegate: d, onClose, onStatusChange }) => {
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<DelegateStatus>(d.status ?? "pending");
  const [note, setNote]       = useState(d.adminNote ?? "");
  const [saving, setSaving]   = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onStatusChange(d._id, newStatus, note);
    setSaving(false);
    onClose();
  };

  // Quick-confirm shortcut: one click to toggle confirmed
  const quickConfirm = async () => {
    const target: DelegateStatus = (d.status ?? "pending") === "confirmed" ? "pending" : "confirmed";
    setSaving(true);
    await onStatusChange(d._id, target, note);
    setSaving(false);
    onClose();
  };

  const currentStatus: DelegateStatus = d.status ?? "pending";
  const isConfirmed = currentStatus === "confirmed";

  return (
    <>
      {lightboxUrl && <Lightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} />}

      <div
        className="fixed inset-0 z-[999] flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,15,8,0.85)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="px-7 py-5 flex-shrink-0 text-white"
            style={{ background: "linear-gradient(135deg, #005c37, #008751)" }}
          >
            <div className="flex items-center gap-4">
              {d.passportPhotoUrl ? (
                <img
                  src={d.passportPhotoUrl}
                  alt={d.fullName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/40 flex-shrink-0 cursor-pointer hover:border-white transition-all"
                  onClick={() => setLightboxUrl(d.passportPhotoUrl)}
                  title="Click to enlarge"
                />
              ) : (
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0 border-2 border-white/30"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                >
                  {d.fullName.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-green-300 text-xs mb-0.5">Delegate Record</p>
                <h2
                  className="font-bold text-xl leading-tight truncate"
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                >
                  {d.fullName}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-green-200 text-sm truncate">{d.position} · {d.institution}</p>
                  {/* Status badge in header */}
                  <span
                    className="flex-shrink-0 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: STATUS_META[currentStatus].bg, color: STATUS_META[currentStatus].text }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: STATUS_META[currentStatus].dot }} />
                    {STATUS_META[currentStatus].label}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all flex-shrink-0 self-start"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1 p-7 space-y-6">
            {/* Personal info grid */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Personal Information</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Full Name",     value: d.fullName },
                  { label: "Matric Number", value: d.matricNumber },
                  { label: "Phone",         value: d.phone },
                  { label: "Email",         value: d.email || "—" },
                  { label: "Position",      value: d.position },
                  { label: "Zone",          value: d.zone },
                  { label: "State",         value: d.state },
                  { label: "Institution",   value: d.institution },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl p-3 border"
                    style={{ borderColor: "#e0ede0", backgroundColor: "#f8fdf9" }}
                  >
                    <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-800 break-words">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Code + date */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-3 border" style={{ borderColor: "#e0ede0", backgroundColor: "#f8fdf9" }}>
                <p className="text-xs text-gray-400 mb-0.5">Accreditation Code</p>
                <p className="text-sm font-bold font-mono" style={{ color: "#005c37" }}>{d.code}</p>
              </div>
              <div className="rounded-xl p-3 border" style={{ borderColor: "#e0ede0", backgroundColor: "#f8fdf9" }}>
                <p className="text-xs text-gray-400 mb-0.5">Registered</p>
                <p className="text-sm font-semibold text-gray-800">
                  {new Date(d.registeredAt).toLocaleString("en-NG", {
                    day: "numeric", month: "short", year: "numeric",
                    hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Documents */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Submitted Documents</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">Passport Photograph</p>
                  {d.passportPhotoUrl ? (
                    <div
                      className="rounded-xl overflow-hidden border cursor-pointer group relative"
                      style={{ borderColor: "#d4eadb" }}
                      onClick={() => setLightboxUrl(d.passportPhotoUrl)}
                    >
                      <img src={d.passportPhotoUrl} alt="Passport" className="w-full h-36 object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold bg-black/60 px-2 py-1 rounded-full transition-all">Enlarge</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-36 rounded-xl border-2 border-dashed flex items-center justify-center text-gray-400 text-xs" style={{ borderColor: "#d4eadb" }}>
                      Not provided
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">School ID Card</p>
                  {d.schoolIdUrl ? (
                    <div
                      className="rounded-xl overflow-hidden border cursor-pointer group relative"
                      style={{ borderColor: "#d4eadb" }}
                      onClick={() => setLightboxUrl(d.schoolIdUrl)}
                    >
                      {d.schoolIdUrl.toLowerCase().endsWith(".pdf") ? (
                        <div className="h-36 flex flex-col items-center justify-center bg-gray-50 gap-2">
                          <span className="text-3xl">📄</span>
                          <span className="text-xs text-gray-500 font-medium">PDF Document</span>
                          <span className="text-xs font-bold" style={{ color: "#008751" }}>Click to view</span>
                        </div>
                      ) : (
                        <>
                          <img src={d.schoolIdUrl} alt="School ID" className="w-full h-36 object-cover" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold bg-black/60 px-2 py-1 rounded-full transition-all">Enlarge</span>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="h-36 rounded-xl border-2 border-dashed flex items-center justify-center text-gray-400 text-xs" style={{ borderColor: "#d4eadb" }}>
                      Not provided
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-5 mt-3">
                {d.passportPhotoUrl && (
                  <a href={d.passportPhotoUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold underline" style={{ color: "#008751" }}>
                    Open passport ↗
                  </a>
                )}
                {d.schoolIdUrl && (
                  <a href={d.schoolIdUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold underline" style={{ color: "#008751" }}>
                    Open school ID ↗
                  </a>
                )}
              </div>
            </div>

            {/* ── Delegate Status Panel ── */}
            <div className="rounded-2xl border p-5" style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Delegate Status</p>

              {/* Status toggle buttons */}
              <div className="flex gap-2 mb-4">
                {(["pending", "confirmed", "rejected"] as DelegateStatus[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setNewStatus(s)}
                    className="flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all capitalize"
                    style={{
                      borderColor:     newStatus === s ? STATUS_META[s].dot : "#e0ede0",
                      backgroundColor: newStatus === s ? STATUS_META[s].bg   : "white",
                      color:           newStatus === s ? STATUS_META[s].text  : "#6b7280",
                    }}
                  >
                    {STATUS_META[s].label}
                  </button>
                ))}
              </div>

              <textarea
                placeholder="Admin note (optional)…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="w-full px-3 text-black py-2 text-sm rounded-xl border resize-none focus:outline-none mb-4"
                style={{ borderColor: "#d4eadb" }}
              />

              {/* Quick confirm highlight */}
              <button
                onClick={quickConfirm}
                disabled={saving}
                className="w-full py-3 text-sm font-bold rounded-xl text-white transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: isConfirmed ? "#dc2626" : "#008751" }}
              >
                {saving ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Updating…
                  </>
                ) : isConfirmed ? (
                  "✕ Unconfirm Delegate"
                ) : (
                  "✓ Confirm Delegate Presence"
                )}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-7 py-4 border-t flex items-center justify-between gap-3" style={{ borderColor: "#e0ede0" }}>
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-semibold rounded-xl border"
              style={{ borderColor: "#d4eadb", color: "#374151" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 text-sm font-bold text-white rounded-xl flex items-center gap-2 disabled:opacity-50"
              style={{ backgroundColor: "#008751" }}
            >
              {saving && (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              )}
              Save Status
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/* ── Main page ────────────────────────────────────────────────────────────── */
const AdminDelegatesPage: React.FC = () => {
  const router = useRouter();
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState<string | null>(null);
  const [search,    setSearch]    = useState("");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<DelegateStatus | "all">("all");
  const [selected,  setSelected]  = useState<Delegate | null>(null);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const fetchDelegates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (zoneFilter !== "all") params.set("zone", zoneFilter);
      if (search)               params.set("search", search);
      const res  = await fetch(`/api/delegates?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDelegates(data.delegates);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [search, zoneFilter]);

  useEffect(() => { fetchDelegates(); }, [fetchDelegates]);

  const handleStatusChange = async (id: string, status: DelegateStatus, adminNote: string) => {
    await fetch(`/api/delegates/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, adminNote }),
    });
    await fetchDelegates();
  };

  // Zone breakdown counts
  const byZone = ZONES.reduce<Record<string, number>>((acc, z) => {
    acc[z] = delegates.filter((d) => d.zone === z).length;
    return acc;
  }, {});

  // Status counts
  const statusCounts = {
    all:       delegates.length,
    pending:   delegates.filter((d) => (d.status ?? "pending") === "pending").length,
    confirmed: delegates.filter((d) => d.status === "confirmed").length,
    rejected:  delegates.filter((d) => d.status === "rejected").length,
  };

  // Apply client-side status filter (since API doesn't filter by delegate status)
  const visibleDelegates = statusFilter === "all"
    ? delegates
    : delegates.filter((d) => (d.status ?? "pending") === statusFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div style={{ backgroundColor: "#005c37" }} className="text-white px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="NANS" className="w-8 h-8 rounded-full bg-white" />
          <div>
            <p className="font-bold text-sm">NANS ICPC — Admin</p>
            <p className="text-green-300 text-xs">Delegate Records</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/accreditation" className="text-green-300 text-xs hover:text-white flex items-center gap-1">
            <BiArrowBack /> Codes
          </Link>
          <Link href="/" className="text-green-300 text-xs hover:text-white transition-colors">
            ← Back to site
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-400/50 text-red-300 hover:bg-red-500/20 transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page heading */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Crimson Pro', serif" }}>
              Accredited Delegates
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Search, view, and confirm delegate attendance on election day.
            </p>
          </div>
          <button
            onClick={fetchDelegates}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl hover:opacity-90"
            style={{ backgroundColor: "#008751" }}
          >
            ↻ Refresh
          </button>
        </div>

        {/* Status summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { key: "all",       label: "Total",     count: statusCounts.all,       color: "#374151", bg: "#f9fafb" },
            { key: "pending",   label: "Pending",   count: statusCounts.pending,   color: "#C8A000", bg: "#fef9e7" },
            { key: "confirmed", label: "Confirmed", count: statusCounts.confirmed, color: "#008751", bg: "#e8f5ee" },
            { key: "rejected",  label: "Rejected",  count: statusCounts.rejected,  color: "#dc2626", bg: "#fef2f2" },
          ].map((s) => (
            <div
              key={s.key}
              className="rounded-2xl border p-5 cursor-pointer transition-all hover:shadow-md"
              style={{ borderColor: s.color + "30", backgroundColor: s.bg }}
              onClick={() => setStatusFilter(s.key as DelegateStatus | "all")}
            >
              <p className="text-3xl font-bold mb-1" style={{ fontFamily: "'Crimson Pro', serif", color: s.color }}>
                {s.count}
              </p>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Zone breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {ZONES.map((z) => {
            const short = z.split("(")[1]?.replace(")", "") ?? "";
            const active = zoneFilter === z;
            return (
              <button
                key={z}
                onClick={() => setZoneFilter(active ? "all" : z)}
                className="text-center py-3 px-2 rounded-xl border transition-all hover:shadow-sm"
                style={{
                  borderColor: active ? "#008751" : "#d4eadb",
                  backgroundColor: active ? "#e8f5ee" : "white",
                }}
              >
                <p className="text-xl font-bold" style={{ fontFamily: "'Crimson Pro', serif", color: "#008751" }}>
                  {byZone[z] ?? 0}
                </p>
                <p className="text-xs font-semibold text-gray-600">{z.split(" ").slice(0, 2).join(" ")}</p>
                <p className="text-xs text-gray-400">{short}</p>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border p-5 mb-6 flex flex-wrap gap-4 items-center" style={{ borderColor: "#e0ede0" }}>
          <div className="relative flex-1 min-w-[220px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><BiSearch /></span>
            <input
              type="text"
              placeholder="Search by name, matric, institution, phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-black pl-9 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none"
              style={{ borderColor: "#d4eadb" }}
            />
          </div>

          {/* Zone pills */}
          <div className="flex overflow-x-scroll gap-2">
            <button
              onClick={() => setZoneFilter("all")}
              className="px-3.5 py-2 min-w-fit text-xs font-bold rounded-xl border transition-all"
              style={{
                borderColor: zoneFilter === "all" ? "#008751" : "#e0ede0",
                backgroundColor: zoneFilter === "all" ? "#e8f5ee" : "white",
                color: zoneFilter === "all" ? "#008751" : "#6b7280",
              }}
            >
              All Zones
            </button>
            {ZONES.map((z) => {
              const short = "Zone " + z.split(" ")[1];
              const active = zoneFilter === z;
              return (
                <button
                  key={z}
                  onClick={() => setZoneFilter(active ? "all" : z)}
                  className="px-3.5 py-2 min-w-fit text-xs font-bold rounded-xl border transition-all"
                  style={{
                    borderColor: active ? "#008751" : "#e0ede0",
                    backgroundColor: active ? "#e8f5ee" : "white",
                    color: active ? "#008751" : "#6b7280",
                  }}
                >
                  {short}
                </button>
              );
            })}
          </div>

          {/* Status filter pills */}
          <div className="flex gap-2">
            {(["all", "pending", "confirmed", "rejected"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="px-3 py-1.5 text-xs font-bold rounded-full border transition-all capitalize"
                style={{
                  borderColor:     statusFilter === s ? (STATUS_META[s as DelegateStatus]?.dot ?? "#374151") : "#e0ede0",
                  backgroundColor: statusFilter === s ? (STATUS_META[s as DelegateStatus]?.bg  ?? "#f9fafb") : "white",
                  color:           statusFilter === s ? (STATUS_META[s as DelegateStatus]?.text ?? "#374151") : "#6b7280",
                }}
              >
                {s === "all" ? "All" : STATUS_META[s as DelegateStatus].label}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-500 ml-auto">
            <strong>{visibleDelegates.length}</strong> delegate{visibleDelegates.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#e0ede0" }}>
          {loading ? (
            <div className="py-20 text-center">
              <svg className="animate-spin w-8 h-8 mx-auto mb-3" style={{ color: "#008751" }} fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <p className="text-sm text-gray-400">Loading delegates…</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3">⚠️</p>
              <p className="text-red-500 font-medium text-sm">{error}</p>
            </div>
          ) : visibleDelegates.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3"><FaInbox /></p>
              <p className="text-gray-500 font-medium">No delegates found</p>
              <p className="text-xs text-gray-400 mt-1">
                {search ? "Try a different search term." : "Delegates will appear here after registration."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#f8fdf9", borderBottom: "1px solid #e0ede0" }}>
                    {["#", "Photo", "Delegate", "Matric No.", "Institution", "Zone / State", "Code", "Status", "Registered", "Action"].map((h) => (
                      <th key={h} className="px-4 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "#f0f0f0" }}>
                  {visibleDelegates.map((d, i) => {
                    const ds: DelegateStatus = d.status ?? "pending";
                    const meta = STATUS_META[ds];
                    return (
                      <tr key={d._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 text-gray-400 text-xs font-mono">{i + 1}</td>

                        {/* Passport thumbnail */}
                        <td className="px-4 py-4">
                          {d.passportPhotoUrl ? (
                            <img
                              src={d.passportPhotoUrl}
                              alt={d.fullName}
                              className="w-10 h-10 rounded-full object-cover border-2 cursor-pointer hover:scale-110 transition-transform"
                              style={{ borderColor: "#d4eadb" }}
                              onClick={() => setSelected(d)}
                              title="Click to view details"
                            />
                          ) : (
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                              style={{ backgroundColor: "#008751" }}
                            >
                              {d.fullName.charAt(0)}
                            </div>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          <p className="font-semibold text-gray-800 whitespace-nowrap">{d.fullName}</p>
                          <p className="text-xs text-gray-400">{d.position}</p>
                          <p className="text-xs text-gray-400">{d.phone}</p>
                        </td>

                        <td className="px-4 py-4">
                          <span className="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded whitespace-nowrap">
                            {d.matricNumber}
                          </span>
                        </td>

                        <td className="px-4 py-4 max-w-[160px]">
                          <p className="text-sm text-gray-700 truncate">{d.institution}</p>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          <p className="text-xs font-semibold text-gray-700">{d.zone}</p>
                          <p className="text-xs text-gray-400">{d.state}</p>
                        </td>

                        <td className="px-4 py-4">
                          <span className="font-mono text-xs font-bold whitespace-nowrap" style={{ color: "#005c37" }}>
                            {d.code}
                          </span>
                        </td>

                        {/* Status badge */}
                        <td className="px-4 py-4">
                          <span
                            className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
                            style={{ backgroundColor: meta.bg, color: meta.text }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: meta.dot }} />
                            {meta.label}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-xs text-gray-400 whitespace-nowrap">
                          {new Date(d.registeredAt).toLocaleDateString("en-NG", {
                            day: "numeric", month: "short", year: "numeric",
                          })}
                        </td>

                        <td className="px-4 py-4">
                          <button
                            onClick={() => setSelected(d)}
                            className="px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all hover:shadow-sm whitespace-nowrap"
                            style={{ borderColor: "#008751", color: "#008751" }}
                          >
                            {ds === "confirmed" ? "✓ Confirmed" : "View →"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!loading && !error && visibleDelegates.length > 0 && (
            <div className="px-5 py-3 text-xs text-gray-400 border-t flex items-center justify-between" style={{ borderColor: "#e0ede0" }}>
              <span>Showing {visibleDelegates.length} delegate{visibleDelegates.length !== 1 ? "s" : ""}</span>
              <span>NANS ICPC Delegate Records · {new Date().getFullYear()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <DelegateModal
          delegate={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default AdminDelegatesPage;
