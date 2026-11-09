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
        className={`md:hidden absolute left-[1.05rem] top-8 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-[#fdfdfe] z-10 transition-all duration-500 ${
          active ? 'bg-[#0099ff] shadow-[0_0_16px_rgba(0,153,255,0.85)]' : 'bg-[#0099ff]/15'
        }`}
      />
      <span
        className={`hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-[#fdfdfe] z-10 transition-all duration-500 ${
          active ? 'bg-[#0099ff] shadow-[0_0_20px_rgba(0,153,255,0.9)] scale-110' : 'bg-[#0099ff]/15'
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
    <section id="experience" className="bg-[#fdfdfe] text-[#0099ff] py-24 md:py-28 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0099ff0d_1px,transparent_1px),linear-gradient(to_bottom,#0099ff0d_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <div className="tag-pill border-[#0099ff]/40 bg-[#0099ff]/5 text-[#0099ff] mb-6">
            [ #JOURNEY ]
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#0099ff] leading-[1.1] tracking-tight">
            Experience
          </h2>
        </div>

        {/* Flowing timeline */}
        <div ref={timelineRef} className="relative">
          {/* the line (animated red fill grows on scroll) */}
          <div className="absolute top-0 bottom-0 left-[1.05rem] md:left-1/2 md:-translate-x-1/2 w-[3px] bg-[#0099ff]/15 overflow-hidden rounded-full">
            <motion.div
              style={{ scaleY }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-[#0099ff] to-[#0099ff]"
            />
          </div>

          {experiences.map((exp, i) => (
            <TimelineRow key={exp.company} side={i % 2 === 0 ? 'left' : 'right'}>
              {(active) => (
                <div
                  className={`rounded-2xl p-5 border transition-all duration-500 ${
                    active
                      ? 'bg-[#0099ff]/8 border-[#0099ff]/50 shadow-[0_18px_45px_rgba(0,153,255,0.2)] md:scale-[1.02]'
                      : 'bg-white border-[#0099ff]/15 shadow-[0_10px_30px_rgba(0,153,255,0.08)]'
                  }`}
                >
                  <span className="inline-block bg-[#0099ff]/10 text-[#0099ff] text-[11px] font-bold px-3 py-1 rounded-full border border-[#0099ff]/30 mb-2">
                    {exp.duration}
                  </span>
                  <h3 className="text-lg font-black text-[#0099ff] leading-tight">{exp.role}</h3>
                  <p className="text-[#0099ff] text-sm font-bold">{exp.company} · <span className="text-[#0099ff]/45 font-medium">{exp.location}</span></p>

                  <ul className="space-y-1.5 my-3">
                    {exp.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-[#0099ff]/70 text-[13px] leading-snug">
                        <span className="text-[#0099ff] mt-0.5 shrink-0">▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="bg-[#0099ff]/5 border border-[#0099ff]/20 text-[#0099ff]/75 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
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
          <h3 data-aos="fade-up" className="font-display text-3xl md:text-4xl text-[#0099ff] mb-8 text-center">
            Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {education.map((edu, idx) => (
              <div
                key={edu.institution}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="bg-white border border-[#0099ff]/15 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,153,255,0.08)] hover:border-[#0099ff]/50 hover:shadow-[0_14px_35px_rgba(0,153,255,0.2)] transition-all duration-500"
              >
                <p className="text-[#0099ff] text-xs font-bold mb-2">{edu.duration}</p>
                <p className="text-[#0099ff] font-black leading-snug mb-1">{edu.degree}</p>
                <p className="text-[#0099ff]/55 text-sm font-medium">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
