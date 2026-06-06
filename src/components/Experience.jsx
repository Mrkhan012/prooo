import React from 'react';
import { experiences, education } from '../data/portfolio';

const Experience = () => {
  return (
    <section
      id="experience"
      className="bg-[#0a0a0a] py-24 md:py-28 px-6 md:px-12 w-full relative overflow-hidden font-sans"
    >
      {/* subtle grid */}
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

        {/* Timeline */}
        <div className="relative border-l-2 border-white/15 ml-3 md:ml-6 pl-8 md:pl-12 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={exp.company} data-aos="fade-up" data-aos-delay={idx * 100} className="relative">
              {/* dot */}
              <span className="absolute -left-[42px] md:-left-[58px] top-1.5 w-5 h-5 rounded-full bg-[#ff2a2a] border-4 border-[#0a0a0a] shadow-[0_0_20px_rgba(255,42,42,0.6)]" />

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8 hover:border-[#ff2a2a]/40 transition-colors duration-500">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-white">{exp.role}</h3>
                    <p className="text-[#ff6a6a] font-bold">{exp.company}</p>
                    <p className="text-white/50 text-sm font-medium">{exp.location}</p>
                  </div>
                  <span className="inline-block self-start bg-[#ff2a2a]/15 text-[#ff6a6a] text-xs font-bold px-4 py-1.5 rounded-full border border-[#ff2a2a]/30 whitespace-nowrap">
                    {exp.duration}
                  </span>
                </div>

                <ul className="space-y-2 mb-5">
                  {exp.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-white/75 text-sm leading-relaxed">
                      <span className="text-[#ff2a2a] mt-1.5 shrink-0">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="bg-white/8 border border-white/15 text-white/80 text-xs font-semibold px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
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
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors duration-500"
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
