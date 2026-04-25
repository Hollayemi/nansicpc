"use client";
import React, { useState, useEffect, useCallback } from "react";
import Wrapper from "../components/wrapper";
import Link from "next/link";
import { BiMapPin, BiSearch } from "react-icons/bi";
import { RiSchoolFill } from "react-icons/ri";
import { ZONES } from "../components/data";



const ZONE_COLORS: Record<string, string> = {
  "Zone A (Northwest)": "#006B3E",
  "Zone B (Southsouth)": "#007A45",
  "Zone C (Northcentral)": "#008751",
  "Zone D (Southwest)": "#00A96A",
  "Zone E (Northeast)": "#009B5E",
  "Zone F (Southeast)": "#00BF76",
};

interface Delegate {
  _id: string;
  fullName: string;
  institution: string;
  passportPhotoUrl:string;
  position: string;
  zone: string;
  state: string;
  phone?: string;
  registeredAt: string;
}


const DelegateCard: React.FC<{ delegate: Delegate; index: number }> = ({ delegate: d, index }) => {
  const color = ZONE_COLORS[d.zone] ?? "#008751";
  return (
    <div
      className="bg-white rounded-2xl border overflow-hidden hover:shadow-md transition-all group"
      style={{ borderColor: "#d4eadb", animationDelay: `${index * 30}ms` }}
    >
      <div className="h-1" style={{ backgroundColor: color }} />
      <div className="p-5 flex items-start gap-4">
        <img
          src={d.passportPhotoUrl}
          alt={d.fullName}
          className="w-16 h-16 rounded-full object-cover border-2 border-white/40 flex-shrink-0 cursor-pointer hover:border-white transition-all"
          title="Click to enlarge"
        />
        <div className="flex-1 min-w-0">
          <p
            className="font-bold text-gray-900 leading-snug mb-0.5"
            style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1rem" }}
          >
            {d.fullName}
          </p>
          <p className="text-xs font-semibold mb-2" style={{ color }}>
            {d.position}
          </p>
          <div
            className="rounded-lg p-2.5 space-y-1 text-xs"
            style={{ backgroundColor: "#f8fdf9" }}
          >
            <div className="flex items-start gap-2">
              <span className="text-gray-400 flex-shrink-0 mt-0.5"><RiSchoolFill /></span>
              <span className="text-gray-700 font-medium truncate">{d.institution}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 flex-shrink-0"><BiMapPin /></span>
              <span className="text-gray-500">{d.state} · {d.zone}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Registered: {new Date(d.registeredAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  );
};

const DelegatesPage: React.FC = () => {
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [zoneFilter, setZoneFilter] = useState("all");

  const fetchDelegates = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (zoneFilter !== "all") params.set("zone", zoneFilter);
      if (search) params.set("search", search);
      const res = await fetch(`/api/delegates?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDelegates(data.delegates);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [search, zoneFilter]);

  useEffect(() => {
    fetchDelegates();
  }, [fetchDelegates]);

  // Stats per zone
  const byZone = ZONES.reduce<Record<string, number>>((acc, z) => {
    acc[z] = delegates.filter((d) => d.zone === z).length;
    return acc;
  }, {});

  return (
    <Wrapper>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#008751" }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 30px)" }}
        />
        <div
          className="absolute right-0 bottom-0 text-white opacity-5 font-bold leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(80px,18vw,220px)", fontFamily: "'Crimson Pro',serif" }}
        >
          DEL
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <p className="text-green-200 text-sm font-medium mb-2">2026 NANS Convention</p>
          <h1 className="text-5xl sm:text-6xl font-bold mb-4" style={{ fontFamily: "'Crimson Pro', serif" }}>
            Accredited Delegates
          </h1>
          <p className="text-green-100 text-lg max-w-xl leading-relaxed mb-6">
            University presidents and student union leaders accredited to participate in the 2026 NANS National Convention.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div
              className="px-5 py-3 rounded-xl text-white font-bold text-3xl"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", fontFamily: "'Crimson Pro', serif" }}
            >
              {delegates.length}
              <span className="text-lg font-medium text-green-200 ml-2">delegates registered</span>
            </div>
            <Link
              href="/accreditation"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ backgroundColor: "#C8A000", color: "#1a1500" }}
            >
              Register as Delegate →
            </Link>
          </div>
          <div className="flex gap-2 mt-6 text-sm text-green-200">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Accredited Delegates</span>
          </div>
        </div>
      </section>

      {/* Zone breakdown */}
      <section className="py-8 bg-white border-b" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {ZONES.map((z) => {
              const color = ZONE_COLORS[z];
              const short = z.replace("Zone ", "").split(" ")[0];
              return (
                <button
                  key={z}
                  onClick={() => setZoneFilter(zoneFilter === z ? "all" : z)}
                  className="text-center py-3 px-2 rounded-xl border transition-all hover:shadow-sm cursor-pointer"
                  style={{
                    borderColor: zoneFilter === z ? color : "#d4eadb",
                    backgroundColor: zoneFilter === z ? color + "15" : "white",
                  }}
                >
                  <p
                    className="text-lg font-bold"
                    style={{ fontFamily: "'Crimson Pro', serif", color }}
                  >
                    {byZone[z] ?? 0}
                  </p>
                  <p className="text-xs font-semibold text-gray-600">{short}</p>
                  <p className="text-xs text-gray-400 leading-tight">{z.split("(")[1]?.replace(")", "") ?? ""}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-5 bg-white border-b sticky top-[83px] z-40" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center gap-4 justify-between">
          <div className="relative min-w-[240px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><BiSearch /></span>
            <input
              type="text"
              placeholder="Search delegate, institution, state…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-black pl-9 pr-4 py-2.5 text-sm border rounded-xl focus:outline-none"
              style={{ borderColor: "#d4eadb" }}
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setZoneFilter("all")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all ${zoneFilter === "all" ? "text-white border-transparent" : "text-gray-600 border-gray-200 hover:border-green-300"}`}
              style={zoneFilter === "all" ? { backgroundColor: "#008751" } : {}}
            >
              All Zones
            </button>
            {ZONES.map((z) => {
              const color = ZONE_COLORS[z];
              const short = "Zone " + z.split(" ")[1];
              return (
                <button
                  key={z}
                  onClick={() => setZoneFilter(zoneFilter === z ? "all" : z)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all`}
                  style={{
                    borderColor: zoneFilter === z ? color : "#e0ede0",
                    backgroundColor: zoneFilter === z ? color + "18" : "white",
                    color: zoneFilter === z ? color : "#6b7280",
                  }}
                >
                  {short}
                </button>
              );
            })}
          </div>
          <p className="text-sm text-gray-500 ml-auto">
            <strong>{delegates.length}</strong> delegate{delegates.length !== 1 ? "s" : ""}
            {zoneFilter !== "all" && <span className="text-gray-400"> in {zoneFilter}</span>}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12" style={{ backgroundColor: "#f8fdf9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-20 text-center">
              <svg className="animate-spin w-8 h-8 mx-auto mb-3" style={{ color: "#008751" }} fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <p className="text-sm text-gray-400">Loading delegates…</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3">⚠️</p>
              <p className="text-red-500 font-medium text-sm">{error}</p>
            </div>
          ) : delegates.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-5xl mb-4">🏛️</p>
              <p className="text-gray-600 font-medium text-lg mb-2">No delegates registered yet</p>
              <p className="text-gray-400 text-sm mb-6">
                {search ? "No delegates match your search." : "Delegates will appear here once they complete accreditation."}
              </p>
              {search ? (
                <button onClick={() => setSearch("")} className="text-sm font-semibold underline" style={{ color: "#008751" }}>
                  Clear search
                </button>
              ) : (
                <Link
                  href="/accreditation"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl"
                  style={{ backgroundColor: "#008751" }}
                >
                  Register as Delegate →
                </Link>
              )}
            </div>
          ) : (
            <>
              {zoneFilter === "all" ? (
                /* Grouped by zone */
                ZONES.filter((z) => (byZone[z] ?? 0) > 0).map((z) => {
                  const color = ZONE_COLORS[z];
                  const zDelegates = delegates.filter((d) => d.zone === z);
                  return (
                    <div key={z} className="mb-12">
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className="px-4 py-1.5 rounded-full text-white text-xs font-bold"
                          style={{ backgroundColor: color }}
                        >
                          {z}
                        </div>
                        <div className="flex-1 h-px" style={{ backgroundColor: "#e0ede0" }} />
                        <span className="text-xs text-gray-400">{zDelegates.length} delegate{zDelegates.length !== 1 ? "s" : ""}</span>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {zDelegates.map((d, idx) => (
                          <DelegateCard key={d._id} delegate={d} index={idx} />
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {delegates.map((d, idx) => (
                    <DelegateCard key={d._id} delegate={d} index={idx} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white border-t" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-xl text-gray-900" style={{ fontFamily: "'Crimson Pro', serif" }}>
              Is your institution not listed?
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Contact your JCC Chairman or the ICPC Secretariat to obtain your accreditation code.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/accreditation"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-lg"
              style={{ backgroundColor: "#008751" }}
            >
              Register Now →
            </Link>
            <Link
              href="/election-schedule"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg border"
              style={{ borderColor: "#008751", color: "#008751" }}
            >
              Convention Schedule
            </Link>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default DelegatesPage;
