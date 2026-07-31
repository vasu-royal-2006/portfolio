import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project, AccentThemeConfig } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
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
    <section id="projects" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${
            isDarkMode ? 'bg-slate-900/50 border-slate-800 text-slate-300' : 'bg-white/80 border-slate-200 text-slate-600 shadow-sm'
          }`}
        >
          <FolderGit2 className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Featured Works
          </span>
        </div>
        <h2
          className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          Architected with perfection <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200" style={{ backgroundImage: `linear-gradient(to right, ${accentTheme.hex}, #94a3b8)` }}>
            engineered for scale
          </span>
        </h2>
        <p className={`text-lg sm:text-xl font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Explore a collection of production-ready applications, open-source utilities, and AI tools.
        </p>
      </div>

      {/* Controls Bar: Categories, Search, Grid/List Switch */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? `${accentTheme.bgGlowClass} ${accentTheme.textAccentClass} border border-slate-700 font-semibold shadow-sm`
                    : isDarkMode
                    ? 'text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-800/60 border border-slate-800'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Right Controls: Search & Layout Toggle */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-8 pr-3 py-2 rounded-xl text-xs transition-all focus:outline-none ${
                isDarkMode
                  ? 'glass-card border border-slate-800 text-white placeholder-slate-500 focus:border-slate-700'
                  : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500 shadow-sm'
              }`}
            />
          </div>

          <div
            className={`flex items-center gap-1 p-1 rounded-xl glass-panel border shrink-0 ${
              isDarkMode ? 'border-slate-800' : 'border-slate-300'
            }`}
          >
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                layoutMode === 'grid'
                  ? isDarkMode
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-slate-200 text-slate-900 shadow-sm font-semibold'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode('list')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                layoutMode === 'list'
                  ? isDarkMode
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-slate-200 text-slate-900 shadow-sm font-semibold'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
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
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              accentTheme={accentTheme}
              layout={layoutMode}
              isDarkMode={isDarkMode}
              onSelect={(p) => setActiveProjectModal(p)}
            />
          ))}
        </div>
      ) : (
        <div
          className={`glass-panel p-12 rounded-3xl text-center border space-y-3 ${
            isDarkMode ? 'border-slate-800' : 'border-slate-300'
          }`}
        >
          <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            No projects found
          </h3>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            No projects matched your search for "{searchQuery}". Try clearing filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
            }`}
          >
            Reset Filters
          </button>
        </div>
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
