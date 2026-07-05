# 🚀 Guía de Despliegue en Vercel

Este proyecto se despliega en **Vercel**. Vercel construye y publica el sitio automáticamente a partir del repositorio de GitHub, sin necesidad de workflows de GitHub Actions.

## 🌱 Flujo de ramas

- Todo cambio se desarrolla en una rama de feature y se integra a **`develop`** mediante Pull Request.
- **Nunca** se hace push directo a `main`. Los cambios llegan a `main` (producción) vía PR desde `develop`.
- Cada Pull Request genera un despliegue de **Preview** en Vercel para revisar los cambios antes de mezclarlos.
- Cada push/merge a **`main`** genera un despliegue de **Producción**.

## 📋 Configuración Inicial

### 1. Conectar el repositorio a Vercel

1. Entra a [vercel.com](https://vercel.com) e importa el repositorio de GitHub.
2. Vercel detecta automáticamente que es un proyecto **Vite**.
3. Confirma la configuración de build (ver más abajo). No se requiere ningún archivo de workflow.

### 2. Configuración de Build

Vercel usa la detección automática de Vite. Los valores esperados son:

| Ajuste               | Valor                                   |
| -------------------- | --------------------------------------- |
| **Framework Preset** | Vite                                    |
| **Build Command**    | `npm run build`                         |
| **Output Directory** | `dist`                                  |
| **Install Command**  | `npm install` (usa `package-lock.json`) |

> Este proyecto usa **npm** (`package.json` + `package-lock.json`) como único gestor de paquetes.

### 3. Variables de Entorno

Configura las variables `VITE_*` en **Project Settings > Environment Variables**:

- `VITE_SENTRY_DSN` (opcional) — DSN de Sentry para el error tracking en producción.

Vite inyecta estas variables durante el **build**, no en runtime. Vercel las aplica automáticamente al build de cada despliegue (Production y Preview según cómo las configures).

## ⚙️ Configuración en `vercel.json`

Los headers HTTP y el comportamiento de enrutamiento se definen en [`../vercel.json`](../vercel.json):

- **Headers de seguridad** para todas las rutas: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (geolocation, micrófono, cámara e interest-cohort deshabilitados) y `X-Frame-Options: DENY`.
- **Caché de assets**: `assets/` y `favicon/` con `Cache-Control: public, max-age=31536000, immutable` (1 año).
- **Caché de metadatos**: `robots.txt`, `sitemap.xml` y `404.html` con `max-age=3600`; `index.html` con `max-age=0, must-revalidate`.
- **SPA rewrites**: `/(.*)` → `/index.html` para que React Router maneje las rutas del lado del cliente.
- **`cleanUrls: true`** y **`trailingSlash: false`**.

## 🌐 Dominio Personalizado

El sitio usa `fisio-movimiento.com`:

1. Agrega el dominio en **Project Settings > Domains** en Vercel.
2. Configura los registros DNS que Vercel indique (normalmente un registro `A`/`CNAME` hacia Vercel).
3. `vite.config.ts` usa `base: '/'` y `BrowserRouter` usa `import.meta.env.BASE_URL` (que es `/`).

**URL del sitio:** https://fisio-movimiento.com/

> Nota: el archivo `public/CNAME` es un artefacto de GitHub Pages y Vercel lo ignora. El dominio se administra desde el panel de Vercel.

## ✅ Verificar el Despliegue

1. Abre el dashboard del proyecto en Vercel y revisa la pestaña **Deployments**.
2. Cada PR muestra su URL de **Preview** directamente en el Pull Request de GitHub.
3. El despliegue de producción queda disponible en el dominio personalizado unos momentos después del merge a `main`.

## 🐛 Solución de Problemas

### El build falla

- Revisa los logs del deployment en Vercel.
- Verifica que `npm run build` funcione localmente.
- Confirma que todas las dependencias estén en `package.json` y que `package-lock.json` esté actualizado.

### Las rutas no funcionan (404 al recargar)

- Confirma que el rewrite `/(.*) → /index.html` esté presente en `vercel.json`.
- Verifica que `BrowserRouter` use `basename={import.meta.env.BASE_URL}`.

### Una variable de entorno no toma efecto

- Recuerda que las variables `VITE_*` se inyectan en **build time**: tras cambiarlas hay que **redeployar**.
- Verifica que el nombre empiece con el prefijo `VITE_`.

## 📚 Recursos

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel + Vite](https://vercel.com/docs/frameworks/vite)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
