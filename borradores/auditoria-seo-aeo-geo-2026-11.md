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

---

## 3. AEO: respuestas directas para Google y fragmentos destacados

### 3.1 Respuesta en las primeras líneas

- **Los 36 artículos abren con una definición directa** del tipo «X es…», de 37 a 74 palabras, en el lead visible bajo el H1 (por ejemplo: «Meta Andromeda es el sistema de inteligencia artificial que hace la primera selección de anuncios en Facebook e Instagram…»). Es el formato que Google y los asistentes toman como fragmento.
- **La excepción que más importa es /fechas-comerciales-chile.** Es la página con más impresiones del sitio (2.248, el 69 % del total), y su consulta principal es una pregunta de fecha: «cuándo es el próximo black friday o cyber day» (113 impresiones, posición 8), «cuando hay cyber o black friday» (41), «black friday 2027 chile» (36, posición 5,5), «cuando hay ofertas en chile» (32). Pero el lead define el concepto: «Las fechas comerciales son los días o eventos del año en que el consumo se concentra…». La respuesta a «cuándo» no está en las dos primeras líneas. **Recomendación:** que la primera frase diga cuál es el próximo evento y su fecha («El próximo evento de descuentos en Chile es el … del … de 202x; luego vienen…»), con una tabla corta de próximas fechas justo debajo. Esta página tiene CTR de 0,22 % en posición 7,7: mejorar el fragmento es la palanca más directa de clics del sitio.
- **Fichas del glosario:** la primera línea visible es la sigla desarrollada («Click-Through Rate — Tasa de clics») y la definición viene después. Las búsquedas de fórmula («fórmula ctr», «cpm fórmula», «cómo se calcula el ctr») no encuentran la fórmula en la primera línea. Conviene poner primero la definición y la fórmula en una línea («El CTR es el porcentaje de impresiones que terminan en clic: CTR = clics ÷ impresiones × 100»).

### 3.2 H2 como preguntas

- 124 de 234 H2 temáticos (53 %) ya tienen forma de pregunta o empiezan con «Cómo/Qué/Cuánto». Excluí los fijos de la plantilla (Críticas, En Chile, Cómo aplicarlo, Hacia 2027-2028, Postura, Bibliografía, FAQ, Véase también, Referencias e Historial).
- **Los que menos lo cumplen:** /kpis-para-evaluar-agencia-de-marketing (1 de 6), /marketing-con-ia (1 de 5), /agentes-de-ia-marketing, /ai-max-google-ads, /analitica-digital, /brief-para-agencia-de-marketing, /como-elegir-agencia-marketing-digital, /embudo-de-marketing, /ia-para-redes-sociales, /publicidad-pagada-vs-organica y /que-es-el-marketing-digital (2 de 5 o 6 cada uno).
- **Ejemplos de reescritura sin cambiar el contenido:** «Definición y alcance» → «¿Qué es el marketing digital y qué incluye?»; «Los canales principales» → «¿Cuáles son los canales del marketing digital?»; «Eventos comerciales del año en Chile» → «¿Cuándo son los eventos de descuentos en Chile en 2026 y 2027?»; «Fórmula» (glosario) → «¿Cómo se calcula el CTR?».
- **Respuesta justo bajo el H2:** en los artículos nuevos, el primer párrafo de cada sección responde. En los antiguos hay H2 que abren con contexto («Por qué el calendario importa tanto…»). Regla para todo el sitio: la primera oración bajo cada H2 debe responder el H2 en 25 palabras o menos.

### 3.3 Preguntas frecuentes vs búsquedas reales

- Las FAQ de los 36 artículos y de las fichas son **idénticas a su FAQPage** (revisión automática, 0 diferencias).
- Cruce con Search Console (28 días):

| Página | Búsqueda real con impresiones | ¿Hay una FAQ que la responda? |
|---|---|---|
| /fechas-comerciales-chile | «cuándo es el próximo black friday o cyber day» (113), «black friday 2027 chile» (36+10), «cuando es el cyber en noviembre» (25) | **No.** Solo hay «¿Cuándo es el CyberDay 2027?». Faltan «¿Cuándo es el próximo Black Friday en Chile?» y «¿Cuándo es el próximo Cyber en Chile?» |
| /glosario-gtm | «gtm» (109), «auditar gtm» (14), «auditoria gtm» (6) | Sí: «¿Qué es GTM?» y «¿Cómo auditar Google Tag Manager?» |
| /glosario-cvr | «que es cvr en meta» (8), «que es cvr en meta ads» (4), «cvr formula» (5) | Sí: «¿Qué es el CVR en Meta Ads?». Falta la fórmula en la primera línea |
| /glosario-ctr | «formula ctr» (17), «como calcular ctr» (15), «como se calcula ctr» (11) | Sí: «¿Cómo se calcula el CTR?». La posición es lejana (60–90): es un tema de autoridad e indexación, no de FAQ |
| /sitio-web | «cuánto cuesta una página web en chile» y variantes (≈15 en total) | Sí: «¿Cuánto cuesta hacer una página web en Chile?» |
| /que-es-el-marketing-digital | «que es marketing digital» (2), «marketing digital que es y para que sirve» (3) | Parcial: no hay «¿Para qué sirve el marketing digital?» |

### 3.4 Tablas y listas donde la búsqueda pide comparar o seguir pasos

- 30 de 36 artículos tienen al menos una tabla. **Sin ninguna tabla:** /sitio-web, /tienda-online, /crear-sitio-web-con-ia, /perfil-de-empresa-google, /whatsapp-business y /biblioteca-de-anuncios.
- **Las que más la necesitan:**
  - /sitio-web: tabla «Costo del primer año por tipo de sitio (en pesos)». Es la intención de unas 15 búsquedas de precio.
  - /tienda-online: comparación Shopify vs Jumpseller vs Tiendanube (comisión, plan inicial, pagos locales). Ya la responde una FAQ, pero sin tabla.
  - /whatsapp-business: «App de WhatsApp Business vs API (WhatsApp Business Platform)».
  - /perfil-de-empresa-google: checklist de verificación y campos.
- Las listas numeradas de pasos («Cómo aplicarlo en tu pyme») existen en todos los artículos.

---

## 4. GEO: que ChatGPT, Gemini, Perplexity, Copilot y Claude nos encuentren y nos citen

### 4.1 robots.txt y bots de IA

**robots.txt publicado** (idéntico al del repositorio; Cloudflare no lo modifica):

```
User-agent: *
Allow: /

# Buscadores y asistentes de IA (permitidos)
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: GPTBot
User-agent: PerplexityBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Bingbot
Allow: /

Sitemap: https://www.condadodigital.cl/sitemap.xml
```

Nombres vigentes, verificados en la documentación oficial (27-11-2026):

| Empresa | Robot | Para qué sirve | ¿Permitido? |
|---|---|---|---|
| OpenAI | OAI-SearchBot | Mostrar sitios en la búsqueda de ChatGPT | Sí |
| OpenAI | GPTBot | Entrenamiento de modelos | Sí |
| OpenAI | ChatGPT-User | Visitas pedidas por una persona (OpenAI dice que robots.txt puede no aplicarse) | Sí |
| Anthropic | Claude-SearchBot | Índice de búsqueda de Claude | Sí |
| Anthropic | Claude-User | Visitas pedidas por una persona en Claude | Sí |
| Anthropic | ClaudeBot | Entrenamiento | Sí |
| Perplexity | PerplexityBot | Índice de búsqueda de Perplexity | Sí |
| Perplexity | Perplexity-User | Visitas pedidas por una persona (en general ignora robots.txt) | Sí, por `User-agent: *` (no está nombrado) |
| Google | Google-Extended | Token de control para entrenamiento y grounding de Gemini; no es un rastreador ni afecta a la Búsqueda | Sí |
| Microsoft | Bingbot | Índice de Bing, que usan Copilot y otros asistentes | Sí |
| Apple | Applebot / Applebot-Extended | Búsqueda de Apple (Siri, Spotlight) / control de entrenamiento | Sí, por `User-agent: *` (no están nombrados) |

Fuentes: [OpenAI, Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots); [Anthropic, ¿Anthropic rastrea la web?](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler); [Perplexity Crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers); [Google, Google-Extended](https://developers.google.com/crawling/docs/google-extended) y [rastreadores comunes de Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers); [Apple, About Applebot](https://support.apple.com/en-us/119829).

**Prueba contra Cloudflare:** pedí /meta-andromeda con el user-agent de GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Applebot, Bingbot, Googlebot, Bytespider y CCBot. Todos respondieron **200**. Las cabeceras no traen `X-Robots-Tag` y `cf-cache-status` es `DYNAMIC`. Esta prueba sale desde una IP que no es la de los bots. Cloudflare puede bloquear a los bots verificados por su IP con «Bloquear bots de IA» o «AI Crawl Control», y eso solo se ve en el panel: **por validar** en Cloudflare → condadodigital.cl → Seguridad → Bots (y AI Crawl Control). Si ahí aparece «Block AI bots» activado, desactívalo, o deja bloqueados solo los de entrenamiento si esa es tu decisión. No lo cambié.

**Mejora opcional:** nombrar explícitamente a Perplexity-User, Applebot y Applebot-Extended en robots.txt. Hoy ya están permitidos por `*`; nombrarlos sirve para documentar la decisión.

### 4.2 llms.txt

- Publicado y al día: 36 artículos, 16 fichas del glosario, 5 servicios, /servicios, /calculadoras (20 calculadoras), /glosario (168 términos), /herramientas, /preguntas-frecuentes y redes.
- **Faltan descripciones:** los 20 artículos nuevos tienen descripción («: Andromeda es la IA de Meta…»), pero los **16 artículos antiguos y las 16 fichas del glosario son solo título y enlace**. Agregar una línea por cada uno, igual que en los nuevos, ayuda a los asistentes a decidir cuál citar.
- Falta una línea que diga cómo citar y quién es el autor de las guías.

### 4.3 Entidad de marca: Organization y Person

- **Nombre, URL, logo y sameAs** son los mismos en las 54 páginas con el nodo completo: Instagram, LinkedIn de la empresa, TikTok, YouTube, Facebook, X y Threads.
- **Inconsistencias:**
  - El correo de contacto (`hola@condadodigital.cl`) solo aparece en 1 de 60 nodos Organization, y ningún nodo tiene `contactPoint`.
  - Las 5 landings llevan un Organization reducido, sin logo ni sameAs. Se resuelve por `@id`, pero conviene completarlo.
  - Person tiene dos `jobTitle` distintos para el mismo `@id`.
- **El logo es SVG.** Google pide para el logo de Organization una imagen de al menos 112×112 px en un formato compatible con Google Imágenes (**por validar** si toma el SVG). Es más seguro sumar un PNG de 512×512.
- **/acerca** (457 palabras) muestra la autoría con foto, LinkedIn, Duoc UC, Universidad Adolfo Ibáñez y los mercados donde ha trabajado (Chile, Perú, Colombia). **No muestra** años de experiencia, certificaciones (Google Ads, Meta Blueprint o similares), clientes o casos con resultados, ni un correo visible. Para E-E-A-T y para que un asistente describa a Esleyter Conde con datos verificables, esos cuatro elementos son lo que falta.

### 4.4 Contenido citable

- **Bien:**
  - Los 36 artículos tienen autor visible, «Actualizado el …» o «Publicado y actualizado el …», minutos de lectura, «Verificado con N fuentes», referencias numeradas con enlace, historial y `dateModified` en el JSON-LD.
  - Las definiciones del lead son frases autocontenidas de una o dos oraciones.
- **Mejorable:**
  1. **Datos propios:** hoy casi todo se cita de terceros. Una tabla propia (por ejemplo, «CPM y CPC de Meta en Chile, mediana de N cuentas gestionadas, nov 2026», anonimizada) es lo que más cita una IA, porque no está en otro lado.
  2. **Fechas en la primera línea** de las páginas de actualidad: /fechas-comerciales-chile, /core-update-google-noviembre-2026 y /chatgpt-ads-chile.
  3. **Fichas del glosario:** la definición citable debería ser la primera oración (sección 3.1).

### 4.5 Bing e IndexNow

- No hay etiqueta `msvalidate.01` ni `BingSiteAuth.xml` (404), y en este Chrome no hay sesión en Bing Webmaster Tools. **Por validar** si el sitio ya se importó desde Search Console; lo más probable es que no.
- No hay archivo de clave de IndexNow. Con Cloudflare se puede activar **Crawler Hints**, que avisa a IndexNow cuando cambia el contenido; es gratis en todos los planes ([Cloudflare, Crawler Hints](https://developers.cloudflare.com/cache/about/crawler-hints/)). IndexNow lo usan Bing y Yandex, entre otros ([Bing Webmaster Blog](https://blogs.bing.com/webmaster/november-2021/Cloudflare-Supports-IndexNow-via-one-click-Integration)). Esto importa porque Copilot y otros asistentes se apoyan en el índice de Bing.
