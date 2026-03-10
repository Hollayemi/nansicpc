"use client"

import React, { useState } from "react";
import Link from "next/link";
import Wrapper from "../components/wrapper";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  featured?: boolean;
  tag: string;
  tagColor: string;
}

const articles: NewsArticle[] = [
  {
    id: 1,
    title: "JCC Approves 2025 Electoral Guidelines — Voter Registration Opens June 20",
    excerpt:
      "The NANS Joint Consultative Council, at its extraordinary session held in Abuja, has unanimously ratified the updated electoral guidelines for the 2025 General Election cycle.",
    body: "",
    category: "Elections",
    date: "June 10, 2025",
    author: "NANS Secretariat",
    readTime: "4 min read",
    featured: true,
    tag: "ELECTIONS",
    tagColor: "#008751",
  },
  {
    id: 2,
    title: "NANS Meets Honourable Minister on ASUU Strike Resolution & Tertiary Education Funding",
    excerpt:
      "The NANS National Executive Council held a high-level meeting with the Honourable Minister of Education to address outstanding ASUU grievances and the state of university infrastructure across Nigeria.",
    body: "",
    category: "Advocacy",
    date: "May 28, 2025",
    author: "NEC Communications Desk",
    readTime: "5 min read",
    tag: "ADVOCACY",
    tagColor: "#005c37",
  },
  {
    id: 3,
    title: "NANS-ICPC Anti-Corruption Vanguard Expands to 50 New Campuses Nationwide",
    excerpt:
      "The NANS-ICPC partnership programme has officially onboarded 50 additional tertiary institutions, bringing the total coverage to over 250 campuses across all six geopolitical zones.",
    body: "",
    category: "ICPC",
    date: "May 15, 2025",
    author: "NANS-ICPC Desk",
    readTime: "3 min read",
    tag: "ICPC",
    tagColor: "#C8A000",
  },
  {
    id: 4,
    title: "NANS Student Welfare Summit 2025 — Registration Now Open for All Institutions",
    excerpt:
      "The annual NANS Student Welfare Summit brings together student union leaders, university management, government officials, and development partners to deliberate on pressing student welfare challenges.",
    body: "",
    category: "Welfare",
    date: "April 30, 2025",
    author: "NANS Welfare Directorate",
    readTime: "3 min read",
    tag: "WELFARE",
    tagColor: "#007a45",
  },
  {
    id: 5,
    title: "NANS Condemns Rise in Cultism and Campus Insecurity — Calls on FG to Act",
    excerpt:
      "In a strongly worded communiqué issued at the end of its NEC meeting, NANS has called on the Federal Government and institutional management to urgently address the surge in cult-related violence on Nigerian campuses.",
    body: "",
    category: "Security",
    date: "April 18, 2025",
    author: "NEC Communications Desk",
    readTime: "4 min read",
    tag: "SECURITY",
    tagColor: "#7c3aed",
  },
  {
    id: 6,
    title: "NANS Applauds Federal Government's Student Loan Scheme — Urges Faster Disbursement",
    excerpt:
      "NANS has commended the Federal Government's Nigerian Education Loan Fund (NELFUND) initiative, while urging the relevant agencies to accelerate the disbursement process to remove bottlenecks affecting applicants.",
    body: "",
    category: "Policy",
    date: "April 5, 2025",
    author: "NANS Policy Desk",
    readTime: "4 min read",
    tag: "POLICY",
    tagColor: "#0284c7",
  },
  {
    id: 7,
    title: "2025 NANS Presidential Aspirants Begin Filing — Four Candidates Emerge",
    excerpt:
      "With the opening of the nominations window, four aspirants have formally collected and submitted nomination forms for the presidential race. The Electoral Committee has confirmed receipt and commenced preliminary screening.",
    body: "",
    category: "Elections",
    date: "June 2, 2025",
    author: "Electoral Committee",
    readTime: "3 min read",
    tag: "ELECTIONS",
    tagColor: "#008751",
  },
  {
    id: 8,
    title: "NANS Zone E Hosts Successful Zonal Summit on Student Mental Health",
    excerpt:
      "Zone E (Southwest) NANS held a groundbreaking summit focusing on mental health awareness, counselling resources, and support frameworks for students battling academic pressure and socioeconomic stress.",
    body: "",
    category: "Welfare",
    date: "March 22, 2025",
    author: "Zone E Secretariat",
    readTime: "3 min read",
    tag: "WELFARE",
    tagColor: "#007a45",
  },
  {
    id: 9,
    title: "NANS Delegation Attends 54th AU Youth Council — Represents Nigerian Students on Global Stage",
    excerpt:
      "A five-member NANS delegation participated in the 54th African Union Youth Council meetings held in Addis Ababa, presenting a comprehensive report on the state of Nigerian student affairs and continental education advocacy priorities.",
    body: "",
    category: "International",
    date: "March 10, 2025",
    author: "NANS International Affairs",
    readTime: "5 min read",
    tag: "INTERNATIONAL",
    tagColor: "#dc2626",
  },
];

const categories = ["All", "Elections", "Advocacy", "ICPC", "Welfare", "Security", "Policy", "International"];

const FeaturedCard: React.FC<{ article: NewsArticle }> = ({ article: a }) => (
  <div
    className="rounded-2xl overflow-hidden border shadow-md hover:shadow-xl transition-all group"
    style={{ borderColor: "#d4eadb" }}
  >
    {/* Placeholder image area */}
    <div
      className="h-56 flex items-end p-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #008751 0%, #003d22 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 30px)",
        }}
      />
      <div
        className="absolute right-6 top-6 text-white opacity-10 font-bold leading-none select-none"
        style={{ fontSize: "80px", fontFamily: "'Crimson Pro',serif" }}
      >
        NANS
      </div>
      <div className="relative z-10">
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full text-white mb-3 inline-block"
          style={{ backgroundColor: "#C8A000" }}
        >
          ★ FEATURED
        </span>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full text-white ml-2 inline-block"
          style={{ backgroundColor: a.tagColor }}
        >
          {a.tag}
        </span>
      </div>
    </div>
    <div className="p-6 bg-white">
      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
        <span>{a.date}</span>
        <span>·</span>
        <span>{a.readTime}</span>
        <span>·</span>
        <span>{a.author}</span>
      </div>
      <h2
        className="font-bold text-gray-900 text-2xl mb-3 leading-snug group-hover:text-green-700 transition-colors"
        style={{ fontFamily: "'Crimson Pro', serif" }}
      >
        {a.title}
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">{a.excerpt}</p>
      <button
        className="inline-flex items-center gap-2 text-sm font-semibold transition-all"
        style={{ color: "#008751" }}
      >
        Read Full Article <span>→</span>
      </button>
    </div>
  </div>
);

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article: a }) => (
  <div
    className="bg-white rounded-2xl border overflow-hidden hover:shadow-md transition-all group flex flex-col"
    style={{ borderColor: "#d4eadb" }}
  >
    <div
      className="h-3"
      style={{ backgroundColor: a.tagColor }}
    />
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white"
          style={{ backgroundColor: a.tagColor }}
        >
          {a.tag}
        </span>
        <span className="text-xs text-gray-400">{a.date}</span>
      </div>
      <h3
        className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-green-700 transition-colors flex-1"
        style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem" }}
      >
        {a.title}
      </h3>
      <p className="text-gray-500 text-xs leading-relaxed mb-4">{a.excerpt}</p>
      <div className="flex items-center justify-between mt-auto pt-3 border-t" style={{ borderColor: "#e9f0e9" }}>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
            style={{ backgroundColor: a.tagColor }}
          >
            {a.author.slice(0, 1)}
          </div>
          <span className="text-xs text-gray-500 truncate max-w-[120px]">{a.author}</span>
        </div>
        <span className="text-xs text-gray-400">{a.readTime}</span>
      </div>
    </div>
  </div>
);

const News: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  const filtered = rest.filter((a) => {
    const catMatch = activeCategory === "All" || a.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const searchMatch =
      !searchQuery ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q);
    return catMatch && searchMatch;
  });

  return (
    <Wrapper>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#008751" }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 30px)",
          }}
        />
        <div
          className="absolute right-0 bottom-0 text-white opacity-5 font-bold leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(80px,18vw,220px)", fontFamily: "'Crimson Pro',serif" }}
        >
          NEWS
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <p className="text-green-200 text-sm font-medium mb-2">Stay Informed</p>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            News &amp; Updates
          </h1>
          <p className="text-green-100 text-lg max-w-xl leading-relaxed">
            Official announcements, press releases, advocacy updates, election news, and communiqués from NANS and its zonal bodies.
          </p>
          <div className="flex gap-2 mt-6 text-sm text-green-200">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">News &amp; Updates</span>
          </div>
        </div>
      </section>

      {/* Search + Filter bar */}
      <section className="py-6 bg-white border-b sticky top-[83px] z-40" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 bg-gray-50"
              style={{ borderColor: "#d4eadb", focusRingColor: "#008751" } as React.CSSProperties}
            />
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                  activeCategory === cat
                    ? "text-white border-transparent"
                    : "text-gray-600 border-gray-200 hover:border-green-300"
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
        </div>
      </section>

      {/* Content */}
      <section className="py-16" style={{ backgroundColor: "#f8fdf9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured story */}
          {featured && (activeCategory === "All" || activeCategory === featured.category) && !searchQuery && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <h2
                  className="font-bold text-gray-700 text-sm uppercase tracking-widest"
                >
                  Featured Story
                </h2>
                <div className="flex-1 h-px" style={{ backgroundColor: "#d4eadb" }} />
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <FeaturedCard article={featured} />

                {/* Side stories */}
                <div className="space-y-4">
                  {rest.slice(0, 3).map((a) => (
                    <div
                      key={a.id}
                      className="bg-white rounded-xl border p-4 flex gap-4 hover:shadow-md transition-all group cursor-pointer"
                      style={{ borderColor: "#d4eadb" }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: a.tagColor }}
                      >
                        {a.tag.slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-1">{a.date}</p>
                        <h4
                          className="font-semibold text-gray-800 text-sm leading-snug group-hover:text-green-700 transition-colors line-clamp-2"
                          style={{ fontFamily: "'Crimson Pro', serif" }}
                        >
                          {a.title}
                        </h4>
                        <span className="text-xs" style={{ color: a.tagColor }}>
                          {a.category}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Link
                    href="#all-news"
                    className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-xl border transition-all hover:bg-green-50"
                    style={{ borderColor: "#008751", color: "#008751" }}
                  >
                    View All Stories ↓
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* All articles grid */}
          <div id="all-news">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="font-bold text-gray-700 text-sm uppercase tracking-widest">
                {activeCategory === "All" ? "All Articles" : activeCategory}
                <span className="text-gray-400 font-normal ml-2">({filtered.length})</span>
              </h2>
              <div className="flex-1 h-px" style={{ backgroundColor: "#d4eadb" }} />
            </div>

            {filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((a) => (
                  <NewsCard key={a.id} article={a} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">📰</p>
                <p className="text-gray-600 font-medium mb-1">No articles found</p>
                <p className="text-gray-400 text-sm">
                  Try a different search term or category.
                </p>
                <button
                  onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                  className="mt-4 text-sm font-semibold underline"
                  style={{ color: "#008751" }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {/* Load more placeholder */}
          {filtered.length > 0 && (
            <div className="text-center mt-10">
              <button
                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold rounded-xl border transition-all hover:bg-white"
                style={{ borderColor: "#008751", color: "#008751" }}
              >
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter subscribe */}
      <section className="py-14 bg-white border-t" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3"
            style={{ color: "#008751" }}
          >
            Stay Updated
          </span>
          <h2
            className="text-3xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: "'Crimson Pro', serif" }}
          >
            Subscribe to NANS Updates
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Get official announcements, election news, and communiqués delivered directly to your inbox.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your institutional email"
              className="flex-1 px-4 py-2.5 text-sm border rounded-lg focus:outline-none"
              style={{ borderColor: "#d4eadb" }}
            />
            <button
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-all hover:opacity-90 flex-shrink-0"
              style={{ backgroundColor: "#008751" }}
            >
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            For students and institutional representatives only. No spam — unsubscribe anytime.
          </p>
        </div>
      </section>
    </Wrapper>
  );
};

export default News;
