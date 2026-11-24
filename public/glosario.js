(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = window.cdEsc, medir = window.cdMedir, quieto = window.cdQuieto;
  var norm = function (t) { return String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
  var TEMAS = { metricas: "Métricas", medicion: "Medición", estrategia: "Estrategia", ia: "IA", plataformas: "Plataformas", formatos: "Formatos", audiencias: "Audiencias", pujas: "Pujas" };
  var root = $("#terminos");
  if (!root) return;
  document.documentElement.classList.add("gl-js");
  var bloques = $$(".gl-letra", root), tabs = $$(".gt-tab[data-letra]"), chips = $$(".gl-chips .pg-chip"), q = $("#gl-q"), cuenta = $("#gl-cuenta"), vacio = $("#gl-vacio");
  var terms = $$("li.gt", root).map(function (li) {
    return { li: li, id: li.id, tema: li.getAttribute("data-tema"), letra: li.closest(".gl-letra").getAttribute("data-letra"),
      code: $(".gt-code", li).textContent, def: $(".gt-def", li).textContent, txt: norm(li.textContent) };
  });
  var letra = bloques[0] ? bloques[0].getAttribute("data-letra") : "A", tema = "todas";
  var pintar = function () {
    var v = norm(q ? q.value.trim() : ""), total = 0, porLetra = {};
    terms.forEach(function (t) {
      var ok = (tema === "todas" || t.tema === tema) && (v ? t.txt.indexOf(v) !== -1 : t.letra === letra);
      t.li.hidden = !ok;
      if (ok) { total++; porLetra[t.letra] = (porLetra[t.letra] || 0) + 1; }
    });
    bloques.forEach(function (b) {
      var L = b.getAttribute("data-letra"), n = porLetra[L] || 0;
      b.hidden = !n;
      var c = $(".gl-cnt", b), tot = +c.getAttribute("data-total");
      c.textContent = (n === tot ? tot + " términos" : n + " de " + tot + " términos") + " con " + L + (tema !== "todas" ? " · " + TEMAS[tema] : "");
    });
    tabs.forEach(function (a) { var on = !v && a.getAttribute("data-letra") === letra; a.classList.toggle("on", on); if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
    cuenta.textContent = v ? total + (total === 1 ? " término encontrado" : " términos encontrados") : "";
    cuenta.hidden = !v;
    vacio.hidden = total > 0;
  };
  tabs.forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      letra = a.getAttribute("data-letra");
      if (q) q.value = "";
      pintar();
      var b = $("#letra-" + letra.toLowerCase());
      if (b && b.getBoundingClientRect().top < 0) b.scrollIntoView({ behavior: quieto ? "auto" : "smooth", block: "start" });
      try { history.replaceState(null, "", "#letra-" + letra.toLowerCase()); } catch (er) {}
    });
  });
  chips.forEach(function (b) {
    b.addEventListener("click", function () {
      tema = b.getAttribute("data-tema");
      chips.forEach(function (x) { var on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
      if (tema !== "todas" && !q.value) {
        var hay = terms.some(function (t) { return t.letra === letra && t.tema === tema; });
        if (!hay) { var p = terms.filter(function (t) { return t.tema === tema; })[0]; if (p) letra = p.letra; }
      }
      pintar();
    });
  });
  if (q) q.addEventListener("input", pintar);
  var irA = function () {
    var h = decodeURIComponent(location.hash.slice(1));
    if (!h) return;
    var m = /^letra-([a-z])$/.exec(h);
    if (m) { letra = m[1].toUpperCase(); pintar(); return; }
    var t = terms.filter(function (x) { return x.id === h; })[0];
    if (!t) return;
    letra = t.letra; tema = "todas";
    chips.forEach(function (x) { var on = x.getAttribute("data-tema") === "todas"; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
    pintar();
    t.li.classList.add("gl-marca");
    setTimeout(function () { t.li.scrollIntoView({ block: "center" }); }, 40);
    setTimeout(function () { t.li.classList.remove("gl-marca"); }, 3200);
  };
  pintar(); irA();
  window.addEventListener("hashchange", irA);

  root.addEventListener("click", function (e) {
    var c = e.target.closest(".pg-term:not(.fijo)");
    if (!c || e.target.closest("a")) return;
    var on = !c.classList.contains("on");
    $$(".pg-term.on", root).forEach(function (x) { x.classList.remove("on"); x.setAttribute("aria-expanded", "false"); });
    c.classList.toggle("on", on); c.setAttribute("aria-expanded", on ? "true" : "false");
  });
  root.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("pg-term")) { e.preventDefault(); e.target.click(); }
  });

  (function quiz() {
    var btn = $("#gl-quiz"); if (!btn) return;
    var ov = null, preguntas = [], paso = 0, bien = 0, foco = null;
    var mezclar = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; };
    var base = terms.filter(function (t) { return t.def.length > 30 && t.def.length < 190; });
    var armar = function () {
      return mezclar(base).slice(0, 5).map(function (t) {
        var mismos = base.filter(function (x) { return x !== t && x.tema === t.tema && x.code !== t.code; });
        var otros = mezclar(mismos.length >= 3 ? mismos : base.filter(function (x) { return x !== t; })).slice(0, 3);
        return { t: t, ops: mezclar([t].concat(otros)) };
      });
    };
    var nivel = function (n) {
      if (n === 5) return "¡Hablas marketing digital con fluidez! Ahora pon esos términos a trabajar en tus campañas.";
      if (n >= 3) return "Buen nivel. Repasa los que fallaste y verás todo más claro en tus reportes.";
      if (n >= 1) return "Vas partiendo. El glosario está para eso: lee los términos de tu día a día y vuelve a intentarlo.";
      return "Todo se aprende. Parte por las métricas básicas (CPC, CTR, CPA) y vuelve a intentarlo.";
    };
    var cerrar = function () { if (!ov) return; ov.remove(); ov = null; document.documentElement.style.overflow = ""; document.removeEventListener("keydown", tecla); if (foco) foco.focus(); };
    var tecla = function (e) {
      if (e.key === "Escape") { cerrar(); return; }
      if (e.key !== "Tab" || !ov) return;
      var f = $$("button:not([disabled]), a[href]", ov); if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    };
    var pintarQ = function () {
      var c = $(".dq-cuerpo", ov), h;
      if (paso < 5) {
        var p = preguntas[paso];
        h = '<div class="dq-q"><p class="dq-k">Pregunta ' + (paso + 1) + ' de 5</p><div class="dq-bar"><i style="width:' + paso * 20 + '%"></i></div><h3 id="gq-t" tabindex="-1">¿Qué término es este?</h3><p class="gq-def">' + esc(p.t.def) + '</p><div class="dq-ops">' +
          p.ops.map(function (o, i) { return '<button type="button" class="dq-o" data-o="' + i + '"><b>' + String.fromCharCode(65 + i) + "</b><span>" + esc(o.code) + "</span><i aria-hidden=\"true\">→</i></button>"; }).join("") +
          '</div><p class="gq-msg" role="status"></p><div class="dq-foot"><span>Aciertos: ' + bien + '</span><button type="button" class="dq-lnk gq-sig" hidden>' + (paso === 4 ? "Ver mi resultado →" : "Siguiente →") + "</button></div></div>";
      } else {
        h = '<div class="dq-res"><p class="dq-k">Tu resultado</p><div class="dq-bar"><i style="width:100%"></i></div><h3 id="gq-t" tabindex="-1">Conoces ' + bien + " de 5 términos</h3><p>" + esc(nivel(bien)) + "</p>" +
          '<div class="dq-foot"><button type="button" class="dq-lnk" data-gq="otra">↻ Hacer otro quiz</button><button type="button" class="dq-lnk" data-gq="cerrar">Volver al glosario</button></div></div>';
        medir("glosario_quiz", { resultado: "completo", puntaje: bien });
      }
      c.innerHTML = h;
      $("#gq-t", ov).focus();
    };
    btn.addEventListener("click", function () {
      foco = btn; preguntas = armar(); paso = 0; bien = 0;
      ov = document.createElement("div"); ov.className = "dq-ov";
      ov.innerHTML = '<div class="dq" role="dialog" aria-modal="true" aria-label="Quiz del glosario"><button type="button" class="dq-x" aria-label="Cerrar" data-gq="cerrar">✕</button><div class="dq-cuerpo"></div></div>';
      document.body.appendChild(ov);
      document.documentElement.style.overflow = "hidden";
      document.addEventListener("keydown", tecla);
      ov.addEventListener("click", function (e) {
        if (e.target === ov) { cerrar(); return; }
        var o = e.target.closest("[data-o]");
        if (o && !o.disabled) {
          var p = preguntas[paso], elegido = p.ops[+o.getAttribute("data-o")], ok = elegido === p.t;
          if (ok) bien++;
          $$("[data-o]", ov).forEach(function (b) { b.disabled = true; var x = p.ops[+b.getAttribute("data-o")]; if (x === p.t) b.classList.add("ok"); else if (b === o) b.classList.add("no"); });
          $(".gq-msg", ov).innerHTML = ok ? "¡Correcto!" : "Era <b>" + esc(p.t.code) + "</b>.";
          $(".dq-foot span", ov).textContent = "Aciertos: " + bien;
          var s = $(".gq-sig", ov); s.hidden = false; s.focus();
          medir("glosario_quiz", { resultado: ok ? "correcto" : "incorrecto", termino: p.t.id });
          return;
        }
        if (e.target.closest(".gq-sig")) { paso++; pintarQ(); return; }
        var d = e.target.closest("[data-gq]"); if (!d) return;
        if (d.getAttribute("data-gq") === "cerrar") cerrar();
        else { preguntas = armar(); paso = 0; bien = 0; pintarQ(); }
      });
      pintarQ();
    });
  })();
})();
