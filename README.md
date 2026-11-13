# Condado Digital

Sitio estático (HTML, CSS y JS, sin build) de **Condado Digital**, el rincón honesto del marketing digital.
Publicado en https://www.condadodigital.cl

## Estructura
Cloudflare Pages publica **solo la carpeta `public/`** (directorio de salida: `public`). Todo lo que está fuera de ella (este README, `borradores/`, `contenido/`, `.gitignore`) queda en el repositorio pero no existe en el sitio.

- `public/`: el sitio completo. `index.html` y demás páginas (incluidas las 4 landings de servicios), `styles.css`, `script.js`, `img/`, `fonts/`, `favicon.svg`, `logo.svg`, `robots.txt`, `sitemap.xml`, `llms.txt`, `404.html`, `_headers` y `_redirects`
  - `styles.css`: sistema de diseño (paleta y tipografías al inicio del archivo)
  - `script.js`: menú móvil y buscador (agrega cada contenido nuevo al arreglo `INDICE`)
  - `img/`: avatar.jpg, retrato.jpg, hero.jpg (y hero.webp / hero-movil.webp, que son las que se cargan), og-condado-digital.jpg (imagen para compartir en redes, 1200x630)
  - `fonts/`: Fraunces y DM Sans alojadas en el sitio (antes Google Fonts)
  - `_headers`: caché de Cloudflare Pages (1 año para imágenes, fuentes y SVG)
  - Enciclopedia: `enciclopedia.html` (índice) y 6 artículos de referencia con URL plana (`que-es-el-marketing-digital`, `marketing-tradicional-vs-digital`, `embudo-de-marketing`, `publicidad-pagada-vs-organica`, `analitica-digital`, `marketing-con-ia`). Llevan referencias numeradas, schema Article + FAQPage + BreadcrumbList y su historial de actualizaciones: si cambias un dato, agrega una línea al historial y actualiza `dateModified`
- `DISENO.md`: sistema de diseño (colores, tipografías, componentes y reglas de movimiento). No se publica
- `contenido/`: borradores e investigación de los artículos (no se publica, está en `.gitignore`)
- `borradores/`: plantillas y contenido aún no publicado. Está en el repositorio, pero **no se publica** porque está fuera de `public/`

## Cómo publicar
- Cada push a `main` se publica solo en Cloudflare Pages (sin comando de build, directorio de salida `public`). En uno o dos minutos el cambio está en https://www.condadodigital.cl.
- **Después de cada deploy, purga la caché** de la zona condadodigital.cl. Usa las variables de entorno `CLOUDFLARE_API_TOKEN` (token «claude-code-purga», con permisos solo para purgar la caché y leer Pages) y `CLOUDFLARE_ZONE_ID`, guardadas en `~/.zshrc` de tu equipo:
  `curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H "Content-Type: application/json" --data '{"purge_everything":true}'`
  Nunca escribas el token en archivos del repositorio, en commits ni en la salida de un comando.
- Cloudflare quita la extensión `.html`: los enlaces internos, canonical, schema y `sitemap.xml` usan URL sin extensión (por ejemplo, `/glosario`).
- Cuando `/blog`, `/aprendizaje` y `/noticias` tengan contenido: quita su `<meta name="robots" content="noindex, follow">` y vuelve a agregarlas a `sitemap.xml`. Para reactivar el contenido que estaba oculto, cópialo desde `borradores/inicio-proximos-articulos.html`, `borradores/blog-filtros-y-articulos.html` y `borradores/aprendizaje-capsulas.html`: cada bloque indica en qué página y en qué posición va.
- Imágenes, fuentes y SVG tienen caché de 1 año: si reemplazas uno, usa un nombre de archivo nuevo y actualiza las referencias. `styles.css` y `script.js` llevan una versión en su URL (`styles.css?v=20261109b`): Cloudflare guarda CSS y JS 4 horas en el navegador, así que **cada vez que cambies uno de ellos, sube la versión en todas las páginas**, por ejemplo:
  `sed -i '' 's/?v=20261109b/?v=20261201/g' public/*.html`
- Archivos internos: no hace falta ocultarlos. Si un archivo no debe publicarse, déjalo fuera de `public/` (por ejemplo, en `borradores/` o `contenido/`). Nunca pongas en `public/` notas, borradores ni archivos de trabajo.
- No dejes notas internas en comentarios HTML de las páginas publicadas: cualquiera puede verlas con «Ver código fuente». Las notas van en `borradores/`, en el README o en `contenido/`.

## Landings de servicios
- Son 4, con URL plana: `public/paid-media.html`, `public/social-media.html`, `public/mentorias.html` y `public/diseno-web.html`. Su estilo está en el bloque «Landings de servicios» de `styles.css` (clases `lnd-*`).
- Se llega a ellas solo desde las 4 tarjetas de la sección Asesorías del inicio (`/#asesorias`), que miden `servicio_click`. Están en `sitemap.xml` y `llms.txt`, pero no en el pie ni en el buscador (`INDICE`).
- Los botones «Quiero una propuesta» son enlaces `.abrir-contacto` con `data-servicio="<id>"`: abren el formulario emergente con ese servicio ya elegido, su etiqueta y su ejemplo de mensaje (los 4 servicios están en `SERVICIOS`, dentro de `script.js`). Sin JavaScript llevan a `contacto?servicio=<id>`. El formulario envía también `origen`, la página desde donde se abrió.
- Si cambias una pregunta frecuente, cámbiala también en el JSON-LD `FAQPage` de esa página: el texto debe ser idéntico al visible.
- `/servicios` ya no existe: redirige con 301 a `/#asesorias` (`_redirects`) y la página anterior quedó en `borradores/servicios.html`.

## El Conde (asistente guiado)
- Archivos: `public/conde.js` (panel, se descarga solo al abrirlo), `public/conde.css`, `public/conde-terminos.json` (los términos que busca) e imágenes en `public/img/conde/`. El botón y el aviso los crea un cargador pequeño al final de `public/script.js`.
- **Cada vez que cambies el glosario** (`public/glosario.html`), regenera los términos de El Conde y publica los dos archivos juntos:
  `node herramientas/generar-conde-terminos.mjs`
  Necesita Node.js 18 o superior. El script avisa cuántos términos escribió; si no encuentra ninguno o falta un dato, se detiene sin tocar el archivo.
- Si cambias `conde.js` o `conde.css`, sube su versión (`?v=`) en `public/script.js` (constante `CONDE_V`); si cambias `script.js`, sube su versión en todas las páginas, como se indica arriba.

## Cómo crear contenido nuevo con las plantillas
Las plantillas están en `borradores/` y usan el mismo encabezado, menú, pie y GTM que el resto del sitio:

| Plantilla | Para qué | Dónde se lista |
|---|---|---|
| `borradores/plantilla-articulo.html` | Artículo del blog (opinión del autor) | `blog.html` |
| `borradores/plantilla-noticia.html` | Noticia con análisis | `noticias.html` |
| `borradores/plantilla-capsula.html` | Cápsula de Aprendizaje (tutorial paso a paso) | `aprendizaje.html` |

1. Copia la plantilla **a `public/`** con el nombre de la URL que quieres, en minúsculas y con guiones (por ejemplo, `cp borradores/plantilla-articulo.html public/como-funciona-meta-ads.html`). Si la dejas dentro de `borradores/`, no se publicará.
2. Borra la línea `<meta name="robots" content="noindex">` y el comentario `PLANTILLA` de arriba.
3. Completa `<title>`, `description`, `og:title`, `og:description`, `og:url` y `canonical` con la URL sin `.html` (`https://www.condadodigital.cl/como-funciona-meta-ads`).
4. Reemplaza todo lo que está entre `[corchetes]`, incluidos el schema (fechas `datePublished` y `dateModified` en formato `2026-11-09T09:00:00-03:00`) y los enlaces a contenido recomendado (`[url-…]`).
5. Borra los comentarios de instrucciones que quedaron en el cuerpo.
6. Agrega el contenido a su página de listado (tabla de arriba), a `public/sitemap.xml`, al arreglo `INDICE` de `public/script.js` y, si es relevante, a `public/llms.txt`.
7. Revísalo en local y publica con commit y push.

## Pendientes
- Crear `glosario-roas.html`, `glosario-seo.html`, `glosario-sem.html` y `glosario-pixel.html`. Al publicar cada uno, enlázalo donde hoy aparece como texto sin enlace y súmalo al glosario y al buscador:
  - ROAS: `glosario.html` (cuadrícula), `script.js` (`INDICE`), `glosario-cpa.html` y `glosario-ltv.html` (Métricas/Términos relacionados), `preguntas-frecuentes.html` (respuesta «¿Qué es ROAS?»)
  - SEO: `glosario.html`, `script.js`, `glosario-aeo.html` y `glosario-geo.html` (texto y Términos relacionados)
  - SEM: `glosario.html`, `script.js`, `glosario-aeo.html` (Términos relacionados)
  - Pixel: `glosario.html`, `script.js`, `glosario-capi.html` y `glosario-gtm.html` (Términos relacionados)
- Enciclopedia: los datos que no se publicaron por falta de fuente están en `contenido/pendientes-enciclopedia.md` (solo local)
