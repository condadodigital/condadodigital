(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = window.cdEsc;
  var norm = function (t) { return String(t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); };
  var DQ=[["¿En qué etapa está tu negocio?", [["Recién partiendo, todavía sin web", {"1": "Para entender el mapa completo antes de gastar un peso.", "9": "Porque vas a necesitar una base propia donde llegue la gente.", "12": "Es lo más rápido para aparecer en Google sin web."}], ["Ya vendo, pero sin marketing ordenado", {"1": "Para ordenar qué canales usar y en qué orden.", "3": "Para ver en qué etapa se te están perdiendo clientes."}], ["Ya invierto en publicidad", {"14": "Para decidir dónde rinde más cada peso que inviertes.", "5": "Para saber si lo que pagas realmente vende."}]]], ["¿Dónde vendes principalmente?", [["Tienda online", {"10": "Plataformas, costos reales y cómo medir tu tienda.", "16": "Para preparar CyberDay y Black Friday a tiempo."}], ["Local físico o servicio en mi zona", {"12": "Tu ficha de Google es tu vitrina local.", "13": "Para atender y cerrar ventas por chat."}], ["Por WhatsApp y redes sociales", {"13": "Para conectar tus anuncios con WhatsApp y medir si vende.", "4": "Para saber cuándo conviene pagar y cuándo basta lo orgánico."}], ["A otras empresas (B2B)", {"3": "El ciclo de venta B2B es largo: el embudo te ordena.", "14": "Para elegir entre intención de búsqueda y descubrimiento."}]]], ["¿Qué te preocupa más hoy?", [["No me llegan clientes", {"4": "Para elegir entre pagar o construir alcance propio.", "14": "Para partir por la plataforma que calza con tu cliente."}], ["Gasto y no sé si funciona", {"5": "Para medir ventas y no solo clics.", "3": "Para encontrar en qué etapa se cae la venta."}], ["No tengo web o la que tengo no sirve", {"9": "Qué tipo de sitio necesitas y cuánto cuesta.", "11": "Para ver si puedes hacerla tú con IA y dónde están los límites."}], ["Mi competencia me está ganando", {"15": "Para ver qué anuncios está corriendo tu competencia.", "14": "Para encontrar dónde competir con mejor costo."}]]], ["¿Cómo mides tus resultados hoy?", [["No mido nada", {"5": "Es el primer paso: sin medición, todo es intuición."}], ["Miro likes y seguidores", {"5": "Para pasar de métricas de vanidad a ventas.", "2": "Para entender qué se puede medir en digital."}], ["Lo anoto a mano, en una libreta o Excel", {"5": "Para pasar del registro a mano a una medición que se haga sola.", "3": "Para ordenar esos datos según la etapa de compra."}], ["Tengo GA4 o píxel instalado", {"6": "Ya tienes datos: la IA puede sacarles más provecho.", "8": "Para probar un canal nuevo con tu medición lista."}]]], ["¿Y la inteligencia artificial?", [["No la uso, pero me da curiosidad", {"6": "Qué tareas acelera de verdad la IA y qué promesas son humo."}], ["La uso, pero poco", {"6": "Para pasar de preguntas sueltas a usarla en tu marketing.", "8": "Para conocer el canal nuevo que está abriendo ChatGPT."}], ["La uso seguido para analizar", {"5": "La IA analiza bien solo si tus datos están bien medidos.", "6": "Para sumar Performance Max, Advantage+ y otras herramientas con IA."}], ["La uso para diseñar mis redes", {"6": "Dónde la IA ahorra tiempo en contenido y dónde se nota.", "15": "Para inspirarte en anuncios reales sin copiar.", "4": "Para decidir qué publicaciones vale la pena pautar."}]]]];
  var DQART=[{"t": "Marketing digital", "href": "/que-es-el-marketing-digital", "cat": "Fundamentos"}, {"t": "Marketing tradicional vs. marketing digital", "href": "/marketing-tradicional-vs-digital", "cat": "Fundamentos"}, {"t": "Embudo de marketing", "href": "/embudo-de-marketing", "cat": "Estrategia"}, {"t": "Publicidad pagada vs. orgánica", "href": "/publicidad-pagada-vs-organica", "cat": "Publicidad"}, {"t": "Analítica digital", "href": "/analitica-digital", "cat": "Medición"}, {"t": "Marketing con inteligencia artificial", "href": "/marketing-con-ia", "cat": "IA y buscadores"}, {"t": "Core update de Google de noviembre 2026", "href": "/core-update-google-noviembre-2026", "cat": "IA y buscadores"}, {"t": "ChatGPT Ads en Chile", "href": "/chatgpt-ads-chile", "cat": "IA y buscadores"}, {"t": "Sitio web", "href": "/sitio-web", "cat": "Fundamentos"}, {"t": "Tienda online en Chile", "href": "/tienda-online", "cat": "Estrategia"}, {"t": "Crear un sitio web con inteligencia artificial", "href": "/crear-sitio-web-con-ia", "cat": "IA y buscadores"}, {"t": "Perfil de Empresa de Google", "href": "/perfil-de-empresa-google", "cat": "IA y buscadores"}, {"t": "WhatsApp Business", "href": "/whatsapp-business", "cat": "Estrategia"}, {"t": "Meta Ads vs Google Ads", "href": "/meta-ads-vs-google-ads", "cat": "Publicidad"}, {"t": "Cómo investigar los anuncios de tu competencia", "href": "/biblioteca-de-anuncios", "cat": "Publicidad"}, {"t": "Fechas comerciales en Chile", "href": "/fechas-comerciales-chile", "cat": "Estrategia"}];
  (function lista() {
    var grid = $("#en-grid"); if (!grid) return;
    var cards = $$(".ef", grid), chips = $$(".pg-chip[data-cat]"), q = $("#en-q"), vacio = $("#en-vacio"), cat = "todas";
    var filtrar = function () {
      var v = norm(q ? q.value.trim() : ""), n = 0;
      cards.forEach(function (c) {
        var ok = (cat === "todas" || c.getAttribute("data-cat") === cat) && (!v || norm(c.textContent).indexOf(v) !== -1);
        c.hidden = !ok; if (ok) n++;
      });
      vacio.hidden = n > 0;
    };
    chips.forEach(function (b) {
      b.addEventListener("click", function () {
        cat = b.getAttribute("data-cat");
        chips.forEach(function (x) { var on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
        filtrar();
      });
    });
    if (q) q.addEventListener("input", filtrar);
    var tactil = window.matchMedia("(hover: none)");
    grid.addEventListener("click", function (e) {
      var c = e.target.closest(".ef"); if (!c || !tactil.matches) return;
      if (!c.classList.contains("on")) { e.preventDefault(); cards.forEach(function (x) { x.classList.toggle("on", x === c); }); }
    });
  })();
  (function diagnostico() {
    var abrir = $("#dq-abrir"); if (!abrir) return;
    var ov = null, paso = 0, resp = [], foco = null;
    var cerrar = function () { if (!ov) return; ov.remove(); ov = null; document.documentElement.style.overflow = ""; document.removeEventListener("keydown", tecla); if (foco) foco.focus(); };
    var tecla = function (e) {
      if (e.key === "Escape") { cerrar(); return; }
      if (e.key !== "Tab" || !ov) return;
      var f = $$("button, a[href]", ov); if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    };
    var resultado = function () {
      var sc = {}, why = {}, ord = [];
      resp.forEach(function (ai, qi) { var m = DQ[qi][1][ai][1], w = 2; Object.keys(m).forEach(function (k) { sc[k] = (sc[k] || 0) + w; w = 1; if (!why[k]) { why[k] = m[k]; ord.push(k); } }); });
      return ord.slice().sort(function (a, b) { return (sc[b] - sc[a]) || (ord.indexOf(a) - ord.indexOf(b)); }).slice(0, 3).map(function (k) { var a = DQART[k - 1]; return { k: +k, t: a.t, href: a.href, cat: a.cat, why: why[k] }; });
    };
    var pintar = function () {
      var box = $(".dq", ov), h;
      if (paso < 5) {
        var q = DQ[paso];
        h = '<div class="dq-q"><p class="dq-k">Pregunta ' + (paso + 1) + ' de 5</p><div class="dq-bar"><i style="width:' + paso * 20 + '%"></i></div><h3 id="dq-t" tabindex="-1">' + esc(q[0]) + '</h3><div class="dq-ops">' +
          q[1].map(function (o, i) { return '<button type="button" class="dq-o" data-o="' + i + '" style="animation-delay:' + (0.06 * i + 0.1) + 's"><b>' + String.fromCharCode(65 + i) + "</b><span>" + esc(o[0]) + "</span><i aria-hidden=\"true\">→</i></button>"; }).join("") +
          '</div><div class="dq-foot">' + (paso > 0 ? '<button type="button" class="dq-lnk" data-dq="volver">← Volver</button>' : "") + '<span style="margin-left:auto">Toma menos de 1 minuto</span></div></div>';
      } else {
        var r = resultado();
        h = '<div class="dq-res"><p class="dq-k">Tu ruta de lectura</p><div class="dq-bar"><i style="width:100%"></i></div><h3 id="dq-t" tabindex="-1">Esto te conviene leer primero</h3><p>Según tus respuestas, este es el orden que te recomendamos.</p>' +
          r.map(function (a, i) { return '<a href="' + a.href + '" class="dq-r' + (i === 0 ? " first" : "") + '" style="animation-delay:' + (0.15 * i + 0.2) + 's"><span class="n">' + (a.k < 10 ? "0" : "") + a.k + "</span><span><small>" + (i === 0 ? "Empieza por aquí" : "Después") + " · " + esc(a.cat) + "</small><strong>" + esc(a.t) + "</strong><em>" + esc(a.why) + '</em></span><span class="go" aria-hidden="true">→</span></a>'; }).join("") +
          '<div class="dq-foot"><button type="button" class="dq-lnk" data-dq="otra">↻ Repetir el diagnóstico</button><button type="button" class="dq-lnk" data-dq="cerrar">Ver todas las guías</button></div></div>';
        window.cdMedir("diagnostico_completado", { recomendado: r[0] ? r[0].href.slice(1) : "ninguno", guias: r.map(function (a) { return a.href.slice(1); }).join(","), respuestas: resp.map(function (x) { return String.fromCharCode(65 + x); }).join("") });
      }
      box.querySelector(".dq-cuerpo").innerHTML = h;
      var t = $("#dq-t", ov); if (t) t.focus();
    };
    abrir.addEventListener("click", function () {
      paso = 0; resp = []; foco = abrir;
      ov = document.createElement("div"); ov.className = "dq-ov";
      ov.innerHTML = '<div class="dq" role="dialog" aria-modal="true" aria-label="Autodiagnóstico"><button type="button" class="dq-x" aria-label="Cerrar" data-dq="cerrar">✕</button><div class="dq-cuerpo"></div></div>';
      document.body.appendChild(ov);
      document.documentElement.style.overflow = "hidden";
      document.addEventListener("keydown", tecla);
      ov.addEventListener("click", function (e) {
        if (e.target === ov) { cerrar(); return; }
        var o = e.target.closest("[data-o]");
        if (o) { resp = resp.slice(0, paso); resp.push(+o.getAttribute("data-o")); paso++; pintar(); return; }
        var d = e.target.closest("[data-dq]"); if (!d) return;
        var a = d.getAttribute("data-dq");
        if (a === "cerrar") cerrar();
        else if (a === "volver") { paso--; resp = resp.slice(0, paso); pintar(); }
        else if (a === "otra") { paso = 0; resp = []; pintar(); }
      });
      pintar();
    });
  })();
})();
