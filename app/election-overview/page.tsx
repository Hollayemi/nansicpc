"use client"
import React, { useState } from "react";
import Wrapper from "../components/wrapper";
import Link from "next/link";
import { FaFile, FaSearch } from "react-icons/fa";

/* ─────────────────────────────────────────────────────────────────────────────
   FORMS DATA — update href paths to point to your actual PDF files
───────────────────────────────────────────────────────────────────────────── */
interface NominationForm {
  id: number;
  title: string;
  description: string;
  for: string;
  pages: number;
  fee?: string;
  tag: string;
  tagColor: string;
  icon: string;
  href: string; // path to the actual PDF in your /public folder
}

const nominationForms: NominationForm[] = [
  {
    id: 1,
    title: "ACCREDITATION LIST NANS NATIONAL 2026",
    description: "Official accreditation list for delegates and participants attending the NANS National Convention 2026.",
    for: "All Delegates",
    pages: 11,
    // fee: "₦150,000",
    tag: "ACCREDITATION",
    tagColor: "#C8A000",
    icon: "👤",
    href: "/forms/ACCREDITATION LIST NANS NATIONAL 2026.pdf",
  },
  {
    id: 2,
    title: "NANS ATTESTATION FORM 2026",
    description: "Attestation form to verify and authenticate the eligibility of aspirants or delegates for the NANS National Convention 2026.",
    for: "Aspirants & Delegates",
    pages: 1,
    // fee: "₦100,000",
    tag: "ATTESTATION",
    tagColor: "#4b5563",
    icon: "🏛️",
    href: "/forms/NANS ATTESTATION FORM 2026.pdf",
  },
  {
    id: 3,
    title: "NANS DOC REQUIRED-2",
    description: "Document requirement checklist for delegates and participants registering for the NANS National Convention 2026.",
    for: "All Delegates",
    pages: 1,
    tag: "DOCUMENTS",
    tagColor: "#008751",
    icon: "🪪",
    href: "/forms/NANS DOC REQUIRED-2.pdf",
  },
  {
    id: 4,
    title: "Institutional Affiliation Form",
    description: "Form for tertiary institutions to confirm or establish official affiliation with NANS for the 2026 convention.",
    for: "Institutions",
    pages: 1,
    tag: "INSTITUTIONS",
    tagColor: "#005c37",
    icon: "🏫",
    href: "/forms/NEW FORM NANS-2.pdf",
  },
  {
    id: 5,
    title: "Nomination Form",
    description: "Official nomination form for aspirants contesting various positions in the NANS National Convention 2026.",
    for: "All Aspirants",
    pages: 1,
    tag: "NOMINATION",
    tagColor: "#7c3aed",
    icon: "📋",
    href: "/forms/Nomination Form.jpg",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   FORMS MODAL
───────────────────────────────────────────────────────────────────────────── */
const FormsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [search, setSearch] = useState("");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = nominationForms.filter(
    (f) =>
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.for.toLowerCase().includes(search.toLowerCase()) ||
      f.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,15,8,0.80)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "white" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="relative px-7 pt-7 pb-6 flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #005c37 0%, #008751 60%, #009B5E 100%)",
          }}
        >
          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 24px)",
            }}
          />
          {/* Watermark */}
          <div
            className="absolute right-6 top-2 text-white opacity-5 font-bold leading-none select-none pointer-events-none"
            style={{ fontSize: "90px", fontFamily: "'Crimson Pro',serif" }}
          >
            FORMS
          </div>

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 border"
                style={{ borderColor: "#C8A000", color: "#C8A000", backgroundColor: "rgba(200,160,0,0.1)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                2026 NANS National Convention
              </div>
              <h2
                className="text-white text-2xl sm:text-3xl font-bold leading-tight"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                Download Nomination Forms
              </h2>
              <p className="text-green-200 text-sm mt-1.5 max-w-md">
                Select and download the appropriate form for your role in the 2026 NANS National Convention.
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 hover:bg-white/20"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="relative mt-5">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"><FaSearch /></span>
            <input
              type="text"
              placeholder="Search forms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-white/95 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2"
              style={{ focusRingColor: "#C8A000" } as React.CSSProperties}
              autoFocus
            />
          </div>
        </div>

        {/* Forms list */}
        <div className="overflow-y-auto flex-1 p-5 space-y-3" style={{ backgroundColor: "#f8fdf9" }}>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">📂</p>
              <p className="text-gray-500 font-medium">No forms match your search.</p>
              <button
                onClick={() => setSearch("")}
                className="mt-2 text-sm font-semibold underline"
                style={{ color: "#008751" }}
              >
                Clear search
              </button>
            </div>
          ) : (
            filtered.map((form) => (
              <div
                key={form.id}
                className="group relative bg-white rounded-xl border overflow-hidden transition-all duration-200"
                style={{
                  borderColor: hoveredId === form.id ? form.tagColor + "80" : "#d4eadb",
                  boxShadow: hoveredId === form.id ? `0 4px 20px ${form.tagColor}20` : "0 1px 3px rgba(0,0,0,0.06)",
                  transform: hoveredId === form.id ? "translateY(-1px)" : "none",
                }}
                onMouseEnter={() => setHoveredId(form.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-200"
                  style={{
                    backgroundColor: form.tagColor,
                    opacity: hoveredId === form.id ? 1 : 0.4,
                  }}
                />

                <div className="flex items-center gap-4 px-5 py-4 pl-6">
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: form.tagColor + "18" }}
                  >
                    {form.id}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <h3
                        className="font-bold text-gray-900 text-sm leading-snug"
                        style={{ fontFamily: "'Crimson Pro', serif", fontSize: "0.98rem" }}
                      >
                        {form.title}
                      </h3>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0"
                        style={{ backgroundColor: form.tagColor }}
                      >
                        {form.tag}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-2">{form.description}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-gray-400">
                        <span className="font-medium text-gray-600">For:</span> {form.for}
                      </span>
                      <span
                        className="text-xs text-gray-400"
                        style={{ borderLeft: "1px solid #d4eadb", paddingLeft: "12px" }}
                      >
                        {form.pages} pages
                      </span>
                      {form.fee && (
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "#fef9e7", color: "#C8A000" }}
                        >
                          Nomination fee: {form.fee}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Download button */}
                  <a
                    href={form.href}
                    download
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
                    style={{ backgroundColor: form.tagColor }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="hidden sm:inline">Download</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          className="flex-shrink-0 px-6 py-4 border-t flex items-center justify-between gap-4"
          style={{ borderColor: "#e0ede0", backgroundColor: "white" }}
        >
          <p className="text-xs text-gray-400 leading-relaxed">
            All forms are official ICPC documents. Submit completed forms to the EC Secretariat.
            <br />
            <span className="font-medium text-gray-500">Questions? Email</span>{" "}
            <a href="mailto:info@nanscpc.org" className="font-semibold" style={{ color: "#008751" }}>
              info@nanscpc.org
            </a>
          </p>
          <button
            onClick={onClose}
            className="flex-shrink-0 px-5 py-2 text-sm font-semibold rounded-xl border transition-all hover:bg-gray-50"
            style={{ borderColor: "#d4eadb", color: "#374151" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   REST OF PAGE — unchanged components
───────────────────────────────────────────────────────────────────────────── */
const Tab: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
      active ? "text-white shadow" : "text-gray-600 hover:bg-gray-100"
    }`}
    style={active ? { backgroundColor: "#008751" } : {}}
  >
    {label}
  </button>
);

const RuleItem: React.FC<{ number: string; title: string; text: string }> = ({ number, title, text }) => (
  <div className="flex gap-4">
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
      style={{ backgroundColor: "#008751" }}
    >
      {number}
    </div>
    <div>
      <p className="font-semibold text-gray-800 text-sm mb-1">{title}</p>
      <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
    </div>
  </div>
);

const CriteriaItem: React.FC<{ icon: string; text: string; type: "required" | "prohibited" }> = ({ icon, text, type }) => (
  <div
    className="flex items-start gap-3 p-3 rounded-lg"
    style={{ backgroundColor: type === "required" ? "#f0fdf4" : "#fff5f5" }}
  >
    <span className="text-base flex-shrink-0">{icon}</span>
    <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────────── */
const ElectionOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"voter" | "candidate" | "process">("process");
  const [formsModalOpen, setFormsModalOpen] = useState(false);

  return (
    <Wrapper>
      {/* ── Hero ── */}
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
            Election Overview
          </h1>
          <p className="text-green-100 text-lg max-w-xl leading-relaxed mb-8">
            Everything you need to know — voting process, eligibility rules, conduct guidelines, and the constitutional framework governing the 2026 NANS Presidential Election.
          </p>

          {/* CTA buttons row */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Pick a Form — primary CTA */}
            <button
              onClick={() => setFormsModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              style={{ backgroundColor: "#C8A000", color: "#1a1500" }}
            >
              {/* Download icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v9M5 7l3 3 3-3M2 13h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Pick a Form to Download
            </button>

            <Link
              href="/candidates"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border border-white/50 text-white hover:bg-white/10 transition-all"
            >
              View Candidates →
            </Link>
          </div>

          <div className="flex gap-2 mt-8 text-sm text-green-200">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Election Overview</span>
          </div>
        </div>
      </section>

      {/* Key facts banner */}
      <section className="py-8 bg-white border-b" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Election Date", value: "July 15, 2026" },
              { label: "Positions Contested", value: "2 (President + Senate)" },
              { label: "Eligible Voters", value: "Accredited Student Leaders" },
              { label: "Electoral Body", value: "NANS Electoral Committee" },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center py-4 px-3 rounded-xl border"
                style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}
              >
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className="font-bold text-gray-800 text-sm" style={{ fontFamily: "'Crimson Pro', serif" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forms quick-access strip */}
      <section className="py-5 bg-white border-b" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl px-6 py-4 border"
            style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg flex-shrink-0"
                style={{ backgroundColor: "#008751" }}
              >
                <FaFile />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Convention Forms Available</p>
                <p className="text-gray-500 text-xs">
                  {nominationForms.length} official forms — nomination, accreditation, petition & more
                </p>
              </div>
            </div>
            <button
              onClick={() => setFormsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105 flex-shrink-0"
              style={{ backgroundColor: "#C8A000", color: "#1a1500" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Forms
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="inline-flex gap-2 p-1.5 rounded-xl mb-12"
            style={{ backgroundColor: "#f0fdf4" }}
          >
            <Tab label="Election Process" active={activeTab === "process"} onClick={() => setActiveTab("process")} />
            <Tab label="Voter Eligibility" active={activeTab === "voter"} onClick={() => setActiveTab("voter")} />
            <Tab label="Candidate Eligibility" active={activeTab === "candidate"} onClick={() => setActiveTab("candidate")} />
          </div>

          {/* Process tab */}
          {activeTab === "process" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: "'Crimson Pro', serif" }}>
                How the Election Works
              </h2>
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  {[
                    { n: "01", title: "Electoral Committee Constitution", text: "The NANS JCC constitutes an independent Electoral Committee (EC) at least 60 days before the election date. The EC is composed of a Returning Officer, Deputy Returning Officer, and 12 electoral commissioners representing each zone." },
                    { n: "02", title: "Voter Registration & Accreditation", text: "All eligible voters (student union presidents and delegates) must be registered and accredited by the EC. Voter cards are issued 30 days before the election. Unregistered delegates cannot participate." },
                    { n: "03", title: "Nomination & Screening", text: "Candidates submit nomination forms with required documents within the designated nomination window. The EC screens all candidates for eligibility, clearing only qualified aspirants to proceed to campaigns." },
                    { n: "04", title: "Campaigns", text: "Cleared candidates are permitted to campaign for a period of 21 days. Campaigning must be peaceful and within the limits prescribed by the electoral guidelines. Vote-buying and character assassination are strictly prohibited." },
                    { n: "05", title: "Election Day Voting", text: "Accredited delegates cast their votes by secret ballot at designated polling centres. Each voter casts one vote for the Presidential candidate and one for the Senate candidate of their choice." },
                    { n: "06", title: "Counting & Declaration", text: "Votes are counted openly in the presence of candidates' agents and ICPC observers. The Returning Officer declares results after verification. Results are publicly announced and published on the NANS official portal." },
                  ].map((r) => (
                    <RuleItem key={r.n} number={r.n} title={r.title} text={r.text} />
                  ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-5">
                  <div className="rounded-2xl p-6 border" style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}>
                    <h4 className="font-bold text-lg text-gray-900 mb-4" style={{ fontFamily: "'Crimson Pro', serif" }}>
                      Positions Up for Election
                    </h4>
                    {[
                      { pos: "National President", desc: "Chief executive officer of NANS. Leads all national programmes, represents NANS before the Federal Government, and chairs the NEC.", tenure: "1 Year (Renewable once)" },
                      { pos: "Senate President", desc: "Presides over the NANS Senate, the legislative arm. Responsible for ratifying policies, constitutional amendments, and oversight of the executive.", tenure: "1 Year (Renewable once)" },
                    ].map((p) => (
                      <div key={p.pos} className="rounded-xl p-4 mb-3 border bg-white" style={{ borderColor: "#e0ede0" }}>
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-bold text-gray-900" style={{ color: "#008751" }}>{p.pos}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: "#C8A000" }}>{p.tenure}</span>
                        </div>
                        <p className="text-gray-600 text-xs leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl p-6 border" style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}>
                    <h4 className="font-bold text-lg text-gray-900 mb-4" style={{ fontFamily: "'Crimson Pro', serif" }}>
                      Electoral Committee
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Prof. Akin Fadeyi, Returning Officer",
                        "Dr. Ngozi Aniagoh, Deputy Returning Officer",
                        "Barr. Ahmed Sani, Legal Adviser",
                        "Comr. Bola James, Electoral Commissioner",
                        "Comr. Emeka Eze, Electoral Commissioner",
                        "Comr. Fatima Yusuf, Electoral Commissioner",
                      ].map((m) => (
                        <li key={m} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#008751" }} />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Download forms card in sidebar */}
                  <div
                    className="rounded-2xl p-5 border cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5"
                    style={{ borderColor: "#C8A000", backgroundColor: "#fdfdf0" }}
                    onClick={() => setFormsModalOpen(true)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {/* <span className="text-2xl"><Fa /></span> */}
                      <h4 className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Crimson Pro', serif" }}>
                        Nomination & Convention Forms
                      </h4>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3">
                      Download official forms for candidates, delegates, observers, and institutions participating in the 2026 Convention.
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-bold transition-all"
                      style={{ color: "#C8A000" }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v7M3.5 5.5L6 8l2.5-2.5M1 10h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Pick a form to download →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Voter eligibility tab */}
          {activeTab === "voter" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Crimson Pro', serif" }}>
                Voter Eligibility
              </h2>
              <p className="text-gray-500 mb-8 max-w-2xl">
                Only duly registered and accredited delegates are permitted to vote in NANS elections.
              </p>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-green-700 text-sm uppercase tracking-wider mb-4">✅ Requirements to Vote</h3>
                  <div className="space-y-3">
                    {[
                      { icon: "🎓", text: "Must be a currently enrolled student of a NANS-affiliated Nigerian tertiary institution." },
                      { icon: "🪪", text: "Must hold a duly recognised student union office (SUG President, PRO, delegate) at their institution." },
                      { icon: "📋", text: "Must have completed the EC voter registration process and obtained a valid voter card." },
                      { icon: "🏛️", text: "Must be in good standing and not under academic or disciplinary suspension at the time of voting." },
                      { icon: "📅", text: "Must present accreditation at the designated polling centre before 10:00 AM on election day." },
                      { icon: "🏫", text: "The institution must be up-to-date with NANS membership dues at the time of the election." },
                    ].map((item) => (
                      <CriteriaItem key={item.text} icon={item.icon} text={item.text} type="required" />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-red-600 text-sm uppercase tracking-wider mb-4">🚫 Disqualifications</h3>
                  <div className="space-y-3">
                    {[
                      { icon: "❌", text: "Graduates or students who have completed their academic programmes prior to election date." },
                      { icon: "❌", text: "Students from institutions not affiliated with or suspended by NANS." },
                      { icon: "❌", text: "Any person found to have submitted false information during registration." },
                      { icon: "❌", text: "Students currently serving academic or disciplinary suspension from their institution." },
                      { icon: "❌", text: "Any delegate who has been found guilty of electoral malpractice in a previous NANS election." },
                    ].map((item) => (
                      <CriteriaItem key={item.text} icon={item.icon} text={item.text} type="prohibited" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Candidate eligibility tab */}
          {activeTab === "candidate" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Crimson Pro', serif" }}>
                Candidate Eligibility
              </h2>
              <p className="text-gray-500 mb-8 max-w-2xl">
                Any aspirant seeking to contest must satisfy all of the following conditions as at the time of filing nomination.
              </p>
              <div className="grid lg:grid-cols-2 gap-8 mb-10">
                <div>
                  <h3 className="font-bold text-green-700 text-sm uppercase tracking-wider mb-4">✅ Mandatory Requirements</h3>
                  <div className="space-y-3">
                    {[
                      { icon: "🎓", text: "Must be a bonafide, currently enrolled student in any Nigerian accredited tertiary institution with at least one year left to graduation." },
                      { icon: "🪪", text: "Must be or have been a recognised student union executive officer at institutional, zonal, or national level." },
                      { icon: "📋", text: "Must present a completed and signed nomination form, endorsed by the Student Union of their home institution." },
                      { icon: "💰", text: "Must pay the non-refundable nomination fee as stipulated by the Electoral Committee for the relevant office." },
                      { icon: "📜", text: "Must present a detailed Manifesto (minimum 2,000 words) and submit to the EC at least 30 days before the election." },
                      { icon: "🧾", text: "Must present proof of NYSC discharge or exemption certificate (if applicable)." },
                      { icon: "🔍", text: "Must have a clean integrity record and no criminal conviction, no prior electoral fraud finding." },
                    ].map((item) => (
                      <CriteriaItem key={item.text} icon={item.icon} text={item.text} type="required" />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-red-600 text-sm uppercase tracking-wider mb-4">🚫 Disqualification Grounds</h3>
                  <div className="space-y-3 mb-8">
                    {[
                      { icon: "❌", text: "Non-student or graduated student at the time of nomination." },
                      { icon: "❌", text: "Member from a suspended or non-affiliated institution." },
                      { icon: "❌", text: "Found guilty of corruption, examination malpractice, or criminal offence." },
                      { icon: "❌", text: "Previously removed from student union office for misconduct." },
                      { icon: "❌", text: "Failure to attend mandatory candidates' screening as scheduled by the EC." },
                    ].map((item) => (
                      <CriteriaItem key={item.text} icon={item.icon} text={item.text} type="prohibited" />
                    ))}
                  </div>

                  {/* Nomination fees */}
                  <div className="rounded-xl p-5 border" style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}>
                    <h4 className="font-bold text-gray-900 mb-3" style={{ fontFamily: "'Crimson Pro', serif" }}>
                      Nomination Fees
                    </h4>
                    <div className="space-y-2">
                      {[
                        { pos: "National President", fee: "₦--,---" },
                        { pos: "Senate President", fee: "₦--,---" },
                      ].map((f) => (
                        <div key={f.pos} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">{f.pos}</span>
                          <span className="font-bold" style={{ color: "#008751" }}>{f.fee}</span>
                        </div>
                      ))}
                      <p className="text-xs text-gray-500 mt-2">
                        * Fees are non-refundable and payable to the NANS Electoral Committee account.
                      </p>
                    </div>
                    <button
                      onClick={() => setFormsModalOpen(true)}
                      className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white rounded-lg transition-all hover:opacity-90"
                      style={{ backgroundColor: "#C8A000", color: "#1a1500" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Download Nomination Form
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6 border-l-4" style={{ borderLeftColor: "#C8A000", backgroundColor: "#fdfdf0" }}>
                <h4 className="font-bold text-gray-800 mb-2">⚠️ Code of Conduct for Candidates</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  All candidates are bound by the NANS Electoral Code of Conduct. Violations — including vote-buying, character defamation, proxy voting, disruption of campaigns, or inducement of electoral officials — are punishable by immediate disqualification and a 5-year ban from contesting NANS elective positions.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white border-t" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-xl text-gray-900" style={{ fontFamily: "'Crimson Pro', serif" }}>
              Ready to see who's running?
            </h3>
            <p className="text-gray-500 text-sm">View all declared candidates and their manifestos.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setFormsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all hover:opacity-90 flex-shrink-0"
              style={{ backgroundColor: "#C8A000", color: "#1a1500" }}
            >
              <FaFile /> Download Forms
            </button>
            <Link
              href="/candidates"
              className="inline-flex items-center gap-2 px-7 py-2.5 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90 hover:scale-105 flex-shrink-0"
              style={{ backgroundColor: "#008751" }}
            >
              View Candidates →
            </Link>
          </div>
        </div>
      </section>

      {/* Forms Modal */}
      {formsModalOpen && <FormsModal onClose={() => setFormsModalOpen(false)} />}
    </Wrapper>
  );
};

export default ElectionOverview;