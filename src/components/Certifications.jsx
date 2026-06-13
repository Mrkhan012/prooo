import React from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../data/portfolio';

// Brand-colored logo block for each company (no external images needed).
const companyStyles = {
  Tata: 'bg-[#4866E5]',
  Infosys: 'bg-[#007CC3]',
  Accenture: 'bg-[#A100FF]',
};

const CertCard = ({ cert, idx }) => {
  const initials =
    cert.company === 'Tata'
      ? 'T'
      : cert.company === 'Infosys'
        ? 'INF'
        : cert.company === 'Accenture'
          ? 'ACN'
          : cert.company[0];

  return (
    <motion.a
      href={cert.url}
      target="_blank"
      rel="noreferrer noopener"
      data-aos="fade-up"
      data-aos-delay={idx * 80}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#ff2a2a]/50 hover:shadow-[0_18px_45px_rgba(255,42,42,0.18)] transition-all duration-500"
    >
      {/* Top color band */}
      <div className={`h-1.5 w-full ${companyStyles[cert.company] || 'bg-[#ff2a2a]'}`} />

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Logo + COMPLETED badge */}
        <div className="flex items-start justify-between">
          <div
            className={`w-12 h-12 rounded-xl ${companyStyles[cert.company] || 'bg-[#ff2a2a]'} flex items-center justify-center text-white font-black text-lg shadow-md`}
          >
            {initials}
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Completed
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white font-black text-base leading-snug">
          {cert.title}
        </h3>

        {/* Issuer + date */}
        <div className="text-xs text-white/55">
          <p className="font-semibold text-white/80">{cert.issuer}</p>
          <p className="mt-0.5">Issued {cert.issued}</p>
        </div>

        {/* Credential ID */}
        <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="text-[10px] text-white/45">
            <span className="block text-white/35 uppercase tracking-wider font-bold mb-0.5">Credential ID</span>
            <span className="font-mono text-white/60">{cert.credentialId}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff6a6a] group-hover:text-white transition-colors">
            View Certificate
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </span>
        </div>
      </div>
    </motion.a>
  );
};

const Certifications = () => {
  return (
    <section
      id="certifications"
      className="bg-[#0a0a0a] py-24 md:py-28 px-6 md:px-12 w-full relative overflow-hidden font-sans"
    >
      {/* faint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div data-aos="fade-up" className="mb-14 text-center">
          <div className="inline-block border border-white/20 rounded-full px-5 py-1.5 text-sm text-white/70 font-bold mb-6 bg-white/5">
            Credentials
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Licenses &amp; <span className="text-[#ff2a2a]">Certifications</span>
          </h2>
          <p className="mt-4 text-white/55 max-w-2xl mx-auto text-sm md:text-base">
            Job-simulation programs completed on Forage, in partnership with global enterprises.
          </p>
        </div>

        {/* 2x2 grid on desktop, single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certifications.map((cert, i) => (
            <CertCard key={cert.credentialId} cert={cert} idx={i} />
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-xs text-white/40">
          Displaying {certifications.length} of {certifications.length} certifications · All issued via{' '}
          <a
            href="https://www.theforage.com"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[#ff6a6a] hover:text-white transition-colors"
          >
            theforage.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default Certifications;
