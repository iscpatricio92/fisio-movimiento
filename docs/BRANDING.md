# 🎨 Guía de Marca — FisioMovimiento

> Sistema de identidad visual del sitio **FisioMovimiento** (`fisio-movimiento.com`).
> El sitio **conserva el nombre "FisioMovimiento"** y adopta la **paleta de color de `physio holistic`** como sistema visual.

## 🏷️ Marcas y sedes

| Marca               | Rol                              | Sede                    |
| ------------------- | -------------------------------- | ----------------------- |
| **FisioMovimiento** | Nombre del sitio / marca digital | —                       |
| **physio holistic** | Consultorio de la especialista   | CDMX (Iztapalapa)       |
| **Zenag**           | Clínica donde atiende            | Metepec, Edo. de México |

> El rebrand adopta los **colores** de physio holistic; **no** cambia el nombre del sitio.
> El logotipo de **Zenag** está pendiente de entrega (se sumará a esta guía cuando esté disponible).

## 🖼️ Logotipo

- Archivo base: [`../public/logo.svg`](../public/logo.svg) — **physio holistic** (imagotipo: emblema romboidal tipo mandala + wordmark).
- **Vectorización a 3 colores planos**: el SVG se generó a partir del PNG original **cuantizando a exactamente los 3 colores de marca** (2 azules + 1 verde), sin gradientes ni artefactos tipo "acuarela". Fiel a la forma y listo como asset base (~34 KB). Pendiente: variantes **emblema-solo (isotipo)** y **monocromática** (y, si se desea, una versión con gradientes reales).
- `viewBox="0 0 1112 1111"`, accesible (`role="img"` + `<title>`).

## 🎨 Paleta de color

Colores muestreados directamente del logotipo original.

| Rol                    | Token             | HEX       | HSL           | Uso                                       |
| ---------------------- | ----------------- | --------- | ------------- | ----------------------------------------- |
| **Azul profundo** (UI) | `--primary`       | `#1876B6` | `204 77% 40%` | CTAs, enlaces, botones (AA con blanco)    |
| **Azul brillante**     | `--primary-light` | `#2BA6DB` | `198 71% 51%` | Fills, gradientes, hero, "physio"         |
| **Verde acento**       | `--accent`        | `#78B342` | `91 46% 48%`  | Acentos/íconos (con foreground oscuro)    |
| **Verde bosque**       | `--accent-deep`   | `#4F8B2E` | `95 50% 36%`  | Verde para texto/íconos sobre fondo claro |
| Blanco                 | —                 | `#FFFFFF` | `0 0% 100%`   | Fondos                                    |
| Texto oscuro           | `--foreground`    | `#1F2A37` | `210 29% 17%` | Texto principal                           |

### Gradientes de marca

El emblema usa transiciones azul→azul-profundo y verde→verde-bosque:

```css
--gradient-brand: linear-gradient(135deg, #2ba6db 0%, #1876b6 100%);
--gradient-accent: linear-gradient(135deg, #78b342 0%, #4f8b2e 100%);
```

## 🔁 Mapeo al sistema de tokens (`src/index.css`) — ✅ aplicado (#99)

Valores aplicados en `:root` (light). Decisión de accesibilidad: el azul brillante `#2BA6DB` **no** cumple AA con texto blanco (contraste ~2.7), así que el token **interactivo** `--primary` usa el **azul profundo `#1876B6`** (AA ~4.8 con blanco) y el azul brillante se expone como **`--primary-light`** para fills/gradientes.

| Token             | Antes                      | Ahora                     | Nota                                              |
| ----------------- | -------------------------- | ------------------------- | ------------------------------------------------- |
| `--primary`       | `187 78% 42%` (cian)       | `204 77% 40%` (`#1876B6`) | Interactivo (botones/links): AA con texto blanco  |
| `--primary-light` | —                          | `198 71% 51%` (`#2BA6DB`) | Azul brillante para fills/gradientes/hero         |
| `--accent`        | `35 90% 55%` (**naranja**) | `91 46% 48%` (`#78B342`)  | Verde de marca; `--accent-foreground` oscuro (AA) |
| `--accent-deep`   | —                          | `95 50% 36%` (`#4F8B2E`)  | Verde para texto/íconos sobre fondo claro         |
| `--ring`          | `187 78% 42%`              | `204 77% 40%`             | Acompaña a `--primary`                            |

> En dark se sube la luminosidad del azul (`--primary: 198 74% 56%`) y del verde (`--accent: 95 46% 55%`). Gradientes y sombras migrados de cian/naranja legacy a azul de marca.

> Verificar el modo oscuro (`.dark`) por separado (aumentar luminosidad ~6–8% en primary/accent).

## 🔤 Tipografía

- **Sitio (actual)**: Playfair Display (títulos) + Work Sans (cuerpo) — se mantienen salvo decisión contraria.
- **Wordmark del logo**: fuente redondeada tipo _humanist sans_ (a identificar); es parte del asset, **no** se usa como fuente del sitio.

## ♿ Accesibilidad

- Texto blanco sobre `--primary` (`#1876B6`): **AA** (~4.8). ⚠️ El azul brillante `--primary-light` (`#2BA6DB`) con blanco **no** cumple AA (~2.7) → usarlo solo para fills/gradientes, no como fondo de texto pequeño.
- El **verde** `--accent` (`#78B342`) usa `--accent-foreground` **oscuro** para cumplir AA cuando es fondo. Como **texto** sobre blanco no cumple AA → usar `--accent-deep` (`#4F8B2E`) o reservarlo para íconos/acentos grandes.
- Validar todos los pares con un checker AA en cada sección del rebrand (issue #102).

## ⏳ Pendientes

- [ ] Logotipo **Zenag** (Metepec) + su rol en la UI.
- [ ] Refinar SVG con gradientes reales + variantes isotipo/mono.
- [ ] Afinar stops exactos de gradiente desde el vector definitivo.
- [x] Aplicar tokens a `tailwind.config.ts` + `src/index.css` (#99, ✅ aplicado).
- [ ] Actualizar favicon, OG images, `manifest.json` (`theme_color`) e iconos PWA.
