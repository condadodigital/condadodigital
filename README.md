# Condado Digital

Sitio estático (HTML, CSS y JS, sin build) de **Condado Digital**, el rincón honesto del marketing digital.
Publicado en https://www.condadodigital.cl

## Estructura
- `index.html` y demás páginas en la raíz
- `styles.css`: sistema de diseño (paleta y tipografías al inicio del archivo)
- `script.js`: menú móvil y buscador (agrega cada contenido nuevo al arreglo `INDICE`)
- `img/`: avatar.jpg, retrato.jpg, hero.jpg (y hero.webp / hero-movil.webp, que son las que se cargan), og-condado-digital.jpg (imagen para compartir en redes, 1200x630)
- `fonts/`: Fraunces y DM Sans alojadas en el sitio (antes Google Fonts)
- `_headers`: caché de Cloudflare Pages (1 año para imágenes, fuentes y SVG)
- Enciclopedia: `enciclopedia.html` (índice) y 6 artículos de referencia con URL plana (`que-es-el-marketing-digital`, `marketing-tradicional-vs-digital`, `embudo-de-marketing`, `publicidad-pagada-vs-organica`, `analitica-digital`, `marketing-con-ia`). Llevan referencias numeradas, schema Article + FAQPage + BreadcrumbList y su historial de actualizaciones: si cambias un dato, agrega una línea al historial y actualiza `dateModified`
- `contenido/`: borradores e investigación de los artículos (no se publica, está en `.gitignore`)
- `borradores/`: plantillas y contenido aún no publicado. Está en el repositorio, pero **no se publica**: todo lo que hay en esa carpeta responde 404 en el sitio

## Cómo publicar
- Cada push a `main` se publica solo en Cloudflare Pages (sin comando de build). En uno o dos minutos el cambio está en https://www.condadodigital.cl.
- Cloudflare quita la extensión `.html`: los enlaces internos, canonical, schema y `sitemap.xml` usan URL sin extensión (por ejemplo, `/glosario`).
- Cuando `/blog`, `/aprendizaje` y `/noticias` tengan contenido: quita su `<meta name="robots" content="noindex, follow">` y vuelve a agregarlas a `sitemap.xml`. Para reactivar el contenido que estaba oculto, cópialo desde `borradores/inicio-proximos-articulos.html`, `borradores/blog-filtros-y-articulos.html` y `borradores/aprendizaje-capsulas.html`: cada bloque indica en qué página y en qué posición va.
- Imágenes, fuentes y SVG tienen caché de 1 año: si reemplazas uno, usa un nombre de archivo nuevo y actualiza las referencias. `styles.css` y `script.js` llevan una versión en su URL (`styles.css?v=20261109`): Cloudflare guarda CSS y JS 4 horas en el navegador, así que **cada vez que cambies uno de ellos, sube la versión en todas las páginas**, por ejemplo:
  `sed -i '' 's/?v=20261109/?v=20261201/g' *.html`
- Archivos internos: `functions/_middleware.js` y `_routes.json` hacen que `README.md`, `.gitignore`, `functions/`, `borradores/` y esos mismos archivos respondan 404 en el sitio. El middleware se ejecuta en todas las páginas (`_routes.json` solo excluye imágenes, fuentes, CSS, JS y archivos .txt/.xml), así que también bloquea rutas codificadas. Si agregas otro archivo o carpeta que no deba publicarse, súmalo en `OCULTOS` o `CARPETAS` del middleware, o guárdalo dentro de `borradores/`.
- No dejes notas internas en comentarios HTML de las páginas publicadas: cualquiera puede verlas con «Ver código fuente». Las notas van en `borradores/`, en el README o en `contenido/`.

## Cómo crear contenido nuevo con las plantillas
Las plantillas están en `borradores/` y usan el mismo encabezado, menú, pie y GTM que el resto del sitio:

| Plantilla | Para qué | Dónde se lista |
|---|---|---|
| `borradores/plantilla-articulo.html` | Artículo del blog (opinión del autor) | `blog.html` |
| `borradores/plantilla-noticia.html` | Noticia con análisis | `noticias.html` |
| `borradores/plantilla-capsula.html` | Cápsula de Aprendizaje (tutorial paso a paso) | `aprendizaje.html` |

1. Copia la plantilla **a la raíz del sitio** con el nombre de la URL que quieres, en minúsculas y con guiones (por ejemplo, `cp borradores/plantilla-articulo.html como-funciona-meta-ads.html`). Si la dejas dentro de `borradores/`, no se publicará.
2. Borra la línea `<meta name="robots" content="noindex">` y el comentario `PLANTILLA` de arriba.
3. Completa `<title>`, `description`, `og:title`, `og:description`, `og:url` y `canonical` con la URL sin `.html` (`https://www.condadodigital.cl/como-funciona-meta-ads`).
4. Reemplaza todo lo que está entre `[corchetes]`, incluidos el schema (fechas `datePublished` y `dateModified` en formato `2026-11-09T09:00:00-03:00`) y los enlaces a contenido recomendado (`[url-…]`).
5. Borra los comentarios de instrucciones que quedaron en el cuerpo.
6. Agrega el contenido a su página de listado (tabla de arriba), a `sitemap.xml`, al arreglo `INDICE` de `script.js` y, si es relevante, a `llms.txt`.
7. Revísalo en local y publica con commit y push.

## Pendientes
- Crear `glosario-roas.html`, `glosario-seo.html`, `glosario-sem.html` y `glosario-pixel.html`. Al publicar cada uno, enlázalo donde hoy aparece como texto sin enlace y súmalo al glosario y al buscador:
  - ROAS: `glosario.html` (cuadrícula), `script.js` (`INDICE`), `glosario-cpa.html` y `glosario-ltv.html` (Métricas/Términos relacionados), `preguntas-frecuentes.html` (respuesta «¿Qué es ROAS?»)
  - SEO: `glosario.html`, `script.js`, `glosario-aeo.html` y `glosario-geo.html` (texto y Términos relacionados)
  - SEM: `glosario.html`, `script.js`, `glosario-aeo.html` (Términos relacionados)
  - Pixel: `glosario.html`, `script.js`, `glosario-capi.html` y `glosario-gtm.html` (Términos relacionados)
- Enciclopedia: los datos que no se publicaron por falta de fuente están en `contenido/pendientes-enciclopedia.md` (solo local)
