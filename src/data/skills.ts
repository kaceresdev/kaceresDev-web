import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: { es: "Frontend", en: "Frontend" },
    skills: ["Angular", "Node.js", "TypeScript", "JavaScript", "Next.js", "Flutter", "Tailwind CSS", "Three.js", "HTML / CSS"],
  },
  {
    id: "backend",
    title: { es: "Backend", en: "Backend" },
    skills: ["Node.js", "Java", "Python", "MongoDB", "DBeaver", "REST", "WebSocket", "OAuth", "JWT"],
  },
  {
    id: "ai",
    title: { es: "IA y agentes", en: "AI & agents" },
    skills: ["Integraciones con IA", "Agentes", "LLMs", "OpenAI", "Cursor", "Prompt engineering", "SDD"],
  },
  {
    id: "cloud",
    title: { es: "Cloud y DevOps", en: "Cloud & DevOps" },
    skills: ["AWS", "Azure", "GitHub Actions", "Firebase", "Supabase"],
  },
  {
    id: "tools",
    title: { es: "Herramientas", en: "Tools" },
    skills: ["Git", "Figma", "Jest", "Playwright", "Storybook", "Linux", "VS Code", "Cursor", "Xcode"],
  },
];
