import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const NANSEmblem: React.FC = () => (
  <div
    className="w-14 h-14 rounded-full flex items-center justify-center border-2 flex-shrink-0"
    style={{
      background: "linear-gradient(135deg, #008751 60%, #006b3f)",
      borderColor: "#C8A000",
    }}
  >
    <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
      <circle cx="20" cy="20" r="18" fill="none" stroke="#C8A000" strokeWidth="1.5" />
      <path d="M20 6 L22 14 L30 14 L24 19 L26 27 L20 22 L14 27 L16 19 L10 14 L18 14 Z" fill="#C8A000" />
      <path d="M10 28 Q20 34 30 28" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

const MenuIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <div className="w-6 h-5 flex flex-col justify-between cursor-pointer">
    <span
      className={`block h-0.5 bg-current transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-2.5" : ""}`}
    />
    <span
      className={`block h-0.5 bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`}
    />
    <span
      className={`block h-0.5 bg-current transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-2" : ""}`}
    />
  </div>
);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About NANS", path: "/about" },
  { name: "NANS-ICPC", path: "/nans-icpc" },
  { name: "Election Overview", path: "/election-overview" },
  // { name: "Candidates", path: "/candidates" },
  { name: "Election Schedule", path: "/election-schedule" },
  { name: "News", path: "/news" },
  { name: "Partners", path: "/partners" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Government top bar */}
      <div style={{ backgroundColor: "#005c37" }} className="text-white py-1.5 px-4 z-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
            <span className="font-medium tracking-wide">Federal Republic of Nigeria</span>
            <span className="text-green-300 hidden sm:inline">|</span>
            <span className="text-green-200 hidden sm:inline">National Association of Nigerian Students</span>
          </div>
          <div className="flex items-center gap-3 text-green-200">
            <span>📧 info@nans.org.ng</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">📞 +234 (0) 800 NANS</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`bg-white sticky top-0 z-500 transition-all duration-300 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
        style={{ borderBottom: "3px solid #008751" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              {/* <NANSEmblem /> */}
              <img src="/images/logo.png" alt="NANS Emblem" className="w-14 h-14 rounded-full flex-shrink-0" />
              <div>
                <p
                  className="font-bold text-xl leading-tight tracking-wide"
                  style={{
                    fontFamily: "'Crimson Pro', serif",
                    color: "#008751",
                  }}
                >
                  N·A·N·S
                </p>
                <p className="text-gray-500 text-xs font-medium leading-tight max-w-[180px]">
                  National Association of Nigerian Students
                </p>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive(link.path)
                      ? "text-white"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                  }`}
                  style={
                    isActive(link.path)
                      ? { backgroundColor: "#008751" }
                      : {}
                  }
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span
                      className="absolute -bottom-[3px] left-0 w-full h-[3px]"
                      style={{ backgroundColor: "#C8A000" }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Election CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/candidates"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: "#C8A000" }}
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse inline-block" />
                View Candidates
              </Link>

              <button
                className="lg:hidden p-2 text-gray-700"
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                <MenuIcon open={isMenuOpen} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ borderTop: "1px solid #e5e7eb" }}
        >
          <div className="px-4 py-3 space-y-1 bg-gray-50">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-white"
                    : "text-gray-700 hover:bg-white hover:text-green-700"
                }`}
                style={
                  isActive(link.path) ? { backgroundColor: "#008751" } : {}
                }
              >
                {isActive(link.path) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                )}
                {link.name}
              </Link>
            ))}
            <div className="pt-2 pb-1">
              <Link
                href="/candidates"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white rounded-lg"
                style={{ backgroundColor: "#C8A000" }}
              >
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