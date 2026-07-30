export type SkillCategory = 
  | 'All' 
  | 'Customer Service' 
  | 'Communication' 
  | 'Professional Skills' 
  | 'Technical & Tools' 
  | 'DevOps & Cloud' 
  | 'Tools & Architecture'
  | 'Frontend' 
  | 'Backend' 
  | 'Database';

export type ProjectCategory = 'All' | 'Full Stack' | 'AI & Cloud' | 'Frontend' | 'Open Source';

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: string;
  level: number; // 0 to 100
  years: string;
  featured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  image: string;
  techStack: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  stars?: number;
  forks?: number;
  highlights: string[];
  architecture?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  icon: string;
}

export type AccentColor = 'blue' | 'cyan' | 'emerald' | 'violet' | 'amber' | 'rose';

export interface AccentThemeConfig {
  id: AccentColor;
  name: string;
  accentClass: string;
  bgGlowClass: string;
  borderHoverClass: string;
  textAccentClass: string;
  badgeClass: string;
  hex: string;
}
