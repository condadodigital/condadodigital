(function () {
  "use strict";
  var links = Array.prototype.slice.call(document.querySelectorAll(".ar-toc a"));
  if (!links.length || !("IntersectionObserver" in window)) return;
  var mapa = {};
  links.forEach(function (a) { mapa[a.getAttribute("href").slice(1)] = a; });
  var visibles = {};
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { visibles[e.target.id] = e.isIntersecting ? e.boundingClientRect.top : null; });
    var mejor = null, top = Infinity;
    Object.keys(visibles).forEach(function (k) { if (visibles[k] !== null && visibles[k] < top) { top = visibles[k]; mejor = k; } });
    if (!mejor) return;
    links.forEach(function (a) { var on = a === mapa[mejor]; a.classList.toggle("on", on); if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
  }, { rootMargin: "-90px 0px -55% 0px" });
  Object.keys(mapa).forEach(function (id) { var h = document.getElementById(id); if (h) io.observe(h); });
  var m = document.querySelector(".ar-mtoc");
  if (m) m.addEventListener("click", function (e) { if (e.target.closest("a")) m.open = false; });
})();
(function () {
  "use strict";
  var caja = document.querySelector(".fc-prox");
  if (!caja) return;
  var hoy;
  try { hoy = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()); } catch (e) { return; }
  var limpio = function (el) { return el.textContent.replace(/\[\d+\]/g, "").trim(); };
  var curso = null, prox = null;
  Array.prototype.forEach.call(caja.querySelectorAll("tr[data-inicio]"), function (tr) {
    var i = tr.getAttribute("data-inicio"), f = tr.getAttribute("data-fin"), e = hoy < i ? "proximo" : hoy > f ? "terminado" : "curso";
    var s = tr.querySelector(".fc-estado");
    s.className = "fc-estado fc-" + e;
    s.textContent = e === "proximo" ? "Próximo" : e === "curso" ? "En curso" : "Terminado";
    if (e === "curso" && !curso) curso = tr;
    if (e === "proximo" && !prox) prox = tr;
  });
  var r = caja.querySelector(".fc-resp"), tr = curso || prox;
  if (!r) return;
  if (tr) {
    var c = tr.querySelectorAll("td");
    r.innerHTML = (curso ? "Ahora está en curso el <b></b>: " : "El próximo es el <b></b>: ") + "<span></span>.";
    r.querySelector("b").textContent = limpio(c[0]);
    var f = limpio(c[1]);
    r.querySelector("span").textContent = f.charAt(0).toLowerCase() + f.slice(1);
  } else {
    r.textContent = "Las fechas de los próximos eventos aún no están anunciadas por la organización.";
  }
})();
