# FisioMovimiento - Sitio Web Profesional

Sitio web profesional para **Lic. Analaura Reyes Priego**, fisioterapeuta con doble titulación (México y España). Plataforma moderna y responsive para presentar servicios, credenciales, precios y facilitar el contacto con pacientes.

**🌐 URL de Producción**: [https://fisio-movimiento.com](https://fisio-movimiento.com)

---

## 🚀 Inicio Rápido

### Requisitos Previos

- **Node.js** 20.x o superior
- **npm** 9.x o superior

Recomendamos usar [nvm](https://github.com/nvm-sh/nvm) para gestionar versiones de Node.js.

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/iscpatricio92/fisio-movimiento.git
cd fisio-movimiento

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

El servidor se iniciará en `http://localhost:8080` con hot-reload activado.

### Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo (puerto 8080)
npm run build        # Build de producción
npm run build:dev    # Build en modo desarrollo
npm run lint         # Ejecuta ESLint para verificar código
npm run preview      # Preview del build de producción localmente
```

---

## 🛠️ Stack Tecnológico

### Frontend Core

- **React 18.3.1** - Biblioteca de UI moderna
- **TypeScript 5.8.3** - Tipado estático para mayor robustez
- **Vite 5.4.19** - Build tool ultrarrápido y dev server
- **React Router DOM 6.30.1** - Navegación SPA con soporte para futuro v7

### UI Components

- **shadcn/ui** - Sistema de componentes basado en Radix UI
- **Radix UI** - Componentes primitivos accesibles y personalizables
- **Lucide React** - Librería de iconos moderna
- **Tailwind CSS 3.4.17** - Framework CSS utility-first
- **tailwindcss-animate** - Animaciones optimizadas
- **@tailwindcss/typography** - Estilos tipográficos mejorados

### Estado y Datos

- **TanStack Query 5.83.0** - Gestión de estado del servidor y caché
- **React Hook Form 7.61.1** - Manejo eficiente de formularios
- **Zod 3.25.76** - Validación de esquemas TypeScript-first

### Optimización y Performance

- **vite-imagetools** - Optimización automática de imágenes (WebP, srcset)
- **vite-plugin-pwa** - Service Worker y PWA capabilities
- **workbox-window** - Gestión avanzada de Service Worker

### Fuentes

- **Playfair Display** (serif) - Títulos y encabezados
- **Work Sans** (sans-serif) - Texto del cuerpo

---

## 📁 Estructura del Proyecto

```
fisiolaura-reyes-clone-enhance/
├── public/                 # Archivos estáticos
│   ├── favicon/           # Favicons optimizados
│   ├── manifest.json      # PWA manifest
│   ├── robots.txt         # Configuración SEO
│   └── sitemap.xml        # Sitemap XML
├── src/
│   ├── assets/            # Imágenes y recursos
│   │   └── clinics/       # Fotos de consultorios
│   ├── components/        # Componentes React
│   │   ├── ui/           # Componentes shadcn/ui base
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── ClinicGallery.tsx
│   │   ├── PWAUpdatePrompt.tsx
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   │   ├── use-pwa-update.tsx
│   │   └── ...
│   ├── lib/              # Utilidades y configuraciones
│   │   ├── analytics.ts  # Google Analytics 4
│   │   ├── doctoralia-addresses.ts
│   │   └── utils.ts
│   ├── pages/            # Páginas de la aplicación
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx           # Componente raíz
│   ├── main.tsx          # Entry point
│   └── index.css         # Estilos globales
├── docs/                  # Documentación del proyecto
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions para deploy
├── vite.config.ts         # Configuración de Vite
├── tailwind.config.ts     # Configuración de Tailwind
├── tsconfig.json          # Configuración de TypeScript
└── package.json           # Dependencias y scripts
```

---

## 🎨 Características Principales

### Performance

- ✅ **PageSpeed Insights**: 99 (Desktop) / 90 (Mobile)
- ✅ **Imágenes optimizadas**: WebP con fallback, srcset responsive
- ✅ **Code splitting**: Lazy loading de componentes
- ✅ **Service Worker**: Caché agresivo para assets estáticos
- ✅ **PWA**: Actualizaciones automáticas con notificaciones

### SEO

- ✅ **Meta tags optimizados**: Títulos, descripciones, Open Graph
- ✅ **Schema.org JSON-LD**: LocalBusiness y ProfessionalService
- ✅ **Sitemap XML**: Actualizado y referenciado en robots.txt
- ✅ **Estructura semántica**: HTML5 semántico

### Accesibilidad

- ✅ **WCAG 2.1 AA**: Contraste adecuado, tamaños táctiles (44x44px)
- ✅ **Navegación por teclado**: Componentes Radix UI accesibles
- ✅ **Screen readers**: Títulos descriptivos, aria-labels
- ✅ **prefers-reduced-motion**: Soporte para usuarios sensibles a animaciones

### Integraciones

- ✅ **Google Analytics 4**: Tracking de eventos y conversiones
- ✅ **Doctoralia**: Widget de calendario y testimonios
- ✅ **WhatsApp**: Botón flotante con tracking
- ✅ **Redes Sociales**: Instagram, Facebook, YouTube

---

## 🚀 Despliegue

El proyecto está configurado para desplegarse automáticamente en **GitHub Pages** mediante GitHub Actions cuando se hace push a la rama `main`.

### Configuración de GitHub Pages

1. Ve a **Settings** > **Pages** en tu repositorio
2. En **Source**, selecciona **GitHub Actions**
3. El workflow `.github/workflows/deploy.yml` se ejecutará automáticamente

### Dominio Personalizado

El proyecto está configurado para usar `fisio-movimiento.com`:

- Archivo `CNAME` en `public/`
- `vite.config.ts` configurado con `base: '/'`
- `BrowserRouter` usa `import.meta.env.BASE_URL`

Ver documentación completa en [`docs/DEPLOY_GITHUB_PAGES.md`](docs/DEPLOY_GITHUB_PAGES.md)

---

## 📚 Documentación

La documentación detallada está disponible en el directorio `docs/`:

- **[CONTEXTO_PROYECTO.md](docs/CONTEXTO_PROYECTO.md)** - Información general del proyecto
- **[DEPLOY_GITHUB_PAGES.md](docs/DEPLOY_GITHUB_PAGES.md)** - Guía de despliegue
- **[PLAN_OPTIMIZACION_PAGESPEED.md](docs/PLAN_OPTIMIZACION_PAGESPEED.md)** - Optimizaciones de performance
- **[ANALISIS_MARKETING_DIGITAL.md](docs/ANALISIS_MARKETING_DIGITAL.md)** - Análisis SEO, UX/UI, CRO
- **[DOCTORALIA_ADDRESSES.md](docs/DOCTORALIA_ADDRESSES.md)** - Configuración de direcciones Doctoralia
- **[ESTRATEGIA_CACHE.md](docs/ESTRATEGIA_CACHE.md)** - Estrategia de caché con Service Worker
- **[GESTION_ACTUALIZACIONES_CACHE.md](docs/GESTION_ACTUALIZACIONES_CACHE.md)** - Sistema de actualizaciones PWA
- **[CONFIGURAR_ANALYTICS.md](docs/CONFIGURAR_ANALYTICS.md)** - Configuración de Google Analytics 4
- **[OG_IMAGE_GUIDE.md](docs/OG_IMAGE_GUIDE.md)** - Guía para crear Open Graph images

---

## 🔧 Configuración de Desarrollo

### Variables de Entorno

Copia `.env.example` a `.env` y configura las siguientes variables:

```bash
cp .env.example .env
```

**Variables disponibles:**

- `VITE_SENTRY_DSN` (Opcional) - DSN de Sentry para error tracking en producción
  - **Para producción (GitHub Pages)**: Agrega como secret en GitHub (Settings > Secrets > Actions)
  - **Para desarrollo local**: Agrega en archivo `.env`
  - Obtén tu DSN en [Sentry.io](https://sentry.io/settings/{org}/projects/{project}/keys/)
  - Si no se configura, el error tracking estará deshabilitado (el sitio funciona normalmente)

**Nota sobre GitHub Pages**: Como GitHub Pages es hosting estático, las variables de entorno se inyectan durante el **build** (no en runtime). El workflow de GitHub Actions ya está configurado para usar `VITE_SENTRY_DSN` como secret. Ver [`docs/GITHUB_PAGES_VARIABLES_ENTORNO.md`](docs/GITHUB_PAGES_VARIABLES_ENTORNO.md) para más detalles.

**Otras configuraciones** (no requieren variables de entorno):

- `index.html` - Google Analytics Measurement ID (`G-3L9C8QMNZV`)
- `vite.config.ts` - Configuración de build y PWA

### Path Aliases

El proyecto usa path aliases para imports más limpios:

```typescript
import { Button } from '@/components/ui/button';
import { usePWAUpdate } from '@/hooks/use-pwa-update';
```

Configurado en `tsconfig.json` y `vite.config.ts`.

---

## 📱 Información de Contacto

- **Nombre**: Lic. Analaura Reyes Priego
- **Profesión**: Fisioterapeuta
- **Cédula Profesional**: No. 10909109
- **Teléfono**: +52 55 6505 3202
- **WhatsApp**: +52 55 6505 3202
- **Doctoralia**: [Perfil](https://www.doctoralia.com.mx/analaura-reyes-priego/fisioterapeuta/metepec)

### Ubicaciones

1. **Iztapalapa, CDMX**
   - Andres Tutino 25c, 09360 Iztapalapa, CDMX

2. **Metepec, Estado de México**
   - Priv. 5 de Mayo 5, San Jerónimo Chicahualco, 52179 Metepec, Estado de México

---

## 🤝 Contribución

Este es un proyecto privado. Para contribuciones o sugerencias, por favor contacta al equipo de desarrollo.

---

## 📄 Licencia

Este proyecto es privado y confidencial. Todos los derechos reservados.

---

## 🙏 Créditos

- Diseño y desarrollo: Equipo de desarrollo
- Cliente: Lic. Analaura Reyes Priego
- Tecnologías: React, Vite, shadcn/ui, Tailwind CSS

---

**Última actualización**: Enero 2025
