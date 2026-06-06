import React from 'react';
import { personal, socials } from '../data/portfolio';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-[#d4d4d4] py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh]">

      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium">
        <div className="flex flex-col gap-1">
          <p>{personal.title}</p>
          <p>Clean Architecture · BLoC · Riverpod</p>
          <p>Android · iOS · Web · Desktop</p>
        </div>

        <div className="flex flex-col gap-1 md:items-center">
          <p>3+ years of experience</p>
          <a href="#projects" className="underline hover:text-white transition-colors mt-1 underline-offset-4 decoration-1">View Work</a>
        </div>

        <div className="flex flex-col gap-1 md:items-end">
          <p>{personal.location}</p>
          <p>{year}</p>
        </div>
      </div>

      {/* Middle Huge Text */}
      <div className="w-full flex justify-center items-center py-20 md:py-24 overflow-hidden">
        <h2 className="text-[18vw] md:text-[16vw] leading-none font-sans font-bold tracking-tighter select-none text-[#f4f4f4] w-full text-center">
          {personal.firstName}
        </h2>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full items-end font-medium">
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            <a href={socials.linkedin} target="_blank" rel="noreferrer" className="underline hover:text-white transition-colors underline-offset-4 decoration-1">LinkedIn</a>
            <a href={socials.github} target="_blank" rel="noreferrer" className="underline hover:text-white transition-colors underline-offset-4 decoration-1">GitHub</a>
            <a href={socials.whatsapp} target="_blank" rel="noreferrer" className="underline hover:text-white transition-colors underline-offset-4 decoration-1">WhatsApp</a>
          </div>
          <p className="text-white/60 font-mono text-[9px] md:text-[10px]">
            &copy; {year} {personal.fullName} | Built with React
          </p>
        </div>

        <div className="flex flex-col gap-1 md:items-center">
          <a href={`mailto:${personal.email}`} className="underline hover:text-white transition-colors underline-offset-4 decoration-1">{personal.email}</a>
        </div>

        <div className="flex flex-col gap-1 md:items-end">
          <a href={`tel:${personal.phoneRaw}`} className="underline hover:text-white transition-colors underline-offset-4 decoration-1">{personal.phone}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
