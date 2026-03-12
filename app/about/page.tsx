import React from "react";
import Wrapper from "../components/wrapper";
import Link from "next/link";
import { StepCard } from "../nans-icpc/page";

const SectionHeader: React.FC<{ label: string; title: string; subtitle?: string }> = ({
  label,
  title,
  subtitle,
}) => (
  <div className="mb-12">
    <span
      className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3"
      style={{ color: "#008751" }}
    >
      {label}
    </span>
    <h2
      className="text-4xl font-bold text-gray-900 leading-tight"
      style={{ fontFamily: "'Crimson Pro', serif" }}
    >
      {title}
    </h2>
    {subtitle && <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">{subtitle}</p>}
  </div>
);

const executives = [
  { 
    title: "National President", 
    name: "Comrade Olushola Oladoja", 
    zone: "Zone C (North Central)", 
    initials: "OO" 
  },
  { 
    title: "Senate President", 
    name: "Senator Adamu Don Manu", 
    zone: "Zone A (North West)", 
    initials: "ADM" 
  },
  { 
    title: "Secretary-General", 
    name: "Comrade Anzaku Shedrack", 
    zone: "Zone C (North Central)", 
    initials: "AS" 
  },
  { 
    title: "Public Relations Officer (PRO)", 
    name: "Comrade Adeyemi Samson", 
    zone: "Zone D (South West)", 
    initials: "AS" 
  },
  { 
    title: "Assistant Secretary-General", 
    name: "Comrade Adejuwon Olatunji", 
    zone: "Zone D (South West)", 
    initials: "AO" 
  }
];

const milestones = [
  { year: "1956", event: "NANS founded as a pan-Nigerian student movement at a conference in Lagos" },
  { year: "1965", event: "First national elections conducted; democratic governance framework established" },
  { year: "1978", event: "NANS leads nationwide protests against military education policies (Ali Must Go)" },
  { year: "1989", event: "NANS officially recognised by the Federal Government of Nigeria" },
  { year: "1999", event: "NANS reorganised into 6 geopolitical zones following Nigeria's return to democracy" },
  { year: "2010", event: "NANS Digital Student Welfare Initiative launched across all six geopolitical zones" },
  { year: "2023", event: "NANS Digital Governance Initiative — online delegate registration and accreditation portal launched" },
  { year: "2026", event: "2026 NANS National Convention, organised by the Independent Convention Planning Committee (ICPC)" },
];

const About: React.FC = () => (
  <Wrapper>
    {/* Page hero */}
    <section
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#008751" }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 30px)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <p className="text-green-200 text-sm font-medium mb-2">Explore NANS</p>
        <h1
          className="text-5xl sm:text-6xl font-bold mb-4"
          style={{ fontFamily: "'Crimson Pro', serif" }}
        >
          About NANS
        </h1>
        <p className="text-green-100 text-lg max-w-xl leading-relaxed">
          The history, structure, mission, and leadership of Nigeria's foremost student organisation since 1956.
        </p>
        <div className="flex gap-2 mt-6 text-sm text-green-200">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">About NANS</span>
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              icon: "🎯",
              title: "Our Mission",
              body: "To unite all Nigerian students under one democratic umbrella, advocate vigorously for their rights and welfare, and ensure that student voices are heard at every level of governance — institutional, state, and federal.",
            },
            {
              icon: "🔭",
              title: "Our Vision",
              body: "A Nigeria where every student has access to quality, affordable education in an environment that fosters academic excellence, safety, freedom, and equal opportunity regardless of gender, tribe, or socioeconomic background.",
            },
            {
              icon: "⚖️",
              title: "Core Values",
              body: "Democracy · Transparency · Accountability · Solidarity · Patriotism · Student Welfare · Academic Freedom · National Unity",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-8 border"
              style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{ backgroundColor: "#e0f4ea" }}
              >
                {item.icon}
              </div>
              <h3
                className="font-bold text-xl text-gray-900 mb-3"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

        <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="objective of the NANS"
          title="Six Pillars of Student Advocacy"
          subtitle="NANS is committed to championing the rights and welfare of Nigerian students through these core objectives."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            "Protecting and promoting the welfare of Nigerian students",
"Advocating for improved educational standards",

"Providing a unified platform for student representation",

"Promoting national unity and leadership development among students",

"Engaging government and stakeholders on educational reforms",

"The association operates through an elected leadership structure that emerges through democratic conventions held periodically.",
          ].map((m, i) => (
          <StepCard
            step={`0${i + 1}`}
            active
            description={m}
            />
          ))}
         
        </div>
      </div>
    </section>

    {/* History */}
    <section className="py-20" style={{ backgroundColor: "#f0fdf4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our History"
          title="Over Six Decades of Student Advocacy"
          subtitle="From independence-era activism to modern democratic governance, NANS has been at the forefront of student rights in Nigeria."
        />
        <div className="relative">
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5 hidden md:block"
            style={{ backgroundColor: "#d4eadb" }}
          />
          <div className="space-y-6">
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-6 items-start">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 z-10 border-2"
                  style={{ backgroundColor: "#008751", borderColor: "white" }}
                >
                  {m.year.slice(2)}
                </div>
                <div
                  className="flex-1 rounded-xl p-5 border bg-white"
                  style={{ borderColor: "#e0ede0" }}
                >
                  <p className="text-xs font-bold text-green-700 mb-1">{m.year}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Zonal Structure */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Organisational Structure"
          title="Six Geopolitical Zones"
          subtitle="NANS is organised into six zones that mirror Nigeria's geopolitical structure, with each zone having its own elected executive leadership."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              zone: "Zone A", region: "Northwest",
              states: ["Kano", "Kaduna", "Katsina", "Sokoto", "Kebbi", "Zamfara", "Jigawa"],
              color: "#006B3E",
            },
            {
              zone: "Zone B", region: "Northeast",
              states: ["Borno", "Adamawa", "Gombe", "Bauchi", "Yobe", "Taraba"],
              color: "#007A45",
            },
            {
              zone: "Zone C", region: "Northcentral",
              states: ["FCT Abuja", "Plateau", "Benue", "Kogi", "Niger", "Nassarawa", "Kwara"],
              color: "#008751",
            },
            {
              zone: "Zone D", region: "Southeast",
              states: ["Enugu", "Anambra", "Imo", "Abia", "Ebonyi"],
              color: "#009B5E",
            },
            {
              zone: "Zone E", region: "Southwest",
              states: ["Lagos", "Oyo", "Osun", "Ekiti", "Ondo", "Ogun"],
              color: "#00A96A",
            },
            {
              zone: "Zone F", region: "Southsouth",
              states: ["Rivers", "Delta", "Akwa Ibom", "Cross River", "Bayelsa", "Edo"],
              color: "#00BF76",
            },
          ].map((z) => (
            <div
              key={z.zone}
              className="rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-all"
              style={{ borderColor: "#d4eadb" }}
            >
              <div
                className="px-5 py-4 text-white flex items-center justify-between"
                style={{ backgroundColor: z.color }}
              >
                <div>
                  <p className="font-bold text-lg" style={{ fontFamily: "'Crimson Pro', serif" }}>
                    {z.zone}
                  </p>
                  <p className="text-white/80 text-xs">{z.region}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  {z.states.length}
                </div>
              </div>
              <div className="px-5 py-4 bg-white">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Member States
                </p>
                <p className="text-gray-700 text-sm">{z.states.join(" · ")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* National Executive */}
    <section className="py-20" style={{ backgroundColor: "#f0fdf4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Leadership"
          title="Current National Executive Council"
          subtitle="Elected representatives steering NANS affairs for the 2024–2025 session."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {executives.map((exec) => (
            <div
              key={exec.title}
              className="bg-white rounded-2xl p-6 border flex items-center gap-4 hover:shadow-md transition-all"
              style={{ borderColor: "#d4eadb" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #008751, #005c37)",
                }}
              >
                {exec.initials}
              </div>
              <div>
                <p
                  className="font-bold text-gray-900 text-sm"
                  style={{ color: "#C8A000" }}
                >
                  {exec.title}
                </p>
                <p
                  className="font-bold text-gray-800"
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                >
                  {exec.name}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">{exec.zone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Governance bodies */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Governance" title="NANS Governing Bodies" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              body: "Joint Consultative Council (JCC)",
              desc: "The supreme decision-making body of NANS, comprising all zonal presidents and national executive members. The JCC meets quarterly and ratifies all major policies, including the constitution of the ICPC for each convention cycle.",
            },
            {
              body: "National Executive Council (NEC)",
              desc: "The administrative arm responsible for day-to-day operations, programme implementation, and zonal coordination. NEC meets monthly and is accountable to the JCC.",
            },
            {
              body: "Independent Convention Planning Committee (ICPC)",
              desc: "The independent body constituted by the JCC to organise, supervise, and manage the NANS National Convention and the election of new leadership. The ICPC operates independently to ensure fairness, credibility, and neutrality.",
            },
          ].map((g) => (
            <div
              key={g.body}
              className="rounded-xl p-6 border-l-4 bg-gray-50"
              style={{ borderLeftColor: "#008751" }}
            >
              <h4
                className="font-bold text-gray-900 mb-3"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                {g.body}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>

        {/* ICPC CTA */}
        <div
          className="mt-8 rounded-2xl p-6 border flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}
        >
          <div>
            <p className="font-bold text-gray-900 mb-1" style={{ fontFamily: "'Crimson Pro', serif" }}>
              The ICPC is currently managing the 2026 National Convention.
            </p>
            <p className="text-gray-500 text-sm">
              Learn about the committee's mandate, responsibilities, and the full convention process.
            </p>
          </div>
          <Link
            href="/nans-icpc"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90 flex-shrink-0"
            style={{ backgroundColor: "#008751" }}
          >
            About the ICPC →
          </Link>
        </div>
      </div>
    </section>
  </Wrapper>
);

export default About;
