/**
 * @file CuratedWorkSection.tsx
 * Bagian Kurasi Studi Kasus / Karya Unggulan (Data, Machine Learning, Enterprise)
 * - Skala pada mode Tablet dan Mobile disesuaikan agar lebih ringkas dan proporsional (mirip DATA-DRIVEN PILLARS).
 * - Tanpa efek glow neon, bersih, dan berbobot arsitektural.
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github, FolderGit2 } from 'lucide-react';
import { ProjectItem, PageView } from '../types';
import { MagneticButton } from './MagneticButton';
import { RollingText } from './RollingText';

interface CuratedWorkSectionProps {
  projects: ProjectItem[];
  accentColor: string;
  onSelectProject: (project: ProjectItem) => void;
  onNavigate: (page: PageView) => void;
}

export const CuratedWorkSection: React.FC<CuratedWorkSectionProps> = ({
  projects,
  accentColor,
  onSelectProject,
  onNavigate,
}) => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden select-none bg-gradient-to-b from-transparent via-[#090a0c] to-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <span style={{ color: accentColor }}>// SELECTED CASE STUDIES</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">AM-24 PORTFOLIO</span>
            </div>
            <h2 className="title-poster">
              <RollingText text="CURATED WORK." accentColor={accentColor} />
            </h2>
          </div>

          <MagneticButton
            strength={0.3}
            onClick={() => onNavigate('projects')}
            className="px-4 py-2 rounded-full border border-[#26292b] bg-[#101112] hover:border-white text-xs font-mono font-bold text-white transition-colors shrink-0"
          >
            <span>Lihat Semua Karya (10+)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </MagneticButton>
        </div>

        {/* List Curated Cards: Kompak & Ergonomis di Mobile & Tablet (seperti DATA-DRIVEN PILLARS) */}
        <div className="space-y-5 sm:space-y-6">
          {projects.slice(0, 2).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-[#101112] hover:bg-[#131518] border border-[#26292b] hover:border-white/30 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center group shadow-xl"
            >
              {/* Corner cross (+) */}
              <span className="absolute top-2.5 right-2.5 text-[8px] font-mono text-slate-600 group-hover:text-slate-400 transition-colors select-none">
                +
              </span>

              {/* Info Kiri */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono">
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-bold">
                    {project.categoryLabel}
                  </span>
                  <span className="text-slate-500">·</span>
                  <span style={{ color: accentColor }} className="font-bold">{project.year}</span>
                </div>

                <h3
                  onClick={() => onSelectProject(project)}
                  className="text-lg sm:text-2xl lg:text-3xl font-bold font-display text-white group-hover:text-[#00D2BE] transition-colors cursor-pointer leading-snug"
                >
                  {project.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-sans line-clamp-3 sm:line-clamp-none">
                  {project.shortDescription}
                </p>

                {/* Metrik Utama */}
                {project.metrics && (
                  <div className="inline-block px-2.5 py-1 rounded-md bg-black/60 border border-[#26292b] text-[11px] font-mono">
                    <span className="text-slate-400">Hasil Kunci: </span>
                    <span style={{ color: accentColor }} className="font-bold">{project.metrics}</span>
                  </div>
                )}

                {/* Tech Pills */}
                <div className="pt-1 flex flex-wrap gap-1.5 text-[10px] sm:text-xs font-mono">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-md bg-[#16181a] border border-[#26292b] text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* 2 Tombol Aksi */}
                <div className="pt-2 flex flex-wrap items-center gap-2.5">
                  <MagneticButton
                    strength={0.3}
                    onClick={() => onSelectProject(project)}
                    className="px-4 py-2 rounded-xl font-mono font-bold text-xs text-black transition-all hover:bg-white flex items-center gap-1.5"
                    style={{ backgroundColor: accentColor }}
                  >
                    <span>Bedah Kasus Detail</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </MagneticButton>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl font-mono text-xs text-slate-300 hover:text-white bg-[#16181a] border border-[#26292b] hover:border-slate-500 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Visual Kanan (Skala Kompak di Tablet/Mobile) */}
              <div
                onClick={() => onSelectProject(project)}
                className="lg:col-span-6 relative aspect-[16/9] sm:aspect-[16/10] max-h-[190px] sm:max-h-[220px] lg:max-h-none rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1f1c] via-[#101214] to-[#040908] border border-[#26292b] group-hover:border-white/20 transition-all cursor-pointer flex items-center justify-center p-4"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : null}

                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center mb-2 shadow-lg"
                    style={{
                      borderColor: `${accentColor}50`,
                      backgroundColor: `${accentColor}15`,
                    }}
                  >
                    <FolderGit2 className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: accentColor }} />
                  </div>
                  <span className="font-display font-bold text-base sm:text-lg text-white">
                    {project.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {project.categoryLabel} · FTEIC ITS
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
