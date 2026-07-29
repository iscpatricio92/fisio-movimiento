# Changelog

Todos los cambios relevantes de este proyecto se documentan aquí.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y el proyecto usa [Versionado Semántico](https://semver.org/lang/es/).

## [Unreleased]

_Sin cambios aún._

## [1.0.29] - 2026-07-29

### Fixed

- **PWA / Sentry**: se deja de inyectar `registerSW.js` (`injectRegister: false`).
  Con el service worker en modo `selfDestroying`, ese script llamaba a
  `navigator.serviceWorker.register()`, cuya promesa rechazaba y generaba un
  _unhandled rejection_ reportado a Sentry en producción (`Error: Rejected` en
  `/registerSW.js`). Los usuarios nuevos ya no registran ningún SW; los que aún
  tienen el SW viejo se limpian igual vía la actualización normal del navegador.

## [1.0.28] - 2026-07-29

Release de infraestructura: actualización del toolchain de build.

### Changed

- **Migración a Vite 8** (rolldown) manteniendo el SSG: `vite` 7.3.1 → 8.1.5,
  `vite-react-ssg` 0.9.0 → 0.9.2 (soporte Vite 8), `@vitejs/plugin-react-swc`
  3 → 4.3.2, `vite-plugin-pwa` 1.2 → 1.3, `vite-imagetools` 9 → 10,
  `lovable-tagger` 1.1 → 1.3. Se añade `esbuild` (devDep) y se elimina
  `treeshake.preset` (incompatible con rolldown).
- **Node 24**: CI en Node 24, `engines.node` `>=22` y `.nvmrc` (Node 20 quedó
  deprecado en Vercel).

### Removed

- `public/sitemap.xml` deja de versionarse; se regenera en cada build.

## [1.0.27] - 2026-07-29

Primer release en producción del **epic FisioAnalaura**: rebrand completo,
mejoras de SEO/rendimiento y tooling.

### Added

- **Rebrand FisioAnalaura**: nueva identidad y paleta de marca con contraste
  **WCAG AA** (tokens HSL en `src/index.css` / `tailwind.config.ts`).
- **SSG con `vite-react-ssg`**: HTML **pre-renderizado por ruta** en build e
  hidratación en cliente (mejor first paint y crawlability; el `<body>` deja de
  ser un shell vacío).
- **Trust bar** bajo el hero (doble titulación, cédula, sedes, pagos).
- Sección **Agenda** (widget de Doctoralia) con ancla `#agenda` y evento GA4
  de visualización; todos los CTA "Reservar" hacen scroll a ella.
- **IA por condiciones/síntomas** con anclas para SEO.
- **Favicon, Open Graph y PWA manifest** con el isotipo de marca.
- **CI en PRs** (GitHub Actions): `lint` · `type-check` · `build` en `develop`
  y `main`.

### Changed

- **Hero** renovado orientado a conversión (CTA primario a `#agenda`,
  secundario a WhatsApp).
- Orden de secciones optimizado para la reserva.
- **Assets** de imagen normalizados a **kebab-case** (sin espacios ni acentos).
- Documentación de deploy actualizada a **Vercel**.

### Removed

- **Service worker** de precache: se publica un SW **auto-destructivo** que se
  desregistra y limpia cachés previas. Se conserva el manifest para el
  tematizado móvil e iconos. El caché de repetición queda cubierto por el CDN
  de Vercel + assets con hash `immutable`.

### Fixed

- **Build de producción en Vite 8** (rama `main`): se añade `esbuild` como
  dependencia y se elimina `treeshake.preset` (incompatible con rolldown), lo
  que desbloqueó el deploy.
- Accesibilidad: contrastes AA en hero, navbar y textos de acento; foco de
  teclado visible y targets táctiles ≥ 44px.

### Notes

- Stack en **Vite 7.3.1 + `vite-react-ssg`**; la migración a **Vite 8** queda
  diferida (la librería de SSG aún no la soporta).
- Pendiente de infraestructura: subir **Vercel + CI a Node 24** (Node 20 se
  deprecará el 2026-10-01).

[Unreleased]: https://github.com/iscpatricio92/fisio-movimiento/compare/v1.0.29...HEAD
[1.0.29]: https://github.com/iscpatricio92/fisio-movimiento/compare/v1.0.28...v1.0.29
[1.0.28]: https://github.com/iscpatricio92/fisio-movimiento/compare/v1.0.27...v1.0.28
[1.0.27]: https://github.com/iscpatricio92/fisio-movimiento/releases/tag/v1.0.27
