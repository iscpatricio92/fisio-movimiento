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

> **🛑 Identidad por sede: DESCARTADA** (decisión de la especialista). No se
> implementa identidad visual por consultorio y **no se incluyen "Zenag" ni
> "physio holistic" como marcas visibles**; se mantiene comunicación unificada.
> El logo se usa como **mark de marca** (emblema), evitando surfacear el
> wordmark "physio holistic" en superficies públicas (p. ej. las OG usan el
> isotipo). El logo de Zenag ya **no** se requiere.

## 🖼️ Logotipo

- **Imagotipo** (emblema + wordmark): [`../public/logo.svg`](../public/logo.svg). Uso interno/documentación; **evitar** el wordmark "physio holistic" en superficies públicas.
- **Isotipo** (solo emblema, sin texto): [`../public/logo-isotipo.svg`](../public/logo-isotipo.svg) — **variante recomendada** como mark de marca (favicon, OG, avatares). No surfacea "physio holistic".
- **Monocromo** (una tinta, `fill="currentColor"`): [`../public/logo-mono.svg`](../public/logo-mono.svg) — hereda el color vía CSS; ideal para fondos oscuros o usos de 1 color.
- Todas las variantes: 3 colores planos de marca, `viewBox` cuadrado, accesibles (`role="img"` + `<title>`).

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

- [x] ~~Logotipo **Zenag**~~ — **descartado** (identidad por sede no va).
- [x] Variantes **isotipo** y **monocromática** del logo (#101, ✅).
- [ ] (Opcional) Versión con gradientes reales del logo.
- [x] Aplicar tokens a `tailwind.config.ts` + `src/index.css` (#99, ✅ aplicado).
- [x] Favicon, OG images, `manifest.json` (`theme_color`) e iconos PWA (#100/#101, ✅).
