"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   NAV STRUCTURE
───────────────────────────────────────────────────────────────────────────── */
interface NavChild {
  name: string;
  path: string;
  description?: string;
  badge?: string;
}

interface NavItem {
  name: string;
  path?: string;
  children?: NavChild[];
  description?: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About NANS", path: "/about", description: "History, mission & structure" },
  { name: "NANS-ICPC", path: "/nans-icpc", description: "Convention Planning Committee", badge: "LIVE" },
  { name: "Our Partners", path: "/partners", description: "Government & institutional allies" },
  // {
  //   name: "About",
  //   children: [
  //   ],
  // },
  {
    name: "Elections",
    children: [
      { name: "Election Overview", path: "/election-overview", description: "Rules, process & eligibility" },
      { name: "Candidates", path: "/candidates", description: "Presidential & Senate profiles" },
      { name: "Election Schedule", path: "/election-schedule", description: "Full electoral calendar" },
    ],
  },
  {
    name: "Media",
    children: [
      { name: "News & Updates", path: "/news", description: "Official announcements" },
      { name: "Gallery", path: "/gallery", description: "Photos & visual archive" },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   HAMBURGER ICON
───────────────────────────────────────────────────────────────────────────── */
const MenuIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <div className="w-5 h-4 flex flex-col justify-between">
    <span
      className={`block h-0.5 bg-current origin-center transition-all duration-300 ${
        open ? "rotate-45 translate-y-[7px]" : ""
      }`}
    />
    <span
      className={`block h-0.5 bg-current transition-all duration-300 ${
        open ? "opacity-0 scale-x-0" : ""
      }`}
    />
    <span
      className={`block h-0.5 bg-current origin-center transition-all duration-300 ${
        open ? "-rotate-45 -translate-y-[7px]" : ""
      }`}
    />
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   DESKTOP DROPDOWN ITEM
───────────────────────────────────────────────────────────────────────────── */
const DropdownItem: React.FC<{ item: NavItem; isActive: (p: string) => boolean }> = ({
  item,
  isActive,
}) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  // Plain link — no children
  if (!item.children) {
    return (
      <Link
        href={item.path!}
        className={`relative px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
          isActive(item.path!)
            ? "text-white"
            : "text-gray-700 hover:text-green-700 hover:bg-green-50"
        }`}
        style={isActive(item.path!) ? { backgroundColor: "#008751" } : {}}
      >
        {item.name}
        {isActive(item.path!) && (
          <span
            className="absolute -bottom-[3px] left-0 w-full h-[3px]"
            style={{ backgroundColor: "#C8A000" }}
          />
        )}
      </Link>
    );
  }

  const anyChildActive = item.children.some((c) => isActive(c.path));

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger button */}
      <button
        className={`relative flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
          anyChildActive
            ? "text-white"
            : "text-gray-700 hover:text-green-700 hover:bg-green-50"
        }`}
        style={anyChildActive ? { backgroundColor: "#008751" } : {}}
      >
        {item.name}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        {anyChildActive && (
          <span
            className="absolute -bottom-[3px] left-0 w-full h-[3px]"
            style={{ backgroundColor: "#C8A000" }}
          />
        )}
      </button>

      {/* Dropdown panel */}
      <div
        className="absolute top-full left-0 mt-2 rounded-xl border shadow-xl overflow-hidden transition-all duration-200 origin-top"
        style={{
          minWidth: "240px",
          borderColor: "#d4eadb",
          backgroundColor: "white",
          zIndex: 300,
          opacity: open ? 1 : 0,
          transform: open ? "scaleY(1) translateY(0)" : "scaleY(0.95) translateY(-4px)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Accent line */}
        <div
          className="h-0.5 w-full"
          style={{ background: "linear-gradient(90deg, #008751, #C8A000)" }}
        />
        <div className="py-2">
          {item.children.map((child) => (
            <Link
              key={child.path}
              href={child.path}
              className={`flex items-start gap-3 px-4 py-3 transition-colors group ${
                isActive(child.path) ? "bg-green-50" : "hover:bg-gray-50"
              }`}
            >
              <span
                className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                  isActive(child.path)
                    ? ""
                    : "bg-gray-200 group-hover:bg-green-400"
                }`}
                style={isActive(child.path) ? { backgroundColor: "#008751" } : {}}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-semibold ${
                      isActive(child.path)
                        ? ""
                        : "text-gray-800 group-hover:text-green-700"
                    }`}
                    style={isActive(child.path) ? { color: "#008751" } : {}}
                  >
                    {child.name}
                  </span>
                  {child.badge && (
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: "#C8A000" }}
                    >
                      {child.badge}
                    </span>
                  )}
                </div>
                {child.description && (
                  <p className="text-xs text-gray-400 mt-0.5">{child.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN HEADER
───────────────────────────────────────────────────────────────────────────── */
const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* ── Government top bar ── */}
      <div style={{ backgroundColor: "#005c37" }} className="text-white py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
            <span className="font-medium tracking-wide">Federal Republic of Nigeria</span>
            <span className="text-green-300 hidden sm:inline">|</span>
            <span className="text-green-200 hidden sm:inline">
              National Association of Nigerian Students
            </span>
          </div>
          <div className="flex items-center gap-3 text-green-200">
            <span
              className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-[10px] font-bold"
              style={{ backgroundColor: "#C8A000" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              ICPC Convention Active
            </span>
            <span className="hidden sm:inline text-green-300">|</span>
            <span>📧 info@nans.org.ng</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">📞 +234 (0) 800 NANS</span>
          </div>
        </div>
      </div>

      {/* ── Main header ── */}
      <header
        className={`bg-white sticky top-0 transition-all duration-300 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
        style={{ borderBottom: "3px solid #008751", zIndex: 200 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <img
                src="/images/logo.png"
                alt="NANS Logo"
                className="w-14 h-14 rounded-full flex-shrink-0"
              />
              <div>
                <p
                  className="font-bold text-xl leading-tight tracking-wide"
                  style={{ fontFamily: "'Crimson Pro', serif", color: "#008751" }}
                >
                  N·A·N·S
                </p>
                <p className="text-gray-500 text-xs font-medium leading-tight max-w-[180px]">
                  National Association of Nigerian Students
                </p>
              </div>
            </Link>

            {/* ── Desktop dropdown nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <DropdownItem key={item.name} item={item} isActive={isActive} />
              ))}
            </nav>

            {/* ── Right side ── */}
            <div className="flex items-center gap-3">
              <Link
                href="/candidates"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: "#C8A000" }}
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse inline-block" />
                View Candidates
              </Link>

              {/* Hamburger */}
              <button
                className="lg:hidden p-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                <MenuIcon open={mobileOpen} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile menu — full listing, grouped ── */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: mobileOpen ? "900px" : "0px",
            opacity: mobileOpen ? 1 : 0,
            borderTop: mobileOpen ? "1px solid #e5e7eb" : "none",
          }}
        >
          <div className="bg-gray-50 px-4 pt-4 pb-5 space-y-4">
            {navItems.map((item) => {
              // Home — single link
              if (!item.children) {
                return (
                  <Link
                    key={item.path}
                    href={item.path!}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive(item.path!)
                        ? "text-white"
                        : "text-gray-700 hover:bg-white hover:text-green-700"
                    }`}
                    style={isActive(item.path!) ? { backgroundColor: "#008751" } : {}}
                  >
                    {isActive(item.path!) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                    )}
                    {item.name}
                  </Link>
                );
              }

              // Group with children
              return (
                <div key={item.name}>
                  {/* Group label */}
                  <p
                    className="text-[10px] font-bold tracking-[0.18em] uppercase px-3 mb-1.5"
                    style={{ color: "#008751" }}
                  >
                    {item.name}
                  </p>

                  {/* Bordered group container */}
                  <div
                    className="rounded-xl overflow-hidden border"
                    style={{ borderColor: "#d4eadb" }}
                  >
                    {item.children.map((child, i) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className={`flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                          i !== item.children!.length - 1
                            ? "border-b"
                            : ""
                        } ${
                          isActive(child.path)
                            ? "text-white font-semibold"
                            : "text-gray-700 font-medium bg-white hover:bg-green-50 hover:text-green-700"
                        }`}
                        style={{
                          borderColor: "#e9f0e9",
                          ...(isActive(child.path) ? { backgroundColor: "#008751" } : {}),
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              isActive(child.path) ? "bg-yellow-300" : ""
                            }`}
                            style={
                              !isActive(child.path) ? { backgroundColor: "#008751", opacity: 0.4 } : {}
                            }
                          />
                          <div>
                            <span>{child.name}</span>
                            {child.description && (
                              <p
                                className={`text-xs mt-0.5 ${
                                  isActive(child.path) ? "text-green-200" : "text-gray-400"
                                }`}
                              >
                                {child.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {child.badge && (
                          <span
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white flex-shrink-0"
                            style={{ backgroundColor: isActive(child.path) ? "rgba(255,255,255,0.25)" : "#C8A000" }}
                          >
                            {child.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* CTA */}
            <div className="pt-1">
              <Link
                href="/candidates"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: "#C8A000" }}
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                View Election Candidates
              </Link>
            </div>

          </div>
        </div>
      </header>
    </>
  );
};

export default Header;