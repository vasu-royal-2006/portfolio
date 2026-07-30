import React, { useState, useEffect } from 'react';
import { ACCENT_THEMES } from './data/portfolioData';
import { AccentColor } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { SuspendedMouseToggle } from './components/SuspendedMouseToggle';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [accentColor, setAccentColor] = useState<AccentColor>('blue');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans relative ${
        isDarkMode
          ? 'bg-[#050505] text-slate-100 selection:bg-blue-500/30 selection:text-blue-200'
          : 'bg-[#f8fafc] text-slate-900 selection:bg-blue-200 selection:text-blue-900'
      }`}
    >
      {/* Suspended Hanging Mouse Cable Theme Toggle */}
      <SuspendedMouseToggle
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        accentTheme={accentTheme}
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

      {/* About Section */}
      <About
        accentTheme={accentTheme}
        onOpenResume={() => setIsResumeOpen(true)}
        isDarkMode={isDarkMode}
      />

      {/* Projects Section */}
      <ProjectsSection accentTheme={accentTheme} isDarkMode={isDarkMode} />

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
