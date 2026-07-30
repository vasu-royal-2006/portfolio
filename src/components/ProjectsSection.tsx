import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory, AccentThemeConfig } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { FolderGit2, Search, Grid, List, Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  accentTheme: AccentThemeConfig;
  isDarkMode?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ accentTheme, isDarkMode = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ['All', 'Full Stack', 'AI & Cloud', 'Frontend', 'Open Source'];

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-slate-800">
          <FolderGit2 className={`w-3.5 h-3.5 ${accentTheme.textAccentClass}`} />
          <span className="text-xs font-mono font-medium text-slate-300">FEATURED WORKS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Architected with perfection &{' '}
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${accentTheme.accentClass}`}>
            engineered for scale
          </span>
        </h2>
        <p className="text-base text-slate-400">
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
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-800/60 border border-slate-800'
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
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Filter by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-xl glass-card border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-all"
            />
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl glass-panel border border-slate-800 shrink-0">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer ${
                layoutMode === 'grid' ? 'bg-slate-800 text-white shadow-sm' : ''
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode('list')}
              className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer ${
                layoutMode === 'list' ? 'bg-slate-800 text-white shadow-sm' : ''
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
              onSelect={(p) => setActiveProjectModal(p)}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800 space-y-3">
          <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No projects found</h3>
          <p className="text-xs text-slate-400">
            No projects matched your search for "{searchQuery}". Try clearing filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Detail Popup Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
        accentTheme={accentTheme}
      />
    </section>
  );
};
