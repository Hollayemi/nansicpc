import React from "react";
import Wrapper from "../components/wrapper";
import Link from "next/link";


const StatBadge: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div
    className="text-center p-5 rounded-xl border"
    style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}
  >
    <p
      className="text-3xl font-bold mb-1"
      style={{ fontFamily: "'Crimson Pro', serif", color: "#008751" }}
    >
      {value}
    </p>
    <p className="text-gray-600 text-xs font-medium">{label}</p>
  </div>
);

const ProgramCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  bullets: string[];
}> = ({ icon, title, description, bullets }) => (
  <div
    className="bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-all group"
    style={{ borderColor: "#d4eadb" }}
  >
    <div
      className="h-2"
      style={{ background: "linear-gradient(90deg, #008751, #C8A000)" }}
    />
    <div className="p-7">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
        style={{ backgroundColor: "#e8f5ee" }}
      >
        {icon}
      </div>
      <h3
        className="font-bold text-xl text-gray-900 mb-2"
        style={{ fontFamily: "'Crimson Pro', serif" }}
      >
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">{description}</p>
      <ul className="space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
            <span
              className="w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: "#008751" }}
            >
              ✓
            </span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const NANSICPC: React.FC = () => (
  <Wrapper>
    {/* Hero */}
    <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#005c37" }}>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 30px)",
        }}
      />
      <div
        className="absolute right-0 bottom-0 text-white opacity-5 font-bold leading-none select-none pointer-events-none"
        style={{ fontSize: "clamp(60px,15vw,180px)", fontFamily: "'Crimson Pro',serif" }}
      >
        ICPC
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="px-3 py-1.5 rounded-full text-xs font-semibold border"
            style={{ borderColor: "#C8A000", color: "#C8A000" }}
          >
            Strategic Partnership
          </div>
          <div
            className="px-3 py-1.5 rounded-full text-xs font-semibold border"
            style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
          >
            Since 2015
          </div>
        </div>
        <h1
          className="text-5xl sm:text-6xl font-bold mb-4"
          style={{ fontFamily: "'Crimson Pro', serif" }}
        >
          NANS–ICPC
          <br />
          <span style={{ color: "#C8A000" }}>Anti-Corruption</span>
          <br />
          Partnership
        </h1>
        <p className="text-green-100 text-lg max-w-xl leading-relaxed mb-6">
          A landmark collaboration between NANS and the Independent Corrupt Practices and Other Related Offences Commission to build a generation of integrity-driven Nigerian leaders.
        </p>
        <div className="flex gap-2 text-sm text-green-300">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-medium">NANS-ICPC</span>
        </div>
      </div>
    </section>

    {/* Partnership overview */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3"
              style={{ color: "#008751" }}
            >
              About the Partnership
            </span>
            <h2
              className="text-4xl font-bold text-gray-900 mb-5 leading-tight"
              style={{ fontFamily: "'Crimson Pro', serif" }}
            >
              Championing Integrity
              <br />Across Nigerian Campuses
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              In 2015, NANS and the ICPC formalised a Memorandum of Understanding to combat corruption and promote ethical conduct in Nigerian higher education institutions. The partnership recognises that sustainable national development begins with building an integrity-conscious young generation.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The NANS-ICPC Anti-Corruption Vanguard (ACV) operates as a student-led watchdog network on over 200 Nigerian campuses, providing training, sensitisation, and peer accountability mechanisms to discourage corrupt practices.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              The partnership directly influences how NANS conducts its elections — all electoral processes are monitored by ICPC-trained student observers, ensuring transparency and credibility.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.icpc.gov.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: "#008751" }}
              >
                Visit ICPC Website ↗
              </a>
              <Link
                href="/election-overview"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg border transition-all hover:bg-gray-50"
                style={{ borderColor: "#008751", color: "#008751" }}
              >
                Election Transparency →
              </Link>
            </div>
          </div>

          {/* Logos/emblem block */}
          <div className="grid grid-cols-1 gap-4">
            <div
              className="rounded-2xl p-8 flex items-center justify-center gap-8 border"
              style={{ backgroundColor: "#f8fdf9", borderColor: "#d4eadb" }}
            >
              {/* NANS emblem */}
              <div className="text-center">
               <img src="/images/logo.png" alt="NANS Emblem" className="w-14 h-14 rounded-full flex-shrink-0" />
                <p className="font-bold text-xs text-gray-700">NANS</p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-10 h-0.5"
                  style={{ backgroundColor: "#008751" }}
                />
                <span
                  className="text-xs font-bold px-2 py-1 rounded"
                  style={{ backgroundColor: "#e8f5ee", color: "#008751" }}
                >
                  MOU
                </span>
                <div
                  className="w-10 h-0.5"
                  style={{ backgroundColor: "#008751" }}
                />
              </div>

              {/* ICPC emblem */}
              <div className="text-center">
                <img src="/icpc-logo.jpg" alt="NANS Emblem" className="w-14 h-14 rounded-full flex-shrink-0" />
              
                <p className="font-bold text-xs text-gray-700">ICPC</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <StatBadge value="200+" label="Campuses" />
              <StatBadge value="50k+" label="Students Trained" />
              <StatBadge value="10yrs" label="Partnership" />
              <StatBadge value="36" label="States Reached" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Programs */}
    <section className="py-20" style={{ backgroundColor: "#f0fdf4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: "#008751" }}
          >
            Our Initiatives
          </span>
          <h2
            className="text-4xl font-bold text-gray-900"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            Key Programmes & Activities
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProgramCard
            icon="🛡️"
            title="Anti-Corruption Vanguard (ACV)"
            description="Student-led integrity watchdog units operating on campuses nationwide, trained directly by ICPC officials."
            bullets={[
              "Peer-to-peer ethics education",
              "Campus corruption reporting hotlines",
              "Monthly integrity seminars",
              "Student integrity ambassadors",
            ]}
          />
          <ProgramCard
            icon="🏆"
            title="NANS Integrity Awards"
            description="Annual recognition of student unions, institutions, and individuals who demonstrate exemplary ethical conduct."
            bullets={[
              "Best transparent student union election",
              "Anti-corruption champion award",
              "Institutional integrity award",
              "Whistleblower recognition scheme",
            ]}
          />
          <ProgramCard
            icon="📊"
            title="Election Integrity Monitoring"
            description="ICPC-trained student observers oversee all NANS elections to guarantee free, fair, and credible outcomes."
            bullets={[
              "Independent observer accreditation",
              "Real-time election reporting",
              "Voter education workshops",
              "Post-election audit reports",
            ]}
          />
          <ProgramCard
            icon="📚"
            title="Campus Ethics Curriculum"
            description="A structured ethics education programme integrated into orientation activities for fresh students."
            bullets={[
              "ICPC-developed course materials",
              "Freshers' orientation workshops",
              "Faculty-level integrity sessions",
              "Online e-learning modules",
            ]}
          />
          <ProgramCard
            icon="📣"
            title="Awareness Campaigns"
            description="Nationwide sensitisation drives on the devastating impact of corruption on Nigerian education and development."
            bullets={[
              "Social media campaigns (#SayNoToCorruption)",
              "Radio & TV outreach programmes",
              "On-campus street marches",
              "Essay and debate competitions",
            ]}
          />
          <ProgramCard
            icon="🤝"
            title="Policy Advocacy"
            description="Joint advocacy by NANS and ICPC for anti-corruption legislation and educational funding transparency."
            bullets={[
              "Budget tracking for education sector",
              "School fees transparency advocacy",
              "TETFUND accountability monitoring",
              "Joint submissions to the National Assembly",
            ]}
          />
        </div>
      </div>
    </section>

    {/* How to join */}
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3"
          style={{ color: "#008751" }}
        >
          Get Involved
        </span>
        <h2
          className="text-4xl font-bold text-gray-900 mb-5"
          style={{ fontFamily: "'Crimson Pro', serif" }}
        >
          Join the Anti-Corruption Vanguard
        </h2>
        <p className="text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
          Every Nigerian student can become an agent of change. If your institution does not yet have an ACV chapter, you can be the one to start it. Here's how:
        </p>
        <div className="grid sm:grid-cols-4 gap-4 mb-10">
          {[
            { step: "01", text: "Contact your Student Union Government (SUG)" },
            { step: "02", text: "Submit an ACV Chapter application to NANS Secretariat" },
            { step: "03", text: "Attend the ICPC-NANS ACV Orientation Training" },
            { step: "04", text: "Launch your campus chapter and begin activities" },
          ].map((s) => (
            <div
              key={s.step}
              className="rounded-xl p-5 border text-left"
              style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}
            >
              <p
                className="text-3xl font-bold mb-3"
                style={{ color: "#C8A000", fontFamily: "'Crimson Pro', serif" }}
              >
                {s.step}
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
        <a
          href="mailto:icpc@nans.org.ng"
          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90 hover:scale-105"
          style={{ backgroundColor: "#008751" }}
        >
          Apply for ACV Membership →
        </a>
      </div>
    </section>
  </Wrapper>
);

export default NANSICPC;