/**
 * @file App.tsx
 * Arsitektur Multi-Page Bersih & Modern
 * Estetika Lando Norris (landonorris.com) & Charles Leclerc (charlesleclerc.com)
 * Palet Warna Mercedes-AMG Petronas F1.
 * 
 * Spesialisasi Afsal Murtaza:
 * Data Analytics · Artificial Intelligence · UI/UX Design · Enterprise Systems
 * Mahasiswa Teknik Informatika ITS Angkatan 2024 (Semester 5).
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { Loader } from './components/Loader';
import { ScrollProgressAndCursor } from './components/ScrollProgressAndCursor';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { JourneyPage } from './pages/JourneyPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectModal } from './components/ProjectModal';

import {
  personalProfile as initialProfile,
  projectsData,
  mercedesPetronasTheme,
} from './data/portfolioData';
import { PersonalProfile, ProjectItem, PageView } from './types';

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  // Router Multi-Page State
  const [currentPage, setCurrentPage] = useState<PageView>(() => {
    const hash = window.location.hash.replace('#', '');
    if (['about', 'projects', 'journey', 'contact'].includes(hash)) {
      return hash as PageView;
    }
    return 'home';
  });

  const [profile, setProfile] = useState<PersonalProfile>(() => {
    const saved = localStorage.getItem('afsal_portfolio_profile_v3');
    if (saved) {
      try {
        return { ...initialProfile, ...JSON.parse(saved) };
      } catch (e) {
        return initialProfile;
      }
    }
    return initialProfile;
  });

  const accentColor = mercedesPetronasTheme.petronasTeal; // #00D2BE resmi Mercedes Petronas
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Sync route dengan URL hash
  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'projects', 'journey', 'contact'].includes(hash)) {
        setCurrentPage(hash as PageView);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update foto profil dari About page
  const handleUpdateProfileImage = (newImage: string) => {
    const updated = { ...profile, profileImage: newImage };
    setProfile(updated);
    localStorage.setItem('afsal_portfolio_profile_v3', JSON.stringify(updated));
  };

  // Variasi animasi transisi halaman bergaya sinematik F1 (Subtle Zoom-In & Forward Push)
  const pageTransitionVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.96,
      y: 14,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.48,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.015,
      y: -10,
      transition: {
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-[#c8ccce] selection:bg-[#00D2BE]/30 selection:text-[#00D2BE] relative overflow-x-hidden font-archivo">
      
      {/* 1. OPENING LOADER (Menghitung naik hingga tepat 99.99%) */}
      {showLoader && (
        <Loader
          onComplete={() => setShowLoader(false)}
          accentColor={accentColor}
          name={profile.name}
        />
      )}

      {/* 2. PROGRESS BAR & KURSOR INTERAKTIF DESKTOP */}
      <ScrollProgressAndCursor accentColor={accentColor} />

      {/* 3. NAVBAR MULTI-PAGE (Home, About, Projects, Journey, Contact) */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        accentColor={accentColor}
      />

      {/* 4. MAIN MULTI-PAGE VIEW CONTAINER DENGAN TRANSISI HALUS & ZOOM-IN SINEMATIK */}
      <main id="main-content" className="min-h-screen">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              variants={pageTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full origin-top"
            >
              <HomePage
                profile={profile}
                accentColor={accentColor}
                onNavigate={navigateTo}
                featuredProjects={projectsData.slice(0, 3)}
                onSelectProject={(proj) => setSelectedProject(proj)}
              />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              variants={pageTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full origin-top"
            >
              <AboutPage
                profile={profile}
                accentColor={accentColor}
                onUpdateProfileImage={handleUpdateProfileImage}
              />
            </motion.div>
          )}

          {currentPage === 'projects' && (
            <motion.div
              key="projects"
              variants={pageTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full origin-top"
            >
              <ProjectsPage
                projects={projectsData}
                accentColor={accentColor}
                onSelectProject={(proj) => setSelectedProject(proj)}
              />
            </motion.div>
          )}

          {currentPage === 'journey' && (
            <motion.div
              key="journey"
              variants={pageTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full origin-top"
            >
              <JourneyPage accentColor={accentColor} />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              variants={pageTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full origin-top"
            >
              <ContactPage
                profile={profile}
                accentColor={accentColor}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* MODAL DETAIL KASUS PROYEK */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        accentColor={accentColor}
      />

    </div>
  );
}
