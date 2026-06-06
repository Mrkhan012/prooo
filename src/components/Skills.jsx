import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolio';

const R = 42;
const C = 2 * Math.PI * R; // circumference of the progress ring

// A small circular skill card with an animated progress ring.
const SkillCircle = ({ skill, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const offset = C * (1 - skill.level / 100);

  return (
    <div ref={ref} className="flex flex-col items-center group">
      <div className="relative w-20 h-20 md:w-24 md:h-24 transition-transform duration-300 group-hover:scale-110">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="url(#skillGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: C }}
            transition={{ duration: 1.1, ease: 'easeOut', delay: (index % 6) * 0.06 }}
          />
        </svg>
        {/* center icon */}
        <div className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl">
          {skill.icon}
        </div>
      </div>
      <p className="mt-2.5 text-white/85 text-xs font-bold text-center leading-tight max-w-[6rem]">
        {skill.name}
      </p>
      <p className="text-[#ff6a6a] text-[10px] font-bold">{skill.level}%</p>
    </div>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="bg-[#0a0a0a] py-24 md:py-28 px-6 md:px-12 w-full relative overflow-hidden font-sans"
    >
      {/* subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      {/* red glow accent */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[#ff2a2a]/15 rounded-full blur-[130px] pointer-events-none" />

      {/* gradient definition for the rings */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2a2a" />
            <stop offset="100%" stopColor="#ff8a8a" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/70 font-bold mb-6 bg-white/5">
            What I work with
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Skills & Expertise
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed mt-5">
            A toolkit refined over 3+ years of building production-grade,
            cross-platform applications.
          </p>
        </div>

        {/* Circle grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-y-10 gap-x-4 justify-items-center">
          {skills.map((skill, i) => (
            <SkillCircle key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
