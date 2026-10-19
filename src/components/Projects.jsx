import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import { projects } from '../data/portfolio';

const categoryBadges = {
  Professional: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Freelance: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Personal: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
};

// Filter categories
const filterTabs = [
  { id: 'all', label: 'All Projects', icon: '⚡' },
  { id: 'Railway', label: 'Railway & Enterprise', icon: '🚂' },
  { id: 'POS & Hospitality', label: 'POS Ecosystem', icon: '🍽️' },
  { id: 'AI & Python', label: 'AI & Python', icon: '🧠' },
  { id: 'Health & Fitness', label: 'Health & Wellness', icon: '🩺' },
];

const popularTechs = ['Flutter', 'React', 'Python', 'ObjectBox', 'BLoC', 'Socket.IO', 'GetX', 'Dio'];

// Card with mouse-following dynamic spotlight glow
const BentoCard = ({ project, onSelect, index }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(project)}
      className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#121214]/80 backdrop-blur-xl transition-all duration-500 hover:border-[#ff2a2a]/60 hover:shadow-[0_20px_50px_rgba(255,42,42,0.18)] cursor-pointer flex flex-col justify-between"
    >
      {/* Mouse spotlight glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 rounded-3xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 42, 42, 0.16), transparent 70%)`,
        }}
      />

      <div>
        {/* Project Thumbnail Image with overlay gradient */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/50">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/40">
              <span className="text-5xl">⚡</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/20 to-transparent" />

          {/* Badges on top */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border backdrop-blur-md shadow-lg ${
                categoryBadges[project.category] || 'bg-white/10 text-white border-white/20'
              }`}
            >
              {project.category}
            </span>

            {project.featured && (
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#ff2a2a] text-white shadow-[0_0_15px_rgba(255,42,42,0.6)] flex items-center gap-1">
                <span>★</span> Flagship
              </span>
            )}
          </div>

          {/* Quick Domain Tag */}
          {project.domain && (
            <div className="absolute bottom-3 left-4">
              <span className="text-[11px] font-semibold text-white/80 bg-black/60 backdrop-blur-md border border-white/15 px-2.5 py-0.5 rounded-md">
                {project.domain}
              </span>
            </div>
          )}

          {/* Quick Metric highlight */}
          {project.metrics && (
            <div className="absolute bottom-3 right-4">
              <span className="text-[10px] font-mono text-[#ff8080] bg-[#ff2a2a]/15 border border-[#ff2a2a]/30 px-2 py-0.5 rounded-md">
                {project.metrics}
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-7">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h3 className="text-xl font-black text-white leading-tight group-hover:text-[#ff4d4d] transition-colors">
                {project.title}
              </h3>
              <p className="text-[#ff6a6a] text-xs font-bold tracking-wide mt-1">
                {project.subtitle}
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:bg-[#ff2a2a] group-hover:text-white group-hover:border-[#ff2a2a] transition-all"
              title="Inspect specifications"
            >
              <svg className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          <p className="text-white/60 text-xs md:text-sm leading-relaxed line-clamp-3 mb-5 font-normal">
            {project.description}
          </p>

          {/* Highlights checklist */}
          <ul className="space-y-1.5 mb-6">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex items-start gap-2 text-white/80 text-xs font-medium">
                <span className="text-[#ff2a2a] mt-0.5 shrink-0 font-bold">✓</span>
                <span className="line-clamp-1">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech pills footer */}
      <div className="px-6 pb-6 pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white/80 text-[10px] font-semibold px-2.5 py-0.8 rounded-full transition-colors"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 5 && (
          <span className="text-[10px] font-semibold text-[#ff6a6a] px-2 py-0.8 rounded-full bg-[#ff2a2a]/10 border border-[#ff2a2a]/20">
            +{project.technologies.length - 5} more
          </span>
        )}
      </div>
    </motion.div>
  );
};

// Flowing Timeline Row
const TimelineRow = ({ project, side, onSelect }) => {
  const ref = useRef(null);
  const active = useInView(ref, { margin: '-35% 0px -35% 0px' });

  return (
    <div
      ref={ref}
      className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-x-14 md:items-center mb-16"
    >
      {/* Timeline spine dot */}
      <span
        className={`md:hidden absolute left-[0.95rem] top-8 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#0a0a0a] z-10 transition-all duration-500 ${
          active ? 'bg-[#ff2a2a] shadow-[0_0_20px_rgba(255,42,42,0.9)] scale-110' : 'bg-white/20'
        }`}
      />
      <span
        className={`hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-[#0a0a0a] z-10 transition-all duration-500 ${
          active ? 'bg-[#ff2a2a] shadow-[0_0_24px_rgba(255,42,42,0.95)] scale-125' : 'bg-white/20'
        }`}
      />

      <div className={side === 'right' ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}>
        <div
          onClick={() => onSelect(project)}
          className={`group rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer ${
            active
              ? 'bg-[#18181c] border-[#ff2a2a]/60 shadow-[0_20px_50px_rgba(255,42,42,0.22)] md:scale-[1.02]'
              : 'bg-[#121214]/90 border-white/10 hover:border-white/25'
          }`}
        >
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/40">
                <span className="text-5xl">⚡</span>
              </div>
            )}
            <span
              className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md ${
                categoryBadges[project.category] || 'bg-white/15 text-white'
              }`}
            >
              {project.category}
            </span>
            {project.domain && (
              <span className="absolute top-4 right-4 text-[10px] font-semibold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                {project.domain}
              </span>
            )}
          </div>

          <div className="p-6 md:p-7">
            <h3 className="text-xl font-black text-white leading-tight group-hover:text-[#ff4d4d] transition-colors">
              {project.title}
            </h3>
            <p className="text-[#ff6a6a] text-xs font-bold mb-3">{project.subtitle}</p>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>

            <ul className="space-y-1.5 mb-5">
              {project.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex items-start gap-2 text-white/75 text-xs font-medium">
                  <span className="text-[#ff2a2a] mt-0.5 shrink-0 font-bold">✓</span>
                  <span className="line-clamp-1">{h}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="bg-white/8 border border-white/10 text-white/75 text-[11px] font-semibold px-2.5 py-0.8 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Detailed Project Modal
const ProjectModal = ({ project, onClose, onTagClick }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl bg-[#141418] border border-white/15 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#ff2a2a] border border-white/20 hover:border-[#ff2a2a] text-white flex items-center justify-center transition-all duration-300"
          title="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Banner Image */}
        <div className="relative w-full aspect-[16/9] max-h-80 overflow-hidden bg-black/60">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/40">
              <span className="text-6xl">⚡</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/40" />

          {/* Floating Badges */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div className="flex flex-wrap gap-2">
              <span
                className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border shadow-md backdrop-blur-md ${
                  categoryBadges[project.category] || 'bg-white/15 text-white'
                }`}
              >
                {project.category}
              </span>
              {project.domain && (
                <span className="text-xs font-semibold text-white/90 bg-black/70 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                  {project.domain}
                </span>
              )}
            </div>

            {project.metrics && (
              <span className="text-xs font-mono font-bold text-[#ff8080] bg-[#ff2a2a]/20 border border-[#ff2a2a]/40 px-3 py-1 rounded-full backdrop-blur-md">
                {project.metrics}
              </span>
            )}
          </div>
        </div>

        {/* Modal Details */}
        <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
              {project.title}
            </h2>
            <p className="text-[#ff6a6a] text-sm md:text-base font-bold mt-1">
              {project.subtitle}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
              Architecture & Overview
            </h4>
            <p className="text-white/80 text-sm md:text-base leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
              Engineering Deliverables & Highlights
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {project.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/8 text-white/85 text-xs md:text-sm"
                >
                  <span className="w-5 h-5 rounded-full bg-[#ff2a2a]/20 text-[#ff2a2a] flex items-center justify-center shrink-0 font-black text-xs">
                    ✓
                  </span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => {
                    onTagClick(tech);
                    onClose();
                  }}
                  className="bg-white/8 hover:bg-[#ff2a2a]/20 border border-white/12 hover:border-[#ff2a2a]/40 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer"
                  title={`Filter projects by ${tech}`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState(null);
  const [viewMode, setViewMode] = useState('bento'); // 'bento' | 'timeline'
  const [activeModalProject, setActiveModalProject] = useState(null);

  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.6'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  // Filter projects by category, search text, and tech pill
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'Railway' && (p.domain === 'Railway' || p.title.includes('Railway') || p.title.includes('DFCC') || p.title.includes('Wagon'))) ||
        (selectedCategory === 'POS & Hospitality' && (p.domain === 'POS & Hospitality' || p.title.includes('POS'))) ||
        (selectedCategory === 'AI & Python' && (p.domain === 'AI & Python' || p.technologies.includes('Python'))) ||
        (selectedCategory === 'Health & Fitness' && (p.domain === 'Health & Fitness' || p.title.includes('Wellness') || p.title.includes('Health')));

      // Search text filter
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));

      // Specific tech filter
      const matchesTech = !selectedTech || p.technologies.includes(selectedTech);

      return matchesCategory && matchesQuery && matchesTech;
    });
  }, [selectedCategory, searchQuery, selectedTech]);

  return (
    <section
      id="projects"
      className="bg-[#0a0a0a] py-24 md:py-32 px-6 md:px-12 w-full relative overflow-hidden font-sans"
    >
      {/* Background aesthetic grid and glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-[#ff2a2a]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div data-aos="fade-up" className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-[#ff2a2a]/30 rounded-full px-4 py-1.5 text-xs md:text-sm text-[#ff8080] font-bold mb-5 bg-[#ff2a2a]/10 shadow-[0_0_20px_rgba(255,42,42,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#ff2a2a] animate-pulse" />
            <span>Interactive Engineering Showcase</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight">
            Featured <span className="text-[#ff2a2a]">Projects</span> & Systems
          </h2>

          <p className="text-white/65 text-sm md:text-lg font-medium leading-relaxed mt-4">
            A curated exhibition of cross-platform terminal ecosystems, railway surveillance platforms,
            and offline-first architectures engineered for mission-critical reliability.
          </p>

          {/* Quick Stats Pill Strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/8 backdrop-blur-md text-center">
              <span className="block text-2xl font-black text-white">{projects.length}</span>
              <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Shipped Projects</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/8 backdrop-blur-md text-center">
              <span className="block text-2xl font-black text-[#ff4d4d]">3</span>
              <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Railway Portfolios</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/8 backdrop-blur-md text-center">
              <span className="block text-2xl font-black text-emerald-400">100%</span>
              <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Offline Persistence</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/8 backdrop-blur-md text-center">
              <span className="block text-2xl font-black text-purple-400">5+</span>
              <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Cross-Platforms</span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#141418] border border-white/10 rounded-2xl w-full lg:w-auto">
              {filterTabs.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedCategory(tab.id);
                      setSelectedTech(null);
                    }}
                    className={`relative px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      isActive ? 'text-white shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute inset-0 rounded-xl bg-[#ff2a2a] shadow-[0_0_20px_rgba(255,42,42,0.6)]"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{tab.icon}</span>
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle & Search */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="Filter by tech or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#141418] border border-white/10 focus:border-[#ff2a2a]/80 text-white placeholder-white/40 text-xs md:text-sm rounded-xl pl-9 pr-3 py-2.5 outline-none transition-colors"
                />
                <svg
                  className="absolute left-3 top-3 w-4 h-4 text-white/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-white/40 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* View Switcher Buttons */}
              <div className="flex items-center bg-[#141418] border border-white/10 p-1 rounded-xl shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('bento')}
                  className={`p-2 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'bento'
                      ? 'bg-[#ff2a2a] text-white shadow-md'
                      : 'text-white/60 hover:text-white'
                  }`}
                  title="Grid View"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('timeline')}
                  className={`p-2 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'timeline'
                      ? 'bg-[#ff2a2a] text-white shadow-md'
                      : 'text-white/60 hover:text-white'
                  }`}
                  title="Timeline View"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

          {/* Quick Tech Tag Filters */}
          <div className="flex items-center flex-wrap gap-2 pt-1">
            <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider mr-1">
              Popular Tags:
            </span>
            {popularTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  selectedTech === tech
                    ? 'bg-[#ff2a2a] border-[#ff2a2a] text-white font-bold shadow-[0_0_12px_rgba(255,42,42,0.5)]'
                    : 'bg-white/[0.04] border-white/10 text-white/70 hover:text-white hover:border-white/25'
                }`}
              >
                {tech}
              </button>
            ))}
            {selectedTech && (
              <button
                onClick={() => setSelectedTech(null)}
                className="text-xs text-[#ff8080] hover:underline ml-1"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8 flex items-center justify-between text-xs text-white/50 border-b border-white/5 pb-3">
          <span>
            Showing <strong className="text-white font-bold">{filteredProjects.length}</strong> of{' '}
            {projects.length} projects
          </span>
          {filteredProjects.length === 0 && (
            <span className="text-[#ff6a6a]">No matching projects found. Try resetting filters.</span>
          )}
        </div>

        {/* View Mode: Bento Grid */}
        {viewMode === 'bento' && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, i) => (
                <BentoCard
                  key={project.title}
                  project={project}
                  index={i}
                  onSelect={setActiveModalProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View Mode: Interactive Flowing Timeline */}
        {viewMode === 'timeline' && (
          <div ref={timelineRef} className="relative max-w-4xl mx-auto py-8">
            {/* Animated spine */}
            <div className="absolute top-0 bottom-0 left-[0.95rem] md:left-1/2 md:-translate-x-1/2 w-[3px] bg-white/10 overflow-hidden rounded-full">
              <motion.div
                style={{ scaleY }}
                className="absolute inset-0 origin-top bg-gradient-to-b from-[#ff2a2a] via-[#ff6a6a] to-[#ff2a2a]"
              />
            </div>

            {filteredProjects.map((project, i) => (
              <TimelineRow
                key={project.title}
                project={project}
                side={i % 2 === 0 ? 'left' : 'right'}
                onSelect={setActiveModalProject}
              />
            ))}
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <ProjectModal
            project={activeModalProject}
            onClose={() => setActiveModalProject(null)}
            onTagClick={(t) => setSelectedTech(t)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
