# KaceresDev Web

**Portfolio interactivo de [KaceresDev](https://kaceres.dev)** — ingeniero de software full-stack.

Sitio de una sola página, bilingüe (ES / EN), con hero 3D, motion cuidadoso y contenido centralizado en datos tipados. Pensado para mostrar trayectoria, proyectos y stack sin sacrificar rendimiento ni detalles de UX.

[![Live](https://img.shields.io/badge/live-kaceres.dev-ffae00?style=flat-square)](https://kaceres.dev)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

---

## Visión

Un portfolio que se siente producto: tipografía expresiva, atmósfera dark con gradiente de marca (ámbar → rosa), scroll suave y microinteracciones que refuerzan la jerarquía sin ruido.

> *Diseño y desarrollo de productos digitales rápidos, escalables y cuidados al detalle, del backend a la interfaz, con integraciones de IA cuando aportan valor real.*

---

## Características

| Área | Qué incluye |
| --- | --- |
| **i18n** | Español (default) e inglés con `next-intl` y rutas `/es`, `/en` |
| **Hero 3D** | Logo en partículas con Three.js + React Three Fiber |
| **Motion** | Reveal al scroll, contadores, tilt cards, cursor custom, botones magnéticos |
| **Scroll** | Lenis + barra de progreso de lectura |
| **Contenido** | Perfil, experiencia, proyectos y skills en `src/data/` |
| **SEO** | Metadata por locale, sitemap, robots, Open Graph dinámico |
| **Contacto** | Formulario `mailto` + copiar email |
| **UI** | Design tokens en CSS, componentes reutilizables, responsive |

### Secciones de la página

1. **Hero** — marca, rol, CTAs (proyectos / CV) y escena 3D  
2. **Sobre mí** — bio, ubicación y stats animados  
3. **Experiencia** — timeline profesional  
4. **Proyectos** — grid con filtros, covers y enlaces demo/código  
5. **Stack** — grupos de tecnologías (frontend, backend, IA, cloud, tools)  
6. **Contacto** — disponibilidad, email y formulario  

---

## Stack técnico

```
Next.js 16 (App Router) · React 19 · TypeScript
Tailwind CSS 4 · next-intl · Motion · Lenis
Three.js · @react-three/fiber · Lucide React
```

| Capa | Librerías |
| --- | --- |
| Framework | Next.js 16, React 19, TypeScript |
| Estilos | Tailwind CSS 4 (`@tailwindcss/turbopack`) |
| Internacionalización | `next-intl` |
| Animación / UX | `motion`, `lenis` |
| 3D | `three`, `@react-three/fiber` |
| Iconos | `lucide-react` |
| Calidad | ESLint (`eslint-config-next`), Prettier |

**Tipografía:** Inter (cuerpo), Space Grotesk (display), JetBrains Mono (código) vía `next/font`.

---

## Inicio rápido

### Requisitos

- Node.js 20+ (recomendado)
- npm (incluido con Node)

### Instalación

```bash
git clone https://github.com/kaceresdev/kaceresDev-web.git
cd kaceresDev-web
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El locale por defecto es **español** (`/es`); el inglés vive en `/en`.

### Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo (Turbopack) |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier sobre `src/**/*.{ts,tsx,css,json}` |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── [locale]/          # Layout, página, 404, OG image
│   ├── globals.css        # Tokens de diseño y base
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/            # Navbar, Footer, menú móvil, locale switcher
│   ├── sections/          # Hero, About, Experience, Projects, Skills, Contact
│   ├── motion/            # Reveal, CountUp, Magnetic, CustomCursor…
│   ├── three/             # LogoParticles, shaders, sampling del logo
│   ├── providers/         # Lenis + Motion
│   ├── ui/                # Button, Card, Badge, Container…
│   └── icons/
├── data/                  # Contenido tipado (perfil, proyectos, skills…)
├── i18n/                  # routing, request, navigation
├── messages/              # Traducciones UI (es.json / en.json)
└── lib/                   # fonts, cn()
public/
├── brand/                 # Assets de marca
├── cv/                    # PDF del CV
├── projects/              # Covers de proyectos
└── logo.webp
```

---

## Personalizar el contenido

Todo el copy “de negocio” vive en datos tipados. Edita y listo: no hace falta tocar las secciones.

| Archivo | Qué controla |
| --- | --- |
| `src/data/profile.ts` | Nombre, rol, tagline, bio, email, redes, CV, disponibilidad |
| `src/data/experience.ts` | Timeline laboral (fechas `YYYY-MM`) |
| `src/data/projects.ts` | Portfolio (slug, stack, demo, imagen, featured) |
| `src/data/skills.ts` | Grupos de tecnologías |
| `src/messages/es.json` / `en.json` | Labels de UI (nav, CTAs, formularios…) |

### Proyectos

1. Añade la imagen en `public/projects/` (p. ej. `mi-proyecto.webp`).
2. Registra la entrada en `src/data/projects.ts` con `image: "/projects/mi-proyecto.webp"`.
3. Sin `image`, la UI genera una cover con gradiente.

### CV

Coloca el PDF en `public/cv/` y actualiza `cvUrl` en `profile.ts`.

### Idiomas

Locales definidos en `src/i18n/routing.ts`:

```ts
locales: ["es", "en"]
defaultLocale: "es"
```

---

## Diseño y motion

Paleta dark (`#07070a`) con acentos de marca:

```
ámbar #ffae00 → naranja #f7813f → coral #f87f9c → rosa #f865e0
```

Tokens en `src/app/globals.css` (`@theme`): superficies, bordes, tipografías y animaciones (`float`, `marquee`, `glow`).

Detalles de UX:

- Cursor personalizado en puntero fino
- Cards con tilt 3D
- Elementos magnéticos en CTAs
- Scroll progress en la parte superior
- Preferencia por `prefers-reduced-motion` respetada donde aplica

---

## SEO y despliegue

- Metadata y Open Graph por locale (`opengraph-image.tsx`)
- `sitemap.ts` y `robots.ts` en App Router
- URL pública: [https://kaceres.dev](https://kaceres.dev)

Ideal en **Vercel** (o cualquier host Node compatible con Next.js):

```bash
npm run build
npm run start
```

---

## Contacto

| | |
| --- | --- |
| Web | [kaceres.dev](https://kaceres.dev) |
| Email | [kaceresdev@gmail.com](mailto:kaceresdev@gmail.com) |
| GitHub | [@kaceresdev](https://github.com/kaceresdev) |
| LinkedIn | [Javier Cáceres Bordallo](https://www.linkedin.com/in/javier-caceres-bordallo) |
| X | [@kaceresdev](https://x.com/kaceresdev) |

---

## Licencia

Proyecto privado (`"private": true`). El código y los assets de marca pertenecen a KaceresDev; no reutilizar sin permiso.

---

<div align="center">

**Diseñado y desarrollado por [KaceresDev](https://kaceres.dev)**

</div>
