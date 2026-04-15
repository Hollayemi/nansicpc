"use client"
import React, { useState } from "react";
import Wrapper from "../components/wrapper";
import Link from "next/link";
import { FaNoteSticky } from "react-icons/fa6";
interface Candidate {
  id: number;
  name: string;
  position: "president" | "senate";
  institution: string;
  zone: string;
  department: string;
  level: string;
  status: "cleared" | "pending" | "disqualified";
  manifesto: string[];
  bio: string;
  initials: string;
  color: string;
}

const candidates: Candidate[] = []

const StatusBadge: React.FC<{ status: Candidate["status"] }> = ({ status }) => {
  const styles: Record<Candidate["status"], { bg: string; text: string; label: string }> = {
    cleared: { bg: "#e8f5ee", text: "#008751", label: "✓ EC Cleared" },
    pending: { bg: "#fef9e7", text: "#c8a000", label: "⏳ Screening Pending" },
    disqualified: { bg: "#fef2f2", text: "#dc2626", label: "✗ Disqualified" },
  };
  const s = styles[status];
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  );
};

const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate: c }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-all"
      style={{ borderColor: "#d4eadb" }}
    >
      {/* Color top stripe */}
      <div className="h-1.5" style={{ backgroundColor: c.color }} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${c.color}, #002e1c)` }}
          >
            {c.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-bold text-gray-900 leading-tight mb-1"
              style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem" }}
            >
              {c.name}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <StatusBadge status={c.status} />
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold text-white"
                style={{ backgroundColor: c.position === "president" ? "#C8A000" : "#4b5563" }}
              >
                {c.position === "president" ? "Presidential" : "Senate Pres."}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div
          className="rounded-xl p-4 space-y-2 mb-4"
          style={{ backgroundColor: "#f8fdf9" }}
        >
          {[
            { label: "Institution", value: c.institution },
            { label: "Department", value: c.department },
            { label: "Level", value: c.level },
            { label: "Zone", value: c.zone },
          ].map((d) => (
            <div key={d.label} className="flex justify-between text-sm">
              <span className="text-gray-500">{d.label}</span>
              <span className="font-medium text-gray-800 text-right max-w-[55%]">{d.value}</span>
            </div>
          ))}
        </div>

        {/* Bio */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{c.bio}</p>

        {/* Manifesto toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 text-sm font-semibold transition-colors mb-3"
          style={{ color: "#008751" }}
        >
          <span>{expanded ? "▲" : "▼"}</span>
          {expanded ? "Hide Manifesto" : "View Key Manifesto Points"}
        </button>

        {expanded && (
          <div
            className="rounded-xl p-4 border"
            style={{ borderColor: "#d4eadb", backgroundColor: "#f0fdf4" }}
          >
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Campaign Priorities
            </p>
            <ul className="space-y-2">
              {c.manifesto.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "#008751" }}
                  >
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const Candidates: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "president" | "senate">("all");

  const filtered =
    filter === "all"
      ? candidates
      : candidates.filter((c) => c.position === filter);

  const presidentialCandidates = candidates.filter((c) => c.position === "president");
  const senateCandidates = candidates.filter((c) => c.position === "senate");

  return (
    <Wrapper>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#008751" }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 30px)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <p className="text-green-200 text-sm font-medium mb-2">2026 NANS Elections</p>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            Candidates
          </h1>
          <p className="text-green-100 text-lg max-w-xl leading-relaxed">
            Meet the{" "}
            <strong>{presidentialCandidates.length} Presidential</strong> and{" "}
            <strong>{senateCandidates.length} Senate Presidential</strong> candidates contesting in the 2026 NANS General Election.
          </p>
          <div className="flex gap-2 mt-6 text-sm text-green-200">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Candidates</span>
          </div>
          <Link
            href="/candidates/form"
            className="inline-flex mt-2 items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105 flex-shrink-0"
            style={{ backgroundColor: "#C8A000", color: "#1a1500" }}
          >
            <FaNoteSticky />
            Open Forms
          </Link>
          {/* </div> */}
        </div>
      </section>

      {/* Filter tabs */}
      <section className="py-8 bg-white border-b" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center justify-between">
          <div
            className="inline-flex gap-2 p-1.5 rounded-xl"
            style={{ backgroundColor: "#f0fdf4" }}
          >
            {(["all", "president", "senate"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all capitalize ${filter === f ? "text-white shadow" : "text-gray-600 hover:bg-gray-100"
                  }`}
                style={filter === f ? { backgroundColor: "#008751" } : {}}
              >
                {f === "all"
                  ? "All Candidates"
                  : f === "president"
                    ? "Presidential"
                    : "Senate President"}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Showing <strong>{filtered.length}</strong> candidate{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Candidates grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {(filter === "all" || filter === "president") && (
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="px-4 py-1.5 rounded-full text-white text-sm font-bold"
                  style={{ backgroundColor: "#C8A000" }}
                >
                  Presidential Race
                </div>
                <div className="flex-1 h-px" style={{ backgroundColor: "#e0ede0" }} />
                <span className="text-sm text-gray-400">
                  {presidentialCandidates.length} Candidates
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {presidentialCandidates.map((c) => (
                  <CandidateCard key={c.id} candidate={c} />
                ))}
              </div>
            </div>
          )}

          {(filter === "all" || filter === "senate") && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="px-4 py-1.5 rounded-full text-white text-sm font-bold"
                  style={{ backgroundColor: "#4b5563" }}
                >
                  Senate Presidential Race
                </div>
                <div className="flex-1 h-px" style={{ backgroundColor: "#e0ede0" }} />
                <span className="text-sm text-gray-400">
                  {senateCandidates.length} Candidates
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {senateCandidates.map((c) => (
                  <CandidateCard key={c.id} candidate={c} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 border-t" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-xl p-5 border-l-4 text-sm text-gray-600 leading-relaxed"
            style={{ borderLeftColor: "#C8A000", backgroundColor: "#fdfdf0" }}
          >
            <strong>Disclaimer:</strong> Candidate profiles and manifesto points are submitted by the candidates themselves and have been published as-is following Electoral Committee clearance. NANS does not endorse any candidate. All eligible voters are encouraged to make their choice based on independent assessment.
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Candidates;