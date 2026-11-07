// CONDADO DIGITAL — Menú móvil, submenús y buscador

// Abre y cierra el menú en pantallas pequeñas
const botonMenu = document.querySelector(".boton-menu");
const menu = document.querySelector(".menu");

if (botonMenu && menu) {
  botonMenu.addEventListener("click", () => {
    menu.classList.toggle("abierto");
  });
}

// En móvil: tocar un ítem con submenú lo despliega
document.querySelectorAll(".menu > li").forEach((item) => {
  const enlace = item.querySelector(":scope > a");
  const submenu = item.querySelector(".submenu");

  if (enlace && submenu) {
    enlace.addEventListener("click", (evento) => {
      if (window.innerWidth <= 860) {
        evento.preventDefault();
        item.classList.toggle("desplegado");
      }
    });
  }
});

// Marca en el menú la página actual
const paginaActual = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".menu a").forEach((enlace) => {
  if (enlace.getAttribute("href") === paginaActual) {
    enlace.classList.add("activo");
  }
});

// ============================================
// Buscador desplegable global (overlay)
// Se abre desde la lupa del menú sin salir de la página
// ============================================
(function () {
  // Índice de búsqueda del sitio: agregar aquí cada contenido nuevo
  const INDICE = [
    { t: "Blog — Paid Media", u: "blog.html#paid-media", tipo: "Categoría", k: "paid media google ads meta ads tiktok linkedin campañas" },
    { t: "Blog — SEO · AEO · GEO", u: "blog.html#seo", tipo: "Categoría", k: "seo aeo geo posicionamiento buscadores ia" },
    { t: "Blog — Growth Marketing", u: "blog.html#growth", tipo: "Categoría", k: "growth cro funnels cac ltv experimentos" },
    { t: "Blog — Social Media", u: "blog.html#social", tipo: "Categoría", k: "social media instagram tiktok contenido comunidad" },
    { t: "Blog — Analytics", u: "blog.html#analytics", tipo: "Categoría", k: "analytics ga4 gtm looker bigquery datos tracking" },
    { t: "Blog — IA & MarTech", u: "blog.html#ia", tipo: "Categoría", k: "ia inteligencia artificial martech automatizacion agentes" },
    { t: "Noticias de Marketing", u: "noticias.html", tipo: "Sección", k: "noticias actualidad meta google tiktok openai" },
    { t: "Calculadoras de marketing (17 métricas)", u: "calculadoras.html", tipo: "Recurso", k: "calculadora roas roi cpa cpl cac cpc cpm cpv ctr cvr frecuencia engagement seguidores guardados ticket ltv metricas" },
    { t: "Aprendizaje: cápsulas paso a paso", u: "aprendizaje.html", tipo: "Sección", k: "aprendizaje capsulas tutoriales como implementar campana meta google tiktok ads paso a paso ga4 pixel" },
    // PENDIENTE: { t: "¿Qué es el ROAS?", u: "glosario-roas.html", tipo: "Glosario", k: "roas return ad spend retorno formula" },
    { t: "¿Qué es el CPA?", u: "glosario-cpa.html", tipo: "Glosario", k: "cpa costo por adquisicion formula" },
    { t: "¿Qué es el CAC?", u: "glosario-cac.html", tipo: "Glosario", k: "cac costo adquisicion cliente" },
    { t: "¿Qué es el LTV?", u: "glosario-ltv.html", tipo: "Glosario", k: "ltv lifetime value valor vida cliente" },
    { t: "¿Qué es el CPC?", u: "glosario-cpc.html", tipo: "Glosario", k: "cpc costo por clic" },
    { t: "¿Qué es el CPM?", u: "glosario-cpm.html", tipo: "Glosario", k: "cpm costo mil impresiones" },
    { t: "¿Qué es el CTR?", u: "glosario-ctr.html", tipo: "Glosario", k: "ctr tasa clics click through rate" },
    { t: "¿Qué es el CVR?", u: "glosario-cvr.html", tipo: "Glosario", k: "cvr tasa conversion" },
    { t: "¿Qué es el CPL?", u: "glosario-cpl.html", tipo: "Glosario", k: "cpl costo por lead" },
    // PENDIENTE: { t: "¿Qué es SEO?", u: "glosario-seo.html", tipo: "Glosario", k: "seo posicionamiento organico buscadores" },
    // PENDIENTE: { t: "¿Qué es SEM?", u: "glosario-sem.html", tipo: "Glosario", k: "sem publicidad buscadores google ads" },
    { t: "¿Qué es AEO?", u: "glosario-aeo.html", tipo: "Glosario", k: "aeo answer engine optimization respuestas" },
    { t: "¿Qué es GEO?", u: "glosario-geo.html", tipo: "Glosario", k: "geo generative engine optimization ia chatgpt" },
    { t: "¿Qué es CRO?", u: "glosario-cro.html", tipo: "Glosario", k: "cro optimizacion conversion tests ab" },
    { t: "¿Qué es un CRM?", u: "glosario-crm.html", tipo: "Glosario", k: "crm gestion clientes hubspot pipedrive" },
    { t: "¿Qué es GA4?", u: "glosario-ga4.html", tipo: "Glosario", k: "ga4 google analytics eventos medicion" },
    { t: "¿Qué es GTM?", u: "glosario-gtm.html", tipo: "Glosario", k: "gtm google tag manager etiquetas" },
    { t: "¿Qué es la CAPI?", u: "glosario-capi.html", tipo: "Glosario", k: "capi conversions api servidor meta" },
    // PENDIENTE: { t: "¿Qué es un Pixel?", u: "glosario-pixel.html", tipo: "Glosario", k: "pixel meta seguimiento eventos remarketing" },
    { t: "¿Qué son las UTM?", u: "glosario-utm.html", tipo: "Glosario", k: "utm parametros seguimiento campanas atribucion" },
    { t: "Glosario de Marketing", u: "glosario.html", tipo: "Sección", k: "glosario diccionario terminos cpc cpm ctr cac ltv" },
    { t: "Preguntas frecuentes", u: "preguntas-frecuentes.html", tipo: "Sección", k: "faq preguntas que es paid media seo sem aeo geo pixel capi" },
    { t: "Herramientas de Marketing", u: "herramientas.html", tipo: "Sección", k: "herramientas google ads meta ga4 gtm looker ahrefs semrush claude chatgpt" },
    { t: "Sobre Esleyter Conde", u: "sobre-mi.html", tipo: "Página", k: "sobre mi esleyter conde experiencia formacion" },
    { t: "Servicios y asesorías", u: "servicios.html", tipo: "Página", k: "servicios asesoria diagnostico campanas auditoria gestion medicion mentoria freelance" },
    { t: "Contacto", u: "contacto.html", tipo: "Página", k: "contacto colaboraciones consultoria asesoria" }
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

  // La lupa del menú abre el overlay (en vez de navegar a buscar.html)
  document.querySelectorAll('a[href="buscar.html"]').forEach(a => a.addEventListener("click", abrir));

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
