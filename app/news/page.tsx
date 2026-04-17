"use client"

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Wrapper from "../components/wrapper";
import { FaSearch, FaVideo } from "react-icons/fa";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  link?: string;
  date: string;
  image?: string;
  videoUrl?: string; // New field for video content
  videoThumbnail?: string; // Custom thumbnail for video
  author: string;
  readTime: string;
  featured?: boolean;
  tag: string;
  tagColor: string;
  isVideo?: boolean; // Flag to identify video content
}

const articles: NewsArticle[] = [
  {
    id: 8,
    title: "OFFICIAL NOTICE: Nomination/Accreditation Forms Pick-Up Commences April 1st",
    excerpt: "The I-CPC announces that pick-up of Nomination/Accreditation Forms for the 2026 NANS National Convention will commence Wednesday, April 1st to Tuesday, April 7th, 2026. All aspirants are to contact the I-CPC Secretary via 07035565638.",
    body: `OFFICIAL NOTICE TO ALL ASPIRANTS AND THE GENERAL PUBLIC\n\nThis is to formally remind and inform all interested aspirants, stakeholders, and the general public that, in line with the timetable earlier released for the 2026 NANS National Convention, the pick-up of Nomination/Accreditation Forms will officially commence tomorrow, Wednesday 1st April 2026.\n\nThe exercise is scheduled to run from:\n\nWednesday, 1st April – Tuesday, 7th April 2026\n\nFurthermore, the Chairman of the I-CPC has directed that all aspirants are to contact the I-CPC Secretary for the collection of Nomination/Accreditation Forms within the stipulated period.\n\nThe I-CPC Secretary can be reached via: 07035565638 — through WhatsApp, SMS, or direct call.\n\nAll eligible aspirants are strongly advised to comply with this directive and obtain their forms promptly, as no extension may be granted after the deadline.\n\nThis process is a vital step towards ensuring a transparent, credible, and successful National Convention. Your cooperation is highly appreciated.\n\nTogether, we move towards a stronger and greater NANS.\n\nSigned:\n\nOmotayo Oladele Samuel (Dele Kenko)\nChairman\n2026 Independent Convention Planning Committee (I-CPC)\nNational Association of Nigerian Students (NANS)\n\nSuleiman Muhammad Sarki GCNS\nSecretary\n2026 Independent Convention Planning Committee (I-CPC)\nNational Association of Nigerian Students (NANS)`,
    image: "/images/chairman.jpeg",
    link: "/news/nomination-forms-2026",
    category: "Elections",
    date: "March 31, 2026",
    author: "NANS I-CPC",
    readTime: "2 min read",
    featured: true,
    tag: "OFFICIAL NOTICE",
    tagColor: "#D32F2F",
    isVideo: false,
  },
  {
    id: 7,
    title: "OFFICIAL NOTICE: Physical Screening of Aspirants for 2026 NANS National Convention",
    excerpt:
      "Following the successful completion of the Nomination/Accreditation Forms exercise, the Independent Convention Planning Committee announces the mandatory physical screening of all aspirants from April 12–19, 2026.",
    body: `OFFICIAL NOTICE TO ALL ASPIRANTS AND THE GENERAL PUBLIC\n\n11th April, 2026\n\nThis is to formally inform all aspirants, stakeholders, and the general public that, following the successful completion of the Nomination/Accreditation Forms exercise as outlined in the timetable for the 2026 NANS National Convention, the next phase of the process will commence accordingly.\n\nIn line with the approved schedule, the Physical Screening of Aspirants is slated to take place as follows:\n\nSunday, 12th April – Sunday, 19th April 2026\n\nAll aspirants are hereby directed to present themselves for the physical screening within the stipulated period. They are expected to come along with hardcopy of all relevant documents and credentials as required for verification.\n\nThis exercise is mandatory for all aspirants, and failure to appear for screening within the specified dates may lead to disqualification.\n\nThis stage remains critical in upholding the principles of transparency, credibility, and due process in the build-up to the 2026 NANS National Convention. All concerned are therefore urged to cooperate fully.\n\nTogether, we continue to build a stronger and more united NANS.\n\nSigned:\n\nOmotayo Oladele Samuel (Dele Kenko)\nChairman\n2026 Independent Convention Planning Committee (I-CPC)\nNational Association of Nigerian Students (NANS)\n\nSuleiman Muhammad Sarki GCNS\nSecretary\n2026 Independent Convention Planning Committee (I-CPC)\nNational Association of Nigerian Students (NANS)`,
    image: "/images/vote1.jpg",
    link: "/news/physical-screening-2026",
    category: "Elections",
    date: "April 11, 2026",
    author: "NANS I-CPC",
    readTime: "3 min read",
    featured: true, // Set to false if you don't want it featured
    tag: "OFFICIAL NOTICE",
    tagColor: "#D32F2F",
    isVideo: false,
  },
  {
    id: 1,
    title: "NANS-ICPC FELICITATES WITH MUSLIM STUDENTS, ASPIRANTS ON EID-EL-FITR",
    excerpt:
      "The Independent Convention Planning Committee of the National Association of Nigerian Students (NANS-ICPC) heartily felicitates with all Muslim students across Nigeria, members of the student movement, and all aspirants in the forthcoming NANS National Convention on the successful completion of the holy month of Ramadan and the joyous celebration of Eid-el-Fitr.",
    body: "",
    image: "/images/eid.jpg",
    link: "#",
    category: "Celebration",
    date: "March 20, 2026",
    author: "NANS-ICPC",
    readTime: "4 min read",
    featured: true,
    tag: "Celebration",
    tagColor: "#008751",
    isVideo: false,
  },
  {
    id: 2,
    title: "New NANS leaders to emerge May 24",
    excerpt:
      "The National Association of Nigerian Students (NANS) has announced the commencement of the processes that would, expectedly, culminate in the emergence of new leaders for the Association.",
    body: "",
    image: "/logo.jpg",
    link: "https://thesun.ng/new-nans-leaders-to-emerge-may-24/",
    category: "Elections",
    date: "March 13, 2026",
    author: "Fred Ezeh",
    readTime: "4 min read",
    featured: true,
    tag: "ELECTIONS",
    tagColor: "#008751",
    isVideo: false,
  },
  {
    id: 3,
    title: "Punch: NANS elects new president May 24",
    image: "/icpc-logo.jpg",
    excerpt:
      "The National Association of Nigerian Students will elect a new president on May 24 during its 2026 national convention scheduled to hold in Abuja. The Chairman of the 2026 Independent Convention Planning Committee, Omotayo Samuel, disclosed this on Wednesday while briefing journalists in Abuja.",
    body: "",
    category: "Advocacy",
    link: "https://punchng.com/nans-elects-new-president-may-24/",
    date: "March 11, 2026",
    author: "Deborah Tolu-Kolawole",
    readTime: "5 min read",
    featured: true,
    tag: "ADVOCACY",
    tagColor: "#005c37",
    isVideo: false,
  },
  {
    id: 4,
    title: "NANS Inaugurates Committee For NANS Election",
    excerpt: "Official press briefing on the upcoming NANS national convention, featuring key stakeholders and electoral committee members.",
    body: "",
    videoUrl: "/videos/vid1.mp4",
    videoThumbnail: "/thumbnails/Video1.jpg",
    category: "Press Briefing",
    date: "March 10, 2026",
    author: "NANS Media",
    readTime: "1:31 min watch",
    featured: true,
    tag: "VIDEO",
    tagColor: "#FF6B6B",
    isVideo: true,
  },
  {
    id: 5,
    title: "Exclusive Interview: Presidential Aspirants Debate",
    excerpt: "Watch the exclusive debate between leading NANS presidential aspirants discussing their manifestos and vision for Nigerian students.",
    body: "",
    videoUrl: "/videos/vid2.mp4",
    videoThumbnail: "/thumbnails/Video2.jpg",
    category: "Elections",
    date: "March 8, 2026",
    author: "NANS TV",
    readTime: "2:36 min watch",
    featured: true,
    tag: "VIDEO",
    tagColor: "#FF6B6B",
    isVideo: true,
  },
  {
    id: 6,
    title: "NANS calls for Unity Ahead of Convention",
    excerpt: "A documentary highlighting the recent achievements of NANS in advocating for students' rights across Nigerian institutions.",
    body: "",
    videoUrl: "/videos/vid3.mp4",
    videoThumbnail: "/thumbnails/Video3.jpg",
    category: "Advocacy",
    date: "March 5, 2026",
    author: "NANS Documentary",
    readTime: "18 min watch",
    featured: false,
    tag: "VIDEO",
    tagColor: "#FF6B6B",
    isVideo: true,
  },

];

const VideoPlayer: React.FC<{
  videoUrl: string;
  thumbnail?: string;
  title: string;
  onClose?: () => void;
  autoPlay?: boolean;
}> = ({ videoUrl, thumbnail, title, onClose, autoPlay = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (autoPlay) {
        videoRef.current.play().catch(() => {
          // Autoplay was prevented
          setIsPlaying(false);
        });
      }
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(parseFloat(e.target.value));
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <div
      className="relative bg-black rounded-lg overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnail}
        className="w-full aspect-video"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
      />

      {/* Video Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <span className="text-white text-sm font-medium truncate max-w-[70%]">
            {title}
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <span className="text-xl">✕</span>
            </button>
          )}
        </div>

        {/* Center Play Button (when paused) */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <span className="text-white text-3xl">▶</span>
          </button>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-white text-xs">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
            <span className="text-white text-xs">{formatTime(duration)}</span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="text-white hover:text-gray-300">
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button className="text-white hover:text-gray-300 text-sm">
                🔈
              </button>
            </div>
            <button onClick={toggleFullscreen} className="text-white hover:text-gray-300">
              ⛶
            </button>
          </div>
        </div>
      </div>

      {/* Video Quality Indicator */}
      <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
        HD
      </div>
    </div>
  );
};

const VideoModal: React.FC<{
  article: NewsArticle;
  onClose: () => void;
}> = ({ article, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <div className="relative w-full max-w-6xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors text-sm"
        >
          Close ✕
        </button>
        <VideoPlayer
          videoUrl={article.videoUrl!}
          thumbnail={article.videoThumbnail}
          title={article.title}
          autoPlay
        />
        <div className="mt-4 text-white">
          <h3 className="text-xl font-bold mb-2">{article.title}</h3>
          <p className="text-gray-300 text-sm">{article.excerpt}</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedCard: React.FC<{ article: NewsArticle; onVideoClick?: (article: NewsArticle) => void }> = ({
  article: a,
  onVideoClick
}) => {
  const handleClick = () => {
    if (a.isVideo && onVideoClick) {
      onVideoClick(a);
    } else if (a.link) {
      window.open(a.link, '_blank');
    }
  };

  return (
    <div
      className="rounded-2xl overflow-hidden border shadow-md hover:shadow-xl transition-all group cursor-pointer"
      style={{ borderColor: "#d4eadb" }}
      onClick={handleClick}
    >
      <div className="h-56 flex items-end p-6 relative overflow-hidden">
        <img
          src={a.isVideo ? a.videoThumbnail || a.image : a.image || "/placeholder.png"}
          alt={a.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Video Indicator Overlay */}
        {a.isVideo && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-all">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-3xl text-[#008751] ml-1">▶</span>
            </div>
          </div>
        )}

        <div className="relative z-10">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full text-white mb-3 inline-block"
            style={{ backgroundColor: "#C8A000" }}
          >
            ★ FEATURED
          </span>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full text-white ml-2 inline-block"
            style={{ backgroundColor: a.isVideo ? "#FF6B6B" : a.tagColor }}
          >
            {a.isVideo ? "VIDEO" : a.tag}
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
        <span
          className="inline-flex items-center gap-2 text-sm font-semibold transition-all text-[#008751]"
        >
          {a.isVideo ? 'Watch Video' : 'Read Full Article'} <span>→</span>
        </span>
      </div>
    </div>
  );
};

const NewsCard: React.FC<{ article: NewsArticle; onVideoClick?: (article: NewsArticle) => void }> = ({
  article: a,
  onVideoClick
}) => {
  const handleClick = () => {
    if (a.isVideo && onVideoClick) {
      onVideoClick(a);
    } else if (a.link) {
      window.open(a.link, '_blank');
    }
  };

  return (
    <div
      className="bg-white rounded-2xl border overflow-hidden hover:shadow-md transition-all group flex flex-col cursor-pointer"
      style={{ borderColor: "#d4eadb" }}
      onClick={handleClick}
    >
      {a.isVideo && a.videoThumbnail ? (
        <div className="relative h-40 overflow-hidden">
          <img
            src={a.videoThumbnail}
            alt={a.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-all">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
              <span className="text-2xl text-[#008751] ml-1">▶</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-3" style={{ backgroundColor: a.isVideo ? "#FF6B6B" : a.tagColor }} />
      )}

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white"
            style={{ backgroundColor: a.isVideo ? "#FF6B6B" : a.tagColor }}
          >
            {a.isVideo ? "VIDEO" : a.tag}
          </span>
          <span className="text-xs text-gray-400">{a.date}</span>
        </div>
        <h3
          className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-green-700 transition-colors flex-1"
          style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem" }}
        >
          {a.title}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{a.excerpt}</p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t" style={{ borderColor: "#e9f0e9" }}>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
              style={{ backgroundColor: a.isVideo ? "#FF6B6B" : a.tagColor }}
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
};

const News: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<NewsArticle | null>(null);
  const [showVideoLibrary, setShowVideoLibrary] = useState(false);

  const featured = articles.filter((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);
  const videoArticles = articles.filter(a => a.isVideo);

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

  const categories = ["All", ...new Set(articles.map((c) => c.category))];

  return (
    <Wrapper>
      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          article={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

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

          {/* Video Library Quick Access */}
          {videoArticles.length > 0 && (
            <div className="mt-8">
              <button
                onClick={() => setShowVideoLibrary(!showVideoLibrary)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-all"
              >
                <span><FaVideo /></span>
                Video Library ({videoArticles.length})
                <span className={`transform transition-transform ${showVideoLibrary ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
            </div>
          )}

          <div className="flex gap-2 mt-6 text-sm text-green-200">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">News &amp; Updates</span>
          </div>
        </div>
      </section>

      {/* Video Library Section */}
      {showVideoLibrary && videoArticles.length > 0 && (
        <section className="py-8 bg-white border-b" style={{ borderColor: "#e5f0e5" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-900 text-xl" style={{ fontFamily: "'Crimson Pro', serif" }}>
                <FaVideo /> Video Library
              </h2>
              <button
                onClick={() => setShowVideoLibrary(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {videoArticles.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                    <img
                      src={video.videoThumbnail || video.image}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <span className="text-2xl text-[#008751] ml-1">▶</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{video.readTime}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search + Filter bar */}
      <section className="py-6 bg-white border-b sticky top-[83px] z-40" style={{ borderColor: "#e5f0e5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"><FaSearch /></span>
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 bg-gray-50"
              style={{ borderColor: "#d4eadb", focusRingColor: "#008751" } as React.CSSProperties}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all ${activeCategory === cat
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
          {featured.length > 0 && (activeCategory === "All" || activeCategory === featured[0].category) && !searchQuery && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-bold text-gray-700 text-sm uppercase tracking-widest">
                  Featured Story
                </h2>
                <div className="flex-1 h-px" style={{ backgroundColor: "#d4eadb" }} />
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                {featured.map((f) => (
                  <FeaturedCard
                    key={f.id}
                    article={f}
                    onVideoClick={setSelectedVideo}
                  />
                ))}
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
                  <NewsCard
                    key={a.id}
                    article={a}
                    onVideoClick={setSelectedVideo}
                  />
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