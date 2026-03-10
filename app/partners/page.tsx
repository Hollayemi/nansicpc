"use client"
import React, { useState } from "react";
import Link from "next/link";
import Wrapper from "../components/wrapper";

type PartnerTier = "strategic" | "institutional" | "ngo" | "media" | "corporate";

interface Partner {
  id: number;
  name: string;
  acronym: string;
  tier: PartnerTier;
  description: string;
  category: string;
  since: string;
  website?: string;
  color: string;
  icon?: string;
}

const partners: Partner[] = [
  // Strategic
  {
    id: 1,
    name: "Independent Corrupt Practices and Other Related Offences Commission",
    acronym: "ICPC",
    tier: "strategic",
    description:
      "NANS' foremost anti-corruption partner. The ICPC-NANS MOU anchors the Anti-Corruption Vanguard (ACV) programme operating on over 200 Nigerian campuses, building a culture of integrity in student governance.",
    category: "Federal Government Agency",
    since: "2015",
    website: "https://www.icpc.gov.ng",
    icon: "/icpc-logo.jpg",
    color: "#008751",
  },
  {
    id: 2,
    name: "Federal Ministry of Education",
    acronym: "FMoE",
    tier: "strategic",
    description:
      "The NANS–Federal Ministry of Education engagement ensures student perspectives are heard in policy formulation, education budget consultations, and curriculum development dialogues.",
    category: "Federal Ministry",
    since: "1989",
    icon: "/education-logo.jpg",
    color: "#005c37",
  },
  {
    id: 3,
    name: "National Universities Commission",
    acronym: "NUC",
    tier: "strategic",
    description:
      "NANS works with the NUC on accreditation transparency, institutional quality assurance, and student representation in university governance frameworks.",
    category: "Regulatory Body",
    since: "1999",
    icon: "/nuc-logo.jpg",
    color: "#007a45",
  },
  {
    id: 4,
    name: "Education Trust Fund / TETFUND",
    acronym: "TETFUND",
    tier: "strategic",
    description:
      "NANS advocates for TETFUND budget accountability and equitable distribution of infrastructural grants across all Nigerian tertiary institutions.",
    category: "Federal Government Agency",
    since: "2003",
    icon: "/tetfund-logo.jpg",
    color: "#008751",
  },
];

const tiers: { key: PartnerTier | "all"; label: string; count: number }[] = [
  { key: "all", label: "All Partners", count: partners.length },
  { key: "strategic", label: "Strategic", count: partners.filter((p) => p.tier === "strategic").length },
  { key: "institutional", label: "Institutional", count: partners.filter((p) => p.tier === "institutional").length },
  { key: "ngo", label: "NGO / Foundations", count: partners.filter((p) => p.tier === "ngo").length },
  { key: "media", label: "Media", count: partners.filter((p) => p.tier === "media").length },
  { key: "corporate", label: "Corporate", count: partners.filter((p) => p.tier === "corporate").length },
];

const tierMeta: Record<PartnerTier, { label: string; color: string; bg: string }> = {
  strategic: { label: "Strategic Partner", color: "#008751", bg: "#e8f5ee" },
  institutional: { label: "Institutional Partner", color: "#1d4ed8", bg: "#eff6ff" },
  ngo: { label: "NGO / Foundation", color: "#7c3aed", bg: "#f5f3ff" },
  media: { label: "Media Partner", color: "#0284c7", bg: "#e0f2fe" },
  corporate: { label: "Corporate Partner", color: "#b45309", bg: "#fef3c7" },
};

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner: p }) => {
  const meta = tierMeta[p.tier];
  return (
    <div
      className="bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-all group flex flex-col"
      style={{ borderColor: "#e0ede0" }}
    >
      <div className="h-1.5" style={{ backgroundColor: p.color }} />
      <div className="p-6 flex-1 flex flex-col">
        {/* Logo placeholder + acronym */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}99)` }}
          >
            {p.acronym.slice(0, 4)}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-bold text-gray-900 leading-snug mb-1.5"
              style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1rem" }}
            >
              {p.name}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: meta.bg, color: meta.color }}
              >
                {meta.label}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{p.description}</p>

        <div
          className="rounded-xl p-3 flex items-center justify-between text-xs mt-auto"
          style={{ backgroundColor: "#f8fdf9" }}
        >
          <span className="text-gray-500">{p.category}</span>
          <span
            className="font-semibold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: p.color }}
          >
            Since {p.since}
          </span>
        </div>

        {p.website && (
          <a
            href={p.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-xs font-semibold flex items-center gap-1 transition-colors"
            style={{ color: p.color }}
          >
            Visit Website ↗
          </a>
        )}
      </div>
    </div>
  );
};

const Partners: React.FC = () => {
  const [activeTier, setActiveTier] = useState<PartnerTier | "all">("all");

  const filtered =
    activeTier === "all" ? partners : partners.filter((p) => p.tier === activeTier);

  const strategicPartners = partners.filter((p) => p.tier === "strategic");

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
        <div
          className="absolute right-0 bottom-0 text-white opacity-5 font-bold leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(70px,16vw,200px)", fontFamily: "'Crimson Pro',serif" }}
        >
          ALLIES
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <p className="text-green-200 text-sm font-medium mb-2">Collaboration & Alliance</p>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            Our Partners
          </h1>
          <p className="text-green-100 text-lg max-w-xl leading-relaxed">
            NANS works with government agencies, academic institutions, civil society organisations, and the private sector to advance student welfare and educational excellence in Nigeria.
          </p>
          <div className="flex gap-2 mt-6 text-sm text-green-200">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Partners</span>
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="py-8 bg-white border-b" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {tiers.slice(1).map((t) => (
              <div
                key={t.key}
                className="text-center py-4 px-3 rounded-xl border cursor-pointer transition-all hover:shadow-sm"
                style={{
                  borderColor: activeTier === t.key ? "#008751" : "#d4eadb",
                  backgroundColor: activeTier === t.key ? "#f0fdf4" : "white",
                }}
                onClick={() => setActiveTier(t.key as PartnerTier)}
              >
                <p
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Crimson Pro', serif", color: "#008751" }}
                >
                  {t.count}
                </p>
                <p className="text-xs text-gray-500">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic partners spotlight */}
      {activeTier === "all" && (
        <section className="py-16" style={{ backgroundColor: "#f0fdf4" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span
                className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: "#008751" }}
              >
                Premier Collaborations
              </span>
              <h2
                className="text-3xl font-bold text-gray-900"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                Strategic Partners
              </h2>
              <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
                Organisations whose collaboration with NANS carries the deepest institutional impact on Nigerian student life and governance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {strategicPartners.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-all"
                  style={{ borderColor: "#d4eadb" }}
                >
                  <div
                    className="px-6 py-5 flex items-center gap-4 text-white"
                    style={{ background: `linear-gradient(135deg, ${p.color}, #002e1c)` }}
                  >
                    {/* <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 bg-white/20"
                    >
                      {p.acronym.slice(0, 4)}
                    </div> */}
                    <img src={p.icon} alt={`${p.acronym} logo`} className="w-14 h-14 object-contain" />
                    <div>
                      <h3
                        className="font-bold text-lg leading-snug"
                        style={{ fontFamily: "'Crimson Pro', serif" }}
                      >
                        {p.acronym}
                      </h3>
                      <p className="text-white/70 text-xs">{p.category}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-white/60 text-xs">Partner since</p>
                      <p className="font-bold text-sm">{p.since}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-semibold text-gray-800 text-sm mb-2">{p.name}</p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.description}</p>
                    {p.website && (
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: p.color }}
                      >
                        Visit {p.acronym} Website ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Become a partner */}
      <section
        className="relative py-16 overflow-hidden"
        style={{ backgroundColor: "#008751" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 30px)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: "#C8A000" }}
          >
            Partner With Us
          </span>
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            Collaborate with NANS
          </h2>
          <p className="text-green-100 text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            Whether you are a government agency, private company, NGO, or academic institution, a partnership with NANS connects you with over 5 million students and 200+ institutions across Nigeria.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-10 text-left">
            {[
              {
                icon: "🏛️",
                title: "Government Agencies",
                desc: "Policy outreach, programme delivery, and direct student engagement across all six zones.",
              },
              {
                icon: "🤝",
                title: "NGOs & Foundations",
                desc: "Scale your youth and education programmes to millions of Nigerian students through NANS networks.",
              },
              {
                icon: "🏢",
                title: "Corporate Organisations",
                desc: "CSR programmes, internship pipelines, and brand presence among Nigeria's student population.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-xl p-5"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <span className="text-2xl mb-3 block">{b.icon}</span>
                <p className="font-bold text-sm mb-1">{b.title}</p>
                <p className="text-green-200 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
          <a
            href="mailto:partnerships@nans.org.ng"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-sm rounded-lg transition-all hover:scale-105"
            style={{ backgroundColor: "#C8A000", color: "#1a1500" }}
          >
            Submit a Partnership Proposal →
          </a>
        </div>
      </section>
    </Wrapper>
  );
};

export default Partners;
