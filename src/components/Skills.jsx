import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolio';

const R = 42;
const C = 2 * Math.PI * R; // circumference of the progress ring

// A glowing glass "skill coin" with an animated gradient progress ring.
const SkillCircle = ({ skill, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const offset = C * (1 - skill.level / 100);
  const delay = (index % 6) * 0.1; // each coin in the row appears after the previous one

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5, y: 28 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay }}
      className="flex flex-col items-center group"
    >
      <div className="relative w-24 h-24 md:w-28 md:h-28">
        {/* soft glow */}
        <div className="absolute inset-1 rounded-full bg-[#ff2a2a]/15 blur-xl group-hover:bg-[#ff2a2a]/40 transition-all duration-500" />

        {/* progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="url(#skillGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: C }}
            transition={{ duration: 1.1, ease: 'easeOut', delay: delay + 0.25 }}
          />
        </svg>

        {/* frosted glass center holding the icon */}
        <div className="absolute inset-[16%] rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm flex items-center justify-center text-2xl md:text-3xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-110">
          {skill.icon}
        </div>
      </div>

      <p className="mt-3 text-white/90 text-xs md:text-sm font-bold text-center leading-tight max-w-[7rem]">
        {skill.name}
      </p>
      <p className="text-[#ff6a6a] text-[11px] font-bold mt-0.5">{skill.level}%</p>
    </motion.div>
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
      {/* red glow accents */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#ff2a2a]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-96 h-96 bg-[#ff2a2a]/15 rounded-full blur-[150px] pointer-events-none" />

      {/* gradient definition for the rings */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="55%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#d946ef" />
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
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-y-12 gap-x-4 justify-items-center">
          {skills.map((skill, i) => (
            <SkillCircle key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
