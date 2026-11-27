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

---

## 5. De la búsqueda al clic (CTR)

Contexto: el sitio tiene un mes en Google. En 28 días suma 3.238 impresiones y 23 clics (CTR 0,71 %, posición media 19,2). El inicio aporta 14 de los 23 clics, casi todos por búsquedas de marca.

### 5.1 Páginas con más de 100 impresiones y CTR menor a 2 %

| Página | Impresiones | Clics | CTR | Posición | Lectura |
|---|---|---|---|---|---|
| /fechas-comerciales-chile | 2.248 | 5 | 0,22 % | 7,7 | **Prioridad 1.** Está en la primera página y casi nadie hace clic: el title y el fragmento no responden «cuándo» (sección 3.1) |
| /sitio-web | 298 | 0 | 0 % | 61 | Aparece por búsquedas comerciales de «páginas web» que no son su intención (sección 2) |
| /glosario-gtm | 149 | 0 | 0 % | 26,4 | «gtm» (109 impresiones, posición 13,4) |
| /que-es-el-marketing-digital | 133 | 0 | 0 % | 48,6 | Genéricas («marketing digital», «marketing»). Lejos |
| /glosario-ctr | 112 | 1 | 0,89 % | 64,4 | Búsquedas de fórmula, lejos |

Casi en el umbral: **/glosario-cvr**, con 99 impresiones, 0 clics y **posición 9,6** («que es cvr en meta» posición 7,3; «que es el cvr» 9,9; «cvr formula» 8,6). Está en primera página y el title es mejorable (sección 7).

### 5.2 Consultas con más de 100 impresiones y CTR menor a 2 %

| Consulta | Página | Impresiones | CTR | Posición |
|---|---|---|---|---|
| cuándo es el próximo black friday o cyber day | /fechas-comerciales-chile | 113 | 0 % | 8,0 |
| gtm | /glosario-gtm | 109 | 0 % | 13,4 |

### 5.3 Consultas en posición 5 a 15 (con 10 o más impresiones y CTR menor a 2 %)

Las 16 que detecta Search Console son de dos páginas. Hay 15 de /fechas-comerciales-chile y 1 de /glosario-gtm:

| Consulta | Impresiones | Posición |
|---|---|---|
| cuándo es el próximo black friday o cyber day | 113 | 8,0 |
| gtm (/glosario-gtm) | 109 | 13,4 |
| cuando hay cyber o black friday | 41 | 8,2 |
| black friday 2027 chile | 36 | 5,5 |
| cuando hay ofertas en chile | 32 | 10,1 |
| cuando es el cyber en noviembre | 25 | 8,6 |
| cuando hay cyber day o black friday | 25 | 6,9 |
| cuando viene un cyber day o black friday | 22 | 8,7 |
| cuando hay descuentos en chile | 19 | 10,2 |
| cuando es el proximo cyber o black friday | 18 | 7,5 |
| cuando hay otro cyber o black friday | 17 | 6,5 |
| cuando son las ofertas en chile | 13 | 9,4 |
| cuando es el siguiente cyber day o black friday | 11 | 7,8 |
| cuando es cyber day o black friday, fechas de cyber 2027, fechas de descuentos en chile 2027 | 10 cada una | 6,0 / 7,3 / 6,8 |

Con un CTR de 5 % en esa posición (supuesto, no pronóstico), serían unos 25 clics más al mes solo en estas consultas. Es más que todo lo que el sitio recibe hoy.

### 5.4 Resultados enriquecidos

- **Migas de pan:** las 36 páginas de artículo, las 16 fichas, las landings, /enciclopedia, /glosario y /calculadoras ya tienen BreadcrumbList. Faltan en /preguntas-frecuentes y /herramientas.
- **FAQ:** Google dejó de mostrar el resultado enriquecido de preguntas frecuentes en 2026; antes, desde agosto de 2023, ya lo limitaba a sitios de gobierno y salud ([Google, cambios en HowTo y FAQ](https://developers.google.com/search/blog/2023/08/howto-faq-changes)). El FAQPage no hace daño y sigue siendo texto estructurado que leen los asistentes, pero **no esperes un resultado enriquecido**. No conviene invertir más en él para Google.
- **Fechas:** todas las páginas de contenido tienen `datePublished` y `dateModified` y la fecha visible. Google puede mostrar la fecha en el fragmento sin cambios adicionales.
- **Miniatura:** Google recomienda para Article varias imágenes de alta resolución en 16:9, 4:3 y 1:1 con al menos 50.000 píxeles ([Google, datos estructurados de Article](https://developers.google.com/search/docs/appearance/structured-data/article)). Hoy los 36 artículos y las fichas usan **la misma imagen genérica** (og-condado-digital.jpg). Una imagen propia por artículo (aunque sea una portada tipográfica generada con la misma ilustración `ar-cov`) es lo que permite miniatura en el resultado y tarjeta en Discover.

---

## 6. Del contenido a la landing: el camino al lead

### 6.1 Qué dicen los datos (GA4, 30-10 al 26-11-2026)

- **Volumen total:** 85 usuarios activos, 468 vistas y 5 eventos clave (`generate_lead` es el único evento clave con datos).
- **Vistas por página:** inicio 225 · /enciclopedia 36 · /glosario 29 · /calculadoras 28 · /contacto 23 · /acerca 8 · /servicios 8 · /paid-media 7.
- **Eventos clave por página:** inicio 3, /contacto 1, /paid-media 1. Ningún artículo ni ficha registra un evento clave.
- **Eventos:** `formulario_iniciado` 35 (6 usuarios), `generate_lead` 10 (3 usuarios), `servicio_click` **2** (1 usuario), `conde_abierto` 13, `glosario_quiz` 14, `diagnostico_completado` 12.
- **Desde la búsqueda orgánica de Google:** 8 usuarios activos y 1 evento clave en 28 días (informe «Tráfico de búsqueda orgánica de Google», vinculado con Search Console). /fechas-comerciales-chile trajo 3 usuarios con 12 s de interacción media: quien llega busca una fecha y se va.
- **Datos contaminados por pruebas:** `tagassistant.google.com / referral` es la fuente con más sesiones de los últimos 7 días (11 de 27). Son visitas de prueba de Tag Assistant. Hay que excluir el tráfico interno; la configuración del filtro de datos es **por validar**.
- **No hay dimensiones personalizadas en GA4** (Administrar → Definiciones personalizadas: 0). Por eso `ubicacion` y `servicio` de `servicio_click`, y `servicio` de `generate_lead`, **no se pueden ver en los informes**. Hoy es imposible responder «cuántos clics a servicios vienen de los artículos» o «qué servicio genera más leads». Esto es lo primero que hay que arreglar en medición (sección 8).
- **Lectura honesta:** con este volumen todavía no hay una página que «convierta» de forma medible. El inicio y /contacto concentran los leads. El contenido atrae visitas, pero no hay evidencia de que lleve a servicios.

### 6.2 ¿Hay un camino visible a la landing que corresponde?

| Tipo de página | Camino a una landing de servicio dentro del contenido | Diagnóstico |
|---|---|---|
| 20 artículos nuevos | Bloque «Hablemos» con botón a /paid-media, /mentorias o /social-media, más o menos al 60 % de la página, medido con `servicio_click` | Bien |
| **16 artículos antiguos** | **15 de 16 no tienen ningún enlace a una landing** en el contenido. Solo /sitio-web enlaza una vez a /diseno-web, en el texto. No tienen bloque «Hablemos». Únicamente existe la franja oscura final del pie («¿Quieres aplicarlo en tu negocio?» → formulario) | **Brecha principal.** Incluye /fechas-comerciales-chile, /meta-ads-vs-google-ads, /analitica-digital y /chatgpt-ads-chile |
| 16 fichas del glosario | Enlaces a 1 o 2 landings, pero al 78–91 % de la página (casi al final, en «Términos relacionados» o en el cierre) | Existe, pero tarde |
| /glosario, /enciclopedia, /calculadoras | Ningún enlace a landings en el contenido | Son la 2.ª, 3.ª y 4.ª página más vista. Las 20 calculadoras son el lugar natural para «¿Quieres que lo midamos por ti?» → /paid-media o /mentorias |
| Inicio | Filas de servicios al 10 % de la página, con `servicio_click` | Bien |
| 5 landings | Cada una enlaza a las otras 4 al final («Otros servicios») y ahora a sus «Lecturas recomendadas» | Bien |

**En el teléfono:** en los artículos nuevos, el bloque «Hablemos» aparece después de «Cómo aplicarlo en tu pyme», que en 390 px es más o menos el 60 % del recorrido. No hay ningún llamado a la acción antes del primer tercio. En las fichas, el enlace al servicio queda detrás de las FAQ.

### 6.3 Dónde agregar enlaces o llamados a la acción, sin cambiar el diseño

Todos usan componentes que ya existen: `ar-call` («Hablemos»), filas `pg-row` y enlaces en el texto.

1. **Bloque «Hablemos» en los 16 artículos antiguos**, con el servicio que corresponde:
   - /paid-media: meta-ads-vs-google-ads, publicidad-pagada-vs-organica, biblioteca-de-anuncios, fechas-comerciales-chile, chatgpt-ads-chile y embudo-de-marketing.
   - /diseno-web: sitio-web, tienda-online y crear-sitio-web-con-ia.
   - /seo: core-update-google-noviembre-2026 y perfil-de-empresa-google.
   - /mentorias: analitica-digital, marketing-con-ia y que-es-el-marketing-digital.
   - /social-media: whatsapp-business.
   - marketing-tradicional-vs-digital: /servicios.
2. **/fechas-comerciales-chile**, la página con más impresiones: además del bloque, una línea bajo la tabla de fechas («¿Vas a invertir en anuncios para el próximo evento? Revisamos tu campaña antes de que suban los costos → Paid Media»). Esa línea va donde está el interés.
3. **/calculadoras**: una fila `pg-row` al final de cada grupo de calculadoras. Por ejemplo, tras las de costo «¿Tu CPA está alto? → Paid Media» y tras las de redes «→ Social Media».
4. **Fichas del glosario**: subir el enlace al servicio a la sección «Cómo interpretarlo» o «Errores comunes» (mitad de la ficha), con texto en contexto («Si tu CPL sube mes a mes, revisamos tu cuenta → Paid Media»).
5. **/glosario y /enciclopedia**: una fila «¿Prefieres que lo hagamos por ti? → Servicios» antes del pie. Hoy solo está la franja genérica.
6. **/seo y /diseno-web** son las landings con menos entradas. /seo solo la enlazan /glosario-aeo y /glosario-geo; /diseno-web, /sitio-web y 4 fichas. Enlazarlas desde los 5 artículos de sitio web, SEO y buscadores con IA (sitio-web, tienda-online, crear-sitio-web-con-ia, core-update-google-noviembre-2026 y trafico-de-ia-en-ga4).
7. **Medir todo con `servicio_click`** y `data-ubicacion` (`articulo`, `glosario`, `calculadora`), y registrar `ubicacion` y `servicio` como dimensiones personalizadas en GA4. Sin eso, nada de lo anterior se puede evaluar.


---

## 7. Títulos que invitan a hacer clic

**Criterios aplicados:**

- Palabra clave principal al inicio.
- Una promesa que el contenido sí cumple (lo revisé contra los H2 de cada página).
- El año solo en contenido de actualidad (fechas comerciales, core update).
- Sin signos de exclamación ni clickbait.
- Title de 60 caracteres o menos y description de 120 a 160.

**Quitar el sufijo « — Condado Digital» en todas las páginas.** Google ya muestra el nombre del sitio sobre el resultado, a partir del dato estructurado WebSite ([Google, nombres de sitios](https://developers.google.com/search/docs/appearance/site-names)), y el sufijo empuja la promesa fuera del corte. Todos los largos de esta sección los validé con un script.

**Prioridad:** las primeras filas son las que tienen impresiones en Search Console. En los artículos que hoy no tienen impresiones y ya cumplen los criterios (los 20 nuevos), **recomiendo no tocar el title** hasta tener 4 a 6 semanas de datos; ahí cambiarlo es especulación.

### 7.1 Tabla (ordenada por impresiones)

| URL | Title actual (car.) | Impr. 28 d | CTR | Pos. | Title propuesto (car.) | Description propuesta (car.) |
|---|---|---|---|---|---|---|
| /fechas-comerciales-chile | Próximo Cyber y Black Friday en Chile: fechas 2026 y 2027 \| Condado Digital (76) | 2248 | 0,22 % | 7.7 | **Próximo Black Friday y Cyber en Chile: fechas 2026 y 2027** (57) | Fechas del próximo Black Friday, CyberMonday y CyberDay en Chile, más el calendario comercial 2027 y cómo preparar tus anuncios antes de que suban los costos. (158) |
| /sitio-web | Sitio web: qué es, cómo hacerlo y cuánto cuesta en Chile (56) | 298 | 0 % | 61 | **Sitio web para pymes: qué es, tipos y cuánto cuesta en Chile** (60) | Qué es un sitio web, qué tipo necesita tu pyme, qué plataformas existen y cuánto cuesta el primer año en Chile, con un ejemplo en pesos y lo que debe tener. (156) |
| /que-es-el-marketing-digital | Qué es el marketing digital y cómo empezar en tu pyme (Chile) — Condado Digital (79) | 133 | 0 % | 48.6 | **Marketing digital: qué es, para qué sirve y cómo empezar** (56) | Qué es el marketing digital, sus canales principales, la diferencia entre orgánico y pagado y cómo empezar en tu pyme en Chile midiendo desde el primer día. (156) |
| / | Condado Digital — Marketing digital sin humo: Paid Media, analítica e IA (72) | 28 | 50 % | 2.4 | **Condado Digital: marketing digital sin humo para pymes** (54) | Paid Media, Social Media, SEO, diseño web y mentorías para pymes en Chile, más una enciclopedia, glosario y 20 calculadoras de marketing gratis. Sin humo. (154) |
| /servicios | Servicios de marketing digital para pymes \| Condado Digital (60) | 10 | 0 % | 6.6 | **Servicios de marketing digital para pymes en Chile** (50) | Cinco servicios para pymes de Chile y Latinoamérica: Paid Media, Social Media, SEO, diseño web y mentorías. Qué incluye cada uno y para quién es. Sin humo. (155) |
| /core-update-google-noviembre-2026 | Core update de Google noviembre 2026: guía para pymes (53) | 7 | 0 % | 6.7 | **Core update de noviembre 2026: fechas, impacto y qué hacer** (58) | Qué cambió en el core update de Google de noviembre 2026, por qué choca con el Black Friday y qué hacer (y qué no) mientras se despliega. Guía para pymes. (154) |
| /analitica-digital | Analítica digital para pymes: GA4, GTM, píxeles y UTM — Condado Digital (71) | 5 | 0 % | 5.6 | **Analítica digital para pymes: GA4, GTM, píxeles y UTM** (53) | Qué es la analítica digital, qué herramientas necesitas (GA4, GTM, píxeles, UTM), la diferencia entre evento y evento clave y qué medir según tu negocio. (153) |
| /perfil-de-empresa-google | Perfil de Empresa de Google (ex Google Mi Negocio): guía (56) | 4 | 0 % | 13.5 | **Perfil de Empresa de Google: cómo crearlo y verificarlo** (55) | Cómo crear y verificar tu Perfil de Empresa de Google (ex Google Mi Negocio), qué completar, cómo pedir reseñas y los errores que suspenden tu ficha. (149) |
| /enciclopedia | Enciclopedia de marketing digital — Condado Digital (51) | 3 | 0 % | 8.3 | **Enciclopedia de marketing digital: 36 guías con fuentes** (55) | Guías largas y verificadas sobre Google Ads, Meta Ads, analítica, IA, agencias y fechas comerciales, con datos de Chile y pasos concretos para tu pyme. (151) |
| /diseno-web | Diseño web para pymes en Chile \| Condado Digital (49) | 2 | 0 % | 78 | **Diseño de páginas web para pymes en Chile** (41) | Sitios y landing pages rápidos para pymes en Chile, con GTM, GA4 y cookies desde el primer día, preparados para Google y los asistentes de IA. Cotiza. (150) |
| /paid-media | Paid Media para pymes en Chile \| Condado Digital (49) | 1 | 0 % | 97 | **Agencia de Paid Media en Chile: Google Ads y Meta Ads** (53) | Gestionamos tus campañas en Google Ads, Meta Ads, TikTok y LinkedIn para bajar tu costo por lead y por venta, con las cuentas a tu nombre y reportes claros. (156) |
| /social-media | Social Media para pymes en Chile \| Condado Digital (51) | 0 | — | — | **Gestión de redes sociales para pymes en Chile** (45) | Estrategia, parrilla, guiones y videos para Instagram, TikTok, Facebook y LinkedIn, con una voz coherente y reportes mensuales. Para pymes de Chile. (148) |
| /mentorias | Mentorías de Google Ads, Meta Ads y GA4 \| Condado Digital (58) | 0 | — | — | **Mentorías de Google Ads, Meta Ads y GA4 para pymes** (50) | Sesiones en vivo sobre tus propias cuentas para aprender a gestionar Google Ads, Meta Ads, GA4 y GTM con criterio, sin depender de una agencia. (143) |
| /seo | Posicionamiento SEO para pymes en Chile \| Condado Digital (58) | 0 | — | — | **Posicionamiento SEO para pymes en Chile (y buscadores IA)** (57) | Auditoría técnica, palabras clave, SEO local y optimización para buscadores con IA, con seguimiento mensual en Search Console. Para pymes de Chile. (147) |
| /glosario | Glosario de marketing digital: métricas y conceptos explicados — Condado Digital (80) | 0 | — | — | **Glosario de marketing digital: 168 términos con fórmula** (55) | Glosario de 168 términos de marketing digital con definición, fórmula y ejemplo en pesos: CPA, CPL, CTR, CVR, ROAS, GA4, GTM, UTM y más. Con quiz. (146) |
| /calculadoras | Calculadoras de marketing: ROAS, CPA, CPL, CAC, LTV y más — Condado Digital (75) | 0 | — | — | **Calculadoras de marketing: ROAS, CPA, CPL, CAC y LTV** (52) | Veinte calculadoras de marketing con la fórmula a la vista y ejemplos en pesos: ROAS, CPA, CPL, CAC, LTV, CTR, frecuencia, hook rate y simulador de embudo. (155) |
| /marketing-con-ia | Marketing con inteligencia artificial: usos reales y humo — Condado Digital (75) | 0 | — | — | **Marketing con IA: qué sirve hoy y qué es humo** (45) | Qué usos de la inteligencia artificial en marketing funcionan hoy, qué hacen las campañas automatizadas, cómo aparecer en respuestas de IA y qué es humo. (153) |
| /marketing-tradicional-vs-digital | Marketing tradicional vs. digital: diferencias y cómo combinarlos — Condado Digital (83) | 0 | — | — | **Marketing tradicional vs. digital: diferencias y cuándo usar** (60) | Diferencias entre el marketing tradicional y el digital en costo, segmentación y medición, cuándo sigue sirviendo el tradicional y cómo combinarlos. (148) |
| /embudo-de-marketing | Embudo de marketing: etapas y métricas (CPM, CTR, CPL, CAC, LTV) — Condado Digital (82) | 0 | — | — | **Embudo de marketing (funnel): etapas y métrica de cada una** (58) | Qué es el embudo de marketing, sus etapas y la métrica de cada una (CPM, CTR, CPL, CAC, LTV), cómo usarlo para diagnosticar y sus límites como modelo. (150) |
| /publicidad-pagada-vs-organica | Publicidad pagada vs. orgánica: diferencias y cómo combinarlas — Condado Digital (80) | 0 | — | — | **Publicidad pagada vs. orgánica: diferencias y cómo combinar** (59) | Diferencias entre publicidad pagada y orgánica: qué compra cada una, cuánto tardan, qué pasa cuando dejas de pagar y cómo combinarlas en tu pyme. (145) |
| /chatgpt-ads-chile | ChatGPT Ads en Chile: qué cambió y si conviene a tu pyme (56) | 0 | — | — | **ChatGPT Ads en Chile: cómo funcionan y si conviene a tu pyme** (60) | Cómo funcionan los anuncios en ChatGPT, qué cambió entre octubre y noviembre, las pujas Target CPA y CPC y si le conviene a una pyme chilena probarlos. (151) |
| /tienda-online | Tienda online en Chile: plataformas, costos y cómo empezar (58) | 0 | — | — | **Cómo crear una tienda online en Chile: costos y plataformas** (59) | Cómo empezar una tienda online en Chile: tienda propia o marketplace, plataformas (Shopify, Jumpseller, Tiendanube), costos reales y cómo medir si vende. (153) |
| /crear-sitio-web-con-ia | Crear una página web con IA: qué sirve y cuándo no (50) | 0 | — | — | **Cómo crear una página web con IA (y cuándo no conviene)** (55) | Qué herramientas de IA crean sitios web, qué hacen bien, dónde fallan, quién queda como dueño del sitio y cuándo conviene un profesional. Guía para pymes. (154) |
| /whatsapp-business | WhatsApp Business para vender: guía para pymes en Chile (55) | 0 | — | — | **WhatsApp Business para vender: app, API y costos en Chile** (57) | Cómo vender con WhatsApp Business: la app sin costo, cuándo pasar a la API, el cobro por mensaje, cómo conectarlo con anuncios y cómo medir si vende. (149) |
| /meta-ads-vs-google-ads | Meta Ads vs Google Ads: cuál conviene a tu pyme en Chile (56) | 0 | — | — | **Meta Ads vs Google Ads: cuál conviene a tu pyme en Chile** (56) | Diferencias entre Meta Ads y Google Ads: intención, formatos, costos, medición y por cuál empezar según tu producto y presupuesto. Guía para pymes en Chile. (156) |
| /biblioteca-de-anuncios | Biblioteca de anuncios: cómo espiar a tu competencia (52) | 0 | — | — | **Cómo ver los anuncios de tu competencia en Meta y Google** (56) | Cómo usar la Biblioteca de anuncios de Meta y el Centro de transparencia de Google para ver qué anuncios publica tu competencia, paso a paso y sin copiar. (154) |
| /meta-andromeda | Meta Andromeda: qué es y cómo cambia tus anuncios (49) | 0 | — | — | **Meta Andromeda: qué es y cómo cambia tus anuncios** (49) | Andromeda es la IA de Meta que elige qué anuncios entran a competir. Qué hace, qué no y cómo ajustar tus creatividades y campañas en tu pyme. (141) |
| /advantage-plus-meta | Advantage+ de Meta: qué automatiza y qué controlas tú (53) | 0 | — | — | **Advantage+ de Meta: qué automatiza y qué controlas tú** (53) | Advantage+ automatiza audiencia, ubicaciones, presupuesto y creatividades en Meta. Qué cambió en 2025-2026 y qué debe seguir controlando tu pyme. (145) |
| /ai-max-google-ads | AI Max de Google Ads: qué es y cuándo activarlo (47) | 0 | — | — | **AI Max de Google Ads: qué es y cuándo activarlo** (47) | AI Max amplía tus campañas de Búsqueda con IA: más consultas, textos y URLs automáticos. Qué promete Google, qué dicen los estudios y cómo probarlo. (148) |
| /anuncios-con-ia | Anuncios con IA: imágenes y videos en Meta, Google y TikTok (59) | 0 | — | — | **Anuncios con IA: imágenes y videos en Meta, Google y TikTok** (59) | Qué herramientas de IA ofrecen Meta, Google y TikTok para crear anuncios, qué resultados reportan, qué etiquetas exigen y cuándo conviene usarlas. (146) |
| /como-usar-ia-en-marketing | Cómo usar la IA en el marketing de tu pyme (con prompts) (56) | 0 | — | — | **Cómo usar la IA en el marketing de tu pyme (con prompts)** (56) | Qué tareas de marketing puedes delegar a la IA, cómo escribir un buen prompt, 10 prompts listos para copiar y las reglas antes de publicar. Para pymes. (151) |
| /agentes-de-ia-marketing | Agentes de IA en marketing: qué son y qué pueden hacer (54) | 0 | — | — | **Agentes de IA en marketing: qué son y qué pueden hacer** (54) | Qué es un agente de IA, en qué se diferencia de un chatbot, qué agentes ya traen tus herramientas, qué tareas delegar y qué riesgos vigilar. (140) |
| /ia-para-tu-marca | IA para tu marca: identidad, voz y manual con IA (48) | 0 | — | — | **IA para tu marca: identidad, voz y manual con IA** (48) | Cómo usar la IA para definir y documentar tu marca: herramientas, cómo crear tu manual de voz en una tarde y qué dice la ley sobre logos hechos con IA. (151) |
| /ia-para-redes-sociales | IA para redes sociales: cómo usarla sin perder tu voz (53) | 0 | — | — | **IA para redes sociales: cómo usarla sin perder tu voz** (53) | Cómo usar la IA en redes sociales: dónde ayuda, un flujo semanal de tres horas, las etiquetas que exige cada plataforma y lo que el público castiga. (148) |
| /meta-business-agent | Meta Business Agent: IA para atender clientes en WhatsApp (57) | 0 | — | — | **Meta Business Agent: IA para atender clientes en WhatsApp** (57) | Qué es Meta Business Agent, cuánto cuesta y cómo se activa, qué conversaciones delegar en WhatsApp, Messenger e Instagram y qué cuidar. (135) |
| /trafico-de-ia-en-ga4 | Tráfico de ChatGPT y la IA en GA4: cómo medirlo (47) | 0 | — | — | **Cómo medir el tráfico de ChatGPT en GA4 paso a paso** (51) | Cómo ver en GA4 las visitas que llegan desde ChatGPT, Perplexity, Gemini y otros asistentes, qué no mide el canal AI Assistant y cómo crear tu propio canal. (156) |
| /agencia-freelance-o-equipo-interno | Agencia, freelance o equipo interno: qué conviene a tu pyme (59) | 0 | — | — | **Agencia, freelance o equipo interno: qué conviene a tu pyme** (59) | Agencia, freelance o equipo interno para tu marketing digital: costos reales, qué conviene según tu etapa y cómo mezclarlos. Guía para pymes en Chile. (150) |
| /asesoria-de-marketing-digital | Asesoría de marketing digital: qué es y cuándo conviene (55) | 0 | — | — | **Asesoría de marketing digital: qué es y cuándo conviene** (55) | Qué es una asesoría de marketing digital, en qué se diferencia de una agencia o una mentoría, qué debe entregarte y cuándo no conviene contratarla. (147) |
| /como-elegir-agencia-marketing-digital | Cómo elegir una agencia de marketing digital (checklist) (56) | 0 | — | — | **Cómo elegir una agencia de marketing digital (checklist)** (56) | Qué preguntarle a una agencia de marketing digital antes de contratarla, las señales de alerta y cómo comparar propuestas. Checklist para pymes en Chile. (153) |
| /brief-para-agencia-de-marketing | Brief para agencia de marketing: plantilla y ejemplo (52) | 0 | — | — | **Brief para agencia de marketing: plantilla y ejemplo** (52) | Plantilla de brief en una página para tu agencia de marketing, los errores más comunes y un ejemplo completo de una pyme chilena. Lista para copiar. (148) |
| /precio-agencia-marketing-digital | Cuánto cuesta una agencia de marketing digital en Chile (55) | 0 | — | — | **Cuánto cuesta una agencia de marketing digital en Chile** (55) | Cuánto cobra una agencia de marketing digital en Chile: fee e inversión en medios por separado, rangos publicados, modelos de cobro y un ejemplo en pesos. (154) |
| /cuanto-invertir-en-publicidad-digital | Cuánto invertir en publicidad digital: guía para pymes (54) | 0 | — | — | **Cuánto invertir en publicidad digital: guía para pymes** (54) | Cómo calcular cuánto invertir en publicidad digital desde tu margen y tu costo por cliente, cómo cobran Google y Meta y cómo repartirlo entre canales. (150) |
| /cuentas-publicitarias-a-tu-nombre | Cuentas de Google Ads y Meta a tu nombre: guía (46) | 0 | — | — | **Cuentas publicitarias a nombre de tu empresa: cómo hacerlo** (58) | Cómo dejar tus cuentas de Google Ads, Meta, GA4 y GTM a nombre de tu empresa, dar acceso a una agencia sin perder el control y qué revisar al terminar. (151) |
| /auditoria-de-campanas-publicitarias | Auditoría de campañas en Google Ads y Meta: checklist (53) | 0 | — | — | **Auditoría de campañas en Google Ads y Meta: checklist** (53) | Qué revisa una auditoría de campañas en Google Ads y Meta Ads y en qué orden, por qué el nivel de optimización no basta y un checklist para hacerla. (148) |
| /google-partner-meta-business-partner | Google Partner y Meta Business Partner: qué significan (54) | 0 | — | — | **Google Partner y Meta Business Partner: qué significan** (54) | Qué exige Google para ser Partner, qué se sabe de Meta Business Partners y lo que la insignia sí y no te dice al elegir una agencia de marketing. (145) |
| /kpis-para-evaluar-agencia-de-marketing | KPIs para evaluar a tu agencia de marketing digital (51) | 0 | — | — | **KPIs para evaluar a tu agencia de marketing digital** (51) | Las 6 métricas de negocio que deberías pedirle a tu agencia de marketing cada mes, cómo detectar métricas de vanidad y las señales de alerta en informes. (153) |

### 7.2 Las dos opciones por página, la recomendada y por qué

- **/fechas-comerciales-chile** · A: «Próximo Black Friday y Cyber en Chile: fechas 2026 y 2027» (57) · B: «Cuándo es el próximo Cyber o Black Friday en Chile (2027)» (57) · **Recomendada: A.** Responde la consulta con más impresiones del sitio («próximo black friday o cyber») en las primeras palabras y conserva las fechas, que es la promesa que el contenido cumple. Hoy el title tiene 75 caracteres y se corta.
- **/sitio-web** · A: «Sitio web para pymes: qué es, tipos y cuánto cuesta en Chile» (60) · B: «Cuánto cuesta un sitio web en Chile: ejemplo del primer año» (59) · **Recomendada: A.** Mantiene la intención informativa (qué es y cuánto cuesta) y deja «diseño de páginas web» a /diseno-web, para no seguir apareciendo en búsquedas de compra donde no gana el clic.
- **/que-es-el-marketing-digital** · A: «Qué es el marketing digital: canales y cómo empezar (Chile)» (59) · B: «Marketing digital: qué es, para qué sirve y cómo empezar» (56) · **Recomendada: B.** «Para qué sirve» aparece en las consultas reales («marketing digital que es y para que sirve»). La B empieza con la palabra clave exacta y cabe en 60.
- **/** · A: «Condado Digital: marketing digital sin humo para pymes» (54) · B: «Agencia de marketing digital para pymes en Chile | Condado» (58) · **Recomendada: A.** El inicio recibe sobre todo búsquedas de marca (CTR 50 %, posición 2,4). Conviene que la marca vaya primero y que la description diga qué hay y para quién.
- **/servicios** · A: «Servicios de marketing digital para pymes en Chile» (50) · B: «Paid Media, Social Media, SEO, web y mentorías para pymes» (57) · **Recomendada: A.** Palabra clave genérica al inicio («servicios de marketing digital») y la promesa de ver qué incluye cada uno.
- **/core-update-google-noviembre-2026** · A: «Core update de Google noviembre 2026: qué hacer en tu pyme» (58) · B: «Core update de noviembre 2026: fechas, impacto y qué hacer» (58) · **Recomendada: B.** Es contenido de actualidad: la fecha y «qué hacer» son la promesa. La B suma «fechas», que es lo que se pregunta mientras dura el despliegue.
- **/analitica-digital** · A: «Analítica digital para pymes: GA4, GTM, píxeles y UTM» (53) · B: «Qué es la analítica digital y qué medir en tu pyme» (50) · **Recomendada: A.** Es el title actual sin el sufijo de marca (de 71 a 53 caracteres): ya tenía la palabra clave al inicio.
- **/perfil-de-empresa-google** · A: «Perfil de Empresa de Google: cómo crearlo y verificarlo» (55) · B: «Google Mi Negocio (Perfil de Empresa): guía para pymes» (54) · **Recomendada: A.** «Cómo crearlo y verificarlo» es la tarea concreta que busca quien llega. La B sirve si las consultas muestran que todavía se busca «Google Mi Negocio».
- **/enciclopedia** · A: «Enciclopedia de marketing digital: 36 guías con fuentes» (55) · B: «Guías de marketing digital para pymes, con datos de Chile» (57) · **Recomendada: A.** El número y «con fuentes» son una promesa concreta que la página cumple (36 guías y «Verificado con N fuentes»).
- **/diseno-web** · A: «Diseño de páginas web para pymes en Chile» (41) · B: «Diseño web para pymes en Chile: rápido y listo para vender» (58) · **Recomendada: A.** Las consultas que hoy llegan a /sitio-web son «páginas web chile», «diseño de páginas web» y «cotizar página web». La A captura esa intención en la landing correcta.
- **/paid-media** · A: «Agencia de Paid Media en Chile: Google Ads y Meta Ads» (53) · B: «Gestión de Google Ads y Meta Ads para pymes en Chile» (52) · **Recomendada: A.** «Paid Media» casi no se busca en Chile. «Google Ads» y «Meta Ads» sí, así que van en el title. La description cumple lo que dice la landing (CPL, CPA, cuentas a nombre del cliente).
- **/social-media** · A: «Social Media para pymes en Chile: contenido y estrategia» (56) · B: «Gestión de redes sociales para pymes en Chile» (45) · **Recomendada: B.** «Gestión de redes sociales» es como lo busca una pyme; «Social Media» es jerga de agencia.
- **/mentorias** · A: «Mentorías de Google Ads, Meta Ads y GA4 para pymes» (50) · B: «Aprende Google Ads y Meta Ads con mentorías en vivo» (51) · **Recomendada: A.** Mantiene las plataformas que se buscan y quita el sufijo de marca para dejar espacio a «para pymes».
- **/seo** · A: «Posicionamiento SEO para pymes en Chile (y buscadores IA)» (57) · B: «Agencia SEO para pymes en Chile: Google y asistentes de IA» (58) · **Recomendada: A.** Agrega el diferencial real de la landing (buscadores con IA) sin perder la palabra clave al inicio.
- **/glosario** · A: «Glosario de marketing digital: 168 términos con fórmula» (55) · B: «Glosario de marketing digital: CPA, CPL, CTR, ROAS y más» (56) · **Recomendada: A.** Hoy el title tiene 80 caracteres y se corta. La A conserva la palabra clave y la promesa (168 términos con fórmula).
- **/calculadoras** · A: «Calculadoras de marketing: ROAS, CPA, CPL, CAC y LTV» (52) · B: «20 calculadoras de marketing gratis con ejemplos en pesos» (57) · **Recomendada: A.** Las siglas al inicio coinciden con lo que se busca («calcular ltv» ya trajo clics). Quitar el sufijo deja el title en 52 caracteres.
- **/marketing-con-ia** · A: «Marketing con IA: qué sirve hoy y qué es humo» (45) · B: «Marketing con inteligencia artificial: usos reales en pymes» (59) · **Recomendada: A.** Diferencia el pilar de la guía práctica /como-usar-ia-en-marketing (sección 2). «Humo» es la promesa de marca.
- **/marketing-tradicional-vs-digital** · A: «Marketing tradicional vs. digital: diferencias y cuándo usar» (60) · B: «Marketing tradicional y digital: comparación para pymes» (55) · **Recomendada: A.** Hoy el title tiene 83 caracteres. La A conserva el formato «vs.» que usan las búsquedas comparativas.
- **/embudo-de-marketing** · A: «Embudo de marketing: etapas, métricas y cómo usarlo» (51) · B: «Embudo de marketing (funnel): etapas y métrica de cada una» (58) · **Recomendada: B.** Suma «funnel», que también se busca, y la promesa «métrica de cada una», que el contenido cumple con una tabla.
- **/publicidad-pagada-vs-organica** · A: «Publicidad pagada vs. orgánica: diferencias y cómo combinar» (59) · B: «Publicidad pagada y orgánica: cuál conviene a tu pyme» (53) · **Recomendada: A.** Es el title actual recortado a 60 caracteres sin perder la comparación.
- **/chatgpt-ads-chile** · A: «ChatGPT Ads en Chile: cómo funcionan y si conviene a tu pyme» (60) · B: «Anuncios en ChatGPT: qué son, pujas y si convienen en Chile» (59) · **Recomendada: A.** La A conserva la marca del producto al inicio, que es lo que se busca.
- **/tienda-online** · A: «Tienda online en Chile: plataformas, costos y cómo empezar» (58) · B: «Cómo crear una tienda online en Chile: costos y plataformas» (59) · **Recomendada: B.** «Cómo crear» es la intención con más volumen y acción. La description nombra las plataformas que compara.
- **/crear-sitio-web-con-ia** · A: «Crear una página web con IA: herramientas y límites» (51) · B: «Cómo crear una página web con IA (y cuándo no conviene)» (55) · **Recomendada: B.** «Cómo crear» y la advertencia honesta coinciden con el tono del sitio y con lo que cumple el contenido.
- **/whatsapp-business** · A: «WhatsApp Business para vender: app, API y costos en Chile» (57) · B: «WhatsApp Business para pymes: guía de ventas en Chile» (53) · **Recomendada: A.** La A promete las tres decisiones que cubre el contenido (app, API y costos).
- **/meta-ads-vs-google-ads** · A: «Meta Ads vs Google Ads: cuál conviene a tu pyme en Chile» (56) · B: «Meta Ads o Google Ads: diferencias, costos y por cuál partir» (60) · **Recomendada: A.** El title actual ya cumple (56 caracteres y palabra clave al inicio). Solo se ajusta la description para prometer «por cuál empezar».
- **/biblioteca-de-anuncios** · A: «Biblioteca de anuncios de Meta: mira a tu competencia» (53) · B: «Cómo ver los anuncios de tu competencia en Meta y Google» (56) · **Recomendada: B.** La B describe la tarea con las dos plataformas que cubre el artículo (Meta y Google) y cambia «espiar» por un verbo neutral; la A solo nombra Meta.
- **/meta-andromeda** · A: «Meta Andromeda: qué es y cómo cambia tus anuncios» (49) · B: «Meta Andromeda: qué es y cómo ajustar tus creatividades» (55) · **Recomendada: A.** El actual ya cumple. No hay datos de Search Console todavía para justificar un cambio.
- **/advantage-plus-meta** · A: «Advantage+ de Meta: qué automatiza y qué controlas tú» (53) · B: «Advantage+ de Meta: cuándo usarlo y cuándo frenar» (49) · **Recomendada: A.** El actual ya cumple. Mantenerlo hasta tener impresiones.
- **/ai-max-google-ads** · A: «AI Max de Google Ads: qué es y cuándo activarlo» (47) · B: «AI Max en Google Ads: qué hace y qué dicen los estudios» (55) · **Recomendada: A.** El actual ya cumple.
- **/anuncios-con-ia** · A: «Anuncios con IA: imágenes y videos en Meta, Google y TikTok» (59) · B: «Anuncios creados con IA: qué sirve y qué reglas cumplir» (55) · **Recomendada: A.** El actual ya cumple.
- **/como-usar-ia-en-marketing** · A: «Cómo usar la IA en el marketing de tu pyme (con prompts)» (56) · B: «10 prompts de IA para el marketing de tu pyme» (45) · **Recomendada: A.** El actual ya cumple y se diferencia del pilar /marketing-con-ia.
- **/agentes-de-ia-marketing** · A: «Agentes de IA en marketing: qué son y qué pueden hacer» (54) · B: «Agentes de IA en marketing: qué delegar y qué riesgos tienen» (60) · **Recomendada: A.** El actual ya cumple.
- **/ia-para-tu-marca** · A: «IA para tu marca: identidad, voz y manual con IA» (48) · B: «Cómo usar la IA para crear el manual de voz de tu marca» (55) · **Recomendada: A.** El actual ya cumple. La B sirve si las consultas se concentran en «manual de marca».
- **/ia-para-redes-sociales** · A: «IA para redes sociales: cómo usarla sin perder tu voz» (53) · B: «IA para redes sociales: flujo semanal de 3 horas para pymes» (59) · **Recomendada: A.** El actual ya cumple.
- **/meta-business-agent** · A: «Meta Business Agent: IA para atender clientes en WhatsApp» (57) · B: «Meta Business Agent: qué es, cuánto cuesta y qué delegar» (56) · **Recomendada: A.** El actual ya cumple.
- **/trafico-de-ia-en-ga4** · A: «Tráfico de ChatGPT y la IA en GA4: cómo medirlo» (47) · B: «Cómo medir el tráfico de ChatGPT en GA4 paso a paso» (51) · **Recomendada: B.** La consulta natural es «cómo medir tráfico de chatgpt en ga4» (sección 9). «Paso a paso» lo cumple el artículo.
- **/agencia-freelance-o-equipo-interno** · A: «Agencia, freelance o equipo interno: qué conviene a tu pyme» (59) · B: «Agencia o freelance de marketing: costos y cuándo conviene» (58) · **Recomendada: A.** El actual ya cumple.
- **/asesoria-de-marketing-digital** · A: «Asesoría de marketing digital: qué es y cuándo conviene» (55) · B: «Asesoría de marketing digital para pymes: qué entrega» (53) · **Recomendada: A.** El actual ya cumple.
- **/como-elegir-agencia-marketing-digital** · A: «Cómo elegir una agencia de marketing digital (checklist)» (56) · B: «Cómo elegir agencia de marketing: preguntas y alertas» (53) · **Recomendada: A.** El actual ya cumple.
- **/brief-para-agencia-de-marketing** · A: «Brief para agencia de marketing: plantilla y ejemplo» (52) · B: «Cómo hacer un brief de marketing: plantilla en una página» (57) · **Recomendada: A.** El actual ya cumple.
- **/precio-agencia-marketing-digital** · A: «Cuánto cuesta una agencia de marketing digital en Chile» (55) · B: «Precio de una agencia de marketing en Chile: rangos 2026» (56) · **Recomendada: A.** El actual ya cumple. «2026» solo convendría si los rangos se actualizan cada año.
- **/cuanto-invertir-en-publicidad-digital** · A: «Cuánto invertir en publicidad digital: guía para pymes» (54) · B: «Presupuesto de publicidad digital: cómo calcularlo» (50) · **Recomendada: A.** El actual ya cumple.
- **/cuentas-publicitarias-a-tu-nombre** · A: «Cuentas de Google Ads y Meta a tu nombre: guía» (46) · B: «Cuentas publicitarias a nombre de tu empresa: cómo hacerlo» (58) · **Recomendada: B.** La consulta de la sección 9 es «cuentas publicitarias a nombre de la empresa». La B la recoge casi literal.
- **/auditoria-de-campanas-publicitarias** · A: «Auditoría de campañas en Google Ads y Meta: checklist» (53) · B: «Cómo auditar tus campañas de Google Ads y Meta Ads» (50) · **Recomendada: A.** El actual ya cumple.
- **/google-partner-meta-business-partner** · A: «Google Partner y Meta Business Partner: qué significan» (54) · B: «Google Partner: qué significa y qué no te garantiza» (51) · **Recomendada: A.** El actual ya cumple.
- **/kpis-para-evaluar-agencia-de-marketing** · A: «KPIs para evaluar a tu agencia de marketing digital» (51) · B: «Qué KPIs pedirle a tu agencia de marketing cada mes» (51) · **Recomendada: A.** El actual ya cumple.

### 7.3 Extra: las 3 fichas del glosario con más impresiones

No estaban en el alcance pedido, pero son la 3.ª, 4.ª y 5.ª página del sitio por impresiones.

| URL | Title actual (car.) | Impr. 28 d | CTR | Pos. | Title propuesto (car.) | Description propuesta (car.) |
|---|---|---|---|---|---|---|
| /glosario-gtm | ¿Qué es GTM y cómo auditar tu Google Tag Manager? — Condado Digital (67) | 149 | 0 % | 26.4 | **Qué es GTM (Google Tag Manager) y cómo auditarlo** (48) | Qué es Google Tag Manager (GTM), cómo funcionan etiquetas, activadores y variables, y una lista para auditar tu contenedor paso a paso. (135) |
| /glosario-cvr | ¿Qué es el CVR? Tasa de conversión en Meta y Google Ads — Condado Digital (73) | 99 | 0 % | 9.6 | **Qué es el CVR: tasa de conversión en Meta y Google Ads** (54) | Qué es el CVR o tasa de conversión, cómo se calcula, cómo leerlo en Meta Ads y Google Ads y qué es un buen CVR, con un ejemplo completo en pesos. (145) |
| /glosario-ctr | ¿Qué es el CTR y cómo se calcula? Fórmula y ejemplo — Condado Digital (69) | 112 | 0,89 % | 64.4 | **Qué es el CTR y cómo se calcula: fórmula y ejemplo** (50) | Qué es el CTR, su fórmula (clics ÷ impresiones × 100), cómo calcularlo paso a paso, qué es un buen CTR en Meta y Google Ads y un ejemplo en pesos. (146) |

- **/glosario-gtm** · A: «Qué es GTM (Google Tag Manager) y cómo auditarlo» (48) · B: «GTM: qué es Google Tag Manager y cómo auditar tu contenedor» (59) · **Recomendada: A.** Sigla y nombre completo al inicio, y la tarea «auditar» que aparece en las consultas.
- **/glosario-cvr** · A: «Qué es el CVR: tasa de conversión en Meta y Google Ads» (54) · B: «CVR: qué es, fórmula y un buen CVR en Meta Ads» (46) · **Recomendada: A.** Está en posición 9,6: la A quita el sufijo y deja la promesa completa visible.
- **/glosario-ctr** · A: «Qué es el CTR y cómo se calcula: fórmula y ejemplo» (50) · B: «Fórmula del CTR: cómo calcularlo paso a paso» (44) · **Recomendada: A.** Recoge «cómo se calcula» y «fórmula», las dos familias de consultas con más impresiones.

**Patrón para las 16 fichas:** «Qué es el [SIGLA]: [lo que se busca: fórmula / cómo se calcula / en Meta Ads]». Quedan en 45–55 caracteres sin el sufijo.

---

## 8. Lo que falta registrar o activar en Google y Bing

Revisado el 27-11-2026 con Claude in Chrome, solo leyendo. No cambié ninguna configuración.

### 8.1 Estado actual

| Servicio | Qué vi | Estado |
|---|---|---|
| Search Console: tipo de propiedad | `sc-domain:condadodigital.cl` (**propiedad de dominio**: cubre www, apex, http y https) | Bien |
| Search Console: usuarios | 2: `admin@condadodigital.cl` (Propietario verificado) y `el-conde@condado-digital-agentes.iam.gserviceaccount.com` (cuenta de servicio, permiso **Completo**) | La cuenta de servicio es la que usa la herramienta de datos (la misma con la que hice las consultas de este informe). **Por validar** si sigue en uso; si no, quítala. Si sigue, con permiso «Restringido» basta para leer |
| Search Console ↔ GA4 | Asociado con la propiedad GA4 «condadodigital.cl», flujo «Sitio web» (desde GA4: vinculado el 10-11-2026 por admin@condadodigital.cl) | Bien |
| Search Console ↔ Google Ads | **No aparece** en «Asociaciones» (solo GA4) | **Falta** |
| Search Console: sitemap | 1 sitemap, 0 errores | Bien |
| GA4 ↔ Google Ads | Cuenta «Condado Digital» 936-634-3954, publicidad personalizada habilitada, vinculada el 08-11-2026 | Bien |
| GA4: retención de datos | Eventos 14 meses, usuarios 14 meses | Bien |
| GA4: dimensiones personalizadas | **0** | **Falta**: registrar `ubicacion`, `servicio`, `formulario` y `origen` (ámbito evento) |
| GA4: eventos clave | `generate_lead` (con datos). `close_convert_lead`, `purchase` y `qualify_lead` sin datos | Bien. Considera marcar también `servicio_click` como evento clave secundario, o al menos medirlo en un informe |
| GA4: tráfico interno | `tagassistant.google.com / referral` es la 1.ª fuente de sesiones de la semana (11 de 27) | **Falta** definir tráfico interno, activar el filtro y excluir referencias de tagassistant.google.com (**por validar** si ya existe un filtro en estado «Prueba») |
| GA4 ↔ Perfil de Empresa | No pude abrir la pantalla de vinculación | Por validar (y depende de verificar el perfil) |
| Perfil de Empresa de Google | «Condado Digital», empresa de área de servicio (Valparaíso, Rancagua y 10 áreas más). **«Requiere la verificación»: 0 % verificado** | **Falta verificar** |
| Bing Webmaster Tools | En este Chrome no hay sesión: la página redirige a la presentación | **Por validar.** No hay etiqueta `msvalidate.01` ni `BingSiteAuth.xml`, así que lo más probable es que no esté |
| IndexNow | Sin archivo de clave | Falta (lo resuelve Crawler Hints de Cloudflare) |
| Google Discover | **Ninguna página tiene `max-image-preview:large`** y los artículos no tienen imagen propia | Falta |
| Verificación de dominio de Meta | Presente (`facebook-domain-verification`) | Bien |

### 8.2 Qué hacer, en orden de prioridad

1. **GA4: registrar las dimensiones personalizadas** `ubicacion`, `servicio`, `formulario` y `origen` (Administrar → Definiciones personalizadas → Crear dimensión personalizada, ámbito «Evento»). Sin esto no se puede medir el camino del contenido al servicio, que es la pregunta de negocio. No es retroactivo: cada día de espera es un día sin dato.
2. **GA4: excluir el tráfico interno y Tag Assistant:**
   - Administrar → Flujos de datos → Sitio web → Configurar etiqueta → Definir tráfico interno (tu IP).
   - Administrar → Filtros de datos → activar «Tráfico interno».
   - En la misma configuración de etiqueta, «Lista de referencias no deseadas» → `tagassistant.google.com`.
3. **Verificar el Perfil de Empresa de Google** (business.google.com → Verificar). Para una empresa de área de servicio, Google suele pedir un video o una llamada. Después:
   - completar categorías («Agencia de marketing», «Consultor de marketing»), servicios con descripción, horario, sitio web con UTM (`?utm_source=google&utm_medium=organic&utm_campaign=perfil`) y logo;
   - publicar una entrada con el enlace a /fechas-comerciales-chile;
   - pedir las primeras reseñas a clientes reales.
4. **Bing Webmaster Tools:** entra a bing.com/webmasters con una cuenta Microsoft, «Mis sitios» → **Importar** desde Google Search Console. Verifica el sitio y trae el sitemap sin tocar el código ([Bing, importar desde Search Console](https://blogs.bing.com/webmaster/2019/9/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools/)).
5. **Cloudflare → Caching → Configuration → Crawler Hints: activar.** Así Bing (vía IndexNow) se entera de cada cambio. Es gratis ([Cloudflare, Crawler Hints](https://developers.cloudflare.com/cache/about/crawler-hints/)). Aprovecha para revisar **Seguridad → Bots / AI Crawl Control** (sección 4.1).
6. **Search Console ↔ Google Ads:** en Google Ads → Herramientas → Cuentas vinculadas → Search Console, vincula `condadodigital.cl`. Habilita el informe «Pagado y orgánico», útil cuando corras campañas propias.
7. **Discover y miniaturas:**
   - agregar `<meta name="robots" content="max-image-preview:large">` a las páginas indexables;
   - crear una imagen de al menos 1.200 px de ancho por artículo y ponerla en `og:image` y en el `image` del Article.
   Google recomienda imágenes de al menos 1.200 px de ancho y 300.000 píxeles para Discover ([Google, aparecer en Discover](https://developers.google.com/search/docs/appearance/google-discover)) y varias proporciones (16:9, 4:3, 1:1) para Article ([Google, Article](https://developers.google.com/search/docs/appearance/structured-data/article)).
8. **Search Console: pedir la indexación** de las páginas clave sin indexar (sección 1.1), unas 10 por día.
9. **Revisar la cuenta de servicio** de Search Console (8.1): bajarla a permiso «Restringido» o quitarla si ya no se usa.

### 8.3 Otras opciones para un sitio de contenido y servicios en Chile

| Opción | Qué es | ¿Vale la pena ahora? |
|---|---|---|
| **Canal de YouTube vinculado** | El canal ya está en `sameAs`. Vincularlo a Google Ads (Herramientas → Cuentas vinculadas → YouTube) y a GA4 permite audiencias y medición de videos | **Sí, cuando haya videos.** Hoy el inicio tiene 1 video. Si publicas los videos «paso a paso», cada uno con enlace a su artículo, suma presencia en Google Videos y en las respuestas de IA, que citan YouTube con frecuencia |
| **Panel de conocimiento de la marca** | Google lo genera solo cuando reconoce la entidad. No se solicita; se gana con coherencia de Organization, perfiles sociales activos y menciones en terceros | **Todavía no.** Primero: Perfil de Empresa verificado, `sameAs` coherente y 5 a 10 menciones externas (sección 9). Reclamarlo es posible después |
| **Perfil personal de autor** | Una página de autor (/acerca#fundador ya lo es) con enlaces a LinkedIn personal, charlas y entrevistas | **Sí, barato.** Sumar a /acerca años de experiencia, certificaciones y 2 o 3 casos |
| **Google Merchant Center** | Para vender productos | No aplica (no vendes productos) |
| **Google News / Publisher Center** | Para medios de noticias | **No ahora.** /noticias está en `noindex` y sin contenido |
| **Wikidata** | Ficha de la entidad que usan Google y los asistentes | **No ahora.** Wikidata exige notoriedad con fuentes independientes; crearla sin eso suele terminar borrada |
