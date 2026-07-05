---
name: design-system
description: Sistema de diseño y marca de FisioMovimiento (identidad physio holistic). Úsalo SIEMPRE antes de crear o modificar UI, elegir colores, componer secciones, ajustar tipografía/espaciado, o construir un mockup/artifact del sitio. Garantiza que cualquier cambio visual use los tokens y patrones de marca de forma consistente.
---

# Sistema de diseño — FisioMovimiento

Marca digital **FisioMovimiento** (`fisio-movimiento.com`). Fuente de verdad ampliada: [`docs/BRANDING.md`](../../../docs/BRANDING.md). Esta skill es el resumen operativo.

## Objetivo del sitio (no perder el foco)

Convertir **visita → reserva de cita**. El punto de conversión principal es el **widget de Doctoralia** (ahí agenda el paciente). WhatsApp es canal **secundario**. Todo cambio de UI debe acercar al usuario a agendar, no alejarlo.

## Marcas y sedes

- **FisioMovimiento** — nombre del sitio (no se cambia).
- **physio holistic** (CDMX) / **Zenag** (Metepec) — clínicas donde atiende.
- **Identidad por sede: DESCARTADA** (decisión de la especialista). Comunicación **unificada**; **no** surfacear "physio holistic" ni "Zenag" como marcas visibles. El logo se usa como **mark** (isotipo/emblema); evitar el wordmark "physio holistic" en superficies públicas (favicon/OG usan el isotipo `public/logo-isotipo.svg`).

## Paleta (3 colores de marca + neutros)

| Rol                                | HEX       | HSL (token)   |
| ---------------------------------- | --------- | ------------- |
| Azul profundo (`--primary`, UI)    | `#1876B6` | `204 77% 40%` |
| Azul brillante (`--primary-light`) | `#2BA6DB` | `198 71% 51%` |
| Verde acento (`--accent`)          | `#78B342` | `91 46% 48%`  |
| Verde bosque (`--accent-deep`)     | `#4F8B2E` | `95 50% 36%`  |

> `--primary` (interactivo/botones) usa el **azul profundo** #1876B6 porque cumple AA con texto blanco; el azul brillante #2BA6DB es `--primary-light` (fills/gradientes/hero).

Gradientes de marca: `linear-gradient(135deg,#2BA6DB,#1876B6)` (azul) y `…,#78B342,#4F8B2E` (verde).

### Reglas de color

- El acento de marca es **verde**, no naranja. Si encuentras `--accent: 35 90% 55%` (naranja) es legado y debe migrarse.
- Definir color solo vía **tokens HSL** en `src/index.css` / `tailwind.config.ts`. **Nunca** hardcodear hex en componentes.
- Revisar **light y dark** por separado (en dark, subir luminosidad ~6–8% en primary/accent).

## Tipografía

- Sitio real: **Playfair Display** (títulos) + **Work Sans** (cuerpo).
- En artifacts/mockups (la CSP bloquea CDNs de fuentes): usar stack de sistema — serif tipo Georgia para display, `system-ui` para cuerpo. No enlazar webfonts que fallen en silencio.
- Labels/eyebrows en MAYÚSCULAS con `letter-spacing` ~.14em. Texto de lectura ≤ ~65 caracteres de ancho.

## Accesibilidad (obligatorio)

- Contraste **WCAG AA** en todo par texto/fondo.
- Texto blanco sobre `--primary` (`#1876B6`): **AA** ✓. El azul brillante `--primary-light` (`#2BA6DB`) con blanco **no** es AA → solo fills/gradientes.
- El **verde** `#78B342` sobre blanco **no** cumple AA para texto pequeño → úsalo para acentos/íconos; para texto pequeño usa `--accent-deep` `#4F8B2E`.
- Soportar `prefers-reduced-motion`; foco de teclado siempre visible; targets táctiles ≥ 44px.

## Patrones de sección (orden recomendado)

`Hero → Trust bar → Qué tratamos (condiciones) → Cómo trabajamos → Opiniones → Precios → Agenda (Doctoralia) → FAQ → Footer`.

- **Hero**: responde "¿pueden con MI dolor y qué tan pronto?"; CTA primario "Reservar" → `#agenda`; badges de confianza (doble titulación MX·ES, cédula 10909109, 2 sedes, rating Doctoralia).
- **Trust bar**: credenciales/sedes/pagos bajo el hero.
- **Condiciones**: lenguaje de síntoma (dolor de espalda, ATM, hipopresivos…), con anclas para SEO.
- **Opiniones antes de Precios** (prueba social reduce fricción de precio).
- **Agenda**: sección protagonista con el widget de Doctoralia y ancla `#agenda`; todos los CTA "Reservar" hacen scroll a ella.

## Do / Don't

- ✅ Usa tokens, gradientes y patrones de arriba. ✅ Prioriza la reserva. ✅ Mantén el gran performance (lazy, imágenes optimizadas).
- ❌ No introduzcas naranjas ni colores fuera de paleta. ❌ No entierres el widget de Doctoralia. ❌ No cambies el nombre "FisioMovimiento". ❌ No implementes identidad por sede sin el go/no-go.

## Datos reales (para copy, no usar placeholders)

- Lic. **Analaura Reyes Priego** · Cédula **10909109** · Tel/WhatsApp **+52 55 6505 3202**.
- Primera cita **$700**. Sedes: Iztapalapa (CDMX) y Metepec (Edo. Méx.).
