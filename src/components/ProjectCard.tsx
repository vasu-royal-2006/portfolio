import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Project, AccentThemeConfig } from '../types';
import { ExternalLink, Github, Star, Sparkles, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  accentTheme: AccentThemeConfig;
  onSelect: (project: Project) => void;
  layout?: 'grid' | 'list';
  isDarkMode?: boolean;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  accentTheme,
  onSelect,
  layout = 'grid',
  isDarkMode = true,
  index = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useTransform(mouseY, [0, 1], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 1], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  if (layout === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -3 }}
        onClick={() => onSelect(project)}
        className={`rounded-2xl p-4 transition-all cursor-pointer group flex flex-col md:flex-row gap-6 items-stretch premium-card ${accentTheme.borderHoverClass}`}
      >
        {/* Image Thumbnail */}
        <div className={`relative w-full md:w-72 h-48 shrink-0 rounded-xl overflow-hidden border ${isDarkMode ? 'border-slate-800/50' : 'border-slate-200'}`}>
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide backdrop-blur-xl border ${isDarkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-white/80 border-slate-200 text-slate-800'}`}>
            {project.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {project.title}
                <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 ${accentTheme.textAccentClass}`} />
              </h3>
              {project.stars !== undefined && (
                <span className={`flex items-center gap-1.5 text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {project.stars}
                </span>
              )}
            </div>
            <p className={`text-sm leading-relaxed line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {project.shortDescription}
            </p>
          </div>

          <div className={`flex flex-wrap items-center justify-between gap-4 pt-4 mt-4 border-t ${isDarkMode ? 'border-slate-800/40' : 'border-slate-200'}`}>
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium border ${
                    isDarkMode ? 'bg-slate-900/60 border-slate-800/50 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                <Github className="w-4 h-4" />
              </a>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
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
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`rounded-2xl transition-all cursor-pointer group flex flex-col justify-between overflow-hidden relative premium-card ${accentTheme.borderHoverClass}`}
    >
      {/* Featured Star Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <motion.span
            className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wide backdrop-blur-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 flex items-center gap-1.5 shadow-md"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            Featured
          </motion.span>
        </div>
      )}

      {/* Image Header */}
      <div className={`relative w-full h-56 overflow-hidden border-b ${isDarkMode ? 'border-slate-800/40' : 'border-slate-200'}`}>
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide backdrop-blur-xl border ${isDarkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-white/80 border-slate-200 text-slate-800'}`}>
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {project.title}
              <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 ${accentTheme.textAccentClass}`} />
            </h3>
            {project.stars !== undefined && (
              <span className={`flex items-center gap-1.5 text-xs font-medium shrink-0 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {project.stars}
              </span>
            )}
          </div>
          <p className={`text-sm leading-relaxed line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {project.shortDescription}
          </p>
        </div>

        <div className={`space-y-4 pt-4 border-t ${isDarkMode ? 'border-slate-800/40' : 'border-slate-200'}`}>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech, techIdx) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + techIdx * 0.05 }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium border ${
                  isDarkMode ? 'bg-slate-900/60 border-slate-800/50 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {tech}
              </motion.span>
            ))}
            {project.techStack.length > 4 && (
              <span className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${isDarkMode ? 'bg-slate-900/30 text-slate-500' : 'bg-slate-100 text-slate-500'}`}>
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Action links */}
          <div className="flex items-center justify-between pt-2" onClick={(e) => e.stopPropagation()}>
            <span className={`text-[12px] font-bold ${accentTheme.textAccentClass} flex items-center gap-1`}>
              View Case Study
            </span>

            <div className="flex items-center gap-1">
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                title="View GitHub Repository"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                title="View Live Demo"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
