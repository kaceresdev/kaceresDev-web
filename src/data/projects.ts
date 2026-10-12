import type { Project } from "./types";

// Place project images in /public/projects and reference them as "/projects/<file>".
// Projects without `image` render a generated gradient cover.
export const projects: Project[] = [
  {
    slug: "retratos-tronki",
    title: "Retratos Tronki",
    image: "/projects/retratos-tronki.webp",
    description: {
      es: "Sitio web de fotografía deportiva para Jose Aguirre: hero con carrusel a pantalla completa, portfolio, reportajes de calle y eventos. Diseño y desarrollo centrados en que las fotos manden.",
      en: "Sports photography website for Jose Aguirre: full-screen hero carousel, portfolio, street photography and events. Design and development built so the photos take the lead.",
    },
    category: "web",
    stack: ["Angular", "TypeScript", "SCSS", "Google Drive API"],
    demoUrl: "https://retratostronki.es/",
    featured: true,
    year: 2025,
  },
  {
    slug: "sierah",
    title: "Sierah",
    image: "/projects/sierah.webp",
    description: {
      es: "Web de marca personal de inversor: resultados en tiempo real, metodología, estrategia DCA pública, newsletter y acceso a una comunidad privada a través de pago vía Stripe. Enfocada en claridad y confianza.",
      en: "Personal brand site for an investor: live results, methodology, public DCA strategy, newsletter and access to a private community through Stripe payment. Built for clarity and trust.",
    },
    category: "web",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase Database", "Stripe", "Supabase", "Telegram API"],
    demoUrl: "https://sierahm.com",
    year: 2025,
  },
  {
    slug: "sierah-dashboard",
    title: "Sierah Dashboard",
    image: "/projects/sierah-dashboard.webp",
    description: {
      es: "Panel privado de la comunidad Sierah: acceso seguro con login, gestión de contraseña y una interfaz limpia alineada con la marca.",
      en: "Private Sierah community dashboard: secure login, password recovery and a clean interface aligned with the brand.",
    },
    category: "web",
    stack: ["Angular", "TypeScript", "Firebase Auth", "Firebase Database", "Telegram API", "Supabase"],
    demoUrl: "https://dashboard.sierahm.com/",
    year: 2026,
  },
];
