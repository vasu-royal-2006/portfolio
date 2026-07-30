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
    'AI / Watsonx Consultation',
    'Customer Support Role',
    'Job Opportunity',
    'General Coffee Chat',
  ];

  // Update IST Time
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
    <section id="contact" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border ${
            isDarkMode ? 'border-slate-800' : 'border-slate-300'
          }`}
        >
          <MessageSquare className={`w-3.5 h-3.5 ${accentTheme.textAccentClass}`} />
          <span className={`text-xs font-mono font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            GET IN TOUCH
          </span>
        </div>
        <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Let's build something{' '}
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${accentTheme.accentClass}`}>
            extraordinary together
          </span>
        </h2>
        <p className={`text-base ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Have a project in mind, a job opportunity, or just want to talk software engineering? My inbox is always open.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Info, Copy Email, Phone, Socials & Live Timezone */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Email Copy Card */}
          <div className={`glass-panel p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-300'}`}>
            <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <Mail className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
              <span>Direct Email</span>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-2xl border gap-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-300'}`}>
              <span className={`text-xs sm:text-sm font-mono truncate ${isDarkMode ? 'text-slate-200' : 'text-slate-800 font-semibold'}`}>
                {DEVELOPER_INFO.email}
              </span>
              <button
                onClick={handleCopyEmail}
                className={`p-2 rounded-xl glass-card transition-all cursor-pointer shrink-0 flex items-center gap-1.5 text-xs ${
                  isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900 border-slate-300'
                }`}
                title="Copy Email Address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-[11px] text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span className="text-[11px]">Copy</span>
                  </>
                )}
              </button>
            </div>

            <a
              href={`mailto:${DEVELOPER_INFO.email}?subject=${encodeURIComponent('Hello Nallamsetty Vasu')}`}
              className={`w-full py-3 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer bg-gradient-to-r ${accentTheme.accentClass}`}
            >
              <Send className="w-4 h-4" />
              <span>Open Native Mail Client</span>
            </a>
          </div>

          {/* Phone / Call / WhatsApp Contact Card */}
          <div className={`glass-panel p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-300'}`}>
            <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <Phone className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
              <span>Mobile Phone</span>
            </div>

            <div className={`flex items-center justify-between p-3 rounded-2xl border gap-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-300'}`}>
              <span className={`text-xs sm:text-sm font-mono font-bold tracking-wider truncate ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                {DEVELOPER_INFO.formattedPhone || '+91 90035 01931'}
              </span>
              <button
                onClick={handleCopyPhone}
                className={`p-2 rounded-xl glass-card transition-all cursor-pointer shrink-0 flex items-center gap-1.5 text-xs ${
                  isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900 border-slate-300'
                }`}
                title="Copy Phone Number"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-[11px] text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span className="text-[11px]">Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${DEVELOPER_INFO.phone}`}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-200 hover:text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                <span>Call Directly</span>
              </a>
              <a
                href={`https://wa.me/91${DEVELOPER_INFO.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-200 hover:text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Timezone & Location Card (Indian Standard Time) */}
          <div className={`glass-panel p-6 rounded-3xl border space-y-3 ${isDarkMode ? 'border-slate-800' : 'border-slate-300'}`}>
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 text-xs font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <Clock className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
                <span>India (IST)</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                Online
              </span>
            </div>

            <div className={`text-2xl font-mono font-bold tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {timeString || '12:00:00 PM'}
            </div>
            <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Usually responds within a few hours during Indian Standard Time (IST) business hours.
            </p>
          </div>

          {/* Social Links Cards */}
          <div className={`glass-panel p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-300'}`}>
            <div className={`text-xs font-mono uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Social Profiles & Channels
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={DEVELOPER_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-2xl border transition-all flex items-center gap-2 text-xs ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
                }`}
              >
                <Github className="w-4 h-4" />
                <span className="truncate">GitHub: vasu-royal-2006</span>
              </a>
              <a
                href={DEVELOPER_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-2xl border transition-all flex items-center gap-2 text-xs ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
                }`}
              >
                <Linkedin className="w-4 h-4" />
                <span className="truncate">LinkedIn: n-vasu</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border relative ${
            isDarkMode ? 'border-slate-800' : 'border-slate-300'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs transition-all focus:outline-none ${
                    isDarkMode
                      ? 'bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-slate-700'
                      : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500 shadow-sm'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Your Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs transition-all focus:outline-none ${
                    isDarkMode
                      ? 'bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-slate-700'
                      : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500 shadow-sm'
                  }`}
                />
              </div>
            </div>

            {/* Subject Preset Buttons */}
            <div className="space-y-2">
              <label className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Inquiry Topic</label>
              <div className="flex flex-wrap gap-2">
                {subjectPresets.map((preset) => {
                  const isSelected = formData.subject === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setFormData({ ...formData, subject: preset })}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? `${accentTheme.bgGlowClass} ${accentTheme.textAccentClass} border border-slate-700`
                          : isDarkMode
                          ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-300 hover:text-slate-900'
                      }`}
                    >
                      {preset}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Your Message *</label>
              <textarea
                required
                rows={5}
                placeholder="Tell me about your project, timeline, budget, or ideas..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl text-xs transition-all resize-none focus:outline-none ${
                  isDarkMode
                    ? 'bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:border-slate-700'
                    : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500 shadow-sm'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 rounded-xl font-semibold text-xs text-white flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer bg-gradient-to-r ${accentTheme.accentClass} ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.01]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending Message...</span>
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`absolute inset-0 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 z-20 border ${
                  isDarkMode ? 'bg-slate-950/95 border-slate-800' : 'bg-white/95 border-slate-300'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Message Sent Successfully!</h3>
                <p className={`text-xs max-w-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Thank you for reaching out. Nallamsetty Vasu will get back to you shortly at your provided email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                    isDarkMode ? 'bg-slate-800 text-slate-200 hover:text-white' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                  }`}
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
