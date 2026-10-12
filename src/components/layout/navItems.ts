export const navItems = [
  { id: "about", key: "about" },
  { id: "experience", key: "experience" },
  { id: "projects", key: "projects" },
  { id: "skills", key: "skills" },
  { id: "contact", key: "contact" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];
