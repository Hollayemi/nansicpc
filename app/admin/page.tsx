"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { FaInbox } from "react-icons/fa";

/* ─── types ───────────────────────────────────────────────────────────────── */
type Status = "pending" | "cleared" | "disqualified";

interface Declaration {
  key: string;
  agreed: boolean;
}

interface Nomination {
  _id: string;
  fullName: string;
  stateOfOrigin: string;
  address: string;
  institution: string;
  officeContested: string;
  academicSession: string;
  signatureName: string;
  declarations: Declaration[];
  hasPassportPhoto: boolean;
  status: Status;
  adminNote?: string;
  submittedAt: string;
  updatedAt: string;
}

/* ─── status helpers ──────────────────────────────────────────────────────── */
const STATUS_META: Record<Status, { label: string; bg: string; text: string; dot: string }> = {
  pending: { label: "Pending", bg: "#fef9e7", text: "#C8A000", dot: "#C8A000" },
  cleared: { label: "Cleared", bg: "#e8f5ee", text: "#008751", dot: "#008751" },
  disqualified: { label: "Disqualified", bg: "#fef2f2", text: "#dc2626", dot: "#dc2626" },
};

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const m = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: m.bg, color: m.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.dot }} />
      {m.label}
    </span>
  );
};

/* ─── detail modal ────────────────────────────────────────────────────────── */
const DetailModal: React.FC<{
  nomination: Nomination;
  onClose: () => void;
  onStatusChange: (id: string, status: Status, note: string) => Promise<void>;
}> = ({ nomination: n, onClose, onStatusChange }) => {
  const [newStatus, setNewStatus] = useState<Status>(n.status);
  const [note, setNote] = useState(n.adminNote ?? "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onStatusChange(n._id, newStatus, note);
    setSaving(false);
    onClose();
  };

  const agreed = n.declarations?.filter((d) => d.agreed).length ?? 0;
  const total = n.declarations?.length ?? 9;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,15,8,0.85)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-7 py-5 flex-shrink-0 text-white"
          style={{ background: "linear-gradient(135deg, #005c37, #008751)" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-green-300 text-xs mb-1">Nomination Detail</p>
              <h2 className="font-bold text-xl" style={{ fontFamily: "'Crimson Pro', serif" }}>
                {n.fullName}
              </h2>
              <p className="text-green-200 text-sm">{n.officeContested} · {n.institution}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-7 space-y-6">
          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Full Name", value: n.fullName },
              { label: "State of Origin", value: n.stateOfOrigin },
              { label: "Institution", value: n.institution },
              { label: "Office Contested", value: n.officeContested },
              { label: "Academic Session", value: n.academicSession },
              { label: "Address", value: n.address },
              { label: "Signatory Name", value: n.signatureName },
              { label: "Passport Photo", value: n.hasPassportPhoto ? "Provided" : "Not provided" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-3 border" style={{ borderColor: "#e0ede0", backgroundColor: "#f8fdf9" }}>
                <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Declarations */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Declarations</p>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: agreed === total ? "#e8f5ee" : "#fef9e7",
                  color: agreed === total ? "#008751" : "#C8A000",
                }}
              >
                {agreed}/{total} agreed
              </span>
            </div>
            <div className="space-y-1.5">
              {n.declarations?.map((d, i) => (
                <div
                  key={d.key}
                  className="flex items-center gap-2 text-xs rounded-lg px-3 py-2"
                  style={{
                    backgroundColor: d.agreed ? "#f0fdf4" : "#fef2f2",
                    color: d.agreed ? "#166534" : "#991b1b",
                  }}
                >
                  <span>{d.agreed ? "✓" : "✗"}</span>
                  <span className="font-medium">Declaration {i + 1}</span>
                  <span className="text-gray-400">—</span>
                  <span className="capitalize">{d.agreed ? "Agreed" : "Not agreed"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timestamps */}
          <div className="text-xs text-gray-400 space-y-1">
            <p>Submitted: {new Date(n.submittedAt).toLocaleString("en-NG")}</p>
            <p>Last updated: {new Date(n.updatedAt).toLocaleString("en-NG")}</p>
          </div>

          {/* Status action */}
          <div className="rounded-2xl border p-5" style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Update Status</p>
            <div className="flex gap-2 mb-4">
              {(["pending", "cleared", "disqualified"] as Status[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setNewStatus(s)}
                  className="flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all capitalize"
                  style={{
                    borderColor: newStatus === s ? STATUS_META[s].dot : "#e0ede0",
                    backgroundColor: newStatus === s ? STATUS_META[s].bg : "white",
                    color: newStatus === s ? STATUS_META[s].text : "#6b7280",
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
              className="w-full px-3 text-black py-2 text-sm rounded-xl border resize-none focus:outline-none"
              style={{ borderColor: "#d4eadb" }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 py-4 border-t flex items-center justify-between gap-4 flex-shrink-0" style={{ borderColor: "#e0ede0" }}>
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold rounded-xl border"
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
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── main admin page ─────────────────────────────────────────────────────── */
const AdminPage: React.FC = () => {
  const router = useRouter();
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  useEffect(() => {
    // 
  })
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [officeFilter, setOfficeFilter] = useState("all");
  const [selected, setSelected] = useState<Nomination | null>(null);

  const fetchNominations = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (officeFilter !== "all") params.set("office", officeFilter);
      if (search) params.set("search", search);
      const res = await fetch(`/api/nomination?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setNominations(data.nominations);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, officeFilter]);

  useEffect(() => {
    fetchNominations();
  }, [fetchNominations]);

  const handleStatusChange = async (id: string, status: Status, adminNote: string) => {
    await fetch(`/api/nomination/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, adminNote }),
    });
    await fetchNominations();
  };

  // Counts
  const counts = {
    all: nominations.length,
    pending: nominations.filter((n) => n.status === "pending").length,
    cleared: nominations.filter((n) => n.status === "cleared").length,
    disqualified: nominations.filter((n) => n.status === "disqualified").length,
  };

  const offices = ["all", ...Array.from(new Set(nominations.map((n) => n.officeContested).filter(Boolean)))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div style={{ backgroundColor: "#005c37" }} className="text-white px-6 py-3 flex flex-col md:flex-row items-center justify-between">
        <div className="flex  items-center gap-3">
          <img src="/images/logo.png" alt="NANS" className="w-8 h-8 rounded-full bg-white" />
          <div>
            <p className="font-bold text-sm text-center md:text-left">NANS ICPC — Admin</p>
            <p className="text-green-300 text-xs">Nomination Management Dashboard</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4 mt-3 md:mt-0">
          <Link href="/" className="text-green-300 text-xs hover:text-white transition-colors">← Back to site</Link>
          <Link
            href="/candidates/form"
            target="_blank"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white border border-white/30 hover:bg-white/10 transition-all"
          >
            Open Form ↗
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
        {/* Page title + stats */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Crimson Pro', serif" }}>
            Nomination Submissions
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total", count: counts.all, color: "#374151", bg: "#f9fafb" },
              { label: "Pending Review", count: counts.pending, color: "#C8A000", bg: "#fef9e7" },
              { label: "Cleared", count: counts.cleared, color: "#008751", bg: "#e8f5ee" },
              { label: "Disqualified", count: counts.disqualified, color: "#dc2626", bg: "#fef2f2" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border p-5 cursor-pointer transition-all hover:shadow-md"
                style={{ borderColor: s.color + "30", backgroundColor: s.bg }}
                onClick={() => setStatusFilter(s.label === "Total" ? "all" : s.label.toLowerCase().split(" ")[0] as Status)}
              >
                <p className="text-3xl font-bold mb-1" style={{ fontFamily: "'Crimson Pro', serif", color: s.color }}>
                  {s.count}
                </p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border p-5 mb-6 flex flex-wrap gap-4 items-center" style={{ borderColor: "#e0ede0" }}>
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"><BiSearch /></span>
            <input
              type="text"
              placeholder="Search by name, institution, state…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-black pl-9 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2"
              style={{ borderColor: "#d4eadb" }}
            />
          </div>

          {/* Status filter */}
          <div className="flex gap-2">
            {(["all", "pending", "cleared", "disqualified"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="px-3.5 py-2 text-xs font-bold rounded-xl border transition-all capitalize"
                style={{
                  borderColor: statusFilter === s ? (STATUS_META[s as Status]?.dot ?? "#374151") : "#e0ede0",
                  backgroundColor: statusFilter === s ? (STATUS_META[s as Status]?.bg ?? "#f9fafb") : "white",
                  color: statusFilter === s ? (STATUS_META[s as Status]?.text ?? "#374151") : "#6b7280",
                }}
              >
                {s === "all" ? "All" : STATUS_META[s].label}
              </button>
            ))}
          </div>

          {/* Office filter */}
          <select
            value={officeFilter}
            onChange={(e) => setOfficeFilter(e.target.value)}
            className="px-3 py-2.5 text-sm border rounded-xl focus:outline-none"
            style={{ borderColor: "#d4eadb" }}
          >
            {offices.map((o) => (
              <option key={o} value={o}>{o === "all" ? "All Offices" : o}</option>
            ))}
          </select>

          <button
            onClick={fetchNominations}
            className="px-4 py-2.5 text-xs font-bold text-white rounded-xl flex items-center gap-2"
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
              <p className="text-sm text-gray-400">Loading nominations…</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3">⚠️</p>
              <p className="text-red-500 font-medium text-sm">{error}</p>
              <p className="text-xs text-gray-400 mt-1">Check your MONGODB_URI environment variable.</p>
            </div>
          ) : nominations.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3"><FaInbox /></p>
              <p className="text-gray-500 font-medium">No submissions found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#f8fdf9", borderBottom: "1px solid #e0ede0" }}>
                    {["#", "Aspirant", "Institution", "Office", "Declarations", "Status", "Submitted", "Action"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "#f0f0f0" }}>
                  {nominations.map((n, i) => {
                    const agreed = n.declarations?.filter((d) => d.agreed).length ?? 0;
                    const total = n.declarations?.length ?? 9;
                    return (
                      <tr
                        key={n._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-5 py-4 text-gray-400 text-xs font-mono">{i + 1}</td>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-800 whitespace-nowrap">{n.fullName}</p>
                          <p className="text-xs text-gray-400">{n.stateOfOrigin}</p>
                        </td>
                        <td className="px-5 py-4 text-gray-600 max-w-[180px]">
                          <p className="truncate">{n.institution}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className="text-xs font-bold px-2 py-1 rounded-full text-white whitespace-nowrap"
                            style={{ backgroundColor: "#005c37" }}
                          >
                            {n.officeContested}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${(agreed / total) * 100}%`,
                                  backgroundColor: agreed === total ? "#008751" : "#C8A000",
                                }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">{agreed}/{total}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={n.status} />
                          {n.adminNote && (
                            <p className="text-xs text-gray-400 mt-0.5 max-w-[120px] truncate">{n.adminNote}</p>
                          )}
                        </td>
                        <td className="px-5 py-4 text-xs text-gray-400 whitespace-nowrap">
                          {new Date(n.submittedAt).toLocaleDateString("en-NG", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => setSelected(n)}
                            className="px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all hover:shadow-sm"
                            style={{ borderColor: "#008751", color: "#008751" }}
                          >
                            Review →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Table footer */}
          {!loading && !error && nominations.length > 0 && (
            <div
              className="px-5 py-3 text-xs text-gray-400 border-t flex items-center justify-between"
              style={{ borderColor: "#e0ede0" }}
            >
              <span>Showing {nominations.length} submission{nominations.length !== 1 ? "s" : ""}</span>
              <span>NANS ICPC Nomination Dashboard · {new Date().getFullYear()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <DetailModal
          nomination={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default AdminPage;
