import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project, AccentThemeConfig } from '../types';
import { X, ExternalLink, Github, Star, GitFork, CheckCircle2, Layers, Cpu, Code2 } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  accentTheme: AccentThemeConfig;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  accentTheme,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="relative w-full max-w-3xl glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full glass-card text-slate-400 hover:text-white hover:border-slate-600 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Image Banner */}
          <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-slate-800">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${accentTheme.badgeClass}`}>
                {project.category}
              </span>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
                {project.stars !== undefined && (
                  <span className="flex items-center gap-1 glass-panel px-2.5 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    {project.stars}
                  </span>
                )}
                {project.forks !== undefined && (
                  <span className="flex items-center gap-1 glass-panel px-2.5 py-1 rounded-lg">
                    <GitFork className="w-3.5 h-3.5 text-slate-400" />
                    {project.forks}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Title & Short Description */}
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{project.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className={`w-3.5 h-3.5 ${accentTheme.textAccentClass}`} />
              <span>Technologies & Tools</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className={`w-3.5 h-3.5 ${accentTheme.textAccentClass}`} />
                <span>Feature Highlights</span>
              </div>
              <ul className="space-y-2 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                {project.highlights.map((h, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${accentTheme.badgeClass}`} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Architecture Details if present */}
          {project.architecture && project.architecture.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className={`w-3.5 h-3.5 ${accentTheme.textAccentClass}`} />
                <span>System Architecture</span>
              </div>
              <ul className="space-y-1.5 bg-slate-900/30 p-3 rounded-xl border border-slate-800/80">
                {project.architecture.map((arch, i) => (
                  <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{arch}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions Footer */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white glass-card hover:border-slate-600 transition-all flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </a>

            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 flex items-center gap-2 transition-all shadow-md bg-gradient-to-r ${accentTheme.accentClass}`}
            >
              <span>Live Application Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
