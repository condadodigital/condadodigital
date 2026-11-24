(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var quieto = window.cdQuieto;

  (function intro() {
    var el = $(".ia-wrap");
    if (!el) return;
    if (!document.documentElement.classList.contains("con-intro")) { el.remove(); return; }
    setTimeout(function () { el.remove(); document.documentElement.classList.remove("con-intro"); }, 2600);
  })();

  (function pasos() {
    var cards = $$(".pb-card[data-paso]");
    if (!cards.length) return;
    var barra = $(".pb-line i"), pa = 0, auto = !quieto, timer = null;
    var poner = function (n) {
      pa = n;
      cards.forEach(function (c, i) { c.classList.toggle("is-on", i === n); c.setAttribute("aria-pressed", i === n ? "true" : "false"); });
      if (barra) barra.style.transform = "scaleX(" + (n + 1) / 4 + ")";
    };
    cards.forEach(function (c, i) {
      c.addEventListener("click", function () { auto = false; poner(i); });
      c.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); auto = false; poner(i); } });
      c.addEventListener("mouseenter", function () { if (window.matchMedia("(hover:hover)").matches) { auto = false; poner(i); } });
    });
    var visible = true;
    if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe($("#proceso"));
    timer = setInterval(function () { if (auto && visible && !document.hidden) poner((pa + 1) % 4); }, 3500);
  })();

  (function necesitas() {
    var wrap = $(".nx-wrap");
    if (!wrap) return;
    var chips = $$("[data-nx]", wrap), body = $(".na-body", wrap), sel = -1;
    var cerrar = function () {
      sel = -1; wrap.classList.remove("is-open"); body.innerHTML = "";
      chips.forEach(function (c) { c.classList.remove("is-on"); c.setAttribute("aria-pressed", "false"); });
    };
    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        var n = +c.getAttribute("data-nx");
        if (sel === n) { cerrar(); return; }
        sel = n;
        chips.forEach(function (x) { var on = x === c; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
        wrap.classList.add("is-open");
        var tpl = document.getElementById("nx-r" + n);
        body.innerHTML = "";
        if (tpl) body.appendChild(tpl.content.cloneNode(true));
        if (window.innerWidth <= 760) { var ph = $(".nx-ph", wrap); setTimeout(function () { ph.scrollIntoView({ behavior: quieto ? "auto" : "smooth", block: "center" }); }, 350); }
      });
    });
    var x = $("[data-nx-cerrar]", wrap);
    if (x) x.addEventListener("click", cerrar);
  })();

  (function video() {
    var b = $("[data-video]");
    if (!b) return;
    b.addEventListener("click", function () {
      var v = document.createElement("video");
      v.src = b.getAttribute("data-video");
      v.poster = b.querySelector("img") ? b.querySelector("img").getAttribute("src") : "";
      v.controls = true; v.autoplay = true; v.playsInline = true; v.setAttribute("playsinline", "");
      v.preload = "auto";
      v.setAttribute("aria-label", "Video de Condado Digital: dudas reales de pymes");
      v.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#000";
      b.replaceWith(v);
      var p = v.play(); if (p && p.catch) p.catch(function () {});
      v.focus();
    });
  })();

  (function calculadora() {
    var cin = $("#cl-in"), cout = $("#cl-out");
    if (!cin || !cout) return;
    var esc = window.cdEsc;
    var money = function (n) { if (!isFinite(n)) return "—"; var r = Math.round(n); return (r < 0 ? "-$" : "$") + Math.abs(r).toLocaleString("es-CL"); };
    var dec = function (n) { return String(Math.round(n * 10) / 10).replace(".", ","); };
    var M = {
      tienda: { d: { inv: 600000, visitas: 8000, conv: 1.5, ticket: 35000, margen: 35 },
        f: [["inv", "Inversión mensual en anuncios", 50000, 5000000, 50000, "m"], ["visitas", "Visitas a tu tienda desde anuncios", 500, 50000, 500, "n"], ["conv", "De cada 100 visitas, cuántas compran", 0.2, 10, 0.1, "p"], ["ticket", "Ticket promedio por compra", 5000, 500000, 5000, "m"], ["margen", "Tu margen de ganancia", 5, 80, 1, "%"]] },
      servicios: { d: { inv: 500000, leads: 50, cierre: 10, ticket: 300000, margen: 40 },
        f: [["inv", "Inversión mensual en anuncios", 50000, 5000000, 50000, "m"], ["leads", "Leads (contactos) que consigues", 5, 500, 5, "n"], ["cierre", "De cada 100 leads, cuántos compran", 1, 50, 1, "p"], ["ticket", "Ticket promedio por venta", 5000, 2000000, 5000, "m"], ["margen", "Tu margen de ganancia", 5, 80, 1, "%"]] },
      suscripcion: { d: { inv: 800000, clientes: 40, pago: 25000, meses: 12, margen: 70 },
        f: [["inv", "Inversión mensual en anuncios", 50000, 5000000, 50000, "m"], ["clientes", "Suscriptores nuevos al mes", 1, 500, 1, "n"], ["pago", "Pago mensual de cada suscriptor", 3000, 200000, 1000, "m"], ["meses", "Meses que se queda en promedio", 1, 36, 1, "mes"], ["margen", "Tu margen de ganancia", 5, 90, 1, "%"]] },
      b2b: { d: { inv: 1500000, leads: 40, reu: 30, cierre: 25, ticket: 6000000, margen: 30 },
        f: [["inv", "Inversión mensual en anuncios", 100000, 10000000, 100000, "m"], ["leads", "Leads (empresas) que consigues", 5, 300, 5, "n"], ["reu", "De cada 100 leads, cuántos llegan a reunión", 5, 80, 1, "p"], ["cierre", "De cada 100 reuniones, cuántas cierran", 5, 60, 1, "p"], ["ticket", "Valor del contrato anual", 300000, 30000000, 100000, "m"], ["margen", "Tu margen de ganancia", 5, 80, 1, "%"]] }
    };
    var mk = "servicios", cv = Object.assign({}, M.servicios.d), usada = false;
    var fmt = function (t, v) { return t === "m" ? money(v) : t === "%" ? v + "%" : t === "p" ? dec(v) + " de 100" : t === "mes" ? v + (v === 1 ? " mes" : " meses") : String(v); };
    var ratio = function (a, b) { return b > 0 ? dec(a / b) + "x" : "—"; };
    var calc = function () {
      var R;
      if (mk === "tienda") {
        var vt = cv.visitas * cv.conv / 100, ing = vt * cv.ticket, gv = cv.ticket * cv.margen / 100, cpaT = vt > 0 ? cv.inv / vt : 0;
        R = { res: vt * gv - cv.inv, m1l: "Costo por visita", m1: money(cv.inv / Math.max(1, cv.visitas)), m2l: "Costo por compra", m2: vt > 0 ? money(cpaT) : "—", m3l: "ROAS", m3: ratio(ing, cv.inv),
          barTitle: "Lo que cuesta cada compra vs. lo que te deja", barAl: "Costo por compra", a: cpaT, barBl: "Ganancia por compra (antes de anuncios)", b: gv,
          eqLabel: "ROAS mínimo para no perder:", eq: cv.margen > 0 ? "con tu margen de " + cv.margen + "% necesitas un ROAS de al menos " + dec(100 / cv.margen) + "x." : "con margen 0 no hay equilibrio.",
          okTxt: "Resultado mensual después de pagar los anuncios.", badTxt: "Cada compra cuesta más de lo que te deja. Sube tu conversión o tu ticket antes de invertir más.",
          vtxt: "Con estos números vendes " + dec(vt) + " pedidos al mes e ingresas " + money(ing) + ".",
          formula: "Costo por compra = inversión ÷ compras · ROAS = ingresos ÷ inversión · ROAS mínimo = 1 ÷ margen." };
      } else if (mk === "suscripcion") {
        var cac = cv.inv / Math.max(1, cv.clientes), gm = cv.pago * cv.margen / 100, ltv = gm * cv.meses, mes1 = cv.clientes * gm - cv.inv;
        R = { res: cv.clientes * ltv - cv.inv, m1l: "Costo por cliente (CAC)", m1: money(cac), m2l: "LTV (ganancia por cliente)", m2: money(ltv), m3l: "LTV ÷ CAC", m3: ratio(ltv, cac),
          barTitle: "Lo que cuesta un cliente vs. lo que te deja en toda su permanencia", barAl: "Costo por cliente (CAC)", a: cac, barBl: "LTV: ganancia durante " + cv.meses + (cv.meses === 1 ? " mes" : " meses"), b: ltv,
          eqLabel: "Recuperas cada cliente en:", eq: gm > 0 ? Math.ceil(cac / gm) + (Math.ceil(cac / gm) === 1 ? " mes" : " meses") + ". Como regla habitual, el LTV debería ser al menos 3 veces el CAC." : "con margen 0 no se recupera.",
          okTxt: "Lo que te dejan los suscriptores de este mes durante toda su permanencia, después de pagar los anuncios. Solo el primer mes: " + money(mes1) + ".", badTxt: "Aunque se queden " + cv.meses + " meses, no alcanzan a pagar lo que costó captarlos. Mejora la retención o baja el costo por cliente.",
          vtxt: "Con estos números sumas " + cv.clientes + " suscriptores al mes, que te pagan " + money(cv.clientes * cv.pago) + " cada mes.",
          formula: "CAC = inversión ÷ suscriptores nuevos · LTV = pago mensual × margen × meses que se queda." };
      } else if (mk === "b2b") {
        var reus = cv.leads * cv.reu / 100, cli = reus * cv.cierre / 100, gc = cv.ticket * cv.margen / 100, cacB = cli > 0 ? cv.inv / cli : 0;
        R = { res: cli * gc - cv.inv, m1l: "Costo por lead", m1: money(cv.inv / Math.max(1, cv.leads)), m2l: "Costo por reunión", m2: reus > 0 ? money(cv.inv / reus) : "—", m3l: "Costo por cliente", m3: cli > 0 ? money(cacB) : "—",
          barTitle: "Lo que cuesta un cliente vs. lo que te deja su contrato", barAl: "Costo por cliente", a: cacB, barBl: "Ganancia del contrato anual", b: gc,
          eqLabel: "Punto de equilibrio:", eq: gc > 0 ? "necesitas " + dec(cv.inv / gc) + " clientes al mes para cubrir los anuncios. En B2B la venta suele tardar meses: mide por trimestre." : "con margen 0 no hay equilibrio.",
          okTxt: "Ganancia de los contratos que cierras, después de pagar los anuncios del mes.", badTxt: "Los contratos no alcanzan a cubrir la inversión. Revisa cuántos leads llegan a reunión antes de invertir más.",
          vtxt: "Con estos números tienes " + dec(reus) + " reuniones y cierras " + dec(cli) + " clientes al mes.",
          formula: "Costo por reunión = inversión ÷ reuniones · Costo por cliente = inversión ÷ clientes." };
      } else {
        var vs = cv.leads * cv.cierre / 100, ingS = vs * cv.ticket, gs = cv.ticket * cv.margen / 100, cpaS = vs > 0 ? cv.inv / vs : 0;
        R = { res: vs * gs - cv.inv, m1l: "Costo por lead", m1: money(cv.inv / Math.max(1, cv.leads)), m2l: "Costo por venta", m2: vs > 0 ? money(cpaS) : "—", m3l: "ROAS", m3: ratio(ingS, cv.inv),
          barTitle: "Lo que cuesta cada venta vs. lo que te deja", barAl: "Costo por venta", a: cpaS, barBl: "Ganancia por venta (antes de anuncios)", b: gs,
          eqLabel: "Punto de equilibrio:", eq: gs > 0 ? "necesitas " + Math.ceil(cv.inv / gs) + " ventas al mes para no perder plata." : "con margen 0 no hay punto de equilibrio.",
          okTxt: "Resultado mensual después de pagar los anuncios.", badTxt: "Cada venta cuesta más de lo que te deja. Mejora tu cierre o tu margen antes de invertir más.",
          vtxt: "Con estos números cierras " + dec(vs) + " ventas al mes e ingresas " + money(ingS) + ".",
          formula: "Costo por lead = inversión ÷ leads · Costo por venta = inversión ÷ ventas · ROAS = ingresos ÷ inversión." };
      }
      return R;
    };
    var pintarSalida = function () {
      var R = calc(), gana = R.res >= 0, maxBar = Math.max(R.a, R.b, 1);
      var bar = function (v, c) { return "height:100%;border-radius:99px;transition:width .4s cubic-bezier(.2,.8,.2,1);background:" + c + ";width:" + Math.max(2, Math.min(100, v / maxBar * 100)).toFixed(1) + "%"; };
      var nota = $("#cl-nota");
      if (nota) nota.textContent = "Ejemplo ilustrativo. " + R.formula;
      var box = function (l, v) { return '<div style="background:#13294A;border-radius:18px;padding:16px"><p style="margin:0 0 4px;font-size:13px;color:#D3DCD5">' + esc(l) + '</p><p style="margin:0;font-size:21px;font-weight:700">' + esc(v) + "</p></div>"; };
      cout.innerHTML =
        '<div style="border-radius:24px;padding:26px;transition:background .4s;color:#05070A;background:' + (gana ? "#C8F169" : "#FCA5A5") + '">' +
        '<p style="margin:0 0 6px;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase">' + (gana ? "Tu campaña gana plata" : "Tu campaña pierde plata") + "</p>" +
        '<p style="margin:0;font-family:\'Fraunces\',serif;font-size:clamp(44px,5vw,66px);font-weight:700;letter-spacing:-1.5px;line-height:1">' + money(R.res) + "</p>" +
        '<p style="margin:10px 0 0;font-size:15px">' + esc(gana ? R.okTxt : R.badTxt) + "</p></div>" +
        '<div class="cl-m3" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px">' + box(R.m1l, R.m1) + box(R.m2l, R.m2) + box(R.m3l, R.m3) + "</div>" +
        '<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:18px;display:flex;flex-direction:column;gap:12px">' +
        '<p style="margin:0;font-size:14px;font-weight:700;color:#D3DCD5">' + esc(R.barTitle) + "</p>" +
        '<div style="display:flex;flex-direction:column;gap:6px"><span style="display:flex;justify-content:space-between;font-size:14px"><span>' + esc(R.barAl) + '</span><span style="font-weight:700">' + (R.a > 0 ? money(R.a) : "—") + '</span></span><div style="height:12px;background:#1B2638;border-radius:99px;overflow:hidden"><div style="' + bar(R.a, "#2DD4BF") + '"></div></div></div>' +
        '<div style="display:flex;flex-direction:column;gap:6px"><span style="display:flex;justify-content:space-between;font-size:14px"><span>' + esc(R.barBl) + '</span><span style="font-weight:700">' + money(R.b) + '</span></span><div style="height:12px;background:#1B2638;border-radius:99px;overflow:hidden"><div style="' + bar(R.b, gana ? "#C8F169" : "#FCA5A5") + '"></div></div></div>' +
        '<p style="margin:0;font-size:15px;color:#FFFFFF"><span style="color:#C8F169;font-weight:700">' + esc(R.eqLabel) + "</span> " + esc(R.eq) + "</p></div>" +
        '<p style="margin:0;font-size:15px;color:#D3DCD5">' + esc(R.vtxt) + "</p>" +
        '<a href="/calculadoras" class="k-link-arrow" style="color:#C8F169;font-weight:700;text-decoration:none;padding:8px 0">Ver las 20 calculadoras <span aria-hidden="true">→</span></a>';
    };
    var pintarEntradas = function () {
      cin.innerHTML = M[mk].f.map(function (f) {
        return '<label style="display:flex;flex-direction:column;gap:10px"><span style="display:flex;justify-content:space-between;gap:12px;font-size:15px;color:#D3DCD5"><span>' + esc(f[1]) + '</span><span class="cl-v" data-k="' + f[0] + '" style="font-weight:700;color:#FFFFFF;font-size:17px">' + esc(fmt(f[5], cv[f[0]])) + "</span></span>" +
          '<input type="range" class="cl-r" data-k="' + f[0] + '" min="' + f[2] + '" max="' + f[3] + '" step="' + f[4] + '" value="' + cv[f[0]] + '" aria-valuetext="' + esc(fmt(f[5], cv[f[0]])) + '" style="width:100%;accent-color:#C8F169;height:28px"></label>';
      }).join("") + '<p id="cl-nota" style="margin:0;font-size:13px;color:#B8C2CC"></p>';
    };
    cin.addEventListener("input", function (e) {
      var r = e.target.closest(".cl-r"); if (!r) return;
      var k = r.getAttribute("data-k"), f = M[mk].f.filter(function (x) { return x[0] === k; })[0];
      cv[k] = Number(r.value);
      var t = fmt(f[5], cv[k]);
      $('.cl-v[data-k="' + k + '"]', cin).textContent = t; r.setAttribute("aria-valuetext", t);
      pintarSalida();
      if (!usada) { usada = true; window.cdMedir("calculadora_usada", { calculadora: "inicio-" + mk }); }
    });
    $$(".cl-pre").forEach(function (b) {
      b.addEventListener("click", function () {
        mk = b.getAttribute("data-preset"); cv = Object.assign({}, M[mk].d); usada = false;
        $$(".cl-pre").forEach(function (x) {
          var on = x === b;
          x.setAttribute("aria-pressed", on ? "true" : "false");
          x.style.borderColor = on ? "#C8F169" : "rgba(255,255,255,.25)";
          x.style.background = on ? "#C8F169" : "transparent";
          x.style.color = on ? "#05070A" : "#FFFFFF";
        });
        pintarEntradas(); pintarSalida();
      });
    });
    pintarEntradas(); pintarSalida();
  })();
})();
