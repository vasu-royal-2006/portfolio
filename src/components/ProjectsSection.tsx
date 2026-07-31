import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { Project, AccentThemeConfig } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { AnimatedText } from './effects/AnimatedText';
import { FolderGit2, Search, Grid, List, Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  accentTheme: AccentThemeConfig;
  isDarkMode?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ accentTheme, isDarkMode = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = ['All', 'AI Development', 'Full-Stack', 'Cloud & Systems'];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.shortDescription + ' ' + project.fullDescription).toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-28 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-xl ${
            isDarkMode ? 'bg-slate-900/40 border-slate-800/50 text-slate-300' : 'bg-white/60 border-slate-200/50 text-slate-600 shadow-sm'
          }`}
        >
          <FolderGit2 className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Featured Works
          </span>
        </motion.div>

        <AnimatedText
          text="Architected with perfection, engineered for scale"
          as="h2"
          className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          animation="word"
          staggerChildren={0.03}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`text-lg sm:text-xl font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
        >
          Explore a collection of production-ready applications, open-source utilities, and AI tools.
        </motion.p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? `${accentTheme.bgGlowClass} ${accentTheme.textAccentClass} border border-slate-700/50 font-semibold shadow-sm`
                    : isDarkMode
                    ? 'text-slate-400 hover:text-slate-200 bg-slate-900/30 hover:bg-slate-800/40 border border-slate-800/50'
                    : 'text-slate-600 hover:text-slate-900 bg-white/50 hover:bg-white border border-slate-200/50'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-8 pr-3 py-2 rounded-xl text-xs transition-all focus:outline-none focus:ring-1 ${
                isDarkMode
                  ? 'bg-slate-900/30 border border-slate-800/50 text-white placeholder-slate-500 focus:border-slate-700 focus:ring-slate-700/30'
                  : 'bg-white/60 border border-slate-200/50 text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm'
              }`}
            />
          </div>

          <div className={`flex items-center gap-1 p-1 rounded-xl border backdrop-blur-xl shrink-0 ${
            isDarkMode ? 'bg-slate-900/30 border-slate-800/50' : 'bg-white/50 border-slate-200/50'
          }`}>
            {[
              { mode: 'grid' as const, icon: Grid },
              { mode: 'list' as const, icon: List },
            ].map(({ mode, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setLayoutMode(mode)}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  layoutMode === mode
                    ? isDarkMode
                      ? 'bg-slate-800/60 text-white shadow-sm'
                      : 'bg-white text-slate-900 shadow-sm'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title={`${mode} View`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid / List */}
      {filteredProjects.length > 0 ? (
        <div
          className={
            layoutMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              accentTheme={accentTheme}
              layout={layoutMode}
              isDarkMode={isDarkMode}
              onSelect={(p) => setActiveProjectModal(p)}
              index={idx}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`premium-card p-12 rounded-3xl text-center space-y-3`}
        >
          <Sparkles className={`w-8 h-8 mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
          <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            No projects found
          </h3>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            No projects matched your search for "{searchQuery}". Try clearing filters.
          </p>
          <motion.button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-slate-800/60 hover:bg-slate-700/60 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Reset Filters
          </motion.button>
        </motion.div>
      )}

      {/* Detailed Project Modal */}
      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
          accentTheme={accentTheme}
          isDarkMode={isDarkMode}
        />
      )}
    </section>
  );
};
