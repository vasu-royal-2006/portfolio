import React from 'react';
import { motion } from 'motion/react';
import { Skill, AccentThemeConfig } from '../types';
import * as Icons from 'lucide-react';

interface SkillBadgeProps {
  skill: Skill;
  accentTheme: AccentThemeConfig;
  isDarkMode?: boolean;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, accentTheme, isDarkMode = true }) => {
  // Dynamic Lucide icon lookup
  const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[skill.icon] || Icons.Code2;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.15 }}
      className={`glass-card p-3.5 rounded-xl border transition-all ${
        isDarkMode ? 'border-slate-800/90' : 'border-slate-300 shadow-sm'
      } ${accentTheme.borderHoverClass} group relative overflow-hidden flex items-center justify-between gap-3`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`p-2 rounded-lg border transition-colors flex items-center justify-center shrink-0 ${
            isDarkMode
              ? 'bg-slate-900 border-slate-800 text-slate-300'
              : 'bg-slate-100 border-slate-300 text-slate-700'
          }`}
        >
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div
            className={`text-xs font-semibold truncate ${
              isDarkMode ? 'text-slate-200 group-hover:text-white' : 'text-slate-900 group-hover:text-blue-600'
            }`}
          >
            {skill.name}
          </div>
          <div
            className={`text-[10px] font-mono flex items-center gap-1.5 mt-0.5 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            <span>{skill.category}</span>
            <span>•</span>
            <span>{skill.years}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${accentTheme.badgeClass}`}>
          {skill.level}%
        </span>
      </div>
    </motion.div>
  );
};
