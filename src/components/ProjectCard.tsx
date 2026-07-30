import React from 'react';
import { motion } from 'motion/react';
import { Project, AccentThemeConfig } from '../types';
import { ExternalLink, Github, Star, Sparkles, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  accentTheme: AccentThemeConfig;
  onSelect: (project: Project) => void;
  layout?: 'grid' | 'list';
  isDarkMode?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  accentTheme,
  onSelect,
  layout = 'grid',
  isDarkMode = true,
}) => {
  if (layout === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        onClick={() => onSelect(project)}
        className={`glass-card rounded-2xl p-4 border transition-all cursor-pointer group flex flex-col md:flex-row gap-5 items-stretch ${
          isDarkMode ? 'border-slate-800/90 hover:border-slate-700' : 'border-slate-200 hover:border-slate-300 shadow-sm'
        } ${accentTheme.borderHoverClass}`}
      >
        {/* Image Thumbnail */}
        <div
          className={`relative w-full md:w-64 h-40 shrink-0 rounded-xl overflow-hidden border ${
            isDarkMode ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <span className={`absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${accentTheme.badgeClass}`}>
            {project.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3
                className={`text-lg font-bold flex items-center gap-1.5 ${
                  isDarkMode ? 'text-white group-hover:text-slate-100' : 'text-slate-900 group-hover:text-blue-600'
                }`}
              >
                {project.title}
                <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${accentTheme.textAccentClass}`} />
              </h3>
              {project.stars !== undefined && (
                <span className={`flex items-center gap-1 text-xs font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {project.stars}
                </span>
              )}
            </div>
            <p className={`text-xs line-clamp-2 mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {project.shortDescription}
            </p>
          </div>

          <div className={`flex flex-wrap items-center justify-between gap-3 pt-2 border-t ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1.5 rounded-lg glass-card transition-all ${
                  isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 border-slate-300'
                }`}
                title="View Source Code"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1.5 rounded-lg glass-card transition-all ${
                  isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 border-slate-300'
                }`}
                title="Open Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(project)}
      className={`glass-card rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between overflow-hidden relative ${
        isDarkMode ? 'border-slate-800/90' : 'border-slate-200 shadow-sm'
      } ${accentTheme.borderHoverClass}`}
    >
      {/* Featured Star Badge if applicable */}
      {project.featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold glass-panel border border-amber-500/40 text-amber-500 flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Featured
          </span>
        </div>
      )}

      {/* Image Header */}
      <div className={`relative w-full h-48 overflow-hidden border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${accentTheme.badgeClass}`}>
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`text-base font-bold flex items-center gap-1 ${
                isDarkMode ? 'text-white group-hover:text-slate-100' : 'text-slate-900 group-hover:text-blue-600'
              }`}
            >
              {project.title}
              <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${accentTheme.textAccentClass}`} />
            </h3>
            {project.stars !== undefined && (
              <span className={`flex items-center gap-1 text-[11px] font-mono shrink-0 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                {project.stars}
              </span>
            )}
          </div>
          <p className={`text-xs line-clamp-2 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {project.shortDescription}
          </p>
        </div>

        <div className={`space-y-3 pt-2 border-t ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${isDarkMode ? 'bg-slate-900/60 text-slate-500' : 'bg-slate-100 text-slate-600'}`}>
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Action links */}
          <div className="flex items-center justify-between pt-1" onClick={(e) => e.stopPropagation()}>
            <span className={`text-[11px] font-semibold ${accentTheme.textAccentClass} group-hover:underline flex items-center gap-1`}>
              View Details
            </span>

            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1.5 rounded-lg glass-card transition-all ${
                  isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 border-slate-300'
                }`}
                title="View GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1.5 rounded-lg glass-card transition-all ${
                  isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 border-slate-300'
                }`}
                title="View Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
