import type { Experience } from "./types";

// Dates in YYYY-MM format. Omit `end` for the current position.
export const experience: Experience[] = [
  {
    company: "Deloitte",
    companyUrl: "https://www.deloitte.com",
    role: { es: "Consultor", en: "Consultant" },
    location: { es: "Madrid", en: "Madrid" },
    start: "2023-07",
    summary: {
      es: "Gestión de equipos de desarrollo y mentorización de desarrolladores junior para la creación de aplicaciones modernas y migraciones de sistemas legacy.",
      en: "Management of development teams and mentoring of junior developers for the creation of modern applications and legacy system migrations.",
    },
    achievements: {
      es: [
        "Gestión de equipos con metodologías ágiles y SCRUM.",
        "Análisis, diseño y estimación de proyectos con herramientas como Jira y Confluence.",
        "Diseño de procesos de automatización con IA para el desarrollo de aplicaciones y migraciones.",
      ],
      en: [
        "Management of development teams with agile methodologies and SCRUM.",
        "Mentoring of junior developers for the creation of modern applications and legacy system migrations.",
        "Design of automation processes with AI for application and legacy system development.",
      ],
    },
    stack: ["Jira", "Confluence", "Copilot", "GitHub"],
  },
  {
    company: "Deloitte",
    companyUrl: "https://www.deloitte.com",
    role: { es: "Frontend Developer", en: "Frontend Developer" },
    location: { es: "Madrid", en: "Madrid" },
    start: "2021-09",
    end: "2023-06",
    summary: {
      es: "Participación en el desarrollo de webs de clientes, administración y pasarelas de pagos para clientes de sector retail.",
      en: "Participation in the development of client websites, administration and payment gateways for retail sector clients.",
    },
    achievements: {
      es: [
        "Desarrollo de webs de clientes y administración para clientes de sector retail con Angular y Node.js.",
        "Desarrollo de un sistema de pasarela de pagos robusto, escalable y personalizable para empresas de cualquier tamaño y sector.",
      ],
      en: [
        "Development of client websites and administration for retail sector clients with Angular and Node.js.",
        "Development of a robust, scalable and customizable payment gateway for companies of any size and sector.",
      ],
    },
    stack: ["Angular", "Node.js", "MongoDB", "Oracle", "Redis", "Quve", "Kibana", "Jenkins", "Bitbucket", "Jira", "Confluence"],
  },
  {
    company: "Propia",
    role: { es: "Reacondicionador de sisteman electrónicos", en: "Electronic system reconditioner" },
    location: { es: "Collado Villalba", en: "Collado Villalba" },
    start: "2017-10",
    end: "2021-10",
    summary: {
      es: "Reacondicionamiento de sistemas electrónicos para darles una segunda vida y reducir el impacto ambiental.",
      en: "Reconditioning of electronic systems for reuse and reducing environmental impact.",
    },
    achievements: {
      es: [
        "Reacondicionamiento teléfonos móviles con cambios de pantalla, batería u otros elementos electrónicos.",
        "Reparación de pequeños electrodomésticos como televisores, microondas, etc, para su reutilización.",
      ],
      en: [
        "Reconditioning of mobile phones with changes of screen, battery or other electronic elements.",
        "Repair of small appliances such as televisions, microwaves, etc, for reuse.",
      ],
    },
    stack: ["Reparación de teléfonos móviles", "Reparación de pequeños electrodomésticos"],
  },
];
