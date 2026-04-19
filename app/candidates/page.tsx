"use client"
import React, { useState } from "react";
import Wrapper from "../components/wrapper";
import Link from "next/link";
import { FaNoteSticky } from "react-icons/fa6";

interface Candidate {
  id: number;
  name: string;
  position: string;
  positionCategory: "executive" | "senate_secretariat";
  institution: string;
  zone: string;
  department: string;
  level: string;
  status: "cleared" | "pending" | "disqualified";
  manifesto: string[];
  bio: string;
  initials: string;
  color: string;
  formNo?: string;
}

// All executive positions from NANS Constitution Article 9
const EXECUTIVE_POSITIONS = [
  "National President",
  "Vice President (National Affairs)",
  "Vice President (External Affairs)",
  "Vice President (Special Duties)",
  "Vice President (Inter Campus Affairs)",
  "Secretary-General",
  "Assistant Secretary-General",
  "Financial Secretary",
  "Public Relations Officer",
  "Treasurer",
  "Director of Travels and Exchange",
  "Director of Sports",
  "Director of Action and Mobilization",
  "Ex-Officio 1 (Non-Elective)",
  "Ex-Officio 2 (Female)",
];

// Senate Secretariat Positions
const SENATE_SECRETARIAT_POSITIONS = [
  "Senate President",
  "Deputy Senate President",
  "Clerk of the House",
];

// Position color mapping
const getPositionColor = (position: string): string => {
  if (position === "National President") return "#C8A000";
  if (position === "Senate President") return "#C8A000";
  if (position === "Vice President (National Affairs)") return "#008751";
  if (position === "Vice President (External Affairs)") return "#008751";
  if (position === "Vice President (Special Duties)") return "#008751";
  if (position === "Vice President (Inter Campus Affairs)") return "#008751";
  if (["Secretary-General", "Assistant Secretary-General", "Financial Secretary", "Public Relations Officer", "Treasurer"].includes(position)) return "#4b5563";
  if (["Director of Travels and Exchange", "Director of Sports", "Director of Action and Mobilization"].includes(position)) return "#6B21A5";
  if (position === "Deputy Senate President") return "#4b5563";
  if (position === "Clerk of the House") return "#4b5563";
  return "#9E9E9E";
};

const candidates: Candidate[] = [
  // ==================== ZONE A (North-West) ====================
  { id: 1, name: "Isa Ali", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Jigawa State", zone: "North-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "IA", color: "#008751", formNo: "12" },
  { id: 2, name: "Abdulganiyyu Shehu Ɗalhatu", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Kano State", zone: "North-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "AŞ", color: "#008751", formNo: "24" },
  { id: 3, name: "Mubarak Usman U", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Kano State", zone: "North-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "MU", color: "#008751", formNo: "26" },
  { id: 4, name: "Umar Suleiman", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Kaduna State", zone: "North-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "US", color: "#008751", formNo: "31" },
  { id: 5, name: "Jibrin Ya'u", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Jigawa State", zone: "North-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "JY", color: "#008751", formNo: "32" },
  { id: 6, name: "Sadiq SK Zango", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Kebbi State", zone: "North-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "SZ", color: "#008751", formNo: "50" },
  { id: 7, name: "Bilal Lawan Kurfi", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Katsina State", zone: "North-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "BK", color: "#008751", formNo: "57" },
  { id: 8, name: "Mahmud Bashir Sa'id", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Kano State", zone: "North-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "MS", color: "#008751", formNo: "61" },
  { id: 9, name: "Muhammad Aliyu Garkuwa", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Sokoto State", zone: "North-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "MG", color: "#008751", formNo: "62" },
  { id: 10, name: "Umar Hamisu Almu", position: "Director of Travels and Exchange", positionCategory: "executive", institution: "Katsina State", zone: "North-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "UA", color: "#6B21A5", formNo: "66" },
  { id: 11, name: "Lois Erland", position: "Director of Travels and Exchange", positionCategory: "executive", institution: "Kaduna State", zone: "North-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "LE", color: "#6B21A5", formNo: "39" },
  { id: 12, name: "Saminu Ibrahim", position: "Director of Travels and Exchange", positionCategory: "executive", institution: "Kano State", zone: "North-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "SI", color: "#6B21A5", formNo: "65" },

  // ==================== ZONE B (South-South) ====================
  { id: 13, name: "Eanest Nkereuwem Etim", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Akwa-Ibom State", zone: "South-South", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "EE", color: "#008751", formNo: "10" },
  { id: 14, name: "Patience Okoroafor", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Akwa-Ibom State", zone: "South-South", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "PO", color: "#008751", formNo: "13" },
  { id: 15, name: "Frank Ahamefula", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Rivers State", zone: "South-South", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "FA", color: "#008751", formNo: "36" },
  { id: 16, name: "Jokiel Gideon", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Rivers State", zone: "South-South", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "JG", color: "#008751", formNo: "47" },
  { id: 17, name: "David Bariereka", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Rivers State", zone: "South-South", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "DB", color: "#008751", formNo: "48" },
  { id: 18, name: "Ojumoola Timileyin", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Edo State", zone: "South-South", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "OT", color: "#008751", formNo: "49" },
  { id: 19, name: "Amami Aghogho William", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Edo State", zone: "South-South", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "AW", color: "#008751", formNo: "63" },
  { id: 20, name: "Levi Okuru", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Rivers State", zone: "South-South", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "LO", color: "#008751", formNo: "44" },

  // ==================== ZONE C (North-Central) ====================
  { id: 21, name: "Benjamin D. Pam", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Plateau State", zone: "North-Central", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "BP", color: "#008751", formNo: "6" },
  { id: 22, name: "James Exodus", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Nasarawa State", zone: "North-Central", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "JE", color: "#008751", formNo: "17" },
  { id: 23, name: "Kabiru Ndagi", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Niger State", zone: "North-Central", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "KN", color: "#008751", formNo: "19" },
  { id: 24, name: "Andah Abdulhakeem", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Kogi State", zone: "North-Central", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "AA", color: "#008751", formNo: "42" },
  { id: 25, name: "Maxwell Fasema", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Benue State", zone: "North-Central", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "MF", color: "#008751", formNo: "59" },
  { id: 26, name: "Nanchang Peter Timloh", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Plateau State", zone: "North-Central", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "NT", color: "#008751", formNo: "68" },
  { id: 27, name: "Nanla Nanzyn", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Plateau State", zone: "North-Central", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "NN", color: "#008751", formNo: "11" },
  { id: 28, name: "Caleb King", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Benue State", zone: "North-Central", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "CK", color: "#008751", formNo: "41" },
  { id: 29, name: "Blessing Apata", position: "Treasurer", positionCategory: "executive", institution: "Kwara State", zone: "North-Central", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "BA", color: "#4b5563", formNo: "16" },
  { id: 30, name: "Asmawu Omeiza", position: "Treasurer", positionCategory: "executive", institution: "Nasarawa State", zone: "North-Central", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "AO", color: "#4b5563", formNo: "28" },
  { id: 31, name: "Saladeen Afeez", position: "Deputy Senate President", positionCategory: "senate_secretariat", institution: "Kwara State", zone: "North-Central", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "SA", color: "#4b5563", formNo: "43" },
  { id: 32, name: "Ahmad A Yahaya", position: "Deputy Senate President", positionCategory: "senate_secretariat", institution: "Nasarawa State", zone: "North-Central", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "AY", color: "#4b5563", formNo: "53" },

  // ==================== ZONE D (South-West) ====================
  { id: 33, name: "Akinteye Babatunde Afeez", position: "National President", positionCategory: "executive", institution: "", zone: "South-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "AA", color: "#C8A000", formNo: "1" },
  { id: 34, name: "Aminu Haruna Maipampo", position: "National President", positionCategory: "executive", institution: "Ekiti State", zone: "South-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "AM", color: "#C8A000", formNo: "21" },
  { id: 35, name: "Awoyinfa Opeoluwa", position: "National President", positionCategory: "executive", institution: "Ondo State", zone: "South-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "AO", color: "#C8A000", formNo: "29" },
  { id: 36, name: "ODUMOSU Olamide Josiah", position: "National President", positionCategory: "executive", institution: "Ogun State", zone: "South-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "OO", color: "#C8A000", formNo: "35" },
  { id: 37, name: "Dotun Opaleye", position: "National President", positionCategory: "executive", institution: "Ogun State", zone: "South-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "DO", color: "#C8A000", formNo: "40" },
  { id: 38, name: "Sanusi Sulaiman Olayode", position: "National President", positionCategory: "executive", institution: "Lagos State", zone: "South-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "SO", color: "#C8A000", formNo: "55" },
  { id: 39, name: "Emeka Valentine", position: "National President", positionCategory: "executive", institution: "Lagos State", zone: "South-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "EV", color: "#C8A000", formNo: "18" },
  { id: 40, name: "Oladimeji Uthman", position: "Secretary-General", positionCategory: "executive", institution: "Lagos State", zone: "South-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "OU", color: "#4b5563", formNo: "8" },
  { id: 41, name: "Taiwo Owolewa", position: "Secretary-General", positionCategory: "executive", institution: "Ekiti State", zone: "South-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "TO", color: "#4b5563", formNo: "64" },
  { id: 42, name: "Oluwale Olutunde Aboke", position: "Secretary-General", positionCategory: "executive", institution: "Osun State", zone: "South-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "OA", color: "#4b5563", formNo: "69" },
  { id: 43, name: "Tegbe Stephen", position: "Secretary-General", positionCategory: "executive", institution: "Oyo State", zone: "South-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "TS", color: "#4b5563", formNo: "70" },
  { id: 44, name: "Andoya Ademola", position: "Secretary-General", positionCategory: "executive", institution: "Lagos State", zone: "South-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "AA", color: "#4b5563", formNo: "71" },
  { id: 45, name: "Alao John", position: "Secretary-General", positionCategory: "executive", institution: "Oyo State", zone: "South-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "AJ", color: "#4b5563", formNo: "51" },
  { id: 46, name: "Muhammad Adewale", position: "Financial Secretary", positionCategory: "executive", institution: "Oyo State", zone: "South-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "MA", color: "#4b5563", formNo: "30" },
  { id: 47, name: "Ajao Adejoke", position: "Financial Secretary", positionCategory: "executive", institution: "Lagos State", zone: "South-West", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "AA", color: "#4b5563", formNo: "37" },

  // ==================== ZONE E (North-East) ====================
  { id: 48, name: "Wali Usman", position: "Assistant Secretary-General", positionCategory: "executive", institution: "Yobe State", zone: "North-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "WU", color: "#4b5563", formNo: "20" },
  { id: 49, name: "Muhammad Nur Shu'aib", position: "Assistant Secretary-General", positionCategory: "executive", institution: "Borno State", zone: "North-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "MS", color: "#4b5563", formNo: "60" },
  { id: 50, name: "Alhassan Adam", position: "Assistant Secretary-General", positionCategory: "executive", institution: "Bauchi State", zone: "North-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "AA", color: "#4b5563", formNo: "7" },
  { id: 51, name: "Musa Baba Ali", position: "Assistant Secretary-General", positionCategory: "executive", institution: "Borno State", zone: "North-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "MA", color: "#4b5563", formNo: "46" },
  { id: 52, name: "Umar Ibrahim", position: "Assistant Secretary-General", positionCategory: "executive", institution: "Yobe State", zone: "North-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "UI", color: "#4b5563", formNo: "56" },
  { id: 53, name: "Tabita Babayo", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Gombe State", zone: "North-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "TB", color: "#008751", formNo: "27" },
  { id: 54, name: "Lawrence Janada", position: "Vice President (National Affairs)", positionCategory: "executive", institution: "Borno State", zone: "North-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "LJ", color: "#008751", formNo: "45" },
  { id: 55, name: "Obidah David", position: "Public Relations Officer", positionCategory: "executive", institution: "Adamawa State", zone: "North-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "OD", color: "#4b5563", formNo: "33" },
  { id: 56, name: "David Philip", position: "Public Relations Officer", positionCategory: "executive", institution: "Adamawa State", zone: "North-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "DP", color: "#4b5563", formNo: "34" },
  { id: 57, name: "Lukman Yusuf", position: "Public Relations Officer", positionCategory: "executive", institution: "Taraba State", zone: "North-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "LY", color: "#4b5563", formNo: "52" },
  { id: 58, name: "Hope Daniel", position: "Public Relations Officer", positionCategory: "executive", institution: "Taraba State", zone: "North-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "HD", color: "#4b5563", formNo: "23" },

  // ==================== ZONE F (South-East) ====================
  { id: 59, name: "Ibeabuchi Moses Onyia", position: "Senate President", positionCategory: "senate_secretariat", institution: "Ebonyi State", zone: "South-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "IM", color: "#C8A000", formNo: "2" },
  { id: 60, name: "Nwuruku Olisa Alfred", position: "Senate President", positionCategory: "senate_secretariat", institution: "Ebonyi State", zone: "South-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "NA", color: "#C8A000", formNo: "9" },
  { id: 61, name: "Kenechukwu Aneke", position: "Senate President", positionCategory: "senate_secretariat", institution: "Enugu State", zone: "South-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "KA", color: "#C8A000", formNo: "14" },
  { id: 62, name: "Ijeomah Obinna Charles", position: "Senate President", positionCategory: "senate_secretariat", institution: "Anambra State", zone: "South-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "IC", color: "#C8A000", formNo: "22" },
  { id: 63, name: "Jessy Chinedu Alfred", position: "Senate President", positionCategory: "senate_secretariat", institution: "Imo State", zone: "South-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "JA", color: "#C8A000", formNo: "25" },
  { id: 64, name: "Emesowum C Boniface", position: "Senate President", positionCategory: "senate_secretariat", institution: "Imo State", zone: "South-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "EB", color: "#C8A000", formNo: "54" },
  { id: 65, name: "Umezuluora Chukwuebuke", position: "Senate President", positionCategory: "senate_secretariat", institution: "Anambra State", zone: "South-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "UC", color: "#C8A000", formNo: "58" },
  { id: 66, name: "Osigwe Chinonso Elijah", position: "Senate President", positionCategory: "senate_secretariat", institution: "Imo State", zone: "South-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "OE", color: "#C8A000", formNo: "67" },
  { id: 67, name: "Okolie Chinyelu Chinelo", position: "Senate President", positionCategory: "senate_secretariat", institution: "Abia State", zone: "South-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "OC", color: "#C8A000", formNo: "38" },
  { id: 68, name: "Okoro Ubaka", position: "Director of Action and Mobilization", positionCategory: "executive", institution: "Enugu State", zone: "South-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "OU", color: "#6B21A5", formNo: "15" },
  { id: 69, name: "Victor Chibuezeudo", position: "Director of Action and Mobilization", positionCategory: "executive", institution: "Abia State", zone: "South-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "VC", color: "#6B21A5", formNo: "72" },
  { id: 70, name: "Uwakwe Gloria", position: "Clerk of the House", positionCategory: "senate_secretariat", institution: "Imo State", zone: "South-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "UG", color: "#4b5563", formNo: "73" },
  { id: 71, name: "Nwosu Evans Chisom", position: "Clerk of the House", positionCategory: "senate_secretariat", institution: "Anambra State", zone: "South-East", department: "", level: "", status: "pending", manifesto: [], bio: "", initials: "NC", color: "#4b5563", formNo: "74" },
];

const StatusBadge: React.FC<{ status: Candidate["status"] }> = ({ status }) => {
  const styles: Record<Candidate["status"], { bg: string; text: string; label: string }> = {
    cleared: { bg: "#e8f5ee", text: "#008751", label: "✓ EC Cleared" },
    pending: { bg: "#fef9e7", text: "#c8a000", label: "⏳ Screening Pending" },
    disqualified: { bg: "#fef2f2", text: "#dc2626", label: "✗ Disqualified" },
  };
  const s = styles[status];
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  );
};

const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate: c }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white rounded-xl border hover:shadow-md transition-all"
      style={{ borderColor: "#e5e7eb" }}
    >
      {/* Top accent bar */}
      <div className="h-1" style={{ backgroundColor: getPositionColor(c.position) }} />

      <div className="p-5">
        {/* Header - smaller and cleaner */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-bold flex-shrink-0"
            style={{ backgroundColor: getPositionColor(c.position) }}
          >
            {c.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-gray-900 truncate"
              style={{ fontSize: "0.95rem" }}
            >
              {c.name}
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-1">
              <StatusBadge status={c.status} />
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium text-white"
                style={{ backgroundColor: getPositionColor(c.position) }}
              >
                {c.position === "National President" ? "Presidential" : c.position === "Senate President" ? "Senate Pres." : c.position.length > 25 ? c.position.substring(0, 22) + "..." : c.position}
              </span>
            </div>
          </div>
        </div>

        {/* Details - compact */}
        <div className="space-y-1.5 mb-3">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Institution</span>
            <span className="font-medium text-gray-700 text-right max-w-[60%]">{c.institution || "—"}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Zone</span>
            <span className="font-medium text-gray-700">{c.zone}</span>
          </div>
        </div>

        {/* Bio - shorter */}
        <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
          {c.bio || "Bio information will be updated soon."}
        </p>

        {/* Manifesto button - cleaner */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 text-xs font-medium transition-colors"
          style={{ color: "#008751" }}
        >
          <span className="text-base">{expanded ? "−" : "+"}</span>
          {expanded ? "Hide Manifesto" : "View Manifesto"}
        </button>

        {/* Manifesto section */}
        {expanded && (
          <div className="mt-3 pt-3 border-t" style={{ borderColor: "#f0f0f0" }}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Campaign Priorities
            </p>
            {c.manifesto.length > 0 ? (
              <ul className="space-y-1.5">
                {c.manifesto.slice(0, 3).map((point, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-xs text-gray-600">
                    <span
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-white text-[7px] flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#008751" }}
                    >
                      ✓
                    </span>
                    <span className="leading-relaxed">{point.length > 80 ? point.substring(0, 80) + "..." : point}</span>
                  </li>
                ))}
                {c.manifesto.length > 3 && (
                  <li className="text-xs text-gray-400 pl-5">+{c.manifesto.length - 3} more</li>
                )}
              </ul>
            ) : (
              <p className="text-xs text-gray-400 italic">Manifesto will be uploaded soon.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
const Candidates: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "executive" | "senate_secretariat">("all");

  // Group candidates by position
  const getCandidatesByPosition = (positionList: string[], category: "executive" | "senate_secretariat") => {
    const positionMap: Record<string, Candidate[]> = {};
    positionList.forEach(pos => { positionMap[pos] = []; });
    
    candidates
      .filter(c => c.positionCategory === category)
      .forEach(candidate => {
        if (positionMap[candidate.position]) {
          positionMap[candidate.position].push(candidate);
        }
      });
    
    return positionMap;
  };

  const executiveCandidatesByPosition = getCandidatesByPosition(EXECUTIVE_POSITIONS, "executive");
  const senateCandidatesByPosition = getCandidatesByPosition(SENATE_SECRETARIAT_POSITIONS, "senate_secretariat");

  const totalExecutiveCandidates = candidates.filter(c => c.positionCategory === "executive").length;
  const totalSenateCandidates = candidates.filter(c => c.positionCategory === "senate_secretariat").length;

  return (
    <Wrapper>
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#008751" }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 30px)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <p className="text-green-200 text-sm font-medium mb-2">2026 NANS Elections</p>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            Candidates
          </h1>
          <p className="text-green-100 text-lg max-w-xl leading-relaxed">
            Meet the <strong>{totalExecutiveCandidates} Executive</strong> and{" "}
            <strong>{totalSenateCandidates} Senate Secretariat</strong> candidates contesting in the 2026 NANS General Election.
          </p>
          <div className="flex gap-2 mt-6 text-sm text-green-200">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Candidates</span>
          </div>
          <Link
            href="/candidates/form"
            className="inline-flex mt-2 items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105 flex-shrink-0"
            style={{ backgroundColor: "#C8A000", color: "#1a1500" }}
          >
            <FaNoteSticky />
            Open Forms
          </Link>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="py-8 bg-white border-b" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center justify-between">
          <div
            className="inline-flex gap-2 p-1.5 rounded-xl"
            style={{ backgroundColor: "#f0fdf4" }}
          >
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all capitalize ${filter === "all" ? "text-white shadow" : "text-gray-600 hover:bg-gray-100"
                }`}
              style={filter === "all" ? { backgroundColor: "#008751" } : {}}
            >
              All Races
            </button>
            <button
              onClick={() => setFilter("executive")}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all capitalize ${filter === "executive" ? "text-white shadow" : "text-gray-600 hover:bg-gray-100"
                }`}
              style={filter === "executive" ? { backgroundColor: "#008751" } : {}}
            >
              Executive Council ({EXECUTIVE_POSITIONS.length})
            </button>
            <button
              onClick={() => setFilter("senate_secretariat")}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all capitalize ${filter === "senate_secretariat" ? "text-white shadow" : "text-gray-600 hover:bg-gray-100"
                }`}
              style={filter === "senate_secretariat" ? { backgroundColor: "#008751" } : {}}
            >
              Senate Secretariat ({SENATE_SECRETARIAT_POSITIONS.length})
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Total <strong>{candidates.length}</strong> candidate{candidates.length !== 1 ? "s" : ""} across all races
          </p>
        </div>
      </section>

      {/* Executive Council Races */}
      {(filter === "all" || filter === "executive") && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {EXECUTIVE_POSITIONS.map((position) => {
              const positionCandidates = executiveCandidatesByPosition[position] || [];
              if (positionCandidates.length === 0 && filter === "executive") return null;
              return (
                <div key={position} className="mb-14">
                  <div className="flex items-center gap-3 mb-8">
                    <div
                      className="px-4 py-1.5 rounded-full text-white text-sm font-bold"
                      style={{ backgroundColor: getPositionColor(position) }}
                    >
                      {position}
                    </div>
                    <div className="flex-1 h-px" style={{ backgroundColor: "#e0ede0" }} />
                    <span className="text-sm text-gray-400">
                      {positionCandidates.length} Candidate{positionCandidates.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {positionCandidates.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                      {positionCandidates.map((c) => (
                        <CandidateCard key={c.id} candidate={c} />
                      ))}
                    </div>
                  ) : (
                    filter === "all" && (
                      <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed" style={{ borderColor: "#d4eadb" }}>
                        <p className="text-gray-400">No candidates declared yet for this position</p>
                        <p className="text-sm text-gray-400 mt-1">Nominations are ongoing</p>
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Senate Secretariat Races */}
      {(filter === "all" || filter === "senate_secretariat") && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {SENATE_SECRETARIAT_POSITIONS.map((position) => {
              const positionCandidates = senateCandidatesByPosition[position] || [];
              if (positionCandidates.length === 0 && filter === "senate_secretariat") return null;
              return (
                <div key={position} className="mb-14">
                  <div className="flex items-center gap-3 mb-8">
                    <div
                      className="px-4 py-1.5 rounded-full text-white text-sm font-bold"
                      style={{ backgroundColor: getPositionColor(position) }}
                    >
                      {position}
                    </div>
                    <div className="flex-1 h-px" style={{ backgroundColor: "#e0ede0" }} />
                    <span className="text-sm text-gray-400">
                      {positionCandidates.length} Candidate{positionCandidates.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {positionCandidates.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                      {positionCandidates.map((c) => (
                        <CandidateCard key={c.id} candidate={c} />
                      ))}
                    </div>
                  ) : (
                    filter === "all" && (
                      <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed" style={{ borderColor: "#d4eadb" }}>
                        <p className="text-gray-400">No candidates declared yet for this position</p>
                        <p className="text-sm text-gray-400 mt-1">Nominations are ongoing</p>
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <section className="py-10 border-t" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-xl p-5 border-l-4 text-sm text-gray-600 leading-relaxed"
            style={{ borderLeftColor: "#C8A000", backgroundColor: "#fdfdf0" }}
          >
            <strong>Disclaimer:</strong> Candidate profiles and manifesto points are submitted by the candidates themselves and have been published as-is following Electoral Committee clearance. NANS does not endorse any candidate. All eligible voters are encouraged to make their choice based on independent assessment.
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Candidates;