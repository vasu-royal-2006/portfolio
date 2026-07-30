import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DEVELOPER_INFO, SKILLS, EXPERIENCES } from '../data/portfolioData';
import { AccentThemeConfig } from '../types';
import { SkillBadge } from './SkillBadge';
import { User, MapPin, Sparkles, Download, CheckCircle2, Briefcase, Building2, Calendar, Search } from 'lucide-react';

interface AboutProps {
  accentTheme: AccentThemeConfig;
  onOpenResume: () => void;
  isDarkMode?: boolean;
}

export const About: React.FC<AboutProps> = ({ accentTheme, onOpenResume, isDarkMode = true }) => {
  const [activeTab, setActiveTab] = useState<'skills' | 'experience'>('skills');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'AI & Data', 'Frontend', 'Backend', 'DevOps', 'Tools'];

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="about" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border ${
            isDarkMode ? 'border-slate-800' : 'border-slate-300'
          }`}
        >
          <User className={`w-3.5 h-3.5 ${accentTheme.textAccentClass}`} />
          <span className={`text-xs font-mono font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            ABOUT ME
          </span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Crafting digital products with{' '}
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${accentTheme.accentClass}`}>
            precision & passion
          </span>
        </h2>
        <p className={`text-base ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
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
          className={`lg:col-span-4 glass-panel p-6 sm:p-8 rounded-3xl border space-y-6 relative overflow-hidden ${
            isDarkMode ? 'border-slate-800' : 'border-slate-300'
          }`}
        >
          <div className="relative group w-48 sm:w-56 aspect-[3/4] mx-auto rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl">
            <img
              src={DEVELOPER_INFO.avatar}
              alt={DEVELOPER_INFO.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>

          <div className="text-center space-y-2">
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{DEVELOPER_INFO.name}</h3>
            <p className={`text-xs font-mono ${accentTheme.textAccentClass}`}>{DEVELOPER_INFO.title}</p>
            <div className={`flex items-center justify-center gap-1.5 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{DEVELOPER_INFO.location}</span>
            </div>
          </div>

          <p className={`text-xs leading-relaxed text-center ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {DEVELOPER_INFO.shortBio}
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenResume}
              className={`w-full py-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                isDarkMode
                  ? 'text-slate-100 bg-slate-900 border border-slate-700 hover:border-slate-600'
                  : 'text-slate-900 bg-slate-100 border border-slate-300 hover:bg-slate-200'
              } ${accentTheme.borderHoverClass}`}
            >
              <Download className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} />
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
          className={`lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border space-y-6 flex flex-col justify-between ${
            isDarkMode ? 'border-slate-800' : 'border-slate-300'
          }`}
        >
          <div className="space-y-4">
            <div className={`flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <Sparkles className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
              <span>Engineering Approach</span>
            </div>
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Delivering user-focused AI applications, cloud solutions, and reliable technical support.
            </h3>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              I am a Computer Science undergraduate at VIT-AP University passionate about artificial intelligence, customer support engineering, and cloud platforms. My experience includes developing AI chatbots using IBM Watsonx, designing automated workflows, and managing database applications.
            </p>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Equipped with certifications in AWS Cloud Foundations, AWS Cloud Architecting, and IBM Gen-AI, I bring strong problem-solving abilities, communication skills, and an analytical mindset to software and support engineering teams.
            </p>
          </div>

          {/* Quick Pillars */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className={`p-3.5 rounded-xl border space-y-1 ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
              <div className={`text-xs font-bold flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <CheckCircle2 className={`w-3.5 h-3.5 ${accentTheme.textAccentClass}`} />
                Customer Focus
              </div>
              <div className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Query resolution & user accuracy.</div>
            </div>
            <div className={`p-3.5 rounded-xl border space-y-1 ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
              <div className={`text-xs font-bold flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <CheckCircle2 className={`w-3.5 h-3.5 ${accentTheme.textAccentClass}`} />
                AI & Watsonx
              </div>
              <div className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Prompt engineering & automation.</div>
            </div>
            <div className={`p-3.5 rounded-xl border space-y-1 ${isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
              <div className={`text-xs font-bold flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <CheckCircle2 className={`w-3.5 h-3.5 ${accentTheme.textAccentClass}`} />
                AWS Certified
              </div>
              <div className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>AWS Cloud Foundations & Architecting.</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs Switcher: Skills vs Experience */}
      <div className="flex items-center justify-center mb-8">
        <div className={`glass-panel p-1 rounded-2xl border inline-flex gap-1 ${isDarkMode ? 'border-slate-800' : 'border-slate-300'}`}>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'skills'
                ? isDarkMode
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'bg-slate-200 text-slate-900 shadow-sm border border-slate-300'
                : isDarkMode
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tech Stack & Skills</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'experience'
                ? isDarkMode
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'bg-slate-200 text-slate-900 shadow-sm border border-slate-300'
                : isDarkMode
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
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
                        : isDarkMode
                        ? 'text-slate-400 hover:text-slate-200 bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800/80'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search skills (e.g. Next.js)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-8 pr-3 py-1.5 rounded-xl text-xs transition-all focus:outline-none ${
                  isDarkMode
                    ? 'glass-card border border-slate-800 text-white placeholder-slate-500 focus:border-slate-700'
                    : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500 shadow-sm'
                }`}
              />
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <SkillBadge key={skill.name} skill={skill} accentTheme={accentTheme} isDarkMode={isDarkMode} />
              ))
            ) : (
              <div className={`col-span-full text-center py-12 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
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
          <div className={`relative border-l-2 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-10 ${isDarkMode ? 'border-slate-800' : 'border-slate-300'}`}>
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Timeline Node Dot */}
                <span
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 group-hover:scale-125 transition-all ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-700 group-hover:border-slate-400'
                      : 'bg-white border-slate-400 group-hover:border-slate-600'
                  }`}
                />

                <div
                  className={`glass-panel p-6 rounded-2xl border space-y-4 transition-all ${
                    isDarkMode ? 'border-slate-800 hover:border-slate-700' : 'border-slate-300 hover:border-slate-400 shadow-sm'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h4>
                      <div className={`flex items-center gap-2 text-xs font-mono mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-500" />
                          {exp.company}
                        </span>
                        <span>•</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-mono border flex items-center gap-1 ${
                          isDarkMode
                            ? 'bg-slate-900 border-slate-800 text-slate-300'
                            : 'bg-slate-100 border-slate-300 text-slate-700'
                        }`}
                      >
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {exp.description}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <div className={`text-[11px] font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Key Impact & Achievements:
                    </div>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx} className={`text-xs flex items-start gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${accentTheme.badgeClass}`} />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`flex flex-wrap gap-1.5 pt-2 border-t ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${
                          isDarkMode
                            ? 'bg-slate-900 text-slate-400 border-slate-800'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
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
