# Auditoría SEO, AEO y GEO de condadodigital.cl

**Fecha:** 27 de noviembre de 2026 · **Alcance:** las 74 páginas HTML de `public/` (68 indexables + 6 con `noindex`) y el sitio publicado en https://www.condadodigital.cl · **Rama:** `auditoria-seo` (solo revisión: no se cambió nada en `public/`).

**Fuentes de datos usadas en todo el informe**

- **Search Console** (propiedad de dominio `sc-domain:condadodigital.cl`), consultada por la API de solo lectura y en la interfaz. Hay datos desde el 29-10-2026: los 28 días (29-10 al 25-11-2026) y los 3 meses dan exactamente lo mismo (3.238 impresiones, 23 clics, CTR 0,71 %, posición media 19,2). Inspección de URL de las 68 páginas del sitemap el 27-11-2026.
- **GA4** (propiedad 563148141, flujo G-KFEPYR64V6), últimos 28 días (30-10 al 26-11-2026), leída en la interfaz sin cambiar nada.
- **Lighthouse 12** local, perfil móvil, sobre el sitio publicado (27-11-2026).
- **Código publicado**: descargué las 74 páginas. La única diferencia con el repositorio es el script de Cloudflare Web Analytics que Cloudflare inyecta al final de cada página (`static.cloudflareinsights.com/beacon.min.js`). `robots.txt`, `sitemap.xml` y `llms.txt` publicados son idénticos al repositorio.

Lo que no pude confirmar está marcado como **por validar**.

---

## 1. SEO técnico

### 1.1 Indexación: el problema más grande hoy

De las 68 URL del sitemap, **36 están indexadas y 32 no** (inspección de URL de Search Console, 27-11-2026). El informe «Indexación de páginas» muestra 24 indexadas y 33 sin indexar, con fecha de corte anterior.

| Estado en Search Console | Páginas |
|---|---|
| **Rastreada: actualmente sin indexar** (Google la visitó el 10-11-2026 y decidió no indexarla) | /glosario, /herramientas, /terminos, /glosario-aeo, /glosario-geo, /embudo-de-marketing, /publicidad-pagada-vs-organica, /marketing-con-ia |
| **Descubierta: actualmente sin indexar** (Google conoce la URL pero no la ha rastreado) | /glosario-cac, /glosario-capi, /glosario-cpa, /glosario-cro, /glosario-ga4, /glosario-utm, /marketing-tradicional-vs-digital, /tienda-online, /crear-sitio-web-con-ia, /whatsapp-business, /meta-ads-vs-google-ads, /anuncios-con-ia, /como-usar-ia-en-marketing, /agentes-de-ia-marketing, /ia-para-tu-marca, /agencia-freelance-o-equipo-interno, /asesoria-de-marketing-digital, /cuentas-publicitarias-a-tu-nombre, /google-partner-meta-business-partner |
| **Google no reconoce esta URL** | /chatgpt-ads-chile, /biblioteca-de-anuncios, /ia-para-redes-sociales, /brief-para-agencia-de-marketing, /kpis-para-evaluar-agencia-de-marketing |

Lectura:

- Las 8 «rastreadas sin indexar» se visitaron **una sola vez, el 10-11-2026**, antes del rediseño y de la mayoría de las mejoras de contenido. Google no ha vuelto. Entre ellas está **/glosario**, el centro de las 16 fichas, y tres artículos pilares.
- Las «descubiertas» son normales en un dominio de un mes con poca autoridad: Google rastrea con presupuesto bajo. Los 20 artículos publicados hoy ya tienen 9 indexados en horas (Andromeda, Advantage+, AI Max, Meta Business Agent, tráfico de IA, cómo elegir agencia, precio de agencia, cuánto invertir y auditoría), lo que confirma que el sitio no tiene un bloqueo técnico.
- No hay errores técnicos: robots.txt permite todo, no hay `noindex` indebido, los canonical son propios y el sitemap no tiene errores (Search Console: 1 sitemap, 0 errores).

**Qué hacer:** pedir la indexación manual en Search Console (Inspección de URL → «Solicitar indexación») empezando por /glosario, /marketing-con-ia, /meta-ads-vs-google-ads, /chatgpt-ads-chile, /embudo-de-marketing y /publicidad-pagada-vs-organica. Google limita estas solicitudes por día (cuota exacta por validar), así que conviene ir de a 10. Además, sumar enlaces hacia esas páginas desde las que ya están indexadas y tienen impresiones (/fechas-comerciales-chile, /glosario-gtm, /glosario-cvr, /sitio-web).

### 1.2 Title y meta description

- **Duplicados:** ninguno (0 titles y 0 descriptions repetidos en 74 páginas).
- **Title fuera de 30–60 caracteres:** 28 páginas indexables. La causa casi siempre es el sufijo « — Condado Digital» (19 caracteres), que deja la parte útil fuera del corte del resultado:
  - Las 16 fichas del glosario (64–74 caracteres; por ejemplo, «¿Qué es el CPL en marketing? Costo por lead y fórmula — Condado Digital», 71).
  - /analitica-digital (71), /calculadoras (75), /embudo-de-marketing (82), /fechas-comerciales-chile (75), /glosario (80), /herramientas (72), el inicio (72), /marketing-con-ia (75), /marketing-tradicional-vs-digital (83), /publicidad-pagada-vs-organica (80) y /que-es-el-marketing-digital (79).
  - /contacto tiene 26 (corto).
- **Description fuera de 120–160:** /calculadoras (163), /glosario (171), el inicio (164), /marketing-con-ia (161), /privacidad (167), /contacto (94), /herramientas (114) y /preguntas-frecuentes (110).
- **Palabra clave al inicio:** se cumple en los 20 artículos nuevos y en las fichas del glosario, aunque estas empiezan con «¿Qué es…?» y no con la sigla. No se cumple en el inicio («Condado Digital — …»), en /enciclopedia ni en /glosario: ahí la marca va primero o la palabra clave queda tras el sufijo. Las propuestas están en la sección 7.

### 1.3 Canonical, robots y sitemap

- **Canonical:** las 68 indexables tienen canonical propio, absoluto y sin `.html`. Google eligió el mismo canonical en las 36 indexadas (inspección de URL).
- **noindex:** solo en /404, /aprendizaje, /blog, /buscar, /gracias (`noindex, nofollow`) y /noticias. Es lo esperado.
- **sitemap.xml:** 68 URL, exactamente las indexables. Ninguna sobra ni falta, y el `lastmod` coincide con `dateModified` en todas las páginas que lo tienen.

### 1.4 Redirecciones

- `_redirects` tiene 8 reglas (/sobre-mi, /quienes-somos, /recursos, /servicios/:slug y /calculadoras/:slug). Ninguna encadena otra redirección.
- Normalización del dominio: `https://condadodigital.cl/` y `http://www.condadodigital.cl/` responden con un solo 301 a `https://www.condadodigital.cl/`. `/meta-andromeda.html` y `/meta-andromeda/` responden con un solo 308 a `/meta-andromeda`.
- **Enlaces internos a URL que redirigen: 0** (revisados todos los `href` de las 74 páginas).

### 1.5 Encabezados

- **Un solo H1 por página** en las 74 y ningún salto de nivel (H2→H4).
- **H1 pegado en el texto extraído:** el H1 en dos líneas de artículos y landings se arma con `<span class="ln">` sin espacio entre líneas. El texto plano que extraen los bots queda «Sitioweb», «MetaAndromeda» o «Cuánto cuestauna agencia». Google renderiza el CSS (las líneas son bloques) y probablemente lo separa (**por validar**), pero los lectores de texto plano y algunos bots de IA lo leen pegado. Se arregla con un espacio entre los dos `<span>`, sin cambio visual.
- **H1 de las landings con palabras rotativas:** el texto del H1 incluye todas las variantes. En /paid-media se lee «Paid Media que se mide en ventas. ventas. leads. pesos. ventas.». En /enciclopedia hay una versión `sr-only` y la animación va con `aria-hidden`, que es la buena práctica. Conviene llevar ese mismo patrón a las 5 landings.
- **H2 de los artículos:** 124 de 234 H2 temáticos (53 %) ya tienen forma de pregunta o «cómo/qué». El detalle está en la sección 3.

### 1.6 Enlaces internos

- **Profundidad:** todas las páginas indexables están a 2 clics o menos del inicio, gracias al menú, el pie, /enciclopedia y /glosario.
- **Huérfanas:** solo /404, /blog, /gracias y /noticias, que son `noindex`. Ninguna indexable está huérfana.
- **Textos de enlace genéricos** («aquí», «ver más», «leer más»): 0 en el contenido. Las tarjetas de /enciclopedia envuelven todo el texto de la tarjeta, así que el texto del enlace es descriptivo.
- **Pares que no se enlazan entre sí** (detalle en la sección 2): /meta-andromeda ↔ /advantage-plus-meta, /precio-agencia-marketing-digital ↔ /cuanto-invertir-en-publicidad-digital y /diseno-web → /sitio-web.

### 1.7 Imágenes

- Solo hay 4 imágenes en uso: avatar.jpg (21 KB, 400×400), retrato.jpg (164 KB, 900×1200), manifiesto-portada-2026.jpg (38 KB) y og-condado-digital.jpg (62 KB, 1200×630). Todas tienen `alt` y `width`/`height`.
- **retrato.jpg** pesa 164 KB en JPG. Con WebP o AVIF bajaría a unos 40 KB (estimado).
- hero.jpg, hero.webp y hero-movil.webp siguen en `public/img/` aunque el README dice que no se usan.
- **Los artículos no tienen imagen propia**: todos usan la misma og-condado-digital.jpg. Esto limita Discover y las miniaturas en resultados (secciones 5 y 8).

### 1.8 Rendimiento (Lighthouse 12, móvil simulado, sitio publicado)

| Página | Rendimiento | LCP | CLS | TBT* | FCP | JS sin usar | CSS sin usar | Peso |
|---|---|---|---|---|---|---|---|---|
| / | 59 | 4,0 s | 0,009 | 1.040 ms | 2,1 s | 151 KB | 23 KB | 632 KB |
| /servicios | 82 | 4,1 s | 0 | 170 ms | 2,1 s | 150 KB | 25 KB | 578 KB |
| /paid-media | 72 | 6,6 s | 0 | 160 ms | 2,2 s | 151 KB | 25 KB | 580 KB |
| /enciclopedia | 70 | 7,6 s | 0 | 200 ms | 2,2 s | 150 KB | 25 KB | 587 KB |
| /fechas-comerciales-chile | 62 | 8,0 s | 0 | 250 ms | 2,5 s | 151 KB | 24 KB | 605 KB |
| /meta-andromeda | 61 | 8,0 s | 0 | 270 ms | 3,5 s | 150 KB | 24 KB | 604 KB |
| /sitio-web | 59 | 7,5 s | 0 | 260 ms | 4,6 s | 151 KB | 24 KB | 607 KB |

\*Lighthouse no mide INP en laboratorio. TBT es el indicador más cercano; en /meta-andromeda el «máximo retraso potencial de la primera entrada» es 150 ms.

Accesibilidad, Prácticas recomendadas y SEO dan 100 en las 7 páginas, salvo Accesibilidad 96 en el inicio.

**Causas, con evidencia del informe de Lighthouse:**

1. **El aviso de cookies es el LCP.** En /paid-media, /enciclopedia, /fechas-comerciales-chile, /meta-andromeda y /sitio-web, el elemento LCP es `section.ck-card > div > div > p` («Usamos las necesarias para que el sitio funcione…»). El aviso se inserta con JavaScript después de cargar la página, y como es el bloque de texto más grande de la primera pantalla del teléfono, el LCP se mide cuando aparece, entre 6,6 y 8 s. Es la mejora de rendimiento más barata: incluir el aviso en el HTML inicial (oculto con CSS si ya hay consentimiento) o mostrarlo sin animación de entrada. Esto **por validar** con datos de campo (CrUX), que hoy no existen por el bajo tráfico.
2. **Etiquetas de Google: 150 KB de JS sin usar.** `gtag/js?id=G-KFEPYR64V6` (84 KB sin usar de 199 KB) y `gtm.js?id=GTM-NL52B7QZ` (70 KB sin usar de 177 KB), con 184 ms de bloqueo del hilo principal. Es código de terceros, así que el margen es limitado. Si GTM ya carga la etiqueta de GA4, revisa que no se esté cargando además otra etiqueta de Google por separado (**por validar** en el contenedor).
3. **styles.css bloquea el renderizado unos 905 ms** (29 KB). Se puede incrustar en línea el CSS crítico de la primera pantalla, o al menos el de la cabecera y el hero.
4. **Inicio: TBT de 1.040 ms.** Lo explican el video del manifiesto, la intro animada y `inicio.js`.
5. **Accesibilidad del inicio (96):** contraste insuficiente en `.mq-m` («Toca la tarjeta ↻»), y botones y enlaces cuyo `aria-label` no contiene el texto visible (`label-content-name-mismatch`): el video y las filas de servicios (`aria-label="Ver el servicio de Paid Media"` sobre un texto visible distinto).

### 1.9 Datos estructurados

| Tipo de página | JSON-LD actual | Estado |
|---|---|---|
| Inicio | WebSite, Organization, Person (con alumniOf, knowsAbout y retrato) | Bien. Al WebSite le falta `potentialAction` SearchAction hacia /buscar (opcional; Google ya no muestra el cuadro de búsqueda de sitio, así que es de baja prioridad) |
| 36 artículos | Article (author, publisher, citation, wordCount, fechas), FAQPage, BreadcrumbList, Person, Organization | Bien. FAQPage idéntico al texto visible en todos. La imagen es la genérica en los 36 |
| 16 fichas del glosario | DefinedTerm + Article + BreadcrumbList (+ FAQPage en CPL, CPM, CTR, CVR y GTM) | Bien |
| /glosario | DefinedTermSet + BreadcrumbList | Bien |
| /enciclopedia | CollectionPage + ItemList (36) + BreadcrumbList | Bien |
| 5 landings | Service (provider, areaServed: Chile y Latinoamérica, availableLanguage) + FAQPage + BreadcrumbList | Bien. Falta `offers` o `priceRange` si quieres mostrar desde cuánto cobras (opcional) |
| /servicios | ItemList de 5 Service + BreadcrumbList | Bien |
| /calculadoras | WebPage + BreadcrumbList | Le falta `ItemList` de las 20 calculadoras o `WebApplication` (opcional) |
| /acerca | AboutPage, Organization, Person, WebSite, BreadcrumbList | Bien |
| /contacto | ContactPage, WebSite, BreadcrumbList | **Falta ContactPoint** en Organization (correo hola@condadodigital.cl) |
| /preguntas-frecuentes | FAQPage | Falta BreadcrumbList |
| /herramientas | **sin JSON-LD** | Falta WebPage + BreadcrumbList (y está «rastreada sin indexar») |

**Coherencia de la entidad** (detalle en la sección 4):

- `Organization` aparece en 60 páginas con el mismo `@id`. En 54 lleva logo y `sameAs`, en 1 suma el correo y en 5 (las landings) va reducida a nombre y URL. Google une los nodos por `@id`, así que no es un error, pero el correo debería estar en todas.
- `Person` (Esleyter Conde) aparece con dos `jobTitle` distintos para el mismo `@id`: «Creador de Condado Digital» en 36 nodos de autor y «Especialista en Paid Media, Social Media y Growth» en 52. Conviene unificar.
- No hay errores de sintaxis en ningún bloque JSON-LD (74 páginas analizadas).

---

## 2. Canibalización y contenido

### 2.1 Lo que dice Search Console

- El detector de canibalización (consultas donde varias páginas del sitio se reparten impresiones) **no encuentra conflictos** en los 28 días. Es esperable: casi todas las consultas tienen una sola página que aparece.
- **Sí hay una página equivocada para la intención comercial: /sitio-web.** Recibe 298 impresiones (posición media 61) por búsquedas de compra como «páginas web chile» (35 impresiones), «páginas web» (19 + 22), «paginas web para negocios» (9), «cotizar página web» (6), «creación de páginas web chile» (5), «planes páginas web chile» (5) y «sitio web desde 100.000» (9). En esas búsquedas Google muestra el artículo, y **/diseno-web**, que es la landing que debería competir, tiene **2 impresiones** (posición 78).
- /que-es-el-marketing-digital aparece en «marketing digital» (54 impresiones, posición 63,5) y «marketing» (24, posición 21,3). Son genéricas y difíciles; no compiten con otra página del sitio.

### 2.2 Pares revisados

| Par | Página principal | Qué cambiar en la otra | Enlaces hoy |
|---|---|---|---|
| /sitio-web vs /diseno-web | **/diseno-web** para «diseño de páginas web», «cotizar», «precio» y «creación de páginas web». **/sitio-web** para «qué es un sitio web», «cómo hacer» y «cuánto cuesta un sitio web en Chile» (informativa) | En **/sitio-web**: llevar la sección de costos a una respuesta informativa (rangos y de qué depende) y cerrarla con un enlace visible «¿Quieres que lo hagamos? → Diseño web». Además, sumar el bloque «Hablemos» con botón a /diseno-web: los 16 artículos antiguos no tienen ese bloque, y /tienda-online y /crear-sitio-web-con-ia no enlazan nunca a /diseno-web. En **/diseno-web**: title «Diseño de páginas web para pymes en Chile», incluir rangos de precio o «desde» si el negocio lo permite, y un enlace a /sitio-web («Antes de cotizar, lee qué incluye un sitio web») | /sitio-web → /diseno-web: 1 enlace en el texto. /diseno-web → /sitio-web: **ninguno** |
| /precio-agencia-marketing-digital vs /cuanto-invertir-en-publicidad-digital vs /paid-media | **/precio-agencia…** para «cuánto cuesta una agencia» (el fee). **/cuanto-invertir…** para «presupuesto de publicidad» (la inversión en medios). **/paid-media** para «agencia de paid media / gestión de campañas» | Son intenciones distintas, pero el lector confunde fee e inversión. En cada artículo, una línea temprana que derive a la otra («¿Buscas cuánto cobra la agencia, no cuánto poner en anuncios? → …») y un enlace cruzado | /precio ↔ /cuanto-invertir: **sin enlaces entre sí**. Ambos llevan a /paid-media por el botón de «Hablemos». /paid-media → /precio: «Lecturas recomendadas» |
| /asesoria-de-marketing-digital vs /mentorias | **/mentorias** para «mentoría / aprender Google Ads, Meta Ads y GA4». **/asesoria…** para «asesoría de marketing digital» (informativa: qué es y cuándo conviene) | En /asesoria…: el CTA ya va a /mentorias. Suma en el primer tercio una frase que diga qué servicio de Condado Digital corresponde a una asesoría y en qué se diferencia de la mentoría | Enlazados en ambos sentidos |
| /como-usar-ia-en-marketing vs /marketing-con-ia | **/marketing-con-ia** para «marketing con IA / inteligencia artificial en marketing» (pilar). **/como-usar-ia…** para «cómo usar IA en marketing / prompts» (práctica) | Diferenciar los title: el pilar como panorama («qué sirve y qué es humo») y la guía como práctica («10 prompts y pasos»). /marketing-con-ia está **rastreada sin indexar**: conviene reforzarla (actualizar y enlazar desde las guías de IA) antes de crear más contenido de IA | Enlazados en ambos sentidos |
| /meta-andromeda vs /advantage-plus-meta | Intenciones distintas: **Andromeda** es el motor de selección de anuncios y **Advantage+** las automatizaciones de campaña. No canibalizan | Enlazarlos entre sí: en Andromeda, donde menciona Advantage+; en Advantage+, donde explica la entrega | **Ninguno de los dos enlaza al otro** |

### 2.3 Otros riesgos de contenido

- **/glosario-gtm** aparece por «gtm» (109 impresiones, posición 13,4) y por «auditar gtm» o «auditoría gtm» (21 impresiones, posiciones 70–81). La ficha mezcla definición y auditoría. Una sección corta «Cómo auditar tu contenedor de GTM», con un H2 propio, puede subir en las segundas. A futuro podría ser un artículo propio.
- **Fórmulas del glosario** («cómo se calcula el ctr», «fórmula cpm», «fórmula ctr»: más de 100 impresiones en conjunto, posiciones 60–90). Las fichas existen, pero Google las ve lejos. Una línea de fórmula en texto plano bien visible justo bajo el H1 (por ejemplo, «CTR = clics ÷ impresiones × 100») y un enlace a la calculadora correspondiente es lo que piden esas búsquedas.
