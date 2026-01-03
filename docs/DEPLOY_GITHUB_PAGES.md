# 🚀 Guía de Despliegue a GitHub Pages

Este proyecto está configurado para desplegarse automáticamente a GitHub Pages cuando se hace push a la rama `main`.

## 📋 Configuración Inicial

### 1. Habilitar GitHub Pages en el repositorio

1. Ve a **Settings** > **Pages** en tu repositorio de GitHub
2. En **Source**, selecciona:
   - **Source**: `GitHub Actions`
3. Guarda los cambios

### 2. Configuración del Workflow

El workflow está configurado en `.github/workflows/deploy.yml` y se ejecuta automáticamente cuando:
- Se hace push a la rama `main`
- Se hace merge de un Pull Request a `main`

## 🔧 Cómo Funciona

1. **Trigger**: Cuando haces commit y push a `main`
2. **Build**: El workflow:
   - Instala Node.js 20
   - Instala dependencias con `npm ci`
   - Ejecuta `npm run build`
   - Genera los archivos en `dist/`
3. **Deploy**: Sube el contenido de `dist/` a GitHub Pages

## 📝 Notas Importantes

### Base Path

El proyecto está configurado para funcionar tanto en desarrollo local como en GitHub Pages:

- **Desarrollo local**: Usa `/` como base
- **GitHub Pages**: Usa automáticamente el nombre del repositorio como base path

Si tu repositorio se llama `fisiolaura-reyes-clone-enhance`, la URL será:
```
https://[usuario].github.io/fisiolaura-reyes-clone-enhance/
```

### Si quieres usar un dominio personalizado

1. Agrega un archivo `CNAME` en la carpeta `public/` con tu dominio
2. Configura el DNS según las instrucciones de GitHub Pages
3. Actualiza `vite.config.ts` para usar `/` como base cuando esté en producción

### React Router

Si usas React Router con rutas, asegúrate de que el `BrowserRouter` tenga el `basename` correcto:

```tsx
<BrowserRouter basename={import.meta.env.BASE_URL}>
  {/* rutas */}
</BrowserRouter>
```

## ✅ Verificar el Despliegue

1. Ve a la pestaña **Actions** en GitHub
2. Verifica que el workflow se ejecutó correctamente
3. Ve a **Settings** > **Pages** para ver la URL de tu sitio
4. El sitio debería estar disponible en unos minutos

## 🐛 Solución de Problemas

### El sitio no carga correctamente

- Verifica que GitHub Pages esté habilitado en **Settings** > **Pages**
- Revisa los logs en **Actions** para ver si hay errores
- Asegúrate de que el build se complete sin errores

### Las rutas no funcionan

- Verifica que `vite.config.ts` tenga la configuración de `base` correcta
- Si usas React Router, asegúrate de usar `basename={import.meta.env.BASE_URL}`

### El workflow falla

- Revisa los logs en la pestaña **Actions**
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que el comando `npm run build` funcione localmente

## 📚 Recursos

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

