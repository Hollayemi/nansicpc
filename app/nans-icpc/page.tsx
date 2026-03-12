import React from "react";
import Wrapper from "../components/wrapper";
import Link from "next/link";

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
    {subtitle && (
      <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">{subtitle}</p>
    )}
  </div>
);

const ResponsibilityCard: React.FC<{
  icon: string;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div
    className="bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-all group"
    style={{ borderColor: "#d4eadb" }}
  >
    <div
      className="h-1.5"
      style={{ background: "linear-gradient(90deg, #008751, #C8A000)" }}
    />
    <div className="p-6">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
        style={{ backgroundColor: "#e8f5ee" }}
      >
        {icon}
      </div>
      <h3
        className="font-bold text-lg text-gray-900 mb-2"
        style={{ fontFamily: "'Crimson Pro', serif" }}
      >
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

export const StepCard: React.FC<{
  step: string;
  title?: string;
  description: string;
  active?: boolean;
}> = ({ step, title, description, active }) => (
  <div
    className="relative rounded-2xl border p-6 transition-all hover:shadow-md"
    style={{
      borderColor: active ? "#008751" : "#d4eadb",
      backgroundColor: active ? "#f0fdf4" : "white",
    }}
  >
    {active && (
      <div
        className="absolute top-4 right-4 w-2 h-2 rounded-full animate-pulse"
        style={{ backgroundColor: "#C8A000" }}
      />
    )}
    <p
      className="text-4xl font-bold mb-3"
      style={{ color: "#C8A000", fontFamily: "'Crimson Pro', serif" }}
    >
      {step}
    </p>
    <h4 className="font-bold text-gray-900 text-sm mb-2">{title}</h4>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const NANSICPC: React.FC = () => (
  <Wrapper>
    {/* Hero */}
    <section
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#005c37" }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 30px)",
        }}
      />
      <div
        className="absolute right-0 bottom-0 text-white opacity-5 font-bold leading-none select-none pointer-events-none"
        style={{
          fontSize: "clamp(60px,15vw,180px)",
          fontFamily: "'Crimson Pro',serif",
        }}
      >
        ICPC
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="px-3 py-1.5 rounded-full text-xs font-semibold border"
            style={{ borderColor: "#C8A000", color: "#C8A000" }}
          >
            Official Body
          </div>
          <div
            className="px-3 py-1.5 rounded-full text-xs font-semibold border"
            style={{
              borderColor: "rgba(255,255,255,0.3)",
              color: "white",
            }}
          >
            Convention Organiser
          </div>
        </div>
        <h1
          className="text-5xl sm:text-6xl font-bold mb-4"
          style={{ fontFamily: "'Crimson Pro', serif" }}
        >
          Independent
          <br />
          <span style={{ color: "#C8A000" }}>Convention</span>
          <br />
          Planning Committee
        </h1>
        <p className="text-green-100 text-lg max-w-xl leading-relaxed mb-6">
          The NANS ICPC is the constituted body mandated to organise, coordinate, and
          supervise the National Convention for the emergence of new NANS leadership —
          ensuring transparency, credibility, and democratic integrity throughout the process.
        </p>
        <div className="flex gap-2 text-sm text-green-300">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-white font-medium">NANS-ICPC</span>
        </div>
      </div>
    </section>

    {/* Overview */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: "#008751" }}
            >
              About the ICPC
            </span>
            <h2
              className="text-4xl font-bold text-gray-900 mb-5 leading-tight"
              style={{ fontFamily: "'Crimson Pro', serif" }}
            >
              Organising a Credible,
              <br />
              Democratic Convention
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The NANS Independent Convention Planning Committee (ICPC) is the body
              constituted to organise and supervise the National Convention of the National
              Association of Nigerian Students. It is the central authority responsible for
              all activities relating to the convention and election of new NANS leadership.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The committee is mandated to ensure a transparent, credible, and well-structured
              electoral process that allows delegates from across all Nigerian institutions to
              freely and fairly elect their leaders.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Operating independently of any faction or interest group, the ICPC guarantees
              fairness, neutrality, and full compliance with the NANS Constitution and
              Electoral Guidelines throughout the convention process.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/election-overview"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: "#008751" }}
              >
                Election Overview →
              </Link>
              <Link
                href="/candidates"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg border transition-all hover:bg-gray-50"
                style={{ borderColor: "#008751", color: "#008751" }}
              >
                View Candidates →
              </Link>
            </div>
          </div>

          {/* Stat badges */}
          <div className="space-y-4">
            <div
              className="rounded-2xl p-8 border"
              style={{ backgroundColor: "#f8fdf9", borderColor: "#d4eadb" }}
            >
              <p
                className="font-bold text-xl text-gray-900 mb-6"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                ICPC at a Glance
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "6", label: "Geopolitical Zones Represented" },
                  { value: "200+", label: "Affiliated Institutions" },
                  { value: "100%", label: "Independent Operation" },
                  { value: "1", label: "Mandate: Free & Fair Elections" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="text-center py-4 px-3 rounded-xl border bg-white"
                    style={{ borderColor: "#e0ede0" }}
                  >
                    <p
                      className="text-2xl font-bold mb-1"
                      style={{
                        fontFamily: "'Crimson Pro', serif",
                        color: "#008751",
                      }}
                    >
                      {s.value}
                    </p>
                    <p className="text-gray-500 text-xs leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Independence statement */}
            <div
              className="rounded-2xl p-5 border-l-4"
              style={{ borderLeftColor: "#C8A000", backgroundColor: "#fdfdf0" }}
            >
              <p className="font-bold text-gray-800 text-sm mb-1">
                ⚖️ Principle of Independence
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                The ICPC operates entirely independently of the outgoing NANS executive,
                any aspirant, zone, or political faction. Its decisions are final and binding
                in accordance with the NANS Constitution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Core Responsibilities */}
    <section className="py-20" style={{ backgroundColor: "#f0fdf4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: "#008751" }}
          >
            Mandate
          </span>
          <h2
            className="text-4xl font-bold text-gray-900"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            Core Responsibilities of the ICPC
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto leading-relaxed">
            The ICPC is vested with full authority to carry out the following duties in
            preparation for and during the NANS National Convention.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResponsibilityCard
            icon="📋"
            title="Planning & Coordination"
            description="The ICPC plans and coordinates all logistics of the NANS National Convention, including venue selection, schedule development, and delegate management."
          />
          <ResponsibilityCard
            icon="📝"
            title="Nomination Forms & Guidelines"
            description="Issues official nomination forms and publishes comprehensive electoral guidelines governing all aspects of the convention and election process."
          />
          <ResponsibilityCard
            icon="🔍"
            title="Screening of Aspirants"
            description="Screens all aspirants seeking elective positions to verify eligibility in accordance with the NANS constitution and the published electoral guidelines."
          />
          <ResponsibilityCard
            icon="🪪"
            title="Delegate Accreditation"
            description="Accredits all delegates and voters from affiliated institutions across the six geopolitical zones to participate in the convention and voting process."
          />
          <ResponsibilityCard
            icon="🗳️"
            title="Managing the Electoral Process"
            description="Manages the full convention and electoral process on convention day — from opening of polls through to the counting, collation, and announcement of results."
          />
          <ResponsibilityCard
            icon="📣"
            title="Announcing Certified Candidates"
            description="Publishes the official list of candidates cleared to contest, following thorough screening, and communicates decisions to all aspirants and the public."
          />
          <ResponsibilityCard
            icon="📜"
            title="Constitutional Compliance"
            description="Ensures that all activities, decisions, and outcomes are fully compliant with the NANS Constitution and duly published electoral guidelines."
          />
          <ResponsibilityCard
            icon="👁️"
            title="Transparency & Neutrality"
            description="Upholds full transparency at every stage of the convention — all key activities are open to accredited observers, media, and delegate representatives."
          />
          <ResponsibilityCard
            icon="⚖️"
            title="Dispute Resolution"
            description="Receives and adjudicates formal petitions and objections filed by aspirants or delegates within the prescribed petition window after results are declared."
          />
        </div>
      </div>
    </section>

    {/* Election Process Steps */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="How It Works"
          title="The ICPC Convention Process"
          subtitle="From inauguration of the committee to the emergence of new NANS leadership — a transparent, step-by-step process governed by the NANS Constitution."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StepCard
            step="01"
            title="Inauguration of the ICPC"
            description="The NANS JCC constitutes and inaugurates the Independent Convention Planning Committee to begin formal preparation for the National Convention."
          />
          <StepCard
            step="02"
            title="Release of Electoral Guidelines"
            description="The ICPC publishes official guidelines governing nominations, screening, delegate accreditation, campaigns, voting, and results declaration."
          />
          <StepCard
            step="03"
            title="Nomination & Screening"
            description="Aspirants collect and submit nomination forms. The ICPC screens all submissions for eligibility and publishes the list of certified candidates."
            active
          />
          <StepCard
            step="04"
            title="Delegate Accreditation"
            description="Delegates from all NANS-affiliated institutions are accredited to participate in the convention as voters, in accordance with ICPC guidelines."
          />
          <StepCard
            step="05"
            title="Convention & Voting"
            description="Accredited delegates cast their votes by secret ballot at the National Convention. Voting is conducted in the presence of candidates' agents and observers."
          />
          <StepCard
            step="06"
            title="Counting & Collation"
            description="Votes are counted openly at polling centres. Results are collated at the national level by the ICPC Returning Officer and verified before declaration."
          />
          <StepCard
            step="07"
            title="Declaration of Results"
            description="The ICPC Returning Officer formally declares results. Outcomes are published on the NANS official portal and communicated to all affiliates."
          />
          <StepCard
            step="08"
            title="Inauguration of New Leadership"
            description="Newly elected NANS officials are inaugurated at a public ceremony. Outgoing leadership formally hands over to the incoming executive."
          />
        </div>
      </div>
    </section>

    {/* Eligibility snapshot */}
    <section className="py-20" style={{ backgroundColor: "#f0fdf4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Eligibility"
          title="Who Can Participate?"
          subtitle="The ICPC enforces clear eligibility criteria for both candidates seeking office and delegates exercising their right to vote at the National Convention."
        />
        <div className="grid md:grid-cols-2 gap-8">
          {/* Candidates */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "#d4eadb" }}
          >
            <div
              className="px-6 py-4 text-white"
              style={{ backgroundColor: "#008751" }}
            >
              <h3
                className="font-bold text-xl"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                For Candidates
              </h3>
              <p className="text-green-200 text-xs mt-0.5">
                Aspirants seeking elective positions
              </p>
            </div>
            <div className="p-6 bg-white space-y-3">
              {[
                "Must be a bona fide student of a recognised Nigerian tertiary institution",
                "Must meet all constitutional requirements of NANS",
                "Must complete the nomination form and screening process successfully",
                "Must pay the prescribed non-refundable nomination fee",
                "Must have a clean integrity record with no prior electoral fraud findings",
                "Must submit a detailed Manifesto as required by the ICPC",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "#008751" }}
                  >
                    ✓
                  </span>
                  {item}
                </div>
              ))}
              <div className="pt-3">
                <Link
                  href="/election-overview"
                  className="text-xs font-semibold"
                  style={{ color: "#008751" }}
                >
                  Full candidate eligibility requirements →
                </Link>
              </div>
            </div>
          </div>

          {/* Delegates */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "#d4eadb" }}
          >
            <div
              className="px-6 py-4 text-white"
              style={{ backgroundColor: "#005c37" }}
            >
              <h3
                className="font-bold text-xl"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                For Delegates
              </h3>
              <p className="text-green-200 text-xs mt-0.5">
                Voter-delegates representing institutions
              </p>
            </div>
            <div className="p-6 bg-white space-y-3">
              {[
                "Must be duly nominated by their institution or recognised student body",
                "Must be accredited by the ICPC ahead of convention day",
                "Must hold a recognised student union executive office at their institution",
                "Institution must be affiliated with NANS and up-to-date with dues",
                "Must present a valid voter card and institutional ID on election day",
                "Must be in good academic standing and not under disciplinary suspension",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-gray-700">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "#005c37" }}
                  >
                    ✓
                  </span>
                  {item}
                </div>
              ))}
              <div className="pt-3">
                <Link
                  href="/election-overview"
                  className="text-xs font-semibold"
                  style={{ color: "#008751" }}
                >
                  Full delegate eligibility requirements →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
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
        <h2
          className="text-4xl font-bold mb-4"
          style={{ fontFamily: "'Crimson Pro', serif" }}
        >
          The Convention Is Your Democratic Right
        </h2>
        <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Stay informed, participate actively, and help shape the future of NANS leadership.
          Explore the full election schedule, candidate profiles, and electoral guidelines.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/election-schedule"
            className="px-8 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105"
            style={{ backgroundColor: "#C8A000", color: "#1a1500" }}
          >
            View Convention Schedule
          </Link>
          <Link
            href="/candidates"
            className="px-8 py-3 rounded-lg font-semibold text-sm border border-white text-white hover:bg-white hover:text-green-800 transition-all"
          >
            Meet the Candidates
          </Link>
        </div>
      </div>
    </section>
  </Wrapper>
);

export default NANSICPC;
