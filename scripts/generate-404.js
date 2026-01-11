import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://fisio-movimiento.com';

/**
 * Script para generar 404.html para GitHub Pages
 *
 * GitHub Pages necesita un archivo 404.html en la raíz para manejar errores 404.
 * Para SPAs con React Router, este archivo debe ser casi idéntico a index.html,
 * pero con meta tags específicos para la página 404.
 *
 * El archivo 404.html se genera en dist/ durante el build para que esté disponible
 * en GitHub Pages y pueda ser indexado por Google Search Console.
 */

const generate404HTML = () => {
  // Leer index.html desde dist/ (después del build)
  const indexHTMLPath = join(process.cwd(), 'dist', 'index.html');

  try {
    let indexHTML = readFileSync(indexHTMLPath, 'utf-8');

    // Reemplazar meta tags para la página 404
    const replacements = [
      // Title
      [
        /<title>.*?<\/title>/i,
        '<title>404 - Página no encontrada | FisioAnalaura</title>',
      ],
      // Meta title
      [
        /<meta\s+name="title"\s+content=".*?"\s*\/?>/i,
        '<meta name="title" content="404 - Página no encontrada | FisioAnalaura" />',
      ],
      // Meta description
      [
        /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
        '<meta name="description" content="La página que buscas no existe. Regresa al inicio o explora nuestros servicios de fisioterapia en CDMX y Metepec." />',
      ],
      // Open Graph title
      [
        /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
        '<meta property="og:title" content="404 - Página no encontrada | FisioAnalaura" />',
      ],
      // Open Graph description
      [
        /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
        '<meta property="og:description" content="La página que buscas no existe. Regresa al inicio o explora nuestros servicios de fisioterapia en CDMX y Metepec." />',
      ],
      // Open Graph URL - usar la URL base
      [
        /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
        `<meta property="og:url" content="${BASE_URL}/404" />`,
      ],
      // Canonical URL
      [
        /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
        `<link rel="canonical" href="${BASE_URL}/404" />`,
      ],
      // Twitter Card title
      [
        /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
        '<meta name="twitter:title" content="404 - Página no encontrada | FisioAnalaura" />',
      ],
      // Twitter Card description
      [
        /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
        '<meta name="twitter:description" content="La página que buscas no existe. Regresa al inicio o explora nuestros servicios de fisioterapia en CDMX y Metepec." />',
      ],
    ];

    // Aplicar todas las sustituciones
    replacements.forEach(([pattern, replacement]) => {
      indexHTML = indexHTML.replace(pattern, replacement);
    });

    return indexHTML;
  } catch (error) {
    console.error('❌ Error al leer dist/index.html:', error.message);
    throw error;
  }
};

// Generar y escribir el archivo 404.html
try {
  const outputPath = join(process.cwd(), 'dist', '404.html');
  const html404 = generate404HTML();

  writeFileSync(outputPath, html404, 'utf-8');
  console.log(`✅ 404.html generado: ${outputPath}`);
  console.log(
    `   El archivo está listo para GitHub Pages y Google Search Console`,
  );
} catch (error) {
  console.error('❌ Error al generar 404.html:', error.message);
  process.exit(1);
}
