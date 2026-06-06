import React from 'react';
import { projects } from '../data/portfolio';

const categoryStyles = {
  Professional: 'bg-[#ff2a2a] text-white',
  Freelance: 'bg-white text-black',
  Personal: 'bg-white/15 text-white border border-white/20',
};

const ProjectCard = ({ project, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={(index % 3) * 100}
    className="group bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden hover:border-[#ff2a2a]/40 hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-1 flex flex-col"
  >
    {/* Image */}
    <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <span className={`absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md ${categoryStyles[project.category] || 'bg-white/15 text-white'}`}>
        {project.category}
      </span>
    </div>

    {/* Body */}
    <div className="p-6 md:p-7 flex flex-col flex-1">
      <h3 className="text-xl font-black text-white leading-tight">{project.title}</h3>
      <p className="text-[#ff6a6a] text-sm font-bold mb-3">{project.subtitle}</p>
      <p className="text-white/55 text-sm leading-relaxed font-medium mb-5 line-clamp-4">
        {project.description}
      </p>

      {/* Highlights */}
      <ul className="space-y-1.5 mb-5">
        {project.highlights.slice(0, 4).map((h) => (
          <li key={h} className="flex items-start gap-2 text-white/70 text-xs font-medium">
            <span className="text-[#ff2a2a] mt-0.5 shrink-0">✓</span>
            {h}
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.technologies.map((tech) => (
          <span key={tech} className="bg-white/8 border border-white/10 text-white/75 text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Projects = () => {
  return (
    <section
      id="projects"
      className="bg-[#0a0a0a] py-24 md:py-28 px-6 md:px-12 w-full relative overflow-hidden font-sans"
    >
      {/* subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      {/* red glow accent */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#ff2a2a]/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/70 font-bold mb-6 bg-white/5">
            Selected work
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Featured Projects
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed mt-5">
            A selection of cross-platform apps and web platforms I've designed,
            architected and shipped to production.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
