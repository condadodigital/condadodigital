// CONDADO DIGITAL — Menú móvil, submenús y buscador

// Menú principal en pantallas pequeñas (el botón solo existe con JavaScript)
(function () {
  const boton = document.querySelector(".cabecera-menu-btn");
  const menu = document.getElementById("menu-principal");
  if (boton && menu) {
    boton.addEventListener("click", () => {
      const abierto = menu.classList.toggle("abierto");
      boton.setAttribute("aria-expanded", abierto ? "true" : "false");
      boton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) { menu.classList.remove("abierto"); boton.setAttribute("aria-expanded", "false"); boton.setAttribute("aria-label", "Abrir menú"); }
    });
  }
  // Marca en el menú la sección actual
  const actual = (window.location.pathname.split("/").pop() || "").replace(/\.html$/, "");
  document.querySelectorAll(".menu-principal a").forEach((a) => {
    const destino = a.getAttribute("href");
    if (actual && (destino === actual || (actual.startsWith("glosario-") && destino === "glosario"))) a.setAttribute("aria-current", "page");
  });
})();

// ============================================
// Buscador desplegable global (overlay)
// Se abre desde la lupa del menú sin salir de la página
// ============================================
(function () {
  // Índice de búsqueda del sitio: agregar aquí cada contenido nuevo
  const INDICE = [
    { t: "Blog — Paid Media", u: "blog#paid-media", tipo: "Categoría", k: "paid media google ads meta ads tiktok linkedin campañas" },
    { t: "Blog — SEO · AEO · GEO", u: "blog#seo", tipo: "Categoría", k: "seo aeo geo posicionamiento buscadores ia" },
    { t: "Blog — Growth Marketing", u: "blog#growth", tipo: "Categoría", k: "growth cro funnels cac ltv experimentos" },
    { t: "Blog — Social Media", u: "blog#social", tipo: "Categoría", k: "social media instagram tiktok contenido comunidad" },
    { t: "Blog — Analytics", u: "blog#analytics", tipo: "Categoría", k: "analytics ga4 gtm looker bigquery datos tracking" },
    { t: "Blog — IA & MarTech", u: "blog#ia", tipo: "Categoría", k: "ia inteligencia artificial martech automatizacion agentes" },
    { t: "Noticias de Marketing", u: "noticias", tipo: "Sección", k: "noticias actualidad meta google tiktok openai" },
    { t: "Calculadoras de marketing (20 métricas)", u: "calculadoras", tipo: "Recurso", k: "calculadora roas roi cpa cpl cac cpc cpm cpv ctr cvr frecuencia hook rate hold rate engagement seguidores guardados ticket ltv ltv/cac simulador embudo metricas" },
    { t: "Aprendizaje: cápsulas paso a paso", u: "aprendizaje", tipo: "Sección", k: "aprendizaje capsulas tutoriales como implementar campana meta google tiktok ads paso a paso ga4 pixel" },
    { t: "¿Qué es el CPA?", u: "glosario-cpa", tipo: "Glosario", k: "cpa costo por adquisicion formula" },
    { t: "¿Qué es el CAC?", u: "glosario-cac", tipo: "Glosario", k: "cac costo adquisicion cliente" },
    { t: "¿Qué es el LTV?", u: "glosario-ltv", tipo: "Glosario", k: "ltv lifetime value valor vida cliente" },
    { t: "¿Qué es el CPC?", u: "glosario-cpc", tipo: "Glosario", k: "cpc costo por clic" },
    { t: "¿Qué es el CPM?", u: "glosario-cpm", tipo: "Glosario", k: "cpm costo mil impresiones" },
    { t: "¿Qué es el CTR?", u: "glosario-ctr", tipo: "Glosario", k: "ctr tasa clics click through rate" },
    { t: "¿Qué es el CVR?", u: "glosario-cvr", tipo: "Glosario", k: "cvr tasa conversion" },
    { t: "¿Qué es el CPL?", u: "glosario-cpl", tipo: "Glosario", k: "cpl costo por lead" },
    { t: "¿Qué es AEO?", u: "glosario-aeo", tipo: "Glosario", k: "aeo answer engine optimization respuestas" },
    { t: "¿Qué es GEO?", u: "glosario-geo", tipo: "Glosario", k: "geo generative engine optimization ia chatgpt" },
    { t: "¿Qué es CRO?", u: "glosario-cro", tipo: "Glosario", k: "cro optimizacion conversion tests ab" },
    { t: "¿Qué es un CRM?", u: "glosario-crm", tipo: "Glosario", k: "crm gestion clientes hubspot pipedrive" },
    { t: "¿Qué es GA4?", u: "glosario-ga4", tipo: "Glosario", k: "ga4 google analytics eventos medicion" },
    { t: "¿Qué es GTM?", u: "glosario-gtm", tipo: "Glosario", k: "gtm google tag manager etiquetas" },
    { t: "¿Qué es la CAPI?", u: "glosario-capi", tipo: "Glosario", k: "capi conversions api servidor meta" },
    { t: "¿Qué son las UTM?", u: "glosario-utm", tipo: "Glosario", k: "utm parametros seguimiento campanas atribucion" },
    { t: "Enciclopedia de marketing digital", u: "enciclopedia", tipo: "Sección", k: "enciclopedia articulos referencia conceptos marketing digital" },
    { t: "Marketing digital", u: "que-es-el-marketing-digital", tipo: "Enciclopedia", k: "marketing digital que es canales pymes chile empezar presupuesto" },
    { t: "Marketing tradicional vs. marketing digital", u: "marketing-tradicional-vs-digital", tipo: "Enciclopedia", k: "tradicional digital radio via publica tv ferias combinar diferencias" },
    { t: "Embudo de marketing", u: "embudo-de-marketing", tipo: "Enciclopedia", k: "embudo funnel etapas metricas aida messy middle flywheel cpm ctr cpl cac ltv" },
    { t: "Publicidad pagada vs. orgánica", u: "publicidad-pagada-vs-organica", tipo: "Enciclopedia", k: "pagada organica seo pauta efecto halo cyberday black friday" },
    { t: "Analítica digital", u: "analitica-digital", tipo: "Enciclopedia", k: "analitica ga4 gtm pixel utm eventos clave medicion ley 21719 datos personales" },
    { t: "Marketing con inteligencia artificial", u: "marketing-con-ia", tipo: "Enciclopedia", k: "ia inteligencia artificial performance max advantage aeo geo chatgpt" },
    { t: "Glosario de Marketing (168 términos)", u: "glosario", tipo: "Sección", k: "glosario diccionario terminos cpc cpm ctr cac ltv roas mer ymyl pujas audiencias formatos" },
    { t: "Preguntas frecuentes", u: "preguntas-frecuentes", tipo: "Sección", k: "faq preguntas que es paid media seo sem aeo geo pixel capi" },
    { t: "Herramientas de Marketing", u: "herramientas", tipo: "Sección", k: "herramientas google ads meta ga4 gtm looker ahrefs semrush claude chatgpt" },
    { t: "Acerca de Condado Digital", u: "acerca", tipo: "Página", k: "acerca de condado digital quienes somos principios sobre mi esleyter conde creador" },
    { t: "Servicios y asesorías", u: "servicios", tipo: "Página", k: "servicios asesoria diagnostico campanas auditoria gestion medicion mentoria freelance" },
    { t: "Contacto", u: "contacto", tipo: "Página", k: "contacto colaboraciones consultoria asesoria" }
  ];

  // Crear el overlay una sola vez
  const overlay = document.createElement("div");
  overlay.className = "overlay-busqueda";
  overlay.innerHTML =
    '<div class="panel-busqueda">' +
    '  <div class="cabecera"><strong>¿Qué estás buscando?</strong>' +
    '  <button class="cerrar-busqueda" aria-label="Cerrar búsqueda">✕</button></div>' +
    '  <input type="search" id="overlay-q" placeholder="Ej: Meta Ads, ROAS, GA4..." aria-label="Buscar en el sitio">' +
    '  <div id="overlay-resultados"></div>' +
    '  <p class="pista-busqueda">Presiona Esc para cerrar</p>' +
    "</div>";
  document.body.appendChild(overlay);

  const input = overlay.querySelector("#overlay-q");
  const resultados = overlay.querySelector("#overlay-resultados");

  function abrir(e) {
    if (e) e.preventDefault();
    overlay.classList.add("abierto");
    input.value = "";
    resultados.innerHTML = "";
    setTimeout(() => input.focus(), 50);
  }

  function cerrar() { overlay.classList.remove("abierto"); }

  // La lupa del menú abre el overlay (en vez de navegar a buscar)
  document.querySelectorAll('a[href="buscar"]').forEach(a => a.addEventListener("click", abrir));

  overlay.querySelector(".cerrar-busqueda").addEventListener("click", cerrar);
  overlay.addEventListener("click", e => { if (e.target === overlay) cerrar(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") cerrar(); });

  input.addEventListener("input", () => {
    const v = input.value.toLowerCase().trim();
    resultados.innerHTML = "";
    if (v.length < 2) return;
    const hits = INDICE.filter(i => (i.t + " " + i.k).toLowerCase().includes(v));
    if (!hits.length) {
      resultados.innerHTML = "<p style='color:var(--text-2);padding:10px 0'>Sin resultados para «" + input.value + "».</p>";
      return;
    }
    hits.forEach(i => {
      const a = document.createElement("a");
      a.className = "resultado-busqueda";
      a.href = i.u;
      a.innerHTML = "<span class='tipo'>" + i.tipo + "</span><div class='titulo'>" + i.t + "</div>";
      resultados.appendChild(a);
    });
  });
})();

// ============================================
// Consentimiento de cookies (Ley 21.719 + Google Consent Mode v2)
// El estado por defecto ("denied") se define en el <head> de cada página, antes de GTM.
// Aquí: banner de primera visita, panel de configuración y actualización del consentimiento.
// ============================================
(function () {
  const CLAVE = "cd_consentimiento";
  const VERSION = 1;
  const DURACION = 182 * 24 * 60 * 60 * 1000; // 6 meses

  function leer() {
    try {
      const c = JSON.parse(localStorage.getItem(CLAVE));
      if (c && c.v === VERSION && c.exp > Date.now()) return c;
    } catch (e) {}
    return null;
  }

  function guardar(analitica, publicidad) {
    const c = { v: VERSION, analitica: !!analitica, publicidad: !!publicidad, fecha: Date.now(), exp: Date.now() + DURACION };
    try { localStorage.setItem(CLAVE, JSON.stringify(c)); } catch (e) {}
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    const ads = c.publicidad ? "granted" : "denied";
    gtag("consent", "update", {
      analytics_storage: c.analitica ? "granted" : "denied",
      ad_storage: ads, ad_user_data: ads, ad_personalization: ads
    });
    dataLayer.push({ event: "consent_update", analytics: c.analitica, ads: c.publicidad });
    return c;
  }

  let banner = null, panel = null, ultimoFoco = null;

  function cerrarBanner() {
    if (banner) { banner.remove(); banner = null; }
  }

  function crearBanner() {
    banner = document.createElement("section");
    banner.className = "cookies-banner";
    banner.setAttribute("aria-label", "Aviso de cookies");
    banner.innerHTML =
      '<p>Usamos cookies propias y de terceros para medir visitas y, si lo aceptas, para publicidad. ' +
      'Más detalles en la <a href="privacidad#cookies">política de privacidad</a>.</p>' +
      '<div class="cookies-acciones">' +
      '<button type="button" class="btn btn-primario" data-cookies="aceptar">Aceptar todas</button>' +
      '<button type="button" class="btn btn-secundario" data-cookies="rechazar">Rechazar</button>' +
      '<button type="button" class="btn btn-secundario" data-cookies="configurar" aria-haspopup="dialog">Configurar</button>' +
      "</div>";
    document.body.appendChild(banner);
  }

  function crearPanel() {
    panel = document.createElement("dialog");
    panel.className = "cookies-panel";
    panel.setAttribute("aria-labelledby", "cookies-titulo");
    panel.innerHTML =
      '<h2 id="cookies-titulo">Configurar cookies</h2>' +
      '<p>Elige qué cookies aceptas. Puedes cambiarlo cuando quieras desde «Configurar cookies», al pie de cada página.</p>' +
      '<div class="cookies-opcion"><div><strong id="ck-nec">Necesarias</strong>' +
      '<p id="ck-nec-d">Guardan tu elección de cookies y protegen el sitio. Siempre activas.</p></div>' +
      '<input type="checkbox" role="switch" checked disabled aria-labelledby="ck-nec" aria-describedby="ck-nec-d"></div>' +
      '<div class="cookies-opcion"><div><label for="ck-analitica"><strong>Analítica</strong></label>' +
      '<p id="ck-ana-d">Google Analytics 4: nos dice qué páginas se visitan, de forma agregada.</p></div>' +
      '<input type="checkbox" role="switch" id="ck-analitica" aria-describedby="ck-ana-d"></div>' +
      '<div class="cookies-opcion"><div><label for="ck-publicidad"><strong>Publicidad</strong></label>' +
      '<p id="ck-pub-d">Google Ads, Meta, TikTok y LinkedIn: miden campañas y muestran anuncios a quien ya visitó el sitio.</p></div>' +
      '<input type="checkbox" role="switch" id="ck-publicidad" aria-describedby="ck-pub-d"></div>' +
      '<div class="cookies-acciones">' +
      '<button type="button" class="btn btn-primario" data-cookies="guardar">Guardar selección</button>' +
      '<button type="button" class="btn btn-secundario" data-cookies="aceptar">Aceptar todas</button>' +
      '<button type="button" class="btn btn-secundario" data-cookies="rechazar">Rechazar</button>' +
      "</div>" +
      '<button type="button" class="cookies-cerrar" data-cookies="cerrar" aria-label="Cerrar configuración de cookies">✕</button>';
    document.body.appendChild(panel);
    panel.addEventListener("close", () => {
      if (ultimoFoco && document.contains(ultimoFoco)) ultimoFoco.focus();
    });
  }

  function abrirPanel() {
    if (!panel) crearPanel();
    const c = leer();
    panel.querySelector("#ck-analitica").checked = c ? c.analitica : false;
    panel.querySelector("#ck-publicidad").checked = c ? c.publicidad : false;
    ultimoFoco = document.activeElement;
    if (typeof panel.showModal === "function") panel.showModal(); else panel.setAttribute("open", "");
    panel.querySelector("#ck-analitica").focus();
  }

  function cerrarPanel() {
    if (!panel) return;
    if (typeof panel.close === "function" && panel.open) panel.close(); else panel.removeAttribute("open");
  }

  document.addEventListener("click", (e) => {
    const abrir = e.target.closest(".abrir-cookies");
    if (abrir) { e.preventDefault(); abrirPanel(); return; }
    const b = e.target.closest("[data-cookies]");
    if (!b) return;
    const accion = b.getAttribute("data-cookies");
    if (accion === "aceptar") guardar(true, true);
    else if (accion === "rechazar") guardar(false, false);
    else if (accion === "guardar") guardar(panel.querySelector("#ck-analitica").checked, panel.querySelector("#ck-publicidad").checked);
    else if (accion === "configurar") { abrirPanel(); return; }
    else if (accion === "cerrar") { cerrarPanel(); return; }
    cerrarBanner();
    cerrarPanel();
  });

  if (!leer()) crearBanner();
})();

// ============================================
// Formulario emergente de asesorías (todas las páginas)
// Los enlaces .abrir-contacto apuntan a /contacto: sin JavaScript llevan a esa página.
// ============================================
(function () {
  const ENDPOINT = "https://formspree.io/f/mvkkjakn";
  let dialogo = null, ultimoFoco = null;

  function crear() {
    dialogo = document.createElement("dialog");
    dialogo.className = "dialogo-contacto";
    dialogo.setAttribute("aria-labelledby", "dialogo-contacto-titulo");
    dialogo.innerHTML =
      '<button type="button" class="dialogo-cerrar" aria-label="Cerrar formulario">×</button>' +
      '<div class="dialogo-paso-form">' +
      '<p class="ini-etiqueta" style="margin-bottom:6px">Asesorías</p>' +
      '<h2 id="dialogo-contacto-titulo">Cuéntame qué necesitas</h2>' +
      '<p class="dialogo-sub">Te respondo en un plazo de 2 días hábiles.</p>' +
      '<form novalidate>' +
      '<input type="hidden" name="formulario" value="asesoria">' +
      '<input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<label>Nombre y apellido<input type="text" name="nombre" required autocomplete="name" placeholder="Ej: Camila Rojas"></label>' +
      '<label>Correo electrónico<input type="email" name="email" required autocomplete="email" placeholder="tu@correo.com"></label>' +
      '<label>Teléfono o WhatsApp (opcional)<input type="tel" name="telefono" autocomplete="tel" placeholder="+56 9 1234 5678"></label>' +
      '<label>¿Qué servicio te interesa?<select name="servicio" required>' +
      '<option value="">Elige una opción</option>' +
      '<option value="paid-media">Paid Media</option>' +
      '<option value="social-media">Social Media</option>' +
      '<option value="mentoria">Mentoría</option>' +
      '<option value="asesoria-1a1">Asesoría 1 a 1 personalizada</option>' +
      '<option value="otro">Otro</option>' +
      '</select></label>' +
      '<label>Cuéntame tu caso<textarea name="mensaje" rows="4" required placeholder="Qué vendes, en qué plataformas inviertes y cuánto, más o menos, al mes"></textarea></label>' +
      '<button type="submit" class="dialogo-enviar">Enviar solicitud</button>' +
      '<p class="dialogo-error" role="alert" hidden></p>' +
      '<p class="dialogo-legal">Al enviar, aceptas que usemos tus datos para responder tu solicitud y hacer su seguimiento. El formulario lo procesa Formspree, fuera de Chile. Más detalles en la <a href="privacidad">política de privacidad</a>.</p>' +
      '</form></div>' +
      '<div class="dialogo-ok" hidden>' +
      '<div class="dialogo-ok-ico ani-pulse"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"></path></svg></div>' +
      '<h2 tabindex="-1">¡Listo! Recibí tu solicitud</h2>' +
      '<p>Te escribo en un plazo de 2 días hábiles.</p>' +
      '<button type="button" class="dialogo-ok-cerrar">Cerrar</button>' +
      '</div>';
    document.body.appendChild(dialogo);

    const form = dialogo.querySelector("form");
    const error = dialogo.querySelector(".dialogo-error");
    const enviar = dialogo.querySelector(".dialogo-enviar");
    let iniciado = false;

    function servicio() { return form.servicio.value || "sin-elegir"; }
    function marcarInicio(e) {
      if (iniciado || !e.target.matches("input, select, textarea")) return;
      iniciado = true;
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({ event: "formulario_iniciado", formulario: "asesoria", motivo: servicio() });
    }
    form.addEventListener("focusin", marcarInicio);
    form.addEventListener("input", marcarInicio);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      error.hidden = true;
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const motivo = servicio();
      enviar.disabled = true; enviar.textContent = "Enviando...";
      try {
        const r = await fetch(ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!r.ok) throw new Error();
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({ event: "generate_lead", formulario: "asesoria", motivo: motivo });
        form.reset();
        dialogo.querySelector(".dialogo-paso-form").hidden = true;
        const ok = dialogo.querySelector(".dialogo-ok");
        ok.hidden = false;
        ok.querySelector("h2").focus();
      } catch (err) {
        error.textContent = "No se pudo enviar. Inténtalo de nuevo o escríbeme a hola@condadodigital.cl.";
        error.hidden = false;
      }
      enviar.disabled = false; enviar.textContent = "Enviar solicitud";
    });

    dialogo.querySelector(".dialogo-cerrar").addEventListener("click", cerrar);
    dialogo.querySelector(".dialogo-ok-cerrar").addEventListener("click", cerrar);
    dialogo.addEventListener("click", (e) => { // clic en el fondo oscuro (fuera del recuadro)
      if (e.target !== dialogo) return;
      const r = dialogo.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) cerrar();
    });
    dialogo.addEventListener("close", () => {
      dialogo.querySelector(".dialogo-paso-form").hidden = false;
      dialogo.querySelector(".dialogo-ok").hidden = true;
      if (ultimoFoco && document.contains(ultimoFoco)) ultimoFoco.focus();
    });
  }

  function abrir(e) {
    if (typeof HTMLDialogElement !== "function") return; // navegador sin <dialog>: sigue a /contacto
    e.preventDefault();
    if (!dialogo) crear();
    ultimoFoco = document.activeElement;
    dialogo.showModal();
    dialogo.querySelector('input[name="nombre"]').focus();
  }
  function cerrar() { if (dialogo && dialogo.open) dialogo.close(); }

  document.addEventListener("click", (e) => {
    const a = e.target.closest(".abrir-contacto");
    if (a) abrir(e);
  });
})();

// ============================================
// Calculadora del inicio: ¿tu campaña gana o pierde plata?
// El HTML trae calculado el ejemplo "Servicios" para que funcione sin JavaScript.
// ============================================
(function () {
  const raiz = document.getElementById("calculadora");
  if (!raiz || !raiz.querySelector("[data-calc]")) return;
  const EJEMPLOS = {
    tienda: { inv: 600000, leads: 300, cierre: 3, ticket: 35000, margen: 35 },
    servicios: { inv: 500000, leads: 50, cierre: 10, ticket: 250000, margen: 40 },
    b2b: { inv: 1500000, leads: 40, cierre: 8, ticket: 1800000, margen: 30 }
  };
  const campos = ["inv", "leads", "cierre", "ticket", "margen"];
  const entrada = {}; campos.forEach((c) => { entrada[c] = raiz.querySelector('[data-calc="' + c + '"]'); });
  const salida = (n) => raiz.querySelector('[data-out="' + n + '"]');
  const money = (n) => { const r = Math.round(n); return (r < 0 ? "-$" : "$") + Math.abs(r).toLocaleString("es-CL"); };
  const coma = (n) => String(n).replace(".", ",");

  function calcular() {
    const inv = Number(entrada.inv.value) || 0, leads = Math.max(1, Number(entrada.leads.value) || 1);
    const cierre = Number(entrada.cierre.value) || 0, ticket = Number(entrada.ticket.value) || 0, margen = Number(entrada.margen.value) || 0;
    const ventas = leads * cierre / 100, ingresos = ventas * ticket, ganVenta = ticket * margen / 100;
    const cpa = ventas > 0 ? inv / ventas : 0, resultado = ventas * ganVenta - inv, gana = resultado >= 0;
    const maxBar = Math.max(cpa, ganVenta, 1);
    const ancho = (v) => Math.max(2, Math.min(100, v / maxBar * 100)).toFixed(1) + "%";
    salida("inv").textContent = money(inv);
    salida("leads").textContent = leads;
    salida("cierre").textContent = cierre + " de 100";
    salida("ticket").textContent = money(ticket);
    salida("margen").textContent = margen + "%";
    salida("cpl").textContent = money(inv / leads);
    salida("cpa").textContent = ventas > 0 ? money(cpa) : "—";
    salida("cpa2").textContent = ventas > 0 ? money(cpa) : "—";
    salida("roas").textContent = inv > 0 ? coma(Math.round(ingresos / inv * 10) / 10) + "x" : "—";
    salida("resultado").textContent = money(resultado);
    salida("veredicto").textContent = gana ? "Tu campaña gana plata" : "Tu campaña pierde plata";
    salida("veredicto-texto").textContent = gana ? "Resultado mensual después de pagar los anuncios." : "Cada venta cuesta más de lo que te deja. Mejora tu tasa de cierre o tu margen antes de invertir más.";
    salida("ganancia").textContent = money(ganVenta);
    salida("ventas").textContent = "Con estos números cierras " + coma(Math.round(ventas * 10) / 10) + " ventas al mes e ingresas " + money(ingresos) + ".";
    raiz.querySelector(".ini-veredicto").classList.toggle("pierde", !gana);
    raiz.querySelector(".ini-barras").classList.toggle("pierde-barra", !gana);
    raiz.querySelector(".ini-barra-cpa").style.width = ancho(cpa);
    raiz.querySelector(".ini-barra-gan").style.width = ancho(ganVenta);
  }
  function marcar(clave) {
    raiz.querySelectorAll("[data-ejemplo]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.ejemplo === clave ? "true" : "false"));
  }
  raiz.querySelectorAll("[data-ejemplo]").forEach((b) => b.addEventListener("click", () => {
    const v = EJEMPLOS[b.dataset.ejemplo];
    campos.forEach((c) => { entrada[c].value = v[c]; });
    marcar(b.dataset.ejemplo); calcular();
  }));
  campos.forEach((c) => entrada[c].addEventListener("input", () => { marcar(""); calcular(); }));
  calcular();
})();

// ============================================
// Formato de números para Chile (miles con punto, decimales con coma)
// ============================================
window.cdNum = (function () {
  function miles(n, d) {
    d = d || 0;
    if (!isFinite(n)) return "—";
    const s = Math.abs(n).toFixed(d);
    const p = s.split(".");
    const ent = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return (n < 0 && Number(s) !== 0 ? "-" : "") + ent + (p[1] ? "," + p[1] : "");
  }
  function money(n) {
    if (!isFinite(n)) return "—";
    const r = Math.round(n);
    return (r < 0 ? "-$" : "$") + miles(Math.abs(r));
  }
  function fmt(u, v) {
    if (!isFinite(v)) return "—";
    if (u === "$") return money(v);
    if (u === "%") return miles(v, Math.abs(v) < 10 ? 2 : 1) + "%";
    if (u === "x") return miles(v, 1) + "x";
    if (u === "v") return miles(v, 1) + " veces";
    return miles(v);
  }
  function leer(texto) { // "1.500.000" → 1500000 · "1,5" → 1.5
    const t = String(texto).replace(/[^\d,.-]/g, "");
    if (t.indexOf(",") >= 0) return Number(t.replace(/\./g, "").replace(",", "."));
    if (/^\d{1,3}(\.\d{3})+$/.test(t)) return Number(t.replace(/\./g, ""));
    return Number(t);
  }
  function quitarTildes(t) { return String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  return { miles: miles, money: money, fmt: fmt, leer: leer, norm: quitarTildes };
})();

// ============================================
// /calculadoras: el taller, la calculadora activa y el simulador de embudo.
// Sin JavaScript, la página muestra la fórmula y un ejemplo calculado de cada una.
// ============================================
(function () {
  const datos = document.getElementById("calc-datos");
  const taller = document.getElementById("taller");
  if (!datos || !taller) return;
  const N = window.cdNum;
  const CFG = JSON.parse(datos.textContent);
  const C = CFG.calcs, byId = {}, catPor = {};
  C.forEach((c) => { byId[c.id] = c; });
  CFG.cats.forEach((k) => { catPor[k.id] = k; });

  const F = {
    "roas": (v) => v.ing / v.inv,
    "roi": (v) => (v.ing - v.cost) / v.cost * 100,
    "cpc": (v) => v.inv / v.clics,
    "cpm": (v) => v.inv / v.imp * 1000,
    "cpv": (v) => v.inv / v.views,
    "cpl": (v) => v.inv / v.leads,
    "cpa": (v) => v.inv / v.conv,
    "ctr": (v) => v.clics / v.imp * 100,
    "cvr": (v) => v.conv / v.clics * 100,
    "frecuencia": (v) => v.imp / v.alc,
    "hook-rate": (v) => v.v3 / v.imp * 100,
    "hold-rate": (v) => v.tp / v.v3 * 100,
    "engagement": (v) => v.int / v.alc * 100,
    "er-seg": (v) => v.int / v.seg * 100,
    "crec-seg": (v) => (v.gan - v.per) / v.ini * 100,
    "tasa-guardado": (v) => v.guar / v.alc * 100,
    "ticket": (v) => v.ing / v.ped,
    "cac": (v) => (v.mkt + v.ven) / v.cli,
    "ltv": (v) => v.tk * v.fr * v.an * v.mg / 100,
    "ltv-cac": (v) => v.ltv / v.cac
  };

  const panel = document.getElementById("activa");
  const o = (k) => panel.querySelector('[data-o="' + k + '"]');
  const campos = panel.querySelector(".calc-campos");
  const metaRango = document.getElementById("calc-meta");
  const tarjetas = Array.prototype.slice.call(taller.querySelectorAll(".calc-tarjeta"));
  let sel = "roas", cat = "todas", q = "";
  const vals = {}, metas = {};

  const valTxt = (u, v) => (u === "$" ? N.money(v) : u === "%" ? N.miles(v, 1) + "%" : N.miles(v));
  const valCampo = (u, v) => (u === "$" ? N.miles(Math.round(v)) : u === "%" ? N.miles(v, 1) : N.miles(v, v % 1 ? 1 : 0));
  function getV(c) {
    const v = {};
    c.ins.forEach((i) => { v[i.k] = vals[c.id] && vals[c.id][i.k] != null ? vals[c.id][i.k] : i.def; });
    return v;
  }
  function meta(c) { return metas[c.id] != null ? metas[c.id] : c.t[0]; }

  // --- Construye la calculadora activa ---
  function armar() {
    const c = byId[sel], v = getV(c);
    o("cat").textContent = catPor[c.cat].label;
    o("code").textContent = c.code; o("code2").textContent = c.code;
    o("name").textContent = c.name;
    o("formula").textContent = c.formula;
    o("mean").textContent = c.mean;
    const gl = o("gl");
    if (c.gl) { gl.hidden = false; gl.setAttribute("href", c.gl); } else { gl.hidden = true; }
    o("nextCode").textContent = byId[c.next].code;
    campos.innerHTML = "";
    c.ins.forEach((i) => {
      const id = "cf-" + i.k;
      const d = document.createElement("div");
      d.className = "calc-campo";
      d.innerHTML =
        '<p class="calc-campo-fila"><label for="' + id + '"></label><span class="calc-num">' +
        (i.u === "$" ? '<span aria-hidden="true">$</span>' : "") +
        '<input type="text" class="calc-txt" id="' + id + '" inputmode="' + (i.u === "%" ? "decimal" : "numeric") + '" autocomplete="off"></span></p>' +
        '<input type="range" class="calc-rango">';
      d.querySelector("label").textContent = i.label;
      const txt = d.querySelector(".calc-txt"), rango = d.querySelector(".calc-rango");
      rango.min = i.min; rango.max = i.max; rango.step = i.step;
      rango.setAttribute("aria-label", i.label + " (control deslizante)");
      txt.value = valCampo(i.u, v[i.k]);
      rango.value = v[i.k];
      rango.setAttribute("aria-valuetext", valTxt(i.u, v[i.k]));
      const fijar = (n) => {
        vals[c.id] = vals[c.id] || {};
        vals[c.id][i.k] = n;
        calcular();
      };
      rango.addEventListener("input", () => {
        const n = Number(rango.value);
        txt.value = valCampo(i.u, n);
        rango.setAttribute("aria-valuetext", valTxt(i.u, n));
        fijar(n);
      });
      txt.addEventListener("input", () => {
        const n = N.leer(txt.value);
        if (!isFinite(n) || txt.value.trim() === "") return;
        rango.value = n;
        rango.setAttribute("aria-valuetext", valTxt(i.u, n));
        fijar(n);
      });
      txt.addEventListener("change", () => {
        const n = N.leer(txt.value);
        txt.value = valCampo(i.u, isFinite(n) ? n : getV(c)[i.k]);
      });
      campos.appendChild(d);
    });
    const conBandas = !!c.bands;
    panel.querySelector(".calc-meta").hidden = conBandas;
    panel.querySelector(".calc-bandas").hidden = !conBandas;
    if (!conBandas) {
      metaRango.min = c.t[1]; metaRango.max = c.t[2]; metaRango.step = c.t[3];
      metaRango.value = meta(c);
      o("metaLabel").textContent = c.up ? "Tu objetivo" : "El máximo que estás dispuesto a pagar";
    } else {
      o("bandNote").textContent = c.bandNote;
      const barra = panel.querySelector(".calc-bandas-barra"), lista = panel.querySelector(".calc-bandas-lista");
      barra.innerHTML = ""; lista.innerHTML = "";
      c.bands.forEach((z) => {
        const seg = document.createElement("span");
        seg.style.background = z[4];
        seg.style.width = ((Math.min(z[1], c.scale) - z[0]) / c.scale * 100).toFixed(1) + "%";
        barra.appendChild(seg);
        const fila = document.createElement("div");
        fila.className = "calc-banda";
        fila.innerHTML = '<span class="calc-banda-punto" aria-hidden="true"></span><span class="calc-banda-tx"><span class="calc-banda-tit"></span><span class="calc-banda-txt"></span></span>';
        fila.querySelector(".calc-banda-punto").style.background = z[4];
        fila.querySelector(".calc-banda-tit").innerHTML = "";
        fila.querySelector(".calc-banda-tit").appendChild(document.createTextNode(z[2] + " "));
        const r = document.createElement("span");
        r.textContent = "· " + (z[1] === 100 ? "desde " + z[0] + "%" : z[0] + "% a " + z[1] + "%");
        fila.querySelector(".calc-banda-tit").appendChild(r);
        fila.querySelector(".calc-banda-txt").textContent = z[3];
        lista.appendChild(fila);
      });
      const marca = document.createElement("span");
      marca.className = "calc-bandas-marca";
      barra.appendChild(marca);
    }
    tarjetas.forEach((t) => t.setAttribute("aria-current", t.dataset.id === sel ? "true" : "false"));
    calcular();
  }

  let anuncioT = null;
  function calcular() {
    const c = byId[sel], v = getV(c), r = F[c.id](v);
    const ins = {}; c.ins.forEach((i) => { ins[i.k] = i.u; });
    const expr = c.expr.replace(/\{(\w+)\}/g, (m, k) => (ins[k] === "$" ? N.money(v[k]) : N.miles(v[k], v[k] % 1 ? 1 : 0)));
    o("expr").textContent = expr + " = " + N.fmt(c.u, r);
    o("res").textContent = N.fmt(c.u, r);
    const caja = panel.querySelector(".calc-res");
    let veredicto, color;
    if (c.bands) {
      let band = null;
      c.bands.forEach((z) => { if (r >= z[0] && (r < z[1] || z[1] === 100)) band = z; });
      if (!band) band = c.bands[c.bands.length - 1];
      veredicto = isFinite(r) ? "Rango " + band[2].toLowerCase() + ". Abajo te explico qué significa." : "Revisa los valores: hay una división por cero.";
      color = isFinite(r) ? band[4] : "#FDE68A";
      panel.querySelectorAll(".calc-banda").forEach((f, n) => f.classList.toggle("activa", c.bands[n] === band));
      panel.querySelectorAll(".calc-bandas-barra > span:not(.calc-bandas-marca)").forEach((s, n) => { s.style.opacity = c.bands[n] === band ? "1" : ".35"; });
      const pos = Math.max(0, Math.min(99, (isFinite(r) ? r : 0) / c.scale * 100));
      panel.querySelector(".calc-bandas-marca").style.left = "calc(" + pos.toFixed(1) + "% - 2px)";
    } else {
      const tv = meta(c);
      const bueno = isFinite(r) && (c.up ? r >= tv : r <= tv);
      const ratio = tv > 0 && isFinite(r) ? r / tv : 0;
      const dif = Math.round(Math.abs(ratio - 1) * 100);
      if (!isFinite(r)) veredicto = "Revisa los valores: hay una división por cero.";
      else if (dif === 0) veredicto = "Justo en tu objetivo.";
      else if (c.up) veredicto = bueno ? "Un " + dif + "% por sobre tu objetivo. Vas bien." : "Un " + dif + "% bajo tu objetivo. Hay espacio para mejorar.";
      else veredicto = bueno ? "Un " + dif + "% bajo tu límite. Vas bien." : "Un " + dif + "% por sobre tu límite. Te está saliendo caro.";
      color = bueno ? "#C8F169" : "#FCA5A5";
      o("metaTxt").textContent = N.fmt(c.u, tv);
      o("metaMarca").textContent = (c.up ? "objetivo " : "límite ") + N.fmt(c.u, tv);
      metaRango.setAttribute("aria-valuetext", N.fmt(c.u, tv));
      const fill = panel.querySelector(".calc-barra-fill");
      fill.style.width = Math.max(2, Math.min(100, ratio * 50)).toFixed(1) + "%";
      fill.style.background = bueno ? "#C8F169" : "#F87171";
    }
    caja.style.background = color;
    o("ver").textContent = veredicto;
    clearTimeout(anuncioT);
    anuncioT = setTimeout(() => { o("anuncio").textContent = "Tu " + c.code + ": " + N.fmt(c.u, r) + ". " + veredicto; }, 700);
  }

  metaRango.addEventListener("input", () => { metas[sel] = Number(metaRango.value); calcular(); });

  function elegir(id, ir) {
    if (!byId[id]) return;
    sel = id;
    armar();
    if (ir) {
      panel.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      panel.focus({ preventScroll: true });
    }
    try { history.replaceState(null, "", "#" + id); } catch (e) {}
  }

  // --- Filtros y buscador ---
  const cuenta = taller.querySelector(".pg-cuenta"), vacio = taller.querySelector(".pg-vacio"), intro = taller.querySelector(".pg-intro");
  function filtrar() {
    const nq = N.norm(q).trim();
    let n = 0;
    tarjetas.forEach((t) => {
      const ok = (cat === "todas" || t.dataset.cat === cat) && (!nq || t.dataset.buscar.indexOf(nq) >= 0);
      t.hidden = !ok;
      if (ok) n++;
    });
    cuenta.textContent = n === C.length ? C.length + " calculadoras" : n + " de " + C.length + " calculadoras";
    vacio.hidden = n > 0;
    if (cat !== "todas") {
      intro.hidden = false;
      intro.querySelector("p").textContent = catPor[cat].intro;
      intro.querySelector(".pg-intro-punto").style.background = catPor[cat].color;
    } else intro.hidden = true;
  }
  taller.querySelectorAll(".pg-chip").forEach((b) => b.addEventListener("click", () => {
    cat = b.dataset.cat;
    taller.querySelectorAll(".pg-chip").forEach((x) => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
    filtrar();
    if (cat !== "todas") { const p = C.filter((x) => x.cat === cat)[0]; if (p) { sel = p.id; armar(); } }
  }));
  document.getElementById("calc-q").addEventListener("input", (e) => { q = e.target.value; filtrar(); });
  tarjetas.forEach((t) => t.addEventListener("click", (e) => { e.preventDefault(); elegir(t.dataset.id, true); }));
  panel.querySelector('[data-accion="siguiente"]').addEventListener("click", () => elegir(byId[sel].next, false));
  panel.querySelector('[data-accion="reiniciar"]').addEventListener("click", () => { delete vals[sel]; delete metas[sel]; armar(); });

  // --- Simulador de embudo ---
  const cadena = document.getElementById("cadena");
  const h = {}; CFG.sim.forEach((s) => { h[s.k] = s.def; });
  const COL = ["#60A5FA", "#3B82F6", "#2DD4BF", "#14B8A6", "#C8F169"];
  let ultimo = {};
  function simular() {
    const imp = h.inv / h.cpm * 1000, clics = imp * h.ctr / 100, leads = clics * h.cvr / 100, ventas = leads * h.cierre / 100, ing = ventas * h.ticket;
    const m = Math.log10(Math.max(imp, 10));
    const logw = (x) => Math.max(3, Math.min(100, Math.log10(Math.max(x, 1)) / m * 100));
    const pasos = [[imp, N.miles(imp)], [clics, N.miles(clics)], [leads, N.miles(leads)], [ventas, N.miles(ventas, 1)], [ing, N.money(ing)]];
    pasos.forEach((p, n) => {
      cadena.querySelector('[data-sim-out="p' + n + '"]').textContent = p[1];
      const w = n === 4 ? Math.max(3, Math.min(100, ing / Math.max(h.inv, 1) * 25)) : logw(p[0]);
      cadena.querySelector('[data-sim-bar="p' + n + '"]').style.width = w.toFixed(1) + "%";
    });
    const set = (k, t) => { cadena.querySelector('[data-sim-out="' + k + '"]').textContent = t; };
    set("cpc", N.money(h.inv / clics)); set("cpl", N.money(h.inv / leads));
    set("cpa", ventas > 0 ? N.money(h.inv / ventas) : "—");
    set("roas", N.miles(ing / h.inv, 1) + "x"); set("ctr", N.miles(h.ctr, 1) + "%");
    ultimo = {
      cpc: { inv: h.inv, clics: Math.round(clics) },
      cpl: { inv: h.inv, leads: Math.max(1, Math.round(leads)) },
      cpa: { inv: h.inv, conv: Math.max(1, Math.round(ventas)) },
      roas: { ing: Math.round(ing / 50000) * 50000, inv: h.inv },
      ctr: { clics: Math.round(clics / 10) * 10, imp: Math.round(imp / 1000) * 1000 }
    };
  }
  CFG.sim.forEach((s) => {
    const r = cadena.querySelector('[data-sim="' + s.k + '"]');
    r.addEventListener("input", () => {
      h[s.k] = Number(r.value);
      const t = valTxt(s.u, h[s.k]);
      cadena.querySelector('[data-sim-txt="' + s.k + '"]').textContent = t;
      r.setAttribute("aria-valuetext", t);
      simular();
    });
  });
  cadena.querySelectorAll("[data-abre]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    const id = a.dataset.abre;
    vals[id] = Object.assign({}, ultimo[id]);
    cat = "todas"; q = "";
    document.getElementById("calc-q").value = "";
    taller.querySelectorAll(".pg-chip").forEach((x) => x.setAttribute("aria-pressed", x.dataset.cat === "todas" ? "true" : "false"));
    filtrar();
    elegir(id, true);
  }));
  simular();

  // --- Inicio: la calculadora del enlace (#roas, #cpa, …) o ROAS ---
  const ancla = decodeURIComponent(location.hash.slice(1));
  if (byId[ancla]) { sel = ancla; armar(); setTimeout(() => panel.scrollIntoView({ block: "start" }), 0); }
  else armar();
  window.addEventListener("hashchange", () => { const id = location.hash.slice(1); if (byId[id] && id !== sel) elegir(id, true); });
})();

// ============================================
// /glosario: filtros por tema y letra, buscador, tarjetas de 16 en 16,
// ficha rápida y "Ponte a prueba". Los datos salen de la lista completa
// que trae el HTML (la que se ve sin JavaScript).
// ============================================
(function () {
  const datos = document.getElementById("glo-datos");
  const sec = document.getElementById("terminos");
  if (!datos || !sec) return;
  const N = window.cdNum;
  const CFG = JSON.parse(datos.textContent);
  const temaPor = {}; CFG.temas.forEach((t) => { temaPor[t.id] = t; });
  const txt = (li, s) => { const x = li.querySelector(s); return x ? x.textContent : ""; };
  const T = Array.prototype.slice.call(sec.querySelectorAll(".glo-lista li.gt")).map((li) => ({
    id: li.id, orden: Number(li.dataset.orden), tema: li.dataset.tema, pub: li.dataset.pub === "1", calc: li.dataset.calc,
    rel: li.dataset.rel ? li.dataset.rel.split(" ") : [],
    code: txt(li, ".gt-code"), full: txt(li, ".gt-full"), def: txt(li, ".gt-def"),
    formula: txt(li, ".gt-formula dd"), ej: txt(li, ".gt-ej dd"), err: txt(li, ".gt-err dd"), pv: txt(li, ".gt-pv dd")
  })).sort((a, b) => a.orden - b.orden);
  const by = {}; T.forEach((t) => { by[t.id] = t; t.buscar = N.norm(t.code + " " + t.full + " " + t.def); t.letra = N.norm(t.code).charAt(0).toUpperCase(); });

  const PAG = 16;
  let tema = "todas", letra = "", q = "", mas = 0, sel = by.cpa ? "cpa" : T[0].id;
  const grid = sec.querySelector(".glo-grid"), cuenta = sec.querySelector(".pg-cuenta"), vacio = sec.querySelector(".pg-vacio");
  const intro = sec.querySelector(".pg-intro-simple"), masCaja = sec.querySelector(".glo-mas"), masBtn = masCaja.querySelector("button");
  const ficha = document.getElementById("ficha");
  const npub = T.filter((t) => t.pub).length;

  function lista() {
    const nq = N.norm(q).trim();
    return T.filter((t) => (tema === "todas" || t.tema === tema) && (!letra || t.letra === letra) && (!nq || t.buscar.indexOf(nq) >= 0));
  }
  function pintar() {
    const l = lista(), vis = l.slice(0, PAG * (1 + mas));
    grid.innerHTML = "";
    vis.forEach((t) => {
      const a = document.createElement("a");
      a.className = "glo-tarjeta";
      a.href = "#" + t.id;
      a.dataset.id = t.id;
      a.setAttribute("aria-current", t.id === sel ? "true" : "false");
      a.innerHTML = '<span class="glo-badge"></span><span class="glo-code"></span><span class="glo-full"></span><span class="glo-corta"></span><span class="glo-estado"></span>';
      a.querySelector(".glo-badge").textContent = temaPor[t.tema].label;
      a.querySelector(".glo-badge").style.background = temaPor[t.tema].color;
      a.querySelector(".glo-code").textContent = t.code;
      a.querySelector(".glo-full").textContent = t.full;
      a.querySelector(".glo-corta").textContent = t.def;
      a.querySelector(".glo-estado").textContent = t.pub ? "Ficha completa" : "Nuevo";
      a.addEventListener("click", (e) => { e.preventDefault(); elegir(t.id, true); });
      grid.appendChild(a);
    });
    const quedan = l.length - vis.length;
    masCaja.hidden = quedan <= 0;
    masBtn.textContent = "Mostrar " + Math.min(PAG, quedan) + " términos más (quedan " + quedan + ")";
    vacio.hidden = l.length > 0;
    cuenta.textContent = (l.length === T.length ? T.length + " términos" : l.length + " de " + T.length + " términos") + " · " + npub + " con ficha completa";
    if (tema !== "todas") { intro.hidden = false; intro.textContent = temaPor[tema].intro; } else intro.hidden = true;
    sec.querySelectorAll(".pg-chip").forEach((b) => {
      const on = b.dataset.tema === tema;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.style.background = on && b.dataset.color ? b.dataset.color : "";
      b.style.borderColor = on && b.dataset.color ? "var(--ink)" : "";
    });
    sec.querySelectorAll(".glo-letra").forEach((b) => b.setAttribute("aria-pressed", b.dataset.letra === letra ? "true" : "false"));
  }
  masBtn.addEventListener("click", () => {
    const antes = grid.children.length;
    mas++; pintar();
    const sig = grid.children[antes];
    if (sig) sig.focus();
  });

  function caja(nombre, valor) {
    const c = ficha.querySelector('[data-caja="' + nombre + '"]');
    c.hidden = !valor;
    const p = c.querySelector('[data-o]');
    if (p && valor) p.textContent = valor;
  }
  function elegir(id, ir) {
    const t = by[id]; if (!t) return;
    sel = id;
    const q = (k) => ficha.querySelector('[data-o="' + k + '"]');
    q("tema").textContent = temaPor[t.tema].label;
    q("code").textContent = t.code;
    q("full").textContent = t.full;
    q("def").textContent = t.def;
    q("href").hidden = !t.pub; q("href").setAttribute("href", "glosario-" + t.id);
    q("prox").hidden = t.pub;
    q("calc").hidden = !t.calc;
    if (t.calc) { q("calc").setAttribute("href", "calculadoras#" + t.calc); q("calc").textContent = "Calcular mi " + t.code; }
    caja("formula", t.formula); caja("ej", t.ej); caja("err", t.err); caja("pv", t.pv);
    const rel = ficha.querySelector('[data-caja="rel"]');
    rel.querySelectorAll("button").forEach((b) => b.remove());
    rel.hidden = !t.rel.length;
    t.rel.forEach((r) => {
      if (!by[r]) return;
      const b = document.createElement("button");
      b.type = "button"; b.textContent = by[r].code;
      b.addEventListener("click", () => elegir(r, false));
      rel.appendChild(b);
    });
    grid.querySelectorAll(".glo-tarjeta").forEach((a) => a.setAttribute("aria-current", a.dataset.id === id ? "true" : "false"));
    if (ir) {
      ficha.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      ficha.focus({ preventScroll: true });
    }
    try { history.replaceState(null, "", "#" + id); } catch (e) {}
  }

  sec.querySelectorAll(".pg-chip").forEach((b) => b.addEventListener("click", () => {
    tema = b.dataset.tema; letra = ""; mas = 0;
    pintar();
    const p = lista()[0];
    if (tema !== "todas" && p) elegir(p.id, false);
  }));
  sec.querySelectorAll(".glo-letra").forEach((b) => b.addEventListener("click", () => {
    if (b.disabled) return;
    letra = letra === b.dataset.letra ? "" : b.dataset.letra; tema = "todas"; mas = 0;
    pintar();
  }));
  const buscador = document.querySelector(".glo-buscador"), entrada = document.getElementById("glo-q");
  entrada.addEventListener("input", () => { q = entrada.value; tema = "todas"; letra = ""; mas = 0; pintar(); });
  buscador.addEventListener("submit", (e) => {
    e.preventDefault();
    q = entrada.value; tema = "todas"; letra = ""; mas = 0; pintar();
    sec.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });

  pintar();
  const ancla = decodeURIComponent(location.hash.slice(1));
  if (by[ancla]) { elegir(ancla, false); setTimeout(() => ficha.scrollIntoView({ block: "start" }), 0); }
  else elegir(sel, false);
  window.addEventListener("hashchange", () => { const id = location.hash.slice(1); if (by[id] && id !== sel) elegir(id, true); });

  // --- Ponte a prueba ---
  const prueba = document.getElementById("prueba");
  if (!prueba) return;
  // Se excluyen los términos cuya definición menciona su propio nombre (darían la respuesta)
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // y se quita el nombre que antecede a algunas definiciones («Click-Through Rate: …»)
  const sinNombre = (d) => { const m = d.match(/^[^:]{2,45}:\s+(.*)$/); return m ? m[1].charAt(0).toUpperCase() + m[1].slice(1) : d; };
  T.forEach((t) => { t.defQuiz = sinNombre(t.def); });
  const pool = T.filter((t) => {
    const nombre = N.norm(t.code).split(/[\s/(]/)[0];
    return nombre.length < 2 || !new RegExp("(^|[^a-z0-9])" + esc(nombre) + "($|[^a-z0-9])").test(N.norm(t.defQuiz));
  });
  const orden = []; for (let i = 0; i < pool.length; i++) orden.push((i * 7 + 3) % pool.length);
  let qi = 0, respondida = false;
  const opts = prueba.querySelector(".quiz-opts"), res = prueba.querySelector(".quiz-res"), msg = prueba.querySelector(".quiz-msg");
  function pregunta() {
    const n = qi % orden.length, ans = pool[orden[n]];
    let ops = [ans, pool[orden[(n + 5) % orden.length]], pool[orden[(n + 9) % orden.length]]];
    const rot = n % 3; ops = ops.slice(rot).concat(ops.slice(0, rot));
    prueba.querySelector('[data-q="cont"]').textContent = "Pregunta " + (n + 1) + " de " + orden.length;
    prueba.querySelector('[data-q="def"]').textContent = "“" + ans.defQuiz + "”";
    opts.innerHTML = ""; res.hidden = true; respondida = false; msg.className = "quiz-msg";
    ops.forEach((t) => {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = t.code;
      b.addEventListener("click", () => {
        if (respondida) return;
        respondida = true;
        const ok = t.id === ans.id;
        opts.querySelectorAll("button").forEach((x, k) => {
          x.disabled = true;
          if (ops[k].id === ans.id) x.classList.add("ok"); else if (x === b) x.classList.add("mal");
        });
        msg.textContent = ok ? "¡Correcto! Es " + ans.code + " (" + ans.full.toLowerCase() + ")." : "Casi. La respuesta es " + ans.code + ": " + ans.full.toLowerCase() + ".";
        msg.classList.add(ok ? "ok" : "mal");
        res.hidden = false;
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({ event: "glosario_quiz", resultado: ok ? "correcto" : "incorrecto" });
      });
      opts.appendChild(b);
    });
  }
  prueba.querySelector(".quiz-otra").addEventListener("click", () => { qi++; pregunta(); opts.querySelector("button").focus(); });
  pregunta();
})();

// ============================================
// /enciclopedia: rutas de lectura (con "Marcar como leído" guardado en este
// navegador), filtro por tema y autodiagnóstico de 5 preguntas.
// ============================================
(function () {
  const datos = document.getElementById("diag-datos");
  const ruta = document.getElementById("ruta");
  if (!datos || !ruta) return;
  const CLAVE = "cd_enciclopedia_leidos";
  let leidos = {};
  try { leidos = JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch (e) { leidos = {}; }
  const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(leidos)); } catch (e) {} };

  // Rutas
  const botones = ruta.querySelectorAll(".enc-ruta-btn"), paneles = ruta.querySelectorAll(".enc-ruta");
  function pintarRutas() {
    paneles.forEach((p) => {
      const pasos = p.querySelectorAll(".enc-paso");
      let n = 0;
      pasos.forEach((li) => {
        const d = !!leidos[li.dataset.art];
        if (d) n++;
        li.classList.toggle("leido", d);
        const b = li.querySelector(".enc-leido");
        b.setAttribute("aria-pressed", d ? "true" : "false");
        b.textContent = d ? "✓ Leído" : "Marcar como leído";
      });
      p.querySelector(".enc-avance-txt").textContent = "Llevas " + n + " de " + pasos.length + " artículos";
      p.querySelector(".enc-avance-barra > div").style.width = Math.max(2, Math.round(n / pasos.length * 100)) + "%";
    });
  }
  botones.forEach((b) => b.addEventListener("click", () => {
    botones.forEach((x) => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
    paneles.forEach((p) => p.classList.toggle("activa", p.dataset.ruta === b.dataset.ruta));
  }));
  ruta.querySelectorAll(".enc-leido").forEach((b) => b.addEventListener("click", () => {
    const art = b.closest(".enc-paso").dataset.art;
    if (leidos[art]) delete leidos[art]; else leidos[art] = true;
    guardar(); pintarRutas();
  }));
  pintarRutas();

  // Filtro por tema
  const sa = document.getElementById("articulos");
  sa.querySelectorAll(".pg-chip").forEach((b) => b.addEventListener("click", () => {
    sa.querySelectorAll(".pg-chip").forEach((x) => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
    sa.querySelectorAll(".enc-art").forEach((a) => { a.hidden = !(b.dataset.tema === "todos" || a.dataset.tema === b.dataset.tema); });
  }));

  // Autodiagnóstico
  const D = JSON.parse(datos.textContent).preguntas;
  const diag = document.getElementById("diagnostico");
  const resp = {};
  let enviado = "";
  const d = (k) => diag.querySelector('[data-d="' + k + '"]');
  function pintarDiag() {
    let contestadas = 0, si = 0, rec = null;
    D.forEach((p, i) => {
      const a = resp[i];
      if (a) contestadas++;
      if (a === "si") si++;
      if (!rec && (a === "no" || a === "ns")) rec = p;
      const li = diag.querySelector('.diag-q[data-i="' + i + '"]');
      li.classList.toggle("respondida", !!a);
      li.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.r === a ? "true" : "false"));
    });
    let tit, txt;
    if (contestadas === 0) { tit = "Responde para ver tu resultado"; txt = "No hay respuestas buenas ni malas: es para saber por dónde partir."; }
    else if (contestadas < D.length) { tit = "Vas " + contestadas + " de " + D.length; txt = "Termina las preguntas para ver tu recomendación completa."; }
    else if (si === 5) { tit = "Tienes las bases claras"; txt = "El siguiente paso es afinar: revisa la Enciclopedia por tema o pon a prueba tus números en las calculadoras."; }
    else if (si >= 3) { tit = "Vas bien, con huecos puntuales"; txt = "Tienes casi todo ordenado. Parte por el tema donde respondiste \"no\" o \"no sé\"."; }
    else { tit = "Estás invirtiendo a ciegas en partes clave"; txt = "Es más común de lo que crees. Lee la guía recomendada o, si prefieres ir más rápido, lo revisamos juntos."; }
    const completo = contestadas === D.length;
    d("score").textContent = si;
    d("score").style.color = !completo ? "" : si >= 4 ? "#C8F169" : si >= 3 ? "#FDE68A" : "#FCA5A5";
    diag.querySelector(".diag-barra > div").style.width = Math.max(2, si / D.length * 100) + "%";
    d("tit").textContent = tit; d("txt").textContent = txt;
    const a = diag.querySelector(".diag-rec");
    a.hidden = !rec;
    if (rec) { a.setAttribute("href", rec.art); d("recTit").textContent = rec.title; d("recPor").textContent = rec.why; }
    diag.querySelector(".diag-juntos").hidden = !(completo && si < 3);
    if (completo) {
      const firma = D.map((p, i) => resp[i]).join(",");
      if (firma !== enviado) {
        enviado = firma;
        window.dataLayer = window.dataLayer || [];
        dataLayer.push({ event: "diagnostico_completado", puntaje: si, recomendado: rec ? rec.art : "ninguno" });
      }
    }
  }
  diag.querySelectorAll(".diag-q").forEach((li) => li.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
    resp[li.dataset.i] = b.dataset.r; pintarDiag();
  })));
  diag.querySelector(".diag-reset").addEventListener("click", () => {
    Object.keys(resp).forEach((k) => delete resp[k]); enviado = ""; pintarDiag();
    diag.querySelector(".diag-opts button").focus();
  });
  pintarDiag();
})();

// ============================================
// El Conde: cargador liviano del asistente guiado.
// Aquí solo se crean el botón y el aviso. El panel (conde.js y conde.css)
// se descarga con import() la primera vez que alguien lo abre.
// Sin JavaScript no aparece nada.
// ============================================
(function () {
  if (!("IntersectionObserver" in window) || !window.Promise) return;
  const CONDE_V = "20261110a";
  const CEL = window.matchMedia("(max-width: 600px)");
  const CLAVE_AVISO = "cd_conde_aviso";
  let boton, envoltura, aviso = null, modulo = null, cargando = null, precargado = false;
  let enBanda = false, abierto = false;

  const ses = {
    leer() { try { return sessionStorage.getItem(CLAVE_AVISO); } catch (e) { return "1"; } },
    marcar() { try { sessionStorage.setItem(CLAVE_AVISO, "1"); } catch (e) {} }
  };
  const bannerVisible = () => !!document.querySelector(".cookies-banner");

  function actualizar() {
    // En celular, nada mientras el banner de cookies espera una respuesta.
    // En todos los tamaños, nada mientras se ve la banda final o el footer (salvo con el panel abierto).
    const ocultar = !abierto && (enBanda || (CEL.matches && bannerVisible()));
    envoltura.classList.toggle("conde-fuera", ocultar);
    envoltura.toggleAttribute("inert", ocultar);
    if (ocultar) cerrarAviso();
    else if (avisoPendiente) mostrarAviso();
  }

  function precargar() {
    if (precargado) return;
    precargado = true;
    const css = document.createElement("link");
    css.rel = "preload"; css.as = "style"; css.href = "conde.css?v=" + CONDE_V;
    const js = document.createElement("link");
    js.rel = "modulepreload"; js.href = "conde.js?v=" + CONDE_V;
    document.head.append(css, js);
  }

  function cargar() {
    if (cargando) return cargando;
    precargar();
    const hoja = new Promise((ok) => {
      const l = document.createElement("link");
      l.rel = "stylesheet"; l.href = "conde.css?v=" + CONDE_V;
      l.onload = ok; l.onerror = ok;
      document.head.appendChild(l);
    });
    cargando = Promise.all([hoja, import("./conde.js?v=" + CONDE_V)]).then((r) => {
      modulo = r[1].iniciar({
        boton: boton,
        version: CONDE_V,
        alCambiar(estado) {
          abierto = estado;
          envoltura.classList.toggle("conde-abierto", estado);
          boton.setAttribute("aria-expanded", estado ? "true" : "false");
          boton.setAttribute("aria-label", estado ? "Cerrar la ayuda de El Conde" : "Abrir la ayuda de El Conde");
          if (estado) boton.setAttribute("aria-controls", "conde-panel");
          actualizar();
        }
      });
      return modulo;
    }).catch(() => { cargando = null; window.location.href = "glosario"; });
    return cargando;
  }

  function alternar() {
    cerrarAviso();
    ses.marcar(); avisoPendiente = false;
    boton.setAttribute("aria-busy", "true");
    cargar().then((m) => { boton.removeAttribute("aria-busy"); if (m) m.alternar(); });
  }

  // --- Aviso «¿Necesitas ayuda?»: una vez por visita, a los 20 s o al pasar la mitad de la página ---
  let avisoPendiente = false, avisoTimer = null;
  function cerrarAviso() {
    if (!aviso) return;
    clearTimeout(avisoTimer);
    aviso.remove(); aviso = null;
  }
  function mostrarAviso() {
    if (aviso || abierto || ses.leer()) { avisoPendiente = false; return; }
    if (envoltura.classList.contains("conde-fuera")) { avisoPendiente = true; return; }
    avisoPendiente = false;
    ses.marcar();
    aviso = document.createElement("div");
    aviso.className = "conde-aviso";
    aviso.setAttribute("role", "status");
    aviso.innerHTML =
      '<span class="conde-aviso-cola" aria-hidden="true"></span>' +
      '<div class="conde-aviso-fila">' +
      '<button type="button" class="conde-aviso-abrir"><strong>¿Necesitas ayuda?</strong><span>Te ayudo a encontrar lo que buscas</span></button>' +
      '<button type="button" class="conde-aviso-x" aria-label="Cerrar el aviso"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      "</div>" +
      '<span class="conde-cuenta" aria-hidden="true"></span>';
    aviso.querySelector(".conde-aviso-abrir").addEventListener("click", alternar);
    aviso.querySelector(".conde-aviso-x").addEventListener("click", () => { cerrarAviso(); boton.focus(); });
    envoltura.appendChild(aviso);
    avisoTimer = setTimeout(cerrarAviso, 8000);
  }
  function programarAviso() {
    if (ses.leer()) return;
    let listo = false;
    const disparar = () => {
      if (listo) return;
      listo = true;
      window.removeEventListener("scroll", alDesplazar);
      mostrarAviso();
    };
    const alDesplazar = () => {
      const h = document.documentElement;
      if (h.scrollTop + window.innerHeight / 2 >= h.scrollHeight / 2) disparar();
    };
    setTimeout(disparar, 20000);
    window.addEventListener("scroll", alDesplazar, { passive: true });
  }

  function crear() {
    envoltura = document.createElement("div");
    envoltura.className = "conde-lanzador";
    envoltura.innerHTML =
      '<button type="button" class="conde-boton" aria-label="Abrir la ayuda de El Conde" aria-expanded="false">' +
      '<img src="img/conde/conde-frente-cabeza.webp" alt="" width="135" height="143" decoding="async"></button>' +
      '<span class="conde-insignia" aria-hidden="true"><svg width="28" height="26" viewBox="0 0 28 26"><path d="M4 2h20a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H12l-6 5v-5H4a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z" fill="#C8F169" stroke="#05070A" stroke-width="1.6" stroke-linejoin="round"/><circle cx="8.5" cy="10.5" r="1.8" fill="#05070A"/><circle cx="14" cy="10.5" r="1.8" fill="#05070A"/><circle cx="19.5" cy="10.5" r="1.8" fill="#05070A"/></svg></span>';
    boton = envoltura.querySelector(".conde-boton");
    boton.addEventListener("click", alternar);
    ["pointerenter", "focus", "touchstart"].forEach((t) => boton.addEventListener(t, precargar, { passive: true, once: true }));
    document.body.appendChild(envoltura);

    // Banda final del inicio y footer
    const vistos = new Set();
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => { if (en.isIntersecting) vistos.add(en.target); else vistos.delete(en.target); });
      enBanda = vistos.size > 0;
      actualizar();
    });
    document.querySelectorAll(".ini-final, body > footer").forEach((el) => io.observe(el));

    // Banner de cookies: cuando la persona elige, el banner se quita del DOM
    if (bannerVisible()) {
      const mo = new MutationObserver(() => { if (!bannerVisible()) { mo.disconnect(); actualizar(); } });
      mo.observe(document.body, { childList: true });
    }
    if (CEL.addEventListener) CEL.addEventListener("change", actualizar);
    actualizar();
    programarAviso();
  }

  // Después de "load", con margen y en un momento ocioso: el botón nunca compite con la carga de la página
  const despues = () => setTimeout(() => (window.requestIdleCallback ? requestIdleCallback(crear, { timeout: 3000 }) : crear()), 1500);
  if (document.readyState === "complete") despues();
  else window.addEventListener("load", despues, { once: true });
})();
