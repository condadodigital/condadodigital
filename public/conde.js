const IMG = "/img/conde/conde-frente-cabeza.webp";
const SV = [
  ["paid-media", "Paid Media", "Campañas en Google, Meta, TikTok y LinkedIn medidas en ventas."],
  ["social-media", "Social Media", "Contenido para tus redes sin tener que grabarte."],
  ["mentorias", "Mentorías", "Aprende a gestionar tus propias campañas con criterio."],
  ["diseno-web", "Diseño web", "Un sitio o tienda pensado para vender y medir."],
  ["seo", "Posicionamiento SEO", "Que te encuentren en Google y en buscadores con IA."]
];
const GL = [
  ["CPL", "Costo por lead: cuánto pagas por cada contacto interesado.", "cpl"],
  ["CPA", "Costo por adquisición: cuánto cuesta en promedio cada venta o conversión.", "cpa"],
  ["CAC", "Costo de adquisición de cliente: lo que cuesta en total conseguir un cliente nuevo.", "cac"],
  ["LTV", "Valor de vida del cliente: lo que te deja un cliente durante toda la relación.", "ltv"],
  ["CTR", "Tasa de clics: porcentaje de personas que hacen clic después de ver tu anuncio.", "ctr"],
  ["CPM", "Costo por mil impresiones: lo que cuesta que tu anuncio se muestre mil veces.", "cpm"]
];
const CA = [
  ["¿Gano plata con mis anuncios?", "ROAS", "Te dice cuántos pesos vuelven por cada peso que inviertes en anuncios.", "roas"],
  ["¿Cuánto me cuesta cada contacto?", "Costo por lead", "Divide tu inversión por los contactos que conseguiste.", "cpl"],
  ["¿Cuánto vale un cliente?", "LTV", "Calcula lo que te deja un cliente durante toda la relación.", "ltv"],
  ["¿Mi anuncio llama la atención?", "CTR", "Mide qué porcentaje de quienes ven tu anuncio hace clic.", "ctr"]
];
const RU = [
  ["Estoy partiendo", [["que-es-el-marketing-digital", "Marketing digital"], ["marketing-tradicional-vs-digital", "Tradicional vs. digital"], ["embudo-de-marketing", "Embudo de marketing"]]],
  ["Ya invierto en anuncios", [["embudo-de-marketing", "Embudo de marketing"], ["analitica-digital", "Analítica digital"], ["meta-ads-vs-google-ads", "Meta Ads vs Google Ads"]]],
  ["Quiero que me encuentren", [["publicidad-pagada-vs-organica", "Pagada vs. orgánica"], ["perfil-de-empresa-google", "Perfil de Empresa de Google"], ["marketing-con-ia", "Marketing con IA"]]]
];
const RQ = ["¿Ya inviertes en anuncios?", "¿Tienes un sitio web que funcione bien?", "¿Prefieres hacerlo tú o que lo hagamos nosotros?"];
const RA = [["Sí", "No"], ["Sí", "No"], ["Quiero aprender a hacerlo", "Que lo hagan ustedes"]];
const MENU = [["Quiero cotizar un servicio", "cot"], ["No sé qué servicio necesito", "rec"], ["¿Qué significa…?", "glo"], ["¿Qué calculadora uso?", "cal"], ["¿Por dónde empiezo a leer?", "rut"]];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const norm = (t) => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

let IDX = null, carga = null;
function terminos() {
  if (!carga) {
    carga = fetch("/conde-terminos.json").then((r) => { if (!r.ok) throw new Error(); return r.json(); }).then((filas) => {
      IDX = filas.map((r) => ({ id: r[0], t: r[1], f: r[2], d: r[3], pub: r[5], nt: norm(r[0] + " " + r[1]), nf: norm(r[2]), nd: norm(r[3]) }));
      return IDX;
    }).catch((e) => { carga = null; throw e; });
  }
  return carga;
}
function buscar(q) {
  const n = norm(q).trim();
  if (!n || !IDX) return [];
  const out = [];
  IDX.forEach((x) => {
    let r = -1;
    if (norm(x.t).indexOf(n) === 0) r = 0;
    else if (x.nt.indexOf(n) >= 0) r = 1;
    else if (x.nf.indexOf(n) >= 0) r = 2;
    else if (n.length >= 4 && x.nd.indexOf(n) >= 0) r = 3;
    if (r >= 0) out.push({ x, r });
  });
  out.sort((a, b) => a.r - b.r || a.x.t.length - b.x.t.length);
  return out.slice(0, 5).map((o) => o.x);
}
function sinResultados(q) {
  const t = String(q).toLowerCase().trim();
  if (/@/.test(t) || /(\d[\s.\-()]*){7,}/.test(t)) return "sin_resultados";
  return "sin_resultados:" + t.slice(0, 40);
}

export function iniciar(ctx) {
  const { boton, medir, abrirFormulario } = ctx;
  let abierto = false, F = "menu", A = [], P = -1, termino = null, q = "";
  const panel = document.createElement("div");
  panel.className = "ec-panel";
  panel.id = "ec-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Chat con El Conde");
  panel.hidden = true;
  panel.innerHTML =
    '<div class="ec-head"><span class="ec-av"><img src="' + IMG + '" alt="" width="135" height="143"></span><div><b style="display:block;font-size:16px">El Conde</b><span style="font-size:12px;opacity:.85;display:flex;align-items:center;gap:6px"><i style="width:7px;height:7px;border-radius:50%;background:#C8F169;display:inline-block"></i>Asistente de Condado Digital</span></div><button type="button" class="ec-x" aria-label="Cerrar chat">✕</button></div>' +
    '<div class="ec-body" aria-live="polite"><div class="ec-inner"></div></div>' +
    '<div class="ec-foot">Respuestas guiadas · Una persona te responde por correo en menos de 24 horas</div>';
  document.body.appendChild(panel);
  boton.setAttribute("aria-controls", "ec-panel");
  const inner = panel.querySelector(".ec-inner");
  const body = panel.querySelector(".ec-body");

  const av = '<span class="ec-av sm"><img src="' + IMG + '" alt="" width="135" height="143"></span>';
  const bot = (t) => '<div class="ec-row">' + av + '<div class="ec-b bot">' + esc(t) + "</div></div>";
  const me = (t) => '<div class="ec-row me"><div class="ec-b me">' + esc(t) + "</div></div>";
  const res = (k, ti, t) => '<div class="ec-row">' + av + '<div class="ec-b res"><span style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;opacity:.75">' + esc(k) + "</span><b>" + esc(ti) + "</b>" + esc(t) + "</div></div>";
  const op = (label, accion, cls) => '<button type="button" class="ec-op' + (cls ? " " + cls : "") + '" data-ec="' + esc(accion) + '">' + esc(label) + "</button>";
  const lk = (href, label, cls) => '<a href="' + href + '" class="ec-l ' + (cls || "sec") + '" data-destino="' + esc(href) + '">' + esc(label) + "</a>";
  const formLk = (slug) => '<a href="/contacto' + (slug ? "?servicio=" + slug : "") + '" class="ec-l pri" data-form="' + (slug || "") + '">Abrir el formulario →</a>';
  const back = op("← Volver al menú", "menu", "back");

  function pintar() {
    const m = [bot("Hola, soy El Conde 👋 Te ayudo a encontrar lo que necesitas en el sitio, sin vueltas."), bot("¿Qué quieres hacer hoy?")];
    let ops = [], links = [], extra = "", tail = "";
    const cierre = () => { m.push(bot("¿Quieres que lo veamos con tus números? Te respondemos en menos de 24 horas.")); links.push(formLk("")); ops.push(back); };
    if (F === "menu") {
      ops = MENU.map((x) => op(x[0], "f:" + x[1]));
    } else if (F === "cot") {
      m.push(me("Quiero cotizar un servicio"));
      if (P < 0) { m.push(bot("¡Buenísimo! ¿Qué servicio te interesa?")); ops = SV.map((x, i) => op(x[1], "p:" + i)); ops.push(back); }
      else { m.push(me(SV[P][1])); m.push(bot("Perfecto. Te dejo el formulario con " + SV[P][1] + " ya marcado: cuéntanos tu caso y te respondemos en menos de 24 horas.")); links.push(formLk(SV[P][0])); links.push(lk("/" + SV[P][0], "Ver qué incluye")); ops.push(back); }
    } else if (F === "rec") {
      m.push(me("No sé qué servicio necesito"));
      m.push(bot("Te hago 3 preguntas rápidas y te recomiendo uno."));
      A.forEach((a, i) => { m.push(bot(RQ[i])); m.push(me(RA[i][a])); });
      if (A.length < 3) { const k = A.length; m.push(bot(RQ[k])); ops = RA[k].map((a, j) => op(a, "a:" + j)); ops.push(back); }
      else {
        const k = A[2] === 0 ? 2 : (A[1] === 1 ? 3 : (A[0] === 0 ? 0 : 4));
        const why = ["Ya inviertes: lo primero es ordenar las campañas y medir el costo por venta.", "", "Quieres hacerlo tú: te enseñamos sobre tus propias cuentas.", "Antes de invertir, necesitas un sitio que venda y mida.", "Tienes sitio y aún no inviertes: que te encuentren en Google es un buen punto de partida."][k];
        m.push(res("Te recomiendo", SV[k][1], why));
        links.push(lk("/" + SV[k][0], "Ver el servicio")); links.push(formLk(SV[k][0]));
        ops.push(op("Volver a responder", "f:rec")); ops.push(back);
      }
    } else if (F === "glo") {
      m.push(me("¿Qué significa…?"));
      if (P < 0 && !termino) {
        m.push(bot("Elige una sigla o escribe el término que buscas. En el glosario hay 168 términos explicados en simple."));
        extra = '<form class="ec-q" role="search"><label for="ec-q-in" class="sr-only">Buscar un término del glosario</label><input id="ec-q-in" type="search" autocomplete="off" placeholder="Ej: ROAS, píxel, remarketing" value="' + esc(q) + '"><button type="submit">Buscar</button></form><div class="ec-qres"></div>';
        ops = GL.map((x, i) => op(x[0], "p:" + i));
        tail = extra + '<div class="ec-links">' + lk("/glosario", "Ver el glosario completo →") + '</div><div class="ec-ops">' + back + "</div>";
        extra = "";
      } else if (termino) {
        m.push(me(termino.t)); m.push(res("Glosario", termino.t, termino.d));
        links.push(lk(termino.pub ? "/glosario-" + termino.id : "/glosario#" + termino.id, termino.pub ? "Leer la ficha completa →" : "Verlo en el glosario →"));
        ops.push(op("Buscar otro término", "f:glo")); ops.push(back);
      } else {
        m.push(me(GL[P][0])); m.push(res("Glosario", GL[P][0], GL[P][1]));
        links.push(lk("/glosario-" + GL[P][2], "Leer la ficha completa →"));
        ops.push(op("Buscar otro término", "f:glo")); ops.push(back);
      }
    } else if (F === "cal") {
      m.push(me("¿Qué calculadora uso?"));
      if (P < 0) { m.push(bot("¿Qué quieres saber?")); ops = CA.map((x, i) => op(x[0], "p:" + i)); ops.push(back); }
      else { m.push(me(CA[P][0])); m.push(res("Te sirve esta", CA[P][1], CA[P][2])); links.push(lk("/calculadoras#" + CA[P][3], "Abrir la calculadora →")); cierre(); }
    } else if (F === "rut") {
      m.push(me("¿Por dónde empiezo a leer?"));
      if (P < 0) { m.push(bot("¿En qué estás hoy?")); ops = RU.map((x, i) => op(x[0], "p:" + i)); ops.push(back); }
      else { m.push(me(RU[P][0])); m.push(bot("Te armé esta ruta de la Enciclopedia, en este orden:")); RU[P][1].forEach((a, j) => links.push(lk("/" + a[0], (j + 1) + ". " + a[1] + " →"))); cierre(); }
    }
    inner.innerHTML = m.join("") + extra + (links.length ? '<div class="ec-links">' + links.join("") + "</div>" : "") + '<div class="ec-ops">' + ops.join("") + "</div>" + tail;
    body.scrollTop = body.scrollHeight;
    const qf = inner.querySelector(".ec-q");
    if (qf) {
      const inp = qf.querySelector("input"), box = inner.querySelector(".ec-qres");
      let timer = null;
      const mostrar = () => {
        q = inp.value;
        if (q.trim().length < 2) { box.innerHTML = ""; return; }
        terminos().then(() => {
          const r = buscar(q);
          box.innerHTML = r.length
            ? r.map((x) => '<button type="button" class="ec-op ec-hit" data-t="' + esc(x.id) + '"><b>' + esc(x.t) + "</b>" + (x.f ? "<span>" + esc(x.f) + "</span>" : "") + "</button>").join("")
            : '<p class="ec-none">No encontré «' + esc(q.trim()) + '». Prueba con otra palabra o revisa el glosario completo.</p>';
          if (!r.length) { clearTimeout(timer); timer = setTimeout(() => medir("conde_resultado", { destino: sinResultados(q) }), 1200); }
        }).catch(() => { box.innerHTML = '<p class="ec-none">No pude cargar el glosario. <a href="/glosario">Ábrelo aquí</a>.</p>'; });
      };
      inp.addEventListener("input", mostrar);
      qf.addEventListener("submit", (e) => { e.preventDefault(); mostrar(); });
      if (q) mostrar();
    }
  }

  function ir(accion) {
    const [t, v] = accion.split(":");
    if (t === "menu") { F = "menu"; A = []; P = -1; termino = null; q = ""; }
    else if (t === "f") { F = v; A = []; P = -1; termino = null; q = ""; medir("conde_opcion", { opcion: v }); }
    else if (t === "p") { P = +v; }
    else if (t === "a") { A = A.concat([+v]); }
    pintar();
    const primero = inner.querySelector(".ec-ops .ec-op:not(.back), .ec-links a, .ec-q input");
    if (primero) primero.focus({ preventScroll: true });
  }

  panel.addEventListener("click", (e) => {
    const o = e.target.closest("[data-ec]");
    if (o) { ir(o.getAttribute("data-ec")); return; }
    const h = e.target.closest(".ec-hit");
    if (h) {
      termino = IDX && IDX.find((x) => x.id === h.getAttribute("data-t"));
      if (termino) { medir("conde_resultado", { destino: (termino.pub ? "glosario-" : "glosario#") + termino.id }); pintar(); }
      return;
    }
    const f = e.target.closest("[data-form]");
    if (f) { e.preventDefault(); medir("conde_resultado", { destino: "formulario_asesoria" }); cerrar(false); abrirFormulario(f.getAttribute("data-form")); return; }
    const l = e.target.closest("[data-destino]");
    if (l) medir("conde_resultado", { destino: l.getAttribute("data-destino") });
    if (e.target.closest(".ec-x")) cerrar(true);
  });
  panel.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrar(true); });

  function abrir() {
    abierto = true; F = "menu"; A = []; P = -1; termino = null; q = "";
    panel.hidden = false;
    boton.setAttribute("aria-expanded", "true");
    boton.setAttribute("aria-label", "Cerrar El Conde");
    pintar();
    const p = inner.querySelector(".ec-op");
    if (p) p.focus({ preventScroll: true });
    medir("conde_abierto", { pagina: location.pathname });
  }
  function cerrar(devolver) {
    abierto = false;
    panel.hidden = true;
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-label", "Abrir El Conde, asistente de Condado Digital");
    if (devolver) boton.focus();
  }
  return { alternar() { if (abierto) cerrar(true); else abrir(); } };
}
