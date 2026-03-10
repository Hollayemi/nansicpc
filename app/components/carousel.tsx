"use client"

import React, { useEffect, useState } from 'react';

export default function SkillsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const skills = [
    {
      name: 'Typescript',
      icon: '/stacks/ts.png',
      level: 95,
      description: 'Semantic markup & accessibility',
    },
    {
      name: 'Javascript',
      icon: '/stacks/js.png',
      level: 92,
      description: 'Modern layouts & animations',
    },
    {
      name: 'Tailwind Css',
      icon: '/stacks/tailwind.png',
      level: 90,
      description: 'ES6+ & DOM manipulation',
    },
    {
      name: 'Reactjs',
      icon: '/stacks/react.png',
      level: 90,
      description: 'ES6+ & DOM manipulation',
    },
    {
      name: 'Nextjs',
      icon: '/stacks/nextjs.png',
      level: 90,
      description: 'ES6+ & DOM manipulation',
    },
    {
      name: 'Redux',
      icon: '/stacks/redux.png',
      level: 88,
      description: 'Hooks & component architecture',
    },
    {
      name: 'React Router',
      icon: '/stacks/reactrouter.svg',
      level: 85,
      description: 'Utility-first styling',
    },
    {
      name: 'Mongogb',
      icon: '/stacks/mongodb.png',
      level: 82,
      description: 'Type-safe development',
    },
    {
      name: 'PGSQL',
      icon: '/stacks/pgsql.png',
      level: 80,
      description: 'Progressive framework',
    },
    {
      name: 'Node.js',
      icon: '/stacks/node.svg',
      level: 78,
      description: 'Backend & API development',
    },
    {
      name: 'Prisma',
      icon: '/stacks/prisma.svg',
      level: 90,
      description: 'UI/UX design & prototyping',
    },
    {
      name: 'Git',
      icon: '/stacks/git.svg',
      level: 85,
      description: 'Version control & collaboration',
    },
  ];

  const skillsPerView = 5;
  const totalSlides = Math.ceil(skills.length / skillsPerView);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isPaused, totalSlides]);

  const goToSlide = (index:any) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSkills = () => {
    const start = currentIndex * skillsPerView;
    return skills.slice(start, start + skillsPerView);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb--12">
        <span className="inline-block font-mono text-sm text-[#00ff88] uppercase tracking-[2px] mb-4 px-4 py-2 border border-[#00ff88] rounded-sm">
          Skills & Technologies
        </span>
        {/* <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          What I Work With
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          A comprehensive toolkit for building modern web experiences
        </p> */}
      </div>

      {/* Carousel Container */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Skills Cards */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="min-w-full py-10 flex gap-4 px-2"
              >
                {skills
                  .slice(
                    slideIndex * skillsPerView,
                    slideIndex * skillsPerView + skillsPerView
                  )
                  .map((skill, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-[#141414] border border-[#2a2a2a] rounded-lg p-4 transition-all duration-300 hover:border-[#00ff88] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,255,136,0.1)] group"
                    >
                      {/* Icon */}
                      <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                        <img src ={skill.icon} className="w-10 h-10" />
                      </div>

                      {/* Skill Name */}
                      <h3 className="text-lg font-bold mb-1 group-hover:text-[#00ff88] transition-colors">
                        {skill.name}
                      </h3>

                      {/* Description */}
                      {/* <p className="text-gray-400 text-xs mb-3 leading-relaxed">
                        {skill.description}
                      </p> */}

                      {/* Progress Bar */}
                      {/* <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[10px] text-gray-500">
                            Proficiency
                          </span>
                          <span className="font-mono text-[10px] text-[#00ff88]">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#00ff88] to-[#00ddff] rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${skill.level}%`,
                            }}
                          />
                        </div>
                      </div> */}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-[#141414] border border-[#2a2a2a] text-gray-400 w-12 h-12 rounded-full flex items-center justify-center hover:border-[#00ff88] hover:text-[#00ff88] transition-all duration-300 hover:scale-110 group"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-[#141414] border border-[#2a2a2a] text-gray-400 w-12 h-12 rounded-full flex items-center justify-center hover:border-[#00ff88] hover:text-[#00ff88] transition-all duration-300 hover:scale-110 group"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-3 mt-10">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              currentIndex === index
                ? 'w-12 h-3 bg-[#00ff88] rounded-full'
                : 'w-3 h-3 bg-[#2a2a2a] rounded-full hover:bg-[#00ff88]/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="text-center mt-6">
        <p className="font-mono text-xs text-gray-500">
          {isPaused ? '⏸ Paused' : '▶ Auto-playing'} · Hover to pause
        </p>
      </div>
    </div>
  );
}