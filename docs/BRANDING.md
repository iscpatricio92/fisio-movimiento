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
- **⚠️ Base auto-vectorizada**: el SVG se generó por trazado automático (VTracer) a partir del PNG original. Es fiel a la forma y sirve como **base de trabajo**; los gradientes se aproximaron como capas de color plano. Pendiente: versión vectorial refinada por diseño con gradientes reales, y variantes **emblema-solo (isotipo)** y **monocromática**.
- `viewBox="0 0 1112 1111"`, accesible (`role="img"` + `<title>`).

## 🎨 Paleta de color

Colores muestreados directamente del logotipo original.

| Rol               | Token propuesto             | HEX       | HSL           | Uso                                      |
| ----------------- | --------------------------- | --------- | ------------- | ---------------------------------------- |
| **Azul primario** | `--primary`                 | `#2BA6DB` | `198 71% 51%` | CTAs, enlaces, marca, "physio"           |
| **Azul profundo** | `--primary-deep` _(nuevo)_  | `#1876B6` | `204 77% 40%` | Contraste, pétalos centrales, gradientes |
| **Verde acento**  | `--accent`                  | `#78B342` | `91 46% 48%`  | Acento natural/salud, detalles           |
| **Verde bosque**  | `--accent-deep` _(nuevo)_   | `#4F8B2E` | `95 50% 36%`  | Fin de gradiente verde                   |
| **Cian claro**    | `--primary-light` _(nuevo)_ | `#3EB4E4` | `198 75% 57%` | Hover, "holistic", acentos suaves        |
| Blanco            | —                           | `#FFFFFF` | `0 0% 100%`   | Fondos                                   |
| Texto oscuro      | `--foreground`              | `#1F2A37` | `210 29% 17%` | Texto principal                          |

### Gradientes de marca

El emblema usa transiciones azul→azul-profundo y verde→verde-bosque:

```css
--gradient-brand: linear-gradient(135deg, #2ba6db 0%, #1876b6 100%);
--gradient-accent: linear-gradient(135deg, #78b342 0%, #4f8b2e 100%);
```

## 🔁 Mapeo al sistema de tokens actual (`src/index.css`)

El rebrand consiste en actualizar las variables HSL. Cambios principales:

| Token            | Antes (actual)             | Después (marca) | Nota                                                                      |
| ---------------- | -------------------------- | --------------- | ------------------------------------------------------------------------- |
| `--primary`      | `187 78% 42%` (cian)       | `198 71% 51%`   | Azul physio                                                               |
| `--accent`       | `35 90% 55%` (**naranja**) | `91 46% 48%`    | ⚠️ El acento naranja actual **no** pertenece a la marca; pasa a **verde** |
| `--ring`         | `187 78% 42%`              | `198 71% 51%`   | Acompaña a `--primary`                                                    |
| `--primary-deep` | —                          | `204 77% 40%`   | Nuevo, para gradientes/contraste                                          |

> Verificar el modo oscuro (`.dark`) por separado (aumentar luminosidad ~6–8% en primary/accent).

## 🔤 Tipografía

- **Sitio (actual)**: Playfair Display (títulos) + Work Sans (cuerpo) — se mantienen salvo decisión contraria.
- **Wordmark del logo**: fuente redondeada tipo _humanist sans_ (a identificar); es parte del asset, **no** se usa como fuente del sitio.

## ♿ Accesibilidad

- Texto sobre `--primary` (`#2BA6DB`): usar **texto blanco** (contraste AA en tamaños ≥ 18px/bold; validar botones pequeños).
- El **verde** `#78B342` sobre blanco **no** cumple AA para texto pequeño → usarlo para acentos/gráficos, no para texto pequeño sobre blanco. Para texto usar `--accent-deep` `#4F8B2E`.
- Validar todos los pares con un checker AA antes de mergear el rebrand.

## ⏳ Pendientes

- [ ] Logotipo **Zenag** (Metepec) + su rol en la UI.
- [ ] Refinar SVG con gradientes reales + variantes isotipo/mono.
- [ ] Afinar stops exactos de gradiente desde el vector definitivo.
- [ ] Aplicar tokens a `tailwind.config.ts` + `src/index.css` (ver issue #92).
- [ ] Actualizar favicon, OG images, `manifest.json` (`theme_color`) e iconos PWA.
