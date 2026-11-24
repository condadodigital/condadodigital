(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = window.cdEsc, medir = window.cdMedir, quieto = window.cdQuieto;
  var CALC = [{"n": "ROAS", "s": "roas", "l": "Retorno de la inversión publicitaria", "q": "¿Cuánto vuelve por cada peso en anuncios?", "f": "ROAS = ingresos ÷ inversión", "m": "Por cada $1 que pones en anuncios vuelven esos pesos en ventas. Ojo: son ingresos, no ganancia. Para saber si ganas plata, mira también tu margen y el ROI.", "g": "¿Gano plata?", "op": "div", "u": "x", "in": [{"lab": "Ingresos que trajeron los anuncios", "v": 1500000.0, "m": true, "mx": 100000000, "st": 50000}, {"lab": "Inversión en anuncios", "v": 500000.0, "m": true, "mx": 20000000, "st": 10000}], "ob": 3, "dir": 1}, {"n": "ROI", "s": "roi", "l": "Retorno de la inversión", "q": "¿Cuánto gano de verdad, descontando todos los costos?", "f": "ROI = (ingresos − costos) ÷ costos × 100", "m": "Si es positivo, el negocio gana después de pagar todo. Si es negativo, cada venta te cuesta más de lo que te deja.", "g": "¿Gano plata?", "op": "roi", "u": "%", "in": [{"lab": "Ingresos", "v": 2000000.0, "m": true, "mx": 100000000, "st": 50000}, {"lab": "Costos totales (anuncios, producto y operación)", "v": 1600000.0, "m": true, "mx": 100000000, "st": 50000}], "ob": 20, "dir": 1}, {"n": "CPC", "s": "cpc", "l": "Costo por clic", "q": "¿Cuánto pago cada vez que alguien hace clic?", "f": "CPC = inversión ÷ clics", "m": "Un CPC bajo sirve solo si esos clics después compran. Compáralo siempre con tu tasa de conversión.", "g": "¿Cuánto me cuesta?", "op": "div", "u": "$", "in": [{"lab": "Inversión", "v": 300000.0, "m": true, "mx": 20000000, "st": 10000}, {"lab": "Clics", "v": 1500.0, "m": false, "mx": 100000, "st": 50}], "ob": 300, "dir": -1}, {"n": "CPM", "s": "cpm", "l": "Costo por mil impresiones", "q": "¿Cuánto cuesta que me vean mil veces?", "f": "CPM = inversión ÷ impresiones × 1.000", "m": "Si sube sin que cambies nada, suele ser más competencia por tu público o un público demasiado chico.", "g": "¿Cuánto me cuesta?", "op": "mil", "u": "$", "in": [{"lab": "Inversión", "v": 300000.0, "m": true, "mx": 20000000, "st": 10000}, {"lab": "Impresiones", "v": 120000.0, "m": false, "mx": 1000000, "st": 1000}], "ob": 3000, "dir": -1}, {"n": "CPV", "s": "cpv", "l": "Costo por visualización", "q": "¿Cuánto pago por cada vez que ven mi video?", "f": "CPV = inversión ÷ visualizaciones", "m": "Revisa qué cuenta como visualización en cada plataforma: no es lo mismo 2 segundos que el video completo.", "g": "¿Cuánto me cuesta?", "op": "div", "u": "$", "in": [{"lab": "Inversión", "v": 200000.0, "m": true, "mx": 20000000, "st": 10000}, {"lab": "Visualizaciones", "v": 40000.0, "m": false, "mx": 1000000, "st": 500}], "ob": 10, "dir": -1}, {"n": "CPL", "s": "cpl", "l": "Costo por lead", "q": "¿Cuánto me cuesta cada contacto interesado?", "f": "CPL = inversión ÷ leads", "m": "Un lead barato no sirve si nunca compra. Cruza tu CPL con cuántos de esos leads terminan en venta.", "g": "¿Cuánto me cuesta?", "op": "div", "u": "$", "in": [{"lab": "Inversión", "v": 500000.0, "m": true, "mx": 20000000, "st": 10000}, {"lab": "Leads", "v": 50.0, "m": false, "mx": 5000, "st": 1}], "ob": 12000, "dir": -1}, {"n": "CPA", "s": "cpa", "l": "Costo por adquisición", "q": "¿Cuánto me cuesta cada venta o conversión?", "f": "CPA = inversión ÷ conversiones", "m": "Tu CPA tiene que ser menor que lo que te deja cada venta. Si no, estás comprando clientes a pérdida.", "g": "¿Cuánto me cuesta?", "op": "div", "u": "$", "in": [{"lab": "Inversión", "v": 500000.0, "m": true, "mx": 20000000, "st": 10000}, {"lab": "Conversiones (ventas)", "v": 10.0, "m": false, "mx": 2000, "st": 1}], "ob": 60000, "dir": -1}, {"n": "CTR", "s": "ctr", "l": "Tasa de clics", "q": "¿Mi anuncio llama la atención?", "f": "CTR = clics ÷ impresiones × 100", "m": "Mide qué tan atractivo es el anuncio para quien lo ve. Si cae con el tiempo, prueba otra imagen o un gancho distinto.", "g": "¿Funciona mi anuncio?", "op": "pct", "u": "%", "in": [{"lab": "Clics", "v": 1500.0, "m": false, "mx": 100000, "st": 50}, {"lab": "Impresiones", "v": 120000.0, "m": false, "mx": 1000000, "st": 1000}], "ob": 1.5, "dir": 1}, {"n": "CVR", "s": "cvr", "l": "Tasa de conversión", "q": "¿Los clics se convierten en resultados?", "f": "CVR = conversiones ÷ clics × 100", "m": "Si el CTR es bueno pero el CVR es bajo, el problema suele estar en la página de destino, no en el anuncio.", "g": "¿Funciona mi anuncio?", "op": "pct", "u": "%", "in": [{"lab": "Conversiones", "v": 30.0, "m": false, "mx": 2000, "st": 1}, {"lab": "Clics", "v": 1500.0, "m": false, "mx": 100000, "st": 50}], "ob": 2, "dir": 1}, {"n": "Frecuencia", "s": "frecuencia", "l": "Veces que te ve cada persona", "q": "¿Estoy cansando a mi público?", "f": "Frecuencia = impresiones ÷ alcance", "m": "Si sube mucho y el CTR baja, la misma gente ya vio tu anuncio demasiadas veces: renueva la creatividad o amplía el público.", "g": "¿Funciona mi anuncio?", "op": "div", "u": "veces", "in": [{"lab": "Impresiones", "v": 120000.0, "m": false, "mx": 1000000, "st": 1000}, {"lab": "Alcance (personas únicas)", "v": 40000.0, "m": false, "mx": 500000, "st": 500}], "ob": 3, "dir": -1}, {"n": "Hook rate", "s": "hook-rate", "l": "Tasa de enganche del video", "q": "¿Los primeros 3 segundos detienen el scroll?", "f": "Hook rate = reproducciones de 3 s ÷ impresiones × 100", "m": "De cada 100 veces que tu video aparece, cuántas personas se quedan al menos 3 segundos. Mide si el inicio del video llama la atención, no si el video vende.", "g": "¿Engancha mi contenido?", "op": "pct", "u": "%", "in": [{"lab": "Reproducciones de 3 segundos", "v": 9000.0, "m": false, "mx": 400000, "st": 500}, {"lab": "Impresiones", "v": 40000.0, "m": false, "mx": 1000000, "st": 1000}], "ob": 25, "dir": 1}, {"n": "Hold rate", "s": "hold-rate", "l": "Tasa de retención del video", "q": "¿Los que se detienen se quedan a ver el video?", "f": "Hold rate = ThruPlays ÷ reproducciones de 3 s × 100", "m": "De cada 100 personas que se detuvieron, cuántas siguieron mirando hasta los 15 segundos o el final. El hook trae a la gente; el hold dice si el contenido la retiene.", "g": "¿Engancha mi contenido?", "op": "pct", "u": "%", "in": [{"lab": "ThruPlays (15 segundos o el video completo)", "v": 2300.0, "m": false, "mx": 200000, "st": 100}, {"lab": "Reproducciones de 3 segundos", "v": 9000.0, "m": false, "mx": 400000, "st": 500}], "ob": 25, "dir": 1}, {"n": "ER alcance", "s": "er-alcance", "l": "Tasa de interacción (engagement) por alcance", "q": "¿Mi contenido genera conversación?", "f": "Engagement = interacciones ÷ alcance × 100", "m": "Calcúlalo siempre con la misma base (alcance o seguidores) para comparar tus publicaciones entre sí.", "g": "¿Engancha mi contenido?", "op": "pct", "u": "%", "in": [{"lab": "Interacciones (me gusta, comentarios, compartidos, guardados)", "v": 900.0, "m": false, "mx": 50000, "st": 50}, {"lab": "Alcance", "v": 20000.0, "m": false, "mx": 500000, "st": 500}], "ob": 3, "dir": 1}, {"n": "ER seguidores", "s": "er-seguidores", "l": "Tasa de interacción (engagement) por seguidores", "q": "¿Mi comunidad interactúa con lo que publico?", "f": "Engagement = interacciones ÷ seguidores × 100", "m": "Mide la interacción contra tu comunidad completa, no solo contra quienes vieron la publicación. Suele salir más bajo que el engagement por alcance, porque no todos tus seguidores ven cada publicación.", "g": "¿Engancha mi contenido?", "op": "pct", "u": "%", "in": [{"lab": "Interacciones de la publicación", "v": 620.0, "m": false, "mx": 50000, "st": 50}, {"lab": "Seguidores de la cuenta", "v": 18000.0, "m": false, "mx": 500000, "st": 100}], "ob": 2, "dir": 1}, {"n": "Seguidores", "s": "seguidores", "l": "Crecimiento de seguidores", "q": "¿Mi cuenta está creciendo?", "f": "Crecimiento = (ganados − perdidos) ÷ seguidores iniciales × 100", "m": "Más seguidores no es más ventas. Úsalo junto al engagement para saber si la gente nueva de verdad te mira.", "g": "¿Engancha mi contenido?", "op": "grow", "u": "%", "in": [{"lab": "Seguidores ganados", "v": 450.0, "m": false, "mx": 20000, "st": 10}, {"lab": "Seguidores perdidos", "v": 80.0, "m": false, "mx": 20000, "st": 10}, {"lab": "Seguidores al inicio del periodo", "v": 15000.0, "m": false, "mx": 500000, "st": 100}], "ob": 2, "dir": 1}, {"n": "Guardados", "s": "guardados", "l": "Tasa de guardados", "q": "¿Mi contenido es tan útil que lo guardan?", "f": "Tasa de guardados = guardados ÷ alcance × 100", "m": "Un guardado dice \"esto me sirve para después\". Es buena señal para contenido educativo como guías y listas.", "g": "¿Engancha mi contenido?", "op": "pct", "u": "%", "in": [{"lab": "Guardados", "v": 120.0, "m": false, "mx": 10000, "st": 10}, {"lab": "Alcance", "v": 20000.0, "m": false, "mx": 500000, "st": 500}], "ob": 0.5, "dir": 1}, {"n": "Ticket", "s": "ticket", "l": "Ticket promedio", "q": "¿Cuánto compra cada cliente en promedio?", "f": "Ticket promedio = ingresos ÷ pedidos", "m": "Subir el ticket (packs, envío sin costo desde cierto monto) te deja pagar más por cada venta sin perder plata.", "g": "¿Cuánto vale un cliente?", "op": "div", "u": "$", "in": [{"lab": "Ingresos del periodo", "v": 3500000.0, "m": true, "mx": 100000000, "st": 50000}, {"lab": "Número de pedidos", "v": 100.0, "m": false, "mx": 5000, "st": 1}], "ob": 30000, "dir": 1}, {"n": "CAC", "s": "cac", "l": "Costo de adquisición de clientes", "q": "¿Cuánto me cuesta conseguir un cliente nuevo?", "f": "CAC = (marketing + ventas) ÷ clientes nuevos", "m": "A diferencia del CPA, el CAC suma todo lo que gastas para conseguir clientes, no solo los anuncios.", "g": "¿Cuánto vale un cliente?", "op": "cac", "u": "$", "in": [{"lab": "Gasto en marketing", "v": 800000.0, "m": true, "mx": 20000000, "st": 10000}, {"lab": "Gasto en ventas (sueldos, comisiones, herramientas)", "v": 400000.0, "m": true, "mx": 20000000, "st": 10000}, {"lab": "Clientes nuevos", "v": 20.0, "m": false, "mx": 1000, "st": 1}], "ob": 70000, "dir": -1}, {"n": "LTV", "s": "ltv", "l": "Valor de vida del cliente", "q": "¿Cuánto me deja un cliente en toda la relación?", "f": "LTV = ticket × compras por año × años × margen", "m": "Es lo máximo que te conviene pagar por un cliente. Si tu CAC se acerca a tu LTV, el negocio no escala.", "g": "¿Cuánto vale un cliente?", "op": "ltv", "u": "$", "in": [{"lab": "Ticket promedio", "v": 35000.0, "m": true, "mx": 1000000, "st": 1000}, {"lab": "Compras por año", "v": 4.0, "m": false, "mx": 52, "st": 1}, {"lab": "Años que se queda como cliente", "v": 2.0, "m": false, "mx": 10, "st": 1}, {"lab": "Margen de ganancia (%)", "v": 40.0, "m": false, "mx": 100, "st": 1}], "ob": 100000, "dir": 1}, {"n": "LTV/CAC", "s": "ltv-cac", "l": "Relación valor del cliente vs. costo", "q": "¿Cuántas veces recupero lo que pagué por un cliente?", "f": "LTV/CAC = LTV ÷ CAC", "m": "Bajo 1x pierdes plata con cada cliente. Muchos equipos se ponen como objetivo 3x, pero define el tuyo según tu margen y tu caja.", "g": "¿Cuánto vale un cliente?", "op": "div", "u": "x", "in": [{"lab": "LTV (valor de vida del cliente)", "v": 144000.0, "m": true, "mx": 5000000, "st": 1000}, {"lab": "CAC (costo de adquisición)", "v": 48000.0, "m": true, "mx": 2000000, "st": 1000}], "ob": 3, "dir": 1}];
  var FU = [{n:'Embudo simple',ins:[['Inversión mensual en anuncios',2000000,0,20000000,50000,'$'],['Costo por mil impresiones (CPM)',1000,100,10000,50,'$'],['De cada 100 que ven el anuncio, cuántos hacen clic (CTR)',3,0.1,10,0.1,'%'],['De cada 100 clics, cuántos dejan sus datos',1,0.1,30,0.1,'%'],['De cada 100 leads, cuántos compran',15,0.5,100,0.5,'%'],['Ticket promedio por venta',50000,1000,1000000,1000,'$']]}, {n:'Embudo completo (tienda online)',ins:[['Inversión mensual en anuncios',2000000,0,20000000,50000,'$'],['Costo por mil impresiones (CPM)',2500,100,10000,50,'$'],['De cada 100 que ven el anuncio, cuántos hacen clic (CTR)',1.5,0.1,10,0.1,'%'],['De cada 100 clics, cuántos cargan la página (sesiones)',80,10,100,1,'%'],['De cada 100 sesiones, cuántos ven un producto',45,1,100,1,'%'],['De cada 100 que ven un producto, cuántos lo agregan al carrito',12,0.5,60,0.5,'%'],['De cada 100 carritos, cuántos inician el pago',55,1,100,1,'%'],['De cada 100 pagos iniciados, cuántos compran',60,1,100,1,'%'],['Ticket promedio por compra',35000,1000,1000000,1000,'$']]}];
  var GL = { cpc: "/glosario-cpc", cpm: "/glosario-cpm", cpl: "/glosario-cpl", cpa: "/glosario-cpa", ctr: "/glosario-ctr", cvr: "/glosario-cvr", cac: "/glosario-cac", ltv: "/glosario-ltv",
    roas: "/glosario#roas", roi: "/glosario#roi", cpv: "/glosario#cpv", frecuencia: "/glosario#frecuencia", "hook-rate": "/glosario#hook-rate", "hold-rate": "/glosario#hold-rate",
    "er-alcance": "/glosario#tasa-de-interaccion-o-engagement", "er-seguidores": "/glosario#tasa-de-interaccion-o-engagement", ticket: "/glosario#ticket-promedio", "ltv-cac": "/glosario#ltv-cac" };
  var ANTES = { engagement: "er-alcance", "er-seg": "er-seguidores", "crec-seg": "seguidores", "tasa-guardado": "guardados" };
  var GRUPOS = ["¿Gano plata?", "¿Cuánto me cuesta?", "¿Funciona mi anuncio?", "¿Engancha mi contenido?", "¿Cuánto vale un cliente?"];
  var fmt = function (n, m) { var r = Math.round(n); return (r < 0 ? "-" : "") + (m ? "$" : "") + Math.abs(r).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); };
  var dec = function (n, d) { return n.toFixed(d).replace(".", ","); };
  var parse = function (t) { var x = String(t).replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, ""); return Number(x) || 0; };
  var isP = function (x) { return /%/.test(x.lab); };
  var idx = function (s) { for (var i = 0; i < CALC.length; i++) if (CALC[i].s === s) return i; return -1; };

  (function filtros() {
    var chips = $$("#calc .pg-chip[data-grupo]"), cards = $$("#calc [data-calc]");
    chips.forEach(function (b) {
      b.addEventListener("click", function () {
        var g = b.getAttribute("data-grupo");
        chips.forEach(function (x) { var on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
        cards.forEach(function (c) { c.hidden = g !== "todas" && c.getAttribute("data-grupo") !== g; });
      });
    });
  })();

  var tl = $("#calc-activa");
  if (!tl) return;
  var ci = 0, vals = null, ob = null, usadas = {};
  var calcular = function () {
    var c = CALC[ci], a = vals[0], b = vals[1], r = 0, cuenta = "";
    var F = function (k) { return isP(c.in[k]) ? vals[k] + "%" : fmt(vals[k], c.in[k].m); };
    if (c.op === "div") { r = b ? a / b : 0; cuenta = F(0) + " ÷ " + F(1); }
    else if (c.op === "mil") { r = b ? a / b * 1000 : 0; cuenta = F(0) + " ÷ " + F(1) + " × 1.000"; }
    else if (c.op === "pct") { r = b ? a / b * 100 : 0; cuenta = F(0) + " ÷ " + F(1) + " × 100"; }
    else if (c.op === "roi") { r = b ? (a - b) / b * 100 : 0; cuenta = "(" + F(0) + " − " + F(1) + ") ÷ " + F(1) + " × 100"; }
    else if (c.op === "grow") { r = vals[2] ? (a - b) / vals[2] * 100 : 0; cuenta = "(" + F(0) + " − " + F(1) + ") ÷ " + F(2) + " × 100"; }
    else if (c.op === "cac") { r = vals[2] ? (a + b) / vals[2] : 0; cuenta = "(" + F(0) + " + " + F(1) + ") ÷ " + F(2); }
    else if (c.op === "ltv") { r = a * b * vals[2] * vals[3] / 100; cuenta = F(0) + " × " + F(1) + " × " + F(2) + " × " + F(3); }
    return { r: r, cuenta: cuenta };
  };
  window.cdCalcular = function (s, v) { var p = ci, pv = vals; ci = idx(s); vals = v || CALC[ci].in.map(function (x) { return x.v; }); var o = calcular(); ci = p; vals = pv; return o.r; };
  var show = function (n) { var c = CALC[ci]; return c.u === "$" ? fmt(n, true) : c.u === "x" ? dec(n, 1) + "x" : c.u === "veces" ? dec(n, 1) + " veces" : dec(n, 1) + "%"; };
  var resultado = function () {
    var c = CALC[ci], o = calcular(), r = o.r;
    var good = c.dir > 0 ? r >= ob : r <= ob, d = ob ? Math.abs(r - ob) / ob * 100 : 0, dd = Math.round(d);
    var msg = dd === 0 ? "Justo en tu objetivo." : good ? (c.dir > 0 ? "Un " + dd + "% por sobre tu objetivo. Vas bien." : "Un " + dd + "% bajo tu objetivo. Vas bien.") : (c.dir > 0 ? "Un " + dd + "% bajo tu objetivo. Hay espacio para mejorar." : "Un " + dd + "% por sobre tu objetivo: te está saliendo caro.");
    $(".tl-fx b", tl).textContent = o.cuenta + " = " + show(r);
    var res = $(".tl-res", tl);
    res.className = "tl-res" + (good ? "" : " bad");
    $("b", res).textContent = show(r);
    $("p", res).textContent = msg;
    var bar = $(".tl-bar", tl);
    bar.className = "tl-bar" + (good ? "" : " low");
    $("i", bar).style.width = Math.max(2, Math.min(100, (ob ? r / (2 * ob) : 0) * 100)) + "%";
    $$(".tl-obj-v", tl).forEach(function (x) { x.textContent = show(ob); });
    return good;
  };
  var pintar = function () {
    var c = CALC[ci];
    $(".tl-k", tl).textContent = c.g;
    $(".tl-h", tl).innerHTML = esc(c.n) + "<span> · " + esc(c.l) + "</span>";
    $(".tl-ins", tl).innerHTML = c.in.map(function (x, k) {
      var lab = x.lab.replace(/ \(%\)/, ""), id = "tl-" + k;
      return '<div class="tl-f"><div class="row"><label for="' + id + '">' + esc(lab) + '</label><span class="tl-box"><i>' + (x.m ? "$" : "") + '</i><input id="' + id + '" type="text" inputmode="decimal" data-k="' + k + '" value="' + (isP(x) ? vals[k] : fmt(vals[k], false)) + '"><i>' + (isP(x) ? "%" : "") + '</i></span></div>' +
        '<input type="range" min="0" max="' + x.mx + '" step="' + x.st + '" value="' + vals[k] + '" data-k="' + k + '" aria-label="' + esc(lab) + '"></div>';
    }).join("");
    $(".tl-fx p", tl).textContent = c.f;
    $(".tl-obj label", tl).textContent = c.dir > 0 ? "Tu objetivo (mínimo)" : "Tu objetivo (máximo que aceptas pagar)";
    var or = $(".tl-obj input", tl);
    or.max = c.ob * 4; or.step = c.u === "$" ? Math.max(1, Math.round(c.ob / 100)) : (c.ob < 1 ? 0.05 : 0.5); or.value = ob;
    $(".tl-res small", tl).textContent = "Tu " + c.n;
    $(".tl-mean", tl).innerHTML = "<b>Qué significa:</b> " + esc(c.m);
    var gl = $(".tl-gl", tl);
    if (GL[c.s]) { gl.hidden = false; gl.href = GL[c.s]; } else gl.hidden = true;
    var nx = (ci + 1) % CALC.length;
    $(".tl-next", tl).textContent = "Siguiente: " + CALC[nx].n + " →";
    $$("#calc [data-calc]").forEach(function (x) { x.classList.toggle("sel", x.getAttribute("data-calc") === c.s); });
    resultado();
  };
  var elegir = function (i, ir) {
    ci = i; vals = CALC[i].in.map(function (x) { return x.v; }); ob = CALC[i].ob;
    pintar();
    if (ir) {
      try { history.replaceState(null, "", "#" + CALC[i].s); } catch (e) {}
      tl.scrollIntoView({ behavior: quieto ? "auto" : "smooth", block: "start" });
    }
  };
  var usar = function () { var s = CALC[ci].s; if (!usadas[s]) { usadas[s] = 1; medir("calculadora_usada", { calculadora: s }); } };
  tl.addEventListener("input", function (e) {
    var t = e.target, k = t.getAttribute("data-k");
    if (t.type === "range" && k !== null) {
      vals[+k] = Number(t.value);
      var x = CALC[ci].in[+k], box = $('input[type="text"][data-k="' + k + '"]', tl);
      box.value = isP(x) ? vals[+k] : fmt(vals[+k], false);
      resultado(); usar();
    } else if (t.classList.contains("tl-obj-r")) { ob = Number(t.value); resultado(); }
  });
  tl.addEventListener("change", function (e) {
    var t = e.target, k = t.getAttribute("data-k");
    if (t.type === "text" && k !== null) {
      vals[+k] = parse(t.value);
      var x = CALC[ci].in[+k];
      t.value = isP(x) ? vals[+k] : fmt(vals[+k], false);
      $('input[type="range"][data-k="' + k + '"]', tl).value = vals[+k];
      resultado(); usar();
    } else if (t.classList.contains("tl-obj-r")) {
      medir("calculadora_objetivo", { calculadora: CALC[ci].s, objetivo: ob, cumple: resultado() ? "si" : "no" });
    }
  });
  tl.addEventListener("keydown", function (e) { if (e.key === "Enter" && e.target.type === "text") e.target.dispatchEvent(new Event("change", { bubbles: true })); });
  $(".tl-reset", tl).addEventListener("click", function () { elegir(ci, false); });
  $(".tl-next", tl).addEventListener("click", function () { elegir((ci + 1) % CALC.length, true); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-calc], [data-ir-calc]");
    if (!a) return;
    var i = idx(a.getAttribute("data-calc") || a.getAttribute("data-ir-calc"));
    if (i < 0) return;
    e.preventDefault(); elegir(i, true);
  });
  var desdeHash = function () {
    var h = decodeURIComponent(location.hash.slice(1)); h = ANTES[h] || h;
    var i = idx(h);
    if (i >= 0) { elegir(i, false); setTimeout(function () { tl.scrollIntoView({ block: "start" }); }, 60); return true; }
    return false;
  };
  if (!desdeHash()) elegir(0, false);
  window.addEventListener("hashchange", desdeHash);

  (function embudo() {
    var box = $("#embudo"); if (!box) return;
    var fi = 0, fv = [FU[0].ins.map(function (x) { return x[1]; }), FU[1].ins.map(function (x) { return x[1]; })], usado = {};
    var BL = ["#93C5FD", "#60A5FA", "#3B82F6", "#2563EB", "#1D4ED8", "#3B5BDB", "#4F46E5"];
    var MAP = { CPC: "cpc", CPL: "cpl", CPA: "cpa", CVR: "cvr", ROAS: "roas", Ticket: "ticket" };
    var tabs = $$(".fu-tabs button", box), ins = $(".fu-ins", box), out = $(".fu-out", box);
    var salida = function () {
      var v = fv[fi], inv = v[0], imp = v[1] ? inv / v[1] * 1000 : 0, cl = imp * v[2] / 100, st, ing, M;
      if (fi === 0) {
        var ld = cl * v[3] / 100, vt = ld * v[4] / 100; ing = vt * v[5];
        st = [["Impresiones", imp, ""], ["Clics", cl, dec(v[2], 1) + "%"], ["Leads", ld, dec(v[3], 1) + "%"], ["Ventas", vt, dec(v[4], 1) + "%"]];
        M = [["CPC", cl ? inv / cl : 0, "$"], ["CPL", ld ? inv / ld : 0, "$"], ["CPA", vt ? inv / vt : 0, "$"], ["ROAS", inv ? ing / inv : 0, "x"]];
      } else {
        var se = cl * v[3] / 100, pv = se * v[4] / 100, ca = pv * v[5] / 100, ck = ca * v[6] / 100, co = ck * v[7] / 100; ing = co * v[8];
        st = [["Impresiones", imp, ""], ["Clics", cl, dec(v[2], 1) + "%"], ["Sesiones (vistas de la página)", se, dec(v[3], 0) + "%"], ["Vistas de producto", pv, dec(v[4], 0) + "%"], ["Agregados al carrito", ca, dec(v[5], 1) + "%"], ["Pagos iniciados", ck, dec(v[6], 0) + "%"], ["Compras", co, dec(v[7], 0) + "%"]];
        M = [["CPC", cl ? inv / cl : 0, "$"], ["CPA", co ? inv / co : 0, "$"], ["CVR", cl ? co / cl * 100 : 0, "%"], ["ROAS", inv ? ing / inv : 0, "x"], ["Ticket", v[8], "$"]];
      }
      var mx = Math.log10(Math.max(imp, 10) + 1);
      out.innerHTML = st.map(function (x, i) {
        var c1 = BL[Math.min(i, BL.length - 1)];
        return '<div class="fu-st"><div class="row"><span>' + esc(x[0]) + "<em>" + (x[2] ? "· " + x[2] : "") + "</em></span><b>" + fmt(x[1], false) + '</b></div><div class="fu-tr"><i style="width:' + Math.max(2, (x[1] > 0 ? Math.log10(x[1] + 1) / mx : 0) * 100).toFixed(1) + "%;background:linear-gradient(90deg," + c1 + "cc," + c1 + ')"></i></div></div>';
      }).join("") +
        '<div class="fu-st money"><div class="row"><span>Ingresos<em>· ' + dec(inv ? ing / inv : 0, 1) + "x lo invertido</em></span><b>" + fmt(ing, true) + '</b></div><div class="fu-tr"><i style="width:' + Math.max(2, Math.min(100, (inv ? ing / inv : 0) / 6 * 100)).toFixed(1) + '%"></i></div></div>' +
        '<div class="fu-m"><small>Las métricas que salen de tu embudo (toca una para abrirla arriba en la calculadora)</small><div class="fu-chips">' +
        M.map(function (m) { var t = m[2] === "$" ? fmt(m[1], true) : m[2] === "x" ? dec(m[1], 1) + "x" : dec(m[1], 2) + "%"; return '<a href="#' + MAP[m[0]] + '" data-ir-calc="' + MAP[m[0]] + '"><span>' + m[0] + "</span><b>" + t + "</b></a>"; }).join("") + "</div></div>";
    };
    var muestra = function (x, v) { return x[5] === "$" ? fmt(v, true) : dec(v, 1) + "%"; };
    var entradas = function () {
      ins.innerHTML = FU[fi].ins.map(function (x, k) {
        return '<div class="fu-f"><div class="row"><label for="fu-' + k + '">' + esc(x[0]) + '</label><b data-v="' + k + '">' + muestra(x, fv[fi][k]) + '</b></div><input id="fu-' + k + '" type="range" min="' + x[2] + '" max="' + x[3] + '" step="' + x[4] + '" value="' + fv[fi][k] + '" data-k="' + k + '"></div>';
      }).join("");
    };
    ins.addEventListener("input", function (e) {
      var k = e.target.getAttribute("data-k"); if (k === null) return;
      fv[fi][+k] = Number(e.target.value);
      $('[data-v="' + k + '"]', ins).textContent = muestra(FU[fi].ins[+k], fv[fi][+k]);
      salida();
      if (!usado[fi]) { usado[fi] = 1; medir("embudo_usado", { tipo: fi === 0 ? "simple" : "completo" }); }
    });
    tabs.forEach(function (b, i) {
      b.addEventListener("click", function () {
        fi = i; tabs.forEach(function (x, j) { x.className = j === i ? "on" : ""; x.setAttribute("aria-selected", j === i ? "true" : "false"); });
        entradas(); salida();
      });
    });
    entradas(); salida();
  })();

  (function camila() {
    var pasos = $$(".jr-s"), vistos = {};
    var marcar = function (i, b) { if (vistos[i]) return; vistos[i] = 1; medir("camila_paso", { paso: i + 1, titulo: $(".jr-t", b).textContent }); };
    pasos.forEach(function (b, i) {
      b.addEventListener("click", function () {
        var on = !b.classList.contains("on");
        pasos.forEach(function (x) { x.classList.remove("on"); x.setAttribute("aria-expanded", "false"); });
        b.classList.toggle("on", on); b.setAttribute("aria-expanded", on ? "true" : "false");
        if (on) marcar(i, b);
      });
      b.addEventListener("mouseenter", function () { if (window.matchMedia("(hover:hover)").matches) marcar(i, b); });
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") pasos.forEach(function (x) { x.classList.remove("on"); x.setAttribute("aria-expanded", "false"); }); });
  })();
})();
