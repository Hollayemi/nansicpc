import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About NANS", path: "/about" },
    { name: "NANS-ICPC", path: "/nans-icpc" },
    { name: "Election Overview", path: "/election-overview" },
    { name: "Candidates", path: "/candidates" },
    { name: "Election Schedule", path: "/election-schedule" },
    { name: "News & Updates", path: "/news" },
    { name: "Our Partners", path: "/partners" },
  ];

  const zones = [
    "Zone A (Northwest)",
    "Zone B (Northeast)",
    "Zone C (Northcentral)",
    "Zone D (Southeast)",
    "Zone E (Southwest)",
    "Zone F (Southsouth)",
  ];

  return (
    <footer>
      {/* Nigerian flag stripe */}
      <div className="flex h-1.5">
        <div className="w-1/3" style={{ backgroundColor: "#008751" }} />
        <div className="w-1/3 bg-white border-y border-gray-200" />
        <div className="w-1/3" style={{ backgroundColor: "#008751" }} />
      </div>

      {/* Main footer */}
      <div style={{ backgroundColor: "#0a1f0a" }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/logo.png" alt="NANS Emblem" className="w-14 h-14 rounded-full flex-shrink-0 bg-white" />
                <div>
                  <p className="font-bold text-lg tracking-widest" style={{ fontFamily: "'Crimson Pro', serif", color: "#C8A000" }}>
                    N·A·N·S
                  </p>
                  <p className="text-green-300 text-xs">Est. 1956 · Abuja, Nigeria</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                The apex student body in Nigeria, representing over 5 million students across 6 geopolitical zones and 200+ tertiary institutions.
              </p>
              <div className="flex gap-3">
                {["f", "t", "in", "yt"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white transition-colors hover:opacity-80"
                    style={{ backgroundColor: "#008751" }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4
                className="font-bold text-sm tracking-[0.15em] uppercase mb-5 pb-2"
                style={{
                  color: "#C8A000",
                  borderBottom: "1px solid rgba(200,160,0,0.3)",
                }}
              >
                Quick Navigation
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span
                        className="w-1 h-1 rounded-full group-hover:w-2 transition-all flex-shrink-0"
                        style={{ backgroundColor: "#008751" }}
                      />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Zones */}
            <div>
              <h4
                className="font-bold text-sm tracking-[0.15em] uppercase mb-5 pb-2"
                style={{
                  color: "#C8A000",
                  borderBottom: "1px solid rgba(200,160,0,0.3)",
                }}
              >
                NANS Zones
              </h4>
              <ul className="space-y-2.5">
                {zones.map((zone) => (
                  <li key={zone} className="text-gray-400 text-sm flex items-start gap-2">
                    <span
                      className="w-4 h-4 rounded-sm flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#008751" }}
                    >
                      NG
                    </span>
                    {zone}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="font-bold text-sm tracking-[0.15em] uppercase mb-5 pb-2"
                style={{
                  color: "#C8A000",
                  borderBottom: "1px solid rgba(200,160,0,0.3)",
                }}
              >
                Contact NANS
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <span style={{ color: "#008751" }} className="text-base flex-shrink-0">📍</span>
                  <span className="text-gray-400">
                    NANS National Secretariat,<br />
                    Plot 1005, Adekunle Fajuyi Way,<br />
                    Garki II, Abuja, FCT.
                  </span>
                </li>
                <li className="flex gap-3 items-center">
                  <span style={{ color: "#008751" }} className="flex-shrink-0">📧</span>
                  <a href="mailto:info@nans.org.ng" className="text-gray-400 hover:text-white transition-colors">
                    info@nans.org.ng
                  </a>
                </li>
                <li className="flex gap-3 items-center">
                  <span style={{ color: "#008751" }} className="flex-shrink-0">📞</span>
                  <span className="text-gray-400">+234 (0) 806 000 NANS</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span style={{ color: "#008751" }} className="flex-shrink-0">🕐</span>
                  <span className="text-gray-400">
                    Mon – Fri: 8:00am – 5:00pm<br />
                    <span className="text-green-500 text-xs">Closed on Public Holidays</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ICPC notice strip */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", backgroundColor: "#061506" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center gap-2">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ backgroundColor: "#008751", color: "white" }}
            >
              ICPC
            </span>
            <p className="text-gray-500 text-xs">
              The Independent Convention Planning Committee is currently managing the 2026 NANS National Convention.
            </p>
            <Link
              href="/nans-icpc"
              className="text-xs font-semibold flex-shrink-0"
              style={{ color: "#C8A000" }}
            >
              Learn more →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-xs text-center sm:text-left">
              © {new Date().getFullYear()} National Association of Nigerian Students (NANS). All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-gray-400 transition-colors">Terms of Use</a>
              <span>|</span>
              <a href="#" className="hover:text-gray-400 transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
