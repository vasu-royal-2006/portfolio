import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { AccentThemeConfig } from '../types';
import {
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Sparkles,
  Terminal,
  Download,
  MapPin,
  Eye,
  Clock,
  Briefcase,
  Code2,
} from 'lucide-react';

interface HeroProps {
  accentTheme: AccentThemeConfig;
  onExploreProjects: () => void;
  onContactClick: () => void;
  onOpenResume: () => void;
  isDarkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  accentTheme,
  onExploreProjects,
  onContactClick,
  onOpenResume,
  isDarkMode,
}) => {
  // Typewriter effect state
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Live real-time clock state
  const [timeString, setTimeString] = useState('');

  // Live view counter state
  const [viewsCount, setViewsCount] = useState(1262);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const clockTimer = setInterval(updateTime, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  // Simulate subtle real-time view counter increments
  useEffect(() => {
    const viewsTimer = setInterval(() => {
      if (Math.random() > 0.6) {
        setViewsCount((prev) => prev + 1);
      }
    }, 8000);
    return () => clearInterval(viewsTimer);
  }, []);

  useEffect(() => {
    const roles = DEVELOPER_INFO.typewriterRoles;
    const currentFullText = roles[currentRoleIndex];

    const typingSpeed = isDeleting ? 40 : 80;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === currentFullText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setCurrentText(
          isDeleting
            ? currentFullText.substring(0, currentText.length - 1)
            : currentFullText.substring(0, currentText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  return (
    <section
      id="home"
      className={`relative min-h-screen pt-24 pb-16 flex flex-col justify-center items-center px-4 sm:px-8 transition-colors duration-300 overflow-hidden ${
        isDarkMode ? 'bg-[#050505] text-slate-100 bg-dot-pattern' : 'bg-[#f8fafc] text-slate-900 bg-grid-pattern'
      }`}
    >
      {/* Radial Ambient Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: accentTheme.hex }}
      />

      <div className="max-w-4xl w-full mx-auto z-10 space-y-6">
        {/* 1. Top Dot-Matrix "OPEN TO WORK" Header Banner (Matching Reference Image) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`relative w-full rounded-2xl p-8 sm:p-12 border overflow-hidden transition-all text-center ${
            isDarkMode
              ? 'bg-[#0a0d14]/90 border-slate-800/90 shadow-2xl shadow-black/60 bg-dot-pattern'
              : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 bg-grid-pattern'
          }`}
        >
          {/* Live Timestamp on Top Right */}
          <div className="absolute top-3.5 right-4 sm:right-6 flex items-center gap-1.5 font-mono text-xs opacity-75">
            <Clock className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>
              {timeString || '9:34:56 PM'}
            </span>
          </div>

          {/* Matrix Grid Dot Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />

          {/* Banner Title */}
          <h2
            className={`text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase font-mono transition-colors ${
              isDarkMode ? 'text-slate-200' : 'text-slate-800'
            }`}
          >
            Open to Work
          </h2>

          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span
              className={`text-xs font-mono uppercase tracking-widest ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}
            >
              Available for Full-time Roles & Contracts
            </span>
          </div>
        </motion.div>

        {/* 2. Main Profile Card Section (Avatar, Name, Quick Links, Live Views) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={`w-full rounded-2xl p-6 sm:p-8 border transition-all flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 ${
            isDarkMode
              ? 'bg-[#0d1117]/80 border-slate-800/80 shadow-xl shadow-black/40'
              : 'bg-white border-slate-200 shadow-lg shadow-slate-200/60'
          }`}
        >
          {/* Profile Left: Avatar & Title Info */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative group">
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 p-1 transition-all duration-300 ${
                  isDarkMode ? 'border-slate-700 group-hover:border-blue-500' : 'border-slate-300 group-hover:border-blue-500'
                }`}
              >
                <img
                  src={DEVELOPER_INFO.avatar}
                  alt={DEVELOPER_INFO.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-md" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1
                  className={`text-3xl sm:text-4xl font-black tracking-tight font-sans ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {DEVELOPER_INFO.name}
                </h1>
              </div>

              <p
                className={`text-sm sm:text-base font-mono flex items-center justify-center sm:justify-start gap-2 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                <Briefcase className="w-4 h-4 text-blue-500" />
                <span>21 Engineer • {DEVELOPER_INFO.title}</span>
              </p>

              {/* Typewriter role line */}
              <div className="flex items-center justify-center sm:justify-start gap-2 font-mono text-xs pt-1">
                <Terminal className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
                <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{currentText}</span>
                <span className="w-1.5 h-4 bg-blue-500 animate-pulse inline-block" />
              </div>
            </div>
          </div>

          {/* Profile Right: Social Links & Live View Counter */}
          <div className="flex flex-col items-center sm:items-end gap-3">
            <div className="flex items-center gap-2">
              <a
                href={DEVELOPER_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl border transition-all ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-black hover:border-slate-300'
                }`}
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={DEVELOPER_INFO.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl border transition-all ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-black hover:border-slate-300'
                }`}
                title="X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={DEVELOPER_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl border transition-all ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-black hover:border-slate-300'
                }`}
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* View Counter Badge (Matching Reference Image `👁 1,262`) */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border ${
                isDarkMode
                  ? 'bg-slate-900/90 text-slate-400 border-slate-800'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold">{viewsCount.toLocaleString()}</span>
              <span className="text-[10px] text-slate-500 uppercase">views</span>
            </div>
          </div>
        </motion.div>

        {/* 3. Highlighted Bio Card (Matching Reference Image Design with Styled Badges) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className={`w-full rounded-2xl p-6 sm:p-7 border transition-all ${
            isDarkMode
              ? 'bg-[#0a0d14]/90 border-slate-800/90 text-slate-300 shadow-xl'
              : 'bg-white border-slate-200 text-slate-700 shadow-md'
          }`}
        >
          <p className="text-sm sm:text-base leading-relaxed font-sans">
            Hey, I'm {DEVELOPER_INFO.name},{' '}
            <span
              className={`px-2 py-0.5 rounded font-mono text-xs sm:text-sm font-semibold border ${
                isDarkMode
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                  : 'bg-blue-50 text-blue-600 border-blue-200'
              }`}
            >
              full-stack developer
            </span>
            . I learn by building. I don't wait to feel ready — I start, figure things out, and keep going. I've worked with{' '}
            <span className="font-semibold text-blue-500">React</span>,{' '}
            <span className="font-semibold text-blue-500">Next.js</span>,{' '}
            <span className="font-semibold text-blue-500">Node.js</span>,{' '}
            <span className="font-semibold text-blue-500">Express</span>,{' '}
            <span className="font-semibold text-blue-500">MongoDB</span>, and recently started exploring AI with tools like{' '}
            <span
              className={`px-2 py-0.5 rounded font-mono text-xs sm:text-sm font-semibold border ${
                isDarkMode
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                  : 'bg-indigo-50 text-indigo-600 border-indigo-200'
              }`}
            >
              LangChain
            </span>
            ,{' '}
            <span
              className={`px-2 py-0.5 rounded font-mono text-xs sm:text-sm font-semibold border ${
                isDarkMode
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  : 'bg-cyan-50 text-cyan-600 border-cyan-200'
              }`}
            >
              RAG
            </span>
            , and vector databases. Still exploring, experimenting, and getting better with every build.
          </p>

          <div className="mt-4 pt-4 border-t border-slate-800/40 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              <span>{DEVELOPER_INFO.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Code2 className="w-3.5 h-3.5" />
              <span>TypeScript • React 18 • Cloud Architecture</span>
            </div>
          </div>
        </motion.div>

        {/* 4. Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2"
        >
          <button
            onClick={onExploreProjects}
            className={`px-6 py-3.5 rounded-xl font-semibold text-sm text-white flex items-center gap-2 transition-all shadow-lg hover:scale-[1.02] cursor-pointer bg-gradient-to-r ${accentTheme.accentClass}`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore Featured Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onContactClick}
            className={`px-6 py-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer border flex items-center gap-2 ${
              isDarkMode
                ? 'bg-slate-900/80 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700'
                : 'bg-white border-slate-300 text-slate-800 hover:border-slate-400 shadow-xs'
            }`}
          >
            <Mail className="w-4 h-4 text-blue-500" />
            <span>Contact Me</span>
          </button>

          <button
            onClick={onOpenResume}
            className={`px-4 py-3.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            title="Download Resume"
          >
            <Download className="w-4 h-4 text-blue-500" />
            <span>Resume</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
