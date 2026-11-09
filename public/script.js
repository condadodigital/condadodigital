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
    { t: "Calculadoras de marketing (17 métricas)", u: "calculadoras", tipo: "Recurso", k: "calculadora roas roi cpa cpl cac cpc cpm cpv ctr cvr frecuencia engagement seguidores guardados ticket ltv metricas" },
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
    { t: "Glosario de Marketing", u: "glosario", tipo: "Sección", k: "glosario diccionario terminos cpc cpm ctr cac ltv" },
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
