import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DEVELOPER_INFO, SKILLS, EXPERIENCES, EDUCATION, CERTIFICATIONS, ACHIEVEMENTS, LANGUAGES } from '../data/portfolioData';
import { AccentThemeConfig } from '../types';
import { X, Download, FileText, CheckCircle2, Briefcase, GraduationCap, MapPin, Mail, Globe, Phone, Award, Trophy, Languages as LanguagesIcon } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentTheme: AccentThemeConfig;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  accentTheme,
}) => {
  if (!isOpen) return null;

  const handleDownloadText = () => {
    const resumeContent = `
${DEVELOPER_INFO.name.toUpperCase()}
${DEVELOPER_INFO.title} | ${DEVELOPER_INFO.location}
Email: ${DEVELOPER_INFO.email} | Phone: ${DEVELOPER_INFO.formattedPhone || DEVELOPER_INFO.phone}
GitHub: ${DEVELOPER_INFO.github} | LinkedIn: ${DEVELOPER_INFO.linkedin}

==================================================
PROFESSIONAL SUMMARY
==================================================
${DEVELOPER_INFO.bio}

==================================================
EDUCATION
==================================================
${EDUCATION.map(e => `${e.degree} - ${e.institution} (${e.period})\n${e.details}`).join('\n\n')}

==================================================
SKILLS & COMPETENCIES
==================================================
${SKILLS.map((s) => `• ${s.name} (${s.category})`).join('\n')}

==================================================
EXPERIENCE
==================================================
${EXPERIENCES.map(
  (exp) => `
${exp.role} - ${exp.company} (${exp.period})
Location: ${exp.location}
Description: ${exp.description}
Key Accomplishments:
${exp.achievements.map((a) => ` - ${a}`).join('\n')}
Tech/Tools: ${exp.tech.join(', ')}
`
).join('\n--------------------------------------------------\n')}

==================================================
CERTIFICATIONS
==================================================
${CERTIFICATIONS.map(c => `• ${c}`).join('\n')}

==================================================
ACHIEVEMENTS
==================================================
${ACHIEVEMENTS.map(a => `• ${a}`).join('\n')}

==================================================
LANGUAGES
==================================================
${LANGUAGES.join(' — ')}
    `.trim();

    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${DEVELOPER_INFO.name.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="relative w-full max-w-4xl glass-panel p-6 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-8"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className={`w-5 h-5 ${accentTheme.textAccentClass}`} />
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                Curriculum Vitae / Resume
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadText}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-950 flex items-center gap-1.5 transition-all cursor-pointer bg-gradient-to-r ${accentTheme.accentClass}`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .TXT</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full glass-card text-slate-400 hover:text-white"
                aria-label="Close resume modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Body */}
          <div className="space-y-8 text-slate-200">
            {/* Header / Contact Banner */}
            <div className="space-y-2 border-b border-slate-800 pb-6">
              <h2 className="text-3xl font-extrabold text-white">{DEVELOPER_INFO.name}</h2>
              <p className={`text-sm font-mono ${accentTheme.textAccentClass}`}>{DEVELOPER_INFO.title}</p>

              <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {DEVELOPER_INFO.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {DEVELOPER_INFO.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  {DEVELOPER_INFO.formattedPhone || DEVELOPER_INFO.phone}
                </span>
                <a
                  href={DEVELOPER_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  github.com/vasu-royal-2006
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Professional Summary
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                {DEVELOPER_INFO.bio}
              </p>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
                Education
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs font-bold text-white">{edu.institution}</div>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">{edu.period}</span>
                    </div>
                    <div className={`text-xs font-mono ${accentTheme.textAccentClass}`}>{edu.degree}</div>
                    <p className="text-[11px] text-slate-400">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
                Work Experience & Internships
              </h3>

              <div className="space-y-4">
                {EXPERIENCES.map((exp) => (
                  <div key={exp.id} className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                        <div className="text-xs text-slate-400 font-mono">{exp.company} • {exp.location}</div>
                      </div>
                      <span className="text-xs font-mono text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-800">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">{exp.description}</p>

                    <ul className="space-y-1.5">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${accentTheme.textAccentClass}`} />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Certifications */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
                  Certifications
                </h3>
                <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800 space-y-2">
                  {CERTIFICATIONS.map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                      <span className={`w-1.5 h-1.5 rounded-full ${accentTheme.badgeClass}`} />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
                  Hackathons & Achievements
                </h3>
                <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800 space-y-2">
                  {ACHIEVEMENTS.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${accentTheme.badgeClass}`} />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <LanguagesIcon className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
                Languages Spoken
              </h3>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

