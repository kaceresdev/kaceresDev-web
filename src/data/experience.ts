import type { Experience } from "./types";

// Dates in YYYY-MM format. Omit `end` for the current position.
export const experience: Experience[] = [
  {
    company: "TechNova",
    companyUrl: "https://example.com",
    role: { es: "Senior Software Engineer", en: "Senior Software Engineer" },
    location: { es: "Madrid · Híbrido", en: "Madrid · Hybrid" },
    start: "2023-03",
    summary: {
      es: "Lidero el desarrollo del frontend de una plataforma SaaS B2B usada por más de 50.000 usuarios.",
      en: "Leading frontend development of a B2B SaaS platform used by more than 50,000 users.",
    },
    achievements: {
      es: [
        "Migración de la aplicación a Next.js App Router, reduciendo el LCP un 45%.",
        "Diseño de un design system compartido entre 4 equipos de producto.",
        "Mentorización de 3 desarrolladores junior y definición de buenas prácticas.",
      ],
      en: [
        "Migrated the application to Next.js App Router, cutting LCP by 45%.",
        "Designed a design system shared across 4 product teams.",
        "Mentored 3 junior developers and defined engineering best practices.",
      ],
    },
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "GraphQL", "AWS"],
  },
  {
    company: "Cloudly",
    companyUrl: "https://example.com",
    role: { es: "Full-Stack Developer", en: "Full-Stack Developer" },
    location: { es: "Remoto", en: "Remote" },
    start: "2021-01",
    end: "2023-02",
    summary: {
      es: "Desarrollo de microservicios y paneles de administración para una startup de logística.",
      en: "Built microservices and admin dashboards for a logistics startup.",
    },
    achievements: {
      es: [
        "Diseño de una API en Node.js que procesa más de 1M de eventos diarios.",
        "Implantación de CI/CD con GitHub Actions y despliegues sin downtime.",
        "Desarrollo de un panel en tiempo real con WebSockets.",
      ],
      en: [
        "Designed a Node.js API processing more than 1M events per day.",
        "Set up CI/CD with GitHub Actions and zero-downtime deployments.",
        "Built a real-time dashboard using WebSockets.",
      ],
    },
    stack: ["Node.js", "NestJS", "PostgreSQL", "Docker", "React", "Redis"],
  },
  {
    company: "Studio Pixel",
    role: { es: "Frontend Developer", en: "Frontend Developer" },
    location: { es: "Valencia", en: "Valencia" },
    start: "2019-06",
    end: "2020-12",
    summary: {
      es: "Desarrollo de webs corporativas y e-commerce para clientes de distintos sectores.",
      en: "Built corporate websites and e-commerce stores for clients across industries.",
    },
    achievements: {
      es: [
        "Entrega de más de 15 proyectos web con foco en rendimiento y accesibilidad.",
        "Introducción de React y TypeScript en el flujo de trabajo del estudio.",
      ],
      en: [
        "Delivered more than 15 web projects focused on performance and accessibility.",
        "Introduced React and TypeScript into the studio's workflow.",
      ],
    },
    stack: ["React", "JavaScript", "SASS", "WordPress", "Shopify"],
  },
];
