import type { AppLocale } from "@/i18n/routing";

export type Localized<T = string> = Record<AppLocale, T>;

export type SocialPlatform = "github" | "linkedin" | "x" | "email";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface Stat {
  key: "years" | "projects" | "technologies" | "coffee";
  value: string;
}

export interface Profile {
  name: string;
  shortName: string;
  role: Localized;
  tagline: Localized;
  bio: Localized<string[]>;
  location: Localized;
  email: string;
  available: boolean;
  cvUrl: Localized;
  siteUrl: string;
  socials: SocialLink[];
}

export interface Experience {
  company: string;
  companyUrl?: string;
  role: Localized;
  location: Localized;
  start: string;
  end?: string;
  summary: Localized;
  achievements: Localized<string[]>;
  stack: string[];
}

export type ProjectCategory = "web" | "mobile" | "backend" | "opensource";

export interface Project {
  slug: string;
  title: string;
  description: Localized;
  image?: string;
  category: ProjectCategory;
  stack: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  year: number;
}

export interface SkillGroup {
  id: string;
  title: Localized;
  skills: string[];
}
