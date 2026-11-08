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
  {
    slug: "sierah-entry-manager-bot",
    title: "Sierah Entry Manager Bot",
    description: {
      es: "Bot de Telegram para el control de acceso a la comunidad privada de Sierah: gestiona el flujo de entrada a la comunidad privada de forma automatizada.",
      en: "Telegram bot for access control to Sierah's private community: handles onboarding, permissions and entry to the private web in an automated flow.",
    },
    category: "backend",
    stack: ["Node.js", "JavaScript", "Telegram Bot API", "Firebase", "Supabase"],
    demoUrl: "https://t.me/sierahentrymanager_bot",
    demoLabel: { es: "Ver Bot", en: "View Bot" },
    year: 2026,
  },
  {
    slug: "simular-prestamo",
    title: "SimularPréstamo.NET",
    image: "/projects/simular-prestamo.webp",
    description: {
      es: "Simulador de préstamos (personal, coche, hipoteca y reforma): cuota, tabla de amortización, comisiones, seguros y comparación con TAE del banco. Permite guardar y recuperar simulaciones con un código compartible.",
      en: "Loan simulator (personal, car, mortgage and renovation): payment, amortization schedule, fees, insurance and bank APR comparison. Lets you save and reopen simulations with a shareable code.",
    },
    category: "web",
    stack: ["Next.js", "TypeScript", "Supabase", "IA", "Firebase Firestore", "Firebase Hosting"],
    demoUrl: "https://simularprestamo.net/",
    year: 2026,
  },
];
