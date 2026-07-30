import React from 'react';
import { motion } from 'motion/react';
import { Skill, AccentThemeConfig } from '../types';
import * as Icons from 'lucide-react';

interface SkillBadgeProps {
  skill: Skill;
  accentTheme: AccentThemeConfig;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, accentTheme }) => {
  // Dynamic Lucide icon lookup
  const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[skill.icon] || Icons.Code2;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.15 }}
      className={`glass-card p-3.5 rounded-xl border border-slate-800/90 transition-all ${accentTheme.borderHoverClass} group relative overflow-hidden flex items-center justify-between gap-3`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 group-hover:${accentTheme.textAccentClass} transition-colors flex items-center justify-center shrink-0`}
        >
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
            {skill.name}
          </div>
          <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
            <span>{skill.category}</span>
            <span>•</span>
            <span className="text-slate-500">{skill.years}</span>
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
