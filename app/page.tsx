"use client";
import React, { useEffect, useRef, useState } from "react";
import Wrapper from "./components/wrapper";
import Link from "next/link";

// --- (keep useCountUp and StatCard unchanged) ---
const useCountUp = (target: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return count;
};

const StatCard: React.FC<{ value: number; suffix: string; label: string; delay?: number }> = ({
  value,
  suffix,
  label,
  delay = 0,
}) => {
  const [visible, setVisible] = useState(false);
  const count = useCountUp(visible ? value : 0, 1800);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return (
    <div ref={ref} className="text-center">
      <div
        className="text-4xl font-bold mb-1"
        style={{ fontFamily: "'Crimson Pro', serif", color: "#008751" }}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-gray-600 text-sm font-medium">{label}</div>
    </div>
  );
};


const NewsItem: React.FC<{ tag: string; date: string; title: string; excerpt: string }> = ({
  tag,
  date,
  title,
  excerpt,
}) => (
  <article className="flex gap-4 pb-5" style={{ borderBottom: "1px solid #e9f0e9" }}>
    <div
      className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1"
      style={{ backgroundColor: "#008751" }}
    >
      {tag}
    </div>
    <div>
      <p className="text-xs text-gray-400 mb-1">{date}</p>
      <h4 className="font-semibold text-gray-800 text-sm leading-snug mb-1">{title}</h4>
      <p className="text-gray-500 text-xs leading-relaxed">{excerpt}</p>
    </div>
  </article>
);


const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1600&q=80",
  "https://images.unsplash.com/photo-1627556704302-624286467c65?w=1600&q=80",
];

const Home: React.FC = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeSlide, setActiveSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  // Carousel auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setPrevSlide(activeSlide);
      setTransitioning(true);
      setActiveSlide((s) => (s + 1) % HERO_IMAGES.length);
      setTimeout(() => {
        setPrevSlide(null);
        setTransitioning(false);
      }, 1200);
    }, 5000);
    return () => clearInterval(id);
  }, [activeSlide]);

  // Countdown (unchanged)
  useEffect(() => {
    const electionDate = new Date("2026-07-15T08:00:00");
    const tick = () => {
      const diff = electionDate.getTime() - Date.now();
      if (diff <= 0) return;
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Wrapper>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "80vh" }}>

        {/* ── CAROUSEL LAYER ── */}
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === activeSlide ? 1 : 0,
              transition: "opacity 1.2s ease-in-out",
              zIndex: 0,
            }}
          />
        ))}

        {/* ── EXISTING overlays (preserved, layered on top of carousel) ── */}
        {/* Deep green tint — increase opacity to taste (0.72 keeps images visible) */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 87, 51, 0.72)", zIndex: 1 }}
        />
        {/* Radial gradients */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 80% 50%, rgba(0,0,0,0.35) 0%, transparent 70%), radial-gradient(ellipse at 20% 80%, rgba(0,87,51,0.6) 0%, transparent 60%)",
            zIndex: 2,
          }}
        />
        {/* Diagonal stripe texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 40px)",
            zIndex: 3,
          }}
        />
        {/* NANS watermark */}
        <div
          className="absolute right-0 bottom-0 text-white opacity-5 font-bold leading-none select-none pointer-events-none overflow-hidden"
          style={{
            fontSize: "clamp(80px,18vw,220px)",
            fontFamily: "'Crimson Pro',serif",
            zIndex: 4,
          }}
        >
          NANS
        </div>

        {/* ── Carousel dot indicators ── */}
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2"
          style={{ zIndex: 10 }}
        >
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setPrevSlide(activeSlide);
                setTransitioning(true);
                setActiveSlide(i);
                setTimeout(() => { setPrevSlide(null); setTransitioning(false); }, 1200);
              }}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === activeSlide ? "24px" : "8px",
                height: "8px",
                backgroundColor: i === activeSlide ? "#C8A000" : "rgba(255,255,255,0.5)",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* ── All existing hero content (z-index raised above overlays) ── */}
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-15 pb-18 md:pb-4 flex flex-col lg:flex-row items-center gap-12"
          style={{ zIndex: 5 }}
        >
          {/* Text side */}
          <div className="flex-1 text-white max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{ borderColor: "#C8A000", color: "#C8A000", backgroundColor: "rgba(200,160,0,0.1)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              2026 NANS Presidential Election Registration Open
            </div>
            <h1
              className="text-5xl sm:text-6xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Crimson Pro', serif" }}
            >
              The Voice of
              <br />
              <span className="mr-3" style={{ color: "#C8A000" }}>Nigerian</span>
              Students
            </h1>
            <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-lg">
              Nigeria's apex student body since 1956, championing education, welfare, and democratic student governance across all tertiary institutions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/election-overview"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: "#C8A000", color: "#1a1a00" }}
              >
                2026 Election Details <span>→</span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-white text-white hover:bg-white hover:text-green-800 transition-all"
              >
                About NANS
              </Link>
            </div>
          </div>

          {/* Countdown card (unchanged) */}
          <div className="flex-shrink-0">
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: "rgba(255,255,255,0.97)", minWidth: "280px" }}
            >
              <div
                className="px-6 py-3 text-white text-center text-sm font-semibold tracking-wide"
                style={{ backgroundColor: "#005c37" }}
              >
                ⏱ Election Countdown
              </div>
              <div className="px-6 py-6">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { val: countdown.days, label: "Days" },
                    { val: countdown.hours, label: "Hours" },
                    { val: countdown.minutes, label: "Mins" },
                    { val: countdown.seconds, label: "Secs" },
                  ].map(({ val, label }) => (
                    <div key={label} className="text-center">
                      <div
                        className="text-3xl font-bold rounded-lg py-2"
                        style={{
                          fontFamily: "'Crimson Pro', serif",
                          color: "#008751",
                          backgroundColor: "#f0fdf4",
                        }}
                      >
                        {String(val).padStart(2, "0")}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Election Day</p>
                  <p className="font-bold text-gray-800">July 15, 2026</p>
                  <p className="text-xs text-gray-500">8:00 AM WAT</p>
                </div>
                <Link
                  href="/candidates"
                  className="mt-4 flex items-center justify-center gap-1 w-full py-2.5 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: "#008751" }}
                >
                  Meet the Candidates
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave (unchanged) */}
        <div className="absolute border-0 bottom-0 left-0 right-0" style={{ zIndex: 6 }}>
          <svg viewBox="0 0 1440 60" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-12 bg-white border-b" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value={5000000} suffix="+" label="Student Members" delay={0} />
            <StatCard value={200} suffix="+" label="Tertiary Institutions" delay={200} />
            <StatCard value={6} suffix="" label="Geopolitical Zones" delay={400} />
            <StatCard value={68} suffix="+" label="Years of Service" delay={600} />
          </div>
        </div>
      </section>

      {/* ── About snippet ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: "#008751" }}
              >
                Who We Are
              </span>
              <h2
                className="text-4xl font-bold text-gray-900 mb-5 leading-tight"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                Nigeria's Apex
                <br />Student Organisation
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded in 1956, the National Association of Nigerian Students (NANS) is the umbrella body uniting all student unions across Nigerian universities, polytechnics, and colleges. NANS is the recognised voice of Nigerian students before the Federal Government, state governments, and international bodies.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Through its six zonal structures, NANS coordinates student advocacy, monitors educational policies, and champions the rights, welfare, and academic interests of over five million students across Nigeria.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-semibold text-sm transition-colors hover:gap-3"
                style={{ color: "#008751" }}
              >
                Read NANS History & Structure
                <span>→</span>
              </Link>
            </div>

            {/* Zones grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { zone: "Zone A", region: "Northwest", states: "Kano, Kaduna, Sokoto..." },
                { zone: "Zone B", region: "Northeast", states: "Borno, Adamawa, Gombe..." },
                { zone: "Zone C", region: "Northcentral", states: "Abuja, Plateau, Benue..." },
                { zone: "Zone D", region: "Southeast", states: "Enugu, Anambra, Imo..." },
                { zone: "Zone E", region: "Southwest", states: "Lagos, Oyo, Osun..." },
                { zone: "Zone F", region: "Southsouth", states: "Rivers, Delta, Akwa Ibom..." },
              ].map((z, i) => (
                <div
                  key={z.zone}
                  className="rounded-xl p-4 border transition-all hover:shadow-md hover:-translate-y-0.5"
                  style={{
                    borderColor: "#d4eadb",
                    backgroundColor: i % 2 === 0 ? "#f6fcf8" : "white",
                  }}
                >
                  <span
                    className="text-xs font-bold rounded px-2 py-0.5 mb-2 inline-block text-white"
                    style={{ backgroundColor: "#008751" }}
                  >
                    {z.zone}
                  </span>
                  <p className="font-semibold text-gray-800 text-sm">{z.region}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{z.states}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Election Spotlight ── */}
      <section className="py-20 relative">
         {/* ── CAROUSEL LAYER ── */}
        {[
          "/images/vote1.jpg",
          "/images/vote2.jpg",
        ].map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${src})`,
              backgroundAttachment: "fixed",
              opacity: i === activeSlide ? 1 : 0,
              transition: "opacity 1.2s ease-in-out",
              zIndex: 0,
            }}
          />
        ))}
          {/* Overlay */}
          <div className="w-full h-full absolute top-0 left-0 opacity-60 bg-green-900 z-40" />
        <div className="max-w-7xl relative mx-auto z-50 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3 text-green-200"
            >
              2026 General Elections
            </span>
            <h2
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "'Crimson Pro', serif" }}
            >
              NANS Electoral Processes
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🗳️",
                title: "Election Overview",
                desc: "Complete rules, process, eligibility criteria, and guidelines for the 2026 NANS Presidential Election.",
                path: "/election-overview",
                cta: "View Details",
              },
              {
                icon: "👤",
                title: "Candidates",
                desc: "Profiles of all contesting Presidential and Senate candidates, their manifestos and academic backgrounds.",
                path: "/candidates",
                cta: "View Candidates",
              },
              {
                icon: "📅",
                title: "Election Schedule",
                desc: "Full timeline of the electoral calendar from nomination to final declaration of results.",
                path: "/election-schedule",
                cta: "View Schedule",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-7 border shadow-sm hover:shadow-lg transition-all group hover:-translate-y-1"
                style={{ borderColor: "#d4eadb" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                  style={{ backgroundColor: "#e8f5ee" }}
                >
                  {item.icon}
                </div>
                <h3
                  className="font-bold text-gray-900 text-xl mb-3"
                  style={{ fontFamily: "'Crimson Pro', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{item.desc}</p>
                <Link
                  href={item.path}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                  style={{ color: "#008751" }}
                >
                  {item.cta} <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── News + ICPC ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* News */}
            <div className="lg:col-span-3">
              <span
                className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: "#008751" }}
              >
                Latest News
              </span>
              <h2
                className="text-3xl font-bold text-gray-900 mb-8"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                NANS Announcements
              </h2>
              <div className="space-y-5">
                <NewsItem
                  tag="JCC"
                  date="June 10, 2026"
                  title="JCC Approves 2026 Electoral Guidelines and New Voter Registration Begins"
                  excerpt="The NANS Joint Consultative Council has ratified the updated electoral guidelines for the 2026 general elections, with voter registration commencing June 20."
                />
                <NewsItem
                  tag="EDU"
                  date="May 28, 2026"
                  title="NANS Meets Education Minister on ASUU Strike Resolution & Funding"
                  excerpt="The NANS National Executive Council held a productive session with the Honourable Minister of Education on the resolution of outstanding ASUU issues."
                />
                <NewsItem
                  tag="ICPC"
                  date="May 15, 2026"
                  title="NANS-ICPC Anti-Corruption Vanguard Expands to 50 New Campuses"
                  excerpt="The partnership programme aimed at promoting integrity and transparency in student governance has been extended to fifty additional tertiary institutions nationwide."
                />
                <NewsItem
                  tag="WLF"
                  date="April 30, 2026"
                  title="NANS Student Welfare Summit 2026, Registration Now Open"
                  excerpt="The annual student welfare summit brings together student union leaders, university management, and government officials to address pressing welfare concerns."
                />
              </div>
            </div>

            {/* ICPC highlight */}
            <div className="lg:col-span-2">
              <div
                className="rounded-2xl overflow-hidden border h-full flex flex-col"
                style={{ borderColor: "#d4eadb" }}
              >
                <div
                  className="px-6 py-5 text-white"
                  style={{
                    background: "linear-gradient(135deg, #005c37, #008751)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src="/icpc-logo.jpg" alt={`logo`} className="w-14 rounded-full h-14 object-contain" />
                    <div>
                      <p className="font-bold text-sm">NANS–ICPC</p>
                      <p className="text-green-200 text-xs">Anti-Corruption Partnership</p>
                    </div>
                  </div>
                  <h3
                    className="text-xl font-bold leading-snug"
                    style={{ fontFamily: "'Crimson Pro', serif" }}
                  >
                    Building Integrity in Nigerian Student Governance
                  </h3>
                </div>
                <div className="p-6 flex-1" style={{ backgroundColor: "#f8fdf9" }}>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    NANS partners with the Independent Corrupt Practices and Other Related Offences Commission (ICPC) to embed a culture of transparency, accountability, and zero tolerance for corruption across Nigerian campuses.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Anti-Corruption Vanguards on 200+ campuses",
                      "Annual Integrity Awards for student unions",
                      "Campus Ethics Awareness Campaigns",
                      "Transparent Election Monitoring Framework",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: "#008751" }}
                        >
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/nans-icpc"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90"
                    style={{ backgroundColor: "#008751" }}
                  >
                    Learn About NANS-ICPC
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
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
            Your Vote Shapes Student Governance
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Every eligible student has a voice. Participate in the 2026 NANS Elections and help elect leaders who will champion student welfare and educational excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/election-overview"
              className="px-8 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105"
              style={{ backgroundColor: "#C8A000", color: "#1a1500" }}
            >
              Voter Information
            </Link>
            <Link
              href="/candidates"
              className="px-8 py-3 rounded-lg font-semibold text-sm border border-white text-white hover:bg-white hover:text-green-800 transition-all"
            >
              View All Candidates
            </Link>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Home;