"use client";
import React, { useState } from "react";
import Link from "next/link";
import Wrapper from "@/app/components/wrapper";
import { RiSchoolFill } from "react-icons/ri";
import { BiCamera, BiIdCard } from "react-icons/bi";

interface CodeInfo {
  institution: string;
  zone: string;
  state: string;
}

const inputCls =
  "w-full px-4 py-3 text-sm text-black rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all placeholder-gray-300";

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const data = await res.json();

  if (!res.ok) throw new Error(data.error ?? "Upload failed");
  return data.url as string; // Cloudinary secure_url
}

interface UploadFieldProps {
  label: string;
  hint: string;
  accept: string;
  icon: React.ReactNode;
  inputId: string;
  file: File | null;
  uploading: boolean;
  url: string | null;
  error: string | null;
  onFileChosen: (file: File) => void;
}

const UploadField: React.FC<UploadFieldProps> = ({
  label, hint, accept, icon, inputId,
  file, uploading, url, error, onFileChosen,
}) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
      {label} <span className="text-red-500">*</span>
    </label>
    <div
      className="relative border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:border-green-400"
      style={{
        borderColor: url ? "#008751" : error ? "#ef4444" : "#d4eadb",
        backgroundColor: url ? "#f0fdf4" : "#f8fdf9",
        minHeight: "130px",
      }}
      onClick={() => document.getElementById(inputId)?.click()}
    >
      {uploading ? (
        <>
          <svg className="animate-spin w-8 h-8" style={{ color: "#008751" }} fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <p className="text-xs text-gray-500 font-medium">Uploading…</p>
        </>
      ) : url ? (
        <>
          {/* Show thumbnail for images */}
          {file && file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-20 h-20 rounded-lg object-cover border-2"
              style={{ borderColor: "#008751" }}
            />
          ) : (
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ backgroundColor: "#e8f5ee" }}>
              📄
            </div>
          )}
          <p className="text-xs font-semibold text-green-700 text-center max-w-[160px] truncate">{file?.name}</p>
          <div className="flex items-center gap-1 text-xs font-bold" style={{ color: "#008751" }}>
            <span>✓</span> Uploaded successfully
          </div>
          <button
            type="button"
            className="text-xs text-gray-400 underline"
            onClick={(e) => { e.stopPropagation(); document.getElementById(inputId)?.click(); }}
          >
            Change file
          </button>
        </>
      ) : (
        <>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: "#e8f5ee", color: "#008751" }}
          >
            {icon}
          </div>
          <p className="text-sm text-gray-500 font-medium text-center">
            {file ? file.name : `Click to upload ${label.toLowerCase()}`}
          </p>
          <p className="text-xs text-gray-400">{hint}</p>
          {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
        </>
      )}

      <input
        id={inputId}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFileChosen(f);
        }}
      />
    </div>
  </div>
);

/* ─── Main page ──────────────────────────────────────────────────────────────── */
const AccreditationPage: React.FC = () => {
  /* Step state */
  const [step, setStep] = useState<"code" | "form" | "success">("code");

  /* Code step */
  const [code, setCode] = useState("");
  const [codeInfo, setCodeInfo] = useState<CodeInfo | null>(null);
  const [validating, setValidating] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);

  /* Form fields */
  const [form, setForm] = useState({
    fullName: "",
    position: "SUG President",
    phone: "",
    email: "",
    matricNumber: "",
  });

  /* Passport photo */
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [passportUploading, setPassportUploading] = useState(false);
  const [passportUrl, setPassportUrl] = useState<string | null>(null);
  const [passportError, setPassportError] = useState<string | null>(null);

  /* School ID */
  const [schoolIdFile, setSchoolIdFile] = useState<File | null>(null);
  const [schoolIdUploading, setSchoolIdUploading] = useState(false);
  const [schoolIdUrl, setSchoolIdUrl] = useState<string | null>(null);
  const [schoolIdError, setSchoolIdError] = useState<string | null>(null);

  /* Submit */
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [refId, setRefId] = useState<string | null>(null);

  /* ── Validate accreditation code ─────────────────────────────────────────── */
  const validateCode = async () => {
    setCodeError(null);
    setValidating(true);
    try {
      const res = await fetch(`/api/accreditation/${code.trim().toUpperCase()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Invalid code");
      setCodeInfo({ institution: data.institution, zone: data.zone, state: data.state });
      setStep("form");
    } catch (e: unknown) {
      setCodeError(e instanceof Error ? e.message : "Invalid or expired code");
    } finally {
      setValidating(false);
    }
  };

  /* ── File chosen → upload immediately ───────────────────────────────────── */
  const handlePassportChosen = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) { setPassportError("File too large. Max 5 MB."); return; }
    setPassportFile(file);
    setPassportError(null);
    setPassportUrl(null);
    setPassportUploading(true);
    try {
      const url = await uploadFile(file);
      setPassportUrl(url);
    } catch (e: unknown) {
      setPassportError(e instanceof Error ? e.message : "Upload failed — please try again.");
      setPassportFile(null);
    } finally {
      setPassportUploading(false);
    }
  };

  const handleSchoolIdChosen = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) { setSchoolIdError("File too large. Max 5 MB."); return; }
    setSchoolIdFile(file);
    setSchoolIdError(null);
    setSchoolIdUrl(null);
    setSchoolIdUploading(true);
    try {
      const url = await uploadFile(file);
      setSchoolIdUrl(url);
    } catch (e: unknown) {
      setSchoolIdError(e instanceof Error ? e.message : "Upload failed — please try again.");
      setSchoolIdFile(null);
    } finally {
      setSchoolIdUploading(false);
    }
  };

  /* ── Submit registration ─────────────────────────────────────────────────── */
  const handleSubmit = async () => {
    setSubmitError(null);

    if (!form.fullName.trim()) { setSubmitError("Full name is required."); return; }
    if (!form.phone.trim()) { setSubmitError("Phone number is required."); return; }
    if (!form.matricNumber.trim()) { setSubmitError("Matriculation number is required."); return; }
    if (!passportUrl) { setSubmitError("Please upload your passport photograph."); return; }
    if (!schoolIdUrl) { setSubmitError("Please upload your school ID card."); return; }
    if (passportUploading || schoolIdUploading) {
      setSubmitError("Please wait for all uploads to finish before submitting.");
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
          passportPhotoUrl: passportUrl,
          schoolIdUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRefId(String(data.id));
      setStep("success");
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : "Submission failed — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Derived ─────────────────────────────────────────────────────────────── */
  const uploadsInProgress = passportUploading || schoolIdUploading;
  const formReady =
    form.fullName.trim() &&
    form.phone.trim() &&
    form.matricNumber.trim() &&
    !!passportUrl &&
    !!schoolIdUrl &&
    !uploadsInProgress;

  const currentStep = step === "code" ? 1 : step === "form" ? 2 : 3;

  /* ── Success screen ──────────────────────────────────────────────────────── */
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

            {/* Institution */}
            <div className="rounded-xl px-5 py-4 mb-4 border" style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9" }}>
              <p className="text-xs text-gray-500 mb-1">Registered Institution</p>
              <p className="font-bold text-gray-800">{codeInfo?.institution}</p>
              <p className="text-sm text-gray-500 mt-0.5">{codeInfo?.zone} · {codeInfo?.state}</p>
            </div>

            {/* Reference ID */}
            {refId && (
              <div
                className="rounded-xl px-5 py-3 mb-6 border font-mono text-sm font-bold"
                style={{ borderColor: "#d4eadb", backgroundColor: "#f8fdf9", color: "#008751" }}
              >
                Reference ID: {refId}
              </div>
            )}

            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Keep your Reference ID safe. Present it at the convention venue for final verification.
              Your documents will be reviewed by the ICPC team.
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

  /* ── Main form ───────────────────────────────────────────────────────────── */
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
            ].map(({ n, label }, i, arr) => (
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
                  <span
                    className={`text-xs font-medium hidden sm:inline ${currentStep === n ? "text-gray-800" : "text-gray-400"}`}
                  >
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
            ))}
          </div>
        </div>
      </section>

      <section className="py-12" style={{ backgroundColor: "#f8fdf9" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-sm border overflow-hidden" style={{ borderColor: "#d4eadb" }}>

            {/* ── STEP 1: Code entry ──────────────────────────────────────── */}
            {step === "code" && (
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Crimson Pro', serif" }}>
                  Enter Your Accreditation Code
                </h2>
                <p className="text-gray-500 text-sm mb-8">
                  Your ICPC accreditation code was issued to your institution's SUG.
                  Format: <strong className="font-mono">NANS-XXXX-XXXX</strong>
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
                    className={`${inputCls} font-mono text-xl tracking-widest text-center uppercase`}
                    style={{ borderColor: "#d4eadb", letterSpacing: "0.15em" }}
                    maxLength={14}
                  />
                  {codeError && (
                    <div className="mt-3 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
                      <span className="text-red-500 flex-shrink-0">⚠️</span>
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
                  <strong>Don't have a code?</strong> Accreditation codes are issued by the ICPC to each
                  institution's SUG. Contact the ICPC Secretariat at{" "}
                  <a
                    href="mailto:nationalasgnans2025@gmail.com?subject=Request%20for%20Accreditation%20Code&body=Dear%20NANS%20ASG%20Secretariat,%0A%0AI%20hope%20this%20message%20finds%20you%20well.%0A%0AI%20am%20writing%20in%20my%20capacity%20as%20the%20SUG%20President%20of%20[Your%20Institution%20Name]%20to%20formally%20request%20our%20institution%E2%80%99s%20accreditation%20code%20for%20the%20upcoming%20process.%0A%0AKindly%20provide%20the%20necessary%20code%20and%20any%20additional%20instructions%20required%20to%20complete%20the%20accreditation.%0A%0AThank%20you%20for%20your%20support%20and%20prompt%20response.%0A%0AYours%20faithfully,%0A[Your%20Full%20Name]%0ASUG%20President,%20[Your%20Institution%20Name]%0A[Your%20Phone%20Number]"
                    className="font-semibold"
                    style={{ color: "#008751" }}
                  >
                    nationalasgnans2025@gmail.com
                  </a>{" "}
                  or whatsapp <a
                    href="https://wa.me/2348136098545?text=Dear%20NANS%20ASG%20Secretariat,%0A%0AI%20hope%20this%20message%20finds%20you%20well.%0A%0AI%20am%20writing%20in%20my%20capacity%20as%20the%20SUG%20President%20of%20[Your%20Institution%20Name]%20to%20formally%20request%20our%20institution%E2%80%99s%20accreditation%20code%20for%20the%20upcoming%20process.%0A%0AKindly%20provide%20the%20necessary%20code%20and%20any%20additional%20instructions%20required%20to%20complete%20the%20accreditation.%0A%0AThank%20you%20for%20your%20support.%0A%0AYours%20faithfully,%0A[Your%20Full%20Name]%0A[Your%20Institution%20Name]"
                    target="_blank"
                    className="font-semibold"
                    style={{ color: "#008751" }}
                    rel="noopener noreferrer"
                  >
                    <strong>+234 813 609 8545</strong>
                  </a>.
                </div>
              </div>
            )}

            {/* ── STEP 2: Registration form ────────────────────────────────── */}
            {step === "form" && codeInfo && (
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Crimson Pro', serif" }}>
                  Your Details
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  All information will be reviewed by the ICPC. Ensure everything is accurate before submitting.
                </p>

                {/* Institution card */}
                <div
                  className="rounded-xl border p-4 mb-8 flex items-center gap-4"
                  style={{ borderColor: "#d4eadb", backgroundColor: "#f0fdf4" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0"
                    style={{ backgroundColor: "#008751" }}
                  >
                    <RiSchoolFill />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">Registering for</p>
                    <p className="font-bold text-gray-800">{codeInfo.institution}</p>
                    <p className="text-xs text-gray-500">{codeInfo.zone} · {codeInfo.state}</p>
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "#e8f5ee", color: "#008751" }}
                  >
                    ✓ Code Verified
                  </span>
                </div>

                <div className="space-y-5">
                  {/* Full Name */}
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

                  {/* Position */}
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
                      <option value="SRC President">SRC President</option>
                    </select>
                  </div>

                  {/* Matric Number */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Matriculation Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2019/1/0001CE"
                      value={form.matricNumber}
                      onChange={(e) => setForm((f) => ({ ...f, matricNumber: e.target.value }))}
                      className={`${inputCls} font-mono`}
                      style={{ borderColor: "#d4eadb" }}
                    />
                  </div>

                  {/* Phone + Email */}
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
                        Email <span className="text-gray-400 font-normal">optional</span>
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

                  {/* ── Document uploads ─────────────────────────────────── */}
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 pt-2">
                      Document Uploads <span className="text-red-500">*</span>
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <UploadField
                        label="Passport Photograph"
                        hint="JPEG or PNG · Max 5 MB"
                        accept="image/jpeg,image/png,image/webp"
                        icon={<BiCamera />}
                        inputId="passport-upload"
                        file={passportFile}
                        uploading={passportUploading}
                        url={passportUrl}
                        error={passportError}
                        onFileChosen={handlePassportChosen}
                      />
                      <UploadField
                        label="School ID Card"
                        hint="JPEG, PNG or PDF · Max 5 MB"
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        icon={<BiIdCard />}
                        inputId="school-id-upload"
                        file={schoolIdFile}
                        uploading={schoolIdUploading}
                        url={schoolIdUrl}
                        error={schoolIdError}
                        onFileChosen={handleSchoolIdChosen}
                      />
                    </div>
                  </div>

                  {/* Upload in-progress notice */}
                  {uploadsInProgress && (
                    <div
                      className="rounded-xl px-4 py-3 flex items-center gap-2.5 text-sm"
                      style={{ backgroundColor: "#f0fdf4", color: "#008751" }}
                    >
                      <svg className="animate-spin w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Securely uploading your documents…
                    </div>
                  )}

                  {/* Submit error */}
                  {submitError && (
                    <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                      {submitError}
                    </div>
                  )}
                </div>

                {/* Final note */}
                <div
                  className="mt-6 rounded-xl p-4 border-l-4 text-xs text-gray-600 leading-relaxed"
                  style={{ borderLeftColor: "#C8A000", backgroundColor: "#fdfdf0" }}
                >
                  ⚠️ <strong>Each accreditation code can only be used once.</strong> Once you submit,
                  you cannot change your details or re-register with the same code. Ensure all
                  information is correct before proceeding.
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <button
                    onClick={() => { setStep("code"); setCodeInfo(null); }}
                    className="px-6 py-2.5 text-sm font-semibold rounded-xl border transition-all hover:bg-gray-50"
                    style={{ borderColor: "#d4eadb", color: "#374151" }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!formReady || submitting}
                    className="px-8 py-3 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
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