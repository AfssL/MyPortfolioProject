/**
 * @file ProjectsPage.tsx
 * Halaman Khusus Portofolio Proyek (Data Analytics, AI, Enterprise Systems, UI/UX)
 * Terinspirasi dari landonorris.com & charlesleclerc.com
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, FolderGit2, Database, Brain, Layout, Building2 } from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { ProjectItem } from '../types';

interface ProjectsPageProps {
  projects: ProjectItem[];
  accentColor: string;
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  accentColor,
  onSelectProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'data' | 'ai' | 'enterprise' | 'uiux'>('all');

  const categories = [
    { id: 'all', label: 'Semua Karya', icon: FolderGit2 },
    { id: 'data', label: 'Data Analytics & Mining', icon: Database },
    { id: 'ai', label: 'AI & Vision', icon: Brain },
    { id: 'enterprise', label: 'Enterprise Systems', icon: Building2 },
    { id: 'uiux', label: 'UI / UX Design', icon: Layout },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-28 pb-24 max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
      
      {/* Header Halaman Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-3"
      >
        <span className="text-xs uppercase tracking-widest font-mono font-bold" style={{ color: accentColor }}>
          WORKS & EXPERIMENTS
        </span>
        <h1 className="title-poster">
          Karya & Proyek.
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-mono">
          Eksplorasi analisis data bisnis, implementasi model kecerdasan buatan, arsitektur sistem enterprise, dan rancangan antarmuka pengguna di ITS.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeFilter === cat.id;

          return (
            <MagneticButton
              key={cat.id}
              strength={0.25}
              onClick={() => setActiveFilter(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-white text-black shadow-md'
                  : 'bg-[#101112] text-slate-400 hover:text-white border border-[#26292b]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: isActive ? '#000' : accentColor }} />
              <span>{cat.label}</span>
            </MagneticButton>
          );
        })}
      </div>

      {/* Grid Proyek */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -4 }}
            onClick={() => onSelectProject(project)}
            className="bg-[#101112] border border-[#26292b] hover:border-[#00D2BE] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-lg"
          >
            <div>
              {/* Visual Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#081816] via-[#101112] to-[#040908] border-b border-[#26292b]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : null}

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div
                    className="w-12 h-12 rounded-xl border flex items-center justify-center mb-2"
                    style={{
                      borderColor: `${accentColor}40`,
                      backgroundColor: `${accentColor}10`,
                    }}
                  >
                    <FolderGit2 className="w-6 h-6" style={{ color: accentColor }} />
                  </div>
                  <span className="font-display font-bold text-white text-base">
                    {project.title}
                  </span>
                  <span className="text-xs text-slate-400 font-mono mt-1">
                    {project.tools.slice(0, 3).join(' · ')}
                  </span>
                </div>

                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-white">
                  {project.year}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold" style={{ color: accentColor }}>
                    {project.categoryLabel}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-[#00D2BE] transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 font-sans">
                  {project.shortDescription}
                </p>

                {project.metrics && (
                  <div className="pt-1">
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-[#16181a] border border-[#26292b] text-slate-200">
                      Metrik: <span style={{ color: accentColor }}>{project.metrics}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-0 mt-3 flex items-center justify-between border-t border-[#26292b]/60 pt-4 text-xs font-mono">
              <span className="text-slate-400">
                {project.tools.join(' / ')}
              </span>

              <span className="text-[#00D2BE] font-bold group-hover:underline">
                Buka Kasus →
              </span>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};
