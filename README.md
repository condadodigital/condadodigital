# Condado Digital

Sitio estático (HTML, CSS y JS, sin build) de **Condado Digital**, el rincón honesto del marketing digital.
Publicado en https://www.condadodigital.cl

## Estructura
- `index.html` y demás páginas en la raíz
- `styles.css`: sistema de diseño (paleta y tipografías al inicio del archivo)
- `script.js`: menú móvil y buscador (agrega cada contenido nuevo al arreglo `INDICE`)
- `img/`: avatar.jpg, retrato.jpg, hero.jpg
- `plantilla-articulo.html`, `noticia-plantilla.html`, `capsula-plantilla.html`: plantillas (noindex)

## Cómo publicar
- Cada push a `main` se publica solo en Cloudflare Pages (sin comando de build). En uno o dos minutos el cambio está en https://www.condadodigital.cl.
- Cloudflare quita la extensión `.html`: los enlaces internos, canonical, schema y `sitemap.xml` usan URL sin extensión (por ejemplo, `/glosario`).
- Cuando `/blog`, `/aprendizaje` y `/noticias` tengan contenido: quita su `<meta name="robots" content="noindex, follow">` y vuelve a agregarlas a `sitemap.xml`. En `/blog` y `/aprendizaje`, reactiva también el contenido marcado con `OCULTO hasta publicar`.
- Archivos internos: `functions/_middleware.js` y `_routes.json` hacen que `README.md`, `.gitignore` y esos mismos archivos respondan 404 en el sitio. Si agregas otro archivo que no deba publicarse, súmalo en ambos.

## Pendientes
- Pegar el código de Formspree en `contacto.html` (reemplazar `TU_ID_FORMSPREE`)
- Crear `glosario-roas.html`, `glosario-seo.html`, `glosario-sem.html` y `glosario-pixel.html`
