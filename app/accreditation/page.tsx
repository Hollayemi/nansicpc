"use client";
import React, { useState } from "react";
import Link from "next/link";
import Wrapper from "@/app/components/wrapper";
import { RiSchoolFill } from "react-icons/ri";

interface CodeInfo {
  institution: string;
  zone: string;
  state: string;
}

const inputCls =
  "w-full px-4 py-3 text-sm text-black rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all placeholder-gray-300";

const AccreditationPage: React.FC = () => {
  const [step, setStep] = useState<"code" | "form" | "success">("code");
  const [code, setCode] = useState("");
  const [codeInfo, setCodeInfo] = useState<CodeInfo | null>(null);
  const [validating, setValidating] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    position: "SUG President",
    phone: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [refId, setRefId] = useState<string | null>(null);

  const validateCode = async () => {
    setCodeError(null);
    setValidating(true);
    try {
      const res = await fetch(`/api/accreditation/${code.trim().toUpperCase()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid code");
      setCodeInfo({ institution: data.institution, zone: data.zone, state: data.state });
      setStep("form");
    } catch (e: unknown) {
      setCodeError(e instanceof Error ? e.message : "Invalid or expired code");
    } finally {
      setValidating(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    if (!form.fullName || !form.phone) {
      setSubmitError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/delegates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          institution: codeInfo?.institution,
          zone: codeInfo?.zone,
          state: codeInfo?.state,
          code: code.trim().toUpperCase(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRefId(data.id);
      setStep("success");
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (step === "success") {
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
              Accreditation Complete
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              You have been successfully accredited as a delegate for the 2026 NANS National Convention.
            </p>
            <div
              className="rounded-xl px-5 py-4 mb-4 border"
              style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}
            >
              <p className="text-xs text-gray-500 mb-2">Registered Institution</p>
              <p className="font-bold text-gray-800">{codeInfo?.institution}</p>
              <p className="text-sm text-gray-500 mt-1">{codeInfo?.zone} · {codeInfo?.state}</p>
            </div>
            {refId && (
              <div
                className="rounded-xl px-5 py-3 mb-6 border font-mono text-sm font-bold"
                style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9", color: "#008751" }}
              >
                Reference ID: {refId}
              </div>
            )}
            <p className="text-xs text-gray-400 mb-6">
              Keep your reference ID safe. Present it at the convention venue for verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/delegates"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl"
                style={{ backgroundColor: "#008751" }}
              >
                View All Delegates →
              </Link>
              <Link
                href="/election-schedule"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl border"
                style={{ borderColor: "#008751", color: "#008751" }}
              >
                Convention Schedule
              </Link>
            </div>
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
         
          <h1 className="text-4xl sm:text-5xl font-bold mb-2" style={{ fontFamily: "'Crimson Pro', serif" }}>
            Delegate Accreditation
          </h1>
          <p className="text-green-100 text-sm max-w-xl leading-relaxed">
            Use your ICPC-issued accreditation code to register as a delegate for the 2026 NANS National Convention.
          </p>
          <div className="flex gap-2 mt-5 text-sm text-green-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Delegate Accreditation</span>
          </div>
        </div>
      </section>

      {/* Step progress */}
      <section className="py-5 bg-white border-b" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2">
            {[
              { n: 1, label: "Enter Code" },
              { n: 2, label: "Your Details" },
              { n: 3, label: "Confirmed" },
            ].map(({ n, label }, i, arr) => {
              const currentStep = step === "code" ? 1 : step === "form" ? 2 : 3;
              return (
                <React.Fragment key={n}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                      style={{
                        backgroundColor: currentStep >= n ? "#008751" : "#e5e7eb",
                        color: currentStep >= n ? "white" : "#9ca3af",
                      }}
                    >
                      {currentStep > n ? "✓" : n}
                    </div>
                    <span className={`text-xs font-medium hidden sm:inline ${currentStep === n ? "text-gray-800" : "text-gray-400"}`}>
                      {label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div
                      className="flex-1 h-0.5 rounded"
                      style={{ backgroundColor: currentStep > n ? "#008751" : "#e5e7eb" }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12" style={{ backgroundColor: "#f8fdf9" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-sm border overflow-hidden" style={{ borderColor: "#d4eadb" }}>

            {/* Step 1 — Enter Code */}
            {step === "code" && (
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Crimson Pro', serif" }}>
                  Enter Your Accreditation Code
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                  Your ICPC accreditation code was issued to your institution by the ICPC. It is in the format <strong>NANS-XXXX-XXXX</strong>.
                </p>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Accreditation Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="NANS-XXXX-XXXX"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && code && validateCode()}
                    className={`${inputCls} font-mono text-lg tracking-widest text-center uppercase`}
                    style={{ borderColor: "#d4eadb", letterSpacing: "0.15em" }}
                    maxLength={14}
                  />
                  {codeError && (
                    <div className="mt-3 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
                      <span className="text-red-500">⚠️</span>
                      <p className="text-red-600 text-sm">{codeError}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={validateCode}
                  disabled={!code || validating}
                  className="w-full py-3 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#008751" }}
                >
                  {validating ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Validating…
                    </>
                  ) : "Validate Code →"}
                </button>

                <div
                  className="mt-8 rounded-xl p-5 border-l-4 text-sm text-gray-600 leading-relaxed"
                  style={{ borderLeftColor: "#C8A000", backgroundColor: "#fdfdf0" }}
                >
                  <strong>Don't have a code?</strong> Accreditation codes are issued by the ICPC to each institution's Student Union Government (SUG). Contact <template></template>he ICPC Secretariat at{" "}
                  <a href="mailto:icpcnans@gmail.com" style={{ color: "#008751" }} className="font-semibold">icpcnans@gmail.com</a>{" "}
                  or call <strong>+234 803 524 9508</strong>.
                </div>
              </div>
            )}

            {/* Step 2 — Fill Form */}
            {step === "form" && codeInfo && (
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Crimson Pro', serif" }}>
                  Your Details
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Completing registration for delegate from your institution.
                </p>

                {/* Institution card */}
                <div
                  className="rounded-xl border p-4 mb-8 flex items-center gap-4"
                  style={{ borderColor: "#d4eadb", backgroundColor: "#f0fdf4" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                    style={{ backgroundColor: "#008751" }}
                  >
                    <RiSchoolFill />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Registering for</p>
                    <p className="font-bold text-gray-800">{codeInfo.institution}</p>
                    <p className="text-xs text-gray-500">{codeInfo.zone} · {codeInfo.state}</p>
                  </div>
                  <span
                    className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: "#e8f5ee", color: "#008751" }}
                  >
                    ✓ Code Verified
                  </span>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Comrade Adewale Babatunde"
                      value={form.fullName}
                      onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                      className={inputCls}
                      style={{ borderColor: "#d4eadb" }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Position / Title
                    </label>
                    <select
                      value={form.position}
                      onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
                      className={inputCls}
                      style={{ borderColor: "#d4eadb" }}
                    >
                      <option value="SUG President">SUG President</option>
                      <option value="Student Union President">Student Union President</option>
                      <option value="Guild President">Guild President</option>
                      <option value="Union President">Union President</option>
                      <option value="Student Representative Council President">SRC President</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+234 XXX XXX XXXX"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className={inputCls}
                        style={{ borderColor: "#d4eadb" }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-gray-400 font-normal">— optional</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@institution.edu.ng"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className={inputCls}
                        style={{ borderColor: "#d4eadb" }}
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                      {submitError}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <button
                    onClick={() => { setStep("code"); setCodeInfo(null); }}
                    className="px-6 py-2.5 text-sm font-semibold rounded-xl border transition-all hover:bg-gray-50"
                    style={{ borderColor: "#d4eadb", color: "#374151" }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!form.fullName || !form.phone || submitting}
                    className="px-8 py-3 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90 disabled:opacity-40 flex items-center gap-2"
                    style={{ backgroundColor: "#008751" }}
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Registering…
                      </>
                    ) : "Complete Registration ✓"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default AccreditationPage;
