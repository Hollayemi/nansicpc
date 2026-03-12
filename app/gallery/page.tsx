"use client";
import React, { useState, useEffect, useCallback } from "react";
import Wrapper from "../components/wrapper";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
type Category = "All" | "Convention" | "Advocacy" | "Welfare" | "Leadership" | "Zones";

interface GalleryItem {
  id: number;
  title: string;
  caption: string;
  category: Exclude<Category, "All">;
  date: string;
  src: string;
  featured?: boolean;
  size?: "normal" | "wide" | "tall";
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "2026 NANS National Convention Opening Ceremony",
    caption: "Delegates from all six geopolitical zones gather as the ICPC officially opens the 2026 NANS National Convention in Abuja.",
    category: "Convention",
    date: "July 15, 2026",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    featured: true,
    size: "wide",
  },
  {
    id: 2,
    title: "ICPC Screening Exercise",
    caption: "ICPC committee members conduct the official screening of presidential aspirants ahead of the convention.",
    category: "Convention",
    date: "June 18, 2026",
    src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",
    size: "tall",
  },
  {
    id: 3,
    title: "NANS Meets Education Minister",
    caption: "NANS NEC delegation meets the Honourable Minister of Education to present student welfare demands.",
    category: "Advocacy",
    date: "May 28, 2026",
    src: "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?w=800&q=80",
  },
  {
    id: 4,
    title: "Zone E Student Welfare Summit",
    caption: "Southwest zone hosts a landmark summit on student mental health, housing, and academic support systems.",
    category: "Welfare",
    date: "March 22, 2026",
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    size: "wide",
  },
  {
    id: 5,
    title: "Delegate Accreditation Day",
    caption: "Student delegates from over 200 institutions arrive for biometric accreditation ahead of election day.",
    category: "Convention",
    date: "July 12, 2026",
    src: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
  },
  {
    id: 6,
    title: "NANS AU Youth Council Delegation",
    caption: "A five-member NANS delegation represents Nigerian students at the 54th African Union Youth Council in Addis Ababa.",
    category: "Advocacy",
    date: "March 10, 2026",
    src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80",
    size: "tall",
  },
  {
    id: 7,
    title: "NEC Monthly Meeting, Abuja",
    caption: "National Executive Council members in session at the NANS Secretariat, Garki II, Abuja.",
    category: "Leadership",
    date: "April 5, 2026",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    id: 8,
    title: "Zone A Student Congress",
    caption: "Northwest zone holds its annual student congress, electing new zonal executives and debating key policy resolutions.",
    category: "Zones",
    date: "February 14, 2026",
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    size: "wide",
  },
  {
    id: 9,
    title: "Candidates Town Hall — Live Stream",
    caption: "All presidential and senate candidates face delegates in a nationally streamed Town Hall moderated by the ICPC.",
    category: "Convention",
    date: "July 7, 2026",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
  },
  {
    id: 10,
    title: "NANS Student Welfare Summit 2026",
    caption: "Over 300 student union leaders, educators, and government officials gather at the annual welfare summit.",
    category: "Welfare",
    date: "April 30, 2026",
    src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
    size: "tall",
  },
  {
    id: 11,
    title: "Zone D Southeast Cultural Showcase",
    caption: "Southeast zone celebrates cultural heritage at the annual NANS inter-zone cultural exchange festival.",
    category: "Zones",
    date: "January 28, 2026",
    src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
  },
  {
    id: 12,
    title: "NANS Leadership Capacity Training",
    caption: "Emerging student leaders from across Nigeria undergo intensive governance and leadership training at the Secretariat.",
    category: "Leadership",
    date: "March 1, 2026",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    size: "wide",
  },
  {
    id: 13,
    title: "Election Day Voting",
    caption: "Accredited delegates cast their votes by secret ballot at the designated polling centres during the 2026 NANS General Election.",
    category: "Convention",
    date: "July 15, 2026",
    src: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=800&q=80",
  },
  {
    id: 14,
    title: "Zone F Southsouth Students Assembly",
    caption: "Southsouth delegates gather in Port Harcourt for the zone's quarterly students' assembly and advocacy planning session.",
    category: "Zones",
    date: "February 5, 2026",
    src: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800&q=80",
  },
  {
    id: 15,
    title: "Inauguration of New NANS Leadership",
    caption: "Newly elected NANS National President and Senate President are sworn in at the public inauguration ceremony.",
    category: "Leadership",
    date: "August 1, 2026",
    src: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80",
    featured: true,
    size: "tall",
  },
  {
    id: 16,
    title: "Campus Outreach — NANS Welfare Drive",
    caption: "NANS welfare team distributes study materials and emergency support packages to students across selected campuses.",
    category: "Welfare",
    date: "April 12, 2026",
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
  },
];

const categories: Category[] = ["All", "Convention", "Advocacy", "Welfare", "Leadership", "Zones"];

const featuredSlides = galleryItems.filter((g) => g.featured);

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

/* --- Lightbox --- */
const Lightbox: React.FC<{
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ item, items, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  const idx = items.findIndex((i) => i.id === item.id);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl transition-all hover:scale-110 z-10"
        style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        onClick={onClose}
      >
        ✕
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 sm:left-8 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl transition-all hover:scale-110 z-10"
        style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        ‹
      </button>

      {/* Image panel */}
      <div
        className="relative max-w-5xl w-full mx-16 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.title}
          className="w-full object-cover"
          style={{ maxHeight: "70vh" }}
        />
        <div
          className="px-6 py-5"
          style={{ backgroundColor: "#0a1f0a" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full text-white mb-2 inline-block"
                style={{ backgroundColor: "#008751" }}
              >
                {item.category}
              </span>
              <h3
                className="text-white font-bold text-lg leading-snug"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1 leading-relaxed">{item.caption}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-gray-500 text-xs">{item.date}</p>
              <p className="text-gray-600 text-xs mt-1">
                {idx + 1} / {items.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Next */}
      <button
        className="absolute right-4 sm:right-8 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl transition-all hover:scale-110 z-10"
        style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        ›
      </button>
    </div>
  );
};

/* --- Gallery Card --- */
const GalleryCard: React.FC<{
  item: GalleryItem;
  onClick: () => void;
  index: number;
}> = ({ item, onClick, index }) => {
  const isWide = item.size === "wide";
  const isTall = item.size === "tall";

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
        isWide ? "col-span-2" : ""
      } ${isTall ? "row-span-2" : ""}`}
      style={{
        animationDelay: `${index * 60}ms`,
      }}
      onClick={onClick}
    >
      {/* Image */}
      <div
        className="w-full overflow-hidden"
        style={{ height: isTall ? "480px" : "240px" }}
      >
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Gradient overlay — always visible at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,20,10,0.85) 0%, rgba(0,20,10,0.3) 45%, transparent 70%)",
        }}
      />

      {/* Category badge */}
      <div className="absolute top-3 left-3">
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white tracking-wide"
          style={{ backgroundColor: "rgba(0,135,81,0.85)", backdropFilter: "blur(4px)" }}
        >
          {item.category.toUpperCase()}
        </span>
      </div>

      {/* Expand icon on hover */}
      <div
        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
        style={{ backgroundColor: "rgba(200,160,0,0.9)" }}
      >
        ⤢
      </div>

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3
          className="text-white font-bold leading-snug text-sm mb-1 line-clamp-2"
          style={{ fontFamily: "'Crimson Pro', serif", fontSize: "0.95rem" }}
        >
          {item.title}
        </h3>
        <p className="text-gray-300 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 line-clamp-2 leading-relaxed">
          {item.caption}
        </p>
        <p
          className="text-xs mt-2 font-medium"
          style={{ color: "#C8A000" }}
        >
          {item.date}
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────────── */
const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  /* Carousel auto-advance */
  useEffect(() => {
    if (carouselPaused) return;
    const id = setInterval(() => {
      setCarouselIdx((i) => (i + 1) % featuredSlides.length);
    }, 4500);
    return () => clearInterval(id);
  }, [carouselPaused]);

  /* Filtered items */
  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory);

  /* Lightbox navigation */
  const openLightbox = useCallback((item: GalleryItem) => setLightboxItem(item), []);

  const closeLightbox = useCallback(() => setLightboxItem(null), []);

  const prevLightbox = useCallback(() => {
    if (!lightboxItem) return;
    const idx = filtered.findIndex((i) => i.id === lightboxItem.id);
    setLightboxItem(filtered[(idx - 1 + filtered.length) % filtered.length]);
  }, [lightboxItem, filtered]);

  const nextLightbox = useCallback(() => {
    if (!lightboxItem) return;
    const idx = filtered.findIndex((i) => i.id === lightboxItem.id);
    setLightboxItem(filtered[(idx + 1) % filtered.length]);
  }, [lightboxItem, filtered]);

  const currentSlide = featuredSlides[carouselIdx];

  return (
    <Wrapper>

      {/* ── FEATURED CAROUSEL ── */}
      <section
        className="relative"
        style={{ backgroundColor: "#0a1f0a" }}
        onMouseEnter={() => setCarouselPaused(true)}
        onMouseLeave={() => setCarouselPaused(false)}
      >
        <div className="relative overflow-hidden" style={{ height: "420px" }}>
          {featuredSlides.map((slide, i) => (
            <div
              key={slide.id}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === carouselIdx ? 1 : 0 }}
            >
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,15,8,0.82) 0%, rgba(0,15,8,0.4) 55%, transparent 100%)",
                }}
              />
            </div>
          ))}

          {/* Slide content */}
          <div className="absolute inset-0 flex items-end pb-14 px-8 sm:px-16 max-w-3xl">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: "#008751" }}
                >
                  ★ FEATURED
                </span>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#C8A000", color: "#1a1500" }}
                >
                  {currentSlide?.category.toUpperCase()}
                </span>
              </div>
              <h2
                className="text-white text-3xl sm:text-4xl font-bold leading-tight mb-3"
                style={{ fontFamily: "'Crimson Pro', serif" }}
              >
                {currentSlide?.title}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-lg mb-4">
                {currentSlide?.caption}
              </p>
              <div className="flex items-center gap-4">
                <span
                  className="text-sm font-medium"
                  style={{ color: "#C8A000" }}
                >
                  {currentSlide?.date}
                </span>
                <button
                  className="text-sm font-semibold text-white flex items-center gap-1 hover:gap-2 transition-all"
                  onClick={() => currentSlide && openLightbox(currentSlide)}
                >
                  View full image →
                </button>
              </div>
            </div>
          </div>

          {/* Carousel controls — bottom right */}
          <div className="absolute bottom-5 right-8 flex items-center gap-3">
            {/* Prev / Next */}
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-lg transition-all hover:scale-110"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              onClick={() =>
                setCarouselIdx((i) => (i - 1 + featuredSlides.length) % featuredSlides.length)
              }
            >
              ‹
            </button>
            {/* Dots */}
            <div className="flex items-center gap-2">
              {featuredSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIdx(i)}
                  className="rounded-full transition-all duration-400"
                  style={{
                    width: i === carouselIdx ? "22px" : "7px",
                    height: "7px",
                    backgroundColor:
                      i === carouselIdx ? "#C8A000" : "rgba(255,255,255,0.4)",
                    border: "none",
                  }}
                />
              ))}
            </div>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-lg transition-all hover:scale-110"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              onClick={() =>
                setCarouselIdx((i) => (i + 1) % featuredSlides.length)
              }
            >
              ›
            </button>
          </div>

          {/* Pause indicator */}
          <div className="absolute top-4 right-6 text-xs text-white/40 font-mono">
            {carouselPaused ? "⏸ paused" : "▶ auto"}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex overflow-x-auto gap-2 px-4 py-3 scrollbar-hide">
          {featuredSlides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => setCarouselIdx(i)}
              className="flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300"
              style={{
                width: "90px",
                height: "56px",
                outline: i === carouselIdx ? "2px solid #C8A000" : "2px solid transparent",
                outlineOffset: "2px",
                opacity: i === carouselIdx ? 1 : 0.45,
              }}
            >
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <section className="py-6 bg-white border-b sticky top-[83px] z-40" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all ${
                  activeCategory === cat
                    ? "text-white border-transparent shadow-sm"
                    : "text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-700"
                }`}
                style={
                  activeCategory === cat
                    ? { backgroundColor: "#008751", borderColor: "#008751" }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            Showing{" "}
            <strong className="text-gray-700">{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "photo" : "photos"}
          </p>
        </div>
      </section>

      {/* ── MASONRY-STYLE GALLERY GRID ── */}
      <section className="py-12" style={{ backgroundColor: "#f8fdf9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length > 0 ? (
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gridAutoRows: "240px",
                gridAutoFlow: "dense",
              }}
            >
              {filtered.map((item, index) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={index}
                  onClick={() => openLightbox(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">📷</p>
              <p className="text-gray-500 font-medium">No photos in this category yet.</p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-3 text-sm font-semibold underline"
                style={{ color: "#008751" }}
              >
                View all photos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── SUBMIT PHOTOS CTA ── */}
      <section
        className="relative py-14 overflow-hidden"
        style={{ backgroundColor: "#008751" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 30px)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center text-white">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: "#C8A000" }}
          >
            Contribute
          </span>
          <h2
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            Share Your NANS Moments
          </h2>
          <p className="text-green-100 text-sm leading-relaxed mb-7 max-w-xl mx-auto">
            Were you at a NANS event, convention, or zonal programme? Submit your photos to
            be featured in the official NANS gallery. All submissions are reviewed by the
            NANS Communications Desk before publication.
          </p>
          <a
            href="mailto:media@nans.org.ng"
            className="inline-flex items-center gap-2 px-8 py-3 font-semibold text-sm rounded-lg transition-all hover:scale-105"
            style={{ backgroundColor: "#C8A000", color: "#1a1500" }}
          >
            Submit Photos →
          </a>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          items={filtered}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </Wrapper>
  );
};

export default Gallery;