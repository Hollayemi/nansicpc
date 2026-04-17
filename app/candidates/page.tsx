"use client"
import React, { useState } from "react";
import Wrapper from "../components/wrapper";
import Link from "next/link";
import { FaNoteSticky } from "react-icons/fa6";

interface Candidate {
  id: number;
  name: string;
  position: string; // e.g., "National President", "Senate President", etc.
  positionCategory: "executive" | "senate_secretariat";
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

// All executive positions from NANS Constitution Article 9
const EXECUTIVE_POSITIONS = [
  "National President",
  "Vice President (National Affairs)",
  "Vice President (External Affairs)",
  "Vice President (Special Duties)",
  "Vice President (Inter Campus Affairs)",
  "Secretary-General",
  "Assistant Secretary-General",
  "Financial Secretary",
  "Public Relations Officer",
  "Treasurer",
  "Director of Travels and Exchange",
  "Director of Sports",
  "Director of Action and Mobilization",
  "Ex-Officio 1 (Non-Elective)",
  "Ex-Officio 2 (Female)",
];

// Senate Secretariat Positions
const SENATE_SECRETARIAT_POSITIONS = [
  "Senate President",
  "Deputy Senate President",
  "Clerk of the House",
];

// Position color mapping (keep original colors for President/Senate President)
const getPositionColor = (position: string): string => {
  if (position === "National President") return "#C8A000";
  if (position === "Senate President") return "#C8A000";
  if (EXECUTIVE_POSITIONS.slice(1, 5).includes(position)) return "#008751";
  if (EXECUTIVE_POSITIONS.slice(5, 10).includes(position)) return "#4b5563";
  if (EXECUTIVE_POSITIONS.slice(10, 13).includes(position)) return "#6B21A5";
  return "#9E9E9E";
};

const candidates: Candidate[] = [
  // Add your candidate data here
  // Example:
  // {
  //   id: 1,
  //   name: "John Doe",
  //   position: "National President",
  //   positionCategory: "executive",
  //   institution: "University of Lagos",
  //   zone: "South West",
  //   department: "Political Science",
  //   level: "400 Level",
  //   status: "cleared",
  //   manifesto: ["Point 1", "Point 2"],
  //   bio: "Bio text here...",
  //   initials: "JD",
  //   color: "#C8A000",
  // },
];

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
      <div className="h-1.5" style={{ backgroundColor: c.color }} />

      <div className="p-6">
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
                style={{ backgroundColor: c.color }}
              >
                {c.position === "National President" ? "Presidential" : c.position === "Senate President" ? "Senate Pres." : c.position}
              </span>
            </div>
          </div>
        </div>

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

        <p className="text-gray-600 text-sm leading-relaxed mb-4">{c.bio}</p>

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
              {c.manifesto.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
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
  const [filter, setFilter] = useState<"all" | "executive" | "senate_secretariat">("all");

  // Group candidates by position
  const getCandidatesByPosition = (positionList: string[], category: "executive" | "senate_secretariat") => {
    const positionMap: Record<string, Candidate[]> = {};
    positionList.forEach(pos => { positionMap[pos] = []; });
    
    candidates
      .filter(c => c.positionCategory === category)
      .forEach(candidate => {
        if (positionMap[candidate.position]) {
          positionMap[candidate.position].push(candidate);
        }
      });
    
    return positionMap;
  };

  const executiveCandidatesByPosition = getCandidatesByPosition(EXECUTIVE_POSITIONS, "executive");
  const senateCandidatesByPosition = getCandidatesByPosition(SENATE_SECRETARIAT_POSITIONS, "senate_secretariat");

  const totalExecutiveCandidates = candidates.filter(c => c.positionCategory === "executive").length;
  const totalSenateCandidates = candidates.filter(c => c.positionCategory === "senate_secretariat").length;

  return (
    <Wrapper>
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
            Meet the candidates contesting for{" "}
            <strong>{EXECUTIVE_POSITIONS.length} Executive Positions</strong> and{" "}
            <strong>{SENATE_SECRETARIAT_POSITIONS.length} Senate Secretariat Positions</strong> in the 2026 NANS General Election.
          </p>
          <div className="flex gap-2 mt-6 text-sm text-green-200">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Candidates</span>
          </div>
          <Link
            href="/candidates/form"
            className="inline-flex mt-2 items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 hover:scale-105 flex-shrink-0"
            style={{ backgroundColor: "#C8A000", color: "#1a1500" }}
          >
            <FaNoteSticky />
            Open Forms
          </Link>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="py-8 bg-white border-b" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center justify-between">
          <div
            className="inline-flex gap-2 p-1.5 rounded-xl"
            style={{ backgroundColor: "#f0fdf4" }}
          >
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all capitalize ${filter === "all" ? "text-white shadow" : "text-gray-600 hover:bg-gray-100"
                }`}
              style={filter === "all" ? { backgroundColor: "#008751" } : {}}
            >
              All Races
            </button>
            <button
              onClick={() => setFilter("executive")}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all capitalize ${filter === "executive" ? "text-white shadow" : "text-gray-600 hover:bg-gray-100"
                }`}
              style={filter === "executive" ? { backgroundColor: "#008751" } : {}}
            >
              Executive Council
            </button>
            <button
              onClick={() => setFilter("senate_secretariat")}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all capitalize ${filter === "senate_secretariat" ? "text-white shadow" : "text-gray-600 hover:bg-gray-100"
                }`}
              style={filter === "senate_secretariat" ? { backgroundColor: "#008751" } : {}}
            >
              Senate Secretariat
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Total <strong>{candidates.length}</strong> candidate{candidates.length !== 1 ? "s" : ""} across all races
          </p>
        </div>
      </section>

      {/* Executive Council Races */}
      {(filter === "all" || filter === "executive") && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {EXECUTIVE_POSITIONS.map((position) => {
              const positionCandidates = executiveCandidatesByPosition[position] || [];
              return (
                <div key={position} className="mb-14">
                  <div className="flex items-center gap-3 mb-8">
                    <div
                      className="px-4 py-1.5 rounded-full text-white text-sm font-bold"
                      style={{ backgroundColor: getPositionColor(position) }}
                    >
                      {position}
                    </div>
                    <div className="flex-1 h-px" style={{ backgroundColor: "#e0ede0" }} />
                    <span className="text-sm text-gray-400">
                      {positionCandidates.length} Candidate{positionCandidates.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {positionCandidates.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                      {positionCandidates.map((c) => (
                        <CandidateCard key={c.id} candidate={c} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed" style={{ borderColor: "#d4eadb" }}>
                      <p className="text-gray-400">No candidates declared yet for this position</p>
                      <p className="text-sm text-gray-400 mt-1">Nominations are ongoing</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Senate Secretariat Races */}
      {(filter === "all" || filter === "senate_secretariat") && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {SENATE_SECRETARIAT_POSITIONS.map((position) => {
              const positionCandidates = senateCandidatesByPosition[position] || [];
              return (
                <div key={position} className="mb-14">
                  <div className="flex items-center gap-3 mb-8">
                    <div
                      className="px-4 py-1.5 rounded-full text-white text-sm font-bold"
                      style={{ backgroundColor: getPositionColor(position) }}
                    >
                      {position}
                    </div>
                    <div className="flex-1 h-px" style={{ backgroundColor: "#e0ede0" }} />
                    <span className="text-sm text-gray-400">
                      {positionCandidates.length} Candidate{positionCandidates.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {positionCandidates.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                      {positionCandidates.map((c) => (
                        <CandidateCard key={c.id} candidate={c} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed" style={{ borderColor: "#d4eadb" }}>
                      <p className="text-gray-400">No candidates declared yet for this position</p>
                      <p className="text-sm text-gray-400 mt-1">Nominations are ongoing</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

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