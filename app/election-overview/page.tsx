"use client"
import React, { useState } from "react";
import Wrapper from "../components/wrapper";
import Link from "next/link";

const Tab: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
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

const RuleItem: React.FC<{ number: string; title: string; text: string }> = ({
  number,
  title,
  text,
}) => (
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

const CriteriaItem: React.FC<{ icon: string; text: string; type: "required" | "prohibited" }> = ({
  icon,
  text,
  type,
}) => (
  <div
    className="flex items-start gap-3 p-3 rounded-lg"
    style={{
      backgroundColor: type === "required" ? "#f0fdf4" : "#fff5f5",
    }}
  >
    <span className="text-base flex-shrink-0">{icon}</span>
    <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
  </div>
);

const ElectionOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"voter" | "candidate" | "process">("process");

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
            Election Overview
          </h1>
          <p className="text-green-100 text-lg max-w-xl leading-relaxed">
            Everything you need to know and voting process, eligibility rules, conduct guidelines, and the constitutional framework governing the 2026 NANS Presidential Election.
          </p>
          <div className="flex gap-2 mt-6 text-sm text-green-200">
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
                <p
                  className="font-bold text-gray-800 text-sm"
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                >
                  {item.value}
                </p>
              </div>
            ))}
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
              <h2
                className="text-3xl font-bold text-gray-900 mb-8"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                How the Election Works
              </h2>
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  {[
                    {
                      n: "01",
                      title: "Electoral Committee Constitution",
                      text: "The NANS JCC constitutes an independent Electoral Committee (EC) at least 60 days before the election date. The EC is composed of a Returning Officer, Deputy Returning Officer, and 12 electoral commissioners representing each zone.",
                    },
                    {
                      n: "02",
                      title: "Voter Registration & Accreditation",
                      text: "All eligible voters (student union presidents and delegates) must be registered and accredited by the EC. Voter cards are issued 30 days before the election. Unregistered delegates cannot participate.",
                    },
                    {
                      n: "03",
                      title: "Nomination & Screening",
                      text: "Candidates submit nomination forms with required documents within the designated nomination window. The EC screens all candidates for eligibility, clearing only qualified aspirants to proceed to campaigns.",
                    },
                    {
                      n: "04",
                      title: "Campaigns",
                      text: "Cleared candidates are permitted to campaign for a period of 21 days. Campaigning must be peaceful and within the limits prescribed by the electoral guidelines. Vote-buying and character assassination are strictly prohibited.",
                    },
                    {
                      n: "05",
                      title: "Election Day Voting",
                      text: "Accredited delegates cast their votes by secret ballot at designated polling centres. Each voter casts one vote for the Presidential candidate and one for the Senate candidate of their choice.",
                    },
                    {
                      n: "06",
                      title: "Counting & Declaration",
                      text: "Votes are counted openly in the presence of candidates' agents and ICPC observers. The Returning Officer declares results after verification. Results are publicly announced and published on the NANS official portal.",
                    },
                  ].map((r) => (
                    <RuleItem key={r.n} number={r.n} title={r.title} text={r.text} />
                  ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-5">
                  <div
                    className="rounded-2xl p-6 border"
                    style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}
                  >
                    <h4
                      className="font-bold text-lg text-gray-900 mb-4"
                      style={{ fontFamily: "'Crimson Pro', serif" }}
                    >
                      Positions Up for Election
                    </h4>
                    {[
                      {
                        pos: "National President",
                        desc: "Chief executive officer of NANS. Leads all national programmes, represents NANS before the Federal Government, and chairs the NEC.",
                        tenure: "1 Year (Renewable once)",
                      },
                      {
                        pos: "Senate President",
                        desc: "Presides over the NANS Senate, the legislative arm. Responsible for ratifying policies, constitutional amendments, and oversight of the executive.",
                        tenure: "1 Year (Renewable once)",
                      },
                    ].map((p) => (
                      <div
                        key={p.pos}
                        className="rounded-xl p-4 mb-3 border bg-white"
                        style={{ borderColor: "#e0ede0" }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <p
                            className="font-bold text-gray-900"
                            style={{ color: "#008751" }}
                          >
                            {p.pos}
                          </p>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: "#C8A000" }}
                          >
                            {p.tenure}
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div
                    className="rounded-2xl p-6 border"
                    style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}
                  >
                    <h4
                      className="font-bold text-lg text-gray-900 mb-4"
                      style={{ fontFamily: "'Crimson Pro', serif" }}
                    >
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
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: "#008751" }}
                          />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Voter eligibility tab */}
          {activeTab === "voter" && (
            <div>
              <h2
                className="text-3xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                Voter Eligibility
              </h2>
              <p className="text-gray-500 mb-8 max-w-2xl">
                Only duly registered and accredited delegates are permitted to vote in NANS elections. The following criteria determine who qualifies as an eligible voter.
              </p>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3
                    className="font-bold text-green-700 text-sm uppercase tracking-wider mb-4"
                  >
                    ✅ Requirements to Vote
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: "🎓",
                        text: "Must be a currently enrolled student of a NANS-affiliated Nigerian tertiary institution.",
                      },
                      {
                        icon: "🪪",
                        text: "Must hold a duly recognised student union office (SUG President, PRO, delegate) at their institution.",
                      },
                      {
                        icon: "📋",
                        text: "Must have completed the EC voter registration process and obtained a valid voter card.",
                      },
                      {
                        icon: "🏛️",
                        text: "Must be in good standing and not under academic or disciplinary suspension at the time of voting.",
                      },
                      {
                        icon: "📅",
                        text: "Must present accreditation at the designated polling centre before 10:00 AM on election day.",
                      },
                      {
                        icon: "🏫",
                        text: "The institution must be up-to-date with NANS membership dues at the time of the election.",
                      },
                    ].map((item) => (
                      <CriteriaItem key={item.text} icon={item.icon} text={item.text} type="required" />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-red-600 text-sm uppercase tracking-wider mb-4">
                    🚫 Disqualifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: "❌",
                        text: "Graduates or students who have completed their academic programmes prior to election date.",
                      },
                      {
                        icon: "❌",
                        text: "Students from institutions not affiliated with or suspended by NANS.",
                      },
                      {
                        icon: "❌",
                        text: "Any person found to have submitted false information during registration.",
                      },
                      {
                        icon: "❌",
                        text: "Students currently serving academic or disciplinary suspension from their institution.",
                      },
                      {
                        icon: "❌",
                        text: "Any delegate who has been found guilty of electoral malpractice in a previous NANS election.",
                      },
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
              <h2
                className="text-3xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                Candidate Eligibility
              </h2>
              <p className="text-gray-500 mb-8 max-w-2xl">
                Any aspirant seeking to contest for the office of NANS National President or Senate President must satisfy all of the following conditions as at the time of filing nomination.
              </p>
              <div className="grid lg:grid-cols-2 gap-8 mb-10">
                <div>
                  <h3 className="font-bold text-green-700 text-sm uppercase tracking-wider mb-4">
                    ✅ Mandatory Requirements
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: "🎓",
                        text: "Must be a bonafide, currently enrolled student in any Nigerian accredited tertiary institution with at least one year left to graduation.",
                      },
                      {
                        icon: "🪪",
                        text: "Must be or have been a recognised student union executive officer at institutional, zonal, or national level.",
                      },
                      {
                        icon: "📋",
                        text: "Must present a completed and signed nomination form, endorsed by the Student Union of their home institution.",
                      },
                      {
                        icon: "💰",
                        text: "Must pay the non-refundable nomination fee as stipulated by the Electoral Committee for the relevant office.",
                      },
                      {
                        icon: "📜",
                        text: "Must present a detailed Manifesto (minimum 2,000 words) and submit to the EC at least 30 days before the election.",
                      },
                      {
                        icon: "🧾",
                        text: "Must present proof of NYSC discharge or exemption certificate (if applicable).",
                      },
                      {
                        icon: "🔍",
                        text: "Must have a clean integrity record and no criminal conviction, no prior electoral fraud finding.",
                      },
                    ].map((item) => (
                      <CriteriaItem key={item.text} icon={item.icon} text={item.text} type="required" />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-red-600 text-sm uppercase tracking-wider mb-4">
                    🚫 Disqualification Grounds
                  </h3>
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
                  <div
                    className="rounded-xl p-5 border"
                    style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}
                  >
                    <h4
                      className="font-bold text-gray-900 mb-3"
                      style={{ fontFamily: "'Crimson Pro', serif" }}
                    >
                      Nomination Fees
                    </h4>
                    <div className="space-y-2">
                      {[
                        { pos: "National President", fee: "₦150,000" },
                        { pos: "Senate President", fee: "₦100,000" },
                      ].map((f) => (
                        <div
                          key={f.pos}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-gray-700">{f.pos}</span>
                          <span
                            className="font-bold"
                            style={{ color: "#008751" }}
                          >
                            {f.fee}
                          </span>
                        </div>
                      ))}
                      <p className="text-xs text-gray-500 mt-2">
                        * Fees are non-refundable and payable to the NANS Electoral Committee account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl p-6 border-l-4"
                style={{ borderLeftColor: "#C8A000", backgroundColor: "#fdfdf0" }}
              >
                <h4 className="font-bold text-gray-800 mb-2">
                  ⚠️ Code of Conduct for Candidates
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  All candidates are bound by the NANS Electoral Code of Conduct. Violations, including vote-buying, character defamation, proxy voting, disruption of campaigns, or inducement of electoral officials  are punishable by immediate disqualification and a 5-year ban from contesting NANS elective positions.
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
            <h3
              className="font-bold text-xl text-gray-900"
              style={{ fontFamily: "'Crimson Pro', serif" }}
            >
              Ready to see who's running?
            </h3>
            <p className="text-gray-500 text-sm">View all declared candidates and their manifestos.</p>
          </div>
          <Link
            href="/candidates"
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90 hover:scale-105 flex-shrink-0"
            style={{ backgroundColor: "#008751" }}
          >
            View Candidates →
          </Link>
        </div>
      </section>
    </Wrapper>
  );
};

export default ElectionOverview;