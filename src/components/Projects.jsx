import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { projects } from '../data/portfolio';

const categoryStyles = {
  Professional: 'bg-[#ff2a2a] text-white',
  Freelance: 'bg-white text-black',
  Personal: 'bg-white/15 text-white border border-white/20',
};

// One project on the flowing timeline — alternates side, lights up on scroll.
const ProjectRow = ({ project, side }) => {
  const ref = useRef(null);
  const active = useInView(ref, { margin: '-40% 0px -40% 0px' });

  return (
    <div
      ref={ref}
      className="relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-x-16 md:items-center mb-12 md:mb-10"
    >
      {/* connector dot */}
      <span
        className={`md:hidden absolute left-[1.05rem] top-10 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#0a0a0a] z-10 transition-all duration-500 ${
          active ? 'bg-[#ff2a2a] shadow-[0_0_16px_rgba(255,42,42,0.85)]' : 'bg-white/25'
        }`}
      />
      <span
        className={`hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-[#0a0a0a] z-10 transition-all duration-500 ${
          active ? 'bg-[#ff2a2a] shadow-[0_0_20px_rgba(255,42,42,0.9)] scale-110' : 'bg-white/25'
        }`}
      />

      <div className={side === 'right' ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}>
        <div
          className={`group rounded-3xl overflow-hidden border transition-all duration-500 ${
            active
              ? 'bg-[#ff2a2a]/10 border-[#ff2a2a]/50 shadow-[0_25px_60px_rgba(255,42,42,0.2)] md:scale-[1.02]'
              : 'bg-white/5 border-white/10'
          }`}
        >
          {/* Image */}
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
                <span className="text-6xl">🚧</span>
              </div>
            )}
            <span className={`absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md ${categoryStyles[project.category] || 'bg-white/15 text-white'}`}>
              {project.category}
            </span>
            {project.status && (
              <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md bg-[#ff2a2a]/80 text-white">
                {project.status}
              </span>
            )}
          </div>

          {/* Body */}
          <div className="p-6 md:p-7">
            <h3 className="text-xl font-black text-white leading-tight">{project.title}</h3>
            <p className="text-[#ff6a6a] text-sm font-bold mb-3">{project.subtitle}</p>
            <p className="text-white/55 text-sm leading-relaxed font-medium mb-5 line-clamp-3">
              {project.description}
            </p>

            <ul className="space-y-1.5 mb-5">
              {project.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex items-start gap-2 text-white/70 text-xs font-medium">
                  <span className="text-[#ff2a2a] mt-0.5 shrink-0">✓</span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="bg-white/8 border border-white/10 text-white/75 text-[11px] font-semibold px-2.5 py-1 rounded-full">
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

const Projects = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.55'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <section id="projects" className="bg-[#0a0a0a] py-24 md:py-28 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#ff2a2a]/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/70 font-bold mb-6 bg-white/5">
            Selected work
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Featured Projects
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed mt-5">
            A journey through cross-platform apps and web platforms I've designed,
            architected and shipped to production.
          </p>
        </div>

        {/* Flowing timeline */}
        <div ref={timelineRef} className="relative">
          <div className="absolute top-0 bottom-0 left-[1.05rem] md:left-1/2 md:-translate-x-1/2 w-[3px] bg-white/10 overflow-hidden rounded-full">
            <motion.div
              style={{ scaleY }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-[#ff2a2a] to-[#ff6a6a]"
            />
          </div>

          {projects.map((project, i) => (
            <ProjectRow key={project.title} project={project} side={i % 2 === 0 ? 'left' : 'right'} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
