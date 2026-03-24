"use client"

import React, { useState } from "react";
import Wrapper from "../components/wrapper";
import Link from "next/link";

type PhaseStatus = "completed" | "ongoing" | "upcoming";

interface ScheduleEvent {
  id: number;
  date: string;
  endDate?: string;
  title: string;
  description: string;
  phase: string;
  status: PhaseStatus;
  important?: boolean;
  time?: string;
}

const events: ScheduleEvent[] = [
  // PRE-CONVENTION ACTIVITIES
  {
    id: 1,
    date: "8 March 2026",
    endDate: "30 March 2026",
    title: "Opening of Convention Process",
    description: "The Independent Convention Planning Committee (ICPC), inaugurated by NANS National President Comr. Olushola Oladoja on 8th March 2026, formally opens the 2026 NANS National Convention process. All activities related to the convention commence during this window.",
    phase: "Pre-Convention",
    status: "ongoing",
    important: true,
  },
  {
    id: 2,
    date: "1 April 2026",
    endDate: "7 April 2026",
    title: "Pick-Up of Nomination / Accreditation Forms",
    description: "All aspirants seeking elective positions and delegates from affiliated institutions may collect their nomination and accreditation forms within this window. Forms are completely FREE OF CHARGE — no aspirant is expected to pay any amount to obtain them. SUGs should liaise with their respective JCC Chairmen for form collection.",
    phase: "Pre-Convention",
    status: "upcoming",
    important: true,
  },
  {
    id: 3,
    date: "8 April 2026",
    endDate: "10 April 2026",
    title: "Submission of Completed Forms",
    description: "Completed nomination and accreditation forms must be submitted to the ICPC within this window. All required supporting documents must accompany the forms. Late submission will not be entertained under any circumstances, and any violation of this timeline will result in automatic disqualification. Forms must be signed, stamped, and endorsed by the Student Affairs Division of each institution and submitted through the Assistant Secretary General of NANS, who serves as the Chief Accreditation Officer.",
    phase: "Pre-Convention",
    status: "upcoming",
    important: true,
  },
  {
    id: 4,
    date: "12 April 2026",
    endDate: "19 April 2026",
    title: "Physical Screening of Aspirants",
    description: "The ICPC Screening and Verification Sub-Committee conducts the physical screening of all submitted nominations. Aspirants will be invited for in-person document verification and assessment. The ICPC's disciplinary measures apply fully during this process.",
    phase: "Pre-Convention",
    status: "upcoming",
  },
  {
    id: 5,
    date: "20 April 2026",
    endDate: "27 April 2026",
    title: "Verification of Studentship",
    description: "The Screening and Verification Sub-Committee conducts verification of studentship for all screened aspirants. This process confirms the bona fide student status of each aspirant at their respective tertiary institutions in accordance with NANS constitutional requirements.",
    phase: "Pre-Convention",
    status: "upcoming",
  },
  {
    id: 6,
    date: "29 April 2026",
    title: "Release of Screening Results",
    description: "The ICPC releases the official results of the physical screening exercise. The list of aspirants who have been cleared and those who have not met the eligibility requirements will be formally published. Results will be communicated to all aspirants and published on official NANS channels.",
    phase: "Pre-Convention",
    status: "upcoming",
    important: true,
  },
  {
    id: 7,
    date: "1 May 2026",
    endDate: "7 May 2026",
    title: "Appeal Window",
    description: "Aspirants who are dissatisfied with the screening outcome may file a formal written appeal to the Screening Appeal Sub-Committee within this window. Appeals must clearly state grounds for dispute and be accompanied by all relevant supporting evidence. The Screening Appeal Sub-Committee will review all submissions fairly and impartially.",
    phase: "Pre-Convention",
    status: "upcoming",
  },
  {
    id: 8,
    date: "9 May 2026",
    title: "Final Release of Appeal Results",
    description: "The ICPC Screening Appeal Sub-Committee releases the final, binding results of all appeal hearings. Decisions at this stage are conclusive. The final list of all aspirants cleared to proceed to the convention is formally published.",
    phase: "Pre-Convention",
    status: "upcoming",
    important: true,
  },

  // CONVENTION PROPER
  {
    id: 9,
    date: "20 May 2026",
    title: "Arrival of Delegates",
    description: "Accredited delegates from all six geopolitical zones and affiliated institutions across Nigeria arrive at the convention venue — the Old Parade Ground, Abuja. Delegates are expected to check in with the ICPC Accreditation Sub-Committee upon arrival.",
    phase: "Convention",
    status: "upcoming",
  },
  {
    id: 10,
    date: "21 May 2026",
    title: "Peace Accord Signing with DSS",
    description: "A formal Peace Accord is signed between NANS candidates, delegates, and the Department of State Services (DSS) to ensure a peaceful, safe, and orderly convention. All parties commit to non-violence, fair play, and respect for the electoral process.",
    phase: "Convention",
    status: "upcoming",
    important: true,
    time: "9:00 AM – 2:00 PM",
  },
  {
    id: 11,
    date: "21 May 2026",
    title: "Presidential Debate",
    description: "All cleared Presidential candidates participate in a live Presidential Debate before assembled delegates and observers. Candidates present their manifestos, answer questions, and make their case for leadership of the National Association of Nigerian Students.",
    phase: "Convention",
    status: "upcoming",
    important: true,
    time: "5:00 PM",
  },
  {
    id: 12,
    date: "22 May 2026",
    title: "Registration of Delegates & Publication of Final Accredited Delegates List",
    description: "Delegates formally register with the ICPC. The final official list of all accredited delegates eligible to vote in the 2026 NANS National Convention is published. The convention officially opens on this date.",
    phase: "Convention",
    status: "upcoming",
    important: true,
  },
  {
    id: 13,
    date: "23 May 2026",
    title: "Accreditation of Delegates",
    description: "Registered delegates undergo formal biometric and document-based accreditation by the ICPC Accreditation Sub-Committee. Delegate voter cards and valid institutional IDs must be presented. Only accredited delegates may participate in the election proper.",
    phase: "Convention",
    status: "upcoming",
  },
  {
    id: 14,
    date: "24 May 2026",
    title: "ELECTION PROPER",
    description: "Accredited delegates cast their votes by secret ballot for all elective positions at the 2026 NANS National Convention. Voting is conducted at the Old Parade Ground, Abuja, in the presence of candidates' agents, accredited observers, and ICPC monitors. Votes are counted and collated openly immediately after polls close. The Returning Officer declares the official results.",
    phase: "Convention",
    status: "upcoming",
    important: true,
  },
  {
    id: 15,
    date: "25 May 2026",
    title: "Departure of Delegates",
    description: "Delegates from all geopolitical zones and institutions formally depart following the conclusion of the 2026 NANS National Convention. The ICPC Transport and Logistics Sub-Committee coordinates the orderly departure of all delegates.",
    phase: "Convention",
    status: "upcoming",
  },
];

const phases = ["All", "Pre-Convention", "Convention"];

const statusConfig: Record<PhaseStatus, { dot: string; badge: string; badgeText: string; label: string }> = {
  completed: { dot: "#9ca3af", badge: "#f3f4f6", badgeText: "#6b7280", label: "Completed" },
  ongoing: { dot: "#C8A000", badge: "#fef9e7", badgeText: "#C8A000", label: "Ongoing" },
  upcoming: { dot: "#008751", badge: "#e8f5ee", badgeText: "#008751", label: "Upcoming" },
};

const ElectionSchedule: React.FC = () => {
  const [activePhase, setActivePhase] = useState("All");
  const [showImportantOnly, setShowImportantOnly] = useState(false);

  const filtered = events.filter((e) => {
    const phaseMatch = activePhase === "All" || e.phase === activePhase;
    const importantMatch = !showImportantOnly || e.important;
    return phaseMatch && importantMatch;
  });

  const ongoingCount = events.filter((e) => e.status === "ongoing").length;
  const upcomingCount = events.filter((e) => e.status === "upcoming").length;
  const completedCount = events.filter((e) => e.status === "completed").length;

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
          <p className="text-green-200 text-sm font-medium mb-2">2026 NANS Convention</p>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            Convention Schedule
          </h1>
          <p className="text-green-100 text-lg max-w-xl leading-relaxed">
            The official ICPC timetable for the 2026 NANS National Convention — from the opening of the convention process through to election day on 24th May 2026, at the Old Parade Ground, Abuja.
          </p>
          <div className="flex gap-2 mt-6 text-sm text-green-200">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Convention Schedule</span>
          </div>
        </div>
      </section>

      {/* Convention venue banner */}
      <section className="py-5" style={{ backgroundColor: "#005c37" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-6 text-white text-sm">
          <div className="flex items-center gap-2">
            <span style={{ color: "#C8A000" }}>📍</span>
            <span><strong>Venue:</strong> Old Parade Ground, Abuja</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: "#C8A000" }}>📅</span>
            <span><strong>Convention Dates:</strong> 22nd – 25th May 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: "#C8A000" }}>🗳️</span>
            <span><strong>Election Day:</strong> 24th May 2026</span>
          </div>
        </div>
      </section>

      {/* Status overview */}
      <section className="py-8 bg-white border-b" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 max-w-lg">
            {[
              { label: "Completed", count: completedCount, color: "#9ca3af", bg: "#f9fafb" },
              { label: "Ongoing", count: ongoingCount, color: "#C8A000", bg: "#fef9e7" },
              { label: "Upcoming", count: upcomingCount, color: "#008751", bg: "#f0fdf4" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center rounded-xl py-4 border"
                style={{ borderColor: s.color + "40", backgroundColor: s.bg }}
              >
                <p
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Crimson Pro', serif", color: s.color }}
                >
                  {s.count}
                </p>
                <p className="text-xs text-gray-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-6 bg-white border-b" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {phases.map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePhase(p)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                    activePhase === p ? "text-white border-transparent" : "text-gray-600 border-gray-200 hover:border-green-300"
                  }`}
                  style={activePhase === p ? { backgroundColor: "#008751", borderColor: "#008751" } : {}}
                >
                  {p}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className="relative w-9 h-5 rounded-full transition-colors"
                style={{ backgroundColor: showImportantOnly ? "#008751" : "#d1d5db" }}
                onClick={() => setShowImportantOnly((v) => !v)}
              >
                <div
                  className="absolute w-4 h-4 bg-white rounded-full top-0.5 transition-all shadow"
                  style={{ left: showImportantOnly ? "calc(100% - 18px)" : "2px" }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600">Key Dates Only</span>
            </label>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16" style={{ backgroundColor: "#f8fdf9" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section label */}
          {(activePhase === "All" || activePhase === "Pre-Convention") && (
            <div className="flex items-center gap-3 mb-6">
              <div className="px-4 py-1.5 rounded-full text-white text-xs font-bold" style={{ backgroundColor: "#005c37" }}>
                SECTION A — PRE-CONVENTION ACTIVITIES
              </div>
              <div className="flex-1 h-px" style={{ backgroundColor: "#d4eadb" }} />
            </div>
          )}

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: "#d4eadb" }} />

            <div className="space-y-5">
              {filtered.map((event, idx) => {
                const s = statusConfig[event.status];
                const isConventionStart = event.id === 9 && (activePhase === "All");
                return (
                  <React.Fragment key={event.id}>
                    {isConventionStart && (
                      <div className="flex items-center gap-3 my-8 ml-16">
                        <div className="px-4 py-1.5 rounded-full text-white text-xs font-bold" style={{ backgroundColor: "#C8A000" }}>
                          SECTION B — CONVENTION PROPER
                        </div>
                        <div className="flex-1 h-px" style={{ backgroundColor: "#d4eadb" }} />
                      </div>
                    )}
                    <div className="flex gap-5 items-start">
                      {/* Timeline dot */}
                      <div className="relative flex-shrink-0 z-10">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-white shadow"
                          style={{
                            backgroundColor:
                              event.status === "ongoing"
                                ? "#C8A000"
                                : event.status === "completed"
                                ? "#d1d5db"
                                : event.id === 14
                                ? "#C8A000"
                                : "#008751",
                          }}
                        >
                          {event.status === "completed" ? (
                            <span className="text-white text-base">✓</span>
                          ) : event.status === "ongoing" ? (
                            <span className="text-white text-base animate-pulse">●</span>
                          ) : event.id === 14 ? (
                            <span className="text-white text-base">🗳</span>
                          ) : (
                            <span className="text-white text-sm font-bold">{event.id}</span>
                          )}
                        </div>
                      </div>

                      {/* Card */}
                      <div
                        className={`flex-1 rounded-2xl border overflow-hidden mb-1 transition-all ${
                          event.important ? "shadow-md" : "shadow-sm"
                        }`}
                        style={{
                          borderColor: event.important ? s.dot + "80" : "#e0ede0",
                          backgroundColor: "white",
                        }}
                      >
                        {event.important && (
                          <div className="h-1" style={{ backgroundColor: s.dot }} />
                        )}
                        <div className="p-5">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className="text-xs font-bold px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: s.badge, color: s.badgeText }}
                              >
                                {s.label}
                              </span>
                              <span
                                className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                                style={{ backgroundColor: event.phase === "Convention" ? "#C8A000" : "#008751", color: event.phase === "Convention" ? "#1a1500" : "white" }}
                              >
                                {event.phase}
                              </span>
                              {event.important && (
                                <span
                                  className="text-xs px-2 py-0.5 rounded-full font-bold"
                                  style={{ backgroundColor: "#fef9e7", color: "#C8A000" }}
                                >
                                  ★ Key Date
                                </span>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-gray-800">{event.date}</p>
                              {event.endDate && (
                                <p className="text-xs text-gray-400">to {event.endDate}</p>
                              )}
                              {event.time && (
                                <p className="text-xs font-semibold mt-0.5" style={{ color: "#C8A000" }}>{event.time}</p>
                              )}
                            </div>
                          </div>
                          <h3
                            className="font-bold text-gray-900 mb-2"
                            style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem" }}
                          >
                            {event.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">No events match your current filters.</p>
                <button
                  onClick={() => { setActivePhase("All"); setShowImportantOnly(false); }}
                  className="mt-3 text-sm font-semibold underline"
                  style={{ color: "#008751" }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Required documents section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#008751" }}>
              Form Submission Requirements
            </span>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Crimson Pro', serif" }}>
              Required Documents for Submission
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl">
              All aspirants must submit the following documents alongside their completed forms between 8th – 10th April 2026.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { num: "01", doc: "Original Aspirant Intent Form with Passport Photographs" },
              { num: "02", doc: "Attestation of Studentship from the Dean of Students Affairs and Head of Department" },
              { num: "03", doc: "Admission Letter" },
              { num: "04", doc: "Last School Fees Receipt" },
              { num: "05", doc: "Last Semester / Session Result" },
              { num: "06", doc: "Police Clearance Certificate" },
              { num: "07", doc: "Sworn Affidavit from the Federal High Court" },
            ].map((item) => (
              <div
                key={item.num}
                className="flex items-start gap-4 p-4 rounded-xl border bg-white hover:shadow-sm transition-all"
                style={{ borderColor: "#d4eadb" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: "#008751" }}
                >
                  {item.num}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-1">{item.doc}</p>
              </div>
            ))}
          </div>
          <div
            className="mt-6 rounded-xl p-5 border-l-4"
            style={{ borderLeftColor: "#C8A000", backgroundColor: "#fdfdf0" }}
          >
            <p className="font-bold text-gray-800 text-sm mb-1">⚠️ Important Notices</p>
            <ul className="text-gray-600 text-sm space-y-1 leading-relaxed">
              <li>• Forms must be signed, stamped, and endorsed by the Student Affairs Division of each institution.</li>
              <li>• Submit through the Assistant Secretary General of NANS, who serves as the Chief Accreditation Officer.</li>
              <li>• Aspirant Intent Forms are <strong>completely free of charge</strong> — no aspirant is expected to pay any amount to obtain them.</li>
              <li>• <strong>Late submission will not be entertained under any circumstances</strong> — violation of the timeline results in automatic disqualification.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Download notice */}
      <section className="py-10 bg-white border-t" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-xl text-gray-900" style={{ fontFamily: "'Crimson Pro', serif" }}>
              Download the Full Convention Timetable
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Official PDF version of the 2026 NANS ICPC Convention Timetable — issued 11th March 2026.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: "#008751" }}
            >
              ↓ Download PDF
            </a>
            <Link
              href="/election-overview"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg border transition-all hover:bg-gray-50"
              style={{ borderColor: "#008751", color: "#008751" }}
            >
              Election Rules →
            </Link>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default ElectionSchedule;