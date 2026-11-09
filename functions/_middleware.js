// Condado Digital: oculta archivos internos del repositorio que no son parte del sitio.
// Se ejecuta en todas las rutas salvo los recursos estáticos excluidos en /_routes.json
// (así también bloquea rutas codificadas como /%62orradores/...).
// Si agregas otro archivo o carpeta interna al repositorio, súmalo aquí (o guárdalo en borradores/).
const OCULTOS = new Set(["/readme.md", "/.gitignore", "/_routes.json",
  // URL antiguas de las plantillas (hoy en borradores/)
  "/plantilla-articulo", "/plantilla-articulo.html", "/noticia-plantilla", "/noticia-plantilla.html",
  "/capsula-plantilla", "/capsula-plantilla.html"]);
const CARPETAS = ["/functions", "/borradores"];

function ruta(url) {
  let p = new URL(url).pathname;
  try { p = decodeURIComponent(p); } catch (e) {}
  return p.toLowerCase();
}

export async function onRequest(context) {
  const p = ruta(context.request.url);
  const oculto = OCULTOS.has(p) || CARPETAS.some(c => p === c || p.startsWith(c + "/"));
  if (oculto) {
    // Responde con la página 404 del sitio y código 404
    const pagina = await context.env.ASSETS.fetch(new URL("/404", context.request.url));
    return new Response(pagina.body, {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" },
    });
  }
  return context.next();
}
