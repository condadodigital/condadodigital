# Condado Digital

Sitio estático (HTML, CSS y JS, sin build) de **Condado Digital**, el rincón honesto del marketing digital.
Publicado en https://www.condadodigital.cl

## Estructura
Cloudflare Pages publica **solo la carpeta `public/`** (directorio de salida: `public`). Todo lo que está fuera de ella (este README, `borradores/`, `contenido/`, `.gitignore`) queda en el repositorio pero no existe en el sitio.

- `public/`: el sitio completo. `index.html` y demás páginas (incluidas las 5 landings de servicios y `gracias.html`), `styles.css`, `script.js`, los módulos de página, `img/`, `fonts/`, `favicon.svg`, `logo.svg`, `robots.txt`, `sitemap.xml`, `llms.txt`, `404.html`, `_headers` y `_redirects`
  - `styles.css`: sistema de diseño del rediseño 2026 (fuentes locales, cabecera `k-*`, páginas `pg-*`, artículos `ar-*`, El Conde `ec-*`, cookies `ck-*`)
  - `script.js`: script global de todas las páginas: menú móvil, buscador de `/buscar` (agrega cada contenido nuevo al arreglo `INDICE`), aviso y panel de cookies, formulario emergente, botón de El Conde, compartir, «¿Te sirvió este artículo?» y eventos de medición
  - Módulos que se cargan solo en su página: `inicio.js` (intro, pasos, teléfono con chat, video y calculadora del inicio), `calculadoras.js` (las 20 calculadoras, el simulador de embudo y la historia de Camila), `enciclopedia.js` (filtros, buscador y autodiagnóstico), `glosario.js` (pestañas A–Z, filtros, buscador y quiz) y `articulo.js` (índice activo de los artículos)
  - `img/`: avatar.jpg, retrato.jpg (foto del fundador en `/acerca#fundador`), manifiesto-2026.mp4 y manifiesto-portada-2026.jpg (video del inicio), og-condado-digital.jpg (imagen para compartir en redes, 1200x630) y `conde/` (El Conde). hero.jpg, hero.webp y hero-movil.webp ya no se usan
  - `fonts/`: Fraunces y DM Sans alojadas en el sitio (antes Google Fonts)
  - `_headers`: caché de Cloudflare Pages (1 año para imágenes, fuentes y SVG)
  - Enciclopedia: `enciclopedia.html` (índice) y 36 artículos de referencia con URL plana (`que-es-el-marketing-digital`, `marketing-tradicional-vs-digital`, `embudo-de-marketing`, `publicidad-pagada-vs-organica`, `analitica-digital`, `marketing-con-ia`, `core-update-google-noviembre-2026`, `chatgpt-ads-chile`, `sitio-web`, `tienda-online`, `crear-sitio-web-con-ia`, `perfil-de-empresa-google`, `whatsapp-business`, `meta-ads-vs-google-ads`, `biblioteca-de-anuncios`, `fechas-comerciales-chile`, `meta-andromeda`, `advantage-plus-meta`, `ai-max-google-ads`, `anuncios-con-ia`, `como-usar-ia-en-marketing`, `agentes-de-ia-marketing`, `ia-para-tu-marca`, `ia-para-redes-sociales`, `meta-business-agent`, `trafico-de-ia-en-ga4`, `agencia-freelance-o-equipo-interno`, `asesoria-de-marketing-digital`, `como-elegir-agencia-marketing-digital`, `brief-para-agencia-de-marketing`, `precio-agencia-marketing-digital`, `cuanto-invertir-en-publicidad-digital`, `cuentas-publicitarias-a-tu-nombre`, `auditoria-de-campanas-publicitarias`, `google-partner-meta-business-partner`, `kpis-para-evaluar-agencia-de-marketing`). Llevan referencias numeradas, schema Article + FAQPage + BreadcrumbList y su historial de actualizaciones: si cambias un dato, agrega una línea al historial y actualiza `dateModified`
- `DISENO.md`: sistema de diseño (colores, tipografías, componentes y reglas de movimiento). No se publica
- `contenido/`: borradores e investigación de los artículos (no se publica, está en `.gitignore`)
- `borradores/`: plantillas y contenido aún no publicado. Está en el repositorio, pero **no se publica** porque está fuera de `public/`

## Cómo publicar
- Cada push a `main` se publica solo en Cloudflare Pages (sin comando de build, directorio de salida `public`). En uno o dos minutos el cambio está en https://www.condadodigital.cl.
- **Después de cada deploy, purga la caché** de la zona condadodigital.cl. Usa las variables de entorno `CLOUDFLARE_API_TOKEN` (token «claude-code-purga», con permisos solo para purgar la caché y leer Pages) y `CLOUDFLARE_ZONE_ID`, guardadas en `~/.zshrc` de tu equipo:
  `curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H "Content-Type: application/json" --data '{"purge_everything":true}'`
  Nunca escribas el token en archivos del repositorio, en commits ni en la salida de un comando.
- Cloudflare quita la extensión `.html`: los enlaces internos, canonical, schema y `sitemap.xml` usan URL sin extensión (por ejemplo, `/glosario`).
- **`lastmod` del sitemap = `dateModified` de la página.** Cuando cambies el contenido de una página (texto, datos, FAQ, referencias o, en un listado, los elementos que muestra), sube su `dateModified` en el JSON-LD y pon esa misma fecha en su `<lastmod>`. Los cambios de plantilla (menú, pie, caja de autor, `?v=`, botones o enlaces «Véase también») no cambian ninguna de las dos fechas. Las páginas sin `dateModified` (inicio, landings, legales) solo cambian su `lastmod` cuando cambia su contenido.
- `/recursos` ya no existe: redirige con 301 a `/calculadoras` (`_redirects`).
- Cuando `/blog`, `/aprendizaje` y `/noticias` tengan contenido: quita su `<meta name="robots" content="noindex, follow">` y vuelve a agregarlas a `sitemap.xml`, `llms.txt` y al `INDICE` de `script.js` (el blog también al pie; de Aprendizaje quita la etiqueta «Próximamente» del pie). Para reactivar el contenido que estaba oculto, cópialo desde `borradores/inicio-proximos-articulos.html`, `borradores/blog-filtros-y-articulos.html` y `borradores/aprendizaje-capsulas.html`: cada bloque indica en qué página y en qué posición va.
- No usar la etiqueta «Nuevo» en tarjetas ni artículos, ni en los actuales ni en los futuros.
- Imágenes, fuentes y SVG tienen caché de 1 año: si reemplazas uno, usa un nombre de archivo nuevo y actualiza las referencias. `styles.css`, `script.js`, `conde.js` y los módulos de página llevan una misma versión en su URL (`?v=20261127a`): **cada vez que cambies uno de ellos, sube la versión en todas las páginas y en `script.js`** (que carga `conde.js`), por ejemplo:
  `sed -i '' 's/?v=20261127a/?v=20261201a/g' public/*.html public/script.js`
- Archivos internos: no hace falta ocultarlos. Si un archivo no debe publicarse, déjalo fuera de `public/` (por ejemplo, en `borradores/` o `contenido/`). Nunca pongas en `public/` notas, borradores ni archivos de trabajo.
- No dejes notas internas en comentarios HTML de las páginas publicadas: cualquiera puede verlas con «Ver código fuente». Las notas van en `borradores/`, en el README o en `contenido/`.

## Landings de servicios
- Son 5, con URL plana: `public/paid-media.html`, `public/social-media.html`, `public/mentorias.html`, `public/diseno-web.html` y `public/seo.html`. Usan las clases `pg-*` de `styles.css`.
- `/servicios` (`public/servicios.html`) es la landing general con los 5 servicios; «Servicios» del menú lleva ahí. Cada servicio se enlaza desde las filas del inicio (`/#servicios`), los bloques de `/servicios`, «Otros servicios» de cada landing (que termina en «Ver todos los servicios →»), la columna «Sobre» del pie y el buscador (`INDICE`). Las filas del inicio y los bloques de `/servicios` miden `servicio_click` con `ubicacion` (`inicio` o `servicios`). Todas están en `sitemap.xml` y `llms.txt`.
- Los botones «Cotizar …» y «Hablemos» son elementos `.abrir-contacto` (con `data-servicio="<id>"` cuando corresponde): abren el formulario emergente con ese servicio ya elegido. Los servicios son `paid-media`, `social-media`, `mentorias`, `diseno-web`, `seo` y `diagnostico` (constante `SV` en `script.js`). Sin JavaScript llevan a `/contacto?servicio=<id>`, que también deja el servicio elegido.
- El formulario (emergente y en `/contacto`) envía a Formspree nombre, empresa, correo, teléfono, `autoriza_whatsapp`, servicio, sitio, mensaje, `formulario=asesoria` y `origen`; si el envío sale bien, mide `generate_lead` y **redirige a `/gracias?servicio=<id>`**, que mide `gracias_vista`. `/gracias` es `noindex, nofollow` y no va en `sitemap.xml`.
- Si cambias una pregunta frecuente, cámbiala también en el JSON-LD `FAQPage` de esa página: el texto debe ser idéntico al visible.
- `/servicios/<x>` redirige con 301 a `/<x>` y `/quienes-somos` a `/acerca` (`_redirects`). La sección de servicios del inicio conserva el ancla antigua `#asesorias`. En `/servicios`, el único bloque que abre el formulario es «¿No sabes cuál necesitas?» (servicio `diagnostico`).

## El Conde (asistente guiado)
- Archivos: `public/conde.js` (chat guiado: cotizar, recomendación en 3 preguntas, «¿Qué significa…?» con buscador de los 168 términos, calculadoras y rutas de lectura; se descarga solo al abrirlo), `public/conde-terminos.json` (los términos que busca) e imágenes en `public/img/conde/`. Sus estilos (`ec-*`) están en `styles.css`. El botón y el aviso «¿Te ayudo?» los crea `script.js`. El Conde no aparece en los artículos de la Enciclopedia (clase `sin-conde` en el `<body>`).
- **Cada vez que cambies el glosario** (`public/glosario.html`), regenera los términos de El Conde y publica los dos archivos juntos:
  `node herramientas/generar-conde-terminos.mjs`
  Necesita Node.js 18 o superior. El script avisa cuántos términos escribió; si no encuentra ninguno o falta un dato, se detiene sin tocar el archivo.
- Si cambias `conde.js`, sube la versión como se indica arriba (el `sed` también actualiza la URL de `conde.js` dentro de `script.js`).

## Medición (GTM-NL52B7QZ)
Todos los eventos se envían con `dataLayer.push` y respetan el modo de consentimiento (`consent_update`, clave `cd_consentimiento`, 6 meses):
`generate_lead`, `gracias_vista`, `formulario_iniciado`, `servicio_click`, `conde_abierto`, `conde_opcion`, `conde_resultado`, `diagnostico_completado`, `glosario_quiz`, `calculadora_usada`, `calculadora_objetivo`, `embudo_usado`, `camila_paso`, `articulo_util` y `compartir`.

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
- Las plantillas de `borradores/` (artículo, noticia y cápsula) siguen con el diseño anterior: adáptalas a la cabecera, el pie y las clases nuevas antes de usarlas.
- Política de Privacidad 3.0 (23-11-2026): revisarla con un abogado y, si corresponde, sumar el responsable con RUT.
- Crear `glosario-roas.html`, `glosario-seo.html`, `glosario-sem.html` y `glosario-pixel.html`. Al publicar cada uno, enlázalo donde hoy aparece como texto sin enlace y súmalo al glosario y al buscador:
  - ROAS: `glosario.html` (cuadrícula), `script.js` (`INDICE`), `glosario-cpa.html` y `glosario-ltv.html` (Métricas/Términos relacionados), `preguntas-frecuentes.html` (respuesta «¿Qué es ROAS?»)
  - SEO: `glosario.html`, `script.js`, `glosario-aeo.html` y `glosario-geo.html` (texto y Términos relacionados)
  - SEM: `glosario.html`, `script.js`, `glosario-aeo.html` (Términos relacionados)
  - Pixel: `glosario.html`, `script.js`, `glosario-capi.html` y `glosario-gtm.html` (Términos relacionados)
- Enciclopedia: los datos que no se publicaron por falta de fuente están en `contenido/pendientes-enciclopedia.md` (solo local)
- 28 de noviembre de 2026: revisar si se aprobó la postergación de la Ley 21.719. Si cambió, actualizar chatgpt-ads-chile (Críticas y limitaciones, paso 4 de Cómo aplicarlo y pregunta relacionada) y analitica-digital, con línea en el historial y dateModified.
- Cuando Google dé por terminado el core update de noviembre 2026: actualizar core-update-google-noviembre-2026 (tabla de fechas, pregunta ¿Cuándo termina?, historial y dateModified).
- Revisar Core Web Vitals de campo (PageSpeed) de los artículos 09 a 16 hacia el 13-12-2026.
