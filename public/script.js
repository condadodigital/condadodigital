(function () {
  "use strict";
  window.dataLayer = window.dataLayer || [];
  var medir = function (evento, datos) { var o = { event: evento }; for (var k in datos || {}) o[k] = datos[k]; window.dataLayer.push(o); };
  window.cdMedir = medir;
  var quieto = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.cdQuieto = quieto;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  window.cdEsc = esc;

  const INDICE = [
  { t: "Calculadoras de marketing (20 métricas)", u: "/calculadoras", tipo: "Recurso", k: "calculadora roas roi cpa cpl cac cpc cpm cpv ctr cvr frecuencia hook rate hold rate engagement seguidores guardados ticket ltv ltv/cac simulador embudo metricas" },
  { t: "¿Qué es el CPA?", u: "/glosario-cpa", tipo: "Glosario", k: "cpa costo por adquisicion formula" },
  { t: "¿Qué es el CAC?", u: "/glosario-cac", tipo: "Glosario", k: "cac costo adquisicion cliente" },
  { t: "¿Qué es el LTV?", u: "/glosario-ltv", tipo: "Glosario", k: "ltv lifetime value valor vida cliente" },
  { t: "¿Qué es el CPC?", u: "/glosario-cpc", tipo: "Glosario", k: "cpc costo por clic" },
  { t: "¿Qué es el CPM?", u: "/glosario-cpm", tipo: "Glosario", k: "cpm costo mil impresiones" },
  { t: "¿Qué es el CTR?", u: "/glosario-ctr", tipo: "Glosario", k: "ctr tasa clics click through rate" },
  { t: "¿Qué es el CVR?", u: "/glosario-cvr", tipo: "Glosario", k: "cvr tasa conversion" },
  { t: "¿Qué es el CPL?", u: "/glosario-cpl", tipo: "Glosario", k: "cpl costo por lead" },
  { t: "¿Qué es AEO?", u: "/glosario-aeo", tipo: "Glosario", k: "aeo answer engine optimization respuestas" },
  { t: "¿Qué es GEO?", u: "/glosario-geo", tipo: "Glosario", k: "geo generative engine optimization ia chatgpt" },
  { t: "¿Qué es CRO?", u: "/glosario-cro", tipo: "Glosario", k: "cro optimizacion conversion tests ab" },
  { t: "¿Qué es un CRM?", u: "/glosario-crm", tipo: "Glosario", k: "crm gestion clientes hubspot pipedrive" },
  { t: "¿Qué es GA4?", u: "/glosario-ga4", tipo: "Glosario", k: "ga4 google analytics eventos medicion" },
  { t: "¿Qué es GTM?", u: "/glosario-gtm", tipo: "Glosario", k: "gtm google tag manager etiquetas" },
  { t: "¿Qué es la CAPI?", u: "/glosario-capi", tipo: "Glosario", k: "capi conversions api servidor meta" },
  { t: "¿Qué son las UTM?", u: "/glosario-utm", tipo: "Glosario", k: "utm parametros seguimiento campanas atribucion" },
  { t: "Enciclopedia de marketing digital", u: "/enciclopedia", tipo: "Sección", k: "enciclopedia articulos referencia conceptos marketing digital" },
  { t: "Marketing digital", u: "/que-es-el-marketing-digital", tipo: "Enciclopedia", k: "marketing digital que es canales pymes chile empezar presupuesto" },
  { t: "Marketing tradicional vs. marketing digital", u: "/marketing-tradicional-vs-digital", tipo: "Enciclopedia", k: "tradicional digital radio via publica tv ferias combinar diferencias" },
  { t: "Embudo de marketing", u: "/embudo-de-marketing", tipo: "Enciclopedia", k: "embudo funnel etapas metricas aida messy middle flywheel cpm ctr cpl cac ltv" },
  { t: "Publicidad pagada vs. orgánica", u: "/publicidad-pagada-vs-organica", tipo: "Enciclopedia", k: "pagada organica seo pauta efecto halo cyberday black friday" },
  { t: "Analítica digital", u: "/analitica-digital", tipo: "Enciclopedia", k: "analitica ga4 gtm pixel utm eventos clave medicion ley 21719 datos personales" },
  { t: "Marketing con inteligencia artificial", u: "/marketing-con-ia", tipo: "Enciclopedia", k: "ia inteligencia artificial performance max advantage aeo geo chatgpt" },
  { t: "Core update de Google de noviembre 2026", u: "/core-update-google-noviembre-2026", tipo: "Enciclopedia", k: "core update google noviembre 2026 actualizacion algoritmo seo black friday ranking" },
  { t: "ChatGPT Ads en Chile", u: "/chatgpt-ads-chile", tipo: "Enciclopedia", k: "chatgpt ads chile openai anuncios publicidad aleph target cpa target cpc ia" },
  { t: "Sitio web", u: "/sitio-web", tipo: "Enciclopedia", k: "sitio web pagina web dominio cl hosting wordpress shopify jumpseller tiendanube github pages cloudflare cuanto cuesta" },
  { t: "Tienda online en Chile", u: "/tienda-online", tipo: "Enciclopedia", k: "tienda online ecommerce comercio electronico shopify jumpseller tiendanube woocommerce marketplace mercado libre dropshipping retracto" },
  { t: "Crear un sitio web con inteligencia artificial", u: "/crear-sitio-web-con-ia", tipo: "Enciclopedia", k: "crear sitio web pagina web con ia inteligencia artificial lovable vibe coding wix hostinger constructor" },
  { t: "Perfil de Empresa de Google", u: "/perfil-de-empresa-google", tipo: "Enciclopedia", k: "perfil de empresa google mi negocio my business maps ficha resenas verificacion seo local" },
  { t: "WhatsApp Business", u: "/whatsapp-business", tipo: "Enciclopedia", k: "whatsapp business api catalogo respuestas rapidas mensajes costo por mensaje ventas" },
  { t: "Meta Ads vs Google Ads", u: "/meta-ads-vs-google-ads", tipo: "Enciclopedia", k: "meta ads google ads facebook instagram publicidad cpm cpc comparacion cual conviene" },
  { t: "Cómo investigar los anuncios de tu competencia", u: "/biblioteca-de-anuncios", tipo: "Enciclopedia", k: "biblioteca de anuncios meta ad library centro de transparencia google competencia espiar anuncios" },
  { t: "Fechas comerciales en Chile", u: "/fechas-comerciales-chile", tipo: "Enciclopedia", k: "fechas comerciales chile cyberday cybermonday black friday navidad calendario ccs" },
  { t: "Glosario de Marketing (168 términos)", u: "/glosario", tipo: "Sección", k: "glosario diccionario terminos cpc cpm ctr cac ltv roas mer ymyl pujas audiencias formatos" },
  { t: "Preguntas frecuentes", u: "/preguntas-frecuentes", tipo: "Sección", k: "faq preguntas que es paid media seo sem aeo geo pixel capi" },
  { t: "Herramientas de Marketing", u: "/herramientas", tipo: "Sección", k: "herramientas google ads meta ga4 gtm looker ahrefs semrush claude chatgpt" },
  { t: "Quiénes somos", u: "/acerca", tipo: "Página", k: "acerca de condado digital quienes somos principios sobre mi esleyter conde creador" },
  { t: "Servicios", u: "/servicios", tipo: "Página", k: "servicios asesorias asesoria seo posicionamiento paid media social media mentorias mentoria diseno web campanas gestion medicion" },
  { t: "Asesoría de Paid Media", u: "/paid-media", tipo: "Servicio", k: "asesoria paid media gestion campanas google ads meta ads tiktok linkedin pinterest x ads costo por lead cpa" },
  { t: "Asesoría de Social Media", u: "/social-media", tipo: "Servicio", k: "asesoria social media redes sociales estrategia parrilla contenidos guiones reporteria instagram facebook tiktok linkedin" },
  { t: "Mentorías de Paid Media y analítica", u: "/mentorias", tipo: "Servicio", k: "mentorias mentoria sesiones en vivo aprender google ads meta ads tiktok ads ga4 gtm" },
  { t: "Posicionamiento SEO", u: "/seo", tipo: "Servicio", k: "seo posicionamiento web google buscadores ia aeo geo search console palabras clave seo local perfil de empresa" },
  { t: "Diseño web", u: "/diseno-web", tipo: "Servicio", k: "diseno web sitio web landing page pagina rapida gtm ga4 cookies seo ia" },
  { t: "Contacto", u: "/contacto", tipo: "Página", k: "contacto colaboraciones consultoria asesoria" }
];

  (function menu() {
    var b = $(".k-burger"), m = $("#k-menu-movil");
    if (b && m) {
      var poner = function (abierto) {
        m.hidden = !abierto;
        b.setAttribute("aria-expanded", abierto ? "true" : "false");
        b.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
      };
      b.addEventListener("click", function () { poner(m.hidden); });
      m.addEventListener("click", function (e) { if (e.target.closest("a")) poner(false); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !m.hidden) { poner(false); b.focus(); } });
      window.addEventListener("resize", function () { if (window.innerWidth > 860 && !m.hidden) poner(false); });
    }
    var actual = location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
    $$(".k-nav-l a").forEach(function (a) {
      var h = a.getAttribute("href");
      if (h === actual || (actual.indexOf("/glosario-") === 0 && h === "/glosario") || (document.body.classList.contains("es-articulo") && h === "/enciclopedia")) a.setAttribute("aria-current", "page");
    });
  })();

  (function buscador() {
    var q = $("#buscar-q"), out = $("#buscar-res");
    if (!q || !out) return;
    var norm = function (t) { return String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
    var pintar = function () {
      var v = norm(q.value.trim());
      out.innerHTML = "";
      if (v.length < 2) return;
      var hits = INDICE.filter(function (i) { return norm(i.t + " " + i.k).indexOf(v) !== -1; });
      if (!hits.length) { out.innerHTML = '<p class="bs-vacio">Sin resultados para «' + esc(q.value) + '». Prueba con otra palabra o revisa el listado completo.</p>'; return; }
      out.innerHTML = hits.map(function (i) { return '<a class="bs-hit" href="' + i.u + '"><span>' + esc(i.tipo) + "</span><b>" + esc(i.t) + "</b></a>"; }).join("");
    };
    q.addEventListener("input", pintar);
    var p = new URLSearchParams(location.search).get("q");
    if (p) { q.value = p; pintar(); }
  })();

  (function cookies() {
    var CLAVE = "cd_consentimiento", VERSION = 1, DURACION = 182 * 24 * 60 * 60 * 1000;
    var leer = function () {
      try { var c = JSON.parse(localStorage.getItem(CLAVE)); if (c && c.v === VERSION && c.exp > Date.now()) return c; } catch (e) {}
      return null;
    };
    var guardar = function (an, pu) {
      var c = { v: VERSION, analitica: !!an, publicidad: !!pu, fecha: Date.now(), exp: Date.now() + DURACION };
      try { localStorage.setItem(CLAVE, JSON.stringify(c)); } catch (e) {}
      var gtag = function () { window.dataLayer.push(arguments); };
      var ads = c.publicidad ? "granted" : "denied";
      gtag("consent", "update", { analytics_storage: c.analitica ? "granted" : "denied", ad_storage: ads, ad_user_data: ads, ad_personalization: ads });
      window.dataLayer.push({ event: "consent_update", analytics: c.analitica, ads: c.publicidad });
      return c;
    };
    var ICO = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B1512" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-5-5z"></path><circle cx="8.5" cy="12" r=".8" fill="#0B1512"></circle><circle cx="12" cy="16" r=".8" fill="#0B1512"></circle><circle cx="15.5" cy="13" r=".8" fill="#0B1512"></circle></svg>';
    var tabla = function (filas) {
      return '<table class="ck-tab"><thead><tr><th scope="col">Cookie</th><th scope="col">Proveedor</th><th scope="col">Para qué</th><th scope="col">Duración</th></tr></thead><tbody>' +
        filas.map(function (f) { return "<tr><td>" + f[0] + "</td><td>" + f[1] + "</td><td>" + f[2] + "</td><td>" + f[3] + "</td></tr>"; }).join("") + "</tbody></table>";
    };
    var CATS = [
      { k: "nec", n: "Necesarias", d: "Hacen que el sitio funcione: guardar tus preferencias de cookies y proteger el sitio. No se pueden desactivar.", f: [
        ["cd_consentimiento", "Condado Digital (almacenamiento local)", "Recordar tu elección de cookies", "6 meses"],
        ["cd_enciclopedia_leidos", "Condado Digital (almacenamiento local)", "Recordar qué artículos marcaste como leídos en la Enciclopedia", "Hasta que lo borres"],
        ["cd_conde_aviso", "Condado Digital (almacenamiento de sesión)", "No repetir el aviso de El Conde en la misma visita", "Hasta que cierres la pestaña"],
        ["cd_intro", "Condado Digital (almacenamiento de sesión)", "Mostrar la animación de entrada del inicio solo una vez por visita", "Hasta que cierres la pestaña"],
        ["__cf_bm", "Cloudflare", "Distinguir personas de bots y proteger el sitio (solo si se activan sus protecciones)", "30 minutos de inactividad"],
        ["—", "Google Tag Manager", "Cargar las demás herramientas solo según tu elección (no guarda cookies propias)", "—"]] },
      { k: "an", n: "Analítica", d: "Nos dicen cuántas personas visitan el sitio y qué páginas sirven más, de forma agregada. Usamos Google Analytics 4.", f: [
        ["_ga, _ga_&lt;id&gt;", "Google Analytics 4", "Contar visitas y saber qué contenidos se usan", "2 años"]] },
      { k: "ad", n: "Publicidad", d: "Permiten medir si nuestros anuncios funcionan y mostrar anuncios a quien ya visitó el sitio en Google, Meta, TikTok y LinkedIn. También miden los anuncios en ChatGPT.", f: [
        ["_gcl_au", "Google Ads", "Medir conversiones y remarketing", "90 días"],
        ["_fbp", "Meta", "Medir campañas y remarketing en Facebook e Instagram", "Hasta 90 días"],
        ["_ttp, ttclid", "TikTok", "Medir campañas y remarketing en TikTok", "13 meses desde el último uso"],
        ["li_fat_id", "LinkedIn", "Medir campañas y remarketing en LinkedIn", "30 días"],
        ["__oppref, __obref", "OpenAI (píxel de ChatGPT Ads)", "Medir visitas y leads de los anuncios en ChatGPT", "30 días (__oppref) y 365 días (__obref)"]] }
    ];
    var tarjeta = null, over = null, re = null, foco = null, est = { an: false, ad: false };
    var toast = function (t) {
      var v = $(".ck-toast"); if (v) v.remove();
      v = document.createElement("div"); v.className = "ck-toast"; v.setAttribute("role", "status"); v.textContent = t;
      document.body.appendChild(v); setTimeout(function () { if (v.parentNode) v.remove(); }, 3200);
    };
    var reabrir = function () {
      if (re) return;
      re = document.createElement("button"); re.type = "button"; re.className = "ck-re";
      re.innerHTML = ICO.replace('width="24" height="24"', 'width="18" height="18"') + " Preferencias de cookies";
      re.addEventListener("click", abrirPanel);
      document.body.appendChild(re);
      setTimeout(function () { if (re && document.activeElement !== re) { re.remove(); re = null; } }, 9000);
    };
    var cerrarTarjeta = function () { if (tarjeta) { tarjeta.remove(); tarjeta = null; document.dispatchEvent(new CustomEvent("cd:cookies")); } };
    var crearTarjeta = function () {
      tarjeta = document.createElement("section");
      tarjeta.className = "ck-card"; tarjeta.setAttribute("aria-label", "Aviso de cookies");
      tarjeta.innerHTML = '<div style="display:flex;gap:14px;align-items:flex-start"><span class="ck-ico">' + ICO + '</span><div><h2 style="margin:0;font-family:\'Fraunces\',serif;font-size:23px;line-height:1.2">Usamos cookies</h2>' +
        '<p style="margin:8px 0 0;font-size:15px;line-height:1.6;color:#55635B">Usamos las necesarias para que el sitio funcione y, si nos dejas, otras para medir visitas y saber si nuestros anuncios sirven. Tú eliges. <a href="/privacidad#cookies" style="color:#0B1512;font-weight:700">Política de privacidad</a></p></div></div>' +
        '<div class="ck-btns"><button type="button" class="ck-b ol" data-ck="rechazar">Rechazar</button><button type="button" class="ck-b dk" data-ck="aceptar">Aceptar todas</button><button type="button" class="ck-link" data-ck="configurar" aria-haspopup="dialog">Configurar cookies</button></div>';
      document.body.appendChild(tarjeta);
    };
    var pintarTg = function () {
      ["an", "ad"].forEach(function (k) {
        var b = over.querySelector('[data-tg="' + k + '"]'), on = est[k];
        b.className = "ck-tg" + (on ? " on" : ""); b.setAttribute("aria-checked", on ? "true" : "false");
        over.querySelector('[data-st="' + k + '"]').textContent = on ? "Activadas" : "Desactivadas";
      });
    };
    var cerrarPanel = function () {
      if (!over) return;
      over.remove(); over = null;
      document.removeEventListener("keydown", teclaPanel);
      if (foco && document.contains(foco)) foco.focus();
    };
    var teclaPanel = function (e) {
      if (e.key === "Escape") { cerrarPanel(); return; }
      if (e.key !== "Tab" || !over) return;
      var f = $$("button:not([disabled]), a[href], summary", over).filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    };
    var abrirPanel = function () {
      if (over) return;
      var c = leer(); est.an = c ? c.analitica : false; est.ad = c ? c.publicidad : false;
      foco = document.activeElement;
      over = document.createElement("div"); over.className = "ck-over";
      over.innerHTML = '<div class="ck-panel" role="dialog" aria-modal="true" aria-labelledby="ck-t">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:8px"><div><p class="pg-kick" style="margin-bottom:8px">Preferencias</p><h2 id="ck-t" style="margin:0;font-family:\'Fraunces\',serif;font-size:32px;line-height:1.1">Configura tus cookies</h2></div><button type="button" data-ck="cerrar" aria-label="Cerrar" style="flex:none;width:44px;height:44px;border-radius:50%;border:1.5px solid #0B1512;background:#FFFFFF;cursor:pointer;font-size:16px;color:#0B1512">✕</button></div>' +
        '<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#55635B">Activa solo lo que quieras. Puedes cambiarlo cuando quieras desde "Configurar cookies" en el pie de página.</p>' +
        CATS.map(function (c) {
          var ctrl = c.k === "nec"
            ? '<button type="button" class="ck-tg lock" role="switch" aria-checked="true" aria-label="Necesarias: siempre activas" disabled></button><span style="font-size:12px;font-weight:700;color:#55635B">Siempre activas</span>'
            : '<button type="button" class="ck-tg" role="switch" aria-checked="false" data-tg="' + c.k + '" aria-label="' + c.n + '"></button><span data-st="' + c.k + '" style="font-size:12px;font-weight:700;color:#55635B"></span>';
          return '<div class="ck-cat"><div class="ck-row"><div style="flex:1"><b style="display:block;font-family:\'Fraunces\',serif;font-size:21px">' + c.n + '</b><span style="font-size:14.5px;line-height:1.55;color:#55635B">' + c.d + '</span></div><div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">' + ctrl + '</div></div><details><summary>Ver cookies (' + c.f.length + ')</summary><div class="ck-tabw">' + tabla(c.f) + '</div></details></div>';
        }).join("") +
        '<div class="ck-btns ck-btns3" style="grid-template-columns:1fr 1fr 1fr;border-top:1.5px solid #E4E0D5;padding-top:20px"><button type="button" class="ck-b ol" data-ck="rechazar">Rechazar todo</button><button type="button" class="ck-b ol" data-ck="guardar">Guardar selección</button><button type="button" class="ck-b dk" data-ck="aceptar">Aceptar todas</button></div></div>';
      over.addEventListener("click", function (e) { if (e.target === over) cerrarPanel(); });
      document.body.appendChild(over);
      pintarTg();
      document.addEventListener("keydown", teclaPanel);
      over.querySelector('[data-ck="cerrar"]').focus();
    };
    var terminar = function (msg) { cerrarTarjeta(); cerrarPanel(); toast(msg); reabrir(); };
    document.addEventListener("click", function (e) {
      var a = e.target.closest(".abrir-cookies");
      if (a) { e.preventDefault(); abrirPanel(); return; }
      var t = e.target.closest("[data-tg]");
      if (t && over) { est[t.getAttribute("data-tg")] = !est[t.getAttribute("data-tg")]; pintarTg(); return; }
      var b = e.target.closest("[data-ck]");
      if (!b) return;
      var acc = b.getAttribute("data-ck");
      if (acc === "aceptar") { guardar(true, true); terminar("Listo: aceptaste todas las cookies."); }
      else if (acc === "rechazar") { guardar(false, false); terminar("Listo: solo usamos las cookies necesarias."); }
      else if (acc === "guardar") { var an = est.an, ad = est.ad; guardar(an, ad); terminar("Guardado: " + (an && ad ? "analítica y publicidad activas." : an ? "solo analítica activa." : ad ? "solo publicidad activa." : "solo las necesarias.")); }
      else if (acc === "configurar") abrirPanel();
      else if (acc === "cerrar") cerrarPanel();
    });
    window.cdCookiesPendiente = function () { return !!tarjeta; };
    if (!leer()) crearTarjeta();
  })();

  (function formulario() {
    var ENDPOINT = "https://formspree.io/f/mvkkjakn";
    var EJ = "Qué vendes, en qué plataformas inviertes y cuánto, más o menos, al mes";
    var SV = {
      "paid-media": ["Paid Media", "Qué vendes, en qué plataformas inviertes y cuánto, más o menos, al mes"],
      "social-media": ["Social Media", "Qué vendes, en qué redes estás hoy y qué quieres lograr con ellas"],
      "mentorias": ["Mentorías", "Qué quieres aprender y si es para ti o para tu equipo"],
      "diseno-web": ["Diseño web", "Qué necesitas (sitio nuevo, landing o rediseño) y si ya tienes dominio"],
      "seo": ["SEO", "Tu sitio web, qué vendes y en qué zona o país quieres que te encuentren"],
      "diagnostico": ["No lo sé, quiero un diagnóstico", "Qué vendes, qué has probado hasta ahora y qué te gustaría mejorar"]
    };
    window.cdServicios = SV;
    var campos = function (pre) {
      var lab = function (t, inp) { return '<label class="k-f">' + t + inp + "</label>"; };
      return '<input type="hidden" name="formulario" value="asesoria"><input type="hidden" name="origen" value="">' +
        '<label class="k-hp" aria-hidden="true">No completar<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>' +
        '<div class="k-two">' + lab("Nombre y apellido", '<input class="k-in" type="text" name="nombre" required autocomplete="name" placeholder="Ej: Camila Rojas">') +
        lab("Nombre de la empresa", '<input class="k-in" type="text" name="empresa" required autocomplete="organization">') + "</div>" +
        '<div class="k-two">' + lab("Correo electrónico", '<input class="k-in" type="email" name="email" required autocomplete="email" placeholder="tu@correo.com">') +
        lab("Teléfono o WhatsApp (opcional)", '<input class="k-in" type="tel" name="telefono" autocomplete="tel" placeholder="+56 9 1234 5678">') + "</div>" +
        '<label class="wa-sw"><input type="checkbox" name="autoriza_whatsapp" value="si"><span class="wa-tg" aria-hidden="true"></span><span><b style="display:block;font-size:14px">Autorizo que me contacten por WhatsApp</b><span style="font-size:13px;font-weight:400;color:#55635B">Si no lo marcas, te escribimos solo por correo.</span></span></label>' +
        lab("¿Qué servicio te interesa?", '<select class="k-in" name="servicio" required><option value="">Elige una opción</option>' +
          Object.keys(SV).map(function (k) { return '<option value="' + k + '">' + SV[k][0] + "</option>"; }).join("") + "</select>") +
        lab("Sitio web o redes (opcional)", '<input class="k-in" type="text" name="sitio" inputmode="url" autocomplete="url" placeholder="https://">') +
        lab("Cuéntanos tu caso", '<textarea class="k-in" name="mensaje" rows="4" required placeholder="' + EJ + '"></textarea>') +
        '<button type="submit" class="k-send">' + (pre || "Enviar") + ' <span aria-hidden="true">→</span></button>' +
        '<p class="k-err" role="alert" hidden></p>' +
        '<p class="k-legal">Al enviar, aceptas que usemos tus datos para responder tu consulta y hacer su seguimiento. El formulario lo procesa Formspree, fuera de Chile. Puedes acceder a tus datos, corregirlos o pedir que los eliminemos escribiendo a hola@condadodigital.cl. Más detalles en la <a href="/privacidad">política de privacidad</a>.</p>';
    };
    window.cdCamposFormulario = campos;
    var ponerServicio = function (form, id) {
      var sel = form.querySelector('[name="servicio"]');
      sel.value = SV[id] ? id : "";
      form.querySelector('[name="mensaje"]').placeholder = SV[id] ? SV[id][1] : EJ;
    };
    var preparar = function (form) {
      if (form.dataset.listo) return;
      form.dataset.listo = "1";
      var iniciado = false;
      var marcar = function (e) {
        if (iniciado || !e.target.matches("input, select, textarea")) return;
        iniciado = true;
        medir("formulario_iniciado", { formulario: "asesoria", motivo: form.servicio.value || "sin-elegir" });
      };
      form.addEventListener("focusin", marcar);
      form.addEventListener("input", marcar);
      form.servicio.addEventListener("change", function () { ponerServicio(form, form.servicio.value); });
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var err = form.querySelector(".k-err"), btn = form.querySelector('[type="submit"]');
        err.hidden = true;
        if (!form.checkValidity()) { form.reportValidity(); return; }
        form.origen.value = location.pathname;
        var motivo = form.servicio.value || "sin-elegir";
        var txt = btn.innerHTML;
        btn.disabled = true; btn.textContent = "Enviando…";
        fetch(ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
          .then(function (r) { if (!r.ok) throw new Error(); })
          .then(function () {
            var destino = "/gracias" + (form.servicio.value ? "?servicio=" + encodeURIComponent(form.servicio.value) : "");
            var ido = false, ir = function () { if (ido) return; ido = true; location.href = destino; };
            window.dataLayer.push({ event: "generate_lead", formulario: "asesoria", motivo: motivo, autoriza_whatsapp: form.autoriza_whatsapp.checked ? "si" : "no", eventCallback: ir, eventTimeout: 1500 });
            setTimeout(ir, 1700);
          })
          .catch(function () {
            err.textContent = "No se pudo enviar. Inténtalo de nuevo o escríbenos a hola@condadodigital.cl.";
            err.hidden = false; btn.disabled = false; btn.innerHTML = txt;
          });
      });
    };
    $$("form.k-form").forEach(function (f) {
      preparar(f);
      var p = new URLSearchParams(location.search).get("servicio");
      if (p && SV[p]) ponerServicio(f, p);
    });
    var dlg = null, foco = null;
    var crear = function () {
      dlg = document.createElement("dialog");
      dlg.className = "k-dlg"; dlg.setAttribute("aria-labelledby", "k-dlg-t");
      dlg.innerHTML = '<div class="k-dlg-in"><button type="button" class="k-dlg-x" aria-label="Cerrar formulario">×</button>' +
        '<p class="k-kick" style="margin:0 0 8px">Hablemos</p><h2 id="k-dlg-t">Cuéntanos tu proyecto</h2>' +
        '<p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#55635B">Te respondemos en menos de 24 horas.</p>' +
        '<form class="k-form" novalidate>' + campos("Enviar") + "</form></div>";
      document.body.appendChild(dlg);
      preparar(dlg.querySelector("form"));
      dlg.querySelector(".k-dlg-x").addEventListener("click", function () { dlg.close(); });
      dlg.addEventListener("click", function (e) {
        if (e.target !== dlg) return;
        var r = dlg.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dlg.close();
      });
      dlg.addEventListener("close", function () { document.documentElement.style.overflow = ""; if (foco && document.contains(foco)) foco.focus(); });
    };
    var abrir = function (servicio, desde) {
      if (typeof HTMLDialogElement !== "function") { location.href = "/contacto" + (servicio ? "?servicio=" + servicio : ""); return; }
      if (!dlg) crear();
      foco = desde || document.activeElement;
      ponerServicio(dlg.querySelector("form"), servicio || "");
      dlg.showModal();
      document.documentElement.style.overflow = "hidden";
      dlg.querySelector('[name="nombre"]').focus();
    };
    window.cdAbrirFormulario = abrir;
    document.addEventListener("click", function (e) {
      var a = e.target.closest(".abrir-contacto");
      if (!a) return;
      e.preventDefault();
      abrir(a.getAttribute("data-servicio") || "", a);
    });
  })();

  if (document.body.classList.contains("es-gracias")) {
    var sv = new URLSearchParams(location.search).get("servicio");
    medir("gracias_vista", { servicio: sv && window.cdServicios && window.cdServicios[sv] ? sv : "sin-elegir" });
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-servicio-click]");
    if (t) medir("servicio_click", { servicio: t.getAttribute("data-servicio-click"), ubicacion: t.getAttribute("data-ubicacion") || location.pathname });
  });

  (function compartir() {
    var avisar = function (b, txt) {
      var o = b.getAttribute("data-txt") || b.textContent;
      b.setAttribute("data-txt", o); b.textContent = txt;
      setTimeout(function () { b.textContent = o; }, 2200);
    };
    var copiar = function (b) {
      var url = location.href.split("#")[0];
      var ok = function () { avisar(b, "¡Enlace copiado!"); medir("compartir", { metodo: "copiar_enlace", pagina: location.pathname }); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(ok, function () { window.prompt("Copia este enlace:", url); });
      else { var i = document.createElement("textarea"); i.value = url; document.body.appendChild(i); i.select(); try { document.execCommand("copy"); ok(); } catch (er) {} i.remove(); }
    };
    document.addEventListener("click", function (e) {
      var s = e.target.closest("[data-compartir]");
      if (s) {
        if (navigator.share) navigator.share({ title: document.title, url: location.href.split("#")[0] }).then(function () { medir("compartir", { metodo: "web_share", pagina: location.pathname }); }, function () {});
        else copiar(s);
        return;
      }
      var c = e.target.closest("[data-copiar]");
      if (c) copiar(c);
    });
  })();

  (function util() {
    var box = $(".ar-fb");
    if (!box) return;
    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-util]");
      if (!b || box.dataset.hecho) return;
      box.dataset.hecho = "1";
      var si = b.getAttribute("data-util") === "si";
      $$("[data-util]", box).forEach(function (x) { x.disabled = true; x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      $(".ar-fb-t", box).textContent = si ? "¡Gracias! Nos alegra que te sirviera." : "Gracias. Escríbenos qué te faltó a hola@condadodigital.cl.";
      medir("articulo_util", { util: si ? "si" : "no", articulo: location.pathname });
    });
  })();

  (function tactil() {
    var sel = "[data-toca]";
    document.addEventListener("click", function (e) {
      var t = e.target.closest(sel);
      if (!t || e.target.closest("a, button:not([data-toca])")) return;
      var on = !t.classList.contains("on");
      $$(sel + ".on").forEach(function (x) { if (x !== t && x.getAttribute("data-toca") === t.getAttribute("data-toca")) { x.classList.remove("on"); x.setAttribute("aria-expanded", "false"); } });
      t.classList.toggle("on", on);
      t.setAttribute("aria-expanded", on ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var t = e.target.closest && e.target.closest(sel);
      if (!t || t !== e.target) return;
      e.preventDefault(); t.click();
    });
  })();

  (function conde() {
    if (document.body.classList.contains("sin-conde")) return;
    var URL_CONDE = "/conde.js?v=20261124c", CLAVE = "cd_conde_aviso";
    var visto = function () { try { return sessionStorage.getItem(CLAVE); } catch (e) { return "1"; } };
    var btn, hint, ping, mod = null, cargando = null;
    var quitarAviso = function () { if (hint) { hint.remove(); hint = null; } if (ping) { ping.remove(); ping = null; } try { sessionStorage.setItem(CLAVE, "1"); } catch (e) {} };
    var cargar = function () {
      if (!cargando) cargando = import(URL_CONDE).then(function (m) {
        mod = m.iniciar({ boton: btn, medir: medir, abrirFormulario: function (s) { window.cdAbrirFormulario(s || ""); } });
        return mod;
      }).catch(function () { cargando = null; location.href = "/glosario"; });
      return cargando;
    };
    var crear = function () {
      btn = document.createElement("button");
      btn.type = "button"; btn.className = "ec-btn";
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Abrir El Conde, asistente de Condado Digital");
      btn.innerHTML = '<img src="/img/conde/conde-frente-cabeza.webp" alt="" width="135" height="143" decoding="async">';
      if (!visto()) {
        hint = document.createElement("span"); hint.className = "ec-hint"; hint.setAttribute("aria-hidden", "true"); hint.textContent = "¿Te ayudo?";
        ping = document.createElement("span"); ping.className = "ec-ping"; ping.setAttribute("aria-hidden", "true");
        document.body.appendChild(hint); document.body.appendChild(ping);
        setTimeout(function () { if (hint) { hint.remove(); hint = null; } }, 9000);
      }
      document.body.appendChild(btn);
      btn.addEventListener("click", function () { quitarAviso(); cargar().then(function (m) { if (m) m.alternar(); }); });
      ["pointerenter", "focus", "touchstart"].forEach(function (t) { btn.addEventListener(t, function () { var l = document.createElement("link"); l.rel = "modulepreload"; l.href = URL_CONDE; document.head.appendChild(l); }, { once: true, passive: true }); });
      var mover = function () { document.body.classList.toggle("ck-pendiente", !!(window.cdCookiesPendiente && window.cdCookiesPendiente())); };
      mover(); document.addEventListener("cd:cookies", mover);
    };
    var despues = function () { setTimeout(function () { (window.requestIdleCallback || setTimeout)(crear, { timeout: 2500 }); }, 600); };
    if (document.readyState === "complete") despues(); else window.addEventListener("load", despues, { once: true });
  })();
})();
