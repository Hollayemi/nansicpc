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
}

const events: ScheduleEvent[] = [
  {
    id: 1,
    date: "April 1, 2026",
    title: "Electoral Committee Inauguration",
    description: "NANS JCC formally constitutes and inaugurates the Independent Electoral Committee (EC). The Returning Officer and all electoral commissioners take their oath of office.",
    phase: "Preparation",
    status: "completed",
  },
  {
    id: 2,
    date: "April 10, 2026",
    title: "Publication of Electoral Guidelines",
    description: "The EC publishes the official 2026 NANS Electoral Guidelines, including rules for campaigns, voter registration, candidate eligibility, and results declaration. All aspirants and voters are expected to read and comply.",
    phase: "Preparation",
    status: "completed",
  },
  {
    id: 3,
    date: "April 15, 2026",
    endDate: "May 15, 2026",
    title: "Voter Registration (Online & Physical)",
    description: "All accredited student union delegates from affiliated institutions are required to register as voters. Registration is available online via the NANS portal and at designated registration points in all six zones.",
    phase: "Voter Registration",
    status: "completed",
  },
  {
    id: 4,
    date: "May 20, 2026",
    title: "Publication of Provisional Voter Register",
    description: "The EC publishes the provisional voter register. Registered delegates can verify their details and report any discrepancies within 5 working days.",
    phase: "Voter Registration",
    status: "completed",
  },
  {
    id: 5,
    date: "May 26, 2026",
    title: "Final Voter Register Published",
    description: "After review of all objections and corrections, the EC publishes the final, certified voter register. No new registrations or amendments are accepted after this date.",
    phase: "Voter Registration",
    status: "completed",
  },
  {
    id: 6,
    date: "June 1, 2026",
    endDate: "June 14, 2026",
    title: "Nomination Form Collection & Submission",
    description: "Interested aspirants collect and submit nomination forms to the EC Secretariat. All required supporting documents must be submitted alongside the nomination form within this window.",
    phase: "Nomination",
    status: "completed",
    important: true,
  },
  {
    id: 7,
    date: "June 16, 2026",
    endDate: "June 20, 2026",
    title: "Candidate Screening & Eligibility Verification",
    description: "The EC conducts thorough screening of all submitted nominations. Candidates will be invited for oral interviews and document verification. Results of screening will be communicated within 48 hours.",
    phase: "Nomination",
    status: "completed",
  },
  {
    id: 8,
    date: "June 22, 2026",
    title: "Publication of Cleared Candidates List",
    description: "The EC publishes the official list of candidates cleared to contest. Any aspirant not satisfied with the outcome may file a formal written objection to the EC within 48 hours.",
    phase: "Nomination",
    status: "completed",
  },
  {
    id: 9,
    date: "June 25, 2026",
    endDate: "July 5, 2026",
    title: "Official Campaign Period",
    description: "Cleared candidates may campaign across campuses, NANS zonal platforms, and social media. All campaigns must be peaceful and respectful. Vote-buying and character defamation are strictly prohibited under the electoral code.",
    phase: "Campaigns",
    status: "ongoing",
    important: true,
  },
  {
    id: 10,
    date: "July 7, 2026",
    title: "Mandatory Candidates' Town Hall (Live & Streamed)",
    description: "All presidential and senate candidates will participate in a live, nationally streamed Town Hall moderated by the EC. The event is open to all registered student delegates and broadcast on NANS official channels.",
    phase: "Campaigns",
    status: "upcoming",
    important: true,
  },
  {
    id: 11,
    date: "July 10, 2026",
    title: "Campaign Silence Begins",
    description: "All campaigns — physical and digital — must cease by 11:59 PM on July 10. Violation of campaign silence is a punishable offence under the electoral code and may result in disqualification.",
    phase: "Pre-Election",
    status: "upcoming",
  },
  {
    id: 12,
    date: "July 12, 2026",
    title: "Delegate Accreditation",
    description: "Registered voters present at their designated polling centres for biometric accreditation. Voter cards and valid institutional identity must be presented. Accreditation runs 9:00 AM – 4:00 PM.",
    phase: "Pre-Election",
    status: "upcoming",
  },
  {
    id: 13,
    date: "July 14, 2026",
    title: "EC Final Press Briefing",
    description: "The Returning Officer holds a final press briefing to confirm electoral arrangements, logistics, and security measures. International and domestic observers are formally credentialed.",
    phase: "Pre-Election",
    status: "upcoming",
  },
  {
    id: 14,
    date: "July 15, 2026",
    title: "ELECTION DAY",
    description: "Accredited delegates cast their votes via secret ballot at designated polling centres in each of the six geopolitical zones. Voting opens at 8:00 AM and closes at 4:00 PM WAT. No extension will be granted except by court order.",
    phase: "Election",
    status: "upcoming",
    important: true,
  },
  {
    id: 15,
    date: "July 15, 2026",
    title: "Vote Counting & Collation",
    description: "Votes are counted immediately after polls close at each polling centre in the presence of candidates' agents, accredited observers, and ICPC monitors. Results are collated at the national level by the Returning Officer.",
    phase: "Election",
    status: "upcoming",
  },
  {
    id: 16,
    date: "July 16, 2026",
    title: "Declaration of Results",
    description: "The Returning Officer formally declares the results of the NANS Presidential and Senate Presidential elections. Results are published simultaneously on the NANS official portal and notified to all NANS affiliates.",
    phase: "Post-Election",
    status: "upcoming",
    important: true,
  },
  {
    id: 17,
    date: "July 17, 2026",
    endDate: "July 19, 2026",
    title: "Petition Window",
    description: "Any candidate or registered voter who disputes the results may file a formal petition with the EC. Petitions must be in writing, clearly stating grounds for dispute, and accompanied by relevant evidence.",
    phase: "Post-Election",
    status: "upcoming",
  },
  {
    id: 18,
    date: "August 1, 2026",
    title: "Inauguration of New NANS Leadership",
    description: "The newly elected NANS National President and Senate President are formally inaugurated at a public ceremony witnessed by NANS affiliates, government representatives, and media. Outgoing executives hand over to incoming leadership.",
    phase: "Inauguration",
    status: "upcoming",
    important: true,
  },
];

const phases = ["All", "Preparation", "Voter Registration", "Nomination", "Campaigns", "Pre-Election", "Election", "Post-Election", "Inauguration"];

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
          <p className="text-green-200 text-sm font-medium mb-2">2026 NANS Elections</p>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            Election Schedule
          </h1>
          <p className="text-green-100 text-lg max-w-xl leading-relaxed">
            The official electoral calendar for the 2026 NANS General Election — from committee inauguration to the inauguration of new leadership.
          </p>
          <div className="flex gap-2 mt-6 text-sm text-green-200">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Election Schedule</span>
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
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5"
              style={{ backgroundColor: "#d4eadb" }}
            />

            <div className="space-y-5">
              {filtered.map((event) => {
                const s = statusConfig[event.status];
                return (
                  <div key={event.id} className="flex gap-5 items-start">
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
                              : "#008751",
                        }}
                      >
                        {event.status === "completed" ? (
                          <span className="text-white text-base">✓</span>
                        ) : event.status === "ongoing" ? (
                          <span className="text-white text-base animate-pulse">●</span>
                        ) : (
                          <span className="text-white text-base">○</span>
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
                        <div
                          className="h-1"
                          style={{ backgroundColor: s.dot }}
                        />
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
                              style={{ backgroundColor: "#008751" }}
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

      {/* Download notice */}
      <section className="py-10 bg-white border-t" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="font-bold text-xl text-gray-900"
              style={{ fontFamily: "'Crimson Pro', serif" }}
            >
              Download the Full Electoral Calendar
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Official PDF version of the 2026 NANS Electoral Calendar — issued by the Electoral Committee.
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