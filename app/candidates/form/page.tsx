"use client";
import React, { useState } from "react";
import Wrapper from "@/app/components/wrapper";
import Link from "next/link";
import { BiCamera } from "react-icons/bi";
import { FaFile } from "react-icons/fa";

/* ─── types ─────────────────────────────────────────────────────────────────── */
interface FormData {
  // Personal
  fullName: string;
  stateOfOrigin: string;
  address: string;
  // Office
  institution: string;
  officeContested: string;
  academicSession: string;
  // Declarations (checkboxes)
  declareBonafide: boolean;
  declareConduct: boolean;
  declareConstitution: boolean;
  declareDocuments: boolean;
  declareNoFalse: boolean;
  declareNoCriminal: boolean;
  declareDisqualification: boolean;
  declareRespectOutcome: boolean;
  declareTruth: boolean;
  // Signature
  signatureName: string;
  passportPhoto: File | null;
}

const INITIAL: FormData = {
  fullName: "",
  stateOfOrigin: "",
  address: "",
  institution: "",
  officeContested: "",
  academicSession: "2026/2027",
  declareBonafide: false,
  declareConduct: false,
  declareConstitution: false,
  declareDocuments: false,
  declareNoFalse: false,
  declareNoCriminal: false,
  declareDisqualification: false,
  declareRespectOutcome: false,
  declareTruth: false,
  signatureName: "",
  passportPhoto: null,
};

const OFFICES = [
  "National President",
  "Senate President",
  "Secretary-General",
  "Assistant Secretary-General",
  "Public Relations Officer (PRO)",
  "Financial Secretary",
  "Treasurer",
  "Director of Socials",
  "Legal Adviser",
  "Ex-Officio Member",
];

const DECLARATIONS = [
  { key: "declareBonafide", text: "That I am a bona fide student of the institution stated above." },
  { key: "declareConduct", text: "That I hereby solemnly undertake to maintain good conduct and ensure that my supporters and associates conduct themselves in a peaceful, orderly, and responsible manner before, during, and after the National Convention." },
  { key: "declareConstitution", text: "That I shall fully comply with and uphold all the provisions of the Constitution of the National Association of Nigerian Students (NANS), including all approved guidelines, rules, and regulations governing the conduct of the election as announced by the Independent Convention Planning Committee (I-CPC) 2026." },
  { key: "declareDocuments", text: "That I have attached all the necessary documents required for the submission of my nomination form, which adequately prove my identity and status as a student." },
  { key: "declareNoFalse", text: "That I have not made any false declaration nor submitted any forged, fake, or misleading documents, receipts, or credentials to the Independent Convention Planning Committee (I-CPC) in support of my qualification for the office I seek to contest." },
  { key: "declareNoCriminal", text: "That I have never been convicted of any criminal offense relating to fraud, deceit, cultism, or any act capable of bringing the name and integrity of the Association into disrepute." },
  { key: "declareDisqualification", text: "That I hereby consent and agree that the Independent Convention Planning Committee (I-CPC) reserves the right to disqualify me from the election and report me to the appropriate security agencies should it be discovered that I have made false claims or submitted forged, fake, or questionable documents or credentials." },
  { key: "declareRespectOutcome", text: "That I further undertake to respect the outcome of the election and refrain from engaging in or sponsoring any form of factional activity within the Association should I not emerge victorious in the election." },
  { key: "declareTruth", text: "That I make this solemn declaration conscientiously, believing the contents herein to be true and in accordance with the laws governing sworn affidavits." },
] as const;

/* ─── helpers ────────────────────────────────────────────────────────────────── */
const Field: React.FC<{
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}> = ({ label, required, children, hint }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-gray-400">{hint}</p>}
  </div>
);

const inputCls =
  "w-full px-4 py-3 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all placeholder-gray-300";
const inputStyle = { borderColor: "#d4eadb" };
const focusStyle = { "--tw-ring-color": "#008751" } as React.CSSProperties;

/* ─── main component ─────────────────────────────────────────────────────────── */
const NominationForm: React.FC = () => {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refId, setRefId] = useState<string | null>(null);

  const set = (key: keyof FormData, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const allDeclarationsChecked = DECLARATIONS.every((d) => form[d.key]);

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      // Build a serialisable payload (exclude File blob)
      const payload = {
        fullName: form.fullName,
        stateOfOrigin: form.stateOfOrigin,
        address: form.address,
        institution: form.institution,
        officeContested: form.officeContested,
        academicSession: form.academicSession,
        signatureName: form.signatureName,
        declarations: DECLARATIONS.map((d) => ({ key: d.key, agreed: form[d.key] })),
        hasPassportPhoto: !!form.passportPhoto,
      };

      const res = await fetch("/api/nomination", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      setRefId(data.id);
      setSubmitted(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Wrapper>
        <div className="min-h-screen flex items-center justify-center py-20 px-4" style={{ backgroundColor: "#f0fdf4" }}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center border" style={{ borderColor: "#d4eadb" }}>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl"
              style={{ backgroundColor: "#008751" }}
            >
              ✓
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Crimson Pro', serif" }}>
              Form Submitted
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Your Oath / Affidavit of Aspirant has been successfully submitted to the ICPC. Keep your reference ID safe — you will need it for screening.
            </p>
            {refId && (
              <div
                className="rounded-xl px-5 py-4 mb-6 border font-mono text-sm font-bold"
                style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9", color: "#008751" }}
              >
                Reference ID: {refId}
              </div>
            )}
            <p className="text-xs text-gray-400 mb-6">
              The ICPC will contact you regarding screening. Ensure all required physical documents are ready for submission between <strong>8–10 April 2026</strong>.
            </p>
            <Link
              href="/election-overview"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl"
              style={{ backgroundColor: "#008751" }}
            >
              Back to Election Overview
            </Link>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* Hero */}
      <section className="relative py-16 overflow-hidden" style={{ backgroundColor: "#005c37" }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 30px)" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <img src="/images/logo.png" alt="NANS" className="w-14 h-14 rounded-full bg-white flex-shrink-0" />
            <div>
              <p className="font-bold text-sm tracking-widest" style={{ color: "#C8A000" }}>NANS — ICPC 2026</p>
              <p className="text-green-200 text-xs">Independent Convention Planning Committee · National Headquarters, Abuja</p>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2" style={{ fontFamily: "'Crimson Pro', serif" }}>
            Oath / Affidavit of Aspirant
          </h1>
          <p className="text-green-100 text-sm max-w-xl leading-relaxed">
            For the National Association of Nigerian Students (NANS) 2026/2027 National Convention
          </p>
          <div className="flex gap-2 mt-5 text-sm text-green-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/candidates" className="hover:text-white">Candidates</Link>
            <span>/</span>
            <span className="text-white font-medium">Nomination Form</span>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="py-5 bg-white border-b" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2">
            {[
              { n: 1, label: "Personal Details" },
              { n: 2, label: "Declarations" },
              { n: 3, label: "Sign & Submit" },
            ].map(({ n, label }, i, arr) => (
              <React.Fragment key={n}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    style={{
                      backgroundColor: step >= n ? "#008751" : "#e5e7eb",
                      color: step >= n ? "white" : "#9ca3af",
                    }}
                  >
                    {step > n ? "✓" : n}
                  </div>
                  <span className={`text-xs font-medium hidden sm:inline ${step === n ? "text-gray-800" : "text-gray-400"}`}>
                    {label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div
                    className="flex-1 h-0.5 rounded transition-all"
                    style={{ backgroundColor: step > n ? "#008751" : "#e5e7eb" }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Form body */}
      <section className="py-12" style={{ backgroundColor: "#f8fdf9" }}>
        <div className="max-w-4xl mx-auto px-1.5 sm:px-6">
          <div className="bg-white rounded-3xl shadow-sm border overflow-hidden" style={{ borderColor: "#d4eadb" }}>
            {/* Step 1 — Personal Details */}
            {step === 1 && (
              <div className="p-5 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Crimson Pro', serif" }}>
                  Personal Details
                </h2>
                <p className="text-gray-500 text-sm mb-8">Fill in all required fields accurately. Information submitted here will be used for screening.</p>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <Field label="Full Name (as on National ID / Admission Letter)" required>
                      <input
                        type="text"
                        placeholder="e.g. Comrade Adewale Babatunde Oladele"
                        value={form.fullName}
                        onChange={(e) => set("fullName", e.target.value)}
                        className={inputCls}
                        style={{ ...inputStyle, ...focusStyle }}
                      />
                    </Field>
                  </div>

                  <Field label="State of Origin" required>
                    <input
                      type="text"
                      placeholder="e.g. Lagos State"
                      value={form.stateOfOrigin}
                      onChange={(e) => set("stateOfOrigin", e.target.value)}
                      className={inputCls}
                      style={inputStyle}
                    />
                  </Field>

                  <Field label="Permanent Home Address" required>
                    <input
                      type="text"
                      placeholder="Street, LGA, State"
                      value={form.address}
                      onChange={(e) => set("address", e.target.value)}
                      className={inputCls}
                      style={inputStyle}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Name of Institution (Tertiary)" required>
                      <input
                        type="text"
                        placeholder="e.g. University of Lagos, Akoka"
                        value={form.institution}
                        onChange={(e) => set("institution", e.target.value)}
                        className={inputCls}
                        style={inputStyle}
                      />
                    </Field>
                  </div>

                  <Field label="Office Contested" required hint="Select the position you are contesting for.">
                    <select
                      value={form.officeContested}
                      onChange={(e) => set("officeContested", e.target.value)}
                      className={inputCls}
                      style={inputStyle}
                    >
                      <option value="">— Select Position —</option>
                      {OFFICES.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Academic Session">
                    <input
                      type="text"
                      value={form.academicSession}
                      readOnly
                      className={`${inputCls} bg-gray-50 text-gray-500 cursor-not-allowed`}
                      style={inputStyle}
                    />
                  </Field>

                  {/* Passport Photo upload */}
                  <div className="sm:col-span-2">
                    <Field label="Passport Photograph" hint="Upload a recent, clear passport-sized photograph. Max 2MB. JPEG or PNG only.">
                      <div
                        className="relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:border-green-400"
                        style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}
                        onClick={() => document.getElementById("photo-upload")?.click()}
                      >
                        {form.passportPhoto ? (
                          <>
                            <img
                              src={URL.createObjectURL(form.passportPhoto)}
                              alt="passport"
                              className="w-24 h-24 rounded-xl object-cover border-2"
                              style={{ borderColor: "#008751" }}
                            />
                            <p className="text-xs text-green-700 font-medium">{form.passportPhoto.name}</p>
                            <button
                              onClick={(e) => { e.stopPropagation(); set("passportPhoto", null); }}
                              className="text-xs text-red-500 underline"
                            >
                              Remove
                            </button>
                          </>
                        ) : (
                          <>
                            <div
                              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                              style={{ backgroundColor: "#e8f5ee" }}
                            >
                              <BiCamera />
                            </div>
                            <p className="text-sm text-gray-500 font-medium">Click to upload passport photo</p>
                            <p className="text-xs text-gray-400">JPEG, PNG — max 2MB</p>
                          </>
                        )}
                        <input
                          id="photo-upload"
                          type="file"
                          accept="image/jpeg,image/png"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && file.size <= 2 * 1024 * 1024) set("passportPhoto", file);
                            else if (file) alert("File too large. Max 2MB.");
                          }}
                        />
                      </div>
                    </Field>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => {
                      if (!form.fullName || !form.stateOfOrigin || !form.institution || !form.officeContested || !form.address) {
                        setError("Please fill in all required fields.");
                        return;
                      }
                      setError(null);
                      setStep(2);
                    }}
                    className="px-8 py-3 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90 hover:scale-105"
                    style={{ backgroundColor: "#008751" }}
                  >
                    Continue to Declarations →
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs mt-3 text-right">{error}</p>}
              </div>
            )}

            {/* Step 2 — Declarations */}
            {step === 2 && (
              <div className="p-5 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Crimson Pro', serif" }}>
                  Solemn Declarations
                </h2>
                <p className="text-gray-500 text-sm mb-2">
                  I, <strong>{form.fullName || "…"}</strong>, of <strong>{form.address || "…"}</strong>,{" "}
                  do hereby make oath and solemnly state as follows:
                </p>
                <div
                  className="rounded-xl px-4 py-3 mb-8 text-xs border"
                  style={{ borderColor: "#C8A00040", backgroundColor: "#fdfdf0", color: "#8a6800" }}
                >
                  ⚠️ Read each declaration carefully. You must check all boxes before proceeding. This oath carries the same legal weight as a sworn affidavit.
                </div>

                <div className="space-y-4">
                  {DECLARATIONS.map((d, i) => (
                    <label
                      key={d.key}
                      className="flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:border-green-300"
                      style={{
                        borderColor: form[d.key] ? "#008751" : "#e0ede0",
                        backgroundColor: form[d.key] ? "#f0fdf4" : "white",
                      }}
                    >
                      <div className="relative flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          checked={form[d.key]}
                          onChange={(e) => set(d.key, e.target.checked)}
                          className="sr-only"
                        />
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center border-2 transition-all"
                          style={{
                            borderColor: form[d.key] ? "#008751" : "#d1d5db",
                            backgroundColor: form[d.key] ? "#008751" : "white",
                          }}
                        >
                          {form[d.key] && <span className="text-white text-[10px] font-bold">✓</span>}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-400 mr-2">{i + 1}.</span>
                        <span className="text-sm text-gray-700 leading-relaxed">{d.text}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-2.5 text-sm font-semibold rounded-xl border transition-all hover:bg-gray-50"
                    style={{ borderColor: "#d4eadb", color: "#374151" }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => {
                      if (!allDeclarationsChecked) {
                        setError("You must agree to all declarations before proceeding.");
                        return;
                      }
                      setError(null);
                      setStep(3);
                    }}
                    disabled={!allDeclarationsChecked}
                    className="px-8 py-3 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#008751" }}
                  >
                    Continue to Sign & Submit →
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs mt-3 text-right">{error}</p>}
              </div>
            )}

            {/* Step 3 — Sign & Submit */}
            {step === 3 && (
              <div className="p-5 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Crimson Pro', serif" }}>
                  Sign & Submit
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                  By entering your name below, you confirm that the information supplied is truthful and accurate.
                </p>

                {/* Summary card */}
                <div className="rounded-2xl border p-6 mb-8" style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Submission Summary</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { label: "Full Name", value: form.fullName },
                      { label: "State of Origin", value: form.stateOfOrigin },
                      { label: "Institution", value: form.institution },
                      { label: "Office Contested", value: form.officeContested },
                      { label: "Academic Session", value: form.academicSession },
                      { label: "Declarations", value: `${DECLARATIONS.filter((d) => form[d.key]).length} / ${DECLARATIONS.length} agreed` },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <p className="text-sm font-semibold text-gray-800">{item.value || "—"}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deponent signature field */}
                <Field label="Full Name (Deponent Signature)" required hint="Type your full name exactly as stated in your personal details. This acts as your digital signature.">
                  <input
                    type="text"
                    placeholder="Enter full name to sign"
                    value={form.signatureName}
                    onChange={(e) => set("signatureName", e.target.value)}
                    className={inputCls}
                    style={{ ...inputStyle, fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem" }}
                  />
                </Field>

                {/* Legal notice */}
                <div
                  className="mt-6 rounded-xl p-5 border-l-4 text-sm text-gray-600 leading-relaxed"
                  style={{ borderLeftColor: "#008751", backgroundColor: "#f0fdf4" }}
                >
                  <strong>Before Me (Commissioner for Oaths):</strong> By submitting this form, you acknowledge that this declaration is made conscientiously, believing the contents herein to be true and in accordance with the laws governing sworn affidavits. A physical copy of this form duly signed before a Commissioner for Oaths must be submitted to the ICPC Secretariat between <strong>8–10 April 2026</strong>.
                </div>

                {error && (
                  <div className="mt-4 rounded-xl p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 text-sm font-semibold rounded-xl border transition-all hover:bg-gray-50"
                    style={{ borderColor: "#d4eadb", color: "#374151" }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!form.signatureName || submitting}
                    className="px-8 py-3 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                    style={{ backgroundColor: "#008751" }}
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Submitting…
                      </>
                    ) : (
                      "Submit Oath / Affidavit ✓"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help box */}
          <div
            className="mt-6 rounded-2xl p-5 border flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{ borderColor: "#d4eadb", backgroundColor: "white" }}
          >
            <div className="text-2xl flex-shrink-0"><FaFile /></div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">Need help with this form?</p>
              <p className="text-gray-500 text-xs mt-0.5">
                Contact the ICPC Secretariat: <strong>+234 806 007 3918</strong> or{" "}
                <a href="mailto:icpcnans@gmail.com" style={{ color: "#008751" }} className="font-semibold">
                  icpcnans@gmail.com
                </a>
              </p>
            </div>
            <a
              href="/forms/NEW FORM NANS-2.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl text-white flex-shrink-0"
              style={{ backgroundColor: "#005c37" }}
            >
              ↓ Download PDF Version
            </a>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default NominationForm;
