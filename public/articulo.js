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
