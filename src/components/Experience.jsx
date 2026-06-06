import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { experiences, education } from '../data/portfolio';

// One row of the flowing timeline. Alternates left/right on desktop and
// lights up (red) when it reaches the centre of the screen as you scroll.
const TimelineRow = ({ side, children }) => {
  const ref = useRef(null);
  const active = useInView(ref, { margin: '-45% 0px -45% 0px' });

  return (
    <div
      ref={ref}
      className="relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-x-16 md:items-center mb-10 md:mb-6"
    >
      {/* connector dot (mobile = left, desktop = centre) */}
      <span
        className={`md:hidden absolute left-[1.05rem] top-8 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#0a0a0a] z-10 transition-all duration-500 ${
          active ? 'bg-[#ff2a2a] shadow-[0_0_16px_rgba(255,42,42,0.85)]' : 'bg-white/25'
        }`}
      />
      <span
        className={`hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-[#0a0a0a] z-10 transition-all duration-500 ${
          active ? 'bg-[#ff2a2a] shadow-[0_0_20px_rgba(255,42,42,0.9)] scale-110' : 'bg-white/25'
        }`}
      />
      <div className={side === 'right' ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}>
        {children(active)}
      </div>
    </div>
  );
};

const Experience = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.55'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <section id="experience" className="bg-[#0a0a0a] py-24 md:py-28 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/70 font-bold mb-6 bg-white/5">
            My journey
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Experience
          </h2>
        </div>

        {/* Flowing timeline */}
        <div ref={timelineRef} className="relative">
          {/* the line (animated red fill grows on scroll) */}
          <div className="absolute top-0 bottom-0 left-[1.05rem] md:left-1/2 md:-translate-x-1/2 w-[3px] bg-white/10 overflow-hidden rounded-full">
            <motion.div
              style={{ scaleY }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-[#ff2a2a] to-[#ff6a6a]"
            />
          </div>

          {experiences.map((exp, i) => (
            <TimelineRow key={exp.company} side={i % 2 === 0 ? 'left' : 'right'}>
              {(active) => (
                <div
                  className={`rounded-2xl p-5 border transition-all duration-500 ${
                    active
                      ? 'bg-[#ff2a2a]/10 border-[#ff2a2a]/50 shadow-[0_18px_45px_rgba(255,42,42,0.2)] md:scale-[1.02]'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <span className="inline-block bg-[#ff2a2a]/15 text-[#ff6a6a] text-[11px] font-bold px-3 py-1 rounded-full border border-[#ff2a2a]/30 mb-2">
                    {exp.duration}
                  </span>
                  <h3 className="text-lg font-black text-white leading-tight">{exp.role}</h3>
                  <p className="text-[#ff6a6a] text-sm font-bold">{exp.company} · <span className="text-white/45 font-medium">{exp.location}</span></p>

                  <ul className="space-y-1.5 my-3">
                    {exp.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-white/70 text-[13px] leading-snug">
                        <span className="text-[#ff2a2a] mt-0.5 shrink-0">▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="bg-white/8 border border-white/15 text-white/75 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </TimelineRow>
          ))}
        </div>

        {/* Education */}
        <div className="mt-20">
          <h3 data-aos="fade-up" className="text-2xl md:text-3xl font-black text-white mb-8 text-center">
            Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {education.map((edu, idx) => (
              <div
                key={edu.institution}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-[#ff2a2a]/40 transition-colors duration-500"
              >
                <p className="text-[#ff6a6a] text-xs font-bold mb-2">{edu.duration}</p>
                <p className="text-white font-black leading-snug mb-1">{edu.degree}</p>
                <p className="text-white/55 text-sm font-medium">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
