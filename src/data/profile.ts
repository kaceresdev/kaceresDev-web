import type { Profile, Stat } from "./types";

/** First year of professional experience. */
export const CAREER_START_YEAR = 2021;

export function getStats(year: number): Stat[] {
  const years = Math.max(1, year - CAREER_START_YEAR);
  return [
    { key: "years", value: `${years}+` },
    { key: "projects", value: "5+" },
    { key: "technologies", value: "20+" },
    { key: "coffee", value: "∞" },
  ];
}

export const profile: Profile = {
  name: "KaceresDev",
  shortName: "KaceresDev",
  role: {
    es: "Ingeniero de Software",
    en: "Software Engineer",
  },
  tagline: {
    es: "Diseño y desarrollo productos digitales rápidos, escalables y cuidados al detalle, del backend a la interfaz, con integraciones de IA cuando aportan valor real.",
    en: "I design and build fast, scalable and carefully crafted digital products, from backend to UI, with AI integrations when they add real value.",
  },
  bio: {
    es: [
      "Soy ingeniero de software especializado en desarrollo web full-stack. Me apasiona convertir ideas complejas en productos sencillos, accesibles y agradables de usar.",
      "He trabajado con startups, empresas consolidadas y clientes individuales construyendo plataformas SaaS, APIs de alto rendimiento e interfaces con atención obsesiva al detalle. Integro IA y agentes en productos reales: automatizaciones, asistentes y flujos inteligentes conectados al resto del stack. Me muevo cómodo entre arquitectura, código y diseño.",
      "Fuera del teclado me encontrarás aprendiendo nuevas tecnologías, contribuyendo a proyectos open source o explorando nuevas rutas con mi moto.",
    ],
    en: [
      "I'm a software engineer focused on full-stack web development. I love turning complex ideas into simple, accessible and delightful products.",
      "I've worked with startups, established companies and individual clients building SaaS platforms, high-performance APIs and interfaces with an obsessive attention to detail. I integrate AI and agents into real products: automations, assistants and smart workflows wired into the rest of the stack. I'm comfortable moving between architecture, code and design.",
      "Away from the keyboard you'll find me learning new technologies, contributing to open source or exploring new roads on my motorcycle.",
    ],
  },
  location: {
    es: "España · Remoto",
    en: "Spain · Remote",
  },
  email: "kaceresdev@gmail.com",
  available: true,
  cvUrl: {
    es: "/cv/javier-caceres-cv.pdf",
    en: "/cv/javier-caceres-cv.pdf",
  },
  siteUrl: "https://kaceres.dev",
  socials: [
    { platform: "github", label: "GitHub", href: "https://github.com/kaceresdev" },
    { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/javier-caceres-bordallo" },
    { platform: "x", label: "X", href: "https://x.com/kaceresdev" },
  ],
};
