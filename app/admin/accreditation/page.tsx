"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiSearch, BiCopy, BiCheck, BiArrowBack, BiArrowToRight } from "react-icons/bi";
import { FaInbox } from "react-icons/fa";
import { ZONES } from "@/app/components/data";


const STATES_BY_ZONE: Record<string, string[]> = {
  "Zone A (Northwest)": ["Kano", "Kaduna", "Katsina", "Sokoto", "Kebbi", "Zamfara", "Jigawa"],
  "Zone B (Northeast)": ["Borno", "Adamawa", "Gombe", "Bauchi", "Yobe", "Taraba"],
  "Zone C (Northcentral)": ["FCT Abuja", "Plateau", "Benue", "Kogi", "Niger", "Nassarawa", "Kwara"],
  "Zone D (Southwest)": ["Lagos", "Oyo", "Osun", "Ekiti", "Ondo", "Ogun"],
  "Zone E (Southeast)": ["Enugu", "Anambra", "Imo", "Abia", "Ebonyi"],
  "Zone F (Southsouth)": ["Rivers", "Delta", "Akwa Ibom", "Cross River", "Bayelsa", "Edo"],
};

interface AccreditationCode {
  _id: string;
  code: string;
  institution: string;
  zone: string;
  state: string;
  generatedFor: string | null;
  status: "unused" | "used";
  createdAt: string;
  usedAt: string | null;
}

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="p-1.5 rounded-lg transition-all hover:scale-110"
      title="Copy code"
      style={{ color: copied ? "#008751" : "#9ca3af" }}
    >
      {copied ? <BiCheck size={16} /> : <BiCopy size={16} />}
    </button>
  );
};

const GenerateModal: React.FC<{
  onClose: () => void;
  onSuccess: () => void;
}> = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    institution: "",
    zone: "",
    state: "",
    generatedFor: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const states = form.zone ? STATES_BY_ZONE[form.zone] ?? [] : [];

  const handleSubmit = async () => {
    if (!form.institution || !form.zone || !form.state) {
      setError("Please fill in all required fields.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/accreditation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setGeneratedCode(data.code);
      onSuccess();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to generate");
    } finally {
      setSaving(false);
    }
  };

  const copyCode = async () => {
    if (generatedCode) {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,15,8,0.85)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="px-7 py-5 text-white"
          style={{ background: "linear-gradient(135deg, #005c37, #008751)" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-green-300 text-xs mb-1">Admin Action</p>
              <h2 className="font-bold text-xl" style={{ fontFamily: "'Crimson Pro', serif" }}>
                Generate Accreditation Code
              </h2>
              <p className="text-green-200 text-sm">
                Assign a unique code to a student union president
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-7">
          {generatedCode ? (
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4"
                style={{ backgroundColor: "#008751" }}
              >
                ✓
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2" style={{ fontFamily: "'Crimson Pro', serif" }}>
                Code Generated!
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Share this code with the SUG president of <strong>{form.institution}</strong>.
              </p>
              <div
                className="rounded-2xl p-5 mb-5 border flex items-center justify-between gap-3"
                style={{ borderColor: "#d4eadb", backgroundColor: "#f0fdf4" }}
              >
                <span
                  className="font-mono text-2xl font-bold tracking-widest"
                  style={{ color: "#008751", letterSpacing: "0.15em" }}
                >
                  {generatedCode}
                </span>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: copied ? "#008751" : "#005c37" }}
                >
                  {copied ? <><BiCheck /> Copied!</> : <><BiCopy /> Copy</>}
                </button>
              </div>
              <p className="text-xs text-gray-400 mb-6">
                This code can only be used once. The president will need it to complete their accreditation registration.
              </p>
              <button
                onClick={onClose}
                className="w-full py-2.5 text-sm font-bold text-white rounded-xl"
                style={{ backgroundColor: "#008751" }}
              >
                Done
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Institution Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. University of Lagos"
                  value={form.institution}
                  onChange={(e) => setForm((f) => ({ ...f, institution: e.target.value }))}
                  className="w-full px-4 py-3 text-sm text-black rounded-xl border focus:outline-none"
                  style={{ borderColor: "#d4eadb" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Zone <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.zone}
                    onChange={(e) => setForm((f) => ({ ...f, zone: e.target.value, state: "" }))}
                    className="w-full px-4 py-3 text-sm text-black rounded-xl border focus:outline-none"
                    style={{ borderColor: "#d4eadb" }}
                  >
                    <option value="">— Select Zone —</option>
                    {ZONES.map((z) => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.state}
                    onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                    disabled={!form.zone}
                    className="w-full px-4 py-3 text-sm text-black rounded-xl border focus:outline-none disabled:opacity-50"
                    style={{ borderColor: "#d4eadb" }}
                  >
                    <option value="">— Select State —</option>
                    {states.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Assign To (SUG President Name) <span className="text-gray-400 font-normal">— optional</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Comr. Adewale Babatunde"
                  value={form.generatedFor}
                  onChange={(e) => setForm((f) => ({ ...f, generatedFor: e.target.value }))}
                  className="w-full px-4 py-3 text-sm text-black rounded-xl border focus:outline-none"
                  style={{ borderColor: "#d4eadb" }}
                />
              </div>

              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 text-sm font-semibold rounded-xl border"
                  style={{ borderColor: "#d4eadb", color: "#374151" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="flex-1 py-2.5 text-sm font-bold text-white rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#008751" }}
                >
                  {saving && (
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                  )}
                  Generate Code
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminAccreditationPage: React.FC = () => {
  const router = useRouter();
  const [codes, setCodes] = useState<AccreditationCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unused" | "used">("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const fetchCodes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (zoneFilter !== "all") params.set("zone", zoneFilter);
      if (search) params.set("search", search);
      const res = await fetch(`/api/accreditation?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCodes(data.codes);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, zoneFilter]);

  useEffect(() => {
    fetchCodes();
  }, [fetchCodes]);

  const counts = {
    all: codes.length,
    unused: codes.filter((c) => c.status === "unused").length,
    used: codes.filter((c) => c.status === "used").length,
  };

  const zones = ["all", ...ZONES];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div style={{ backgroundColor: "#005c37" }} className="text-white px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="NANS" className="w-8 h-8 rounded-full bg-white" />
          <div>
            <p className="font-bold text-sm">NANS ICPC — Admin</p>
            <p className="text-green-300 text-xs">Accreditation Code Management</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-green-300 text-xs hover:text-white transition-colors flex gap-1 items-center"><BiArrowBack /> Nominations</Link>
          <Link href="/" className="text-green-300 text-xs hover:text-white transition-colors flex gap-1 items-center"><BiArrowBack />  Back to site</Link>
          <Link
            href="/delegates"
            target="_blank"
            className="text-xs font-semibold px-3 flex gap-1 items-center py-1.5 rounded-lg text-white border border-white/30 hover:bg-white/10 transition-all"
          >
            Public Delegates <BiArrowToRight /> 
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Crimson Pro', serif" }}>
              Accreditation Codes
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Generate and manage delegate accreditation codes for university presidents
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90 hover:scale-105"
            style={{ backgroundColor: "#008751" }}
          >
            + Generate New Code
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Codes", count: counts.all, color: "#374151", bg: "#f9fafb" },
            { label: "Unused", count: counts.unused, color: "#C8A000", bg: "#fef9e7" },
            { label: "Used / Registered", count: counts.used, color: "#008751", bg: "#e8f5ee" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border p-5 cursor-pointer transition-all hover:shadow-md"
              style={{ borderColor: s.color + "30", backgroundColor: s.bg }}
              onClick={() => setStatusFilter(s.label === "Total Codes" ? "all" : s.label === "Unused" ? "unused" : "used")}
            >
              <p className="text-3xl font-bold mb-1" style={{ fontFamily: "'Crimson Pro', serif", color: s.color }}>
                {s.count}
              </p>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border p-5 mb-6 flex flex-wrap gap-4 items-center" style={{ borderColor: "#e0ede0" }}>
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><BiSearch /></span>
            <input
              type="text"
              placeholder="Search institution, code, state…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-black pl-9 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none"
              style={{ borderColor: "#d4eadb" }}
            />
          </div>

          <div className="flex gap-2">
            {(["all", "unused", "used"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="px-3.5 py-2 text-xs font-bold rounded-xl border transition-all capitalize"
                style={{
                  borderColor: statusFilter === s ? (s === "used" ? "#008751" : s === "unused" ? "#C8A000" : "#374151") : "#e0ede0",
                  backgroundColor: statusFilter === s ? (s === "used" ? "#e8f5ee" : s === "unused" ? "#fef9e7" : "#f9fafb") : "white",
                  color: statusFilter === s ? (s === "used" ? "#008751" : s === "unused" ? "#C8A000" : "#374151") : "#6b7280",
                }}
              >
                {s === "all" ? "All" : s === "used" ? "Used" : "Unused"}
              </button>
            ))}
          </div>

          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="px-3 py-2.5 text-sm border rounded-xl focus:outline-none text-black"
            style={{ borderColor: "#d4eadb" }}
          >
            {zones.map((z) => (
              <option key={z} value={z}>{z === "all" ? "All Zones" : z}</option>
            ))}
          </select>

          <button
            onClick={fetchCodes}
            className="px-4 py-2.5 text-xs font-bold text-white rounded-xl"
            style={{ backgroundColor: "#008751" }}
          >
            ↻ Refresh
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#e0ede0" }}>
          {loading ? (
            <div className="py-20 text-center">
              <svg className="animate-spin w-8 h-8 mx-auto mb-3" style={{ color: "#008751" }} fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <p className="text-sm text-gray-400">Loading codes…</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3">⚠️</p>
              <p className="text-red-500 font-medium text-sm">{error}</p>
            </div>
          ) : codes.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3"><FaInbox /></p>
              <p className="text-gray-500 font-medium">No codes generated yet</p>
              <p className="text-xs text-gray-400 mt-1">Click "Generate New Code" to create accreditation codes.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#f8fdf9", borderBottom: "1px solid #e0ede0" }}>
                    {["#", "Code", "Institution", "Zone / State", "Assigned To", "Status", "Generated", "Used At"].map((h) => (
                      <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "#f0f0f0" }}>
                  {codes.map((c, i) => (
                    <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-gray-400 text-xs font-mono">{i + 1}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="font-mono font-bold text-sm tracking-widest"
                            style={{ color: "#005c37", letterSpacing: "0.1em" }}
                          >
                            {c.code}
                          </span>
                          <CopyButton text={c.code} />
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-800 text-sm max-w-[200px] truncate">{c.institution}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-xs font-semibold text-gray-700">{c.zone}</p>
                        <p className="text-xs text-gray-400">{c.state}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-500">
                        {c.generatedFor || <span className="text-gray-300 italic">—</span>}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{
                            backgroundColor: c.status === "used" ? "#e8f5ee" : "#fef9e7",
                            color: c.status === "used" ? "#008751" : "#C8A000",
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: c.status === "used" ? "#008751" : "#C8A000" }}
                          />
                          {c.status === "used" ? "Used" : "Unused"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-400 whitespace-nowrap">
                        {new Date(c.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-400 whitespace-nowrap">
                        {c.usedAt
                          ? new Date(c.usedAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })
                          : <span className="text-gray-300">—</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && !error && codes.length > 0 && (
            <div className="px-5 py-3 text-xs text-gray-400 border-t flex items-center justify-between" style={{ borderColor: "#e0ede0" }}>
              <span>Showing {codes.length} code{codes.length !== 1 ? "s" : ""}</span>
              <span>NANS ICPC Accreditation Dashboard · {new Date().getFullYear()}</span>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <GenerateModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchCodes}
        />
      )}
    </div>
  );
};

export default AdminAccreditationPage;
