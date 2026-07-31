import React, { useState, useEffect, useCallback } from 'react';
import { ACCENT_THEMES } from './data/portfolioData';
import { AccentColor } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { HangingThemeToggle } from './components/HangingThemeToggle';
import { Loader } from './components/Loader';
import { AuroraBackground } from './components/effects/AuroraBackground';
import { ScrollProgress } from './components/effects/ScrollProgress';
import { CursorGlow } from './components/effects/CursorGlow';
import { SectionDivider } from './components/effects/SectionDivider';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [accentColor, setAccentColor] = useState<AccentColor>('blue');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const accentTheme = ACCENT_THEMES[accentColor] || ACCENT_THEMES.blue;

  // Sync dark class on root document html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle URL hash / path syncing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const path = window.location.pathname.replace('/', '');
      const target = hash || path;
      if (['home', 'about', 'projects', 'contact'].includes(target)) {
        setActiveSection(target);
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Intersection Observer for scroll highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = ['home', 'about', 'projects', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleExploreProjects = () => {
    setActiveSection('projects');
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    setActiveSection('contact');
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Show loader
  if (isLoading) {
    return <Loader onComplete={handleLoaderComplete} />;
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans relative ${
        isDarkMode
          ? 'bg-[#050505] text-slate-100'
          : 'bg-[#fafbfc] text-slate-900'
      }`}
    >
      {/* Global Background Effects */}
      <AuroraBackground isDarkMode={isDarkMode} accentHex={accentTheme.hex} />
      <CursorGlow />
      <ScrollProgress accentHex={accentTheme.hex} />

      {/* Hanging Theme Toggle */}
      <HangingThemeToggle
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        accentTheme={accentTheme}
        onSelectAccent={(color) => setAccentColor(color)}
        onOpenResume={() => setIsResumeOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Hero Section */}
      <Hero
        accentTheme={accentTheme}
        onExploreProjects={handleExploreProjects}
        onContactClick={handleContactClick}
        onOpenResume={() => setIsResumeOpen(true)}
        isDarkMode={isDarkMode}
      />

      <SectionDivider />

      {/* About Section */}
      <About
        accentTheme={accentTheme}
        onOpenResume={() => setIsResumeOpen(true)}
        isDarkMode={isDarkMode}
      />

      <SectionDivider />

      {/* Projects Section */}
      <ProjectsSection accentTheme={accentTheme} isDarkMode={isDarkMode} />

      <SectionDivider />

      {/* Contact Section */}
      <ContactSection accentTheme={accentTheme} isDarkMode={isDarkMode} />

      {/* Footer */}
      <Footer accentTheme={accentTheme} setActiveSection={setActiveSection} isDarkMode={isDarkMode} />

      {/* Resume Download / View Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        accentTheme={accentTheme}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
