import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { personal, hero, socials, projects } from '../data/portfolio';
// Clean portrait card video (your photo + gentle zoom)
import heroVideo from '../assets/hero video/intro_card.mp4';
import profileImage from '../assets/profile/profile.jpeg';

const tagLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out' });
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-[#0099ff] flex flex-col"
    >
      {/* subtle white grid over the blue field */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff14_1px,transparent_1px),linear-gradient(to_bottom,#ffffff14_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      {/* white glow accents */}
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-white/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[24rem] h-[24rem] bg-[#0099ff]/50 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-28 md:pt-32">
        {/* ---------------- Banner-style top row ---------------- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 md:mb-16">
          <p className="font-mono text-xs md:text-sm font-bold text-white/80 tracking-[0.3em] uppercase">
            Afarojkha.Pathan <span className="text-white/50">©</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {tagLinks.map((t) => (
              <a
                key={t.label}
                href={t.href}
                className="font-mono text-[11px] md:text-xs font-bold uppercase tracking-wider text-white bg-white/15 border border-white/30 hover:bg-white hover:text-[#0099ff] rounded-full px-3.5 py-1.5 transition-all duration-300"
              >
                [ #{t.label} ]
              </a>
            ))}
          </div>
        </div>

        {/* ---------------- Headline + card ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center flex-1">
          {/* Left: Text */}
          <div className="text-left">
            <h1
              data-aos="fade-up"
              className="font-display text-white text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-6"
            >
              I Build Products,
              <br />
              <span className="text-white/85">Not Just Apps.</span>
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="150"
              className="text-white/90 text-sm md:text-base font-medium leading-relaxed max-w-lg mb-4"
            >
              From your first idea to millions of users — I build scalable
              cross-platform apps for Android, iOS, web &amp; desktop that
              actually ship.
            </p>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-white/70 text-xs md:text-sm max-w-lg mb-10 leading-relaxed"
            >
              {hero.description}
            </p>

            <div data-aos="fade-up" data-aos-delay="300" className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo('projects')}
                className="px-7 py-3 rounded-full bg-[#fdfdfe] text-[#0099ff] font-bold text-sm md:text-base transition-all duration-300 transform hover:scale-105 hover:bg-white shadow-[0_10px_30px_rgba(0,153,255,0.35)]"
              >
                Start Working With Me
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="px-7 py-3 rounded-full bg-transparent border-2 border-white text-white font-bold text-sm md:text-base hover:bg-white hover:text-[#0099ff] transition-all duration-300"
              >
                Contact Me
              </button>
            </div>

            {/* Socials */}
            <div data-aos="fade-up" data-aos-delay="400" className="flex items-center gap-3 mt-10">
              {[
                { href: socials.linkedin, label: 'LinkedIn', d: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
                { href: socials.github, label: 'GitHub', d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
                { href: socials.whatsapp, label: 'WhatsApp', d: 'M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#0099ff] transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Photo / Video card */}
          <div className="flex justify-center md:justify-end">
            <div data-aos="fade-left" className="relative w-[78%] sm:w-[60%] md:w-full max-w-[420px]">
              {/* blue corner accent */}
              <div className="absolute -top-4 -right-4 w-28 h-28 border-t-4 border-r-4 border-[#0099ff] rounded-tr-[2rem] pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-28 h-28 border-b-4 border-l-4 border-white/70 rounded-bl-[2rem] pointer-events-none" />

              {/* the card */}
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-white bg-[#fdfdfe] shadow-[0_30px_70px_rgba(0,153,255,0.35)] aspect-[4/5]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={heroVideo} type="video/mp4" />
                </video>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0099ff]/85 to-transparent pt-16 pb-4 px-5">
                  <p className="text-white font-black text-lg leading-tight">{personal.fullName}</p>
                  <p className="text-white/85 text-xs font-bold tracking-wide">{personal.location}</p>
                </div>
              </div>

              {/* floating "available" badge */}
              <div className="animate-float absolute -bottom-5 -right-2 sm:right-4 bg-[#fdfdfe] text-[#0099ff] rounded-2xl px-4 py-2.5 shadow-2xl flex items-center gap-2 border border-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0099ff] animate-pulse" />
                <span className="text-xs font-black leading-tight">Available<br />for work</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Banner-style circular strip ---------------- */}
        <div className="relative -mx-6 md:-mx-12 w-screen mt-14 pb-14">
          <div className="bg-white text-[#0099ff] py-5 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex items-center gap-4 md:gap-6 overflow-x-auto md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {featured.map((p) => (
                <button
                  key={p.title}
                  onClick={() => scrollTo('projects')}
                  title={p.title}
                  className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-[#0099ff]/25 hover:border-[#0099ff] transition-all duration-300"
                >
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}

              <div className="shrink-0 flex items-center gap-3 pl-2">
                <img
                  src={profileImage}
                  alt={personal.fullName}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-[#0099ff]"
                />
                <span className="font-bold text-sm md:text-base flex items-center gap-1.5">
                  afarojkha.pathan
                  <span className="text-[#0099ff]">✓</span>
                </span>
                <button
                  onClick={() => scrollTo('projects')}
                  className="px-4 py-1.5 rounded-full border-2 border-[#0099ff] text-[#0099ff] text-xs md:text-sm font-bold  hover:text-white transition-all duration-300"
                >
                  View Work
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden md:block absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white/80" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
