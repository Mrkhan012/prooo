import React from 'react';
import profileImage from '../assets/profile/profile.jpeg';
import { personal, about, stats } from '../data/portfolio';

const About = () => {
  return (
    <section id="about" className="bg-[#fdfdfe] text-[#0099ff] py-24 md:py-28 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      {/* subtle blue grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0099ff0d_1px,transparent_1px),linear-gradient(to_bottom,#0099ff0d_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
      {/* blue glow accent */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0099ff]/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row gap-16 items-center md:items-start">

        {/* Left Side: ID Badge */}
        <div className="flex flex-col items-center w-full md:w-[350px] shrink-0 mt-12 md:mt-4">

          <div data-aos="drop-bounce" className="relative flex justify-center w-full">
            {/* Lanyard string */}
            <div className="absolute -top-32 left-1/2 w-3 h-40 bg-[#0099ff] transform -translate-x-1/2 shadow-inner z-0"></div>
            {/* Lanyard clip */}
            <div className="absolute -top-6 left-1/2 w-6 h-12 bg-[#fdfdfe] rounded border border-[#0099ff] transform -translate-x-1/2 z-10 shadow-[0_2px_10px_rgba(0,153,255,0.15)]"></div>

            {/* Badge Card */}
            <div className="bg-white border border-[#0099ff]/20 w-full max-w-[280px] rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,153,255,0.2)] relative z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Cutout Hole */}
              <div className="absolute -top-3 left-1/2 w-16 h-6 bg-white rounded-t-xl transform -translate-x-1/2 flex justify-center items-center">
                <div className="w-8 h-2 bg-[#0099ff]/10 rounded-full shadow-inner"></div>
              </div>
              {/* Image Container */}
              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-[#fdfdfe] border border-[#0099ff]/10">
                <img
                  src={profileImage}
                  alt={personal.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Name plate */}
              <div className="text-center pt-3 pb-1">
                <p className="text-[#0099ff] font-black text-lg leading-tight">{personal.fullName}</p>
                <p className="text-[#0099ff] text-xs font-bold tracking-wide uppercase mt-1">{personal.title}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Info Content */}
        <div data-aos="fade-left" data-aos-delay="200" className="flex-1 mt-4 md:mt-0">

          <div className="tag-pill border-[#0099ff]/40 bg-[#0099ff]/5 text-[#0099ff] mb-6">
            [ #ABOUT ]
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#0099ff] mb-4 leading-[1.02]">
            Clean Code.<br /><span className="text-[#0099ff]">Real Products.</span>
          </h2>
          <p className="text-lg font-bold mb-6 leading-relaxed max-w-3xl text-[#0099ff]/80">
            A passionate {personal.title} based in {personal.location}, dedicated to crafting clean,
            scalable cross-platform applications.
          </p>

          <p className="text-base font-medium mb-4 leading-relaxed max-w-3xl text-[#0099ff]/70">
            {about.intro}
          </p>
          <p className="text-sm font-medium mb-10 leading-relaxed max-w-3xl text-[#0099ff]/55">
            {about.body}
          </p>

          {/* Skill chips */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {about.highlights.map((s, i) => (
              <span
                key={s.name}
                data-aos="zoom-in"
                data-aos-delay={150 + i * 80}
                className="inline-flex items-center gap-2 bg-white border border-[#0099ff]/25 px-4 py-2 rounded-full text-[#0099ff] text-sm font-bold hover:border-[#0099ff] hover:shadow-[0_8px_20px_rgba(0,153,255,0.25)] transition-all duration-300"
              >
                <span className="text-lg">{s.icon}</span>
                {s.name}
              </span>
            ))}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                data-aos="fade-up"
                data-aos-delay={100 + i * 100}
                className="bg-white border border-[#0099ff]/20 rounded-2xl px-4 py-5 text-center hover:border-[#0099ff] hover:shadow-[0_12px_30px_rgba(0,153,255,0.25)] transition-all duration-500"
              >
                <p className="font-display text-3xl md:text-4xl text-[#0099ff]">{stat.value}</p>
                <p className="text-[11px] md:text-xs font-bold text-[#0099ff]/50 mt-1 leading-tight uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
