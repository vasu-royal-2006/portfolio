import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DEVELOPER_INFO, SKILLS, EXPERIENCES } from '../data/portfolioData';
import { AccentThemeConfig, SkillCategory } from '../types';
import { SkillBadge } from './SkillBadge';
import { User, Briefcase, Award, Search, Download, FileText, CheckCircle2, Sparkles, MapPin, Calendar, Building2 } from 'lucide-react';

interface AboutProps {
  accentTheme: AccentThemeConfig;
  onOpenResume: () => void;
  isDarkMode?: boolean;
}

export const About: React.FC<AboutProps> = ({ accentTheme, onOpenResume, isDarkMode = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'skills' | 'experience'>('skills');

  const categories: SkillCategory[] = [
    'All',
    'Customer Service',
    'Communication',
    'Professional Skills',
    'Technical & Tools',
    'DevOps & Cloud',
    'Tools & Architecture',
  ];

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="about" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-slate-800">
          <User className={`w-3.5 h-3.5 ${accentTheme.textAccentClass}`} />
          <span className="text-xs font-mono font-medium text-slate-300">ABOUT ME</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Crafting digital products with{' '}
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${accentTheme.accentClass}`}>
            precision & passion
          </span>
        </h2>
        <p className="text-base text-slate-400">
          A brief look into my background, technical expertise, and engineering journey.
        </p>
      </div>

      {/* Main Bio Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Avatar & Key Profile Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-4 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 relative overflow-hidden"
        >
          <div className="relative group w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl">
            <img
              src={DEVELOPER_INFO.avatar}
              alt={DEVELOPER_INFO.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-white">{DEVELOPER_INFO.name}</h3>
            <p className={`text-xs font-mono ${accentTheme.textAccentClass}`}>{DEVELOPER_INFO.title}</p>
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{DEVELOPER_INFO.location}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed text-center">
            {DEVELOPER_INFO.shortBio}
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenResume}
              className={`w-full py-3 rounded-xl font-semibold text-xs text-slate-100 bg-slate-900 border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2 shadow-sm ${accentTheme.borderHoverClass}`}
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Download Full Resume</span>
            </button>
          </div>
        </motion.div>

        {/* Detailed Bio & Core Philosophy */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
              <Sparkles className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
              <span>Engineering Approach</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Delivering user-focused AI applications, cloud solutions, and reliable technical support.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              I am a Computer Science undergraduate at VIT-AP University passionate about artificial intelligence, customer support engineering, and cloud platforms. My experience includes developing AI chatbots using IBM Watsonx, designing automated workflows, and managing database applications.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Equipped with certifications in AWS Cloud Foundations, AWS Cloud Architecting, and IBM Gen-AI, I bring strong problem-solving abilities, communication skills, and an analytical mindset to software and support engineering teams.
            </p>
          </div>

          {/* Quick Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className={`w-3.5 h-3.5 ${accentTheme.textAccentClass}`} />
                Customer Focus
              </div>
              <div className="text-[11px] text-slate-400">Query resolution & user accuracy.</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className={`w-3.5 h-3.5 ${accentTheme.textAccentClass}`} />
                AI & Watsonx
              </div>
              <div className="text-[11px] text-slate-400">Prompt engineering & automation.</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className={`w-3.5 h-3.5 ${accentTheme.textAccentClass}`} />
                AWS Certified
              </div>
              <div className="text-[11px] text-slate-400">AWS Cloud Foundations & Architecting.</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs Switcher: Skills vs Experience */}
      <div className="flex items-center justify-center mb-8">
        <div className="glass-panel p-1 rounded-2xl border border-slate-800 inline-flex gap-1">
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'skills'
                ? `bg-slate-800 text-white shadow-sm border border-slate-700`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tech Stack & Skills</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'experience'
                ? `bg-slate-800 text-white shadow-sm border border-slate-700`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work Experience</span>
          </button>
        </div>
      </div>

      {/* Skills Tab Content */}
      {activeTab === 'skills' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Controls: Search & Category Chips */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? `${accentTheme.bgGlowClass} ${accentTheme.textAccentClass} border border-slate-700 font-semibold`
                        : 'text-slate-400 hover:text-slate-200 bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800/80'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search skills (e.g. Next.js)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl glass-card border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-all"
              />
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <SkillBadge key={skill.name} skill={skill} accentTheme={accentTheme} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-500 text-xs">
                No skills match "{searchQuery}".
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Work Experience Tab Content */}
      {activeTab === 'experience' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-10">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Timeline Node Dot */}
                <span className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-slate-700 group-hover:border-slate-400 group-hover:scale-125 transition-all`} />

                <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-500" />
                          {exp.company}
                        </span>
                        <span>•</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Key Impact & Achievements:
                    </div>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${accentTheme.badgeClass}`} />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                    {exp.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
};
