/**
 * @file SocialFanOutStack.tsx
 * Tata Letak Foto "Life on & Off Campus" dengan Skala Ergonomis & Kompak
 * - Mode Mobile & Tablet disesuaikan ukurannya agar proporsional dan kompak seperti kartu DATA-DRIVEN PILLARS.
 * - Desktop (>= 1024px): Fanned-out 5 kartu berundak dengan interaksi pegas dan auto-return.
 * - Tanpa efek glow neon, bersih, dan elegan seperti landonorris.com.
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Sparkles } from 'lucide-react';
import { MomentItem } from '../types';
import { RollingText } from './RollingText';

interface SocialFanOutStackProps {
  moments: MomentItem[];
  accentColor: string;
}

export const SocialFanOutStack: React.FC<SocialFanOutStackProps> = ({
  moments,
  accentColor,
}) => {
  // hoveredIndex bernilai null saat kursor tidak berada di atas kartu mana pun
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Konfigurasi fisika pegas (physics-based spring)
  const springPhysics = {
    type: 'spring' as const,
    stiffness: 260,
    damping: 22,
    mass: 0.8,
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden select-none bg-gradient-to-b from-transparent via-[#08090b] to-transparent w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center space-y-2.5 mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
          <span style={{ color: accentColor }}>// CAMPUS CHRONICLES & VISUALS</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">AM-24 ARCHIVES</span>
        </div>

        {/* Judul Utama dengan Efek RollingText Gelombang Kiri ke Kanan */}
        <h2
          className="font-display font-black uppercase text-white tracking-tight leading-none text-center"
          style={{ fontSize: 'clamp(28px, 5.5vw, 68px)' }}
        >
          <RollingText text="LIFE ON & OFF CAMPUS." accentColor={accentColor} />
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 font-mono max-w-lg mx-auto px-4 leading-relaxed">
          Dokumentasi perjalanan perkuliahan Teknik Informatika ITS, riset data, dan kompetisi. Ditata ringkas dan ergonomis.
        </p>
      </div>

      {/* 1. TAMPILAN MOBILE & TABLET (< 1024px): KOMPAK & PROPORSI MIRIP DATA-DRIVEN PILLARS */}
      <div className="lg:hidden max-w-3xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {moments.slice(0, 3).map((moment, idx) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{
                y: -6,
                scale: 1.02,
                boxShadow: '0 20px 30px -10px rgba(0,0,0,0.9)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={springPhysics}
              className="w-full max-w-[280px] xs:max-w-[300px] sm:max-w-none mx-auto aspect-[4/4.6] rounded-2xl bg-[#101112] hover:bg-[#141619] border border-[#26292b] hover:border-white/30 p-3 flex flex-col justify-between shadow-xl relative group overflow-hidden cursor-pointer"
            >
              {/* Corner Plus Accents ala Lando Norris */}
              <span className="absolute top-1.5 left-2 text-[8px] font-mono text-slate-600 group-hover:text-slate-400 transition-colors select-none">+</span>
              <span className="absolute top-1.5 right-2 text-[8px] font-mono text-slate-600 group-hover:text-slate-400 transition-colors select-none">+</span>

              {/* Photo Frame Kompak Proporsional */}
              <div className="relative w-full h-[73%] rounded-xl overflow-hidden bg-gradient-to-br from-[#161a1d] to-[#0c0e10] border border-white/5 flex items-center justify-center">
                {moment.img ? (
                  <img
                    src={moment.img}
                    alt={moment.place}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-3 text-center space-y-1.5">
                    <div
                      className="w-9 h-9 rounded-xl border flex items-center justify-center"
                      style={{
                        borderColor: `${accentColor}50`,
                        backgroundColor: `${accentColor}12`,
                      }}
                    >
                      <Camera className="w-4 h-4" style={{ color: accentColor }} />
                    </div>
                    <span className="font-display font-bold text-white text-xs line-clamp-1 px-1">
                      {moment.place}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">
                      Informatika ITS · {moment.year}
                    </span>
                  </div>
                )}

                {/* Badge Tahun Khas Motorsport */}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold text-white">
                  {moment.year}
                </div>
              </div>

              {/* Bottom Label Ringkas */}
              <div className="pt-1.5 flex items-center justify-between text-left">
                <div className="overflow-hidden pr-2">
                  <h4 className="text-xs font-bold font-display text-white truncate group-hover:text-[#00D2BE] transition-colors">
                    {moment.place}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono truncate">
                    {moment.caption || 'Teknik Informatika ITS'}
                  </p>
                </div>

                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center border border-[#26292b] group-hover:border-white/20 shrink-0 transition-colors"
                  style={{ backgroundColor: `${accentColor}12` }}
                >
                  <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. TAMPILAN DESKTOP (>= 1024px): FANNED-OUT PROPORSI LUAS DENGAN INTERAKSI PEGAS FISIKA */}
      <div
        onMouseLeave={() => setHoveredIndex(null)}
        className="hidden lg:flex relative max-w-6xl mx-auto h-[500px] items-center justify-center px-4"
      >
        {moments.slice(0, 5).map((moment, index) => {
          const offset = index - 2; // -2, -1, 0, 1, 2
          const isHovered = hoveredIndex === index;

          // Posisi resting default alami kartu saat kursor keluar
          const restingRotate = offset * 5;
          const restingTranslateX = offset * 180;
          const restingY = Math.abs(offset) * 12;
          const restingScale = 0.94 - Math.abs(offset) * 0.03;

          return (
            <motion.div
              key={moment.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                x: isHovered ? offset * 95 : restingTranslateX,
                y: isHovered ? -32 : restingY,
                rotate: isHovered ? 0 : restingRotate,
                scale: isHovered ? 1.07 : restingScale,
                zIndex: isHovered ? 50 : 20 - Math.abs(offset),
              }}
              transition={springPhysics}
              className="absolute w-[250px] xl:w-[270px] aspect-[4/5] rounded-3xl bg-[#121417] border shadow-2xl overflow-hidden cursor-pointer group p-3 flex flex-col justify-between transition-colors duration-300"
              style={{
                borderColor: isHovered ? accentColor : '#26292b',
                boxShadow: isHovered
                  ? '0 28px 50px -15px rgba(0,0,0,0.95)'
                  : '0 16px 36px -12px rgba(0,0,0,0.85)',
              }}
            >
              {/* Photo Frame */}
              <div className="relative w-full h-[78%] rounded-2xl overflow-hidden bg-gradient-to-br from-[#161a1d] to-[#0c0e10] border border-white/5 flex items-center justify-center">
                {moment.img ? (
                  <img
                    src={moment.img}
                    alt={moment.place}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-3 text-center space-y-2">
                    <div
                      className="w-11 h-11 rounded-2xl border flex items-center justify-center"
                      style={{
                        borderColor: isHovered ? `${accentColor}70` : `${accentColor}35`,
                        backgroundColor: `${accentColor}12`,
                      }}
                    >
                      <Camera className="w-5 h-5" style={{ color: accentColor }} />
                    </div>
                    <span className="font-display font-bold text-white text-sm line-clamp-2 px-1">
                      {moment.place}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Informatika ITS · {moment.year}
                    </span>
                  </div>
                )}

                {/* Badge Tahun di Pojok Kanan Atas */}
                <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-white">
                  {moment.year}
                </div>
              </div>

              {/* Bottom Label Khas Polaroid Lando Norris */}
              <div className="pt-1.5 flex items-center justify-between text-left">
                <div className="overflow-hidden pr-2">
                  <h4 className="text-xs font-bold font-display text-white truncate group-hover:text-[#00D2BE] transition-colors">
                    {moment.place}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono truncate mt-0.5">
                    {moment.caption || 'Teknik Informatika ITS Angkatan 2024'}
                  </p>
                </div>

                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center border shrink-0 transition-colors"
                  style={{
                    backgroundColor: isHovered ? `${accentColor}25` : 'transparent',
                    borderColor: isHovered ? accentColor : '#26292b',
                  }}
                >
                  <Sparkles
                    className="w-3 h-3"
                    style={{ color: isHovered ? accentColor : '#64748b' }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
