import React from 'react';
import { projects } from '../data/portfolio';

const categoryStyles = {
  Professional: 'bg-[#ff2a2a] text-white',
  Freelance: 'bg-black text-white',
  Personal: 'bg-gray-200 text-gray-800',
};

const ProjectCard = ({ project, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={(index % 2) * 120}
    className="group bg-white rounded-3xl border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_25px_60px_rgba(255,42,42,0.15)] transition-all duration-500 hover:-translate-y-1 flex flex-col"
  >
    {/* Image */}
    <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <span className={`absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md ${categoryStyles[project.category] || 'bg-gray-800 text-white'}`}>
        {project.category}
      </span>
    </div>

    {/* Body */}
    <div className="p-6 md:p-7 flex flex-col flex-1">
      <h3 className="text-xl font-black text-gray-900 leading-tight">{project.title}</h3>
      <p className="text-[#ff2a2a] text-sm font-bold mb-3">{project.subtitle}</p>
      <p className="text-gray-500 text-sm leading-relaxed font-medium mb-5 line-clamp-4">
        {project.description}
      </p>

      {/* Highlights */}
      <ul className="space-y-1.5 mb-5">
        {project.highlights.slice(0, 4).map((h) => (
          <li key={h} className="flex items-start gap-2 text-gray-600 text-xs font-medium">
            <span className="text-[#ff2a2a] mt-0.5 shrink-0">✓</span>
            {h}
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.technologies.map((tech) => (
          <span key={tech} className="bg-gray-100 text-gray-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
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
      className="bg-[#f4f4f4] pt-24 pb-28 px-6 md:px-12 w-full relative overflow-hidden font-sans"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-6 shadow-sm bg-white">
            Selected work
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
            Featured Projects
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed mt-5">
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
