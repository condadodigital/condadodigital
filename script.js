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
const paginaActual = (window.location.pathname.split("/").pop() || "").replace(/\.html$/, "");
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
