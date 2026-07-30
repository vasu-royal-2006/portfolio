import { Project, Skill, Experience, SocialLink, AccentThemeConfig } from '../types';

// Importing generated avatar and project assets
import avatarImg from '../assets/images/WhatsApp Image 2026-07-15 at 6.07.33 PM.jpeg';
import projectAiImg from '../assets/images/project_ai_dev_1785340250885.jpg';
import projectAnalyticsImg from '../assets/images/project_analytics_1785340267203.jpg';
import projectEcommerceImg from '../assets/images/project_ecommerce_1785340285505.jpg';

export const DEVELOPER_INFO = {
  name: "Nallamsetty Vasu",
  title: "Computer Science Engineer & Customer Support / AI Developer",
  location: "Amaravati, Andhra Pradesh, India (IST)",
  status: "Available for Customer Support, Engineering & AI Roles",
  bio: "Motivated and customer-focused Computer Science undergraduate at VIT-AP University with strong communication, problem-solving, and troubleshooting abilities. Experienced in handling user queries through academic projects and AI-based applications. Skilled in multitasking, teamwork, email communication, and delivering user-centric solutions.",
  shortBio: "Computer Science undergraduate at VIT-AP University specializing in AI-driven tools, customer query resolution, and cloud systems.",
  avatar: avatarImg,
  email: "nvasu2006@gmail.com",
  phone: "9003501931",
  formattedPhone: "+91 90035 01931",
  github: "https://github.com/vasu-royal-2006",
  linkedin: "https://www.linkedin.com/in/n-vasu-488957322",
  twitter: "https://x.com",
  resumeUrl: "#resume",
  typewriterRoles: [
    "Computer Science Engineer",
    "Customer Support Specialist",
    "IBM Watsonx & AI Developer",
    "AWS Cloud Practitioner",
    "VIT-AP University Scholar"
  ],
  stats: [
    { label: "B.Tech CSE Status", value: "2023 - Present" },
    { label: "Intermediate Score", value: "948/1000" },
    { label: "Key Projects", value: "3 Major" },
    { label: "Certifications", value: "3 Cloud/AI" },
  ]
};

export const ACCENT_THEMES: Record<string, AccentThemeConfig> = {
  blue: {
    id: 'blue',
    name: 'Artistic Blue',
    accentClass: 'from-blue-600 to-indigo-600',
    bgGlowClass: 'bg-blue-600/10',
    borderHoverClass: 'hover:border-blue-500/50 hover:shadow-blue-500/10',
    textAccentClass: 'text-blue-500',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    hex: '#2563eb',
  },
  cyan: {
    id: 'cyan',
    name: 'Electric Cyan',
    accentClass: 'from-cyan-500 to-blue-600',
    bgGlowClass: 'bg-cyan-500/10',
    borderHoverClass: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10',
    textAccentClass: 'text-cyan-400',
    badgeClass: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    hex: '#06b6d4',
  },
  emerald: {
    id: 'emerald',
    name: 'Neon Emerald',
    accentClass: 'from-emerald-400 to-teal-600',
    bgGlowClass: 'bg-emerald-500/10',
    borderHoverClass: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10',
    textAccentClass: 'text-emerald-400',
    badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    hex: '#10b981',
  },
  violet: {
    id: 'violet',
    name: 'Ultra Violet',
    accentClass: 'from-violet-500 to-indigo-600',
    bgGlowClass: 'bg-violet-500/10',
    borderHoverClass: 'hover:border-violet-500/50 hover:shadow-violet-500/10',
    textAccentClass: 'text-violet-400',
    badgeClass: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
    hex: '#8b5cf6',
  },
  amber: {
    id: 'amber',
    name: 'Solar Amber',
    accentClass: 'from-amber-400 to-orange-600',
    bgGlowClass: 'bg-amber-500/10',
    borderHoverClass: 'hover:border-amber-500/50 hover:shadow-amber-500/10',
    textAccentClass: 'text-amber-400',
    badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    hex: '#f59e0b',
  },
  rose: {
    id: 'rose',
    name: 'Cyber Rose',
    accentClass: 'from-rose-500 to-pink-600',
    bgGlowClass: 'bg-rose-500/10',
    borderHoverClass: 'hover:border-rose-500/50 hover:shadow-rose-500/10',
    textAccentClass: 'text-rose-400',
    badgeClass: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    hex: '#f43f5e',
  },
};

export const SKILLS: Skill[] = [
  // Customer Service & Soft Skills
  { name: "Customer Support & Satisfaction", category: "Customer Service", icon: "MessageSquare", level: 95, years: "Active", featured: true },
  { name: "Query Resolution & Troubleshooting", category: "Customer Service", icon: "CheckCircle", level: 92, years: "Active", featured: true },
  { name: "Email & Chat Support", category: "Communication", icon: "Mail", level: 95, years: "Active", featured: true },
  { name: "Voice & Non-Voice Communication", category: "Communication", icon: "Radio", level: 90, years: "Active", featured: true },
  { name: "Multitasking & Time Management", category: "Professional Skills", icon: "Workflow", level: 92, years: "Active" },
  { name: "Team Collaboration & Adaptability", category: "Professional Skills", icon: "Boxes", level: 94, years: "Active" },
  
  // Technical & Cloud
  { name: "IBM Watsonx AI", category: "Technical & Tools", icon: "Sparkles", level: 90, years: "2025", featured: true },
  { name: "AWS Cloud (Foundations & Architecting)", category: "DevOps & Cloud", icon: "Cloud", level: 88, years: "Active", featured: true },
  { name: "Git & GitHub Workflows", category: "Tools & Architecture", icon: "GitCommit", level: 90, years: "Active", featured: true },
  { name: "VS Code & Technical Tools", category: "Tools & Architecture", icon: "FileCode", level: 95, years: "Active" },
  { name: "MS Office & Internet Applications", category: "Technical & Tools", icon: "Globe", level: 95, years: "Active" },
  { name: "Basic Troubleshooting & Support", category: "Customer Service", icon: "Terminal", level: 90, years: "Active" },
];

export const PROJECTS: Project[] = [
  {
    id: "smart-campus-bot",
    title: "Smart Campus Bot (IBM Watsonx)",
    shortDescription: "An AI-powered chatbot capable of resolving student queries and delivering instant, accurate campus information.",
    fullDescription: "Developed an intelligent chatbot utilizing IBM Watsonx for handling campus-wide student inquiries. Engineered precise prompts and conversational workflows to deliver accurate responses, streamline query resolution, and improve overall user experience.",
    category: "AI & Cloud",
    image: projectAiImg,
    techStack: ["IBM Watsonx", "Prompt Engineering", "AI Workflows", "Node.js", "React"],
    demoUrl: "https://github.com/vasu-royal-2006",
    githubUrl: "https://github.com/vasu-royal-2006",
    featured: true,
    stars: 12,
    forks: 4,
    highlights: [
      "Built with IBM Watsonx conversational query handling engine",
      "Streamlined query resolution for student and academic inquiries",
      "Optimized prompt engineering for reliable information retrieval",
      "Improved campus user experience through fast automated responses"
    ],
    architecture: [
      "IBM Watsonx Assistant flow pipeline",
      "Custom query intent classification module",
      "Web interface with real-time response rendering"
    ]
  },
  {
    id: "smart-mail-sorter",
    title: "SmartMailSorter – AI Postal Automation",
    shortDescription: "Automated AI postal sorting workflow designed for efficient parcel processing and information classification.",
    fullDescription: "Designed an automated classification and parcel information processing solution created for the India Post Hackathon. Applied problem-solving techniques and machine learning classification rules to process parcel metadata quickly and improve postal logistics.",
    category: "Full Stack",
    image: projectAnalyticsImg,
    techStack: ["AI Workflows", "Python", "Parcel Classification", "Information Processing"],
    demoUrl: "https://github.com/vasu-royal-2006",
    githubUrl: "https://github.com/vasu-royal-2006",
    featured: true,
    stars: 18,
    forks: 6,
    highlights: [
      "Developed for India Post Hackathon automation challenge",
      "Automated sorting workflows for high-volume parcel information",
      "Applied structured classification to eliminate manual entry errors",
      "Enhanced logistics efficiency with smart data validation"
    ],
    architecture: [
      "Automated information parser pipeline",
      "Data classification and rule-matching engine"
    ]
  },
  {
    id: "student-management-system",
    title: "Student Management System",
    shortDescription: "Database-driven application for efficient management, storage, and retrieval of student academic records.",
    fullDescription: "Built a robust database-driven management application focused on accurate record retrieval, student profile organization, and user-friendly interface design. Designed with strong attention to data integrity and usability.",
    category: "Full Stack",
    image: projectEcommerceImg,
    techStack: ["Database Management", "SQL", "React", "Node.js", "CRUD Architecture"],
    demoUrl: "https://github.com/vasu-royal-2006",
    githubUrl: "https://github.com/vasu-royal-2006",
    featured: true,
    stars: 15,
    forks: 5,
    highlights: [
      "Relational database design for instant record retrieval",
      "Clean administrative dashboard for managing student profiles",
      "Ensures high data accuracy and structured record keeping"
    ],
    architecture: [
      "Relational Database model",
      "RESTful API backend for CRUD operations"
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Software Intern",
    company: "IBM GEN-AI Internship",
    location: "Remote / India",
    period: "Summer 2025",
    type: "Internship",
    description: "Worked with AI-powered tools to understand user requirements and deliver accurate solutions.",
    achievements: [
      "Worked with AI-powered tools to understand user requirements and provide relevant solutions.",
      "Collaborated with teams to improve response quality and user experience.",
      "Developed analytical and troubleshooting skills while working on AI applications.",
      "Gained experience in handling queries and maintaining process accuracy.",
      "Participated in testing and validating AI-generated responses for quality assurance.",
      "Assisted in documenting workflows and communicating project updates with team members."
    ],
    tech: ["IBM Watsonx", "AI Tools", "Generative AI", "Troubleshooting", "Quality Assurance"]
  }
];

export const EDUCATION = [
  {
    institution: "VIT-AP University, Amaravati",
    degree: "B.Tech in Computer Science Engineering",
    period: "2023 – Present",
    details: "Focusing on Artificial Intelligence, Database Management, Cloud Computing, and Software Engineering."
  },
  {
    institution: "Sasi Junior College, Tanuku",
    degree: "Intermediate Education",
    period: "2021 – 2023",
    details: "Achieved high academic standing with a Score of 948/1000."
  }
];

export const CERTIFICATIONS = [
  "IBM GEN-AI Certificate",
  "AWS Cloud Foundations",
  "AWS Cloud Architecting"
];

export const ACHIEVEMENTS = [
  "Participated in Walmart Sparkathon 2025 under the Supply Chain theme.",
  "Participated in India Post Hackathon with an AI-based automation solution.",
  "Demonstrated teamwork, communication, and analytical skills through national hackathons and project presentations."
];

export const LANGUAGES = [
  "English",
  "Telugu",
  "Hindi"
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "GitHub", label: "vasu-royal-2006", url: "https://github.com/vasu-royal-2006", icon: "Github" },
  { platform: "LinkedIn", label: "n-vasu-488957322", url: "https://www.linkedin.com/in/n-vasu-488957322", icon: "Linkedin" },
  { platform: "Email", label: "nvasu2006@gmail.com", url: "mailto:nvasu2006@gmail.com", icon: "Mail" },
  { platform: "Phone", label: "+91 9003501931", url: "tel:9003501931", icon: "Phone" },
];

