import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { AccentThemeConfig } from '../types';
import {
  MessageSquare,
  Mail,
  Phone,
  Send,
  Check,
  Copy,
  Clock,
  Github,
  Linkedin,
} from 'lucide-react';

interface ContactSectionProps {
  accentTheme: AccentThemeConfig;
  isDarkMode?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  accentTheme,
  isDarkMode = true,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeString, setTimeString] = useState<string>('');

  const subjectPresets = [
    'Project Inquiry',
    'Role Opportunity',
    'Consulting',
    'General Chat',
  ];

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeString(new Date().toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(DEVELOPER_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'Project Inquiry', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="py-32 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${
            isDarkMode ? 'bg-slate-900/50 border-slate-800 text-slate-300' : 'bg-white/80 border-slate-200 text-slate-600 shadow-sm'
          }`}
        >
          <MessageSquare className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Get in touch
          </span>
        </div>
        <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Let's build something{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200" style={{ backgroundImage: `linear-gradient(to right, ${accentTheme.hex}, #94a3b8)` }}>
            extraordinary.
          </span>
        </h2>
        <p className={`text-lg sm:text-xl font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Have a project in mind, a job opportunity, or just want to talk engineering? My inbox is always open.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left Column: Direct Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Email Copy Card */}
          <div className={`p-8 rounded-3xl border transition-all ${isDarkMode ? 'bg-[#111111] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className={`flex items-center gap-3 mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <Mail className={`w-5 h-5 ${accentTheme.textAccentClass}`} />
              <span className="text-sm font-bold uppercase tracking-wider">Direct Email</span>
            </div>

            <div className={`flex items-center justify-between p-4 rounded-2xl border mb-6 ${isDarkMode ? 'bg-black/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-sm sm:text-base font-medium truncate ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                {DEVELOPER_INFO.email}
              </span>
              <button
                onClick={handleCopyEmail}
                className={`p-2.5 rounded-xl transition-all cursor-pointer shrink-0 flex items-center gap-2 text-sm font-medium ${
                  isDarkMode ? 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700' : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm'
                }`}
                title="Copy Email Address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <a
              href={`mailto:${DEVELOPER_INFO.email}?subject=${encodeURIComponent('Hello Nallamsetty Vasu')}`}
              className={`w-full py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] cursor-pointer bg-gradient-to-r ${accentTheme.accentClass} shadow-lg`}
            >
              <Send className="w-4 h-4" />
              <span>Open Native Mail Client</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Timezone Card */}
            <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#111111] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  <Clock className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
                  <span>Local Time</span>
                </div>
              </div>
              <div className={`text-2xl font-bold tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {timeString || '12:00 PM'}
              </div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                India Standard Time (IST)
              </p>
            </div>

            {/* Social Links */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-center gap-4 ${isDarkMode ? 'bg-[#111111] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <a
                href={DEVELOPER_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-2xl border transition-all flex items-center gap-3 text-sm font-semibold ${
                  isDarkMode
                    ? 'bg-black/50 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
              >
                <Github className="w-5 h-5" />
                <span>vasu-royal-2006</span>
              </a>
              <a
                href={DEVELOPER_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-2xl border transition-all flex items-center gap-3 text-sm font-semibold ${
                  isDarkMode
                    ? 'bg-black/50 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
              >
                <Linkedin className="w-5 h-5" />
                <span>n-vasu</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`p-8 sm:p-10 rounded-3xl border relative ${
            isDarkMode ? 'bg-[#111111] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-500/50 ${
                    isDarkMode
                      ? 'bg-black/50 border border-slate-800 text-white placeholder-slate-600'
                      : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-500/50 ${
                    isDarkMode
                      ? 'bg-black/50 border border-slate-800 text-white placeholder-slate-600'
                      : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>

            {/* Subject Preset Buttons */}
            <div className="space-y-3">
              <label className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>What is this regarding?</label>
              <div className="flex flex-wrap gap-2">
                {subjectPresets.map((preset) => {
                  const isSelected = formData.subject === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setFormData({ ...formData, subject: preset })}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? `bg-slate-800 text-white border border-slate-700 shadow-md ${!isDarkMode && 'bg-slate-900'}`
                          : isDarkMode
                          ? 'bg-black/50 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-900'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-white'
                      }`}
                    >
                      {preset}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Message</label>
              <textarea
                required
                rows={6}
                placeholder="Tell me about your project, timeline, or idea..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-4 py-4 rounded-xl text-sm transition-all resize-none focus:outline-none focus:ring-2 focus:ring-slate-500/50 ${
                  isDarkMode
                    ? 'bg-black/50 border border-slate-800 text-white placeholder-slate-600'
                    : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-transform shadow-xl cursor-pointer bg-gradient-to-r ${accentTheme.accentClass} ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

          {/* Success Banner Overlay */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`absolute inset-0 backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6 z-20 border ${
                  isDarkMode ? 'bg-black/80 border-slate-800' : 'bg-white/90 border-slate-200'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-2">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Message Sent</h3>
                <p className={`text-base font-medium max-w-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Thanks for reaching out! I'll get back to you within 24-48 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold cursor-pointer transition-all ${
                    isDarkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                  }`}
                >
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
