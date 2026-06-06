import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolio';

// Group flat skills list into categories, preserving order of first appearance.
const grouped = skills.reduce((acc, skill) => {
  (acc[skill.category] = acc[skill.category] || []).push(skill);
  return acc;
}, {});

const SkillBar = ({ skill, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-2 text-sm font-bold text-white/85">
          <span className="text-lg">{skill.icon}</span>
          {skill.name}
        </span>
        <span className="text-xs font-bold text-[#ff6a6a]">{skill.level}%</span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#ff2a2a] to-[#ff6a6a]"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay }}
        />
      </div>
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

      <div className="max-w-6xl mx-auto relative z-10">

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

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {Object.entries(grouped).map(([category, items], idx) => (
            <div
              key={category}
              data-aos="fade-up"
              data-aos-delay={idx * 80}
              className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-7 md:p-8 hover:border-[#ff2a2a]/40 hover:bg-white/[0.07] transition-all duration-500"
            >
              <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff2a2a]"></span>
                {category}
              </h3>
              {items.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} delay={i * 0.06} />
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
