// El Conde: asistente guiado de condadodigital.cl.
// No es un chat con IA: todo sale del propio sitio y no se envía nada a ningún servidor
// (solo los eventos de dataLayer, que gobierna Consent Mode).
// Este módulo se descarga la primera vez que alguien abre el panel (ver el cargador en script.js).

const CEL = window.matchMedia("(max-width: 600px)");
// La caminata está desactivada: con el panel abierto El Conde espera de pie (decisión del 10-11-2026).
// Para volver a activarla, cambia a true y en personaje() marca camina = true en el menú.
const CAMINA = false;
const QUIETO = window.matchMedia("(prefers-reduced-motion: reduce)");
const IMG = new URL("img/conde/", import.meta.url).href;
const TERMINOS_URL = new URL("conde-terminos.json", import.meta.url);

const TEMAS = { metricas: "Métricas", plataformas: "Plataformas y campañas", audiencias: "Audiencias", pujas: "Pujas y presupuesto", formatos: "Creatividad y formatos", medicion: "Medición y datos", estrategia: "Estrategia", ia: "Buscadores e IA" };

// Las 20 calculadoras de /calculadoras (mismos nombres, preguntas y fórmulas)
const C = {
  "roas": { n: "ROAS", s: "Retorno de la inversión publicitaria", p: "¿Cuánto vuelve por cada peso en anuncios?", fo: "ROAS = ingresos ÷ inversión" },
  "roi": { n: "ROI", s: "Retorno de la inversión", p: "¿Cuánto gano de verdad, descontando todos los costos?", fo: "ROI = (ingresos − costos) ÷ costos × 100" },
  "cpc": { n: "CPC", s: "Costo por clic", p: "¿Cuánto pago cada vez que alguien hace clic?", fo: "CPC = inversión ÷ clics" },
  "cpm": { n: "CPM", s: "Costo por mil impresiones", p: "¿Cuánto cuesta que me vean mil veces?", fo: "CPM = inversión ÷ impresiones × 1.000" },
  "cpv": { n: "CPV", s: "Costo por visualización", p: "¿Cuánto pago por cada vez que ven mi video?", fo: "CPV = inversión ÷ visualizaciones" },
  "cpl": { n: "CPL", s: "Costo por lead", p: "¿Cuánto me cuesta cada contacto interesado?", fo: "CPL = inversión ÷ leads" },
  "cpa": { n: "CPA", s: "Costo por adquisición", p: "¿Cuánto me cuesta cada venta o conversión?", fo: "CPA = inversión ÷ conversiones" },
  "ctr": { n: "CTR", s: "Tasa de clics", p: "¿Mi anuncio llama la atención?", fo: "CTR = clics ÷ impresiones × 100" },
  "cvr": { n: "CVR", s: "Tasa de conversión", p: "¿Los clics se convierten en resultados?", fo: "CVR = conversiones ÷ clics × 100" },
  "frecuencia": { n: "Frecuencia", s: "Veces que te ve cada persona", p: "¿Estoy cansando a mi público?", fo: "Frecuencia = impresiones ÷ alcance" },
  "hook-rate": { n: "Hook rate", s: "Tasa de enganche del video", p: "¿Los primeros 3 segundos detienen el scroll?", fo: "Hook rate = reproducciones de 3 s ÷ impresiones × 100" },
  "hold-rate": { n: "Hold rate", s: "Tasa de retención del video", p: "¿Los que se detienen se quedan a ver el video?", fo: "Hold rate = ThruPlays ÷ reproducciones de 3 s × 100" },
  "engagement": { n: "ER alcance", s: "Tasa de interacción (engagement) por alcance", p: "¿Mi contenido genera conversación?", fo: "Engagement = interacciones ÷ alcance × 100" },
  "er-seg": { n: "ER seguidores", s: "Tasa de interacción (engagement) por seguidores", p: "¿Mi comunidad interactúa con lo que publico?", fo: "Engagement = interacciones ÷ seguidores × 100" },
  "crec-seg": { n: "Crecimiento", s: "Crecimiento de seguidores", p: "¿Mi cuenta está creciendo?", fo: "Crecimiento = (ganados − perdidos) ÷ seguidores iniciales × 100" },
  "tasa-guardado": { n: "Guardados", s: "Tasa de guardados", p: "¿Mi contenido es tan útil que lo guardan?", fo: "Tasa de guardados = guardados ÷ alcance × 100" },
  "ticket": { n: "Ticket", s: "Ticket promedio", p: "¿Cuánto compra cada cliente en promedio?", fo: "Ticket promedio = ingresos ÷ pedidos" },
  "cac": { n: "CAC", s: "Costo de adquisición de clientes", p: "¿Cuánto me cuesta conseguir un cliente nuevo?", fo: "CAC = (marketing + ventas) ÷ clientes nuevos" },
  "ltv": { n: "LTV", s: "Valor de vida del cliente", p: "¿Cuánto me deja un cliente en toda la relación?", fo: "LTV = ticket × compras por año × años × margen" },
  "ltv-cac": { n: "LTV/CAC", s: "Relación valor del cliente vs. costo", p: "¿Cuántas veces recupero lo que pagué por un cliente?", fo: "LTV/CAC = LTV ÷ CAC" }
};
// Calculadora → término del glosario
const CALC_TERM = { "cac": "cac", "cpa": "cpa", "cpc": "cpc", "cpl": "cpl", "cpm": "cpm", "cpv": "cpv", "ctr": "ctr", "cvr": "cvr", "frecuencia": "frecuencia", "hold-rate": "hold-rate", "hook-rate": "hook-rate", "ltv": "ltv", "ltv-cac": "ltv-cac", "roas": "roas", "roi": "roi", "engagement": "tasa-de-interaccion-o-engagement", "ticket": "ticket-promedio" };

const ARBOL = { p: "¿Qué quieres saber?", o: [
  { txt: "Si estoy ganando plata", s: { p: "¿Qué números tienes a mano?", o: [
    { txt: "Ventas y lo que gasto en anuncios", fin: "roas" },
    { txt: "Ventas y todos mis costos (producto, envío, equipo)", fin: "roi" }] } },
  { txt: "Cuánto me cuesta cada resultado", s: { p: "¿Qué resultado estás pagando?", o: [
    { txt: "Cada clic", fin: "cpc" },
    { txt: "Que me vean (mil impresiones)", fin: "cpm" },
    { txt: "Cada vista de mi video", fin: "cpv" },
    { txt: "Cada contacto interesado (lead)", fin: "cpl" },
    { txt: "Cada venta o conversión", fin: "cpa" }] } },
  { txt: "Si mi anuncio funciona", s: { p: "¿Qué está pasando con tu anuncio?", o: [
    { txt: "Lo ven, pero casi nadie hace clic", fin: "ctr" },
    { txt: "Hacen clic, pero no compran ni escriben", fin: "cvr" },
    { txt: "Lleva semanas y siento que la gente se cansó", fin: "frecuencia" }] } },
  { txt: "Si mi contenido engancha", s: { p: "¿Qué publicas?", o: [
    { txt: "Videos", s: { p: "¿Dónde se te cae el video?", o: [
      { txt: "Nadie se detiene a verlo", fin: "hook-rate" },
      { txt: "Se detienen, pero se van antes del final", fin: "hold-rate" }] } },
    { txt: "Publicaciones en general", s: { p: "¿Qué quieres medir?", o: [
      { txt: "Interacción según cuántos lo vieron", fin: "engagement" },
      { txt: "Interacción según mis seguidores", fin: "er-seg" },
      { txt: "Si mi cuenta está creciendo", fin: "crec-seg" },
      { txt: "Si lo guardan porque les sirve", fin: "tasa-guardado" }] } }] } },
  { txt: "Cuánto vale un cliente", s: { p: "¿Qué quieres saber del cliente?", o: [
    { txt: "Cuánto compra en promedio", fin: "ticket" },
    { txt: "Cuánto me cuesta conseguirlo", fin: "cac" },
    { txt: "Cuánto me deja en toda la relación", fin: "ltv" },
    { txt: "Si recupero lo que pago por él", fin: "ltv-cac" }] } }
] };

const RUTAS = [
  { id: "partiendo", t: "Estoy partiendo", s: "Entender las bases antes de invertir un peso.", a: [["que-es-el-marketing-digital", "Marketing digital"], ["marketing-tradicional-vs-digital", "Tradicional vs. digital"], ["embudo-de-marketing", "Embudo de marketing"]] },
  { id: "invierto", t: "Ya invierto en anuncios", s: "Saber si tus anuncios dejan plata.", a: [["embudo-de-marketing", "Embudo de marketing"], ["marketing-con-ia", "Marketing con IA"], ["analitica-digital", "Analítica digital"]] },
  { id: "encontrar", t: "Quiero que me encuentren", s: "Aparecer en Google y en las respuestas de la IA.", a: [["publicidad-pagada-vs-organica", "Pagada vs. orgánica"], ["marketing-con-ia", "Marketing con IA"], ["analitica-digital", "Analítica digital"]] }
];

const MENU = [
  { id: "glosario", t: "¿Qué significa…?", s: "Busca entre los 168 términos del glosario", dice: "¡Te busco esa palabra!", ico: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>' },
  { id: "calculadora", t: "¿Qué calculadora uso?", s: "2 o 3 preguntas y te digo cuál", dice: "¡Vamos con los números!", ico: '<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7.5h7M8.5 12h1M12 12h1M15 12h.5M8.5 16h1M12 16h1M15 16h.5"/>' },
  { id: "rutas", t: "¿Por dónde empiezo?", s: "3 rutas de lectura de la Enciclopedia", dice: "¡Te armo la ruta!", ico: '<path d="M5 19c0-4 3-5 7-5s7-3 7-7"/><circle cx="5" cy="19" r="1.8"/><circle cx="19" cy="6" r="1.8"/>' },
  { id: "asesoria", t: "Quiero una asesoría", s: "Abre el formulario de contacto", dice: "¡Te abro el formulario!", ico: '<path d="M4 6h16v10H9l-5 4z"/>' }
];
const CICLO = ["Mmm… ¿una palabra?", "¿O una calculadora?", "¿Por dónde empezar?", "¿Una asesoría?"];

const X_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
const FLECHA = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#55635B" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
function medir(evento, datos) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.assign({ event: evento }, datos || {}));
}
// Texto buscado sin resultados: en minúsculas y hasta 40 caracteres; nada si parece un correo o un teléfono
function sinResultados(q) {
  const t = String(q).toLowerCase().trim();
  if (/@/.test(t) || /(\d[\s.\-()]*){7,}/.test(t)) return "sin_resultados";
  return "sin_resultados:" + t.slice(0, 40);
}

// ---------- Glosario ----------
let IDX = null, cargaTerminos = null;
function terminos() {
  if (!cargaTerminos) {
    cargaTerminos = fetch(TERMINOS_URL).then((r) => { if (!r.ok) throw new Error(); return r.json(); }).then((filas) => {
      IDX = filas.map((r) => ({ id: r[0], t: r[1], f: r[2], d: r[3], calc: r[4], pub: r[5], tema: r[6], nt: norm(r[0] + " " + r[1]), nf: norm(r[2]), nd: norm(r[3]) }));
      return IDX;
    }).catch((e) => { cargaTerminos = null; throw e; });
  }
  return cargaTerminos;
}
function buscar(q) {
  const n = norm(q);
  if (!n || !IDX) return [];
  const out = [];
  IDX.forEach((x) => {
    let r = -1;
    if (norm(x.t).indexOf(n) === 0) r = 0;
    else if (x.nt.indexOf(n) >= 0) r = 1;
    else if (x.nf.indexOf(n) >= 0) r = 2;
    else if (n.length >= 4 && x.nd.indexOf(n) >= 0) r = 3;
    if (r >= 0) out.push({ x: x, r: r });
  });
  out.sort((a, b) => a.r - b.r || a.x.t.length - b.x.t.length);
  return out.map((o) => o.x);
}

// =====================================================================
export function iniciar(ctx) {
  const boton = ctx.boton;
  let abierto = false, vista = "menu", hover = null, q = "", termId = null, ruta = [];
  let ultimoSinRes = "", timerSinRes = null;

  // ---------- Estructura ----------
  const fondo = document.createElement("div");
  fondo.className = "conde-fondo";
  fondo.hidden = true;
  fondo.setAttribute("aria-hidden", "true");

  const panel = document.createElement("section");
  panel.id = "conde-panel";
  panel.className = "conde-panel";
  panel.hidden = true;
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-labelledby", "conde-tit");
  panel.innerHTML =
    '<div class="conde-cab conde-osc">' +
    '<span class="conde-cab-cara" aria-hidden="true"><img src="' + IMG + 'conde-frente-cabeza.webp" alt="" width="135" height="143"></span>' +
    '<div class="conde-cab-tx"><h2 id="conde-tit">El Conde</h2><p>Ayuda rápida del sitio</p></div>' +
    '<button type="button" class="conde-x" aria-label="Cerrar la ayuda">' + X_SVG + "</button>" +
    '<span class="conde-cab-linea" aria-hidden="true"></span></div>' +
    '<div class="conde-cuerpo"></div>' +
    '<p class="conde-pie"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F766E" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>No guardamos tus datos. Si una búsqueda no da resultados, la registramos sin datos personales para sumar ese término al glosario.</p>';
  const cuerpo = panel.querySelector(".conde-cuerpo");

  // Personaje (decorativo)
  const figura = document.createElement("div");
  figura.className = "conde-figura";
  figura.hidden = true;
  figura.setAttribute("aria-hidden", "true");
  const pieza = (archivo, ancho, alto, clase, estilo) => '<img class="' + clase + '" src="' + IMG + archivo + '" alt="" width="' + ancho + '" height="' + alto + '" decoding="async" style="' + estilo + '">';
  figura.innerHTML =
    '<div class="conde-mov">' +
    '<div class="conde-globo-pos"><p class="conde-globo"></p></div>' +
    '<span class="conde-sombra"></span>' +
    '<div class="conde-gira">' +
    (CAMINA ? '<div class="conde-perfil"><div class="conde-rebote">' +
    pieza("conde-perfil-brazo.webp", 69, 181, "conde-ba", "") +
    pieza("conde-perfil-pierna.webp", 86, 111, "conde-pa", "") +
    pieza("conde-perfil-pierna.webp", 86, 111, "conde-pf", "") +
    pieza("conde-perfil-torso.webp", 150, 166, "conde-torso", "") +
    pieza("conde-perfil-cabeza.webp", 150, 151, "conde-cab2", "") +
    pieza("conde-perfil-brazo.webp", 69, 181, "conde-bf", "") +
    "</div></div>" : "") +
    '<div class="conde-frente"><div class="conde-accion">' +
    pieza("conde-frente-cuerpo.webp", 208, 269, "conde-cuerpo-img", "") +
    pieza("conde-frente-cabeza.webp", 135, 143, "conde-cabeza", "") +
    '<span class="conde-chispa conde-ch1"></span><span class="conde-chispa conde-ch2"></span><span class="conde-chispa conde-ch3"></span>' +
    "</div></div></div></div>";
  // En celular el globo va fijo arriba al centro (no se mueve con El Conde)
  const globoFijo = document.createElement("div");
  globoFijo.className = "conde-globo-fijo";
  globoFijo.hidden = true;
  globoFijo.setAttribute("aria-hidden", "true");
  globoFijo.innerHTML = '<p class="conde-globo"></p>';

  document.body.append(fondo, figura, globoFijo, panel);
  const mov = figura.querySelector(".conde-mov");
  const accion = figura.querySelector(".conde-accion");

  // ---------- Personaje: acción y globo ----------
  function globo(texto, cicla) {
    [figura.querySelector(".conde-globo"), globoFijo.querySelector(".conde-globo")].forEach((g) => {
      g.classList.toggle("conde-ciclo", !!cicla);
      g.innerHTML = cicla ? CICLO.map((t) => "<span>" + esc(t) + "</span>").join("") : "<span>" + esc(texto) + "</span>";
      g.hidden = !cicla && !texto;
      // reinicia la entrada del globo
      g.classList.remove("conde-globo-in"); void g.offsetWidth; g.classList.add("conde-globo-in");
    });
  }
  let accionActual = "", globoActual = null;
  function personaje() {
    let acc = "idle", txt = "", cicla = false, camina = false, pausa = false;
    if (vista === "menu") {
      // Con el panel abierto El Conde no camina: espera de pie junto al panel
      if (hover === null) { acc = "piensa"; cicla = true; } else { acc = "asiente"; txt = MENU[hover].dice; }
    } else if (vista === "glosario") {
      const res = buscar(q);
      if (termId) { acc = "explica"; txt = "Esto significa…"; }
      else if (norm(q)) { acc = "piensa"; txt = res.length ? "Déjame ver…" : "Mmm, ese no lo tengo"; }
      else { txt = "Escribe y lo busco"; }
    } else if (vista === "calc") {
      if (finCalc()) { acc = "celebra"; txt = "¡Esa te sirve!"; } else { acc = "piensa"; txt = "Pregunta " + (ruta.length + 1); }
    } else if (vista === "rutas") { acc = "explica"; txt = "Elige tu ruta"; }
    mov.classList.toggle("conde-camina", camina);
    mov.classList.toggle("conde-pausa", pausa);
    if (acc !== accionActual) {
      accion.className = "conde-accion conde-act-" + acc;
      accionActual = acc;
    }
    const clave = cicla ? "*ciclo*" : txt;
    if (clave !== globoActual) { globoActual = clave; globo(txt, cicla); }
  }
  function medidas() {
    // Recorrido de la caminata: lo que quepa a la izquierda del panel (escritorio) o del borde (celular)
    const cel = CEL.matches;
    const track = cel ? Math.min(272, window.innerWidth - 16 - 70 - 16) : Math.max(0, Math.min(820, window.innerWidth - 440 - 110 - 24));
    mov.style.setProperty("--conde-track", track + "px");
    mov.style.setProperty("--conde-ciclo", (cel ? 0.95 : 0.75) + "s");
    mov.style.setProperty("--conde-vuelta", (cel ? 16 : 20) + "s");
    panel.setAttribute("aria-modal", cel ? "true" : "false");
    fondo.hidden = !(abierto && cel);
    globoFijo.hidden = !(abierto && cel);
    figura.classList.toggle("conde-figura-cel", cel);
  }

  // ---------- Vistas ----------
  function enfocarTitulo() {
    const h = cuerpo.querySelector("h3");
    if (h) h.focus({ preventScroll: true });
    cuerpo.scrollTop = 0;
  }
  function volverBtn() { return '<button type="button" class="conde-volver" data-accion="menu">← Volver</button>'; }

  function vistaMenu() {
    cuerpo.innerHTML =
      '<div class="conde-saludo">Hola, soy El Conde. Te ayudo a encontrar lo que buscas en el sitio, sin vueltas.</div>' +
      '<p class="conde-etq">¿Qué necesitas?</p>' +
      '<div class="conde-ops">' + MENU.map((m, i) =>
        '<button type="button" class="conde-op" data-op="' + i + '"' + (m.id === "asesoria" ? ' aria-haspopup="dialog"' : "") + ">" +
        '<span class="conde-op-ico' + (m.id === "asesoria" ? " conde-op-ico-verde" : "") + '" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="' + (m.id === "asesoria" ? "#C8F169" : "#2DD4BF") + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' + m.ico + "</svg></span>" +
        '<span class="conde-op-tx"><strong>' + m.t + "</strong><span>" + m.s + "</span></span>" + FLECHA + "</button>").join("") +
      "</div>";
    cuerpo.querySelectorAll(".conde-op").forEach((b) => {
      const i = Number(b.dataset.op);
      const on = () => { hover = i; personaje(); };
      const off = () => { if (hover === i) { hover = null; personaje(); } };
      b.addEventListener("mouseenter", on); b.addEventListener("focus", on);
      b.addEventListener("mouseleave", off); b.addEventListener("blur", off);
      b.addEventListener("click", () => elegirOpcion(MENU[i].id));
    });
  }

  function elegirOpcion(id) {
    medir("conde_opcion", { opcion: id });
    hover = null;
    if (id === "asesoria") { asesoria(); return; }
    if (id === "glosario") { q = ""; termId = null; mostrar("glosario"); }
    if (id === "calculadora") { ruta = []; mostrar("calc"); }
    if (id === "rutas") mostrar("rutas");
  }

  function vistaGlosario() {
    cuerpo.innerHTML = volverBtn() +
      '<h3 tabindex="-1">¿Qué significa…?</h3>' +
      '<label for="conde-q" class="conde-label">Escribe una sigla o una palabra</label>' +
      '<input id="conde-q" class="conde-input" type="search" autocomplete="off" spellcheck="false" placeholder="Por ejemplo: ROAS, píxel, lookalike">' +
      '<p class="conde-conteo" aria-live="polite"></p>' +
      '<div class="conde-glos-res"></div>';
    const input = cuerpo.querySelector("#conde-q");
    input.value = q;
    input.addEventListener("input", () => { q = input.value; termId = null; pintarGlosario(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { const r = buscar(q); if (r.length) { e.preventDefault(); verTermino(r[0].id); } }
    });
    pintarGlosario();
    terminos().then(() => pintarGlosario()).catch(() => {
      cuerpo.querySelector(".conde-conteo").textContent = "No pude cargar el glosario. Revisa tu conexión o abre el glosario completo.";
    });
  }
  function pintarGlosario() {
    const zona = cuerpo.querySelector(".conde-glos-res"), conteo = cuerpo.querySelector(".conde-conteo");
    if (!zona) return;
    if (!IDX) { conteo.textContent = "Cargando los términos…"; zona.innerHTML = ""; personaje(); return; }
    const sel = termId ? IDX.find((x) => x.id === termId) : null;
    const hayQ = norm(q).length > 0;
    const res = buscar(q);
    clearTimeout(timerSinRes);
    if (sel) {
      conteo.textContent = "Definición de " + sel.t + ".";
      zona.innerHTML =
        '<article class="conde-ficha">' +
        '<p class="conde-ficha-tema">' + esc(TEMAS[sel.tema] || "") + "</p>" +
        "<h4>" + esc(sel.t) + "</h4>" +
        (sel.f ? '<p class="conde-ficha-full">' + esc(sel.f) + "</p>" : "") +
        '<p class="conde-ficha-def">' + esc(sel.d) + "</p>" +
        '<div class="conde-ficha-acc">' +
        (sel.calc ? '<a class="conde-btn-verde" href="calculadoras#' + esc(sel.calc) + '">Calcular mi ' + esc(sel.t) + "</a>" : "") +
        '<a class="conde-btn-linea" href="glosario#' + esc(sel.id) + '">Ver en el glosario →</a>' +
        (sel.pub === 1 ? '<a class="conde-link conde-link-bloque" href="glosario-' + esc(sel.id) + '">Leer la ficha completa</a>' : "") +
        "</div></article>" +
        '<button type="button" class="conde-volver" data-accion="otro">← Buscar otro término</button>';
    } else if (hayQ && res.length) {
      conteo.textContent = res.length === 1 ? "1 término encontrado." : res.length + " términos encontrados" + (res.length > 6 ? "; te muestro los 6 más cercanos." : ".");
      zona.innerHTML = '<ul class="conde-lista">' + res.slice(0, 6).map((x) =>
        '<li><button type="button" class="conde-res" data-id="' + esc(x.id) + '"><strong>' + esc(x.t) + "</strong> <span>" + esc(x.f) + "</span></button></li>").join("") + "</ul>";
      zona.querySelectorAll(".conde-res").forEach((b) => b.addEventListener("click", () => verTermino(b.dataset.id)));
    } else if (hayQ) {
      conteo.textContent = "Sin resultados.";
      zona.innerHTML = '<div class="conde-caja">No encontré «' + esc(q.trim()) + '» en el glosario. Prueba con la sigla en inglés o en español, o <a class="conde-link" href="glosario">revisa el glosario completo</a>.</div>';
      const texto = q;
      timerSinRes = setTimeout(() => {
        if (norm(texto) === ultimoSinRes) return; // la misma búsqueda se mide una vez
        ultimoSinRes = norm(texto);
        medir("conde_resultado", { destino: sinResultados(texto) });
      }, 1200);
    } else {
      conteo.textContent = "Hay " + IDX.length + " términos. Escribe para filtrar.";
      zona.innerHTML = "";
    }
    personaje();
  }
  function verTermino(id) {
    termId = id;
    pintarGlosario();
    medir("conde_resultado", { destino: "glosario#" + id });
    const h = cuerpo.querySelector(".conde-ficha h4");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }

  function finCalc() {
    let nodo = ARBOL, fin = null;
    ruta.forEach((i) => { if (fin || !nodo) return; const o = nodo.o[i]; if (o.fin) fin = o.fin; else nodo = o.s; });
    return fin;
  }
  function vistaCalc() {
    let nodo = ARBOL, fin = null;
    const elegidos = [];
    ruta.forEach((i) => { if (fin || !nodo) return; const o = nodo.o[i]; elegidos.push(o.txt.toLowerCase()); if (o.fin) fin = o.fin; else nodo = o.s; });
    let html = volverBtn() + '<h3 tabindex="-1">¿Qué calculadora uso?</h3>';
    if (!fin) {
      html += '<fieldset class="conde-preg"><legend><span class="conde-etq">Pregunta ' + (ruta.length + 1) + '</span><span class="conde-preg-tx">' + esc(nodo.p) + "</span></legend>" +
        '<div class="conde-ops conde-ops-chicas">' + nodo.o.map((o, i) => '<button type="button" class="conde-op conde-op-chica" data-i="' + i + '">' + esc(o.txt) + "</button>").join("") + "</div></fieldset>" +
        (ruta.length ? '<button type="button" class="conde-volver" data-accion="atras">← Pregunta anterior</button>' : "");
    } else {
      const c = C[fin], tId = CALC_TERM[fin];
      html += '<div class="conde-rec conde-osc">' +
        '<p class="conde-rec-etq">Te sirve esta</p>' +
        '<p class="conde-rec-n">' + esc(c.n) + "</p>" +
        '<p class="conde-rec-s">' + esc(c.s) + "</p>" +
        '<p class="conde-rec-p">' + esc(c.p) + "</p>" +
        '<p class="conde-rec-fo">' + esc(c.fo) + "</p>" +
        '<a class="conde-btn-lima" href="calculadoras#' + fin + '">' + (/^[A-Z/]+$/.test(c.n) ? "Abrir la calculadora de " + esc(c.n) : "Abrir la calculadora") + "</a></div>" +
        '<p class="conde-porque">Por tus respuestas: ' + esc(elegidos.join(" → ")) + ".</p>" +
        '<div class="conde-rec-acc">' +
        (tId ? '<button type="button" class="conde-volver conde-subrayado" data-accion="ver-term" data-term="' + tId + '" data-n="' + esc(c.n) + '">Ver la definición en el glosario</button>' : "") +
        '<button type="button" class="conde-volver" data-accion="reiniciar">Empezar de nuevo</button></div>';
    }
    cuerpo.innerHTML = html;
    cuerpo.querySelectorAll(".conde-op-chica").forEach((b) => b.addEventListener("click", () => {
      ruta = ruta.concat([Number(b.dataset.i)]);
      vistaCalc(); personaje();
      const f = finCalc();
      if (f) {
        medir("conde_resultado", { destino: "calculadoras#" + f });
        const n = cuerpo.querySelector(".conde-rec-n"); if (n) { n.setAttribute("tabindex", "-1"); n.focus({ preventScroll: true }); }
      } else {
        const l = cuerpo.querySelector(".conde-op-chica"); if (l) l.focus({ preventScroll: true });
      }
    }));
  }

  function vistaRutas() {
    cuerpo.innerHTML = volverBtn() +
      '<h3 tabindex="-1">¿Por dónde empiezo?</h3>' +
      '<p class="conde-intro">Elige la frase que más se parece a ti. Cada ruta son 3 artículos de la Enciclopedia.</p>' +
      '<div class="conde-rutas">' + RUTAS.map((r) =>
        '<article class="conde-ruta" data-ruta="' + r.id + '"><h4>' + esc(r.t) + "</h4><p>" + esc(r.s) + "</p><ol>" +
        r.a.map((a) => '<li><a class="conde-link" href="' + a[0] + '">' + esc(a[1]) + "</a></li>").join("") + "</ol></article>").join("") +
      '<a class="conde-link conde-link-bloque conde-link-izq" href="enciclopedia#ruta" data-destino="enciclopedia#ruta">Ver las rutas en la Enciclopedia →</a></div>';
    cuerpo.querySelectorAll(".conde-rutas a").forEach((a) => a.addEventListener("click", () => {
      const r = a.closest(".conde-ruta");
      medir("conde_resultado", { destino: r ? "enciclopedia#ruta-" + r.dataset.ruta : a.dataset.destino });
    }));
  }

  function mostrar(v) {
    vista = v;
    if (v === "menu") vistaMenu();
    if (v === "glosario") vistaGlosario();
    if (v === "calc") vistaCalc();
    if (v === "rutas") vistaRutas();
    personaje();
    if (v === "glosario") { const i = cuerpo.querySelector("#conde-q"); if (i) i.focus({ preventScroll: true }); }
    else if (v === "menu") { const b = cuerpo.querySelector(".conde-op"); if (b && abierto) b.focus({ preventScroll: true }); }
    else enfocarTitulo();
  }

  // Botones de navegación dentro del panel
  cuerpo.addEventListener("click", (e) => {
    const b = e.target.closest("[data-accion]");
    if (!b) return;
    const a = b.dataset.accion;
    if (a === "menu") { q = ""; termId = null; ruta = []; mostrar("menu"); }
    if (a === "otro") { termId = null; pintarGlosario(); const i = cuerpo.querySelector("#conde-q"); if (i) i.focus(); }
    if (a === "atras") { ruta = ruta.slice(0, -1); vistaCalc(); personaje(); const l = cuerpo.querySelector(".conde-op-chica"); if (l) l.focus(); }
    if (a === "reiniciar") { ruta = []; vistaCalc(); personaje(); const l = cuerpo.querySelector(".conde-op-chica"); if (l) l.focus(); }
    if (a === "ver-term") {
      q = b.dataset.n; termId = null; ruta = [];
      mostrar("glosario");
      terminos().then(() => verTermino(b.dataset.term)).catch(() => {});
    }
  });

  // ---------- Asesoría: el formulario emergente que ya existe ----------
  function asesoria() {
    medir("conde_resultado", { destino: "formulario_asesoria" });
    cerrar(false);
    boton.focus(); // así el formulario devuelve el foco al botón de El Conde al cerrarse
    const a = document.createElement("a");
    a.href = "contacto";
    a.className = "abrir-contacto";
    a.hidden = true;
    document.body.appendChild(a);
    a.click(); // lo atiende el módulo del formulario de script.js (sin <dialog>, lleva a /contacto)
    a.remove();
  }

  // ---------- Abrir y cerrar ----------
  function abrir() {
    if (abierto) return;
    abierto = true;
    q = ""; termId = null; ruta = []; hover = null; vista = "menu";
    panel.hidden = false; figura.hidden = false;
    medidas();
    vistaMenu(); personaje();
    ctx.alCambiar(true);
    medir("conde_abierto");
    terminos().catch(() => {}); // el glosario queda listo antes de elegirlo
    const primero = cuerpo.querySelector(".conde-op");
    if (primero) primero.focus({ preventScroll: true });
    hover = null; personaje(); // el foco del primer botón no debe detener la caminata
  }
  function cerrar(devolverFoco) {
    if (!abierto) return;
    abierto = false;
    clearTimeout(timerSinRes);
    panel.hidden = true; figura.hidden = true; fondo.hidden = true; globoFijo.hidden = true;
    mov.classList.remove("conde-camina", "conde-pausa");
    accionActual = ""; globoActual = null;
    ctx.alCambiar(false);
    if (devolverFoco !== false) boton.focus();
  }

  panel.querySelector(".conde-x").addEventListener("click", () => cerrar());
  fondo.addEventListener("click", () => cerrar());
  document.addEventListener("keydown", (e) => {
    if (!abierto) return;
    if (e.key === "Escape") {
      if (document.querySelector("dialog[open]")) return; // otro diálogo encima (formulario o cookies)
      if (panel.contains(document.activeElement) || document.activeElement === boton || CEL.matches) { e.preventDefault(); cerrar(); }
      return;
    }
    // En celular la hoja es modal: el foco no sale del panel
    if (e.key === "Tab" && CEL.matches) {
      const f = Array.prototype.filter.call(panel.querySelectorAll("button, a[href], input, [tabindex='-1']"), (x) => x.offsetParent !== null && x.getAttribute("tabindex") !== "-1");
      if (!f.length) return;
      const primero = f[0], ultimo = f[f.length - 1];
      if (!panel.contains(document.activeElement)) { e.preventDefault(); primero.focus(); }
      else if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
  });
  const alCambiarTam = () => { if (abierto) medidas(); };
  if (CEL.addEventListener) CEL.addEventListener("change", alCambiarTam);
  window.addEventListener("resize", alCambiarTam, { passive: true });
  if (QUIETO.addEventListener) QUIETO.addEventListener("change", alCambiarTam);

  return { alternar() { if (abierto) cerrar(); else abrir(); }, abrir: abrir, cerrar: cerrar };
}
