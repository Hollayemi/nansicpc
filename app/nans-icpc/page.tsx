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

const subCommittees = [
  { num: "1", name: "Screening and Verification Sub-Committee" },
  { num: "2", name: "Screening Appeal Sub-Committee" },
  { num: "3", name: "Venue and Protocol Sub-Committee" },
  { num: "4", name: "Welfare and Entertainment Sub-Committee" },
  { num: "5", name: "Accommodation Sub-Committee" },
  { num: "6", name: "Security Sub-Committee" },
  { num: "7", name: "Stakeholders Engagement Sub-Committee" },
  { num: "8", name: "Medical and Emergency Sub-Committee" },
  { num: "9", name: "Media and Publicity Sub-Committee" },
  { num: "10", name: "Fund Raising and Finance Sub-Committee" },
  { num: "11", name: "Election Management Sub-Committee" },
  { num: "12", name: "Transport and Logistics Sub-Committee" },
  { num: "13", name: "Contact and Mobilization Sub-Committee" },
  { num: "14", name: "Accreditation Sub-Committee" },
];

const subCommitteeDetails = [
  {
    name: "Security Sub-Committee",
    number: "5",
    chairman: "Yusuf Alimi Moses",
    viceChairman: "Samson Adewale",
    secretary: "Dominion Eveh",
    members: ["Anyebe Dominic", "Adeyeye Gbenga", "Ayodeji Akintaye", "Ekundina Elvis", "Andrew Eredena Ajakpofo", "Micheal Ibanga", "JCC Chairman Cross River"],
    advisory: ["Chuks Obele", "Nwacukwu Chiweuze Biggy"],
  },
  {
    name: "Accommodation Sub-Committee",
    number: "6",
    chairman: "Salahudeen A. Lukman",
    viceChairman: "Olojede Victor",
    secretary: "Ojo Raymond",
    members: ["Rijawa Umar", "Rosemarry Marven", "Mohammed Umar Khamis", "Lawi Daniel", "Oladoja Mubarak", "Yusuf S Maje", "Chikere Chukwemeka", "JCC Chairman Anambra State"],
    advisory: ["Omojola Olusegun", "Anifowose Afeez"],
  },
  {
    name: "Screening Appeal Sub-Committee",
    number: "7",
    chairman: "Charles Christopher",
    viceChairman: "Pastor Uko Micheal",
    secretary: "Tijani Mustapha",
    members: ["Lawi Daniel", "Oladoja Mubarak", "Yusuf S. Maje", "Chikere Chukwemeka", "Mohammed Mohammed", "JCC Chairman Anambra State"],
    advisory: ["Saheed Tunde Osama", "Isah Emmanuel"],
  },
];

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
          <div
            className="px-3 py-1.5 rounded-full text-xs font-semibold border animate-pulse"
            style={{ borderColor: "#C8A000", color: "#C8A000" }}
          >
            ● ACTIVE 2026
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
        <p className="text-green-100 text-lg max-w-xl leading-relaxed mb-4">
          Inaugurated on 8th March 2026 by NANS National President Comr. Olushola Oladoja,
          the ICPC is the constituted body mandated to organise, coordinate, and supervise
          the 2026 NANS National Convention, ensuring transparency, credibility, and
          democratic integrity throughout the process.
        </p>
        <div
          className="inline-flex items-center gap-3 px-4 py-3 rounded-xl mb-6"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          <div>
            <p className="text-xs text-green-300 mb-0.5">ICPC Chairman</p>
            <p className="font-bold">Comrade Omotayo Oladele Samuel (Dele Kenko)</p>
          </div>
        </div>
        <div className="flex gap-2 text-sm text-green-300">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-white font-medium">NANS-ICPC</span>
        </div>
      </div>
    </section>

    {/* Convention venue highlight */}
    <section className="py-5" style={{ backgroundColor: "#C8A000" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold" style={{ color: "#1a1500" }}>
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>Venue: Old Parade Ground, Abuja</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>Convention: 22nd – 25th May 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🗳️</span>
          <span>Election Proper: 24th May 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📞</span>
          <span>+234 806 007 3918 | info@nanscpc.org</span>
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
              The committee was formally inaugurated on <strong>8th March 2026</strong> by
              the NANS National President, Comr. Olushola Oladoja, in accordance with the
              provisions of the NANS Constitution, and is chaired by
              <strong> Comrade Omotayo Oladele Samuel (Dele Kenko)</strong>.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Following inauguration, the Principal Officers of the ICPC constituted
              <strong> 14 sub-committees</strong> to ensure proper delegation of responsibilities
              and smooth execution of all convention activities. Each sub-committee has a
              minimum of ten members with representation drawn from all six geopolitical
              zones of NANS.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/election-schedule"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: "#008751" }}
              >
                Convention Schedule →
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
                  { value: "14", label: "Active Sub-Committees" },
                  { value: "6", label: "Geopolitical Zones Represented" },
                  { value: "200+", label: "Affiliated Institutions" },
                  { value: "8 March", label: "Date of Inauguration" },
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
                in accordance with the NANS Constitution. Disciplinary measures are in place
                for any member found wanting in the course of this national assignment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Sub-Committees — full list */}
    <section className="py-20" style={{ backgroundColor: "#f0fdf4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Committee Structure"
          title="14 ICPC Sub-Committees"
          subtitle="The ICPC Principal Officers constituted 14 sub-committees to ensure proper delegation of responsibilities. Each sub-committee has a minimum of 10 members with representation from all six geopolitical zones."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {subCommittees.map((sc) => (
            <div
              key={sc.num}
              className="bg-white rounded-xl border p-4 flex items-start gap-3 hover:shadow-md transition-all"
              style={{ borderColor: "#d4eadb" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: "#008751" }}
              >
                {sc.num}
              </div>
              <p className="text-gray-700 text-sm font-medium leading-snug">{sc.name}</p>
            </div>
          ))}
        </div>

        {/* Detailed sub-committees */}
        <h3
          className="text-2xl font-bold text-gray-900 mb-6"
          style={{ fontFamily: "'Crimson Pro', serif" }}
        >
          Sub-Committee Compositions
        </h3>
        <div className="grid lg:grid-cols-3 gap-6">
          {subCommitteeDetails.map((sc) => (
            <div
              key={sc.name}
              className="bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-all"
              style={{ borderColor: "#d4eadb" }}
            >
              <div
                className="px-6 py-4 text-white"
                style={{ background: "linear-gradient(135deg, #005c37, #008751)" }}
              >
                <p className="text-xs text-green-300 mb-1">Sub-Committee {sc.number}</p>
                <h4
                  className="font-bold text-lg leading-snug"
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                >
                  {sc.name}
                </h4>
              </div>
              <div className="p-5">
                <div className="space-y-2 mb-4">
                  {[
                    { role: "Chairman", name: sc.chairman },
                    { role: "Vice Chairman", name: sc.viceChairman },
                    { role: "Secretary", name: sc.secretary },
                  ].map((p) => (
                    <div key={p.role} className="flex justify-between text-sm border-b pb-1" style={{ borderColor: "#f0f0f0" }}>
                      <span className="text-gray-500 font-medium">{p.role}</span>
                      <span className="font-semibold text-gray-800 text-right max-w-[55%]">{p.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Members</p>
                <ul className="space-y-1 mb-4">
                  {sc.members.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#008751" }} />
                      {m}
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t" style={{ borderColor: "#e9f0e9" }}>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Advisory</p>
                  <ul className="space-y-1">
                    {sc.advisory.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#C8A000" }} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Core Responsibilities */}
    <section className="py-20 bg-white">
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
            description="Issues official nomination and accreditation forms free of charge, and publishes comprehensive guidelines governing all aspects of the convention and election process."
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
            description="Manages the full convention and electoral process from opening of polls through to the counting, collation, and announcement of results."
          />
          <ResponsibilityCard
            icon="📣"
            title="Announcing Certified Candidates"
            description="Publishes the official list of candidates cleared to contest following thorough screening, and communicates decisions to all aspirants and the public."
          />
          <ResponsibilityCard
            icon="📜"
            title="Constitutional Compliance"
            description="Ensures that all activities, decisions, and outcomes are fully compliant with the NANS Constitution and duly published electoral guidelines."
          />
          <ResponsibilityCard
            icon="👁️"
            title="Transparency & Neutrality"
            description="Upholds full transparency at every stage of the convention. All key activities are open to accredited observers, media, and delegate representatives."
          />
          <ResponsibilityCard
            icon="⚖️"
            title="Dispute Resolution"
            description="Receives and adjudicates formal petitions and objections filed by aspirants or delegates within the prescribed appeal window after screening results."
          />
        </div>
      </div>
    </section>

    {/* Election Process Steps */}
    <section className="py-20" style={{ backgroundColor: "#f0fdf4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="How It Works"
          title="The ICPC Convention Process"
          subtitle="From inauguration of the committee to the emergence of new NANS leadership, a transparent, step-by-step process governed by the NANS Constitution."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StepCard
            step="01"
            title="Inauguration of the ICPC"
            description="The NANS National President formally inaugurates the ICPC (8th March 2026) to begin preparation for the National Convention."
            active
          />
          <StepCard
            step="02"
            title="Pick-Up of Forms"
            description="Aspirants collect nomination/accreditation forms (1-7 April 2026). Forms are completely FREE, no payment required."
          />
          <StepCard
            step="03"
            title="Submission of Forms"
            description="Completed forms with all required documents submitted (8-10 April 2026). Late submission = automatic disqualification."
          />
          <StepCard
            step="04"
            title="Physical Screening"
            description="ICPC Screening & Verification Sub-Committee conducts physical screening of all aspirants (12-19 April 2026)."
          />
          <StepCard
            step="05"
            title="Studentship Verification"
            description="Independent verification of studentship for all screened aspirants by the Sub-Committee (20-27 April 2026)."
          />
          <StepCard
            step="06"
            title="Screening Results & Appeals"
            description="Results released 29 April 2026. Appeal window: 1–7 May 2026. Final appeal results: 9 May 2026."
          />
          <StepCard
            step="07"
            title="Convention Proper"
            description="Delegates arrive 20 May. Peace Accord & Presidential Debate 21 May. Registration 22 May. Accreditation 23 May. Election 24 May."
          />
          <StepCard
            step="08"
            title="Election & Declaration"
            description="Election Proper: 24 May 2026. Votes counted openly. Returning Officer declares results. Delegates depart 25 May 2026."
          />
        </div>
      </div>
    </section>

    {/* Eligibility snapshot */}
    <section className="py-20 bg-white">
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
            <div className="px-6 py-4 text-white" style={{ backgroundColor: "#008751" }}>
              <h3 className="font-bold text-xl" style={{ fontFamily: "'Crimson Pro', serif" }}>
                For Candidates
              </h3>
              <p className="text-green-200 text-xs mt-0.5">Aspirants seeking elective positions</p>
            </div>
            <div className="p-6 bg-white space-y-3">
              {[
                "Must be a bona fide student of a recognised Nigerian tertiary institution",
                "Must meet all constitutional requirements of NANS",
                "Must complete the nomination form and screening process successfully",
                "Must have a clean integrity record with no prior electoral fraud findings",
                "Must submit a Sworn Affidavit from the Federal High Court",
                "Must submit Police Clearance Certificate and all required documents",
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
                <Link href="/election-schedule" className="text-xs font-semibold" style={{ color: "#008751" }}>
                  View full convention schedule & required documents →
                </Link>
              </div>
            </div>
          </div>

          {/* Delegates */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "#d4eadb" }}
          >
            <div className="px-6 py-4 text-white" style={{ backgroundColor: "#005c37" }}>
              <h3 className="font-bold text-xl" style={{ fontFamily: "'Crimson Pro', serif" }}>
                For Delegates
              </h3>
              <p className="text-green-200 text-xs mt-0.5">Voter-delegates representing institutions</p>
            </div>
            <div className="p-6 bg-white space-y-3">
              {[
                "Must be duly nominated by their institution or recognised student body",
                "Must be accredited by the ICPC ahead of convention day",
                "SUGs must liaise with their JCC Chairmen for form collection and processing",
                "Forms must be signed, stamped, and endorsed by the Student Affairs Division",
                "Submitted through the Assistant Secretary General of NANS (Chief Accreditation Officer)",
                "Institution must be affiliated with NANS and up-to-date with dues",
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
                <Link href="/election-overview" className="text-xs font-semibold" style={{ color: "#008751" }}>
                  Full delegate eligibility requirements →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Free forms notice */}
        <div
          className="mt-6 rounded-2xl p-6 border-l-4"
          style={{ borderLeftColor: "#008751", backgroundColor: "#f0fdf4" }}
        >
          <p className="font-bold text-gray-800 mb-2">📢 Important Notice from the ICPC Chairman</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            <strong>Aspirants' Intent Forms are completely free of charge</strong>, and no aspirant is expected to pay a kobo to obtain them. All Student Union Governments (SUGs) are enjoined to liaise with their respective Joint Campus Committee (JCC) Chairmen for the collection and processing of accreditation forms. <strong>Late submission will not be entertained under any circumstances</strong>, and any violation of the stipulated timeline will amount to automatic disqualification.
          </p>
          <p className="text-gray-500 text-xs mt-3 font-medium">
            — Comrade Omotayo Oladele Samuel (Dele Kenko), Chairman, ICPC 2026
          </p>
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
          The 2026 NANS National Convention holds <strong>22nd – 25th May 2026</strong> at the Old Parade Ground, Abuja.
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
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-green-200">
          <span>📞 Chairman: +234 806 007 3918</span>
          <span>📞 Secretary: +234 703 556 5638</span>
          <span>📧 info@nanscpc.org</span>
        </div>
      </div>
    </section>
  </Wrapper>
);

export default NANSICPC;
